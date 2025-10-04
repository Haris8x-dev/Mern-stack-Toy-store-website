import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [, setIsLoaded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    const heroTimer = setTimeout(() => setHeroVisible(true), 400);
    const featuresTimer = setTimeout(() => setFeaturesVisible(true), 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(heroTimer);
      clearTimeout(featuresTimer);
    };
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-purple-950 to-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        {/* Floating toy elements */}
        <div className="absolute top-20 right-20 text-6xl opacity-20 animate-bounce delay-300">
          🧸
        </div>
        <div className="absolute top-1/2 left-20 text-5xl opacity-15 animate-bounce delay-700">
          🚀
        </div>
        <div className="absolute bottom-32 right-1/4 text-4xl opacity-20 animate-bounce delay-1000">
          🎮
        </div>
        <div className="absolute top-1/4 left-1/3 text-5xl opacity-10 animate-bounce delay-500">
          ⭐
        </div>
      </div>

      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 pt-5 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div
              className={`transition-all duration-1200 ease-out ${
                heroVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-20"
              }`}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-none mb-8">
                <span className="block text-white mb-4">Where</span>
                <span className="block pb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 mb-4">
                  Magic
                </span>
                <span className="block text-white mb-4">Meets</span>
                <span className="block pb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400">
                  Imagination
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed max-w-lg">
                Discover premium collectible figures, action heroes, and magical
                toys that bring your favorite characters to life
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <NavLink
                  to={"/figures"}
                  className="group relative px-10 py-5 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 shadow-xl shadow-pink-500/25"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    🛍️ Shop Now
                    <svg
                      className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
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
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </NavLink>
              </div>
            </div>

            {/* Right Visual Content */}
            <div
              className={`relative transition-all duration-1200 ease-out delay-300 ${
                heroVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-20"
              }`}
            >
              <div className="relative">
                {/* Main showcase card */}
                <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <div className="text-8xl mb-4 ${floatingAnimation}">🎯</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Premium Collection
                    </h3>
                    <p className="text-white/70">
                      Exclusive limited edition figures
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-pink-500/20 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">🦸‍♂️</div>
                      <p className="text-sm text-white/80">Heroes</p>
                    </div>
                    <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">🧙‍♀️</div>
                      <p className="text-sm text-white/80">Fantasy</p>
                    </div>
                    <div className="bg-sky-500/20 rounded-xl p-4 text-center">
                      <div className="text-3xl mb-2">🚀</div>
                      <p className="text-sm text-white/80">Sci-Fi</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                      ✨ New Arrivals Weekly
                    </span>
                  </div>
                </div>

                {/* Floating elements around the card */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">
                  🎁
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl shadow-xl animate-bounce">
                  ⭐
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              featuresVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                Toy Kingdom?
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We're not just a toy shop - we're curators of wonder, bringing you
              the finest collectibles and figures from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🏆",
                title: "Premium Quality",
                description:
                  "Hand-picked authentic figures from trusted manufacturers",
                delay: "0ms",
              },
              {
                icon: "🚚",
                title: "Fast Shipping",
                description: "Free worldwide delivery on orders over $99",
                delay: "200ms",
              },
              {
                icon: "🛡️",
                title: "Authenticity Guaranteed",
                description: "100% genuine products with official licensing",
                delay: "400ms",
              },
              {
                icon: "💎",
                title: "Exclusive Releases",
                description:
                  "First access to limited edition and rare collectibles",
                delay: "600ms",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
                  featuresVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: feature.delay }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center transition-all duration-1000 ${
              featuresVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Collection?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of collectors worldwide who trust us for their
              favorite figures and toys
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg">
                🎯 Browse Collection
              </button>
              <button className="px-8 py-4 border-2 border-white/40 hover:border-white/60 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105">
                📞 Contact Us
              </button>
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

export default Home;
