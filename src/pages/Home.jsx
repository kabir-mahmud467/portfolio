import { Canvas } from '@react-three/fiber';
import AlienArtifact from '../components/three/Artifact';
import { motion } from 'framer-motion';

const logs = [
  "> INITIALIZING BIOS...",
  "> LOADING ALIEN_CORE_DRIVERS...",
  "> DECRYPTING NEURAL_LINK...",
  "> SYSTEM STATUS: OPTIMAL",
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6 sm:gap-8">
      <div className="flex flex-col justify-center space-y-4 sm:space-y-5">
        {logs.map((log, i) => (
          <motion.p 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4 }}
            className="text-xs sm:text-sm md:text-base font-mono text-white/80"
          >
            {log}
          </motion.p>
        ))}
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold glitch-hover"
        >
          UNKNOWN_ENTITY
        </motion.h1>
        <p className="opacity-60 text-xs sm:text-sm">ARCHITECT // FULL-STACK // INTERSTELLAR_DEV</p>
      </div>
      
      <div className="h-full min-h-[260px] sm:min-h-[320px]">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00ff41" />
          <AlienArtifact />
        </Canvas>
      </div>
    </div>
  );
}
