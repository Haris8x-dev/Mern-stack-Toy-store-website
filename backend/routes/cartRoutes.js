import express from "express";
import {
  addToCart,
  getCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/increase/:id", protect, increaseQuantity);
router.put("/decrease/:id", protect, decreaseQuantity);
router.delete("/remove/:id", protect, removeFromCart);

export default router;
