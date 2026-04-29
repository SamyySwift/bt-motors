import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import SplitType from "split-type";

export default function InquiryPage() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
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

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen pt-40 pb-24 bg-white text-apple-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-20">
        {/* Content Column */}
        <div className="w-full lg:w-1/2">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-soft-gray text-apple-black text-xs font-bold tracking-widest uppercase mb-6">
              Concierge
            </span>
            <h1
              ref={titleRef}
              className="text-6xl md:text-8xl font-syne font-bold leading-[0.9] tracking-tight mb-8"
            >
              Begin Your <br />
              <span className="italic">Journey.</span>
            </h1>
            <p className="text-xl text-apple-black/60 max-w-md font-light leading-relaxed">
              Connect with our private advisors to source, service, or
              commission your next masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="group">
              <div className="w-12 h-12 rounded-full bg-soft-gray flex items-center justify-center mb-6 group-hover:bg-bt-blue group-hover:text-white transition-all duration-500">
                <MapPin size={20} />
              </div>
              <h3 className="font-syne font-bold text-xl mb-2">The Boutique</h3>
              <p className="text-apple-black/50 font-light text-sm leading-relaxed">
                1000 Exotic Way
                <br />
                Automotive District
                <br />
                Los Angeles, CA 90015
              </p>
            </div>

            <div className="group">
              <div className="w-12 h-12 rounded-full bg-soft-gray flex items-center justify-center mb-6 group-hover:bg-bt-blue group-hover:text-white transition-all duration-500">
                <Phone size={20} />
              </div>
              <h3 className="font-syne font-bold text-xl mb-2">Direct Line</h3>
              <p className="text-apple-black/50 font-light text-sm leading-relaxed">
                Sales: +1 (800) 555-0199
                <br />
                Email: concierge@btmotors.com
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="w-full lg:w-1/2">
          <div className="bg-soft-gray/50 rounded-[40px] p-8 md:p-16 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* Progress */}
                  <div className="flex items-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-all duration-700 ${
                          s <= step ? "bg-bt-blue" : "bg-bt-blue/10"
                        }`}
                      />
                    ))}
                  </div>

                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <h3 className="text-3xl font-syne font-bold">
                        Who are we speaking with?
                      </h3>
                      <div className="space-y-8">
                        <div className="relative border-b border-apple-black/10 focus-within:border-apple-black transition-colors duration-500">
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full bg-transparent py-4 text-xl outline-none placeholder:text-apple-black/20 font-light"
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="relative border-b border-apple-black/10 focus-within:border-apple-black transition-colors duration-500">
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full bg-transparent py-4 text-xl outline-none placeholder:text-apple-black/20 font-light"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <h3 className="text-3xl font-syne font-bold">
                        What piques your interest?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "Acquisition",
                          "Divestment",
                          "Master Service",
                          "Advisory",
                        ].map((interest) => (
                          <button
                            key={interest}
                            onClick={() =>
                              setFormData({ ...formData, interest })
                            }
                            className={`py-6 px-8 rounded-2xl text-left transition-all duration-500 border ${
                              formData.interest === interest
                                ? "bg-bt-blue text-white border-bt-blue shadow-xl scale-[1.02]"
                                : "bg-white border-apple-black/5 text-apple-black/60 hover:border-bt-blue/30 hover:text-apple-black"
                            }`}
                          >
                            <span className="text-lg font-light tracking-tight">
                              {interest}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-10"
                    >
                      <h3 className="text-3xl font-syne font-bold">
                        Any specific requirements?
                      </h3>
                      <div className="relative border-b border-apple-black/10 focus-within:border-apple-black transition-colors duration-500">
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full bg-transparent py-4 text-xl outline-none placeholder:text-apple-black/20 font-light resize-none"
                          placeholder="Tell us about your vision..."
                        ></textarea>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between pt-10">
                    <button
                      onClick={() => step > 1 && setStep(step - 1)}
                      className={`text-apple-black/40 hover:text-apple-black transition-colors font-bold uppercase text-xs tracking-widest ${step === 1 ? "invisible" : ""}`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className="group flex items-center gap-4 bg-bt-blue text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-bt-blue-dark transition-all duration-500"
                    >
                      {step === 3 ? "Send Request" : "Continue"}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-8 py-20"
                >
                  <div className="w-24 h-24 rounded-full bg-bt-blue flex items-center justify-center text-white">
                    <CheckCircle2 size={40} strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="text-4xl font-syne font-bold mb-4">
                      Request Sent.
                    </h3>
                    <p className="text-apple-black/60 font-light max-w-xs mx-auto">
                      Thank you, {formData.name.split(" ")[0]}. An executive
                      advisor will reach out to you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-apple-black underline underline-offset-8 font-bold uppercase text-xs tracking-widest pt-8"
                  >
                    Send another request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
