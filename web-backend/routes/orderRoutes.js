import express from "express";
import protect from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

const router = express.Router();

/* ======================
   RENT PRODUCT
====================== */
router.post("/rent", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.create({
      user: req.user._id,
      product: productId,
      type: "rent",
      price: product.price?.day || 0,
    });

    res.status(201).json({
      success: true,
      message: "Rental request placed successfully",
      order,
    });
  } catch (error) {
    console.error("Rent order error:", error.message);
    res.status(500).json({ message: "Rent failed" });
  }
});

/* ======================
   BUY PRODUCT
====================== */
router.post("/buy", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await Order.create({
      user: req.user._id,
      product: productId,
      type: "buy",
      price: product.price?.sell || 0,
    });

    res.status(201).json({
      success: true,
      message: "Purchase successful",
      order,
    });
  } catch (error) {
    console.error("Buy order error:", error.message);
    res.status(500).json({ message: "Buy failed" });
  }
});

export default router;
