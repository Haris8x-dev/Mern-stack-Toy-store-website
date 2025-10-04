import express from "express";
import { getStats } from "../controllers/statsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only stats
router.get("/", protect, admin, getStats);

export default router;
