import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-3xl"
    >
      <h2 className="text-5xl font-black mb-6">ABOUT_<span className="text-blue-400">ME</span></h2>
      <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
        <p>
          I am a Full Stack Developer obsessed with the intersection of <span className="text-white italic">logic and aesthetics</span>. 
          Much like an architect designs a skyscraper, I build digital structures that are both visually stunning and structurally sound.
        </p>
        <div className="grid grid-cols-2 gap-4 pt-8">
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <h4 className="text-blue-400 font-bold mb-2">FRONTEND</h4>
            <p className="text-sm">React, Next.js, Three.js, Tailwind</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <h4 className="text-blue-400 font-bold mb-2">BACKEND</h4>
            <p className="text-sm">Node.js, PostgreSQL, AWS, Python</p>
          </div>
        </div>
      </div>
    
<div className="opacity-0 h-0 pointer-events-none">
  Keywords: Kabir Mahmud, Kabir Vai, Kobir Vai, Kabir Sir, Full Stack Developer Bangladesh, kabirmahmud.xyz
</div>
    </motion.div>
  );
}