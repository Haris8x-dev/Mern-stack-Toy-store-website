import Cart from "../models/Cart.js";

// Add to Cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { figureId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if item exists already
    const itemIndex = cart.items.findIndex(
      (item) => item.figure.toString() === figureId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ figure: figureId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add to cart", error: err.message });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("items.figure"); // ✅ pulls full toy details

    if (!cart) return res.json([]);

    res.json(cart.items);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch cart", error: err.message });
  }
};

// Increase Quantity
export const increaseQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity += 1;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to increase quantity", error: err.message });
  }
};

// Decrease Quantity
export const decreaseQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.quantity > 1) item.quantity -= 1;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to decrease quantity", error: err.message });
  }
};

// Remove Item
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== id);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove item", error: err.message });
  }
};
