import ChatRequest from "../models/ChatRequest.js";
import { io } from "../server.js";

/* =========================
   BUYER SENDS REQUEST
========================= */
export const sendChatRequest = async (req, res) => {
  try {
    const { sellerId, productId } = req.body;

    // ❌ prevent duplicate pending request
    const existing = await ChatRequest.findOne({
      buyer: req.user._id,
      seller: sellerId,
      product: productId,
      status: "pending",
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await ChatRequest.create({
      buyer: req.user._id,
      seller: sellerId,
      product: productId,
      status: "pending",
      whatsappAllowed: false,
      isSeenByBuyer: true,     // not a buyer notification yet
      isSeenBySeller: false,   // 🔔 seller must see this
    });

    // 🔔 REAL-TIME → SELLER
    io.to(sellerId.toString()).emit("seller-new-request", {
      requestId: request._id,
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Send request error:", error);
    res.status(500).json({ message: "Failed to send request" });
  }
};

/* =========================
   SELLER REQUEST LIST (PAGE)
========================= */
export const getSellerRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      seller: req.user._id,
      status: "pending",
    })
      .populate("buyer", "name")
      .populate("product", "title")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller requests" });
  }
};

/* =========================
   SELLER NOTIFICATIONS (BELL)
========================= */
export const getSellerNotifications = async (req, res) => {
  try {
    const notifications = await ChatRequest.find({
      seller: req.user._id,
      status: "pending",
      isSeenBySeller: false,
    })
      .populate("buyer", "name")
      .populate("product", "title");

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller notifications" });
  }
};

/* =========================
   BUYER REQUEST LIST (PAGE)
========================= */
export const getBuyerRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      buyer: req.user._id,
    })
      .populate("seller", "name phone")
      .populate("product", "title")
      .sort({ updatedAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buyer requests" });
  }
};

/* =========================
   BUYER NOTIFICATIONS (BELL)
========================= */
export const getBuyerNotifications = async (req, res) => {
  try {
    const notifications = await ChatRequest.find({
      buyer: req.user._id,
      status: "accepted",
      whatsappAllowed: true,
      isSeenByBuyer: false,
    })
      .populate("product", "title")
      .populate("seller", "name");

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buyer notifications" });
  }
};

/* =========================
   SELLER ACCEPTS REQUEST
========================= */
export const acceptChatRequest = async (req, res) => {
  try {
    const request = await ChatRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    request.whatsappAllowed = true;
    request.isSeenByBuyer = false;   // 🔔 buyer must see
    request.isSeenBySeller = true;   // seller already handled it
    await request.save();

    // 🔔 REAL-TIME → BUYER
    io.to(request.buyer.toString()).emit("buyer-request-accepted", {
      requestId: request._id,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to accept request" });
  }
};

/* =========================
   SELLER REVOKES WHATSAPP
========================= */
export const revokeWhatsAppAccess = async (req, res) => {
  try {
    const request = await ChatRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.whatsappAllowed = false;
    await request.save();

    io.to(request.buyer.toString()).emit("buyer-request-revoked", {
      requestId: request._id,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to revoke WhatsApp access" });
  }
};

/* =========================
   BUYER CLEARS NOTIFICATIONS
========================= */
export const markBuyerRequestsSeen = async (req, res) => {
  try {
    await ChatRequest.updateMany(
      {
        buyer: req.user._id,
        status: "accepted",
        isSeenByBuyer: false,
      },
      { isSeenByBuyer: true }
    );

    // 🔔 update badge instantly
    io.to(req.user._id.toString()).emit("buyer-notifications-cleared");

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear notifications" });
  }
};
