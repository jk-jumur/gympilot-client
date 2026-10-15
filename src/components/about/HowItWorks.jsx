"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  Settings2,
  Rocket,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Account",
    description:
      "Sign up in under 60 seconds. Pick your role — Member, Trainer, or Admin.",
    bullets: ["60-second signup", "Email verification", "Role-based dashboard"],
  },
  {
    number: "02",
    icon: Settings2,
    title: "Set Up Your Space",
    description:
      "Configure your gym, invite members, and connect payments — all from one dashboard.",
    bullets: ["Bulk member import", "Stripe payment connect", "Class scheduling"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Go Live & Grow",
    description:
      "Start tracking attendance, automating billing, and watching your gym grow.",
    bullets: ["Real-time attendance", "Automated billing", "Retention insights"],
  },
];

const AUTOPLAY_DELAY = 4000;

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // ─── Responsive measurements ───
  const [viewport, setViewport] = useState({
    cardWidth: 400,
    offset: 320,
    stageHeight: 420,
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Mobile
        setViewport({
          cardWidth: w - 64,      
          offset: w - 100,          
          stageHeight: 440,
        });
      } else if (w < 1024) {
        // Tablet
        setViewport({
          cardWidth: 380,
          offset: 340,
          stageHeight: 420,
        });
      } else {
        // Desktop
        setViewport({
          cardWidth: 400,
          offset: 360,
          stageHeight: 400,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ─── Auto Play with Progress ───
  useEffect(() => {
    if (isPaused) return;
    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / AUTOPLAY_DELAY) * 100, 100);
      setProgress(pct);
    }, 50);

    const timeout = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, AUTOPLAY_DELAY);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [activeIndex, isPaused]);

  const goTo = useCallback((index) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const next = () => goTo((activeIndex + 1) % steps.length);
  const prev = () => goTo((activeIndex - 1 + steps.length) % steps.length);

  // ─── Swipe (mobile) ───
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsPaused(true);
  };
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) prev();
    else if (delta < -50) next();
    setTouchStart(null);
    setIsPaused(false);
  };

  return (
    <section className="relative w-full py-20 md:py-28 lg:py-32 bg-[#faf9f6] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white overflow-hidden transition-colors duration-500">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] bg-orange-500/[0.04] rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-orange-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-5 md:mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            How It Works
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-6 px-2">
            From zero to a running gym
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              in three simple steps.
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            No setup fees. No training required. Just sign up and start.
          </p>
        </motion.div>

        {/* ─── Focus Slider ─── */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Cards Stage */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: `${viewport.stageHeight}px` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            
            <AnimatePresence mode="popLayout" initial={false}>
              {steps.map((step, index) => {
                let offset = index - activeIndex;
                if (offset < -1) offset += steps.length;
                if (offset > 1) offset -= steps.length;

                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 1;

                if (!isVisible) return null;

                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={false}
                    animate={{
                      x: offset * viewport.offset,
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.4,
                      zIndex: isActive ? 20 : 10,
                      filter: isActive ? "blur(0px)" : "blur(2px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                    }}
                    className="absolute cursor-pointer"
                    style={{ width: `${viewport.cardWidth}px` }}
                    onClick={() => goTo(index)}
                  >
                    {/* Card Container */}
                    <div
                      className={`relative h-full p-[1px] rounded-2xl md:rounded-3xl transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-b from-orange-500/60 to-orange-500/10 shadow-2xl shadow-orange-500/20"
                          : "bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"
                      }`}
                    >
                      {/* Inner Card */}
                      <div className="relative h-full p-6 sm:p-7 md:p-8 lg:p-9 rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] overflow-hidden">
                        
                        {/* Corner Glow */}
                        {isActive && (
                          <div className="absolute -top-10 -right-10 w-32 md:w-40 h-32 md:h-40 bg-orange-500/20 rounded-full blur-[60px]" />
                        )}

                        {/* Big Number */}
                        <span
                          className={`absolute -top-4 md:-top-6 -right-1 md:-right-2 text-[80px] sm:text-[100px] md:text-[110px] lg:text-[120px] font-black leading-none transition-colors duration-500 select-none ${
                            isActive
                              ? "text-orange-500/[0.12]"
                              : "text-neutral-900/[0.03] dark:text-white/[0.03]"
                          }`}
                        >
                          {step.number}
                        </span>

                        {/* Top Row: Icon + Status */}
                        <div className="relative flex items-center justify-between mb-5 md:mb-7">
                          <div
                            className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 border ${
                              isActive
                                ? "bg-orange-500/10 border-orange-500/50"
                                : "bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${
                                isActive ? "text-orange-500" : "text-neutral-500"
                              }`}
                            />
                          </div>

                          {/* Countdown / Paused Badge */}
                          {isActive && !isPaused && (
                            <div className="text-right">
                              <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-0.5 md:mb-1">
                                Next in
                              </div>
                              <div className="text-[11px] md:text-xs font-mono text-orange-500">
                                {Math.max(
                                  0,
                                  ((AUTOPLAY_DELAY - (progress / 100) * AUTOPLAY_DELAY) / 1000).toFixed(1)
                                )}
                                s
                              </div>
                            </div>
                          )}
                          {isActive && isPaused && (
                            <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-orange-500 font-bold bg-orange-500/10 px-2 md:px-3 py-1 rounded-full border border-orange-500/30">
                              Paused
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3
                          className={`relative text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-3 transition-colors duration-300 ${
                            isActive ? "text-orange-500" : "text-neutral-900 dark:text-white"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="relative text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 md:mb-6">
                          {step.description}
                        </p>

                        {/* Bullets */}
                        <ul className="relative space-y-2 md:space-y-2.5 pt-4 md:pt-5 border-t border-neutral-200 dark:border-neutral-800/80">
                          {step.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-center gap-2.5 md:gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>

                        {/* Progress Bar */}
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-[width] duration-100 ease-linear shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                              style={{ width: `${isPaused ? 0 : progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ─── Navigation Controls ─── */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">
            <button
              onClick={prev}
              aria-label="Previous step"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 px-3 md:px-4">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i
                      ? "w-7 md:w-8 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]"
                      : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next step"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center active:scale-95"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Mobile swipe hint */}
          <p className="md:hidden text-center mt-4 text-[11px] text-neutral-500 dark:text-neutral-500 font-medium tracking-wide">
            ← Swipe to navigate →
          </p>
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14 md:mt-20"
        >
          <p className="text-neutral-500 text-xs sm:text-sm font-medium">
            Ready to start?{" "}
            <a
              href="/register"
              className="text-orange-500 hover:text-orange-400 font-bold underline-offset-4 hover:underline transition-colors"
            >
              Create your free account →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}