import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  SlidersHorizontal,
  Info,
  ArrowUpRight,
  Search,
  ChevronDown,
  Gauge,
} from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../components/MagneticButton";

const inventory = [
  {
    id: 1,
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    mileage: "500 mi",
    price: "$225,000",
    bodyStyle: "Coupe",
    engine: "4.0L Flat-6",
    acceleration: "2.7s",
    image:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    make: "McLaren",
    model: "720S",
    year: 2023,
    mileage: "1,200 mi",
    price: "$299,000",
    bodyStyle: "Coupe",
    engine: "4.0L V8",
    acceleration: "2.8s",
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    make: "Lamborghini",
    model: "Huracan Evo",
    year: 2022,
    mileage: "3,400 mi",
    price: "$260,000",
    bodyStyle: "Coupe",
    engine: "5.2L V10",
    acceleration: "2.9s",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 4,
    make: "Ferrari",
    model: "F8 Tributo",
    year: 2023,
    mileage: "800 mi",
    price: "$280,000",
    bodyStyle: "Coupe",
    engine: "3.9L V8",
    acceleration: "2.9s",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    make: "Aston Martin",
    model: "DBS Volante",
    year: 2024,
    mileage: "150 mi",
    price: "$350,000",
    bodyStyle: "Convertible",
    engine: "5.2L V12",
    acceleration: "3.4s",
    image:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    make: "Bugatti",
    model: "Chiron Pur Sport",
    year: 2021,
    mileage: "4,000 mi",
    price: "$3,500,000",
    bodyStyle: "Coupe",
    engine: "8.0L W16",
    acceleration: "2.3s",
    image:
      "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=2070&auto=format&fit=crop",
  },
];

type Vehicle = (typeof inventory)[0];

export default function InventoryPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
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
    <div className="min-h-screen bg-white pt-48 pb-24 px-6 md:px-12 grainy-overlay">
      <div className="container mx-auto max-w-7xl">
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
            <div className="flex items-center gap-4 bg-f5f5f7 p-2 rounded-full px-6 border border-black/[0.03]">
              <Search size={16} className="text-silver" />
              <input
                type="text"
                placeholder="Search models..."
                className="bg-transparent border-none outline-none text-sm font-medium w-48"
              />
            </div>
          </div>
        </div>

        {/* Filters - Apple Style Segmented */}
        <div className="flex flex-wrap gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {[
            "All",
            "Porsche",
            "McLaren",
            "Ferrari",
            "Lamborghini",
            "Aston Martin",
            "Bugatti",
          ].map((make) => (
            <button
              key={make}
              onClick={() => setActiveFilter(make)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${
                activeFilter === make
                  ? "bg-bt-blue text-white shadow-xl"
                  : "bg-f5f5f7 text-silver hover:bg-onyx hover:text-apple-black"
              }`}
            >
              {make}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredInventory.map((vehicle, i) => (
                <motion.div
                  layout
                  key={vehicle.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group cursor-pointer relative interactive"
                  onClick={() => setSelectedVehicle(vehicle)}
                  data-cursor-text="Inspect"
                >
                  <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-f5f5f7 mb-8 relative group-hover:shadow-2xl transition-all duration-700">
                    <img
                      src={vehicle.image}
                      alt={vehicle.model}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-8 right-8 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-sm">
                      <ArrowUpRight size={20} className="text-apple-black" />
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-silver mb-1">
                          {vehicle.make}
                        </p>
                        <h3 className="text-3xl font-syne font-bold tracking-tight text-apple-black">
                          {vehicle.model}
                        </h3>
                      </div>
                      <span className="text-xl font-syne font-bold text-apple-black/40">
                        {vehicle.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-[10px] font-bold text-silver tracking-widest uppercase pb-6 border-b border-black/[0.05]">
                      <span>{vehicle.year}</span>
                      <span className="w-1 h-1 bg-onyx rounded-full"></span>
                      <span>{vehicle.mileage}</span>
                      <span className="w-1 h-1 bg-onyx rounded-full"></span>
                      <span>{vehicle.bodyStyle}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-white/90 backdrop-blur-2xl"
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
              className="bg-white w-full max-w-7xl h-[90vh] rounded-[4rem] overflow-hidden flex flex-col md:flex-row relative z-10 border border-black/[0.03] shadow-2xl"
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
                <div className="flex-grow">
                  <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">
                    {selectedVehicle.make}
                  </p>
                  <h2 className="text-5xl md:text-6xl font-syne font-bold text-apple-black mb-4 tracking-tighter">
                    {selectedVehicle.model}
                  </h2>
                  <div className="text-3xl font-syne font-bold text-apple-black mb-12">
                    {selectedVehicle.price}
                  </div>

                  <div className="grid grid-cols-2 gap-x-12 gap-y-8 mb-16">
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Gauge size={12} /> Acceleration
                      </p>
                      <p className="text-xl font-medium">
                        {selectedVehicle.acceleration} (0-60)
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Engine
                      </p>
                      <p className="text-xl font-medium">
                        {selectedVehicle.engine}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Mileage
                      </p>
                      <p className="text-xl font-medium">
                        {selectedVehicle.mileage}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-silver uppercase tracking-widest mb-2">
                        Year
                      </p>
                      <p className="text-xl font-medium">
                        {selectedVehicle.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-silver leading-relaxed mb-12">
                    Experience the pinnacle of {selectedVehicle.make}{" "}
                    engineering. This {selectedVehicle.model} represents a
                    perfect marriage of performance and luxury, meticulously
                    maintained and certified by BT Motors.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <MagneticButton>
                    <Link
                      to="/inquiry"
                      className="w-full py-6 bg-bt-blue text-white text-center rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-bt-blue-dark transition-all shadow-xl"
                    >
                      Request Private Showing
                    </Link>
                  </MagneticButton>
                  <button className="w-full py-6 text-center border border-bt-blue/30 text-apple-black rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-bt-blue hover:text-white hover:border-bt-blue transition-all">
                    Calculate Financing
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
