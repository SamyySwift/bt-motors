import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMobile } from "../hooks/useMobile";

const CARDS = [
  {
    id: 1,
    title: "Selection",
    description: "Every vehicle at BEE TEE undergoes a meticulous 300-point inspection. We curate only the finest brand-new and certified pre-owned machines, ensuring every drive is a testament to quality.",
  },
  {
    id: 2,
    title: "Innovation",
    description: "Leading the charge into the new era of mobility. Our collection of advanced electric vehicles combines sustainable innovation with high-performance engineering for the road ahead.",
  },
  {
    id: 3,
    title: "Care",
    description: "Expertise that goes beyond the sale. From precision diagnostics to professional spraying, our world-class auto care team ensures your machine remains in peak condition.",
  },
  {
    id: 4,
    title: "Integrity",
    description: "Trust is our primary directive. We build lasting relationships through transparency and exceptional value, making BEE TEE the most trusted name in automotive mastery.",
  }
];

export default function WhyBT() {
  const targetRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(smoothProgress, [0, 1], ["0vw", "-400vw"]);

  return (
    <section ref={targetRef} className="relative h-auto md:h-[500vh] bg-black">
      
      <div className="relative md:sticky md:top-0 flex flex-col md:flex-row md:h-screen items-center md:overflow-hidden bg-black py-24 md:py-0">
        
        {/* Subtle Background Parallax / Noise */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,_rgba(29,185,229,0.05)_0%,_transparent_60%)]" />

        <motion.div 
          style={{ x: isMobile ? 0 : x }} 
          className="flex flex-col md:flex-row gap-0 w-full"
        >
          
          {/* Panel 1: The Intro / Title */}
          <div className="min-h-[60vh] md:h-screen w-full md:w-screen shrink-0 flex flex-col items-center justify-center p-8 md:p-24 relative overflow-hidden group">
             <div className="absolute inset-0 bg-bt-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl rounded-full scale-150 pointer-events-none" />
             <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col gap-6 md:gap-8">
               <span className="text-bt-blue text-[10px] md:text-base tracking-[0.4em] uppercase font-semibold">The BEE TEE Philosophy</span>
               <h2 className="text-[clamp(2.5rem,10vw,6rem)] md:text-7xl lg:text-8xl font-syne font-black text-white leading-[0.9] tracking-tighter">
                 We don't sell cars. <br />
                 <span className="text-white/20 inline-block mt-2 md:mt-6 transition-colors duration-700 hover:text-white/60">We curate excellence.</span>
               </h2>
             </div>
             
             {/* Indicator to keep scrolling - Only on Desktop */}
             <div className="hidden md:flex absolute bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-4 text-white/30 animate-pulse">
                <span className="text-[10px] uppercase tracking-widest">Keep Scrolling</span>
                <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-bt-blue/80 animate-[scrolldown_2s_ease-in-out_infinite]" />
                </div>
             </div>
          </div>

          {/* Panels 2-5: The Core Philosophies */}
          {CARDS.map((card) => (
            <div 
              key={card.id} 
              className="min-h-[60vh] md:h-screen w-full md:w-screen shrink-0 flex flex-col md:flex-row items-center justify-center md:justify-between p-8 md:p-24 lg:p-32 gap-8 md:gap-12 relative overflow-hidden border-t border-white/5 md:border-none"
            >
              {/* Massive Number Watermark */}
              <div className="absolute -top-10 -right-10 md:top-20 md:right-32 text-[12rem] md:text-[35rem] font-syne font-black text-white/5 leading-none select-none pointer-events-none">
                0{card.id}
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex flex-col gap-4 md:gap-10 max-w-2xl w-full">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-8 md:w-24 h-[1px] bg-bt-blue" />
                  <span className="text-bt-blue text-[10px] md:text-sm tracking-[0.3em] uppercase">{`Phase 0${card.id}`}</span>
                </div>
                <h3 className="text-[clamp(2.5rem,12vw,8rem)] md:text-7xl lg:text-8xl font-syne text-white tracking-tight leading-none">
                  {card.title}.
                </h3>
                <p className="text-lg md:text-2xl text-neutral-400 font-light leading-relaxed md:w-[130%] pl-0 md:pl-8 border-l border-transparent md:border-white/10 mt-2 md:mt-8">
                  {card.description}
                </p>
              </div>

            </div>
          ))}

        </motion.div>
      </div>

    </section>
  );
}
