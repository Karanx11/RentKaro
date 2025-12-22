import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Save push subscription
router.post("/subscribe", async (req, res) => {
  try {
    const { userId, subscription } = req.body;

    if (!userId || !subscription) {
      return res.status(400).json({ message: "Missing data" });
    }

    await User.findByIdAndUpdate(userId, {
      pushSubscription: subscription,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Subscription save error:", error);
    res.status(500).json({ message: "Failed to save subscription" });
  }
});

export default router;
