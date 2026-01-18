import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import './Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'mailto:your.email@example.com', label: 'Email' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Kabir Mahmud</h3>
            <p className="footer-description">
              Full Stack Developer crafting exceptional digital experiences.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/social">Social</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Connect</h4>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="social-icon"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Kabir Mahmud. All rights reserved.
          </p>
          <motion.button
            className="scroll-to-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
