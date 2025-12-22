import express from "express";
import { upload } from "../config/multer.js";
import Product from "../models/Product.js";
import protect from "../middleware/authMiddleware.js";

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
      } = req.body;

      if (!title || !description || !category || !listingType || !price) {
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
        isAvailable: true,
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("Create product error:", error.message);
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
   GET SINGLE PRODUCT (IMPORTANT)
========================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "owner",
      "name email"
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

export default router;
