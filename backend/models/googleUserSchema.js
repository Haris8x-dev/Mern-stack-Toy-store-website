import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true, // Google sub (unique user identifier)
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ensures no duplicates
    },
    provider: {
      type: String,
      default: "google",
    },
    role: { type: String, default: "user" },
    isAdmin: { type: Boolean, default: false },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Figure",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("GoogleUser", googleUserSchema);
