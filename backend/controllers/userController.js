import User from "../models/User.js";
import GoogleUser from "../models/googleUserSchema.js";

// ✅ Get all users (merge both collections)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const googleUsers = await GoogleUser.find();

    const allUsers = [
      ...users.map((u) => ({ ...u.toObject(), provider: "local" })),
      ...googleUsers.map((g) => ({ ...g.toObject(), provider: "google" })),
    ];

    res.status(200).json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ✅ Update user (works for both collections)
export const updateUser = async (req, res) => {
  const { id, provider } = req.params;
  try {
    const Model = provider === "google" ? GoogleUser : User;
    const updatedUser = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// ✅ Delete user (works for both collections)
export const deleteUser = async (req, res) => {
  const { id, provider } = req.params;
  try {
    const Model = provider === "google" ? GoogleUser : User;
    const deletedUser = await Model.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
