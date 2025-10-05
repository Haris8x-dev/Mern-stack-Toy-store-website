import { useEffect, useState } from "react";
import {
  Minus,
  Plus,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  X,
  Sparkles,
  Package,
  TruckIcon,
  Shield,
  Tag,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", { withCredentials: true });
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleIncrease = async (id: string) => {
    try {
      await api.put(`/cart/increase/${id}`, {}, { withCredentials: true });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  };

  const handleDecrease = async (id: string) => {
    try {
      await api.put(`/cart/decrease/${id}`, {}, { withCredentials: true });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingItems((prev) => new Set(prev).add(id));
    try {
      await api.delete(`/cart/remove/${id}`, { withCredentials: true });
      setTimeout(() => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
        setRemovingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 300);
    } catch (err) {
      console.error("Failed to remove item:", err);
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.figure?.price || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + tax + shipping;
  const savings = subtotal * 0.15; // Example savings

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black">
        <Navbar />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "calc(100vh - 64px)" }}
        >
          <div className="text-center">
            <div className="relative">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-3 border-b-3 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)]"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-purple-400/30"></div>
            </div>
            <p className="mt-6 text-purple-300 font-medium text-lg">
              Loading your cart...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black">
      <Navbar />

      <main
        className="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-10"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* Enhanced glow effects */}
        <div className="fixed top-1/3 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="fixed bottom-1/3 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 mb-4 text-purple-300 hover:text-white transition-colors"
            >
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-400/30 transition-all">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Continue Shopping</span>
            </button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text">
                  Shopping Cart
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-purple-300/80 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"} in cart
                  </p>
                  {cartItems.length > 0 && (
                    <span className="text-green-400 text-sm font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      You're saving ${savings.toFixed(2)}!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-pulse bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                  <ShoppingBag className="w-12 h-12 text-purple-300" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 mb-6 text-center max-w-md">
                Looks like you haven't added any items yet. Start exploring our
                collection!
              </p>
              <button
                onClick={() => navigate("/")}
                className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items - Enhanced */}
              <div className="lg:col-span-2 space-y-4">
                {/* Free Shipping Banner */}
                {shipping > 0 && subtotal > 50 && (
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TruckIcon className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">
                          You're ${(100 - subtotal).toFixed(2)} away from free
                          shipping!
                        </p>
                        <div className="w-48 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                (subtotal / 100) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className={`group relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl p-5 hover:from-white/[0.12] hover:to-white/[0.06] hover:border-purple-500/30 transition-all duration-500 backdrop-blur-sm ${
                      removingItems.has(item._id) ? "opacity-50 scale-95" : ""
                    }`}
                  >
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-pink-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative flex gap-4">
                      {/* Enhanced Image */}
                      <div className="flex-shrink-0 relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                          src={
                            typeof item.figure.image === "string"
                              ? item.figure.image
                              : item.figure.image?.url
                          }
                          alt={item.figure.name}
                          className="relative w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl ring-1 ring-white/20 group-hover:ring-purple-400/50 transition-all duration-300"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            x{item.quantity}
                          </span>
                        )}
                      </div>

                      {/* Enhanced Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-3 mb-3">
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg sm:text-xl mb-1 line-clamp-1 group-hover:text-purple-200 transition-colors">
                              {item.figure.name}
                            </h3>
                            <p className="text-purple-300/70 text-sm line-clamp-2">
                              {item.figure.description ||
                                "Premium collectible figure"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-400/40 text-red-400 hover:text-red-300 transition-all duration-300 group/remove"
                            title="Remove item"
                          >
                            <X className="w-4 h-4 group-hover/remove:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>

                        {/* Enhanced Rating */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={
                                  i < item.figure.rating
                                    ? "url(#star-gradient)"
                                    : "#374151"
                                }
                                className="w-4 h-4"
                              >
                                <defs>
                                  <linearGradient
                                    id="star-gradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                  >
                                    <stop offset="0%" stopColor="#facc15" />
                                    <stop offset="100%" stopColor="#fb923c" />
                                  </linearGradient>
                                </defs>
                                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.782 1.402 8.178L12 18.897l-7.336 3.853 1.402-8.178L.132 9.21l8.2-1.192z" />
                              </svg>
                            ))}
                            <span className="text-xs text-purple-300/60 ml-1">
                              ({item.figure.rating}.0)
                            </span>
                          </div>
                          {item.figure.stock && item.figure.stock < 10 && (
                            <span className="text-xs font-medium text-orange-400 bg-orange-400/10 px-2 py-1 rounded-full">
                              Only {item.figure.stock} left
                            </span>
                          )}
                        </div>

                        {/* Price and Quantity - Enhanced */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                          <div className="flex items-center gap-3">
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                              ${(item.figure.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-400 line-through">
                              $
                              {(
                                item.figure.price *
                                item.quantity *
                                1.2
                              ).toFixed(2)}
                            </p>
                          </div>

                          {/* Enhanced Quantity Controls */}
                          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10 hover:border-purple-400/30 transition-all">
                            <button
                              onClick={() => handleDecrease(item._id)}
                              className="p-2 hover:bg-purple-500/20 rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group/btn"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-white group-hover/btn:text-purple-300 transition-colors" />
                            </button>
                            <span className="text-white font-bold min-w-[3rem] text-center px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item._id)}
                              className="p-2 hover:bg-purple-500/20 rounded-lg transition-all duration-300 group/btn"
                            >
                              <Plus className="w-4 h-4 text-white group-hover/btn:text-purple-300 transition-colors" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - Enhanced Sticky */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-purple-400" />
                        Subtotal
                      </span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <TruckIcon className="w-4 h-4 text-purple-400" />
                        Shipping
                      </span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-400">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-gray-300">
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-purple-400" />
                        Tax (10%)
                      </span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Total Savings
                        </span>
                        <span className="font-medium">
                          -${savings.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between text-white text-xl font-bold">
                        <span>Total</span>
                        <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-purple-300/60 mt-1 text-right">
                        or 4 payments of ${(total / 4).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <NavLink
                    to="/checkoutpage"
                    className="relative w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <CreditCard className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Proceed to Checkout</span>
                  </NavLink>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-center gap-4 text-xs text-purple-300/60">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        Secure Checkout
                      </div>
                      <div className="flex items-center gap-1">
                        <CreditCard className="w-4 h-4" />
                        SSL Encrypted
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="mt-4 space-y-3">
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <TruckIcon className="w-5 h-5 text-purple-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          Free Shipping on $100+
                        </p>
                        <p className="text-purple-300/60 text-xs mt-1">
                          Estimated delivery in 3-5 days
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          30-Day Return Policy
                        </p>
                        <p className="text-green-300/60 text-xs mt-1">
                          100% money-back guarantee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
