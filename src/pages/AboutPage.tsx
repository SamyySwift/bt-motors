import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowUpRight, Globe, Award, Heart } from "lucide-react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Text Reveals
      if (heroHeadingRef.current) {
        const text = new SplitType(heroHeadingRef.current, {
          types: "chars,words",
        });
        gsap.from(text.chars, {
          y: 80,
          opacity: 0,
          duration: 1.5,
          stagger: 0.02,
          ease: "power4.out",
          delay: 0.5,
        });
      }

      const revealTargets = document.querySelectorAll(".reveal-on-scroll");
      revealTargets.forEach((target) => {
        const text = new SplitType(target as HTMLElement, { types: "words" });
        gsap.from(text.words, {
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
        });
      });

      // Parallax images
      gsap.utils.toArray(".parallax-about").forEach((img: any) => {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white grainy-overlay pt-48 pb-24 px-6 md:px-12"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="mb-48">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-8 text-center md:text-left">
            Our Philosophy
          </p>
          <h1
            ref={heroHeadingRef}
            className="text-7xl md:text-[8vw] font-syne font-bold tracking-tighter leading-[0.85] text-center md:text-left mb-24"
          >
            About <br />
            <span className="italic">BEE TEE.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="space-y-12 order-2 md:order-1">
              <p className="text-2xl md:text-3xl font-syne font-bold text-apple-black leading-tight reveal-on-scroll">
                "We don't just sell cars. We curate masterpieces that bridge the
                gap between engineering and art. Every vehicle in our showroom
                is a testament to human ingenuity."
              </p>
              <p className="text-lg text-silver leading-relaxed font-medium">
                BEE TEE AUTOMOBILE was founded on a simple premise: that the world's
                finest automobiles deserve a home that matches their excellence.
                From our clinical restoration labs to our bespoke delivery
                logistics, every detail is engineered for perfection.
              </p>
              <div className="flex gap-12 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-f5f5f7 flex items-center justify-center">
                    <Award size={18} className="text-apple-black" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Certified Excellence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-f5f5f7 flex items-center justify-center">
                    <Globe size={18} className="text-apple-black" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Global Delivery
                  </span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden order-1 md:order-2 shadow-2xl">
              <img
                src="/IMG_6374.jpg"
                alt="Showroom"
                className="w-full h-full object-cover parallax-about scale-110"
              />
            </div>
          </div>
        </section>

        {/* Narrative / Stats Bento */}
        <section className="mb-48">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-f5f5f7 p-20 rounded-[4rem] flex flex-col justify-center">
              <h2 className="text-5xl font-syne font-bold mb-8 reveal-on-scroll">
                The BEE TEE Heritage.
              </h2>
              <p className="text-silver text-lg leading-relaxed max-w-xl">
                We are a premier automotive company dedicated to providing high-quality brand-new, foreign-used, and electric vehicles. Our expert team ensures that every vehicle we sell or service meets the highest standards of excellence and reliability.
              </p>
            </div>
            <div className="bg-bt-blue text-white p-20 rounded-[4rem] flex flex-col justify-between">
              <Heart size={48} className="text-white/20" />
              <div>
                <h3 className="text-6xl font-syne font-bold mb-2">5,000+</h3>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Gallery */}
        <section className="mb-48">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-silver mb-4">
                The Facility
              </p>
              <h2 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter reveal-on-scroll">
                Where Art Meets Engineering.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[120vh]">
            <div className="relative rounded-[4rem] overflow-hidden group shadow-xl">
              <img
                src="/IMG_7810.jpg"
                alt="Technical"
                className="w-full h-full object-cover parallax-about scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-16">
                <h3 className="text-3xl text-white font-syne font-bold">
                  Service Center
                </h3>
                <p className="text-white/60 mt-4">
                  Where our expert technicians provide top-tier maintenance and repairs.
                </p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="relative rounded-[4rem] overflow-hidden group shadow-xl">
                <img
                  src="/IMG_6373.jpg"
                  alt="Lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
              </div>
              <div className="relative rounded-[4rem] overflow-hidden group bg-f5f5f7 flex flex-col items-center justify-center p-20 text-center">
                <h3 className="text-4xl font-syne font-bold mb-6">
                  Want to visit?
                </h3>
                <p className="text-silver mb-10">
                  Our showroom at PLOT 36 Wole Soyinka Way, Jahi, Abuja is open
                  Mon - Saturdays for your visit.
                </p>
                <Link
                  to="/inquiry"
                  className="group flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase hover:text-bt-blue transition-colors pb-2 border-b border-bt-blue/30"
                >
                  Book A Showing <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <section className="py-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-syne font-bold text-apple-black leading-tight reveal-on-scroll">
            "We aren't just selling a car. We are inviting you into a legacy of
            performance and passion."
          </h2>
          <div className="mt-12 w-20 h-[1px] bg-apple-black/10 mx-auto"></div>
          <p className="mt-8 text-[10px] font-bold tracking-[0.4em] uppercase text-silver">
            BEE TEE AUTOMOBILE
          </p>
        </section>
      </div>
    </div>
  );
}
