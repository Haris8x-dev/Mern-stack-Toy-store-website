import mongoose from "mongoose";

const figureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      url: {
        type: String,
        required: true, // make sure we always save Cloudinary URL
      },
      public_id: {
        type: String,
        required: true, // Cloudinary public_id to delete/update later
      },
    },
  },
  { timestamps: true }
);

const Figure = mongoose.model("Figure", figureSchema);

export default Figure;
