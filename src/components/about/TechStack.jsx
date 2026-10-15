"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Heart,
  ShieldCheck,
  Zap,
  Users,
  Sparkles,
  Lock,
  Server,
  Repeat,
  Check,
} from "lucide-react";

// ─── Story-style terminal (About-appropriate, not dev-focused) ───
const terminalLines = [
  { type: "cmd", text: "gympilot init --gym \"Iron Paradise\"" },
  { type: "info", text: "Preparing your workspace..." },
  { type: "success", text: "✓ Ready in 4.2 seconds" },
  { type: "cmd", text: "gympilot add members" },
  { type: "info", text: "Importing 247 members..." },
  { type: "success", text: "✓ Done. Zero errors." },
  { type: "cmd", text: "gympilot go live" },
  { type: "success", text: "▲ Your gym is online. Welcome aboard." },
];

// ─── Engineering Values (About-appropriate) ───
const values = [
  {
    icon: Heart,
    title: "Crafted with care",
    description:
      "Every screen, animation, and word — designed by people who actually go to gyms.",
    tint: "from-pink-500/10 to-rose-500/5",
    dot: "bg-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Built for trust",
    description:
      "Your member data is encrypted, backed up, and never sold. Ever.",
    tint: "from-emerald-500/10 to-green-500/5",
    dot: "bg-emerald-500",
  },
  {
    icon: Zap,
    title: "Fast where it counts",
    description:
      "Check-ins in under a second. Payments in one tap. No waiting around.",
    tint: "from-violet-500/10 to-purple-500/5",
    dot: "bg-violet-500",
  },
  {
    icon: Users,
    title: "Community over clicks",
    description:
      "We'd rather you log off and go train. The platform should feel invisible.",
    tint: "from-blue-500/10 to-cyan-500/5",
    dot: "bg-blue-500",
  },
];

// ─── Human-readable reliability metrics ───
const reliability = [
  {
    icon: Sparkles,
    label: "Always on",
    value: "99.95% uptime",
  },
  {
    icon: Lock,
    label: "Your data is safe",
    value: "End-to-end encrypted",
  },
  {
    icon: Server,
    label: "Runs everywhere",
    value: "Cloud or self-hosted",
  },
  {
    icon: Repeat,
    label: "Zero lock-in",
    value: "Export anytime",
  },
];

export default function TechStack() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      const reset = setTimeout(() => setVisibleLines(0), 4000);
      return () => clearTimeout(reset);
    }
    const timer = setTimeout(() => setVisibleLines((prev) => prev + 1), 700);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <section
      id="tech-stack"
      className="relative w-full py-20 md:py-28 lg:py-32 scroll-mt-24 bg-[#faf9f6] dark:bg-[#0a0a0a] text-neutral-900 dark:text-white overflow-hidden transition-colors duration-500"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange-500/[0.04] rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-orange-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-5 md:mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            How We Built It
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-6 px-2">
            Built with care,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              from the ground up.
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            Not the flashiest choices — the right ones. Because your gym
            deserves software that lasts.
          </p>
        </motion.div>

        {/* ─── Main Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-10 md:mb-14">
          
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative h-full p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 shadow-xl">
              <div className="relative h-full rounded-[15px] md:rounded-[23px] bg-[#0a0a0a] overflow-hidden">
                
                {/* Terminal Header */}
                <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 border-b border-neutral-800/80 bg-neutral-900/40 backdrop-blur-sm">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="ml-2 md:ml-3 text-[10px] md:text-xs text-neutral-500 font-mono">
                    getting-started — gympilot
                  </span>
                  <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-500 font-mono tracking-wide">
                      live
                    </span>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-4 md:p-6 font-mono text-xs md:text-[13px] min-h-[280px] md:min-h-[320px]">
                  {terminalLines.slice(0, visibleLines).map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-start gap-2 mb-2.5"
                    >
                      {line.type === "cmd" && (
                        <>
                          <span className="text-orange-500 shrink-0 select-none">❯</span>
                          <span className="text-neutral-200 break-all">{line.text}</span>
                        </>
                      )}
                      {line.type === "info" && (
                        <span className="text-neutral-500 pl-5">{line.text}</span>
                      )}
                      {line.type === "success" && (
                        <span className="text-emerald-400 pl-5">{line.text}</span>
                      )}
                    </motion.div>
                  ))}

                  {visibleLines < terminalLines.length && (
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 select-none">❯</span>
                      <span className="w-2 h-4 bg-orange-500 animate-pulse" />
                    </div>
                  )}

                  {visibleLines >= terminalLines.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 mt-5 pt-5 border-t border-neutral-800/80"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-emerald-400 text-[11px] tracking-wide">
                        That's it. You're all set.
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Values (2x2) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4"
          >
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="group relative p-[1px] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-orange-500/50 hover:to-orange-500/10 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
                >
                  <div className="relative h-full p-4 md:p-5 rounded-[15px] bg-white dark:bg-[#0d0d0d] overflow-hidden">
                    <div
                      className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${item.tint} blur-[40px] opacity-70 group-hover:opacity-100 transition-opacity`}
                    />

                    <div className="relative flex items-center justify-between mb-3">
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center group-hover:border-orange-500/40 group-hover:bg-orange-500/10 transition-all">
                        <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                    </div>

                    <h4 className="relative text-xs md:text-sm font-bold text-neutral-900 dark:text-white mb-1.5 tracking-tight leading-tight">
                      {item.title}
                    </h4>

                    <p className="relative text-[11px] md:text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ─── Reliability Strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-r from-orange-500/20 via-neutral-200/50 to-neutral-100/50 dark:from-orange-500/20 dark:via-neutral-800/50 dark:to-neutral-900/50"
        >
          <div className="rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] p-5 md:p-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
              {reliability.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500 font-bold">
                        {item.label}
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-neutral-900 dark:text-white truncate">
                        {item.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ─── Bottom Line ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14 md:mt-20"
        >
          <p className="text-neutral-500 text-xs sm:text-sm font-medium">
            Want to see how we keep it running?{" "}
            <a
              href="#open-source"
              className="text-orange-500 hover:text-orange-400 font-bold underline-offset-4 hover:underline transition-colors"
            >
              Explore our open source →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}