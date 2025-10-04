import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    const formTimer = setTimeout(() => setFormVisible(true), 600);

    return () => {
      clearTimeout(timer);
      clearTimeout(formTimer);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          📧
        </div>
        <div
          className="absolute top-40 left-32 text-5xl opacity-25 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          💬
        </div>
        <div
          className="absolute bottom-32 right-1/4 text-4xl opacity-30 animate-bounce"
          style={{ animationDelay: "1.5s" }}
        >
          📱
        </div>
        <div
          className="absolute top-1/3 right-20 text-3xl opacity-20 animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          ✨
        </div>
      </div>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Content */}
      <section className="relative z-10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div
            className={`transition-all duration-1000 ease-out mb-12 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-pink-500/50 animate-pulse">
                  📞
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400">
                  Get in Touch
                </h1>
              </div>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Have questions about our collectibles? We'd love to hear from
                you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Info Card */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  formVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Contact Info
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {/* Email */}
                      <div className="flex items-start gap-4 group/item">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-sky-500/30 group-hover/item:scale-110 transition-transform">
                          <Mail className="w-5 h-5 text-sky-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                            Email
                          </p>
                          <p className="text-white font-medium">
                            support@toystore.com
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-4 group/item">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30 group-hover/item:scale-110 transition-transform">
                          <Phone className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                            Phone
                          </p>
                          <p className="text-white font-medium">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-4 group/item">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center border border-orange-500/30 group-hover/item:scale-110 transition-transform">
                          <MapPin className="w-5 h-5 text-orange-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                            Location
                          </p>
                          <p className="text-white font-medium">
                            123 Toy Street, Collectible City, TC 12345
                          </p>
                        </div>
                      </div>

                      {/* Business Hours */}
                      <div className="flex items-start gap-4 group/item">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center border border-purple-500/30 group-hover/item:scale-110 transition-transform">
                          <Clock className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                            Business Hours
                          </p>
                          <p className="text-white font-medium text-sm">
                            Mon-Fri: 9AM - 6PM
                          </p>
                          <p className="text-white/70 font-medium text-sm">
                            Sat-Sun: 10AM - 4PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  formVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Follow Us
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          icon: Facebook,
                          name: "Facebook",
                          gradient: "from-blue-500 to-blue-600",
                          color: "text-blue-400",
                        },
                        {
                          icon: Twitter,
                          name: "Twitter",
                          gradient: "from-sky-500 to-sky-600",
                          color: "text-sky-400",
                        },
                        {
                          icon: Instagram,
                          name: "Instagram",
                          gradient: "from-pink-500 to-purple-600",
                          color: "text-pink-400",
                        },
                        {
                          icon: Youtube,
                          name: "YouTube",
                          gradient: "from-red-500 to-red-600",
                          color: "text-red-400",
                        },
                      ].map((social, index) => (
                        <button
                          key={index}
                          className="group/social bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all hover:scale-105"
                        >
                          <social.icon
                            className={`w-6 h-6 ${social.color} mx-auto mb-2 group-hover/social:scale-110 transition-transform`}
                          />
                          <p className="text-xs text-white/70 font-medium">
                            {social.name}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Badge */}
              <div
                className={`transition-all duration-1000 ease-out ${
                  formVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-4 border border-green-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <p className="text-white font-semibold">
                      Usually responds in 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div
                className={`transition-all duration-1000 ease-out ${
                  formVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Send className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-white">
                        Send us a Message
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-white/70 mb-2"
                          >
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white/70 mb-2"
                          >
                            Your Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-white/70 mb-2"
                        >
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all"
                          placeholder="How can we help you?"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-white/70 mb-2"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500/50 focus:bg-white/10 transition-all resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="group w-full relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative px-8 py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-bold text-lg">
                          <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                          <span>Send Message</span>
                        </div>
                      </button>

                      <p className="text-xs text-white/50 text-center">
                        By submitting this form, you agree to our privacy policy
                        and terms of service.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div
            className={`mt-12 transition-all duration-1000 ease-out ${
              formVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-3">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Questions
                </span>
              </h2>
              <p className="text-white/60">Quick answers to common questions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "What are your shipping times?",
                  a: "We typically ship orders within 1-2 business days. Delivery takes 3-7 business days depending on your location.",
                  icon: "🚚",
                },
                {
                  q: "Do you offer international shipping?",
                  a: "Yes! We ship to most countries worldwide. Shipping costs and times vary by location.",
                  icon: "🌍",
                },
                {
                  q: "What's your return policy?",
                  a: "We accept returns within 30 days of purchase. Items must be in original condition with all packaging.",
                  icon: "↩️",
                },
                {
                  q: "Are your collectibles authentic?",
                  a: "Absolutely! All our collectibles are 100% authentic and sourced directly from official distributors.",
                  icon: "✅",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-xl flex items-center justify-center text-2xl border border-white/10 flex-shrink-0">
                      {faq.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 transition-all">
                        {faq.q}
                      </h3>
                      <p className="text-white/70 text-sm">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
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

export default Contact;
