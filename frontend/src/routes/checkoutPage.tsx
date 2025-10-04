import { useEffect, useState } from "react";
import {
  CreditCard,
  Lock,
  Package,
  Sparkles,
  Truck as TruckIcon,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosInstance";

const parsePrice = (val: any): number => {
  // Try numbers first, then strings (strip currency), otherwise 0
  if (val === null || val === undefined) return 0;
  if (typeof val === "number" && Number.isFinite(val)) return val;
  if (typeof val === "string") {
    // remove non-numeric except dot and minus
    const cleaned = val.replace(/[^0-9.-]+/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  // fallback: try to coerce
  const coerced = Number(val);
  return Number.isFinite(coerced) ? coerced : 0;
};

const getItemPrice = (item: any): number => {
  // support multiple shapes: item.price, item.figure?.price, item.product?.price, item.payload.price
  return (
    parsePrice(item.price) ||
    parsePrice(item.figure?.price) ||
    parsePrice(item.product?.price) ||
    parsePrice(item.payload?.price) ||
    0
  );
};

const getItemName = (item: any) =>
  item.name || item.figure?.name || item.product?.name || "Product";

const getItemQty = (item: any) =>
  Number.isFinite(item.quantity) ? item.quantity : Number(item.qty) || 1;

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [savings, setSavings] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contact: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // fetch cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await api.get("/cart", { withCredentials: true });
        // Debug: check exact structure your backend returns
        // console.log("GET /cart ->", res.data);

        // prefer array directly; if backend returns { items: [...] } handle that
        const items = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.items)
          ? res.data.items
          : [];

        setCartItems(items);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // compute totals whenever cartItems or savings change
  useEffect(() => {
    const computeTotals = () => {
      const sub = cartItems.reduce((acc: number, item: any) => {
        const price = getItemPrice(item);
        const qty = getItemQty(item);
        return acc + price * qty;
      }, 0);

      const taxAmount = sub * 0.1; // 10% tax
      const shippingFee = sub > 100 ? 0 : 10; // example rule
      const totalCalc = sub + taxAmount + shippingFee - (savings || 0);

      setSubtotal(sub);
      setTax(taxAmount);
      setShipping(shippingFee);
      setTotal(totalCalc >= 0 ? totalCalc : 0);
    };

    computeTotals();
  }, [cartItems, savings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.contact ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvv
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (subtotal <= 0) {
      alert("Cart is empty or invalid. Cannot process payment.");
      return;
    }

    try {
      setIsProcessing(true);

      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 1400));

      // Optional: save order in backend
      try {
        await api.post(
          "/orders/create",
          {
            items: cartItems,
            billing: { ...formData, subtotal, tax, shipping, total },
          },
          { withCredentials: true }
        );
      } catch (err) {
        console.warn("Order save failed (optional):", err);
      }

      // ✅ Clear cart on backend
      try {
        await api.delete("/cart/clear", { withCredentials: true });
      } catch (err) {
        console.warn("/cart/clear failed:", err);
      }

      // ✅ Reset local states (clear checkout + cart)
      setCartItems([]);
      setSubtotal(0);
      setTax(0);
      setShipping(0);
      setTotal(0);
      setFormData({
        name: "",
        email: "",
        address: "",
        contact: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });

      setIsProcessing(false);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      alert("Payment failed. Try again.");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 rounded-full border-t-transparent animate-spin" />
          <p>Loading Checkout...</p>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-700 via-emerald-900 to-black flex items-center justify-center text-center px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 max-w-lg mx-auto shadow-2xl">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🎉 Thank you!
          </h1>
          <p className="text-white/80 mb-4">
            Your order has been placed successfully.
          </p>
          <p className="text-sm text-purple-200">
            A confirmation has been sent to <strong>{formData.email}</strong>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black">
      <Navbar />

      <section className="relative z-10 px-6 py-12 max-w-6xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-6">Billing Information</h2>
              <div className="space-y-4">
                <input
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
                />
                <input
                  name="contact"
                  placeholder="Contact number"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
                />
                <input
                  name="address"
                  placeholder="Shipping address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
                />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5" />
                <h2 className="text-xl font-bold">Payment</h2>
              </div>
              <div className="space-y-4">
                <input
                  name="cardNumber"
                  placeholder="Card number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-white/20 border border-white/30"
                  />
                  <input
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="p-3 rounded-lg bg-white/20 border border-white/30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-300">Your cart is empty</p>
                ) : (
                  cartItems.map((item, i) => {
                    const price = getItemPrice(item);
                    const qty = getItemQty(item);
                    return (
                      <div
                        key={item._id ?? item.figureId ?? i}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                      >
                        <div>
                          <p className="text-white text-sm">
                            {getItemName(item)}
                          </p>
                          <p className="text-purple-300 text-xs">Qty: {qty}</p>
                        </div>
                        <p className="text-white font-semibold">
                          ${(price * qty).toFixed(2)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="space-y-2 py-4 border-t border-white/20">
                <div className="flex justify-between text-purple-200">
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-purple-400" /> Subtotal
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span className="flex items-center gap-2">
                    <TruckIcon className="w-4 h-4 text-purple-400" /> Shipping
                  </span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-400">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-purple-200">
                  <span className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-purple-400" /> Tax (10%)
                  </span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-white/20 pt-4 flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing || subtotal <= 0}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : `Pay $${total.toFixed(2)}`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-purple-300 text-xs">
                <Lock className="w-3 h-3" />
                <span>Secured Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CheckoutPage;
