import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCode,
  FiZap,
  FiTarget,
  FiHeart,
  FiCoffee,
} from "react-icons/fi";
import SectionHeading from "../components/SectionHeading";
import { personal } from "../data/content";

const InteractivePhoto = ({ imageUrl }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}>
      <div className="relative overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-4 shadow-2xl">
        {/* Photo Container */}
        <motion.div
          className="relative aspect-[13/15] overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img
            src={imageUrl || ""}
            alt={`image`}
            className="h-full w-full object-cover"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 via-transparent to-sky-400/20"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Decorative Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-brand-500/30"
          animate={{
            boxShadow: [
              "0 0 20px rgba(99, 102, 241, 0.3)",
              "0 0 40px rgba(99, 102, 241, 0.5)",
              "0 0 20px rgba(99, 102, 241, 0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

const StoryCard = ({ title, content, icon: Icon, index, gradient }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 backdrop-blur-sm cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, scale: 1.02 }}>
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20"
        style={{ background: gradient }}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}>
            <Icon className="text-xl text-brand-300" />
          </motion.div>
          <h4 className="text-lg font-bold text-white">{title}</h4>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{content}</p>
      </div>

      {/* Corner Decoration */}
      <motion.div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: gradient }}
      />
    </motion.div>
  );
};

const About = ({ heroSectionDetails, aboutMe }) => {
  const storyCards = [
    {
      title: "My Journey",
      content: personal.summary,
      icon: FiHeart,
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
    {
      title: "Design Philosophy",
      content:
        "Human-centered decisions, inclusive interactions, and purposeful visuals that make interfaces memorable and accessible.",
      icon: FiTarget,
      gradient: "linear-gradient(135deg, #38bdf8, #06b6d4)",
    },
    {
      title: "Motion & Animation",
      content:
        "Micro-interactions, tactile motion language, and cinematic storytelling that flows with intent and delight.",
      icon: FiZap,
      gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    },
    {
      title: "Code & Performance",
      content:
        "Ship resilient architectures, lighthouse-friendly experiences, and scalable code ecosystems that grow with teams.",
      icon: FiCode,
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
  ];

  const quickFacts = [
    {
      label: personal.highlights[0].label,
      value: personal.highlights[0].value,
    },
    {
      label: personal.highlights[1].label,
      value: personal.highlights[1].value,
    },
    {
      label: personal.highlights[2].label,
      value: personal.highlights[2].value,
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <SectionHeading
          eyebrow="About Me"
          title="Building interfaces with clarity, craft, and rhythm."
          subtitle="Design-led development focusing on motion-rich storytelling, component scalability, and product velocity."
        />

        {/* Main Content - Split Layout */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr,1fr]">
          {/* Left Column - Photo & Quick Facts */}
          <div className="space-y-8">
            {/* Interactive Photo */}
            <InteractivePhoto imageUrl={heroSectionDetails?.heroImage2?.url || ""} />

            {/* Quick Facts - Horizontal Layout */}
            {/* <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {quickFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4 text-center backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-indigo-500/5 to-sky-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {fact.label}
                  </p>
                  <p className="relative z-10 mt-2 text-xl font-bold text-white">
                    {fact.value}
                  </p>
                </motion.div>
              ))}
            </motion.div> */}
          </div>

          {/* Right Column - Story Cards */}
          <div className="space-y-4">
            {storyCards.map((card, index) => (
              <StoryCard key={card.title} {...card} index={index} />
            ))}
          </div>
        </div>

        {/* Contact Section - Redesigned */}
        <motion.div
          className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-8 backdrop-blur-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <FiCoffee className="text-brand-300" />
            </div>
            <h3 className="text-lg font-bold text-white">Let's Connect</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.a
              href={`mailto:${aboutMe?.email}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand-500/40 hover:bg-brand-500/10"
              whileHover={{ y: -2, scale: 1.02 }}>
              <div className="mb-3 flex items-center gap-2">
                <FiMail className="text-brand-300" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Email
                </p>
              </div>
              <p className="break-words text-sm font-semibold text-white">
                {aboutMe?.email}
              </p>
            </motion.a>
            <motion.a
              href={`tel:${aboutMe?.phone}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand-500/40 hover:bg-brand-500/10"
              whileHover={{ y: -2, scale: 1.02 }}>
              <div className="mb-3 flex items-center gap-2">
                <FiPhone className="text-brand-300" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Phone
                </p>
              </div>
              <p className="text-sm font-semibold text-white">
                {aboutMe?.phone}
              </p>
            </motion.a>
            <motion.div
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-brand-500/40 hover:bg-brand-500/10"
              whileHover={{ y: -2, scale: 1.02 }}>
              <div className="mb-3 flex items-center gap-2">
                <FiMapPin className="text-brand-300" />
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Location
                </p>
              </div>
              <p className="text-sm font-semibold text-white">
                {aboutMe?.location}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute right-0 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10"
            style={{ background: "rgba(99, 102, 241, 0.4)" }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute left-0 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-8"
            style={{ background: "rgba(14, 165, 233, 0.4)" }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 25, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
