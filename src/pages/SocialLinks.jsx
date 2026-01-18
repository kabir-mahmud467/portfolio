import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiGlobe,
} from 'react-icons/fi'
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaDiscord,
  FaTelegram,
  FaReddit,
  FaMedium,
  FaDev,
  FaBehance,
  FaDribbble,
  FaCodepen,
  FaStackOverflow,
  FaProductHunt,
} from 'react-icons/fa'
import { SiHashnode, SiLeetcode, SiHackerrank } from 'react-icons/si'
import './SocialLinks.css'

const SocialLinks = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const socialPlatforms = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      color: '#181717',
      placeholder: 'https://github.com/yourusername',
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      color: '#0077B5',
      placeholder: 'https://linkedin.com/in/yourusername',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      color: '#1DA1F2',
      placeholder: 'https://twitter.com/yourusername',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram />,
      color: '#E4405F',
      placeholder: 'https://instagram.com/yourusername',
    },
    {
      name: 'Facebook',
      icon: <FaFacebook />,
      color: '#1877F2',
      placeholder: 'https://facebook.com/yourusername',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube />,
      color: '#FF0000',
      placeholder: 'https://youtube.com/@yourusername',
    },
    {
      name: 'Email',
      icon: <FiMail />,
      color: '#EA4335',
      placeholder: 'mailto:your.email@example.com',
    },
    {
      name: 'Portfolio',
      icon: <FiGlobe />,
      color: '#6366f1',
      placeholder: 'https://yourwebsite.com',
    },
    {
      name: 'Discord',
      icon: <FaDiscord />,
      color: '#5865F2',
      placeholder: 'https://discord.gg/yourusername',
    },
    {
      name: 'Telegram',
      icon: <FaTelegram />,
      color: '#26A5E4',
      placeholder: 'https://t.me/yourusername',
    },
    {
      name: 'Reddit',
      icon: <FaReddit />,
      color: '#FF4500',
      placeholder: 'https://reddit.com/user/yourusername',
    },
    {
      name: 'Medium',
      icon: <FaMedium />,
      color: '#000000',
      placeholder: 'https://medium.com/@yourusername',
    },
    {
      name: 'Dev.to',
      icon: <FaDev />,
      color: '#0A0A0A',
      placeholder: 'https://dev.to/yourusername',
    },
    {
      name: 'Hashnode',
      icon: <SiHashnode />,
      color: '#2962FF',
      placeholder: 'https://hashnode.com/@yourusername',
    },
    {
      name: 'Behance',
      icon: <FaBehance />,
      color: '#1769FF',
      placeholder: 'https://behance.net/yourusername',
    },
    {
      name: 'Dribbble',
      icon: <FaDribbble />,
      color: '#EA4C89',
      placeholder: 'https://dribbble.com/yourusername',
    },
    {
      name: 'CodePen',
      icon: <FaCodepen />,
      color: '#000000',
      placeholder: 'https://codepen.io/yourusername',
    },
    {
      name: 'Stack Overflow',
      icon: <FaStackOverflow />,
      color: '#F48024',
      placeholder: 'https://stackoverflow.com/users/youruserid',
    },
    {
      name: 'LeetCode',
      icon: <SiLeetcode />,
      color: '#FFA116',
      placeholder: 'https://leetcode.com/yourusername',
    },
    {
      name: 'HackerRank',
      icon: <SiHackerrank />,
      color: '#00EA64',
      placeholder: 'https://hackerrank.com/yourusername',
    },
    {
      name: 'Product Hunt',
      icon: <FaProductHunt />,
      color: '#DA552F',
      placeholder: 'https://producthunt.com/@yourusername',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <section className="social-links-page" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h1 className="page-title" variants={itemVariants}>
            Connect With <span className="gradient-text">Me</span>
          </motion.h1>

          <motion.p className="page-description" variants={itemVariants}>
            Find me on these platforms. Feel free to reach out and connect!
          </motion.p>

          <div className="social-grid">
            {socialPlatforms.map((platform, index) => (
              <motion.a
                key={index}
                href={platform.placeholder}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ '--platform-color': platform.color }}
              >
                <div className="social-icon-wrapper">
                  <div className="social-icon" style={{ color: platform.color }}>
                    {platform.icon}
                  </div>
                </div>
                <h3 className="social-name">{platform.name}</h3>
                <p className="social-placeholder">{platform.placeholder}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialLinks
