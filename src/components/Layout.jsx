import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Scene from './three/Scene';
import { Terminal as TermIcon } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Ensure scroll is never locked (mobile nav has no drawer).
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }, [location.pathname]);

  return (
    <div className="relative text-white font-sans selection:bg-blue-500">
      {/* Background stays put during navigation */}
      <Scene />

      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 md:grid md:grid-cols-3 md:items-center">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tighter text-xl md:justify-self-start">
            <TermIcon className="text-blue-400" /> KABIR_MAHMUD
          </Link>
          
          <div className="hidden md:col-start-2 md:flex items-center justify-center gap-8 justify-self-center text-xs font-bold text-slate-400">
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

          <div className="flex items-center justify-end md:col-start-3 md:justify-self-end">
            <Link to="/contact" className="inline-flex bg-blue-500/15 border border-blue-500/25 px-4 py-2 rounded-xl font-bold text-xs text-blue-200 hover:bg-blue-500/20 hover:border-blue-400/40 transition-colors">
              <span className="sm:hidden">SIGNAL</span>
              <span className="hidden sm:inline">CONTACT</span>
            </Link>
          </div>
        </div>

        <div className="md:hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto px-4 py-2 text-[11px] font-semibold tracking-[0.22em] text-white/75 sm:px-6">
            {[
              { name: 'HOME', path: '/' },
              { name: 'PROJECTS', path: '/projects' },
              { name: 'ABOUT', path: '/about' },
              { name: 'CONTACT', path: '/contact' },
            ].map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`shrink-0 rounded-full border px-3 py-2 transition-colors ${
                    active
                      ? 'border-blue-400/40 bg-blue-500/15 text-blue-200'
                      : 'border-white/10 bg-white/5 text-white/80 hover:text-blue-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* This renders the current page content */}
      <main className="relative z-10 pt-28 px-4 max-w-7xl mx-auto min-h-screen sm:px-6 sm:pt-32">
        <Outlet />
      </main>
    </div>
  );
}
