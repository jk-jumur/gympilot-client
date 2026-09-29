"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineArrowRight,
  HiOutlineStar,
  HiOutlineSparkles,
  HiOutlineUsers,
} from "react-icons/hi2";

const TRAINERS = [
  { id: 1, name: "Sophia Martinez", specialty: "Yoga & Mindfulness", image: "https://i.pravatar.cc/300?img=47", rating: 4.9, students: 1240, country: "🇪🇸" },
  { id: 2, name: "Marcus Chen", specialty: "HIIT & Conditioning", image: "https://i.pravatar.cc/300?img=13", rating: 4.8, students: 980, country: "🇨🇳" },
  { id: 3, name: "Ethan Brooks", specialty: "Strength Training", image: "https://i.pravatar.cc/300?img=33", rating: 5.0, students: 1560, country: "🇺🇸" },
  { id: 4, name: "Priya Sharma", specialty: "Dance Fitness", image: "https://i.pravatar.cc/300?img=44", rating: 4.9, students: 890, country: "🇮🇳" },
  { id: 5, name: "Yuki Tanaka", specialty: "Mobility & Recovery", image: "https://i.pravatar.cc/300?img=36", rating: 4.7, students: 720, country: "🇯🇵" },
  { id: 6, name: "Amara Okafor", specialty: "Cardio Kickboxing", image: "https://i.pravatar.cc/300?img=59", rating: 4.9, students: 1150, country: "🇳🇬" },
];

export default function MeetTrainers() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-white dark:bg-stone-950">

      {/* Decorative */}
      <div className="pointer-events-none absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-rose-300/20 dark:bg-rose-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-rose-500/15 dark:bg-rose-500/20
              border border-rose-500/30 dark:border-rose-500/40
              text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HiOutlineSparkles className="h-3 w-3" />
              Meet The Experts
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              Trainers Who{" "}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Change Lives
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 max-w-xl">
              Certified coaches from around the world — each one passionate about your progress.
            </p>
          </div>

          <Link
            href="/classes"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
              bg-white dark:bg-stone-900
              text-stone-800 dark:text-stone-100
              border border-stone-200 dark:border-stone-800
              hover:border-rose-500 hover:text-rose-500
              shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            View All Trainers
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {TRAINERS.map((trainer, i) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col items-center text-center p-5 rounded-3xl
                bg-stone-50/50 dark:bg-stone-900/50
                border border-stone-200 dark:border-stone-800
                hover:border-rose-500/40
                hover:bg-white dark:hover:bg-stone-900
                hover:shadow-xl hover:shadow-rose-500/10
                hover:-translate-y-2
                transition-all duration-500"
            >
              {/* Avatar */}
              <div className="relative mb-4">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                {/* Ring wrapper */}
                <div className="relative h-24 w-24 rounded-full p-[3px] bg-gradient-to-br from-rose-500 via-orange-500 to-amber-400">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      fill
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Country flag */}
                <span className="absolute -bottom-1 -right-1 text-2xl drop-shadow-md">
                  {trainer.country}
                </span>

                {/* Online dot */}
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-950" />
              </div>

              {/* Name */}
              <h3 className="text-sm font-extrabold text-stone-900 dark:text-white leading-tight w-full truncate">
                {trainer.name}
              </h3>

              {/* Specialty */}
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-1 w-full truncate">
                {trainer.specialty}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-stone-200 dark:bg-stone-800 my-3" />

              {/* Stats Row */}
              <div className="w-full flex items-center justify-between text-[10px] font-bold">
                <span className="inline-flex items-center gap-1 text-amber-500">
                  <HiOutlineStar className="h-3 w-3 fill-amber-500" />
                  {trainer.rating}
                </span>
                <span className="inline-flex items-center gap-1 text-stone-500 dark:text-stone-400">
                  <HiOutlineUsers className="h-3 w-3" />
                  {trainer.students}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}