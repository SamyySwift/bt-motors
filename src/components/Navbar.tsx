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
          "fixed top-0 left-0 right-0 z-50",
          scrolled
            ? "py-4 bg-white/70 backdrop-blur-md border-b border-black/[0.03]"
            : "py-8",
        )}
      >
        <div className="container mx-auto px-8 md:px-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img src="/logo.png" alt="BEE TEE AUTOMOBILE" className="h-12 w-auto" />
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
                    : "text-black",
                )}
              >
                {navItem.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center">
            <button className="p-2 text-apple-black/40 hover:text-apple-black transition-all">
              <Search size={18} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-apple-black relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-10 transition-all duration-500",
          menuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none",
        )}
      >
        {navLinks.map((navItem) => (
          <Link
            key={navItem.name}
            to={navItem.path}
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-sans font-bold tracking-tight text-apple-black hover:opacity-50 transition-all"
          >
            {navItem.name}
          </Link>
        ))}
        <Link
          to="/inquiry"
          onClick={() => setMenuOpen(false)}
          className="mt-8 px-10 py-4 rounded-full text-sm font-bold bg-bt-blue text-white hover:bg-bt-blue-dark transition-all"
        >
          Book Inspection
        </Link>
      </div>
    </>
  );
}
