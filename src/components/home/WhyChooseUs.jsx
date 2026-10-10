"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineSparkles,
  HiOutlineCalendarDays,
  HiOutlineShieldCheck,
  HiOutlineUsers,
  HiOutlineBolt,
  HiOutlineArrowRight,
  HiOutlineFire,
} from "react-icons/hi2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SMALL_CARDS = [
  {
    icon: HiOutlineShieldCheck,
    iconBg: "from-emerald-500 to-teal-500",
    iconShadow: "shadow-emerald-500/25",
    stat: "100%",
    title: "Secure Payments",
    description: "Stripe-encrypted",
  },
  {
    icon: HiOutlineBolt,
    iconBg: "from-blue-500 to-cyan-500",
    iconShadow: "shadow-blue-500/25",
    stat: "24/7",
    title: "Instant Access",
    description: "Always online",
  },
  {
    icon: HiOutlineUsers,
    iconBg: "from-purple-500 to-pink-500",
    iconShadow: "shadow-purple-500/25",
    stat: "4.9",
    title: "Member Rating",
    description: "12K+ reviews",
  },
  {
    icon: HiOutlineCalendarDays,
    iconBg: "from-indigo-500 to-blue-500",
    iconShadow: "shadow-indigo-500/25",
    stat: "100+",
    title: "Class Times",
    description: "Flexible schedule",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-[#FAF7F2] dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full filter blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full filter blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Why GymPilot
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-5">
            The Smartest Way to{" "}
            <span className="text-orange-500">Stay Fit</span>
          </h2>

          <p className="text-gray-600 dark:text-zinc-400 text-base sm:text-lg leading-relaxed">
            Everything you need to train smarter, stay consistent, and
            actually reach your goals.
          </p>
        </motion.div>

        {/* ═══ Bento Grid ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {/* ═══════ HERO CARD — col-span-2 lg:row-span-2 ═══════ */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="brand-orange-card group relative sm:col-span-2 lg:row-span-2 rounded-[2rem] overflow-hidden p-7 sm:p-9 text-white
              shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50
              transition-all duration-500
              flex flex-col justify-between min-h-[300px] lg:min-h-0"
          >
            {/* Glow orbs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full filter blur-3xl group-hover:scale-125 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full filter blur-3xl" />

            {/* Top content */}
            <div className="relative">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-7 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <HiOutlineSparkles className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] mb-4 text-white">
                Expert-Led
                <br />
                Training
              </h3>

              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md">
                50+ certified trainers with real coaching experience across
                every fitness discipline.
              </p>
            </div>

            {/* Bottom section */}
            <div className="relative mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/60"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-none">
                    12,000+
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mt-1">
                    Members
                  </p>
                </div>
              </div>

              <div className="h-11 w-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-orange-500 group-hover:rotate-12 transition-all duration-300">
                <HiOutlineArrowRight className="h-5 w-5" />
              </div>
            </div>
          </motion.div>

          {/* ═══════ 4 SMALL STAT CARDS ═══════ */}
          {SMALL_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative rounded-[2rem] p-6
                  bg-white dark:bg-zinc-900
                  border border-gray-200/60 dark:border-zinc-800
                  shadow-sm hover:shadow-xl
                  hover:border-orange-200 dark:hover:border-zinc-700
                  transition-all duration-300
                  flex flex-col justify-between
                  min-h-[190px]"
              >
                <div>
                  <div className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br ${card.iconBg} shadow-lg ${card.iconShadow} mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <p className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-1">
                    {card.stat}
                  </p>

                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {card.title}
                  </p>
                </div>

                <p className="text-xs text-gray-500 dark:text-zinc-500 leading-relaxed mt-3">
                  {card.description}
                </p>
              </motion.div>
            );
          })}

          {/* ═══════ CTA CARD — spans all cols ═══════ */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className="group relative sm:col-span-2 lg:col-span-4 rounded-[2rem] overflow-hidden p-7 sm:p-9
              bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800
              text-white shadow-2xl hover:shadow-orange-500/20
              transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl group-hover:scale-125 transition-transform duration-700" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <div className="shrink-0 inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-2xl shadow-orange-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <HiOutlineFire className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-black mb-1 text-white leading-tight">
                  Start Your Transformation Today
                </h3>
                <p className="text-white/70 text-xs sm:text-sm">
                  Join 12,000+ members achieving their fitness goals.
                </p>
              </div>

              <Link
                href="/classes"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 transition-all duration-300"
              >
                Explore Classes
                <HiOutlineArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}