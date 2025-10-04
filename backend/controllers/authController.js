// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { OAuth2Client } from "google-auth-library";
import GoogleUser from "../models/googleUserSchema.js";
import axios from "axios";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * POST /api/auth/register
 * body: { name, email, password, confirmPassword }
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: false,
    });

    // ✅ Generate token and set cookie
    const token = generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token, // optional: frontend may still want it
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 * body: { email, password }
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Generate token + set cookie
    const token = generateToken(res, user._id);

    // ✅ Keep response consistent with registerUser
    return res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};

/**
 * POST /api/auth/logout
 */
export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0), // expire immediately
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({ message: "Server error, could not log out" });
  }
};

/**
 * DELETE /api/auth/delete
 * body: { email }
 * protected: only admins can delete users
 */
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    // Check if the logged-in user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Deleted user:", user);

    return res.status(200).json({
      message: "User deleted successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/auth/profile
 * protected: user must be logged in
 */
export const getProfile = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatar: req.user.avatar || null,
    isAdmin: req.user.isAdmin || false, // only local users will have this
    provider: req.user.googleId ? "google" : "local",
  });
});

/**
 * GET /api/auth/google
 * Offical One Click Google Sign-In
 */
export const googleAuth = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code)
      return res.status(400).json({ message: "Authorization code missing" });

    // 1. Exchange code manually with Google
    const { data: tokens } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "postmessage", // must be "postmessage" for popup/one-tap
        grant_type: "authorization_code",
      }
    );
    console.log("✅ Google tokens:", tokens);

    if (!tokens.id_token) {
      return res
        .status(400)
        .json({ message: "No id_token returned from Google" });
    }

    // 2. Verify token
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log("👤 Google payload:", payload);

    // 3. Find or create GoogleUser
    let user = await GoogleUser.findOne({ googleId: payload.sub });
    if (!user) {
      user = await GoogleUser.create({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
        provider: "google",
        role: "user", // default role
        isAdmin: false, // default admin flag
      });
    }

    // 4. Issue JWT cookie
    const token = jwt.sign(
      { userId: user._id, provider: "google" }, // include provider in payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 5. Send response
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        provider: user.provider,
      },
    });
  } catch (err) {
    console.error(
      "❌ Google auth error:",
      err.response?.data || err.message,
      err
    );
    res.status(500).json({ message: "Google login failed" });
  }
};

// controllers/googleAuthController.js
export const getGoogleProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    isAdmin: req.user.isAdmin,
    provider: req.user.provider,
  });
};

// controllers/googleAuthController.js
export const googleLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res
      .status(200)
      .json({ message: "Logged out from Google successfully" });
  } catch (err) {
    console.error("Google logout error:", err);
    res.status(500).json({ message: "Google logout failed" });
  }
};
