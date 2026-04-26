import { BrowserRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TermIcon, ArrowRight } from 'lucide-react';

// Component Imports
import Scene from './components/three/Scene';
import Terminal from './components/Terminal';

// Page Imports (Creating these as inline components for this file, 
// but you can move them to /pages/About.jsx etc.)
const Home = () => (
  <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
    <div className="space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-bold uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        System Status: Online
      </div>
      <h1 className="text-6xl md:text-8xl font-black leading-tight">
        Hi, I'm <span className="text-blue-400">Kabir.</span>
      </h1>
      <p className="text-xl text-slate-400 max-w-lg">
        I build high-performance digital ecosystems that blend technical precision with human-centric design.
      </p>
      <div className="flex gap-4">
        <button className="flex items-center gap-2 bg-blue-500 px-8 py-4 rounded font-bold hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all active:scale-95">
          VIEW WORK <ArrowRight size={18} />
        </button>
      </div>
    </div>
    <div className="relative">
      <div className="absolute -inset-4 bg-blue-500/20 blur-3xl rounded-full" />
      <Terminal />
    </div>
  </div>
);

const About = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl py-10">
    <h2 className="text-5xl font-black mb-8 underline decoration-blue-500">USER_PROFILE</h2>
    <p className="text-xl text-slate-300 leading-relaxed">
      A Full-Stack Architect specializing in high-fidelity interactive experiences. 
      I bridge the gap between complex backend logic and pixel-perfect 3D frontends.
    </p>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      {['React / Next.js', 'Node / Express', 'Three.js / WebGL'].map(skill => (
        <div key={skill} className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
          <span className="text-blue-400 font-mono text-xs">SKILL_MODULE</span>
          <h3 className="text-xl font-bold mt-2">{skill}</h3>
        </div>
      ))}
    </div>
  </motion.div>
);

const Projects = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10">
    <h2 className="text-5xl font-black mb-12 uppercase tracking-tighter">Directory: /Projects</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="group p-8 bg-slate-900/50 border border-white/10 rounded-2xl hover:border-blue-400/50 transition-all cursor-pointer">
          <div className="text-blue-500 font-mono text-xs mb-2">00{i}.PROJ</div>
          <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">Digital_Void_v{i}.0</h3>
          <p className="text-slate-400 mt-4">Automated deployment system with integrated 3D visualization metrics.</p>
        </div>
      ))}
    </div>
  </motion.div>
);

// Layout Component to wrap everything
function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-blue-500 overflow-x-hidden">
      {/* 3D Scene - Persistent background */}
      <Scene />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tighter text-xl group">
            <TermIcon className="text-blue-400 group-hover:rotate-12 transition-transform" /> 
            KABIR_MAHMUD
          </Link>
          
          <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] text-slate-400">
            {['HOME', 'PROJECTS', 'ABOUT'].map((item) => (
              <Link 
                key={item} 
                to={item === 'HOME' ? '/' : `/${item.toLowerCase()}`}
                className={`hover:text-blue-400 transition-colors ${
                  (location.pathname === '/' && item === 'HOME') || 
                  (location.pathname === `/${item.toLowerCase()}`) 
                  ? 'text-blue-400' : ''
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          <button className="bg-blue-500 px-6 py-2 rounded-full font-bold text-[10px] tracking-widest hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all active:scale-95">
            RESUME.PDF
          </button>
        </div>
      </nav>

      {/* Dynamic Content Area */}
      <main className="relative z-10 pt-32 px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>

      {/* Footer Decor */}
      <footer className="relative z-10 mt-20 py-10 px-8 border-t border-white/5 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center opacity-40 text-[10px] font-mono uppercase tracking-[0.3em]">
          <span>© 2026 Kabir Mahmud // Dev_Build_v4.2</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400">Github</a>
            <a href="#" className="hover:text-blue-400">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Main App component with Router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
}