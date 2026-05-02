import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import LenisProvider from "./components/LenisProvider";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
}

export default App;
