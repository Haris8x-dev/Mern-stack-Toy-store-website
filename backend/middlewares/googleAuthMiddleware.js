// middlewares/googleAuthMiddleware.js
import jwt from "jsonwebtoken";
import GoogleUser from "../models/googleUserSchema.js";

export const googleProtect = async (req, res, next) => {
  let token;

  // Google users use the same "token" cookie
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no Google token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // only search in GoogleUser collection
    const user = await GoogleUser.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Google user not found" });
    }

    req.user = user; // attach Google user to req
    next();
  } catch (error) {
    console.error("Google auth middleware error:", error.message);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
