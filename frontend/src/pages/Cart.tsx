import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  // Sample cart items - you'll replace this with actual data
  const cartItems = [
    {
      id: 1,
      name: "Premium Collectible Figure",
      price: 299.99,
      quantity: 1,
      image: "🎭",
      category: "Figures",
    },
    {
      id: 2,
      name: "Limited Edition Card Set",
      price: 149.99,
      quantity: 2,
      image: "🎴",
      category: "Cards",
    },
    {
      id: 3,
      name: "Vintage Comic Book",
      price: 89.99,
      quantity: 1,
      image: "📚",
      category: "Books",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = 15.0;
  const total = subtotal + tax + shipping;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    const cartTimer = setTimeout(() => setCartVisible(true), 400);

    return () => {
      clearTimeout(timer);
      clearTimeout(cartTimer);
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black relative overflow-hidden">
      {/* Enhanced Background with animated gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Animated particles */}
        <div
          className="absolute top-20 right-32 text-6xl opacity-30 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🛒
        </div>
        <div
          className="absolute top-40 left-32 text-5xl opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          💎
        </div>
        <div
          className="absolute bottom-32 right-1/4 text-4xl opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          ✨
        </div>
        <div
          className="absolute top-1/3 right-20 text-3xl opacity-20 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          🎁
        </div>
      </div>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Content */}
      <section className="relative z-10 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header with Back Button */}
          <div
            className={`transition-all duration-1000 ease-out mb-8 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 mb-6"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Back to Shop</span>
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
              <h1 className="text-5xl font-extrabold text-white">
                Shopping{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Cart
                </span>
              </h1>
            </div>
            <p className="text-lg text-white/60 ml-4">
              Review your items and proceed to checkout
            </p>
          </div>

          {/* Main Cart Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
              <div
                className={`transition-all duration-1000 ease-out ${
                  cartVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                {/* Cart Items Header */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-xl">
                        🛍️
                      </span>
                      Cart Items
                    </h2>
                    <div className="px-4 py-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30">
                      <span className="text-white font-bold">
                        {cartItems.length} Items
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="group relative transition-all duration-500 hover:scale-[1.02]"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                      <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Item Image */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center text-5xl border border-white/10 shadow-lg">
                              {item.image}
                            </div>
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div>
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all">
                                  {item.name}
                                </h3>
                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-lg text-xs text-sky-300 border border-sky-500/30">
                                  {item.category}
                                </span>
                              </div>
                              <button className="text-white/50 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>

                            {/* Price and Quantity Controls */}
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 border border-white/10">
                                <button className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg flex items-center justify-center text-white font-bold transition-all hover:scale-110">
                                  -
                                </button>
                                <span className="text-white font-bold min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-lg flex items-center justify-center text-white font-bold transition-all hover:scale-110">
                                  +
                                </button>
                              </div>

                              <div className="flex-1 text-right">
                                <p className="text-xs text-white/50 mb-1">
                                  Price
                                </p>
                                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                                  ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Button */}
                <button
                  onClick={() => navigate("/shop")}
                  className="group w-full mt-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center gap-3 text-white/70 group-hover:text-white transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="font-semibold">Continue Shopping</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
              <div
                className={`sticky top-8 transition-all duration-1000 ease-out ${
                  cartVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                        📋
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Order Summary
                      </h2>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Subtotal</span>
                        <span className="text-white font-semibold">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Tax (8%)</span>
                        <span className="text-white font-semibold">
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Shipping</span>
                        <span className="text-white font-semibold">
                          ${shipping.toFixed(2)}
                        </span>
                      </div>

                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xl font-bold text-white">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code"
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 transition-colors"
                        />
                        <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl text-white font-semibold transition-all hover:scale-105">
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button className="group w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative px-8 py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg">
                        <span>Proceed to Checkout</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </button>

                    {/* Security Badge */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <span>Secure checkout guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl rounded-2xl p-6 border border-white/5">
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-3 text-center">
                    Accepted Payment Methods
                  </p>
                  <div className="flex items-center justify-center gap-4 flex-wrap">
                    {["💳", "🏦", "💰", "📱"].map((icon, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-xl border border-white/10 hover:border-white/20 transition-colors"
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Cart;
