import Figure from "../models/Figure.js";
import User from "../models/User.js";
import GoogleUser from "../models/googleUserSchema.js";

export const getStats = async (req, res) => {
  try {
    const totalProducts = await Figure.countDocuments();
    const localUsers = await User.countDocuments();
    const googleUsers = await GoogleUser.countDocuments();
    const activeUsers = localUsers + googleUsers;

    // later you can add sales count here
    res.json({
      totalProducts,
      activeUsers,
      totalSales: 0, // placeholder for now
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
