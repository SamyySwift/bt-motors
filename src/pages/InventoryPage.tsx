import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  SlidersHorizontal,
  ArrowUpRight,
  Search,
  Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../components/MagneticButton";
import ContactOptions from "../components/ContactOptions";

import { inventory } from "../data/inventory";

type Vehicle = (typeof inventory)[0];

export default function InventoryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showInquiryOptions, setShowInquiryOptions] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      const text = new SplitType(headingRef.current, { types: "chars,words" });
      gsap.from(text.chars, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.02,
        ease: "power4.out",
        delay: 0.2,
      });
    }
  }, []);

  const filteredInventory =
    activeFilter === "All"
      ? inventory
      : inventory.filter((v) => v.make === activeFilter);

  return (
    <div className="min-h-screen bg-white pt-48 pb-24 grainy-overlay">
      <div className="container mx-auto max-w-[1600px] px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-6">
              The Showroom
            </p>
            <h1
              ref={headingRef}
              className="text-7xl md:text-9xl font-syne font-bold tracking-tighter leading-none"
            >
              Explore <br />
              <span className="italic">The Fleet.</span>
            </h1>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-f5f5f7 p-2 rounded-full px-6 border border-black/3">
              <Search size={16} className="text-silver" />
              <input
                type="text"
                placeholder="Search models..."
                className="bg-transparent border-none outline-none text-sm font-medium w-48"
              />
            </div>
          </div>
        </div>

        {/* Layout with Sidebar */}
        <div className="flex gap-12">
          {/* Sidebar Filters */}
          <aside className="w-72 shrink-0 sticky top-32 h-fit">
            <div className="bg-f5f5f7/50 backdrop-blur-sm rounded-4xl p-8 border border-black/5">
              <div className="flex items-center gap-3 mb-8">
                <SlidersHorizontal size={20} className="text-bt-blue" />
                <h3 className="text-sm font-bold tracking-widest uppercase">
                  Filter By Make
                </h3>
              </div>

              <div className="space-y-3">
                {[
                  "All",
                  "Porsche",
                  "McLaren",
                  "Ferrari",
                  "Lamborghini",
                  "Aston Martin",
                  "Tesla",
                ].map((make) => (
                  <button
                    key={make}
                    onClick={() => setActiveFilter(make)}
                    className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-medium transition-all duration-500 ${
                      activeFilter === make
                        ? "bg-bt-blue text-white shadow-lg scale-[1.02]"
                        : "bg-white/50 text-apple-black hover:bg-white hover:shadow-md"
                    }`}
                  >
                    {make}
                    {activeFilter === make && (
                      <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-black/10">
                <p className="text-xs text-silver font-medium">
                  Showing {filteredInventory.length} of {inventory.length}{" "}
                  vehicles
                </p>
              </div>
            </div>
          </aside>

          {/* Vehicle Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredInventory.map((vehicle, i) => (
                  <motion.button
                    layout
                    type="button"
                    key={vehicle.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group cursor-pointer relative interactive block w-full text-left bg-transparent border-none p-0"
                    onClick={() => {
                      if (vehicle.price === "Price on Request") {
                        setShowInquiryOptions(true);
                      } else {
                        setSelectedVehicle(vehicle);
                      }
                    }}
                    data-cursor-text={vehicle.price === "Price on Request" ? "Inquire" : "Inspect"}
                  >
                    <div className="aspect-4/3 rounded-[2.5rem] overflow-hidden bg-f5f5f7 mb-8 relative group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700">
                      <img
                        src={vehicle.image}
                        alt={vehicle.model}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Condition Badge */}
                      <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-apple-black z-10">
                        {vehicle.condition}
                      </div>

                      {/* Specs Overlay - Awwwards Level */}
                      <div className="absolute inset-0 bg-bt-blue/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0">
                        <div className="grid grid-cols-2 gap-6 text-white">
                          <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/50 mb-1">Engine</p>
                            <p className="text-sm font-bold truncate">{vehicle.engine}</p>
                          </div>
                          <div>
                            <p className="text-[8px] uppercase tracking-widest text-white/50 mb-1">0-60</p>
                            <p className="text-sm font-bold">{vehicle.acceleration}</p>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest">View Specs</span>
                          <ArrowUpRight size={20} />
                        </div>
                      </div>

                      <div className="absolute top-6 right-6 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm z-10">
                        <ArrowUpRight size={18} className="text-apple-black" />
                      </div>
                    </div>

                    <div className="px-2">
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-silver mb-2">
                            {vehicle.make}
                          </p>
                          <h3 className="text-3xl font-syne font-bold tracking-tight text-apple-black">
                            {vehicle.model}
                          </h3>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-bold tracking-widest uppercase text-silver mb-1">{vehicle.fuel}</p>
                          <p className="text-lg font-syne font-bold text-bt-blue">
                            {vehicle.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[9px] font-bold text-silver/60 tracking-[0.2em] uppercase pt-4 border-t border-black/3">
                        <span>{vehicle.year}</span>
                        <div className="w-1 h-1 bg-silver/30 rounded-full" />
                        <span>{vehicle.mileage}</span>
                        <div className="w-1 h-1 bg-silver/30 rounded-full" />
                        <span>{vehicle.bodyStyle}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 bg-white/90 backdrop-blur-2xl"
          >
            <div
              className="absolute inset-0"
              onClick={() => setSelectedVehicle(null)}
            ></div>

            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-7xl h-[90vh] rounded-[4rem] overflow-hidden flex flex-col md:flex-row relative z-10 border border-black/3 shadow-2xl"
            >
              <button
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-10 right-10 text-apple-black hover:bg-bt-blue hover:text-white transition-all z-20 bg-f5f5f7 p-3 rounded-full"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-3/5 relative bg-f5f5f7 h-1/2 md:h-full overflow-hidden">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.model}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-12 left-12 flex gap-4">
                  <div className="px-6 py-3 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    Exterior
                  </div>
                  <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-apple-black/40">
                    Interior
                  </div>
                </div>
              </div>

              <div className="w-full md:w-2/5 p-12 md:p-20 flex flex-col h-1/2 md:h-full overflow-y-auto">
                <div className="grow">
                  <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">
                    {selectedVehicle.make}
                  </p>
                  <h2 className="text-5xl md:text-6xl font-syne font-bold text-apple-black mb-4 tracking-tighter">
                    {selectedVehicle.model}
                  </h2>
                  <div className="text-xl font-syne font-bold text-apple-black mb-12">
                    {selectedVehicle.price}
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-16">
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Gauge size={12} className="text-bt-blue" /> Acceleration
                      </p>
                      <p className="text-2xl font-syne font-bold text-apple-black">
                        {selectedVehicle.acceleration} <span className="text-xs text-silver font-sans">(0-60)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Engine
                      </p>
                      <p className="text-2xl font-syne font-bold text-apple-black">
                        {selectedVehicle.engine}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Mileage
                      </p>
                      <p className="text-2xl font-syne font-bold text-apple-black">
                        {selectedVehicle.mileage}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Condition
                      </p>
                      <p className="text-2xl font-syne font-bold text-apple-black">
                        {selectedVehicle.condition}
                      </p>
                    </div>
                  </div>

                  <p className="text-silver leading-relaxed mb-12">
                    Experience the pinnacle of {selectedVehicle.make}{" "}
                    engineering. This {selectedVehicle.model} represents a
                    perfect marriage of performance and luxury, meticulously
                    maintained and certified by BEE TEE AUTOMOBILE.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {selectedVehicle.price === "Price on Request" ? (
                    <ContactOptions />
                  ) : (
                    <>
                      <MagneticButton>
                        <Link
                          to="/inquiry"
                          className="w-full py-6 bg-bt-blue text-white text-center rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-bt-blue-dark transition-all shadow-xl"
                        >
                          Request Information
                        </Link>
                      </MagneticButton>
                      <Link
                        to="/inquiry"
                        className="w-full py-6 text-center border border-bt-blue/30 text-apple-black rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-bt-blue hover:text-white hover:border-bt-blue transition-all"
                      >
                        Contact Sales Advisor
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inquiry Options Modal */}
      <AnimatePresence>
        {showInquiryOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-110 flex items-center justify-center p-6 bg-white/90 backdrop-blur-2xl"
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
              className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative z-10 border border-black/3 shadow-2xl text-center"
            >
              <button
                onClick={() => setShowInquiryOptions(false)}
                className="absolute top-8 right-8 text-apple-black hover:bg-bt-blue hover:text-white transition-all z-20 bg-f5f5f7 p-2.5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="mb-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-soft-gray text-apple-black text-[10px] font-bold tracking-widest uppercase mb-6">
                  Inquiry Line
                </span>
                <h2 className="text-4xl font-syne font-bold text-apple-black mb-4 tracking-tighter">
                  Connect with us.
                </h2>
                <p className="text-silver text-sm font-medium">
                  Select your preferred method of communication to discuss pricing and details.
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
