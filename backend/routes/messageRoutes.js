// routes/messageRoutes.js
import express from "express";
import {
  createMessage,
  getAllMessages,
  clearAllMessages,
} from "../controllers/messageController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Public route for contact form
router.post("/", protect, createMessage);

// Admin route to fetch all
router.get("/", protect, admin, getAllMessages);

// Admin portal messages Fetched
router.delete("/clear", protect, admin, clearAllMessages); // admin clears all

export default router;
