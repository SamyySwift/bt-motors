import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down -> Show (as per user request)
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> Hide (as per user request)
        setVisible(false);
      }
      
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "CAR", path: "/inventory" },
    { name: "SERVICES", path: "/services" },
    { name: "REPAIR", path: "/repair" },
    { name: "ABOUT", path: "/about" },
    { name: "INQUIRY", path: "/inquiry" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "py-4 bg-white/70 backdrop-blur-md border-b border-black/[0.03]"
            : "py-8",
          !scrolled && location.pathname === "/" && !menuOpen && "bg-gradient-to-b from-black/60 via-black/20 to-transparent"
        )}
      >
        <div className="container mx-auto px-8 md:px-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img 
              src="/logo.png" 
              alt="BEE TEE AUTOMOBILE" 
              className={cn("h-12 w-auto transition-all duration-300", 
                 !scrolled && location.pathname === '/' && !menuOpen ? "brightness-0 invert opacity-90 drop-shadow-lg" : ""
              )} 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((navItem) => (
              <Link
                key={navItem.name}
                to={navItem.path}
                className={cn(
                  "text-[11px] tracking-[0.05em] font-medium transition-colors hover:text-bt-blue",
                  location.pathname === navItem.path
                    ? "text-bt-blue"
                    : (!scrolled && location.pathname === "/" && !menuOpen ? "text-white drop-shadow-md" : "text-black"),
                )}
              >
                {navItem.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button className={cn(
              "p-2 transition-all hover:opacity-100",
              !scrolled && location.pathname === "/" && !menuOpen ? "text-white/80 drop-shadow-md hover:text-white" : "text-apple-black/40 hover:text-apple-black"
            )}>
              <Search size={18} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden z-50 relative transition-colors",
              (menuOpen || (!scrolled && location.pathname === "/")) ? "text-white drop-shadow-md" : "text-apple-black"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-apple-black flex flex-col p-8 md:p-16 grainy-overlay"
          >
            {/* Background Texture/Accent */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-bt-blue/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex flex-col h-full justify-between pt-24">
              <div className="flex flex-col space-y-4">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/30 text-[10px] tracking-[0.4em] font-bold uppercase mb-4"
                >
                  Navigation
                </motion.p>
                {navLinks.map((navItem, index) => (
                  <motion.div
                    key={navItem.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={navItem.path}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "text-[clamp(2.5rem,12vw,3rem)] font-syne font-bold tracking-tighter transition-all block py-1",
                        location.pathname === navItem.path ? "text-bt-blue" : "text-white/90 hover:text-bt-blue"
                      )}
                    >
                      {navItem.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-12 pb-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-white/30 text-[10px] tracking-[0.4em] font-bold uppercase mb-6">
                    Connect
                  </p>
                  <div className="flex flex-col space-y-4">
                    <a href="tel:+2349077777211" className="text-white/70 hover:text-white text-lg font-medium transition-colors">
                      +234 907 777 7211
                    </a>
                    <a href="mailto:beeteeautomobile@gmail.com" className="text-white/70 hover:text-white text-lg font-medium transition-colors">
                      beeteeautomobile@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex gap-6"
                >
                  {["Instagram", "Twitter", "Facebook"].map((platform) => (
                    <a key={platform} href="#" className="text-white/40 hover:text-white text-[10px] tracking-widest uppercase font-bold transition-colors">
                      {platform}
                    </a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
