"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Sparkles,
  Check,
  Zap,
  ShieldCheck,
  Users,
  Heart,
} from "lucide-react";

const trustSignals = [
  { icon: Check, text: "No credit card required" },
  { icon: Zap, text: "Setup in under 2 minutes" },
  { icon: ShieldCheck, text: "Free forever for small gyms" },
];

const socialProof = [
  { value: 12000, suffix: "+", label: "Active users" },
  { value: 480, suffix: "+", label: "Gyms onboarded" },
  { value: 4.9, suffix: "/5", label: "User rating", decimals: 1 },
];

const contributorAvatars = [
  "bg-gradient-to-br from-pink-500 to-rose-500",
  "bg-gradient-to-br from-orange-500 to-amber-500",
  "bg-gradient-to-br from-violet-500 to-purple-500",
  "bg-gradient-to-br from-cyan-500 to-blue-500",
];

// ─── Animated Counter Component ───
function AnimatedNumber({ value, suffix = "", decimals = 0, duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 40,
    stiffness: 100,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.floor(latest).toLocaleString();
        ref.current.textContent = `${formatted}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [springValue, decimals, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

export default function GetStarted() {
  return (
    <section
      id="get-started"
      className="relative w-full py-24 md:py-32 lg:py-40 scroll-mt-24 bg-[#faf9f6] dark:bg-[#0a0a0a] overflow-hidden transition-colors duration-500"
    >
      {/* Rich gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] lg:w-[1100px] h-[600px] md:h-[900px] lg:h-[1100px] bg-orange-500/[0.08] rounded-full blur-[120px] lg:blur-[140px]" />
        <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Dotted grid with radial mask */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 text-center">
        
        {/* ─── Top Badge ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-orange-200 dark:border-orange-500/20 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-orange-500">
              Get Started
            </span>
          </span>
        </motion.div>

        {/* ─── Headline ─── */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 md:mb-8 px-2 text-neutral-900 dark:text-white"
        >
          Ready to transform
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
            your gym?
          </span>
        </motion.h2>

        {/* ─── Sub-headline ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 md:mb-12 px-4 leading-relaxed"
        >
          Join thousands of gyms, trainers, and members building stronger
          fitness communities — starting today.
        </motion.p>

        {/* ─── Single CTA Button ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mb-10 md:mb-12"
        >
          <a
            href="/register"
            className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 md:px-10 py-4 md:py-4.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm md:text-base font-bold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Start Free Today</span>
            <ArrowRight className="relative w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* ─── Trust Signals ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 md:gap-7 flex-wrap mb-14 md:mb-20"
        >
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <div
                key={signal.text}
                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon
                    className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-500"
                    strokeWidth={3}
                  />
                </div>
                <span className="text-xs md:text-sm font-medium">
                  {signal.text}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ─── Social Proof Strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-orange-500/20 via-neutral-200/50 to-neutral-100/50 dark:from-orange-500/20 dark:via-neutral-800/50 dark:to-neutral-900/50"
        >
          <div className="rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] px-5 md:px-8 py-6 md:py-7">
            
            {/* Animated Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 mb-6">
              {socialProof.map((item, i) => (
                <div
                  key={item.label}
                  className="relative flex flex-col items-center sm:items-start text-center sm:text-left"
                >
                  {i > 0 && (
                    <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-neutral-200 dark:bg-neutral-800" />
                  )}
                  <div className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
                    <AnimatedNumber
                      value={item.value}
                      suffix={item.suffix}
                      decimals={item.decimals || 0}
                    />
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-bold mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Contributors Row */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-center gap-3 flex-wrap">
              <div className="flex -space-x-2">
                {contributorAvatars.map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${gradient} border-2 border-white dark:border-[#0d0d0d] flex items-center justify-center shadow-sm`}
                  >
                    <Users className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] md:text-xs text-neutral-500 font-medium inline-flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                Loved by{" "}
                <span className="font-bold text-neutral-900 dark:text-white">
                  12,000+
                </span>{" "}
                people worldwide
              </span>
            </div>
          </div>
        </motion.div>

        {/* ─── Footer Note ─── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[11px] md:text-xs text-neutral-500 mt-8 md:mt-10 max-w-md mx-auto"
        >
          Backed by an active open-source community.{" "}
          <a
            href="#open-source"
            className="text-orange-500 hover:text-orange-400 font-bold underline-offset-4 hover:underline transition-colors"
          >
            Read our story →
          </a>
        </motion.p>
      </div>
    </section>
  );
}