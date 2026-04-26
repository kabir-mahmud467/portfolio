import { motion } from 'framer-motion';

const PROJECTS = [
  { title: "Neural Link", desc: "AI-driven interface for data visualization.", tags: ["React", "Three.js"] },
  { title: "Void Engine", desc: "High-performance rendering pipeline.", tags: ["WebGPU", "Rust"] },
];

export default function Projects() {
  return (
    <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
      {PROJECTS.map((proj, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative p-5 sm:p-8 bg-slate-900/40 border border-white/10 rounded-2xl backdrop-blur-md hover:border-blue-500/50 transition-all"
        >
          <div className="text-xs text-blue-400 font-mono mb-2">PROJECT_0{i+1}</div>
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{proj.title}</h3>
          <p className="text-slate-300/75 mb-5 sm:mb-6">{proj.desc}</p>
          <div className="flex gap-2">
            {proj.tags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-1 bg-white/5 rounded border border-white/10">{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
