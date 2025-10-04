// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import GoogleUser from "../models/googleUserSchema.js";

// Protected Middleware
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check cookies or headers
    if (req.cookies.jwt) token = req.cookies.jwt;
    else if (req.cookies.token) token = req.cookies.token;
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try local user first
    let user = await User.findById(decoded.userId).select("-password");

    // If not found, try Google user
    if (!user) user = await GoogleUser.findById(decoded.userId);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach to request
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Admin Control
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
