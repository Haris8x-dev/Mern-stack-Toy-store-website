const Footer = () => {
  return (
    <>
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
                  🎯 ToyKingdom
                </h3>
                <p className="text-white/70 leading-relaxed max-w-md">
                  Your ultimate destination for premium collectible figures, action heroes, and magical toys. 
                  We bring imagination to life with authentic, high-quality products from around the world.
                </p>
              </div>
              
              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-4">Follow Our Adventures</h4>
                <div className="flex gap-4">
                  {[
                    { icon: '📘', name: 'Facebook', bg: 'from-blue-500 to-blue-600' },
                    { icon: '📸', name: 'Instagram', bg: 'from-pink-500 to-purple-600' },
                    { icon: '🐦', name: 'Twitter', bg: 'from-sky-400 to-blue-500' },
                    { icon: '📺', name: 'YouTube', bg: 'from-red-500 to-red-600' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`w-12 h-12 bg-gradient-to-r ${social.bg} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <nav aria-label="Footer navigation">
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  'Action Figures',
                  'Collectibles',
                  'Limited Editions',
                  'New Arrivals',
                  'Best Sellers',
                  'Gift Cards'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-pink-400">▶</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Customer Support */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Support & Info</h4>
              <ul className="space-y-3 mb-6">
                {[
                  'Contact Us',
                  'Shipping Info',
                  'Return Policy',
                  'Size Guide',
                  'FAQ',
                  'Track Order'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="text-purple-400">▶</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>        
            </div>
          </div>

          {/* Payment Methods & Certifications */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h5 className="text-white font-semibold mb-3">Secure Payment Methods</h5>
                <div className="flex gap-3">
                  {['💳', '🏦', '📱', '🔒'].map((icon, index) => (
                    <div key={index} className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-lg border border-white/20">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-2 bg-green-500/20 px-3 py-2 rounded-full border border-green-500/30">
                    <span className="text-green-400">🛡️</span>
                    <span className="text-white text-sm font-medium">SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-2 rounded-full border border-blue-500/30">
                    <span className="text-blue-400">✅</span>
                    <span className="text-white text-sm font-medium">Verified Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Legal */}
          <div className="border-t border-white/10 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60 text-sm">
                © 2025 ToyKingdom. All rights reserved. Made with ❤️ for collectors worldwide.
              </p>
              
              <nav aria-label="Legal links">
                <ul className="flex gap-6 text-sm">
                  {[
                    'Privacy Policy',
                    'Terms of Service',
                    'Cookie Policy',
                    'Accessibility'
                  ].map((link, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-white/60 hover:text-white transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-white/40 text-xs">
                🌟 Bringing magic to collectors since 2020 • Premium authentic figures • Worldwide shipping 🌟
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500"></div>
      </footer>
    </>
  )
}

export default Footer