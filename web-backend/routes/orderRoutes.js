import express from "express";
import protect from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Chat from "../models/Chat.js";

const router = express.Router();

/* =========================
   BUY PRODUCT
========================= */
router.post("/buy", protect, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isAvailable) {
      return res.status(400).json({
        message: "Product not available",
      });
    }

    // CREATE ORDER
    const order = await Order.create({
      product: product._id,
      buyer: req.user._id,
      owner: product.owner,
      orderType: "buy",
      amount: product.price.sell,
    });

    // MARK PRODUCT SOLD
    product.isAvailable = false;
    await product.save();

    // CREATE / FIND CHAT
    let chat = await Chat.findOne({
      users: { $all: [req.user._id, product.owner] },
      product: product._id,
    });

    if (!chat) {
      chat = await Chat.create({
        users: [req.user._id, product.owner],
        product: product._id,
      });
    }

    res.status(201).json({
      order,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Buy error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   RENT PRODUCT
========================= */
router.post("/rent", protect, async (req, res) => {
  try {
    const { productId, rentStart, rentEnd } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.isAvailable) {
      return res.status(400).json({
        message: "Product not available",
      });
    }

    // SIMPLE PRICE LOGIC (PER DAY)
    const days =
      (new Date(rentEnd) - new Date(rentStart)) /
      (1000 * 60 * 60 * 24);

    const amount = Math.ceil(days) * product.price.day;

    const order = await Order.create({
      product: product._id,
      buyer: req.user._id,
      owner: product.owner,
      orderType: "rent",
      rentStart,
      rentEnd,
      amount,
    });

    // CREATE / FIND CHAT
    let chat = await Chat.findOne({
      users: { $all: [req.user._id, product.owner] },
      product: product._id,
    });

    if (!chat) {
      chat = await Chat.create({
        users: [req.user._id, product.owner],
        product: product._id,
      });
    }

    res.status(201).json({
      order,
      chatId: chat._id,
    });
  } catch (error) {
    console.error("Rent error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
