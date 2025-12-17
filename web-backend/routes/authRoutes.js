import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET LOGGED-IN USER
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

export default router;
