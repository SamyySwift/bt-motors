import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  ArrowRight,
  Play,
  Star,
  Globe,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Gauge,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const CharacterReveal = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });

  const characters = text.split("");

  return (
    <p ref={ref} className={className}>
      {characters.map((char, index) => {
        const start = index / characters.length;
        const end = start + 1 / characters.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

        return (
          <motion.span key={index} style={{ opacity }}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
};

import { inventory } from "../data/inventory";

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const boutiqueRef = useRef<HTMLDivElement>(null);
  const boutiqueContentRef = useRef<HTMLDivElement>(null);
  const innovationRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % inventory.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress: innovationProgress } = useScroll({
    target: innovationRef,
    offset: ["start end", "end start"],
  });

  const innovationImgY = useTransform(
    innovationProgress,
    [0, 1],
    ["-20%", "20%"],
  );
  const innovationBorderRadius = useTransform(
    innovationProgress,
    [0, 0.5],
    ["0rem", "5rem"],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Text Reveal
      const splitTargets = document.querySelectorAll(".reveal-text");
      splitTargets.forEach((target) => {
        const text = new SplitType(target as HTMLElement, {
          types: "lines,words",
        });
        gsap.from(text.words, {
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.out",
        });
      });

      // Horizontal Scroll for Boutique
      if (boutiqueRef.current && boutiqueContentRef.current) {
        const boutiqueWidth = boutiqueContentRef.current.scrollWidth;
        const windowWidth = window.innerWidth;

        gsap.to(boutiqueContentRef.current, {
          x: -(boutiqueWidth - windowWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: boutiqueRef.current,
            start: "top top",
            end: () => `+=${boutiqueWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Parallax for all images
      gsap.utils.toArray(".parallax-img").forEach((img: any) => {
        gsap.to(img, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      
      // Sticky Stacking Services
      if (servicesRef.current) {
        const cards = gsap.utils.toArray(".service-card");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top top",
            end: () => `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card: any, i: number) => {
          // Initial state: hidden and below
          gsap.set(card, {
            yPercent: 150,
            opacity: 0,
            scale: 0.8,
            rotate: 10,
          });

          // Animation for the card coming in
          tl.to(card, {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            ease: "power3.out",
            duration: 1,
          }, i);

          // Animation for the card already in, as the NEXT card comes in
          if (i < cards.length - 1) {
            tl.to(card, {
              scale: 0.95,
              yPercent: -15,
              opacity: 0.5,
              filter: "blur(4px)",
              ease: "none",
              duration: 1,
            }, i + 0.8);
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white grainy-overlay">
      {/* Hero Content Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-dark-charcoal"
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
          {inventory.map((car, index) => (
            <motion.div
              key={car.id}
              initial={false}
              animate={{
                opacity: currentCarIndex === index ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
                animate={{
                  scale: currentCarIndex === index ? 1 : 1.1,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="container mx-auto z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-white mb-8"
          >
            THE PINNACLE OF AUTOMOTIVE MASTERY
          </motion.p>

          <h1 className="text-[clamp(3.5rem,10vw,10rem)] text-white/80 font-syne font-bold tracking-tighter leading-[0.85] mb-16 select-none reveal-text">
            Crafting the <br />
            <span className="text-white/80">Ultimate</span> Standard.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <MagneticButton>
              <Link
                to="/inventory"
                className="px-14 py-6 rounded-full bg-bt-blue text-white font-bold text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/20"
                data-cursor-text="Explore"
              >
                View Collection
              </Link>
            </MagneticButton>

            <MagneticButton>
              <button
                className="group flex items-center gap-4 px-8 py-6 rounded-full border-2 border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-apple-black transition-all duration-500 interactive backdrop-blur-sm"
                data-cursor-text="Play"
              >
                <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-bt-blue group-hover:text-white transition-all duration-500">
                  <Play className="w-4 h-4 fill-current" />
                </span>
                The Vision
              </button>
            </MagneticButton>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-silver/40">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Trust Ticker - Minimalist */}
      <div className="w-full bg-white py-12 overflow-hidden relative z-10 border-y border-black/[0.03]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          className="flex whitespace-nowrap space-x-32 px-8 items-center"
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex space-x-32 items-center text-silver/60 font-sans font-bold tracking-widest text-[9px] uppercase"
            >
              <span className="flex items-center gap-3">
                <Star size={12} /> Certified Quality
              </span>
              <span className="flex items-center gap-3">
                <Globe size={12} /> Efficient Delivery
              </span>
              <span className="flex items-center gap-3">
                <Clock size={12} /> Personalized Service
              </span>
              <span className="flex items-center gap-3">
                <ShieldCheck size={12} /> Genuine Parts
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Narrative Section - Legacy */}
      <section className="py-48 px-6 bg-f5f5f7 relative overflow-hidden rounded-[5rem] mx-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <SectionHeading
                  title="Vision & Mission."
                  subtitle="OUR PURPOSE"
                  align="left"
                />
              </motion.div>

              <CharacterReveal
                text={`"To be a trusted and innovative automobile brand, redefining car ownership through quality vehicles, electric mobility, and world-class auto care."`}
                className="text-2xl md:text-4xl font-syne font-bold text-apple-black leading-[1.1]"
              />

              <CharacterReveal
                text={`To provide exceptional value by selling quality brand-new, electric, and foreign-used vehicles, while delivering complete automotive services with integrity, innovation, and customer satisfaction at the core.`}
                className="text-lg text-silver leading-relaxed font-medium max-w-lg"
              />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex gap-16 pt-8"
              >
                <div>
                  <h4 className="text-6xl font-syne font-bold text-apple-black mb-2">
                    Quality
                  </h4>
                  <p className="text-[10px] text-silver font-bold tracking-[0.2em] uppercase">
                    Guaranteed Selection
                  </p>
                </div>
                <div>
                  <h4 className="text-6xl font-syne font-bold text-apple-black mb-2">
                    Expert
                  </h4>
                  <p className="text-[10px] text-silver font-bold tracking-[0.2em] uppercase">
                    Auto Care Team
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img
                src="/garage.jpg"
                alt="Craftsmanship"
                className="w-full h-full object-cover scale-110"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Lineup Section */}
      <section
        ref={boutiqueRef}
        className="h-screen bg-white overflow-hidden flex items-center"
      >
        <div className="w-full">
          <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-silver mb-4">
                Curated Fleet
              </p>
              <h2 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter reveal-text">
                The Showroom.
              </h2>
            </div>
          </div>

          <div
            ref={boutiqueContentRef}
            className="flex gap-12 px-6 cursor-grab active:cursor-grabbing"
          >
            {inventory.map((car) => (
              <div
                key={car.id}
                className="min-w-[450px] group interactive"
                data-cursor-text="View"
              >
                <div className="aspect-[4/5] bg-f5f5f7 rounded-[3rem] overflow-hidden mb-8 relative group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  
                  {/* Condition Badge */}
                  <div className="absolute top-8 left-8 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] text-apple-black z-10">
                    {car.condition}
                  </div>

                  <div className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm z-10">
                    <ArrowUpRight size={22} className="text-apple-black" />
                  </div>

                  {/* Visual Gradient Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                <div className="flex justify-between items-end px-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-silver mb-3">
                      {car.make}
                    </p>
                    <h4 className="text-3xl font-syne font-bold tracking-tight mb-1">
                      {car.model}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-syne font-bold text-bt-blue">
                      {car.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="min-w-[450px] flex items-center justify-center">
              <MagneticButton>
                <Link to="/inventory">
                  <div
                    className="w-48 h-48 rounded-full border border-bt-blue/30 flex flex-col items-center justify-center gap-2 hover:bg-bt-blue hover:text-white transition-all duration-700 interactive"
                    data-cursor-text="Explore"
                  >
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                      View All
                    </span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={innovationRef}
        className="relative h-[120vh] overflow-hidden flex items-center justify-center w-full"
      >
        <motion.div
          style={{
            borderTopLeftRadius: innovationBorderRadius,
            borderTopRightRadius: innovationBorderRadius,
          }}
          className="absolute inset-0 bg-dark-charcoal overflow-hidden"
        >
          <motion.div
            style={{ y: innovationImgY }}
            className="absolute inset-0 scale-125"
          >
            <img
              src="/avatr2.jpg"
              alt="Premium Automotive Detail"
              className="w-full h-full object-cover brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[clamp(3.5rem,10vw,8rem)] font-syne font-bold tracking-tighter text-white leading-[0.85] mb-16 reveal-text">
              Performance <br />
              meets <span className="text-white/20 italic">pure</span> <br />
              perfection.
            </h2>

            <MagneticButton>
              <button className="px-16 py-8 bg-bt-blue text-white rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/30">
                Discover Innovation
              </button>
            </MagneticButton>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section ref={servicesRef} className="bg-apple-black relative overflow-hidden">
        <div className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start h-full">
              {/* Left Side: Sticky Info */}
              <div className="lg:sticky lg:top-24">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-bt-blue mb-6">
                  THE FULL SPECTRUM
                </p>
                <h2 className="text-5xl md:text-8xl font-syne font-bold text-white tracking-tighter leading-[0.85] reveal-text mb-12">
                  World-Class <br />
                  Automotive <br />
                  Solutions.
                </h2>
                <p className="text-silver/40 text-lg max-w-sm leading-relaxed mb-12">
                  From the initial sourcing to long-term maintenance, we ensure every aspect of your journey is handled with absolute precision.
                </p>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-apple-black bg-bt-blue/20 flex items-center justify-center text-bt-blue font-bold text-xs backdrop-blur-sm">
                        0{i}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-silver/60 uppercase">
                    Scroll to Explore
                  </span>
                </div>
              </div>

              {/* Right Side: Stacking Cards */}
              <div className="relative pt-24 lg:pt-0 min-h-[600px]">
                <div className="grid grid-cols-1 grid-rows-1 w-full h-full">
                  {[
                    {
                      title: "Premium Car Sales & Imports",
                      desc: "Brand New, Foreign Used, and Electric Cars sourced to your exact specifications.",
                      icon: <Zap size={24} />,
                      accent: "from-blue-500/20",
                    },
                    {
                      title: "Expert Servicing & Repairs",
                      desc: "Complete car servicing, professional spraying, maintenance, and diagnostics.",
                      icon: <Gauge size={24} />,
                      accent: "from-purple-500/20",
                    },
                    {
                      title: "Flexible Delivery Options",
                      desc: "Convenient pickup from our Headquarters or safe, insured delivery directly to you.",
                      icon: <Globe size={24} />,
                      accent: "from-emerald-500/20",
                    },
                  ].map((service, idx) => (
                    <div
                      key={idx}
                      className="service-card col-start-1 row-start-1 group relative p-12 rounded-[3.5rem] bg-[#1a1a1c]/40 border border-white/10 hover:border-bt-blue/50 transition-all duration-700 interactive overflow-hidden backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
                      style={{ 
                        zIndex: idx,
                      }}
                    >
                      {/* Decorative Background Glow */}
                      <div className={`absolute -inset-24 bg-gradient-to-br ${service.accent} to-transparent opacity-0 group-hover:opacity-40 blur-[100px] transition-opacity duration-1000`} />
                      
                      {/* Index Number Background */}
                      <div className="absolute -right-12 -top-12 text-[18rem] font-syne font-extrabold text-white/[0.02] group-hover:text-bt-blue/[0.05] transition-all duration-1000 pointer-events-none select-none tracking-tighter">
                        0{idx + 1}
                      </div>
                      
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-bt-blue group-hover:text-white group-hover:rotate-[360deg] transition-all duration-1000 mb-16 shadow-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            {service.icon}
                          </div>
                          
                          <h4 className="text-5xl font-syne font-bold text-white mb-8 tracking-tighter group-hover:text-bt-blue transition-colors duration-500 leading-tight">
                            {service.title}
                          </h4>
                          <p className="text-silver/60 text-xl leading-relaxed group-hover:text-white transition-colors duration-500 max-w-md font-medium">
                            {service.desc}
                          </p>
                        </div>

                        <div className="mt-20 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver/30 group-hover:text-bt-blue transition-colors mb-2">
                              SERVICE DIVISION
                            </span>
                            <span className="text-xs font-syne font-bold text-white/20 uppercase tracking-widest">
                              BEE TEE AUTOMOBILE
                            </span>
                          </div>
                          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-apple-black group-hover:scale-110 transition-all duration-500 shadow-xl">
                            <ArrowRight size={24} />
                          </div>
                        </div>
                      </div>

                      {/* Animated Border Bottom */}
                      <div className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-bt-blue via-purple-500 to-bt-blue w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Accents */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-bt-blue/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-bt-blue/5 blur-[160px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-12">
            THE NEXT CHAPTER
          </p>
          <h2 className="text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] font-syne font-bold tracking-tighter mb-20 select-none reveal-text">
            Your Legend <br />
            Starts Beyond.
          </h2>

          <MagneticButton>
            <Link
              to="/inquiry"
              className="px-20 py-8 bg-bt-blue text-white rounded-full font-bold text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/30"
              data-cursor-text="Contact"
            >
              Start Conversation
            </Link>
          </MagneticButton>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-black/1 whitespace-nowrap pointer-events-none select-none uppercase font-syne">
          BEE TEE AUTOMOBILE
        </div>
      </section>
    </div>
  );
}
