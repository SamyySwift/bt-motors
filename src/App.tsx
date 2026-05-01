import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import LenisProvider from "./components/LenisProvider";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import RepairPage from "./pages/RepairPage";
import InventoryPage from "./pages/InventoryPage";
import InquiryPage from "./pages/InquiryPage";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-grow"
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/repair" element={<RepairPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <LenisProvider>
        <AmbientBackground />

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <AnimatedRoutes />

          <footer className="w-full pt-24 pb-12 bg-bt-blue border-t border-white/10 relative z-10">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                  <img
                    src="/logo.png"
                    alt="BEE TEE AUTOMOBILE"
                    className="h-16 w-auto mb-6"
                  />
                  <p className="text-white/70 text-sm leading-relaxed max-w-xs font-medium">
                    To provide exceptional value by selling quality brand-new, electric, and foreign-used vehicles, while delivering complete automotive services with integrity, innovation, and customer satisfaction at the core.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-6">
                    Navigation
                  </h4>
                  <ul className="space-y-4">
                    {["Inventory", "Services", "Repair", "About"].map(
                      (item) => (
                        <li key={item}>
                          <Link
                            to={`/${item.toLowerCase()}`}
                            className="text-white/70 hover:text-white transition-colors text-sm font-medium"
                          >
                            {item}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-6">
                    Connect
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/beeteeautos?igsh=MTZjMXQwYXpnZ2R4dw%3D%3D&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-bt-blue transition-all flex items-center justify-center text-white"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="https://x.com/beeteeautos?s=21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-bt-blue transition-all flex items-center justify-center text-white"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1DNqQr1V5u/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-bt-blue transition-all flex items-center justify-center text-white"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.tiktok.com/@beeteeautomobile?_r=1&_d=f1cmb9145ijmgj&sec_uid=MS4wLjABAAAAWUWBxjaIhW93kZxXIz0-Rncdb4mPVX-d_2ZsaN6dkVlPLBeqX8eauV9en9uPRA2E&share_author_id=7085718510140605446&sharer_language=en&source=h5_m&u_code=e17f21l39h095i&item_author_type=1&utm_source=copy&tt_from=copy&enable_checksum=1&utm_medium=ios&share_link_id=FF76E884-CF1E-4D9A-A87E-E73ED4DEC514&user_id=7085718510140605446&sec_user_id=MS4wLjABAAAAWUWBxjaIhW93kZxXIz0-Rncdb4mPVX-d_2ZsaN6dkVlPLBeqX8eauV9en9uPRA2E&social_share_type=4&ug_btm=b8727,b0&utm_campaign=client_share&share_app_id=123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-bt-blue transition-all flex items-center justify-center text-white"
                      aria-label="TikTok"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white mb-6">
                    Location
                  </h4>
                  <p className="text-white/70 text-sm leading-relaxed font-medium">
                    PLOT 36 wole Soyinka way,
                    <br />
                    Cadestrial Zone B15,
                    <br />
                    Jahi, Abuja
                  </p>
                </div>
              </div>
              <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-white/50 text-[10px] tracking-widest uppercase font-bold">
                  &copy; {new Date().getFullYear()} BEE TEE AUTOMOBILE. All rights
                  reserved.
                </p>
                <div className="flex gap-8">
                  <a
                    href="#"
                    className="text-white/50 hover:text-white text-[10px] tracking-widest uppercase font-bold transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white text-[10px] tracking-widest uppercase font-bold transition-colors"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
