import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Terminal() {
  const [lines, setLines] = useState(['Initializing system...', 'Access granted. Type "help" to begin.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const newLines = [...lines, `> ${input}`];
      
      // Basic Command Logic
      if (input.toLowerCase() === 'help') {
        newLines.push('Available: about, projects, clear, contact');
      } else if (input.toLowerCase() === 'clear') {
        setLines([]);
        setInput('');
        return;
      } else {
        newLines.push(`Command not found: ${input}`);
      }

      setLines(newLines);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-2xl bg-slate-950/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md"
    >
      {/* Header */}
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
        </div>
        <span className="text-[10px] font-mono text-slate-500">core_terminal.exe</span>
      </div>

      {/* Output */}
      <div className="p-6 h-64 overflow-y-auto font-mono text-sm text-blue-300 custom-scrollbar">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-secondary font-bold font-mono text-green-400">{">"}</span>
          <input 
            autoFocus
            className="bg-transparent outline-none flex-1 border-none p-0 focus:ring-0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
          />
        </div>
        <div ref={scrollRef} />
      </div>
    </motion.div>
  );
}