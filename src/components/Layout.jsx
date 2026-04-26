import { Outlet, Link, useLocation } from 'react-router-dom';
import Scene from './three/Scene';
import { Terminal as TermIcon } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative text-white font-sans selection:bg-blue-500">
      {/* Background stays put during navigation */}
      <Scene />

      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tighter text-xl">
            <TermIcon className="text-blue-400" /> KABIR_MAHMUD
          </Link>
          
          <div className="hidden md:flex gap-8 text-xs font-bold text-slate-400">
            {[
              { name: 'HOME', path: '/' },
              { name: 'PROJECTS', path: '/projects' },
              { name: 'ABOUT', path: '/about' },
              { name: 'CONTACT', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`hover:text-blue-400 transition-colors ${location.pathname === link.path ? 'text-blue-400' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button className="bg-blue-500 px-6 py-2 rounded font-bold text-xs hover:bg-blue-400 transition-all">
            RESUME
          </button>
        </div>
      </nav>

      {/* This renders the current page content */}
      <main className="relative z-10 pt-32 px-8 max-w-7xl mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}