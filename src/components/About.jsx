import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <div className="about-content">
            <motion.div className="about-text" variants={itemVariants}>
              <p>
                I'm a passionate full stack developer with a love for creating
                innovative digital solutions. With expertise in modern web
                technologies, I bring ideas to life through clean, efficient code
                and thoughtful design.
              </p>
              <p>
                My journey in tech started with curiosity and has evolved into a
                career focused on building scalable applications, solving complex
                problems, and continuously learning new technologies.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new frameworks,
                contributing to open source projects, or sharing knowledge with
                the developer community.
              </p>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">100%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
