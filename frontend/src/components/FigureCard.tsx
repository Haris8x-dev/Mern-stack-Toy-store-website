// src/components/FigureCard.tsx
import { Heart, Star } from "lucide-react";

interface FigureCardProps {
  figure: any;
  onSelect: (figure: any) => void;
  userId: string;
  isWishlisted: boolean; // ✅ parent controls this
  onToggleWishlist: () => void; // ✅ parent provides handler
}

const FigureCard: React.FC<FigureCardProps> = ({
  figure,
  onSelect,
  isWishlisted,
  onToggleWishlist,
}) => {
  return (
    <div
      className="relative group cursor-pointer"
      onClick={() => onSelect(figure)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 rounded-3xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>

      <div className="relative bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group-hover:scale-[1.02]">
        {figure.image && (
          <div className="relative overflow-hidden h-56 bg-purple-900/20">
            <img
              src={
                typeof figure.image === "string"
                  ? figure.image
                  : figure.image?.url
              }
              alt={figure.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4"
                fill={star <= figure.rating ? "#fbbf24" : "none"}
                stroke={star <= figure.rating ? "#fbbf24" : "#a78bfa"}
              />
            ))}
            <span className="text-xs text-purple-300/60 ml-2">
              ({figure.rating})
            </span>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">{figure.name}</h2>
          <p className="text-sm text-purple-300/70 mb-4 line-clamp-2">
            {figure.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">
                Price
              </p>
              <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                ${figure.price}
              </p>
            </div>

            {/* ✅ Heart Button with parent sync */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleWishlist();
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all hover:scale-110 ${
                isWishlisted
                  ? "bg-gradient-to-r from-red-600 to-pink-700 shadow-red-500/40"
                  : "bg-gradient-to-r from-red-500 to-pink-600 shadow-red-500/30"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-white text-white" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureCard;
