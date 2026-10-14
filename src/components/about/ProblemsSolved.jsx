"use client";

import { motion } from "framer-motion";
import {
  HiOutlineXMark,
  HiOutlineCheck,
  HiOutlineArrowLongRight,
  HiOutlineSparkles,
} from "react-icons/hi2";

const PROBLEMS = [
  {
    number: "01",
    category: "Fragmentation",
    problem: "Fitness tools are scattered everywhere",
    problemDetail:
      "Classes in one app. Payments in another. Tracking somewhere else. No single source of truth.",
    solution: "One unified platform",
    solutionDetail:
      "Classes, bookings, payments, forum, and progress — all in GymPilot.",
    metric: "6 tools → 1",
    accent: "from-orange-500 to-amber-500",
  },
  {
    number: "02",
    category: "Trust",
    problem: "Anyone can claim to be a trainer",
    problemDetail:
      "No verification. No credentials. No accountability. You never know who's teaching.",
    solution: "Verified trainers only",
    solutionDetail:
      "Every trainer goes through admin approval with credentials reviewed.",
    metric: "100% verified",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    category: "Friction",
    problem: "Booking a class takes 5+ clicks",
    problemDetail:
      "Complex forms. Confusing payment steps. Hidden fees. Most users drop off before finishing.",
    solution: "2-click booking + Stripe",
    solutionDetail:
      "Book with one tap. Pay via Stripe. Transparent pricing. Done.",
    metric: "68% faster",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    number: "04",
    category: "Motivation",
    problem: "Solo workouts lead to skipped sessions",
    problemDetail:
      "No accountability. No community. No reason to keep showing up after week 2.",
    solution: "Built-in community",
    solutionDetail:
      "Active forum, real member interactions, shared progress tracking.",
    metric: "3× retention",
    accent: "from-purple-500 to-indigo-500",
  },
  {
    number: "05",
    category: "Operations",
    problem: "Payment records live everywhere",
    problemDetail:
      "Multiple systems. No central tracking. Manual reconciliation. End-of-month chaos.",
    solution: "Centralized transactions",
    solutionDetail:
      "Every Stripe payment logged, searchable, exportable — one dashboard.",
    metric: "1 dashboard",
    accent: "from-rose-500 to-pink-500",
  },
  {
    number: "06",
    category: "Scale",
    problem: "Admin work is manual and slow",
    problemDetail:
      "Spreadsheets, emails, manual role changes. Impossible to scale past 50 users.",
    solution: "Automated workflows",
    solutionDetail:
      "Approve trainers, moderate classes, block users — one click each.",
    metric: "10× capacity",
    accent: "from-indigo-500 to-blue-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ProblemsSolved() {
  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-zinc-950 transition-colors overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-rose-500/[0.05] rounded-full filter blur-[140px]" />
        <div className="absolute bottom-1/4 -right-32 w-[600px] h-[600px] bg-emerald-500/[0.05] rounded-full filter blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ═══ Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-rose-600 dark:text-rose-400">
              The Problem
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.04em] text-gray-950 dark:text-white leading-[1.02] mb-6">
            Fitness apps are broken.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              We rebuilt them.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Six real problems we heard from members and trainers — and how
            GymPilot solves each one.
          </p>
        </motion.div>

        {/* ═══ Problems List ═══ */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          {PROBLEMS.map((item_, idx) => (
            <motion.div
              key={item_.number}
              variants={item}
              className="group relative"
            >
              {/* Number background */}
              <span className="absolute -top-4 -left-2 sm:-left-4 text-[5rem] sm:text-[7rem] font-black text-gray-100 dark:text-zinc-900/60 leading-none pointer-events-none select-none tabular-nums">
                {item_.number}
              </span>

              <div className="relative grid grid-cols-1 lg:grid-cols-11 gap-3 lg:gap-5 items-stretch pt-6">
                {/* PROBLEM CARD */}
                <div className="lg:col-span-5 rounded-[1.75rem] overflow-hidden bg-white dark:bg-zinc-900 border border-rose-100 dark:border-rose-900/30 shadow-sm hover:shadow-xl hover:border-rose-200 dark:hover:border-rose-800/50 transition-all duration-300">
                  {/* Top accent line */}
                  <div className="h-1 bg-gradient-to-r from-rose-500 to-rose-400" />

                  <div className="p-6 sm:p-7">
                    {/* Category badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 mb-4">
                      <HiOutlineXMark className="h-3 w-3 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-600 dark:text-rose-400">
                        {item_.category}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white leading-[1.3] mb-3">
                      {item_.problem}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                      {item_.problemDetail}
                    </p>
                  </div>
                </div>

                {/* CONNECTOR — desktop only */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Connector line */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-rose-300 via-orange-400 to-emerald-300 dark:from-rose-900 dark:via-orange-600 dark:to-emerald-900" />
                    {/* Arrow circle */}
                    <div className="relative inline-flex items-center justify-center h-9 w-9 rounded-full bg-white dark:bg-zinc-950 border-2 border-orange-400 dark:border-orange-500 shadow-lg shadow-orange-500/20">
                      <HiOutlineArrowLongRight className="h-4 w-4 text-orange-500" />
                    </div>
                  </div>
                </div>

                {/* SOLUTION CARD */}
                <div className="lg:col-span-5 rounded-[1.75rem] overflow-hidden bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-emerald-900/30 shadow-sm hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300">
                  {/* Top accent line */}
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />

                  <div className="p-6 sm:p-7">
                    {/* Category badge + Metric */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                        <HiOutlineCheck className="h-3 w-3 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">
                          GymPilot Fix
                        </span>
                      </div>

                      {/* Metric badge */}
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20">
                        <HiOutlineSparkles className="h-3 w-3 text-orange-500" />
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 tabular-nums">
                          {item_.metric}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-950 dark:text-white leading-[1.3] mb-3">
                      {item_.solution}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-zinc-400 leading-relaxed">
                      {item_.solutionDetail}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Bottom CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-medium text-gray-600 dark:text-zinc-400">
              Every feature on GymPilot exists to solve a real problem
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}