import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Admin-only access
router.get("/", protect, admin, getAllUsers);
router.put("/:provider/:id", protect, admin, updateUser);
router.delete("/:provider/:id", protect, admin, deleteUser);

export default router;
