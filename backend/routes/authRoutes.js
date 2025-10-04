// routes/authRoutes.js
import express from "express";
import {
  registerUser,
  deleteUser,
  loginUser,
  logoutUser,
  getProfile,
  googleAuth,
  getGoogleProfile,
    googleLogout
} from "../controllers/authController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";
import { googleProtect } from '../middlewares/googleAuthMiddleware.js'

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerUser); // User Registration Route
router.post("/login", loginUser); // User Login Route
router.post("/google/logout", googleLogout);
router.get("/profile", protect, getProfile); // User Profile Route

// Protected route (JWT required)
router.delete("/delete", protect, admin, deleteUser);
router.post("/logout", protect, logoutUser);
router.get("/google/profile", protect, getGoogleProfile);

// ✅ Google OAuth route
router.post("/google", googleAuth);

export default router;
