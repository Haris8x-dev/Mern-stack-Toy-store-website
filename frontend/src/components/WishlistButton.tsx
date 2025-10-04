// src/components/WishlistButton.tsx
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";
import api from "../api/axiosInstance";

interface WishlistButtonProps {
  figureId: string;
  initialWishlisted?: boolean;
  size?: "sm" | "lg";
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  figureId,
  initialWishlisted = false,
  size = "sm",
}) => {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);

  useEffect(() => {
    // ✅ Always check backend on mount (so it stays synced across views)
    api.get("/wishlist", { withCredentials: true }).then((res) => {
      const ids = res.data.map((item: any) => item._id);
      setWishlisted(ids.includes(figureId));
    });
  }, [figureId]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const res = await api.post(
        "/wishlist/toggle",
        { figureId },
        { withCredentials: true }
      );

      if (res.data.added) {
        setWishlisted(true);
        toast.success("✅ Added to wishlist!");
      } else {
        setWishlisted(false);
        toast.error("❌ Removed from wishlist!");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  const btnClasses = size === "lg" ? "w-12 h-12" : "w-10 h-10";

  return (
    <button
      onClick={handleToggle}
      className={`${btnClasses} rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
        wishlisted
          ? "bg-gradient-to-r from-red-600 to-pink-700 shadow-red-500/40"
          : "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/30"
      }`}
    >
      <Heart
        className={`${size === "lg" ? "w-6 h-6" : "w-5 h-5"} ${
          wishlisted ? "fill-white text-white" : "text-white"
        }`}
      />
    </button>
  );
};

export default WishlistButton;
