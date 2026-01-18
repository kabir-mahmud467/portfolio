import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  FiCode,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiLayers,
  FiSettings,
} from 'react-icons/fi'
import './Skills.css'

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const skillCategories = [
    {
      icon: <FiCode />,
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      icon: <FiDatabase />,
      title: 'Backend',
      skills: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs', 'GraphQL'],
    },
    {
      icon: <FiCloud />,
      title: 'Cloud & DevOps',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux'],
    },
    {
      icon: <FiSmartphone />,
      title: 'Mobile',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    },
    {
      icon: <FiLayers />,
      title: 'Tools & Others',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Webpack', 'Vite'],
    },
    {
      icon: <FiSettings />,
      title: 'Practices',
      skills: ['Agile', 'Scrum', 'TDD', 'Code Review', 'Documentation'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            My <span className="gradient-text">Skills</span>
          </motion.h2>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="skill-category"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="skill-icon">{category.icon}</div>
                <h3 className="skill-title">{category.title}</h3>
                <div className="skill-tags">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
