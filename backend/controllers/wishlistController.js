// controllers/wishlistController.js
import User from "../models/User.js";
import GoogleUser from "../models/googleUserSchema.js";

// Helper to get correct model
const getUserModel = (user) => {
  return user.googleId ? GoogleUser : User;
};

// Toggle wishlist
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // from unified protect middleware
    const { figureId } = req.body;

    const UserModel = getUserModel(req.user);
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const already = user.wishlist.includes(figureId);

    if (already) {
      user.wishlist.pull(figureId);
      await user.save();
      return res.json({ added: false });
    } else {
      user.wishlist.push(figureId);
      await user.save();
      return res.json({ added: true });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const UserModel = getUserModel(req.user);
    const user = await UserModel.findById(userId).populate("wishlist");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
