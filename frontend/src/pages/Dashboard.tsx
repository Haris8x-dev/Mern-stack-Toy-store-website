import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    const statsTimer = setTimeout(() => setStatsVisible(true), 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  useEffect(() => {
    const fetchWishlistCount = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/wishlist", {
          withCredentials: true, // if you use cookies for auth
        });

        // ✅ Store the length in state
        setWishlistCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch wishlist:", err);
      }
    };

    fetchWishlistCount();
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
          👑
        </div>
        <div
          className="absolute top-1/3 right-20 text-3xl opacity-20 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          ⭐
        </div>
      </div>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Dashboard Content */}
      <section className="relative z-10 px-4 pt-10 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Welcome Section with gradient border */}
          <div
            className={`transition-all duration-1000 ease-out mb-12 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="relative group">
              {/* Animated gradient border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>

              <div className="relative bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-pink-500/50">
                        👤
                      </div>
                      <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                          Welcome back!
                        </h1>
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400">
                          {user?.name || "User"}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg text-white/60 max-w-2xl">
                      Your personalized dashboard for managing collections,
                      orders, and exploring new arrivals
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-green-500/30 to-emerald-500/30 backdrop-blur-xl rounded-2xl px-6 py-4 border border-green-400/30 shadow-lg shadow-green-500/20">
                      <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <p className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
                        {user?.isAdmin ? "⚡ Admin" : "✓ Active"}
                      </p>
                    </div>

                    {user?.isAdmin && (
                      <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-xl rounded-2xl px-6 py-3 border border-yellow-400/30 shadow-lg shadow-yellow-500/20">
                        <p className="text-sm font-bold text-white flex items-center gap-2">
                          <span>🛡️</span>
                          Admin Access
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards with enhanced design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: "📧",
                label: "Email Address",
                value: user?.email || "Not set",
                gradient: "from-pink-500 to-purple-600",
                bgGradient: "from-pink-500/20 to-purple-600/20",
                delay: "0ms",
                iconBg: "bg-gradient-to-br from-pink-500 to-purple-600",
              },
              {
                icon: "🎭",
                label: "Account Type",
                value: user?.isAdmin ? "Administrator" : "Standard User",
                gradient: "from-sky-500 to-blue-600",
                bgGradient: "from-sky-500/20 to-blue-600/20",
                delay: "100ms",
                iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
              },
              {
                icon: "🛒",
                label: "Total Orders",
                value: "0 Orders",
                gradient: "from-yellow-500 to-orange-600",
                bgGradient: "from-yellow-500/20 to-orange-600/20",
                delay: "200ms",
                iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600",
              },
              {
                icon: "⭐",
                label: "Wishlist Items",
                value: `${wishlistCount} Items`,
                gradient: "from-green-500 to-emerald-600",
                bgGradient: "from-green-500/20 to-emerald-600/20",
                delay: "300ms",
                iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className={`relative group transition-all duration-500 hover:scale-105 ${
                  statsVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: stat.delay }}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`}
                ></div>

                <div
                  className={`relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      {stat.icon}
                    </div>
                    <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-white truncate">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions with modern card design */}
          <div
            className={`transition-all duration-1000 ease-out mb-12 ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-white">
                Quick{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Actions
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🛍️",
                  title: "Browse Shop",
                  description: "Explore latest collectibles",
                  gradient: "from-pink-500 to-purple-600",
                  hoverColor: "hover:border-pink-500/50",
                  path: "/figures",
                },
                {
                  icon: "📦",
                  title: "My Orders",
                  description: "Track your purchases",
                  gradient: "from-purple-500 to-indigo-600",
                  hoverColor: "hover:border-purple-500/50",
                  path: "/cart",
                },
                {
                  icon: "💎",
                  title: "Wishlist",
                  description: "View saved items",
                  gradient: "from-sky-500 to-blue-600",
                  hoverColor: "hover:border-sky-500/50",
                  path: "/wishlist",
                },
              ].map((action, index) => (
                <Link
                  key={index}
                  to={action.path}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 ${action.hoverColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left overflow-hidden block`}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      {action.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                      {action.title}
                    </h3>
                    <p className="text-white/70">{action.description}</p>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 text-white/50 group-hover:text-white/90 transition-colors">
                      <span className="text-sm font-medium">Go</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Management with enhanced styling */}
          <div
            className={`transition-all duration-1000 ease-out ${
              statsVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-yellow-600 rounded-full"></div>
              <h2 className="text-3xl font-bold text-white">
                Account{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  Settings
                </span>
              </h2>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <div className="flex flex-col md:flex-row justify-center gap-6">
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="group relative bg-gradient-to-r from-orange-500/30 to-red-500/30 hover:from-orange-500/40 hover:to-red-500/40 rounded-2xl p-6 border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-3xl shadow-lg transform group-hover:scale-110 transition-all duration-300">
                      🚪
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white mb-1">
                        Logout
                      </h3>
                      <p className="text-sm text-white/60">
                        Sign out of your account
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Logout Modal */}
          {showLogoutModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-4">
              <div className="relative group max-w-md w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>

                <div className="relative bg-gradient-to-br from-purple-900/95 to-black/95 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                      ⚠️
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      Confirm Logout
                    </h2>
                  </div>

                  <p className="text-white/70 mb-8 text-lg">
                    Are you sure you want to log out of your account? You'll
                    need to sign in again to access your dashboard.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowLogoutModal(false)}
                      className="flex-1 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-medium transition-all duration-300 hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        setShowLogoutModal(false);
                        try {
                          await api
                            .post("/auth/logout", {}, { withCredentials: true })
                            .catch(() => {});
                          await api
                            .post(
                              "/auth/google/logout",
                              {},
                              { withCredentials: true }
                            )
                            .catch(() => {});
                          auth.setUser(null);
                          toast.success("Logged out successfully");
                          navigate("/signup");
                        } catch (error: any) {
                          toast.error(
                            error.response?.data?.message || "Logout failed"
                          );
                        }
                      }}
                      className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default Dashboard;
