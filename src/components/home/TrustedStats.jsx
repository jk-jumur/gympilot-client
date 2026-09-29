"use client";

import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiOutlineStar,
  HiOutlineHeart,
} from "react-icons/hi2";

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  { id: 1, icon: HiOutlineUsers, value: 12000, suffix: "+", label: "Active Members", color: "from-orange-500 to-amber-500" },
  { id: 2, icon: HiOutlineAcademicCap, value: 320, suffix: "+", label: "Expert Classes", color: "from-rose-500 to-pink-500" },
  { id: 3, icon: HiOutlineStar, value: 98, suffix: "%", label: "Satisfaction Rate", color: "from-emerald-500 to-teal-500" },
  { id: 4, icon: HiOutlineHeart, value: 85, suffix: "K", label: "Bookings Done", color: "from-violet-500 to-purple-500" },
];

export default function TrustedStats() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden
      bg-stone-100 dark:bg-black transition-colors duration-500">

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Decorative radial — light: subtle, dark: stronger */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.15), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
            By The Numbers
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white mt-2">
            Numbers That{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Speak For Themselves
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-5 sm:p-6 rounded-2xl
                  bg-white dark:bg-white/[0.03]
                  border border-stone-200 dark:border-white/10
                  hover:border-orange-500/40 dark:hover:border-orange-500/40
                  hover:bg-white dark:hover:bg-white/[0.06]
                  shadow-sm dark:shadow-none
                  hover:shadow-md dark:hover:shadow-none
                  transition-all duration-500"
              >
                {/* Icon */}
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white leading-none tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mt-2">
                  {stat.label}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}