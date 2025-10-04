// routes/wishlistRoutes.js
import express from "express";
import { toggleWishlist, getWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/wishlist/toggle
router.post("/toggle", protect, toggleWishlist);

// GET /api/wishlist
router.get("/", protect, getWishlist);

export default router;
