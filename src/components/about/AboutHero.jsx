"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";

const CHAPTERS = [
  {
    number: "01",
    label: "For Members",
    headline: "Discover. Book. Train.",
    description:
      "Browse 320+ classes across every discipline — yoga, cardio, weights, boxing and more. Book in two clicks, pay securely with Stripe.",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1400&q=90",
    alt: "Weight training session",
  },
  {
    number: "02",
    label: "For Trainers",
    headline: "Create. Manage. Grow.",
    description:
      "Apply once, get verified, and start building your classes. Manage students, set your schedule, and post to the community forum.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=1400&q=90",
    alt: "Personal trainer coaching",
  },
  {
    number: "03",
    label: "For Admins",
    headline: "Oversee. Approve. Moderate.",
    description:
      "One dashboard for everything — users, trainers, classes, payments, forum. Keep the entire platform running smoothly.",
    image:
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=90",
    alt: "Modern gym overview",
  },
];

const SLIDE_DURATION = 6000;

export default function AboutHero() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        setActive((prev) => (prev + 1) % CHAPTERS.length);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const handleTabClick = (idx) => {
    setActive(idx);
    setProgress(0);
  };

  const current = CHAPTERS[active];
  const totalChapters = CHAPTERS.length;

  return (
    <section className="relative w-full bg-[#FAF7F2] dark:bg-zinc-950 transition-colors overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════
          MOBILE + TABLET (< 1024px)
          ═══════════════════════════════════════════════════════════ */}
      <div className="lg:hidden w-full">
        {/* IMAGE — 65vh */}
        <div className="relative w-full h-[65vh] min-h-[420px] max-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/50 to-gray-950/20" />
            </motion.div>
          </AnimatePresence>

          {/* Top-right Live badge — subtle */}
          <div className="absolute top-4 right-4 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="text-[9px] font-semibold uppercase tracking-wider text-white/90">
                Live
              </span>
            </div>
          </div>

          {/* Bottom-right chapter indicator */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
              <p className="text-[10px] font-bold text-white/90 tabular-nums">
                {current.number} / 0{totalChapters}
              </p>
            </div>
          </div>

          {/* Text content over image */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-white/60" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80">
                About GymPilot
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl sm:text-5xl font-black text-white leading-none tabular-nums shrink-0">
                    {current.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                    {current.label}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-[1.1] tracking-tight mb-3">
                  {current.headline}
                </h1>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-5 max-w-md">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs — ORANGE Primary (fixed!) */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href="/classes"
                className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/40 active:scale-[0.98] transition-transform sm:flex-1"
              >
                Explore Platform
                <HiArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-bold active:scale-[0.98] transition-transform sm:flex-1"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          DESKTOP (lg+) — 65vh
          ═══════════════════════════════════════════════════════════ */}
      <div className="hidden lg:grid lg:grid-cols-12 lg:h-[65vh] lg:min-h-[520px] lg:max-h-[720px] w-full">
        {/* LEFT — Text */}
        <div className="lg:col-span-5 flex flex-col justify-center px-12 xl:px-16 py-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                About GymPilot
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-[5.5rem] xl:text-[6.5rem] font-black text-gray-950 dark:text-white leading-[0.85] tracking-tighter mb-4 tabular-nums">
                  {current.number}
                </p>

                <p className="text-[11px] font-black uppercase tracking-[0.25em] text-orange-500 mb-4">
                  {current.label}
                </p>

                <h1 className="text-4xl xl:text-5xl font-black text-gray-950 dark:text-white leading-[1.05] tracking-tight mb-4">
                  {current.headline}
                </h1>

                <p className="text-sm xl:text-base text-gray-600 dark:text-zinc-400 leading-relaxed max-w-md mb-7">
                  {current.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Desktop CTAs — ORANGE Primary */}
            <div className="flex items-center gap-3">
              <Link
                href="/classes"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Platform
                <HiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-white text-sm font-bold hover:border-orange-300 dark:hover:border-orange-500/50 transition-all duration-300"
              >
                Join Free
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div className="lg:col-span-7 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                priority
                sizes="60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] dark:from-zinc-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Top-right badge — subtle */}
          <div className="absolute top-5 right-5 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25">
              <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90">
                Live Platform
              </span>
            </div>
          </div>

          {/* Bottom-left metric — 12,000 */}
          <div className="absolute bottom-5 left-5 z-10">
            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-3.5 border border-white/40 dark:border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-zinc-500">
                  Live Now
                </p>
              </div>
              <p className="text-xl font-black text-gray-950 dark:text-white leading-none tabular-nums">
                12,000
              </p>
              <p className="text-[10px] text-gray-500 dark:text-zinc-500 mt-0.5">
                Active members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ TAB NAVIGATION ═══ */}
      <div className="relative w-full border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        {/* Desktop: 3-column */}
        <div className="hidden lg:grid grid-cols-3">
          {CHAPTERS.map((chapter, idx) => (
            <button
              key={chapter.number}
              onClick={() => handleTabClick(idx)}
              className={`group relative px-6 py-5 text-left transition-colors ${
                idx === active ? "bg-orange-500/5" : "hover:bg-gray-50 dark:hover:bg-zinc-900"
              }`}
            >
              {idx === active && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                  />
                </div>
              )}
              <p className={`text-[10px] font-black uppercase tracking-wider mb-1.5 ${
                idx === active ? "text-orange-500" : "text-gray-400 dark:text-zinc-600"
              }`}>
                {chapter.number}
              </p>
              <p className={`text-sm font-bold ${
                idx === active ? "text-gray-950 dark:text-white" : "text-gray-500 dark:text-zinc-500"
              }`}>
                {chapter.label}
              </p>
            </button>
          ))}
        </div>

        {/* Mobile + Tablet: 3-column compact */}
        <div className="grid lg:hidden grid-cols-3">
          {CHAPTERS.map((chapter, idx) => (
            <button
              key={chapter.number}
              onClick={() => handleTabClick(idx)}
              className={`relative px-2 sm:px-4 py-4 text-center transition-colors border-r border-gray-100 dark:border-zinc-800 last:border-r-0 ${
                idx === active ? "bg-orange-500/5" : ""
              }`}
            >
              {idx === active && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-orange-500"
                    style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                  />
                </div>
              )}
              <p className={`text-[10px] font-black tracking-wider mb-1 tabular-nums ${
                idx === active ? "text-orange-500" : "text-gray-400 dark:text-zinc-600"
              }`}>
                {chapter.number}
              </p>
              <p className={`text-[10px] sm:text-xs font-bold truncate ${
                idx === active ? "text-gray-950 dark:text-white" : "text-gray-500 dark:text-zinc-500"
              }`}>
                {chapter.label.replace("For ", "")}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}