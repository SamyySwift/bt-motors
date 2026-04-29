import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Settings, Shield, Zap } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";

const pricingTiers = [
  {
    title: "Precision Care",
    price: "$499",
    features: [
      "Oil & Filter Change",
      "Multi-point Inspection",
      "Fluid Telemetry",
      "Tire Rotation",
      "Complimentary Valet",
    ],
    icon: <Settings size={20} />,
  },
  {
    title: "Master Diagnostics",
    price: "$899",
    features: [
      "Full Engine Scan",
      "Transmission Check",
      "ECU Software Update",
      "Brake Pad Replacement",
      "Detailing Package",
    ],
    highlighted: true,
    icon: <Shield size={20} />,
  },
  {
    title: "Performance Tune",
    price: "Custom",
    features: [
      "Dyno Testing",
      "Exhaust Optimization",
      "Suspension Tuning",
      "Track Preparation",
      "Concierge Service",
    ],
    icon: <Zap size={20} />,
  },
];

const carParts = [
  {
    id: "engine",
    x: "50%",
    y: "30%",
    title: "The Heart",
    desc: "Precision tuning, complete rebuilds, and routine telemetry checks.",
  },
  {
    id: "brakes",
    x: "25%",
    y: "70%",
    title: "The Anchor",
    desc: "Carbon-ceramic rotor replacement, fluid flush, and caliper painting.",
  },
  {
    id: "tires",
    x: "75%",
    y: "70%",
    title: "The Contact",
    desc: "Laser alignment, track-day tire mounting, and alloy repairs.",
  },
];

export default function RepairPage() {
  const [activePart, setActivePart] = useState<string | null>(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: "chars" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <div className="min-h-screen pt-40 pb-32 bg-white text-apple-black overflow-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-soft-gray text-apple-black text-xs font-bold tracking-widest uppercase mb-8">
            Technical Excellence
          </span>
          <h1
            ref={titleRef}
            className="text-6xl md:text-9xl font-syne font-bold font-medium leading-[0.9] tracking-tight mb-12"
          >
            Mechanical <br />
            <span className="italic">Artistry.</span>
          </h1>
          <p className="text-xl md:text-2xl text-apple-black/60 max-w-2xl font-light leading-relaxed">
            A state-of-the-art facility dedicated to the preservation,
            restoration, and enhancement of automotive perfection.
          </p>
        </div>
      </section>

      {/* Interactive Fault Finder */}
      <section className="py-32 px-6 md:px-12 bg-soft-gray/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6 italic">
                Diagnostic Vision
              </h2>
              <p className="text-apple-black/50 font-light text-lg">
                Explore our specialized repair processes through our interactive
                diagnostic overview.
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-[40px] overflow-hidden bg-white border border-apple-black/5 p-4 group">
            <img
              src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
              alt="Car Diagram"
              className="w-full h-full object-cover opacity-10 mix-blend-luminosity grayscale rounded-[32px]"
            />

            {carParts.map((part) => (
              <div
                key={part.id}
                className="absolute"
                style={{
                  left: part.x,
                  top: part.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  onClick={() =>
                    setActivePart(activePart === part.id ? null : part.id)
                  }
                  className={`w-4 h-4 rounded-full transition-all duration-500 z-20 relative ${
                    activePart === part.id
                      ? "bg-bt-blue scale-150"
                      : "bg-bt-blue/20 hover:bg-bt-blue/40"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full animate-ping bg-bt-blue opacity-20 ${activePart === part.id ? "hidden" : ""}`}
                  ></div>
                </button>

                <AnimatePresence>
                  {activePart === part.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 bg-white p-8 rounded-3xl shadow-2xl border border-apple-black/5 z-30"
                    >
                      <h3 className="text-xl font-syne font-bold mb-3">
                        {part.title}
                      </h3>
                      <p className="text-sm text-apple-black/50 leading-relaxed font-light">
                        {part.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-40 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl md:text-6xl font-syne font-bold mb-8 leading-tight">
              Structured Maintenance.
            </h2>
            <p className="text-xl text-apple-black/50 font-light">
              Transparent, premium service packages designed for the most
              discerning owners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                className={`group p-12 rounded-[40px] flex flex-col transition-all duration-700 ${
                  tier.highlighted
                    ? "bg-bt-blue text-white shadow-2xl scale-[1.05] z-10"
                    : "bg-soft-gray/50 hover:bg-soft-gray"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-8 ${
                    tier.highlighted ? "bg-white/10" : "bg-white"
                  }`}
                >
                  {tier.icon}
                </div>
                <h3 className="text-2xl font-syne font-bold mb-2">
                  {tier.title}
                </h3>
                <div
                  className={`text-4xl font-light mb-10 tracking-tight ${
                    tier.highlighted ? "text-white" : "text-apple-black"
                  }`}
                >
                  {tier.price}
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {tier.features.map((feat, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm font-light opacity-60"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full mr-4 ${
                          tier.highlighted ? "bg-white" : "bg-bt-blue"
                        }`}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-500 ${
                    tier.highlighted
                      ? "bg-white text-bt-blue hover:bg-soft-gray"
                      : "bg-bt-blue text-white hover:bg-bt-blue-dark shadow-xl"
                  }`}
                >
                  Select Service
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto bg-soft-gray/30 py-24 rounded-[60px]">
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-10 italic">
            Ready for the Track?
          </h2>
          <Link
            to="/inquiry"
            className="group inline-flex items-center gap-6 bg-bt-blue text-white px-12 py-6 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-bt-blue-dark transition-all duration-500 shadow-2xl"
          >
            Schedule Appointment
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}
