import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext' // ← adjust the relative path if your file structure differs


const Navbar = () => {
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
const auth = useAuth() as any     // <-- consume AuthContext
const user = auth?.user          // <-- single source of truth
const navigate = useNavigate()

// add this inside Navbar component, after `const navigate = useNavigate()`
const goToDashboard = () => {
  // user may be null/undefined; guard safely
  if (user && user.isAdmin) {
    navigate("/admindashboard");
  } else {
    navigate("/dashboard");
  }
};

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('nav') && !target.closest('aside') && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`w-full flex justify-center items-center py-6 min-h-[180px] relative transition-all duration-300 ${isMobileMenuOpen ? 'z-30 blur-sm' : 'z-10'}`}>
        <nav
          className="w-[90%] md:w-[70%] lg:w-[60%] h-16 px-6 flex items-center justify-between 
                     rounded-4xl bg-white/10 backdrop-blur-md shadow-2xl
                     border border-white/20 text-white relative overflow-hidden
                     before:absolute before:inset-0 before:bg-gradient-to-r 
                     before:from-white/5 before:to-transparent before:rounded-2xl"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
          
          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide z-10 relative text-white drop-shadow-sm">
            TOY-KINGDOM
          </h1>

          {/* Navigation Links - Hidden on screens below 1200px */}
          <ul className="hidden xl:flex space-x-8 font-medium z-10 relative" role="menubar">
            <li role="none">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `hover:text-white/80 transition-all duration-300 relative px-3 py-2 rounded-lg
                   hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg
                   ${isActive ? 'text-white bg-white/15 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
              >
                Home
              </NavLink>
            </li>
            <li role="none">
              <NavLink 
                to="/figures" 
                className={({ isActive }) => 
                  `hover:text-white/80 transition-all duration-300 relative px-3 py-2 rounded-lg
                   hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg
                   ${isActive ? 'text-white bg-white/15 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
              >
                Figures
              </NavLink>
            </li>
            <li role="none">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `hover:text-white/80 transition-all duration-300 relative px-3 py-2 rounded-lg
                   hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg
                   ${isActive ? 'text-white bg-white/15 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
              >
                Contact
              </NavLink>
            </li>
            <li role="none">
              <NavLink 
                to="/cart" 
                className={({ isActive }) => 
                  `hover:text-white/80 transition-all duration-300 relative px-3 py-2 rounded-lg
                   hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg
                   ${isActive ? 'text-white bg-white/15 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
              >
                Cart
              </NavLink>
            </li>
          </ul>

          {/* CTA Button - Hidden on screens below 1200px */}
          {user ? (
            <button
              onClick={goToDashboard}
              className="hidden xl:flex px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 
                         border border-white/30 hover:border-white/40
                         transition-all duration-300 font-medium text-white
                         backdrop-blur-sm shadow-lg hover:shadow-xl
                         hover:scale-105 active:scale-95 z-10 relative
                         before:absolute before:inset-0 before:rounded-xl 
                         before:bg-gradient-to-r before:from-white/10 before:to-transparent
                         before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            >
              <span className="relative z-10">Dashboard</span>
            </button>
          ) : (
          <NavLink
            to="/signup"
            className="hidden xl:flex px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 
                               border border-white/30 hover:border-white/40
                               transition-all duration-300 font-medium text-white
                               backdrop-blur-sm shadow-lg hover:shadow-xl
                               hover:scale-105 active:scale-95 z-10 relative
                               before:absolute before:inset-0 before:rounded-xl 
                               before:bg-gradient-to-r before:from-white/10 before:to-transparent
                               before:opacity-0 hover:before:opacity-100 before:transition-opacity"
            role="button"
          >
            <span className="relative z-10">Sign In</span>
          </NavLink>
        )}

          {/* Mobile menu button - Visible on screens below 1200px */}
          <button 
            className="xl:hidden p-2 rounded-lg bg-white/10 border border-white/20 z-10 relative
                       hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <div className="w-6 h-6 relative flex flex-col justify-center items-center">
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300 absolute
                           ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}
              />
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300
                           ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span 
                className={`block w-6 h-0.5 bg-white transition-all duration-300 absolute
                           ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300
                   ${isMobileMenuOpen ? 'opacity-100 z-[200]' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu */}
      <aside 
        className={`fixed top-0 left-0 h-full w-80 bg-white/10 backdrop-blur-md
                   border-r border-white/20 transform transition-transform duration-300 ease-in-out
                   ${isMobileMenuOpen ? 'translate-x-0 z-[300]' : '-translate-x-full z-[300]'}
                   before:absolute before:inset-0 before:bg-gradient-to-br 
                   before:from-white/10 before:via-transparent before:to-white/5`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile Menu Header */}
        <header className="flex items-center justify-between p-6 border-b border-white/20 relative z-10">
          <h2 className="text-xl font-bold text-white drop-shadow-sm">TOY-KINGDOM</h2>
          <button 
            className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 
                       transition-all duration-300"
            aria-label="Close mobile menu"
            onClick={closeMobileMenu}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {/* Mobile Navigation Links */}
        <nav className="flex-1 px-6 py-8 relative z-10" role="navigation">
          <ul className="space-y-4" role="menubar">
            <li role="none">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                   hover:bg-white/15 hover:backdrop-blur-sm relative z-10
                   ${isActive ? 'text-white bg-white/20 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="text-lg font-medium">Home</span>
              </NavLink>
            </li>
            <li role="none">
              <NavLink 
                to="/figures" 
                className={({ isActive }) => 
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                   hover:bg-white/15 hover:backdrop-blur-sm relative z-10
                   ${isActive ? 'text-white bg-white/20 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="text-lg font-medium">Figures</span>
              </NavLink>
            </li>
            <li role="none">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                   hover:bg-white/15 hover:backdrop-blur-sm relative z-10
                   ${isActive ? 'text-white bg-white/20 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="text-lg font-medium">Contact</span>
              </NavLink>
            </li>
             <li role="none">
              <NavLink 
                to="/cart" 
                className={({ isActive }) => 
                  `block w-full text-left px-4 py-3 rounded-lg transition-all duration-300
                   hover:bg-white/15 hover:backdrop-blur-sm relative z-10
                   ${isActive ? 'text-white bg-white/20 shadow-inner' : 'text-white/90'}`
                }
                role="menuitem"
                onClick={closeMobileMenu}
              >
                <span className="text-lg font-medium">Cart</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile CTA Button */}
        <footer className="p-6 border-t border-white/20 relative z-10">
        {user ? (
        <button
          onClick={() => navigate("/dashboard")}
          className="flex xl:hidden px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 
                             border border-white/30 hover:border-white/40
                             transition-all duration-300 font-medium text-white
                             backdrop-blur-sm shadow-lg hover:shadow-xl
                             hover:scale-105 active:scale-95 z-10 relative
                             before:absolute before:inset-0 before:rounded-xl 
                             before:bg-gradient-to-r before:from-white/10 before:to-transparent
                             before:opacity-0 hover:before:opacity-100 before:transition-opacity"
        >
          <span className="relative z-10">Dashboard</span>
        </button>
      ) : (
        <NavLink
          to="/signup"
          className="flex xl:hidden px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 
                             border border-white/30 hover:border-white/40
                             transition-all duration-300 font-medium text-white
                             backdrop-blur-sm shadow-lg hover:shadow-xl
                             hover:scale-105 active:scale-95 z-10 relative
                             before:absolute before:inset-0 before:rounded-xl 
                             before:bg-gradient-to-r before:from-white/10 before:to-transparent
                             before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          role="button"
        >
          <span className="relative z-10">Sign In</span>
        </NavLink>
      )}
      </footer>
      </aside>
    </>
  )
}

export default Navbar