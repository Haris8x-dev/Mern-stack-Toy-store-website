import { useState, useEffect } from "react";
import {
  Star,
  Menu,
  X,
  ArrowLeft,
  Plus,
  BadgeCheck,
  Database,
  Users,
  Settings,
  TrendingUp,
  Package,
  DollarSign,
  Inbox,
  Trash2,
} from "lucide-react";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define user type
export interface UserType {
  _id: string;
  name: string;
  email: string;
  provider: string; // e.g. "google" or "local"
}

const Dashboard = () => {
  const [activePanel, setActivePanel] = useState("addToy");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [users, setUsers] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [figures, setFigures] = useState<any[]>([]);
  const [editingToy, setEditingToy] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserType | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeUsers: 0,
    totalSales: 0,
  });

  const handleClearMessages = async () => {
    try {
      await api.delete("/messages/clear", { withCredentials: true });
      setMessages([]); // clear locally
      setShowConfirm(false);
    } catch (err) {
      console.error("Failed to clear messages:", err);
    }
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/messages", { withCredentials: true });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  const chartData = [
    { name: "Products", value: stats.totalProducts },
    { name: "Users", value: stats.activeUsers },
    { name: "Sales", value: stats.totalSales },
  ];

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/stats", { withCredentials: true });
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchFigures = async () => {
    try {
      const { data } = await api.get("/figures", { withCredentials: true });
      setFigures(data);
    } catch (err) {
      console.error("Error fetching figures:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users", { withCredentials: true });
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };

  const handleEdit = (toy: any) => {
    setEditingToy({ ...toy });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      Object.entries(editingToy).forEach(([key, value]) => {
        if (key === "imageFile" && value instanceof File) {
          // only append if it's actually a File
          formData.append("image", value);
        } else if (key !== "_id" && value !== undefined && value !== null) {
          // ensure it's stringifiable before appending
          formData.append(key, String(value));
        }
      });

      await api.put(`/figures/${editingToy._id}`, formData, {
        withCredentials: true,
      });

      toast.success("Toy updated successfully");
      setEditingToy(null);
      fetchFigures();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update toy");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/figures/${id}`, { withCredentials: true });
      toast.success("Toy deleted successfully");
      fetchFigures();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete toy");
    }
  };

  const handleSubmit = async () => {
    if (!productName || !description || !price) {
      toast.error("⚠️ Please fill all required fields");
      return;
    }

    // ✅ disable button as soon as submit starts
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const fields: Record<string, string | Blob> = {
        name: productName,
        description,
        price: String(price),
        rating: String(rating),
      };

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }

      const response = await fetch("http://localhost:4000/api/figures/add", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // non-JSON response fallback
      }

      if (response.ok) {
        toast.success("✅ Product added successfully!");
        // reset form
        setProductName("");
        setDescription("");
        setPrice(0);
        setRating(0);
        setImageFile(null);
      } else {
        toast.error(data?.message || `Error: ${response.status}`);
      }
    } catch (err) {
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      // ✅ re-enable button after request completes
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-purple-950 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-sky-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 w-80 bg-gradient-to-b from-purple-900/40 via-purple-950/60 to-black/95 backdrop-blur-2xl border-r border-purple-500/20 p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-2xl`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-6 right-6 md:hidden text-purple-300 hover:text-white transition-colors p-2 hover:bg-purple-500/20 rounded-lg"
          onClick={closeMobileMenu}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/50">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                Admin Hub
              </h1>
            </div>
          </div>
          <p className="text-purple-300/60 text-sm ml-1">
            Manage everything in one place
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {[
            {
              id: "addToy",
              icon: Plus,
              label: "Add Product",
              gradient: "from-pink-500 to-purple-600",
            },
            {
              id: "updateToy",
              icon: BadgeCheck,
              label: "Update Toy",
              gradient: "from-pink-500 to-purple-600",
            },
            {
              id: "checkDB",
              icon: Database,
              label: "Database",
              gradient: "from-purple-500 to-indigo-600",
            },
            {
              id: "users",
              icon: Users,
              label: "Users",
              gradient: "from-sky-500 to-blue-600",
            },
            {
              id: "settings",
              icon: Settings,
              label: "Settings",
              gradient: "from-orange-500 to-red-600",
            },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;

            return (
              <button
                key={item.id}
                className={`relative group flex items-center gap-4 w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r " +
                      item.gradient +
                      " shadow-lg shadow-purple-500/30 scale-105"
                    : "hover:bg-white/10 hover:translate-x-2"
                }`}
                onClick={() => {
                  setActivePanel(item.id);
                  closeMobileMenu();
                }}
              >
                {!isActive && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`}
                  ></div>
                )}

                <div
                  className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive
                      ? "bg-white/20"
                      : "bg-white/5 group-hover:bg-white/10"
                  } transition-all duration-300`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="relative z-10 font-semibold text-base">
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Decorative Bottom Section */}
        <div className="absolute bottom-8 left-6 right-6 space-y-4">
          {/* Logout Button */}
          <button
            onClick={async () => {
              try {
                await api
                  .post("/auth/logout", {}, { withCredentials: true })
                  .catch(() => {});
                await api
                  .post("/auth/google/logout", {}, { withCredentials: true })
                  .catch(() => {});
                auth.setUser(null);
                toast.success("Logged out successfully");
                navigate("/signup");
              } catch (error: any) {
                toast.error(error.response?.data?.message || "Logout failed");
              }
            }}
            className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-red-400/50 rounded-2xl transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-red-500/20 group-hover:bg-red-500/30 rounded-xl flex items-center justify-center transition-all duration-300">
              <ArrowLeft className="w-5 h-5 text-red-400 group-hover:text-red-300" />
            </div>
            <span className="font-semibold text-base text-red-400 group-hover:text-red-300">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen relative z-10">
        {/* Top Bar */}
        <div className="bg-purple-900/30 backdrop-blur-xl border-b border-purple-500/20 p-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-purple-300 hover:text-white transition-colors p-2 hover:bg-purple-500/20 rounded-xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Home Navigation */}
            <button
              onClick={handleNavigate}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-purple-500/20 hover:border-purple-400/40 rounded-xl transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-purple-300" />
              <span className="text-sm font-medium text-white hidden sm:inline">
                Back to Home
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white font-medium">Admin</span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-pink-500/30">
              A
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activePanel === "addToy" && (
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30">
                    ➕
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-white">
                      Add New Product
                    </h2>
                    <p className="text-purple-300/60 text-lg mt-1">
                      Create and publish a new item to your store
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Card */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-purple-500/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Upload */}
                    <div className="flex flex-col gap-4 md:col-span-2">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">
                        Product Image
                      </label>
                      <div className="relative group/upload">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-20 group-hover/upload:opacity-40 transition duration-300"></div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setImageFile(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="relative w-full bg-purple-900/30 border-2 border-purple-500/30 hover:border-purple-400/50 rounded-2xl p-5 text-sm transition-all file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-pink-500 file:to-purple-600 file:text-white hover:file:from-pink-600 hover:file:to-purple-700 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">
                        Product Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Super Action Figure"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="bg-purple-900/30 border-2 border-purple-500/30 rounded-2xl p-4 text-base focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all placeholder:text-purple-300/30"
                      />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">
                        Price ($)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 text-lg font-bold">
                          $
                        </span>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value))}
                          className="w-full bg-purple-900/30 border-2 border-purple-500/30 rounded-2xl p-4 pl-10 text-base focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all placeholder:text-purple-300/30"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-4 md:col-span-2">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">
                        Description
                      </label>
                      <textarea
                        placeholder="Describe the product features..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-purple-900/30 border-2 border-purple-500/30 rounded-2xl p-4 text-base focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 transition-all placeholder:text-purple-300/30 resize-none"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-bold text-white uppercase tracking-wider">
                        Rating
                      </label>
                      <div className="flex gap-3 items-center p-4 bg-purple-900/30 rounded-2xl border-2 border-purple-500/30">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-8 h-8 cursor-pointer transition-all hover:scale-125 active:scale-110"
                            fill={star <= rating ? "#fbbf24" : "none"}
                            stroke={star <= rating ? "#fbbf24" : "#a78bfa"}
                            strokeWidth={2}
                            onClick={() => setRating(star)}
                          />
                        ))}
                        <span className="ml-2 text-white font-bold text-lg">
                          {rating}/5
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-6">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`relative group/btn w-full overflow-hidden ${
                          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-60 group-hover/btn:opacity-100 transition duration-300"></div>
                        <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl transition-all group-hover/btn:scale-[1.02] flex items-center justify-center gap-3">
                          {isSubmitting ? (
                            <span className="animate-pulse">Adding...</span>
                          ) : (
                            <>
                              <Plus className="w-6 h-6" />
                              Add Product to Store
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === "updateToy" && (
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30">
                    ✏️
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-white">
                      Update Toys
                    </h2>
                    <p className="text-purple-300/60 text-lg mt-1">
                      Edit or remove existing toys from your store
                    </p>
                  </div>
                </div>
              </div>

              {/* Refresh Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={fetchFigures}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-bold hover:scale-105 transition"
                >
                  🔄 Refresh
                </button>
              </div>

              {/* Figures List */}
              {figures.length === 0 ? (
                <p className="text-purple-300 text-lg">
                  No toys found in database.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {figures.map((toy) => (
                    <div
                      key={toy._id}
                      className="bg-gradient-to-br from-purple-900/40 to-black/50 p-6 rounded-2xl shadow-xl border border-purple-500/20"
                    >
                      <img
                        src={
                          typeof toy.image === "string"
                            ? toy.image
                            : toy.image?.url || "/placeholder.png"
                        }
                        alt={toy.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h3 className="text-xl font-bold text-white">
                        {toy.name}
                      </h3>
                      <p className="text-purple-300">${toy.price}</p>
                      <p className="text-purple-400 text-sm">
                        {toy.description}
                      </p>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleEdit(toy)}
                          className="flex-1 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(toy._id)}
                          className="flex-1 px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Edit Modal */}
              {editingToy && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                  <div className="bg-purple-900/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Edit Toy
                    </h3>

                    <input
                      type="text"
                      value={editingToy.name}
                      onChange={(e) =>
                        setEditingToy({ ...editingToy, name: e.target.value })
                      }
                      className="w-full mb-3 p-3 rounded-lg bg-purple-800 text-white"
                      placeholder="Toy Name"
                    />
                    <input
                      type="number"
                      value={editingToy.price}
                      onChange={(e) =>
                        setEditingToy({ ...editingToy, price: e.target.value })
                      }
                      className="w-full mb-3 p-3 rounded-lg bg-purple-800 text-white"
                      placeholder="Price"
                    />
                    <textarea
                      value={editingToy.description}
                      onChange={(e) =>
                        setEditingToy({
                          ...editingToy,
                          description: e.target.value,
                        })
                      }
                      className="w-full mb-3 p-3 rounded-lg bg-purple-800 text-white"
                      placeholder="Description"
                    />

                    <div className="flex justify-between mt-4">
                      <button
                        onClick={handleUpdate}
                        className="px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingToy(null)}
                        className="px-6 py-3 bg-gray-600 rounded-lg text-white hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePanel === "checkDB" && (
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30">
                    📊
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-white">
                      Database Overview
                    </h2>
                    <p className="text-purple-300/60 text-lg mt-1">
                      Monitor your store's data and analytics
                    </p>
                  </div>
                </div>
              </div>

              {
                <div className="flex justify-end mb-4">
                  <button
                    onClick={fetchStats}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:scale-105 transition"
                  >
                    Reload Stats
                  </button>
                </div>
              }

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    icon: Package,
                    label: "Total Products",
                    value: stats.totalProducts,
                    gradient: "from-pink-500 to-purple-600",
                    color: "pink",
                  },
                  {
                    icon: Users,
                    label: "Active Users",
                    value: stats.activeUsers,
                    gradient: "from-sky-500 to-blue-600",
                    color: "sky",
                  },
                  {
                    icon: DollarSign,
                    label: "Total Sales",
                    value: stats.totalSales,
                    gradient: "from-green-500 to-emerald-600",
                    color: "green",
                  },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="relative group">
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`}
                      ></div>
                      <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <TrendingUp className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-sm text-purple-300/60 uppercase tracking-wider mb-2">
                          {stat.label}
                        </p>
                        <p className="text-4xl font-extrabold text-white">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Graph Section */}
              <div className="relative group pt-20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-500 top-15"></div>
                <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-2xl rounded-3xl p-4 sm:p-6 lg:p-8 border border-purple-500/20">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Database Statistics
                  </h3>
                  <div className="h-64 sm:h-80 lg:h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#555"
                          opacity={0.3}
                        />
                        <XAxis
                          dataKey="name"
                          stroke="#ccc"
                          tick={{ fill: "#ccc", fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          stroke="#ccc"
                          tick={{ fill: "#ccc", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(31, 31, 31, 0.95)",
                            border: "1px solid rgba(139, 92, 246, 0.3)",
                            borderRadius: "12px",
                            color: "#fff",
                            backdropFilter: "blur(10px)",
                          }}
                          cursor={{ fill: "rgba(236, 72, 153, 0.1)" }}
                        />
                        <Bar
                          dataKey="value"
                          fill="url(#colorUv)"
                          radius={[8, 8, 0, 0]}
                          maxBarSize={80}
                        />
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#ec4899"
                              stopOpacity={0.9}
                            />
                            <stop
                              offset="95%"
                              stopColor="#8b5cf6"
                              stopOpacity={0.9}
                            />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === "users" && (
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-sky-500/30">
                    👥
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-white">
                      User Management
                    </h2>
                    <p className="text-purple-300/60 text-lg mt-1">
                      View and manage all registered users
                    </p>
                  </div>
                </div>
              </div>

              {/* User Table */}
              <div className="overflow-x-auto rounded-xl border border-sky-500/30">
                <table className="w-full text-left text-white">
                  <thead className="bg-sky-700/50 text-sky-200 uppercase text-sm">
                    <tr>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Provider</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u._id}
                        className="border-b border-sky-500/20 hover:bg-sky-900/20"
                      >
                        <td className="p-3">{u.name || "N/A"}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3 capitalize">{u.provider}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => {
                              setEditingUser(u);
                              setEditForm({
                                name: u.name || "",
                                email: u.email,
                              });
                            }}
                            className="px-3 py-1 bg-sky-500/70 hover:bg-sky-600 rounded-md text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeletingUser(u)}
                            className="px-3 py-1 bg-red-500/70 hover:bg-red-600 rounded-md text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Edit Model */}
          {editingUser && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-sky-500/30">
                <h3 className="text-xl font-bold text-white mb-4">Edit User</h3>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-sky-500/30"
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  placeholder="Email"
                  className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-sky-500/30"
                />
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 bg-gray-600 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await api.put(
                          `/users/${editingUser.provider}/${editingUser._id}`,
                          { name: editForm.name, email: editForm.email },
                          { withCredentials: true }
                        );
                        toast.success("User updated");
                        setEditingUser(null);
                        fetchUsers();
                      } catch {
                        toast.error("Update failed");
                      }
                    }}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* User Delete Model */}
          {deletingUser && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-red-500/30">
                <h3 className="text-xl font-bold text-white mb-4">
                  Confirm Delete
                </h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete{" "}
                  <span className="text-red-400">
                    {deletingUser.name || deletingUser.email}
                  </span>
                  ?
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setDeletingUser(null)}
                    className="px-4 py-2 bg-gray-600 rounded-md"
                  >
                    No
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await api.delete(
                          `/users/${deletingUser.provider}/${deletingUser._id}`,
                          {
                            withCredentials: true,
                          }
                        );
                        toast.success("User deleted");
                        setDeletingUser(null);
                        fetchUsers();
                      } catch {
                        toast.error("Delete failed");
                      }
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {activePanel === "settings" && (
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-500/30">
                    ⚙️
                  </div>
                  <div>
                    <h2 className="text-4xl font-extrabold text-white">
                      Settings
                    </h2>
                    <p className="text-purple-300/60 text-lg mt-1">
                      Configure your dashboard and store preferences
                    </p>
                  </div>
                </div>
              </div>

              {/* Clear Messages Card */}
              <div className="relative group mb-6">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-purple-900/50 to-black/50 backdrop-blur-2xl rounded-3xl p-8 border border-purple-500/20">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Clear All Messages
                  </h3>
                  <p className="text-purple-300/70 text-lg mb-4">
                    You can clear all customer messages from the system. This
                    action cannot be undone.
                  </p>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all"
                  >
                    <Trash2 className="inline-block mr-2" /> Clear All Messages
                  </button>
                </div>
              </div>

              {/* Messages List */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Inbox className="w-6 h-6 text-white" /> Customer Messages
                </h3>
                {loadingMessages ? (
                  <p className="text-purple-300">Loading messages...</p>
                ) : messages.length === 0 ? (
                  <p className="text-purple-400/70">No messages found</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className="p-4 bg-white/5 border border-white/10 rounded-xl text-white"
                      >
                        <p className="font-bold">
                          {msg.name} ({msg.email})
                        </p>
                        <p className="text-purple-300 text-sm">{msg.subject}</p>
                        <p className="mt-2">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirmation Modal */}
              {showConfirm && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                  <div className="bg-gradient-to-br from-purple-900 to-black p-6 rounded-2xl shadow-lg border border-purple-500/30 max-w-sm w-full">
                    <h2 className="text-xl text-white font-bold mb-4">
                      Are you sure you want to clear all messages?
                    </h2>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowConfirm(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                      >
                        No
                      </button>
                      <button
                        onClick={handleClearMessages}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
