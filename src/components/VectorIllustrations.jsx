import { motion } from 'framer-motion'
import { useMemo } from 'react'
import './VectorIllustrations.css'

const VectorIllustrations = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
      xOffset: Math.random() * 50 - 25,
    }))
  }, [])

  try {
    return (
      <div className="vector-container">
      {/* Animated geometric shapes */}
      <svg className="vector-bg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0.3 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.2 }} />
          </linearGradient>
        </defs>
        
        {/* Floating circles */}
        <motion.g
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="200" cy="150" r="80" fill="url(#grad1)" />
        </motion.g>
        
        <motion.g
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <circle cx="900" cy="400" r="60" fill="url(#grad2)" />
        </motion.g>
        
        {/* Hexagons */}
        <motion.g
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          transform="translate(600, 200)"
        >
          <polygon points="0,-100 50,-50 50,50 0,100 -50,50 -50,-50" fill="none" stroke="url(#grad1)" strokeWidth="2" />
        </motion.g>
        
        {/* Triangles */}
        <motion.g
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          transform="translate(200, 550)"
        >
          <polygon points="0,50 -100,-50 100,-50" fill="url(#grad2)" />
        </motion.g>
        
        {/* Lines */}
        <motion.g
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <line x1="50" y1="50" x2="300" y2="300" stroke="url(#grad1)" strokeWidth="2" />
        </motion.g>
        
        <motion.g
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <line x1="1000" y1="50" x2="1150" y2="200" stroke="url(#grad2)" strokeWidth="2" />
        </motion.g>
      </svg>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      </div>
    )
  } catch (error) {
    console.error('VectorIllustrations error:', error)
    return null
  }
}

export default VectorIllustrations
