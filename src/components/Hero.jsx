import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi'
import Scene3D from './Scene3D'
import VectorIllustrations from './VectorIllustrations'
import './Hero.css'

const Hero = () => {
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FiMail />, href: 'mailto:your.email@example.com', label: 'Email' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="home" className="hero">
      <Suspense fallback={<div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }} />}>
        <Scene3D />
      </Suspense>
      <VectorIllustrations />
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span>👋 Welcome to my portfolio</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="gradient-text">Kabir Mahmud</span>
          </motion.h1>

          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            Full Stack Developer & Creative Technologist
          </motion.h2>

          <motion.p className="hero-description" variants={itemVariants}>
            I craft exceptional digital experiences through code, creativity, and innovation.
            Passionate about building scalable solutions and bringing ideas to life.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <Link to="/contact">
              <motion.div
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.div>
            </Link>
            <motion.a
              href="/resume.pdf"
              className="btn btn-secondary"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div className="hero-social" variants={itemVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="mouse"></div>
      </motion.div>
    </section>
  )
}

export default Hero
