import express from "express";
import {
  addFigure,
  getFigures,
  updateFigure,
  deleteFigure,
} from "../controllers/figureController.js";
import { protect, admin } from "../middlewares/authMiddleware.js"; // your existing middleware
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getFigures);

// Figure Addition Route
router.post("/add", protect, admin, upload.single("image"), addFigure);
router.put("/:id", protect, admin, upload.single("image"), updateFigure);
router.delete("/:id", protect, admin, deleteFigure);

export default router;
