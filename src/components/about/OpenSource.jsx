"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Heart,
  GitFork,
  Users,
  Globe,
  Shield,
  Server,
  Scale,
  Eye,
  ArrowRight,
} from "lucide-react";

const communityStats = [
  { icon: Heart, label: "Supporters", value: "2,847", color: "text-rose-500" },
  { icon: GitFork, label: "Custom builds", value: "412", color: "text-blue-500" },
  { icon: Users, label: "Contributors", value: "63", color: "text-violet-500" },
  { icon: Globe, label: "Countries", value: "28", color: "text-emerald-500" },
];

const values = [
  {
    icon: Eye,
    title: "See every line",
    description:
      "No black boxes. Anyone can inspect how your gym's data is handled — because transparency builds trust.",
  },
  {
    icon: GitFork,
    title: "Make it yours",
    description:
      "Customize the platform, add your branding, adapt it to your gym's workflow. No permission needed.",
  },
  {
    icon: Server,
    title: "Host it yourself",
    description:
      "Run GymPilot on your own infrastructure. Your members' data stays under your roof, always.",
  },
  {
    icon: Scale,
    title: "Free forever",
    description:
      "MIT licensed. Use it commercially, modify it, ship it — no hidden costs, no vendor lock-in.",
  },
];

const closingPoints = [
  { icon: Shield, label: "Own your data" },
  { icon: Code2, label: "Deploy in 10 minutes" },
  { icon: Heart, label: "Community-backed" },
];

export default function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative w-full py-20 md:py-28 lg:py-32 scroll-mt-24 bg-white dark:bg-[#080808] text-neutral-900 dark:text-white overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-1/4 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-orange-500/[0.05] rounded-full blur-[100px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-orange-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
        
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 text-orange-500 text-[10px] md:text-xs font-bold tracking-widest uppercase mb-5 md:mb-6">
            <Code2 className="w-3 h-3" />
            Open Source
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] md:leading-[1.1] tracking-tight mb-4 md:mb-6 px-2">
            Built in public.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Owned by you.
            </span>
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto px-4">
            GymPilot's core is open source — audit it, fork it, or self-host it on your own terms.
          </p>
        </motion.div>

        {/* ─── Repo Card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-10 md:mb-14"
        >
          <div className="relative p-[1px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/30 via-neutral-200/60 to-neutral-100/60 dark:from-orange-500/30 dark:via-neutral-800/60 dark:to-neutral-900/60 shadow-xl">
            <div className="relative rounded-[15px] md:rounded-[23px] bg-white dark:bg-[#0d0d0d] overflow-hidden">
              
              {/* Repo Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 md:p-7 border-b border-neutral-100 dark:border-neutral-800/80">
                <div className="flex items-center gap-3 md:gap-4 min-w-0">
                  {/* ✅ FIXED: Orange gradient icon */}
                  <div className="shrink-0 w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Code2 className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base md:text-xl font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                        gympilot/core
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                        Public
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                        v2.4.1
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-neutral-500 mt-0.5">
                      Community-driven · MIT License · Free forever
                    </p>
                  </div>
                </div>

                {/* ✅ FIXED: Orange gradient button */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs md:text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                >
                  <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:fill-white transition-all" />
                  Support the project
                </a>
              </div>

              {/* Community Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 dark:divide-neutral-800/80 border-b border-neutral-100 dark:border-neutral-800/80">
                {communityStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="flex items-center justify-center sm:justify-start gap-3 py-4 md:py-5 px-4 md:px-5"
                    >
                      <Icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color} shrink-0`} />
                      <div className="min-w-0">
                        <div className="text-base md:text-lg font-bold text-neutral-900 dark:text-white leading-none tracking-tight">
                          {stat.value}
                        </div>
                        <div className="text-[10px] md:text-xs text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Why contribute */}
              <div className="p-5 md:p-7">
                <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                  <div className="flex-1">
                    <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-neutral-500 mb-2">
                      Why people contribute
                    </div>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      Because fitness software should be{" "}
                      <span className="text-orange-500 font-bold">
                        owned by the people who use it
                      </span>{" "}
                      — not rented from a company that can change the rules overnight.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs md:text-sm font-bold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      View repository
                    </a>
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs md:text-sm font-bold hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
                    >
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Values Grid ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10 md:mb-14">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 hover:from-orange-500/60 hover:to-orange-500/10 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1"
              >
                <div className="relative h-full p-5 md:p-6 rounded-[15px] bg-white dark:bg-[#0d0d0d] overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-orange-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h4 className="relative text-sm md:text-base font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                    {item.title}
                  </h4>

                  <p className="relative text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Closing Strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-[1px] rounded-2xl bg-gradient-to-r from-orange-500/30 via-neutral-200/60 to-neutral-100/60 dark:from-orange-500/30 dark:via-neutral-800/60 dark:to-neutral-900/60"
        >
          <div className="rounded-[15px] bg-white dark:bg-[#0d0d0d] px-5 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full md:w-auto">
              {closingPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.label} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-neutral-900 dark:text-white">
                      {point.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-600 underline-offset-4 hover:underline transition-colors shrink-0"
            >
              Deployment guide →
            </a>
          </div>
        </motion.div>

        {/* ─── Bottom Line ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14 md:mt-20"
        >
          <p className="text-neutral-500 text-xs sm:text-sm font-medium">
            Ready to get started?{" "}
            <a
              href="#get-started"
              className="text-orange-500 hover:text-orange-400 font-bold underline-offset-4 hover:underline transition-colors"
            >
              Take the first step →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}