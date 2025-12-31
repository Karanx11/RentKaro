import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  sendChatRequest,
  getSellerRequests,
  getBuyerRequests,
  getBuyerNotifications,
  acceptChatRequest,
  revokeWhatsAppAccess,
  markBuyerRequestsSeen,
} from "../controllers/chatRequestController.js";

const router = express.Router();

router.post("/request", protect, sendChatRequest);
router.get("/seller", protect, getSellerRequests);
router.get("/buyer", protect, getBuyerRequests);
router.get("/buyer/notifications", protect, getBuyerNotifications);
router.post("/accept/:id", protect, acceptChatRequest);
router.post("/buyer/seen", protect, markBuyerRequestsSeen);
router.post("/revoke/:id", protect, revokeWhatsAppAccess);


export default router;
