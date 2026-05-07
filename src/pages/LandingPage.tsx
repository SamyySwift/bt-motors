import { useState, useEffect, useRef, RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
import { cn } from "../lib/utils";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import WhyBT from "../components/WhyBT";
import { useMobile } from "../hooks/useMobile";
import SEOHead, { getLocalBusinessSchema, getWebsiteSchema } from "../components/SEOHead";

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
  const isMobile = useMobile();
  const navigate = useNavigate();

  const HeroCarSlides = [
    { image: "/slide_1.jpg" },
    { image: "/slide_2.jpg" },
    { image: "/slide_3.jpg" },
    { image: "/slide_4.jpg" },
    { image: "/slide_5.jpg" },
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prev) => (prev + 1) % HeroCarSlides.length);
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

      // Horizontal Scroll for Boutique - Only on Desktop
      if (boutiqueRef.current && boutiqueContentRef.current && !isMobile) {
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

    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={containerRef} className="bg-white grainy-overlay">
      <SEOHead
        title="Nigeria's Premier Electric & Luxury Car Dealership"
        description="BEE TEE Automobile — Abuja's leading dealership for electric cars (Tesla, BYD, XPeng), luxury SUVs (Range Rover, Lexus, Land Cruiser), and premium car servicing. Buy electric vehicles in Nigeria today."
        canonicalUrl="/"
        keywords="electric cars Nigeria, Tesla Nigeria, luxury cars Abuja, buy electric vehicle Nigeria, BYD Nigeria, Range Rover Abuja, car dealership Abuja, luxury SUV Nigeria, EV charging Nigeria, buy Tesla Abuja"
        structuredData={[getLocalBusinessSchema(), getWebsiteSchema()]}
      />
      {/* Hero Content Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-charcoal"
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10" />
          {HeroCarSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                opacity: currentCarIndex === index ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <motion.img
                src={slide.image}
                alt="Hero Slide"
                className="w-full h-full object-cover object-[center_90%] md:object-bottom"
                animate={{
                  scale: currentCarIndex === index ? 1 : 1.05,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="container mx-auto z-10 text-center px-6 pt-24 md:pt-0">
          <h1 className="text-[clamp(2.5rem,11vw,10rem)] text-white font-syne font-bold tracking-tighter leading-[0.85] mb-8 md:mb-16 select-none reveal-text">
            Crafting the <br />
            <span className="text-white">Ultimate</span> Standard.
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
            <MagneticButton>
              <Link
                to="/inventory"
                className="w-full sm:w-auto px-10 md:px-14 py-5 md:py-6 rounded-full bg-bt-blue text-white font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/20"
                data-cursor-text="Explore"
              >
                View Collection
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                to="/about"
                className="group flex items-center gap-4 px-8 py-3 rounded-full border-2 border-white/30 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-apple-black transition-all duration-500 interactive backdrop-blur-sm"
                data-cursor-text="Play"
              >
                <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-bt-blue group-hover:text-white transition-all duration-500">
                  <Play className="w-3 h-3 md:w-4 md:h-4 fill-current" />
                </span>
                The Vision
              </Link>
            </MagneticButton>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4"
        >
          <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-silver/40">
            Scroll
          </span>
          <div className="w-px h-8 md:h-12 bg-linear-to-b from-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Trust Ticker - Minimalist */}
      <div className="w-full bg-white py-8 md:py-12 overflow-hidden relative z-10 border-y border-black/3">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          className={cn(
            "flex whitespace-nowrap items-center",
            isMobile ? "space-x-12 px-4" : "space-x-32 px-8",
          )}
        >
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center text-silver/60 font-sans font-bold tracking-widest text-[9px] uppercase",
                isMobile ? "space-x-12" : "space-x-32",
              )}
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
      <section className="py-24 md:py-48 px-6 bg-f5f5f7 relative overflow-hidden rounded-4xl md:rounded-5xl mx-2 md:mx-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
            <div className="space-y-6 md:space-y-12">
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
                text={`"To lead the future of smart, reliable and efficient automotive care where innovation meets elegance through technology, quality and customer-centric solutions."`}
                className="text-2xl md:text-4xl font-syne font-bold text-apple-black leading-[1.1]"
              />

              <CharacterReveal
                text={`Our mission is to deliver top-notch automobiles, exceptional repair, detailing services, and reliable car care solutions. We are committed to enhancing customer satisfaction through professionalism and integrity.`}
                className="text-base md:text-lg text-silver leading-relaxed font-medium max-w-lg"
              />

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-8 md:gap-16 pt-4 md:pt-8"
              >
                <div>
                  <h4 className="text-3xl md:text-6xl font-syne font-bold text-apple-black mb-1 md:mb-2">
                    Quality
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-silver font-bold tracking-[0.2em] uppercase">
                    Guaranteed Selection
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl md:text-6xl font-syne font-bold text-apple-black mb-1 md:mb-2">
                    Integrity
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-silver font-bold tracking-[0.2em] uppercase">
                    Professional Care
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl"
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

      {/* Philosophy Section */}
      <WhyBT />

      {/* Horizontal Lineup Section */}
      <section
        ref={boutiqueRef}
        className="h-auto md:h-screen bg-white overflow-hidden flex items-center py-20 md:py-0"
      >
        <div className="w-full">
          <div className="container mx-auto px-6 mb-10 md:mb-16 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-silver mb-3 md:mb-4">
                Curated Fleet
              </p>
              <h2 className="text-4xl md:text-8xl font-syne font-bold tracking-tighter reveal-text">
                The Showroom.
              </h2>
            </div>
          </div>

          <div
            ref={boutiqueContentRef}
            className={cn(
              "flex px-6",
              isMobile ? "flex-col gap-10" : "flex-row gap-12 cursor-grab active:cursor-grabbing",
            )}
          >
            {(isMobile ? inventory.slice(0, 6) : inventory).map((car) => (
              <button
                type="button"
                key={car.id}
                className={cn(
                  "group interactive cursor-pointer relative z-10 block w-full text-left bg-transparent border-none p-0",
                  isMobile ? "w-full" : "min-w-[450px]",
                )}
                data-cursor-text={car.price === "Price on Request" ? "Inquire" : "View"}
                onClick={() => {
                  if (car.price === "Price on Request") {
                    navigate("/inquiry");
                  } else {
                    navigate("/inventory");
                  }
                }}
              >
                <div className="aspect-4/5 rounded-3xl overflow-hidden mb-6 md:mb-8 relative group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] transition-all duration-700">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Condition Badge */}
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 px-3.5 py-1.5 md:px-5 md:py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-apple-black z-10">
                    {car.condition}
                  </div>

                  <div className="absolute top-5 right-5 md:top-8 md:right-8 w-9 h-9 md:w-12 md:h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 shadow-sm z-10">
                    <ArrowUpRight size={18} className="text-apple-black" />
                  </div>

                  {/* Visual Gradient Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="flex justify-between items-end px-2 md:px-4">
                  <div>
                    <p className="text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-silver mb-2 md:mb-3">
                      {car.make}
                    </p>
                    <h4 className="text-xl md:text-3xl font-syne font-bold tracking-tight mb-1">
                      {car.model}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base md:text-xl font-syne font-bold text-bt-blue">
                      {car.price}
                    </span>
                  </div>
                </div>
              </button>
            ))}

            <div
              className={cn(
                "flex items-center justify-center",
                isMobile ? "w-full pt-6" : "min-w-[450px]",
              )}
            >
              <MagneticButton>
                <Link to="/inventory">
                  <div
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-bt-blue/30 flex flex-col items-center justify-center gap-2 hover:bg-bt-blue hover:text-white transition-all duration-700 interactive"
                    data-cursor-text="Explore"
                  >
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase">
                      View All
                    </span>
                    <ArrowRight size={isMobile ? 14 : 16} />
                  </div>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={innovationRef}
        className="relative h-[70vh] md:h-[120vh] overflow-hidden flex items-center justify-center w-full"
      >
        <motion.div
          style={{
            borderTopLeftRadius: isMobile ? "2rem" : innovationBorderRadius,
            borderTopRightRadius: isMobile ? "2rem" : innovationBorderRadius,
          }}
          className="absolute inset-0 bg-dark-charcoal overflow-hidden"
        >
          <motion.div
            style={{ y: isMobile ? 0 : innovationImgY }}
            className="absolute inset-0 scale-125"
          >
            <img
              src="/avatr2.jpg"
              alt="Premium Automotive Detail"
              className="w-full h-full object-cover brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>
          </motion.div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[clamp(2.25rem,8vw,8rem)] font-syne font-bold tracking-tighter text-white leading-[0.85] mb-8 md:mb-16 reveal-text">
              Performance <br />
              meets <span className="text-white/20 italic">pure</span> <br />
              perfection.
            </h2>

            <MagneticButton>
              <button className="px-8 py-5 md:px-16 md:py-8 bg-bt-blue text-white rounded-full font-bold text-[9px] md:text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/30">
                Discover Innovation
              </button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection containerRef={servicesRef} />

      {/* Final CTA */}
      <section className="py-32 md:py-64 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-8 md:mb-12">
            THE NEXT CHAPTER
          </p>
          <h2 className="text-[clamp(2.5rem,12vw,10rem)] leading-[0.85] font-syne font-bold tracking-tighter mb-12 md:mb-20 select-none reveal-text">
            Your Legend <br />
            Starts Beyond.
          </h2>

          <MagneticButton>
            <Link
              to="/inquiry"
              className="px-12 py-6 md:px-20 md:py-8 bg-bt-blue text-white rounded-full font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all hover:bg-bt-blue-dark interactive shadow-2xl shadow-bt-blue/30"
              data-cursor-text="Contact"
            >
              Start Conversation
            </Link>
          </MagneticButton>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-bold text-black/2 whitespace-nowrap pointer-events-none select-none uppercase font-syne">
          BEE TEE AUTOMOBILE
        </div>
      </section>
    </div>
  );
}

