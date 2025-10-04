import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Star, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FigureCard from "../components/FigureCard";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";

interface Figure {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  image?: string;
}

const Figures = () => {
  const [figures, setFigures] = useState<Figure[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFigure, setSelectedFigure] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlisted, setWishlisted] = useState(false);

  // Animation states
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [areFiguresVisible, setAreFiguresVisible] = useState(false);

  const toggleWishlist = async (figureId: string) => {
    try {
      const res = await api.post(
        "/wishlist/toggle",
        { figureId },
        { withCredentials: true }
      );

      if (res.data.added) {
        setWishlist((prev) => [...prev, figureId]);
        toast.success("✅ Added to wishlist!");
      } else {
        setWishlist((prev) => prev.filter((id) => id !== figureId));
        toast.error("❌ Removed from wishlist!");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  useEffect(() => {
    const fetchFiguresAndWishlist = async () => {
      try {
        const [figuresRes, wishlistRes] = await Promise.all([
          fetch("http://localhost:4000/api/figures", {
            method: "GET",
            credentials: "include",
          }),
          fetch("http://localhost:4000/api/wishlist", {
            method: "GET",
            credentials: "include",
          }),
        ]);

        const figuresData = await figuresRes.json();
        const wishlistData = await wishlistRes.json();

        if (figuresRes.ok) setFigures(figuresData);
        if (wishlistRes.ok)
          setWishlist(wishlistData.map((item: any) => item._id));
      } catch (error) {
        console.error("Error fetching figures/wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiguresAndWishlist();
  }, []);

  // Trigger animations after loading completes
  useEffect(() => {
    if (!loading) {
      const headerTimer = setTimeout(() => setIsHeaderVisible(true), 100);
      const figuresTimer = setTimeout(() => setAreFiguresVisible(true), 400);

      return () => {
        clearTimeout(headerTimer);
        clearTimeout(figuresTimer);
      };
    }
  }, [loading]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-950 to-black relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl shadow-pink-500/50 animate-bounce mb-6 mx-auto">
            🎯
          </div>
          <p className="text-2xl font-bold text-white mb-2">
            Loading Collection...
          </p>
          <p className="text-purple-300/60">
            Preparing amazing figures for you
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black flex flex-col relative overflow-hidden">
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
          ✨
        </div>
        <div
          className="absolute top-40 left-32 text-5xl opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🎯
        </div>
        <div
          className="absolute bottom-32 right-1/4 text-4xl opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          💎
        </div>
        <div
          className="absolute top-1/3 right-20 text-3xl opacity-20 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          ⭐
        </div>
      </div>

      <Navbar />

      <section className="flex-1 px-4 md:px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-500/50 animate-pulse">
                🎨
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400">
                Figure Collection
              </h1>
            </div>
            <p className="text-xl text-purple-300/70 max-w-2xl mx-auto">
              Discover premium collectible figures and action heroes from your
              favorite universes
            </p>
          </div>

          {figures.length === 0 ? (
            <div
              className={`relative group max-w-2xl mx-auto transition-all duration-1000 ease-out ${
                areFiguresVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

              <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-2xl rounded-3xl p-12 border border-purple-500/20 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 border-2 border-dashed border-purple-400/30 animate-pulse">
                  📦
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Coming Soon!
                </h2>
                <p className="text-xl text-purple-300/70 mb-6">
                  No figures available at the moment. We're preparing an amazing
                  collection for you!
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* Figures Grid with Staggered Animation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {figures.map((figure, index) => (
                  <div
                    key={figure._id}
                    className={`transition-all duration-700 ease-out ${
                      areFiguresVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <FigureCard
                      figure={figure}
                      onSelect={(f) => setSelectedFigure(f)}
                      userId={"currentUserId"}
                      isWishlisted={wishlist.includes(figure._id)}
                      onToggleWishlist={() => toggleWishlist(figure._id)}
                    />
                  </div>
                ))}
              </div>

              {/* Detail Modal with Fade In */}
              {selectedFigure && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] px-4 animate-fadeIn">
                  <div className="relative bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl p-6 max-w-2xl w-full border border-purple-500/20 animate-scaleIn">
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedFigure(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white hover:text-red-400 transition-all hover:scale-110 z-[10000]"
                    >
                      <span className="text-xl font-bold">✕</span>
                    </button>

                    {/* Image */}
                    <div className="w-full h-72 sm:h-96 overflow-hidden rounded-xl mb-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10">
                      <img
                        src={
                          typeof selectedFigure.image === "string"
                            ? selectedFigure.image
                            : selectedFigure.image?.url
                        }
                        alt={selectedFigure.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <h2 className="text-3xl font-bold text-white mb-3">
                      {selectedFigure.name}
                    </h2>
                    <p className="text-purple-300/80 mb-4">
                      {selectedFigure.description}
                    </p>
                    <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-6">
                      ${selectedFigure.price}
                    </p>

                    {/* Buttons: Heart + Cart */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleWishlist(selectedFigure._id)}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
                          wishlist.includes(selectedFigure._id)
                            ? "bg-gradient-to-r from-red-600 to-pink-700 shadow-red-500/40"
                            : "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/30"
                        }`}
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            wishlist.includes(selectedFigure._id)
                              ? "fill-white text-white"
                              : "text-white"
                          }`}
                        />
                      </button>
                      <button
                        onClick={async () => {
                          if (!selectedFigure) return;
                          try {
                            await api.post(
                              "/cart/add",
                              { figureId: selectedFigure._id, quantity: 1 },
                              { withCredentials: true }
                            );
                            toast.success(
                              `${selectedFigure.name} added to cart!`
                            );
                          } catch (err) {
                            console.error("Error adding to cart:", err);
                            toast.error("Failed to add item to cart");
                          }
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-pink-500/30 transition-all hover:scale-105"
                      >
                        {" "}
                        <ShoppingCart className="w-6 h-6 text-white" />{" "}
                        <span className="text-white font-bold">
                          Add to Cart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9);
          }
          to { 
            opacity: 1; 
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>
    </main>
  );
};

export default Figures;
