import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import './MotivationalSection.css'

const MotivationalSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const quotes = [
    {
      text: "Code is like humor. When you have to explain it, it's bad.",
      author: "Cory House"
    },
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker"
    },
    {
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    }
  ]

  const poem = {
    title: "Digital Dreams",
    lines: [
      "In lines of code, I find my voice,",
      "Where logic meets creative choice.",
      "Each function built, each bug I fix,",
      "Brings digital dreams to life, it clicks.",
      "",
      "Through pixels bright and data streams,",
      "I craft the future of our dreams.",
      "Where innovation never sleeps,",
      "And possibilities run deep."
    ]
  }

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
        duration: 0.6,
      },
    },
  }

  return (
    <section className="motivational-section" ref={ref}>
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="poem-container" variants={itemVariants}>
            <div className="poem-icon">
              <FaQuoteLeft />
            </div>
            <h3 className="poem-title">{poem.title}</h3>
            <div className="poem-lines">
              {poem.lines.map((line, index) => (
                <motion.p
                  key={index}
                  className={line === '' ? 'poem-line-break' : 'poem-line'}
                  variants={itemVariants}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>

          <motion.div className="quotes-grid" variants={itemVariants}>
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                className="quote-card"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                <p className="quote-text">{quote.text}</p>
                <p className="quote-author">— {quote.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default MotivationalSection