function ServicesSection({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xParallax = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
  const smoothX = useSpring(xParallax, { stiffness: 50, damping: 20 });

  const services = [
    {
      title: "Premium Sales & Imports",
      desc: "Brand New, Foreign Used, and Electric Cars sourced to your exact specifications with absolute transparency."
    },
    {
      title: "Expert Servicing & Repairs",
      desc: "Complete car servicing, professional spraying, maintenance, and diagnostics handled by certified technicians."
    },
    {
      title: "Flexible Delivery Options",
      desc: "Convenient pickup from our Headquarters or safe, insured delivery directly to your doorstep, nationwide."
    }
  ];

  return (
    <section ref={containerRef} className="min-h-screen bg-[#050505] text-white py-40 px-6 md:px-12 relative overflow-hidden z-20">
      
      {/* Parallax Background Text */}
      <motion.div 
        style={{ x: smoothX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.03] select-none"
      >
        <h2 className="text-[25vw] font-black tracking-tighter leading-none font-syne uppercase">
          Services Services Services
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-9xl font-bold mb-48 tracking-tighter text-center md:text-left font-syne"
        >
          WORLD-CLASS <br/> <span className="text-gray-700">SOLUTIONS.</span>
        </motion.h2>

        <div className="flex flex-col gap-32">
          {services.map((s, i) => (
            <FeatureItem key={i} title={s.title} desc={s.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ title, desc, index }: { title: string, desc: string, index: number }) {
    const itemRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "center center", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const ySkew = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const brightness = useTransform(scrollYProgress, [0, 0.5, 1], ["brightness(0.3)", "brightness(1)", "brightness(0.3)"]);

    return (
        <motion.div 
            ref={itemRef}
            style={{ 
                scale, 
                opacity, 
                filter: brightness,
                rotateX: ySkew 
            }}
            className={`w-full max-w-4xl flex flex-col ${index % 2 === 0 ? 'ml-0' : 'ml-auto text-right'} group`}
        >
            <div className={`border-white/10 py-4 ${index % 2 === 0 ? 'border-l-2 pl-8' : 'border-r-2 pr-8 text-right'}`}>
                <span className="text-xs font-bold tracking-[0.5em] text-gray-600 mb-4 block uppercase font-syne">
                    0{index + 1} // Division
                </span>
                <h3 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight font-syne uppercase leading-tight">
                    {title}
                </h3>
                <p className={`text-base md:text-xl text-white/50 max-w-xl leading-relaxed ${index % 2 !== 0 ? 'ml-auto' : ''}`}>
                    {desc}
                </p>
            </div>
            
            {/* Visual Line Accent */}
            <motion.div 
                className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mt-8"
                style={{ scaleX: scrollYProgress }}
            />
        </motion.div>
    );
}
