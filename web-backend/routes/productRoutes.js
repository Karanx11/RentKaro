import express from "express";
import { upload } from "../config/multer.js";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";
import { voteProduct } from "../controllers/productController.js";
const router = express.Router();
/* =========================
   CREATE PRODUCT
========================= */
router.post(
  "/",
  protect,
  upload.array("images", 3),
  async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        listingType,
        price,
        location,
      } = req.body;

      // ✅ DEBUG LOG (NOW CORRECT)
      console.log("LOCATION RECEIVED:", location);

      // ✅ VALIDATION
      if (
        !title ||
        !description ||
        !category ||
        !listingType ||
        !price ||
        !location
      ) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      if (!req.files || req.files.length !== 3) {
        return res.status(400).json({
          message: "Exactly 3 images are required",
        });
      }

      const imageUrls = req.files.map(
        (file) => `/uploads/${file.filename}`
      );

      const product = await Product.create({
        title,
        description,
        category,
        listingType,
        price: JSON.parse(price),
        images: imageUrls,
        owner: req.user._id,
        location,           // ✅ NOW SAVED
        isAvailable: true,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* =========================
   GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true })
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("Get products error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   GET SINGLE PRODUCT
========================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner",
      "name email phone"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// GET PRODUCTS BY IDS (RECENTLY VIEWED)
router.post("/by-ids", async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      return res.json([]);
    }

    const products = await Product.find({
      _id: { $in: ids },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===============================
   WHATSAPP REDIRECT (SECURE)
================================ */
router.get("/:id/whatsapp", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("owner", "phone name");

    if (!product || !product.owner?.phone) {
      return res.status(404).json({ message: "Contact not available" });
    }

    const message = `
Hey! I’m interested in your product.

📦 ${product.title}
📍 Location: ${product.location}
💰 Price: ${
      product.listingType === "rent"
        ? `₹${product.price.day} / day`
        : `₹${product.price.sell}`
    }

🔗 ${process.env.FRONTEND_URL}/product/${product._id}
`;

    const whatsappUrl = `https://wa.me/${product.owner.phone}?text=${encodeURIComponent(
      message
    )}`;

    res.json({ url: whatsappUrl });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate WhatsApp link" });
  }
});
// =========================
// GET MY LISTINGS
// =========================
router.get("/my/listings", protect, async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error("My listings error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
// =========================
// UPDATE PRODUCT (EDIT)
// =========================
router.put("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // owner check
    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      title,
      description,
      category,
      location,
      price,
    } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.category = category || product.category;
    product.location = location || product.location;
    product.price = price || product.price;

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("Update product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});
//Like Dislike Product
router.post("/:id/vote", protect, voteProduct);

// =========================
// DELETE PRODUCT
// =========================
router.delete("/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // owner check
    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
