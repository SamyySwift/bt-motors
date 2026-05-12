import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";


import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const RepairPage = lazy(() => import("./pages/RepairPage"));
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const InquiryPage = lazy(() => import("./pages/InquiryPage"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-12 h-12 border-4 border-bt-blue/20 border-t-bt-blue rounded-full animate-spin"></div>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/repair" element={<RepairPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AmbientBackground />

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <AnimatedRoutes />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
