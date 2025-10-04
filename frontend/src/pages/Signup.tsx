import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    forgotEmail: "",
  });

  const auth = useAuth() as any;
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (isLogin) {
      // LOGIN
      await api.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      // ✅ Fetch profile after login
      const { data } = await api.get("/auth/profile", {
        withCredentials: true,
      });
      auth.setUser(data?.user ?? data);

      toast.success("Login successful!");
      if (data.isAdmin) {
        navigate("/admindashboard"); // 🚀 admin
      } else {
        navigate("/dashboard"); // normal user
      }
    } else {
      // REGISTER
      await api.post(
        "/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        { withCredentials: true }
      );

      // ✅ Fetch profile after register
      const { data } = await api.get("/auth/profile", {
        withCredentials: true,
      });
      auth.setUser(data?.user ?? data);

      toast.success("Account created!");
      if (data.isAdmin) {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }
    }
  } catch (err: any) {
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Forgot password logic will go here
  };

const codeClientRef = useRef<any>(null);

useEffect(() => {
  if (window.google) {
    codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      ux_mode: "popup",
      callback: async (resp: { code?: string; error?: string }) => {
        if (resp.error || !resp.code) return;

        try {
          // 1️⃣ Hit Google auth backend route to exchange code & set cookie
          await api.post(
            "/auth/google",
            { code: resp.code },
            { withCredentials: true }
          );

          // 2️⃣ Then fetch the Google profile from backend
          const { data } = await api.get("/auth/google/profile", {
            withCredentials: true,
          });

          // 3️⃣ Save user in AuthContext
          auth.setUser(data);

         // 4️⃣ Redirect based on role
        toast.success("Signed in with Google!");
        if (data.isAdmin) {
          navigate("/admindashboard");  // 🚀 admin redirect
        } else {
          navigate("/dashboard");       // normal user redirect
        }
        } catch (err: any) {
          console.error("Google login error:", err);
          toast.error("Google login failed");
        }
      },
    });
  }
}, []);

const handleGoogleSignIn = () => {
  codeClientRef.current?.requestCode();
};


  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-black relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <Navbar />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        {/* Floating toy elements */}
        <div className="absolute top-20 right-20 text-4xl opacity-10 animate-bounce delay-300">
          🧸
        </div>
        <div className="absolute top-1/2 left-20 text-3xl opacity-15 animate-bounce delay-700">
          🚀
        </div>
        <div className="absolute bottom-32 right-1/4 text-3xl opacity-10 animate-bounce delay-1000">
          🎮
        </div>
        <div className="absolute top-1/4 left-1/3 text-4xl opacity-10 animate-bounce delay-500">
          ⭐
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 mb-4">
            🎯 ToyKingdom
          </h1>
          <p className="text-white/70 text-lg">
            {showForgotPassword
              ? "Reset Your Password"
              : isLogin
              ? "Welcome Back, Collector!"
              : "Join Our Community!"}
          </p>
        </header>

        {/* Main Form Container */}
        <section className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          {/* Forgot Password Form */}
          {showForgotPassword ? (
            <div>
              <header className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Forgot Password? 🔐
                </h2>
                <p className="text-white/70 text-sm">
                  Enter your email and we'll send you a reset link
                </p>
              </header>

              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-white font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    name="forgotEmail"
                    value={formData.forgotEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/60 focus:bg-white/20 transition-all duration-300"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  📧 Send Reset Link
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              {/* Toggle Buttons */}
              <nav
                className="flex bg-white/10 rounded-xl p-1 mb-8"
                role="tablist"
              >
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isLogin
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                  role="tab"
                  aria-selected={isLogin}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    !isLogin
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                  role="tab"
                  aria-selected={!isLogin}
                >
                  Register
                </button>
              </nav>

              {/* Google Sign In Button */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-white/20 to-white/5 text-white/70 rounded-full">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Login/Register Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Register Only) */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-medium mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/60 focus:bg-white/20 transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/60 focus:bg-white/20 transition-all duration-300"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="password"
                      className="text-white font-medium"
                    >
                      Password
                    </label>
                    {isLogin && (
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sky-400 hover:text-sky-300 transition-colors text-sm font-medium"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/60 focus:bg-white/20 transition-all duration-300"
                    required
                  />
                </div>

                {/* Confirm Password Field (Register Only) */}
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-white font-medium mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-pink-400/60 focus:bg-white/20 transition-all duration-300"
                      required={!isLogin}
                    />
                  </div>
                )}

                {/* Terms & Conditions (Register Only) */}
                {!isLogin && (
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-4 h-4 text-pink-500 bg-white/10 border border-white/20 rounded focus:ring-pink-500 focus:ring-2"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-white/80 text-sm leading-relaxed"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-pink-400 hover:text-pink-300 font-medium"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-pink-400 hover:text-pink-300 font-medium"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  {isLogin ? (
                    <>🔓 Sign In to Your Account</>
                  ) : (
                    <>🎉 Create Your Account</>
                  )}
                </button>
              </form>

              {/* Additional Links */}
              <div className="mt-6 text-center">
                <p className="text-white/60 text-sm">
                  {isLogin ? "New to ToyKingdom?" : "Already have an account?"}{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                  >
                    {isLogin ? "Create an account" : "Sign in here"}
                  </button>
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Trust Indicators */}
        <footer className="mt-8 text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <span>🛡️</span>
              <span>Secure & Safe</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 text-sm">
              <span>🔒</span>
              <span>SSL Protected</span>
            </div>
            <div className="flex items-center gap-2 text-purple-400 text-sm">
              <span>⭐</span>
              <span>Trusted by 10k+ Collectors</span>
            </div>
          </div>
          <p className="text-white/40 text-xs">
            Protected by industry-standard encryption
          </p>
        </footer>
      </div>
    </main>
  );
};

export default SignIn;
