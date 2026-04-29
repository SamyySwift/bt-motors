import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-soft-gray/50 to-white/80"></div>
      
      {/* Subtle floating orbs for depth */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-onyx mix-blend-multiply filter blur-[120px] opacity-20"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-apple-black/5 mix-blend-multiply filter blur-[100px] opacity-10"
      />
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
