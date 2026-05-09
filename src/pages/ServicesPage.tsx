import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Zap, Globe, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../components/MagneticButton";
import SEOHead, { getBreadcrumbSchema } from "../components/SEOHead";

const services = [
  {
    id: 1,
    number: "01",
    title: "Direct Sales & Imports",
    subtitle: "Brand New & Electric Vehicles",
    desc: "A vast amount of our business is to directly supply vehicles to individuals, businesses and organizations, both private and public. Our clients include Parliamentarians, MDAs, and corporate workers across Nigeria.",
    features: [
      "Brand-New Vehicles",
      "Electric Vehicles (EV)",
      "Institutional Supply",
      "Expert Advisory",
    ],
    icon: <Globe size={28} />,
    image: "/garage.jpg",
  },
  {
    id: 2,
    number: "02",
    title: "Car Care & Maintenance",
    subtitle: "Optimal Performance & Longevity",
    desc: "Tailored to preserve elegance and performance. We provide engine tuning, fluid checks, brake system servicing, tire rotation, and scheduled inspections—ensuring safety and reliability.",
    features: [
      "Oil & Filter Changes",
      "Brake Inspections",
      "Battery Testing",
      "General Diagnostics",
    ],
    icon: <ShieldCheck size={28} />,
    image: "/servicing.jpeg",
  },
  {
    id: 3,
    number: "03",
    title: "Auto Painting",
    subtitle: "Expert Craftsmanship",
    desc: "Specializing in premium resprays, ranging from high-gloss and metallic to matte and pearlescent. Utilizing state-of-the-art spray booths and advanced paint systems for factory-grade results.",
    features: [
      "Custom Paint Jobs",
      "Color Matching",
      "Panel Resprays",
      "Protective Clear Coats",
    ],
    icon: <Shield size={28} />,
    image: "/repair_3.jpeg",
  },
  {
    id: 4,
    number: "04",
    title: "Mechanical & Electrical",
    subtitle: "Advanced Diagnostics",
    desc: "Tailored for luxury vehicles. From precision engine tuning to advanced diagnostics of electronic control units (ECUs), hybrid systems, and intelligent drive technologies.",
    features: [
      "Remote Diagnostics",
      "Priority Scheduling",
      "Hybrid System Service",
      "ECU Diagnostics",
    ],
    icon: <Zap size={28} />,
    image: "/repair_1.jpeg",
  },
  {
    id: 5,
    number: "05",
    title: "EV Service Center",
    subtitle: "Future-Driven Charging",
    desc: "Your reliable hub for fast, safe, and efficient EV charging. Whether you're on the go or planning ahead, we make it easy to keep your vehicle fully powered and road-ready.",
    features: [
      "Fast Charging Stations",
      "Sustainable Energy",
      "EV Maintenance",
      "Safe Operations",
    ],
    icon: <Zap size={28} />,
    image: "/repair_3.jpeg",
  },
  {
    id: 6,
    number: "06",
    title: "Washing & Detailing",
    subtitle: "Premium Grooming",
    desc: "A refined blend of precision and care. Each vehicle is treated to hand washing, deep interior cleaning, paint enhancement, and protective treatments using high-end products.",
    features: [
      "Deep Interior Cleaning",
      "Paint Enhancement",
      "Protective Treatments",
      "Showroom Standards",
    ],
    icon: <ShieldCheck size={28} />,
    image: "/servicing.jpeg",
  },
  {
    id: 7,
    number: "07",
    title: "After-Sales & Warranty",
    subtitle: "Seamless Ownership",
    desc: "Premium post-purchase care, including personalized service follow-ups, priority maintenance scheduling, technical assistance, and comprehensive warranty coverage for peace of mind.",
    features: [
      "24/7 Support Access",
      "Warranty Claims Handling",
      "Service Reminders",
      "Complimentary Checks",
    ],
    icon: <Shield size={28} />,
    image: "/garage.jpg",
  },
];

