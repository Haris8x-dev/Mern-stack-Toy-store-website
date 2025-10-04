import Figure from "../models/Figure.js";
import { v2 as cloudinary } from "cloudinary";

// Add new figure
export const addFigure = async (req, res) => {
  try {
    const { name, description, price, rating } = req.body;

    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ message: "Name, description, and price are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Multer-storage-cloudinary automatically uploads
    const imageUrl = req.file.path; // ✅ Cloudinary URL
    const publicId = req.file.filename; // ✅ Cloudinary public_id

    const newFigure = new Figure({
      name,
      description,
      price,
      rating: rating || 0,
      image: {
        url: imageUrl,
        public_id: publicId,
      },
    });

    await newFigure.save();
    res.status(201).json(newFigure);
  } catch (error) {
    console.error("Error adding figure:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all figures
export const getFigures = async (req, res) => {
  try {
    const figures = await Figure.find().sort({ createdAt: -1 });
    res.status(200).json(figures);
  } catch (error) {
    console.error("Error fetching figures:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update figure
export const updateFigure = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, rating } = req.body;

    const figure = await Figure.findById(id);
    if (!figure) {
      return res.status(404).json({ message: "Figure not found" });
    }

    // If new image uploaded, delete old one and save new one
    if (req.file) {
      if (figure.image && figure.image.public_id) {
        await cloudinary.uploader.destroy(figure.image.public_id);
      }

      figure.image.url = req.file.path; // new Cloudinary URL
      figure.image.public_id = req.file.filename;
    }

    figure.name = name || figure.name;
    figure.description = description || figure.description;
    figure.price = price || figure.price;
    figure.rating = rating || figure.rating;

    await figure.save();
    res.json(figure);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating figure", error: err.message });
  }
};

// Delete a figure (and its image from Cloudinary)
export const deleteFigure = async (req, res) => {
  try {
    const { id } = req.params;
    const figure = await Figure.findById(id);

    if (!figure) {
      return res.status(404).json({ message: "Figure not found" });
    }

    // Delete from Cloudinary first
    if (figure.image && figure.image.public_id) {
      await cloudinary.uploader.destroy(figure.image.public_id);
    }

    await figure.deleteOne();
    res.json({ message: "Figure deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting figure", error: err.message });
  }
};
