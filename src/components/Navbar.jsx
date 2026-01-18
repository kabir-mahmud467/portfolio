import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'
import './Navbar.css'

const Navbar = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Social', path: '/social' },
  ]

  const handleNavClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="nav-content">
          <Link
            to="/"
            className="logo"
            onClick={handleNavClick}
          >
            <motion.span
              className="logo-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              KM
            </motion.span>
          </Link>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={location.pathname === item.path ? 'active' : ''}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="nav-actions">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <FiMoon /> : <FiSun />}
            </motion.button>

            <motion.button
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
