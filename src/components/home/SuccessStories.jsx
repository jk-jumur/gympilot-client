"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { HiOutlineStar, HiOutlineCheckBadge } from "react-icons/hi2";

const STORIES = [
  { id: 1, name: "Rafiq Ahmed", role: "Software Engineer", image: "https://i.pravatar.cc/200?img=12", quote: "GymPilot completely changed how I approach fitness. The trainers are world-class, and the community keeps me accountable.", rating: 5, result: "Lost 18kg in 6 months" },
  { id: 2, name: "Nadia Islam", role: "Marketing Manager", image: "https://i.pravatar.cc/200?img=45", quote: "I've tried many fitness apps, but none matched the personal touch here. Every class feels tailored just for me.", rating: 5, result: "Gained strength & confidence" },
  { id: 3, name: "Daniel Park", role: "Doctor", image: "https://i.pravatar.cc/200?img=18", quote: "As a busy physician, scheduling was my biggest challenge. GymPilot's flexibility made fitness finally fit into my life.", rating: 5, result: "Consistent for 14 months" },
  { id: 4, name: "Sara Martinez", role: "Teacher", image: "https://i.pravatar.cc/200?img=49", quote: "The community here is incredible. I found friends, mentors, and a version of myself I didn't know existed.", rating: 5, result: "Ran first half-marathon" },
];

export default function SuccessStories() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden
      bg-gradient-to-b from-stone-50 via-rose-50/30 to-stone-50
      dark:from-stone-900 dark:via-stone-950 dark:to-stone-900">

      <div className="pointer-events-none absolute top-1/3 left-1/4 h-72 w-72 rounded-full bg-rose-300/20 dark:bg-rose-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-rose-500/15 dark:bg-rose-500/20
            border border-rose-500/30 dark:border-rose-500/40
            text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HiOutlineStar className="h-3 w-3" />
            Success Stories
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Real People.{" "}
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              Real Transformations.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-4 max-w-2xl mx-auto">
            Thousands of members have rewritten their fitness stories. Here are a few.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 sm:p-7 rounded-3xl
                bg-white dark:bg-stone-950
                border border-stone-200 dark:border-stone-800
                hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/10
                hover:-translate-y-1
                transition-all duration-500"
            >
              {/* Big quote mark */}
              <span className="absolute top-4 right-6 text-7xl font-black text-rose-500/8 dark:text-rose-500/15 leading-none select-none pointer-events-none">
                &ldquo;
              </span>

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {Array.from({ length: story.rating }).map((_, idx) => (
                  <HiOutlineStar key={idx} className="h-4 w-4 text-amber-500 fill-amber-500" />
                ))}
                <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 ml-1">
                  5.0
                </span>
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed relative z-10 italic">
                {story.quote}
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-5
                bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                border border-emerald-500/30
                text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {story.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-dashed border-stone-200 dark:border-stone-800">
                <div className="relative h-12 w-12 rounded-full p-[2px] bg-gradient-to-br from-rose-500 to-orange-500">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={48}
                    height={48}
                    className="h-full w-full rounded-full object-cover ring-2 ring-white dark:ring-stone-950"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-stone-900 dark:text-white truncate">
                      {story.name}
                    </p>
                    <HiOutlineCheckBadge className="h-4 w-4 text-orange-500 shrink-0" />
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {story.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}