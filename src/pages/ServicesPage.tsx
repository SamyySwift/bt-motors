import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Gauge,
  Heart,
  Clock,
  Globe,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../components/MagneticButton";

const services = [
  {
    id: 1,
    title: "Bespoke Sourcing",
    desc: "Access our global network to find the rarest automotive masterpieces, from vintage legends to modern hypercars.",
    icon: <Globe size={24} />,
    image:
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Strategic Finance",
    desc: "Tailored financial structures designed for high-net-worth acquisitions with absolute discretion.",
    icon: <Shield size={24} />,
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Precision Detailing",
    desc: "Museum-grade preservation, ceramic protection, and bespoke paint correction in a clinical environment.",
    icon: <ShieldCheck size={24} />,
    image:
      "https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Performance Calibration",
    desc: "Engineered optimization for elite powertrains, balancing raw power with daily drivability.",
    icon: <Zap size={24} />,
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2083&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);

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
    <div className="min-h-screen bg-white pt-48 pb-24 px-6 md:px-12 grainy-overlay">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-32">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-8">
            The Ecosystem
          </p>
          <h1
            ref={headingRef}
            className="text-7xl md:text-[8vw] font-syne font-bold tracking-tighter leading-none mb-12"
          >
            The <span className="italic">Ecosystem</span> of <br />
            Excellence.
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto reveal-service">
            Beyond the acquisition, we provide a holistic suite of services
            designed to elevate and preserve your automotive legacy.
          </p>
        </div>

        {/* Services Bento-ish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-48">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-f5f5f7 flex flex-col interactive"
              data-cursor-text="Inquire"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
              </div>

              <div className="relative z-10 p-16 h-full flex flex-col justify-end text-white">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h2 className="text-4xl font-syne font-bold mb-6 tracking-tight group-hover:text-white transition-colors">
                  {service.title}
                </h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-md mb-12">
                  {service.desc}
                </p>

                <div className="flex justify-between items-end">
                  <Link
                    to="/inquiry"
                    className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-colors group/link"
                  >
                    Explore Service{" "}
                    <ArrowUpRight
                      size={14}
                      className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature List - Apple Style */}
        <section className="bg-f5f5f7 rounded-[4rem] p-12 md:p-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-silver">
                24/7 Support
              </h4>
              <h3 className="text-3xl font-syne font-bold">The Concierge.</h3>
              <p className="text-silver leading-relaxed">
                Dedicated advisors available globally to handle logistics,
                emergency maintenance, and private transport.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-silver">
                Security
              </h4>
              <h3 className="text-3xl font-syne font-bold">The Vault.</h3>
              <p className="text-silver leading-relaxed">
                Climate-controlled, high-security storage facilities for your
                most precious automotive assets.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-silver">
                Events
              </h4>
              <h3 className="text-3xl font-syne font-bold">The Circuit.</h3>
              <p className="text-silver leading-relaxed">
                Exclusive access to private track days, gala events, and
                automotive rallies across the globe.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Call to Action */}
        <div className="mt-32 text-center">
          <MagneticButton>
            <Link
              to="/inquiry"
              className="px-20 py-8 bg-bt-blue text-white rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-bt-blue-dark transition-all shadow-2xl"
              data-cursor-text="Connect"
            >
              Talk to an Advisor
            </Link>
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
