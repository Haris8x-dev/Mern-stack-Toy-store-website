// controllers/messageController.js
import Message from "../models/Message.js";

// Create Message
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      user: req.user ? req.user._id : null, // if auth is used
    });

    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch All Messages (Admin)
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Clear all messages (Admin only)
export const clearAllMessages = async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ message: "All messages cleared successfully" });
  } catch (err) {
    console.error("Error clearing messages:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
