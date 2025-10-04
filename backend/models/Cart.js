import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  figure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Figure",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or GoogleUser if needed
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