export default function ServicesPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    if (headingRef.current) {
      const text = new SplitType(headingRef.current, { types: "chars,words" });
      gsap.from(text.chars, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.2,
      });
    }

    const revealTargets = document.querySelectorAll(".reveal-service");
    revealTargets.forEach((target) => {
      const text = new SplitType(target as HTMLElement, { types: "lines" });
      gsap.from(text.lines, {
        scrollTrigger: {
          trigger: target,
          start: "top 90%",
          end: "top 60%",
          scrub: false,
        },
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white grainy-overlay">
      <SEOHead
        title="Car Services — EV Charging, Repairs, Painting & Detailing"
        description="Premium automotive services in Abuja, Nigeria. EV charging stations, mechanical & electrical diagnostics, oven-baked auto painting, car washing & detailing, and after-sales warranty support at BEE TEE Automobile."
        canonicalUrl="/services"
        keywords="electric vehicles in nigeria, electric vehicle dealership, car servicing Abuja, EV charging station Nigeria, auto painting Abuja, car detailing Nigeria, car repair Abuja, electric vehicle servicing, luxury car maintenance Nigeria, car wash Abuja, vehicle diagnostics FCT"
        structuredData={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      {/* Hero Section with Parallax */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-32 pb-48 px-6 md:px-12 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white z-10"></div>

        <div className="container mx-auto max-w-[1600px] relative z-20">
          <div className="text-center">
            <h1
              ref={headingRef}
              className="text-7xl md:text-[10vw] lg:text-[140px] font-syne font-bold tracking-tighter leading-[0.9] mb-12"
            >
              Excellence <br />
              <span className="italic text-bt-blue">Defined.</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-silver text-xl max-w-3xl mx-auto leading-relaxed reveal-service"
            >
              Beyond the acquisition, we provide a holistic suite of services
              designed to elevate and maintain your vehicle to the highest
              standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-16 flex flex-wrap justify-center gap-12 text-center"
            >
              <div className="space-y-2">
                <div className="text-5xl font-syne font-bold text-bt-blue">
                  10+
                </div>
                <p className="text-xs uppercase tracking-widest text-silver font-bold">
                  Years of Trust
                </p>
              </div>
              <div className="w-px h-16 bg-silver/20"></div>
              <div className="space-y-2">
                <div className="text-5xl font-syne font-bold text-bt-blue">
                  5K+
                </div>
                <p className="text-xs uppercase tracking-widest text-silver font-bold">
                  Happy Clients
                </p>
              </div>
              <div className="w-px h-16 bg-silver/20"></div>
              <div className="space-y-2">
                <div className="text-5xl font-syne font-bold text-bt-blue">
                  100%
                </div>
                <p className="text-xs uppercase tracking-widest text-silver font-bold">
                  Quality Assurance
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-widest uppercase text-silver font-bold">
              Scroll To Explore
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-silver to-transparent"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section - Premium Layout */}
      <section className="py-32 px-6 md:px-12">
        <div className="container mx-auto max-w-[1800px]">
          <div className="mb-32 max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-6">
              Our Services
            </p>
            <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter leading-none">
              What We <span className="italic text-bt-blue">Offer.</span>
            </h2>
          </div>

          {/* Service Cards - Alternating Layout */}
          <div className="space-y-48">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-24 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden relative">
                    <motion.img
                      src={service.image}
                      alt={`${service.title} — ${service.subtitle} at BEE TEE Automobile Abuja Nigeria`}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: activeService === service.id ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    <div className="absolute top-12 left-12">
                      <div className="text-[120px] font-syne font-bold text-white/10 leading-none">
                        {service.number}
                      </div>
                    </div>
                  </div>

                  {/* Floating Icon */}
                  <motion.div
                    animate={{
                      y: activeService === service.id ? -20 : 0,
                      scale: activeService === service.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute -bottom-8 -right-8 w-24 h-24 rounded-[2rem] bg-bt-blue text-white flex items-center justify-center shadow-2xl"
                  >
                    {service.icon}
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <span className="text-7xl font-syne font-bold text-bt-blue/20">
                        {service.number}
                      </span>
                      <div className="flex-1 h-[1px] bg-bt-blue/20"></div>
                    </div>

                    <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">
                      {service.subtitle}
                    </p>
                    <h3 className="text-5xl md:text-6xl font-syne font-bold tracking-tight mb-6">
                      {service.title}
                    </h3>
                    <p className="text-silver text-lg leading-relaxed max-w-xl">
                      {service.desc}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 pt-8 border-t border-black/5">
                    {service.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-bt-blue"></div>
                        <p className="text-sm font-medium text-apple-black">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <MagneticButton>
                    <Link
                      to="/inquiry"
                      className="inline-flex items-center gap-3 px-12 py-6 bg-bt-blue text-white rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-bt-blue-dark transition-all shadow-xl"
                    >
                      Learn More
                      <ArrowUpRight size={14} />
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-48 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter leading-none mb-8">
              Ready to Elevate <br />
              <span className="italic text-bt-blue">Your Collection?</span>
            </h2>
            <p className="text-silver text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
              Connect with our team of specialists to discover how we can serve
              your automotive ambitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton>
                <Link
                  to="/inquiry"
                  className="px-16 py-8 bg-bt-blue text-white rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-bt-blue-dark transition-all shadow-2xl"
                >
                  Talk to an Advisor
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  to="/inventory"
                  className="px-16 py-8 bg-white text-apple-black border-2 border-bt-blue/30 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-bt-blue hover:text-white hover:border-bt-blue transition-all"
                >
                  View Inventory
                </Link>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
