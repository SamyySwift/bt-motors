import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: "Inventory", path: "/inventory" },
    { name: "Services", path: "/services" },
    { name: "Repair", path: "/repair" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/inquiry" },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/beeteeautos?igsh=MTZjMXQwYXpnZ2R4dw%3D%3D&utm_source=qr",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Twitter",
      url: "https://x.com/beeteeautos?s=21",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1DNqQr1V5u/?mibextid=wwXIfr",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@beeteeautomobile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      ),
    },
  ];

  return (
    <footer className="w-full bg-bt-blue text-white pt-32 pb-12 relative overflow-hidden z-10">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start mb-32">
          {/* Left: Brand Intro */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/logo.png"
                alt="BEE TEE AUTOMOBILE"
                className="h-12 w-auto mb-10 opacity-90"
              />
              <h2 className="text-3xl md:text-4xl font-syne font-bold leading-tight mb-8 max-w-md">
                Elevating the automotive experience through{" "}
                <span className="text-white/40 italic">unmatched</span>{" "}
                standards.
              </h2>
              <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-white/40">
                <span>Abuja, Nigeria</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>Local Time: {time}</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Navigation & Contact */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-8">
                Discovery
              </h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="group relative inline-block text-lg font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-8">
                Location
              </h4>
              <p className="text-lg font-medium text-white/70 leading-relaxed max-w-[200px]">
                Plot 36 Wole Soyinka Way, Jahi, Abuja
              </p>
              <div className="mt-8">
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-4">
                  Inquiries
                </h4>
                <a
                  href="mailto:beeteeautomobile@gmail.com"
                  className="group relative inline-block text-sm font-bold tracking-widest uppercase hover:text-white transition-colors"
                >
                  beeteeautomobile@gmail.com
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white/20 group-hover:bg-white transition-all" />
                </a>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 mb-8">
                Follow Us
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social) => (
                  <MagneticButton key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-bt-blue transition-all duration-500"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Massive Brand Footer Text */}
        <div className="relative pt-20 pb-10 overflow-hidden border-t border-white/5">
          <motion.div
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[7.5vw] text-center font-syne font-black leading-none uppercase tracking-tighter text-white/40 select-none pointer-events-none whitespace-nowrap">
              BEE TEE <br />
              AUTOMOBILE
            </h1>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-10">
            <p className="text-white/30 text-[10px] tracking-widest uppercase font-bold">
              &copy; {new Date().getFullYear()} BEE TEE AUTOMOBILE. All rights
              reserved.
            </p>
            <div className="flex gap-12">
              <Link
                to="#"
                className="text-white/30 hover:text-white text-[10px] tracking-widest uppercase font-bold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-white/30 hover:text-white text-[10px] tracking-widest uppercase font-bold transition-colors"
              >
                Terms of Service
              </Link>
              <div className="text-white/30 text-[10px] tracking-widest uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Showroom Open
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
