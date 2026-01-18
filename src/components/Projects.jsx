import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'E-Commerce Platform',
      description:
        'A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/600x400/6366f1/ffffff?text=E-Commerce+Platform',
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://ecommerce-demo.com',
    },
    {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      image: 'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Task+Management',
      github: 'https://github.com/yourusername/taskmanager',
      live: 'https://taskmanager-demo.com',
    },
    {
      title: 'Social Media Dashboard',
      description:
        'Analytics dashboard for social media management with data visualization, scheduling, and performance metrics.',
      technologies: ['Vue.js', 'Python', 'Django', 'Chart.js'],
      image: 'https://via.placeholder.com/600x400/ec4899/ffffff?text=Social+Dashboard',
      github: 'https://github.com/yourusername/social-dashboard',
      live: 'https://social-dashboard-demo.com',
    },
    {
      title: 'Weather App',
      description:
        'Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      technologies: ['React', 'OpenWeather API', 'Leaflet', 'CSS3'],
      image: 'https://via.placeholder.com/600x400/10b981/ffffff?text=Weather+App',
      github: 'https://github.com/yourusername/weather-app',
      live: 'https://weather-demo.com',
    },
    {
      title: 'Blog Platform',
      description:
        'Modern blogging platform with markdown support, syntax highlighting, and SEO optimization.',
      technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'Vercel'],
      image: 'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Blog+Platform',
      github: 'https://github.com/yourusername/blog-platform',
      live: 'https://blog-demo.com',
    },
    {
      title: 'Chat Application',
      description:
        'Real-time chat application with end-to-end encryption, file sharing, and group chat capabilities.',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      image: 'https://via.placeholder.com/600x400/3b82f6/ffffff?text=Chat+App',
      github: 'https://github.com/yourusername/chat-app',
      live: 'https://chat-demo.com',
    },
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <FiGithub />
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
