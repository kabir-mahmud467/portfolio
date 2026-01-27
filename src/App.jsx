import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import SocialLinks from './pages/SocialLinks'

function App() {
  // 1. Initialize State as 'dark' (Your requested default)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()

  useEffect(() => {
    // 2. Check for saved preference in LocalStorage
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      // If user has manually chosen a theme, use it
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      // 3. If NO saved preference, use System Preference (Auto)
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      // If system is dark, use dark. If system is light, use light.
      const autoTheme = systemPrefersDark ? 'dark' : 'light' 
      
      setTheme(autoTheme)
      document.documentElement.setAttribute('data-theme', autoTheme)
    }

    // 4. Add Listener: Update automatically if System Settings change
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only switch automatically if the user hasn't manually locked a theme
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="App">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/social" element={<SocialLinks />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App