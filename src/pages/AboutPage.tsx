import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { motion } from "framer-motion";
import { 
  Award, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Users, 
  Target,
  Eye,
  Rocket,
  Battery,
  Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead, { getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from "../components/SEOHead";

gsap.registerPlugin(ScrollTrigger);

const CoreValue = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-f5f5f7 p-10 rounded-[3rem] group hover:bg-bt-blue transition-all duration-500">
    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-2xl font-syne font-bold mb-4 group-hover:text-white transition-colors">{title}</h4>
    <p className="text-silver group-hover:text-white/70 transition-colors leading-relaxed">
      {desc}
    </p>
  </div>
);

const TeamMember = ({ name, role, desc, image }: { name: string, role: string, desc: string, image?: string }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24 last:mb-0">
    <div className="aspect-square rounded-[3rem] overflow-hidden bg-f5f5f7">
      <img 
        src={image || "/IMG_6374.jpg"} 
        alt={name} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-bt-blue mb-2">{role}</p>
        <h3 className="text-4xl md:text-5xl font-syne font-bold">{name}</h3>
      </div>
      <p className="text-silver text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
        const text = new SplitType(target as HTMLElement, { types: "words,lines" });
        gsap.from(text.words, {
          scrollTrigger: {
            trigger: target,
            start: "top 90%",
            end: "top 50%",
            scrub: false,
          },
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power3.out",
        });
      });

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
      <SEOHead
        title="About Us - Nigeria's Leading Electric & Luxury Car Dealer"
        description="BEE TEE Automobile is Nigeria's premier electric and luxury car dealership in Abuja. We sell Tesla, Range Rover, Lexus, BYD, XPeng & Avatr EVs. Expert car repair, servicing & detailing since 2020."
        canonicalUrl="/about"
        keywords="electric vehicles in nigeria, electric vehicle dealership, about BEE TEE Automobile, electric cars Nigeria, luxury car dealer Abuja, buy Tesla Nigeria, electric vehicle dealer Nigeria, EV cars Abuja, luxury SUV Nigeria, car dealership Abuja Nigeria, buy electric car in Nigeria, Range Rover dealer Nigeria, Lexus dealer Abuja"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            getOrganizationSchema(),
            getBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "About", url: "/about" },
            ]),
            getFAQSchema([
              { question: "Where can I buy electric cars in Nigeria?", answer: "BEE TEE Automobile in Abuja offers a wide range of electric vehicles including Tesla Model S, Model 3, Model Y, Cybertruck, BYD Atto 3, XPeng G9, and Avatr 12. Visit our showroom at Plot 36, Wole Soyinka Way, Jahi, Abuja." },
              { question: "Does BEE TEE Automobile sell luxury cars in Abuja?", answer: "Yes. We stock premium luxury vehicles including Range Rover Autobiography, Toyota Land Cruiser LC300, Lexus LX 600, Lexus GX 550, Mercedes-Benz GLE, and more. Both brand new and foreign used options available." },
              { question: "Can I buy a Tesla in Nigeria?", answer: "Absolutely. BEE TEE Automobile is one of Nigeria's leading Tesla dealers, offering Model S, Model 3, Model Y, and Cybertruck with full after-sales support and EV servicing." },
              { question: "What services does BEE TEE Automobile offer?", answer: "We offer luxury and electric vehicle sales, expert car repair, professional spray painting, car detailing, mechanical diagnostics, and after-sales support for all vehicle types." },
            ]),
          ],
        }}
      />
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="mb-48">
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-8 text-center md:text-left">
            Established 2020 · Abuja, Nigeria
          </p>
          <h1
            ref={heroHeadingRef}
            className="text-5xl md:text-[6vw] font-syne font-bold tracking-tighter leading-[0.85] text-center md:text-left mb-24"
          >
            Electric &amp; Luxury <br />
            <span className="italic">Redefined.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
              <p className="text-2xl md:text-3xl font-syne font-bold text-apple-black leading-[1.1] reveal-on-scroll">
                BEE TEE Automobiles Ltd is Nigeria's premier destination for electric vehicles 
                and luxury cars — bringing the future of motoring to Abuja and beyond.
              </p>
              <div className="space-y-6 text-lg text-silver leading-relaxed font-medium reveal-on-scroll">
                <p>
                  Founded in 2020, we are pioneering the electric vehicle revolution in Nigeria. 
                  As one of the first dealerships in the country to stock <strong>Tesla, BYD, XPeng, 
                  and Avatr electric vehicles</strong>, we're making sustainable, zero-emission 
                  driving accessible to Nigerian car buyers. Our showroom in Jahi, Abuja features 
                  the latest EVs alongside premium luxury brands.
                </p>
                <p>
                  Our curated collection includes <strong>brand new and foreign used luxury SUVs</strong> like 
                  the Range Rover Autobiography, Toyota Land Cruiser LC300, Lexus LX 600, and 
                  Mercedes-Benz GLE — as well as cutting-edge <strong>electric cars</strong> including 
                  the Tesla Model S, Model 3, Model Y, Cybertruck, BYD Atto 3, XPeng G9, and Avatr 12.
                </p>
                <p>
                  Beyond sales, we provide expert car repair, professional spray painting, advanced 
                  mechanical diagnostics, premium detailing, and comprehensive after-sales support 
                  for both electric and conventional vehicles across Nigeria.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-f5f5f7 flex items-center justify-center">
                    <Battery size={18} className="text-bt-blue" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Electric Vehicles
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-f5f5f7 flex items-center justify-center">
                    <Award size={18} className="text-apple-black" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Luxury Cars
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-f5f5f7 flex items-center justify-center">
                    <Leaf size={18} className="text-green-600" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase">
                    Zero Emission
                  </span>
                </div>
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
              <img
                src="/IMG_6374.jpg"
                alt="BEE TEE Automobile showroom displaying electric and luxury cars for sale in Abuja Nigeria"
                className="w-full h-full object-cover parallax-about scale-110"
              />
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="mb-48">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Purpose Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative bg-[#0A0A0A] text-white p-12 md:p-16 rounded-[4rem] flex flex-col gap-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden min-h-[450px]"
            >
              <div className="absolute inset-0 bg-bt-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="space-y-8 relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-bt-blue/20 group-hover:scale-110">
                  <Target size={40} className="text-bt-blue" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/40">Purpose</h3>
                  <div className="w-8 h-px bg-bt-blue/30 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-syne font-bold leading-tight relative z-10">
                To be Nigeria's leading electric and luxury car dealership, providing 
                personalized services and driving the EV revolution across West Africa.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative bg-bt-blue text-white p-12 md:p-16 rounded-[4rem] flex flex-col gap-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden min-h-[450px] shadow-xl shadow-bt-blue/20"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="space-y-8 relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20 group-hover:scale-110">
                  <Eye size={40} className="text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-white/60">Vision</h3>
                  <div className="w-8 h-px bg-white/30 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-syne font-bold leading-tight relative z-10">
                To lead the future of sustainable, electric, and luxury automotive 
                care in Nigeria — where innovation meets elegance through technology.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative bg-[#F5F5F7] text-apple-black p-12 md:p-16 rounded-[4rem] flex flex-col gap-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden min-h-[450px]"
            >
              <div className="absolute inset-0 bg-bt-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="space-y-8 relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-sm transition-all duration-500 group-hover:bg-bt-blue/10 group-hover:scale-110">
                  <Rocket size={40} className="text-bt-blue" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-silver">Mission</h3>
                  <div className="w-8 h-px bg-bt-blue/20 group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-syne font-bold leading-tight relative z-10">
                To deliver premium electric and luxury vehicles, world-class repair services, 
                and reliable car care solutions to customers across Nigeria.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-48">
          <div className="mb-24">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">Foundation</p>
            <h2 className="text-6xl md:text-8xl font-syne font-bold tracking-tighter">Core Values.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CoreValue 
              icon={<ShieldCheck className="text-bt-blue" />} 
              title="Integrity" 
              desc="We operate ethically with transparency and fairness in every transaction."
            />
            <CoreValue 
              icon={<Heart className="text-bt-blue" />} 
              title="Customer Satisfaction" 
              desc="We prioritize long-term relationships and seamless mobility for our clients."
            />
            <CoreValue 
              icon={<Award className="text-bt-blue" />} 
              title="Excellence" 
              desc="We strive for outstanding quality and results exceeding expectations at every stage."
            />
            <CoreValue 
              icon={<Zap className="text-bt-blue" />} 
              title="Innovation" 
              desc="We embrace new technologies, techniques and creativity in automotive care."
            />
            <CoreValue 
              icon={<Users className="text-bt-blue" />} 
              title="Teamwork" 
              desc="We work collaboratively to exceed expectations and deliver perfect results."
            />
            <CoreValue 
              icon={<Target className="text-bt-blue" />} 
              title="Precision" 
              desc="Meticulous attention to detail in every service and vehicle we deliver."
            />
          </div>
        </section>

        {/* Goals */}
        <section className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square rounded-[4rem] overflow-hidden">
              <img src="/repair_3.jpeg" alt="Electric car repair and luxury vehicle servicing at BEE TEE Automobile Abuja" className="w-full h-full object-cover parallax-about" />
            </div>
            <div className="space-y-12">
              <h2 className="text-6xl font-syne font-bold tracking-tighter">Our Goals.</h2>
              <ul className="space-y-8">
                {[
                  "Become Nigeria's number one destination for electric vehicles and luxury cars, serving both institutional and private clients across all 36 states.",
                  "Expand our EV infrastructure and service capabilities to support the growing demand for electric cars in Nigeria and West Africa.",
                  "Build an unmatched reputation in luxury automobile sales, electric vehicle imports, and premium after-sales care across Nigeria."
                ].map((goal, i) => (
                  <li key={i} className="flex gap-6 group">
                    <span className="text-3xl font-syne font-bold text-bt-blue/20 group-hover:text-bt-blue transition-colors">0{i+1}</span>
                    <p className="text-xl text-apple-black font-medium leading-tight pt-1">
                      {goal}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Notable Achievements Section */}
        <section className="mb-48 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Left: Sticky Header */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-bt-blue mb-6">Our Track Record</p>
              <h2 className="text-6xl md:text-7xl font-syne font-bold tracking-tighter leading-[0.9] mb-12">
                Notable <br /> 
                <span className="italic text-bt-blue">Deliveries.</span>
              </h2>
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-f5f5f7 border border-black/5">
                  <div className="text-4xl font-syne font-bold text-bt-blue mb-2">500+</div>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">Vehicles Supplied</p>
                </div>
                <div className="p-8 rounded-3xl bg-apple-black text-white">
                  <div className="text-4xl font-syne font-bold mb-2">20+</div>
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-40">Major Institutions</p>
                </div>
              </div>
            </div>

            {/* Right: Detailed List */}
            <div className="lg:col-span-8 space-y-6">
              {[
                { text: "Supply of Fifty units of Changan Cs35 Plus Luxury SUV to Kano State Government.", cat: "GOVERNMENT" },
                { text: "Supply of five 2023 Toyota Land Cruiser Prado to Petroleum Development Funds (PTDF), Abuja.", cat: "INSTITUTIONAL" },
                { text: "Supply of one 2025 Lexus GX 550 to NIRSAL plc., Abuja.", cat: "CORPORATE" },
                { text: "Supply of one 2024 Toyota Landcruiser (Bulletproof) to Advance Global Area Solution Limited.", cat: "SPECIALIZED" },
                { text: "Supply of one 2025 Toyota Land Cruiser to Exclusive Holiday Resort, Abuja.", cat: "HOSPITALITY" },
                { text: "Supply of one 2020 Land Rover to Nigerian Police Pension Limited.", cat: "INSTITUTIONAL" },
                { text: "Supply of two 2023 Toyota Corolla to Winstream Global Services Limited, Abuja.", cat: "CORPORATE" },
                { text: "Supply of one 2022 Toyota Landcruiser (Bulletproof) to Mota Engineering Nigeria Limited, Lagos.", cat: "SPECIALIZED" },
                { text: "Supply of two Toyota Hilux to Federal University, Lafia.", cat: "EDUCATION" },
                { text: "Supply of Two Toyota Venza to Federal University, Lafia.", cat: "EDUCATION" },
                { text: "Supply of One Toyota Highlander to Federal University, Lafia.", cat: "EDUCATION" },
                { text: "Sale of one 2018 Toyota Highlander to Nigerian Army Department of Civil Military Relation, Abuja.", cat: "DEFENSE" },
                { text: "Supply of three 2022 Toyota Landcruiser to Remmy Motors, Abuja.", cat: "AUTOMOTIVE" },
                { text: "Supply of two 2013 Toyota Corolla to Usiju Quality Base, Jos.", cat: "CORPORATE" },
                { text: "Supply of one 2022 Toyota Land Cruiser to Esoteria Investment Limited, Kaduna.", cat: "CORPORATE" },
                { text: "Supply of one 2023 Toyota Hilux to Sagee & Sumeeya Luxury Shelter.", cat: "CORPORATE" },
                { text: "Supply of one 2015 Mercedes Benz, ML 350 to Mohd Nazir Global Services Nigeria Limited, Abuja.", cat: "CORPORATE" },
                { text: "Supply of one 2019 Toyota Hilux to Omatoz Motors Ltd, Abuja.", cat: "AUTOMOTIVE" },
                { text: "Supply of one 2018 Lexus GX470 to National Insurance Comm., Abuja.", cat: "INSTITUTIONAL" },
                { text: "Supply of one 2017 Lexus RX350 to Maka Aminu Motors, Rivers State.", cat: "AUTOMOTIVE" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.8 }}
                  className="group relative flex flex-col md:flex-row md:items-center justify-between p-10 md:p-12 rounded-[3rem] bg-white border border-black/5 hover:border-bt-blue/20 hover:shadow-2xl transition-all duration-700"
                >
                  <div className="flex gap-8 items-start md:items-center">
                    <span className="text-sm font-syne font-bold text-bt-blue/20 group-hover:text-bt-blue transition-colors duration-500">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-silver group-hover:text-bt-blue transition-colors duration-500">
                        {item.cat}
                      </span>
                      <p className="text-xl md:text-2xl font-syne font-bold text-apple-black leading-tight group-hover:translate-x-2 transition-transform duration-700">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-bt-blue flex items-center justify-center text-white scale-75 group-hover:scale-100 transition-transform duration-700">
                      <Award size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Management Team */}
        <section className="mb-48">
          <div className="mb-24">
            <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">Leadership</p>
            <h2 className="text-5xl md:text-8xl font-syne font-bold tracking-tighter">Management.</h2>
          </div>
          
          <TeamMember 
            name="Alh. Muhammed Isyaku Lawan"
            role="Chairman and Chief Executive Officer"
            image="/muhammed.jpeg"
            desc="An entrepreneur with vast experience in the automobile sales industry. Bold and enthusiastic, Alh. Lawan has a passion for detail and is a proven leader in managing and motivating teams to achieve excellence. He is the Founder of Bee Tee Automobile."
          />
          
          <TeamMember 
            name="Ms. Deborah Nwachukwu"
            role="Human Relations Manager / Ag. General Manager"
            image="/deborah.jpeg"
            desc="Highly organized and detail-oriented with extensive experience in project management. As the hub of the company, Ms. Nwachukwu coordinates corporate procedures and is a passionate communicator vital to the administrative success of Bee Tee Automobile."
          />
        </section>

        {/* Electric Vehicles in Nigeria Section — SEO-rich content block */}
        <section className="mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div>
              <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-silver mb-4">The Future Is Electric</p>
              <h2 className="text-5xl md:text-6xl font-syne font-bold tracking-tighter mb-8">
                Electric Vehicles <br /><span className="italic text-bt-blue">in Nigeria.</span>
              </h2>
              <div className="space-y-6 text-silver leading-relaxed text-lg">
                <p>
                  As Nigeria's pioneering electric vehicle dealership, BEE TEE Automobile is at the 
                  forefront of the EV revolution in West Africa. We supply brand-new <strong>Tesla Model S</strong>, 
                  <strong> Tesla Model 3</strong>, <strong>Tesla Model Y</strong>, and the revolutionary 
                  <strong> Tesla Cybertruck</strong> — making us the go-to Tesla dealership in Abuja and Nigeria.
                </p>
                <p>
                  Beyond Tesla, we stock a growing selection of Chinese electric vehicles including 
                  the <strong>BYD Atto 3</strong>, <strong>XPeng G9</strong>, and <strong>Avatr 12</strong>. 
                  These next-generation EVs offer exceptional range, cutting-edge technology, and 
                  zero-emission driving — perfect for Nigeria's environmentally conscious consumers.
                </p>
                <p>
                  Our dedicated <strong>EV Service Center in Abuja</strong> provides fast charging stations, 
                  battery diagnostics, electric motor servicing, and comprehensive maintenance for all 
                  electric vehicle brands. Whether you're transitioning from petrol to electric or 
                  adding to your EV fleet, BEE TEE Automobile makes buying an electric car in Nigeria 
                  seamless and affordable.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-f5f5f7 rounded-[3rem] p-10">
                <h3 className="text-2xl font-syne font-bold mb-6">Why Go Electric in Nigeria?</h3>
                <ul className="space-y-5">
                  {[
                    { title: "Lower Running Costs", desc: "Electric vehicles cost up to 70% less to run than petrol cars — saving you millions of naira annually on fuel." },
                    { title: "Zero Emissions", desc: "Contribute to cleaner air in Abuja and Lagos. EVs produce zero tailpipe emissions, reducing your carbon footprint." },
                    { title: "Government Incentives", desc: "Nigeria's growing support for electric mobility includes reduced import duties on EVs and green energy initiatives." },
                    { title: "Cutting-Edge Technology", desc: "From autopilot capabilities to over-the-air updates, electric cars offer the most advanced driving experience available." },
                    { title: "Premium EV Support", desc: "BEE TEE provides end-to-end EV ownership support — from purchase and charging infrastructure to servicing and warranty." },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-bt-blue font-bold text-lg mt-0.5">✓</span>
                      <div>
                        <p className="font-bold text-apple-black text-sm">{item.title}</p>
                        <p className="text-silver text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-bt-blue text-white rounded-[3rem] p-10">
                <h3 className="text-xl font-syne font-bold mb-3">Available Electric Car Brands</h3>
                <p className="text-white/70 text-sm mb-6">We import and sell the following EV brands in Nigeria:</p>
                <div className="flex flex-wrap gap-3">
                  {["Tesla", "BYD", "XPeng", "Avatr", "Mercedes EQ", "BMW iX", "Porsche Taycan"].map((brand) => (
                    <span key={brand} className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold tracking-wider uppercase">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section className="mb-48 bg-f5f5f7 rounded-[4rem] p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-6xl font-syne font-bold mb-8">Visit Our Showroom.</h2>
          <p className="text-xl text-silver mb-12 max-w-2xl mx-auto">
            Experience the BEE TEE standard in person. Our facility at Plot 36, Wole Soyinka Way, Jahi, Abuja is designed for the discerning car enthusiast.
          </p>
          <div className="flex justify-center">
            <Link 
              to="/inquiry" 
              className="px-12 py-6 bg-bt-blue text-white rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-bt-blue-dark transition-all shadow-xl"
            >
              Get Directions
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
