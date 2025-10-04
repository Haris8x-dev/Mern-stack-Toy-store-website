import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2, Sparkles, Star } from "lucide-react";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [areItemsVisible, setAreItemsVisible] = useState(false);

  const handleRemove = async (toyId: string) => {
    try {
      // Call the backend to remove the item from the wishlist
      await api.post(
        "/wishlist/toggle",
        { figureId: toyId },
        { withCredentials: true }
      );

      // Remove it from the frontend state
      setWishlist((prev) => prev.filter((item) => item._id !== toyId));
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist", { withCredentials: true });
        setWishlist(res.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Trigger animations after loading
  useEffect(() => {
    if (!loading) {
      const headerTimer = setTimeout(() => setIsHeaderVisible(true), 100);
      const itemsTimer = setTimeout(() => setAreItemsVisible(true), 400);

      return () => {
        clearTimeout(headerTimer);
        clearTimeout(itemsTimer);
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
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl shadow-red-500/50 animate-bounce mb-6 mx-auto">
            💖
          </div>
          <p className="text-2xl font-bold text-white mb-2">
            Loading Wishlist...
          </p>
          <p className="text-purple-300/60">Fetching your favorite items</p>
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
          💖
        </div>
        <div
          className="absolute top-40 left-32 text-5xl opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          ✨
        </div>
        <div
          className="absolute bottom-32 right-1/4 text-4xl opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          ⭐
        </div>
        <div
          className="absolute top-1/3 right-20 text-3xl opacity-20 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          💎
        </div>
      </div>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Content */}
      <section className="flex-1 px-4 md:px-6 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Animated Header */}
          <div
            className={`transition-all duration-1000 ease-out mb-12 ${
              isHeaderVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-4xl shadow-lg shadow-red-500/50">
                      <Heart className="w-10 h-10 text-white fill-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-purple-400">
                          Wishlist
                        </span>
                      </h1>
                      <p className="text-lg text-white/60">
                        {wishlist.length}{" "}
                        {wishlist.length === 1 ? "item" : "items"} saved for
                        later
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-red-500/30 to-pink-500/30 backdrop-blur-xl rounded-2xl px-6 py-4 border border-red-400/30 shadow-lg shadow-red-500/20">
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                        Total Items
                      </p>
                      <p className="text-3xl font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-pink-400" />
                        {wishlist.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wishlist Content */}
          {wishlist.length === 0 ? (
            // Empty State
            <div
              className={`transition-all duration-1000 ease-out ${
                areItemsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative group max-w-2xl mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-red-400/30">
                    <Heart className="w-16 h-16 text-red-400/50" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-xl text-purple-300/70 mb-8">
                    Start adding items you love to your wishlist!
                  </p>
                  <button className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Browse Collection</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Wishlist Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((toy: any, index: number) => (
                <div
                  key={toy._id}
                  className={`group relative transition-all duration-700 ease-out ${
                    areItemsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                      <img
                        src={
                          typeof toy.image === "string"
                            ? toy.image
                            : toy.image?.url
                        }
                        alt={toy.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Heart Badge */}
                      <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/50">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>

                      {/* Action buttons on hover */}
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 transform translate-y-2 ">
                        <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-xl py-2.5 px-4 flex items-center justify-center gap-2 text-white font-semibold shadow-lg transition-all hover:scale-105">
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-sm">Add to Cart</span>
                        </button>
                        <button
                          onClick={() => handleRemove(toy._id)} // ✅ Pass the correct toy ID
                          className="w-10 h-10 bg-red-500/90 hover:bg-red-600 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="p-5">
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all truncate">
                        {toy.name}
                      </h2>
                      <p className="text-sm text-purple-300/70 mb-4 line-clamp-2">
                        {toy.description}
                      </p>

                      {/* Price and Rating */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-white/50 mb-1">Price</p>
                          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                            ${toy.price}
                          </p>
                        </div>

                        {toy.rating && (
                          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1.5 rounded-lg border border-yellow-500/30">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">
                              {toy.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
};

export default WishlistPage;
