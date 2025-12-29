import ChatRequest from "../models/ChatRequest.js";
import { io } from "../server.js";

/* =========================
   BUYER SENDS REQUEST
========================= */
export const sendChatRequest = async (req, res) => {
  try {
    const { sellerId, productId } = req.body;

    const request = await ChatRequest.create({
      buyer: req.user._id,
      seller: sellerId,
      product: productId,
      status: "pending",
    });

    res.status(201).json(request);
  } catch (error) {
    console.error("Send request error:", error);
    res.status(500).json({ message: "Failed to send request" });
  }
};

/* =========================
   SELLER SEES REQUESTS
========================= */
export const getSellerRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      seller: req.user._id,
      status: "pending",
    })
      .populate("buyer", "name")
      .populate("product", "title");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller requests" });
  }
};

/* =========================
   BUYER SEES REQUESTS
========================= */
export const getBuyerRequests = async (req, res) => {
  try {
    const requests = await ChatRequest.find({
      buyer: req.user._id,
    })
      .populate("seller", "name phone")
      .populate("product", "title");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch buyer requests" });
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

    // 🔒 Only seller can accept
    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = "accepted";
    request.whatsappAllowed = true;
    request.isSeenByBuyer = false;
    await request.save();

    // 🔔 notify buyer in real-time
    io.to(request.buyer.toString()).emit("chat-request-accepted", {
      requestId: request._id,
    });

    // ✅ DO NOT CREATE BotChat
    res.json({ success: true });
  } catch (error) {
    console.error("Accept request error:", error);
    res.status(500).json({ message: "Failed to accept request" });
  }
};

//Revoke Whatsapp Status
export const revokeWhatsAppAccess = async (req, res) => {
  try {
    const request = await ChatRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 🔒 Only seller can revoke
    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.whatsappAllowed = false;
    await request.save();

    // 🔔 Notify buyer in real time
    io.to(request.buyer.toString()).emit("chat-request-revoked", {
      requestId: request._id,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Revoke WhatsApp error:", error);
    res.status(500).json({ message: "Failed to revoke WhatsApp access" });
  }
};

/* =========================
   MARK BUYER REQUESTS SEEN
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

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark seen" });
  }
};
