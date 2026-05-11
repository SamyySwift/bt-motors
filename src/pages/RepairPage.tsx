import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Settings, Shield, Zap, X } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";
import SEOHead, { getBreadcrumbSchema } from "../components/SEOHead";
import ContactOptions from "../components/ContactOptions";

const pricingTiers = [
  {
    title: "Routine Maintenance",
    price: "Custom Quote",
    features: [
      "Oil & Filter Change",
      "Multi-point Inspection",
      "Brake Servicing",
      "Tire Rotation",
      "Fluid Top-ups",
    ],
    icon: <Settings size={20} />,
  },
  {
    title: "Master Diagnostics",
    price: "Custom Quote",
    features: [
      "Computerized Engine Scan",
      "Transmission Check",
      "Electrical Systems Check",
      "Suspension Inspection",
      "Detailing Package",
    ],
    highlighted: true,
    icon: <Shield size={20} />,
  },
  {
    title: "Bodywork & Spraying",
    price: "Custom Quote",
    features: [
      "Oven-Baked Spraying",
      "Dent Repairs",
      "Scratch Removal",
      "Polishing & Detailing",
      "Color Matching",
    ],
    icon: <Zap size={20} />,
  },
];

const diagnosticSlides = ["/repair_1.jpeg", "/repair_2.jpeg", "/repair_3.jpeg"];

export default function RepairPage() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showInquiryOptions, setShowInquiryOptions] = useState(false);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % diagnosticSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-apple-black overflow-hidden">
      <SEOHead
        title="Expert Car Repair & Diagnostics in Abuja"
        description="State-of-the-art car repair, mechanical diagnostics, oven-baked spraying, and bodywork restoration at BEE TEE Automobile, Jahi Abuja. Luxury and electric vehicle specialists. Custom quotes available."
        canonicalUrl="/repair"
        keywords="electric vehicles in nigeria, electric vehicle dealership, car repair Abuja, auto mechanic Nigeria, car diagnostics Abuja, oven baked spraying Nigeria, body work repair Abuja, luxury car repair, electric car mechanic Nigeria, dent repair Abuja, car painting FCT"
        structuredData={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Repair & Diagnostics", url: "/repair" },
        ])}
      />
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mb-20 md:mb-32">
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/repair.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-8">
            Technical Excellence
          </span>
          <h1
            ref={titleRef}
            className="text-6xl md:text-[9vw] lg:text-[140px] font-syne font-bold leading-[0.9] tracking-tighter text-white mb-8"
          >
            Mechanical <br />
            <span className="italic text-bt-blue">Artistry.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed">
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
            {diagnosticSlides.map((slide, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{
                  opacity: currentSlideIndex === index ? 1 : 0,
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 p-4"
              >
                <motion.img
                  src={slide}
                  alt={`Diagnostic Process ${index + 1}`}
                  className="w-full h-full object-cover rounded-[32px]"
                  animate={{
                    scale: currentSlideIndex === index ? 1 : 1.05,
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>
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
                  onClick={() => setShowInquiryOptions(true)}
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

      {/* Inquiry Options Modal */}
      <AnimatePresence>
        {showInquiryOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/90 backdrop-blur-2xl"
          >
            <div
              className="absolute inset-0"
              onClick={() => setShowInquiryOptions(false)}
            ></div>

            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative z-10 border border-black/3 shadow-2xl text-center"
            >
              <button
                onClick={() => setShowInquiryOptions(false)}
                className="absolute top-8 right-8 text-apple-black hover:bg-bt-blue hover:text-white transition-all z-20 bg-f5f5f7 p-2.5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-soft-gray text-apple-black text-[10px] font-bold tracking-widest uppercase mb-6">
                  Service Inquiry
                </span>
                <h2 className="text-4xl font-syne font-bold text-apple-black mb-4 tracking-tighter">
                  Expert Support.
                </h2>
                <p className="text-silver text-sm font-medium">
                  Select your preferred method to discuss your vehicle requirements with our technical team.
                </p>
              </div>

              <ContactOptions />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
