"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineBolt,
} from "react-icons/hi2";

// 🔥 Featured Classes 
const FEATURED_CLASSES = [
  {
    id: 1,
    name: "Sunrise Vinyasa Flow",
    trainer: "Sophia Martinez",
    category: "Yoga",
    price: 28,
    duration: "60 min",
    bookingsCount: 312,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
  {
    id: 2,
    name: "Combat Cardio Blast",
    trainer: "Marcus Chen",
    category: "Cardio",
    price: 32,
    duration: "45 min",
    bookingsCount: 267,
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=80",
  },
  {
    id: 3,
    name: "Barbell Basics",
    trainer: "Ethan Brooks",
    category: "Weights",
    price: 38,
    duration: "75 min",
    bookingsCount: 189,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80",
  },
  {
    id: 4,
    name: "Bollywood Dance Fit",
    trainer: "Priya Sharma",
    category: "Dance",
    price: 22,
    duration: "50 min",
    bookingsCount: 145,
    image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=800&q=80",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturedClasses() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden
      bg-gradient-to-b from-orange-50 via-amber-50/60 to-white
      dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">

      <div className="pointer-events-none absolute top-20 -left-32 h-72 w-72 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-32 h-72 w-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-orange-500/15 dark:bg-orange-500/20
              border border-orange-500/30 dark:border-orange-500/40
              text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HiOutlineBolt className="h-3 w-3" />
              Top Rated
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              Most Booked{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Classes
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 max-w-xl">
              The top 4 classes loved by our community — ranked by total bookings.
            </p>
          </div>

          <Link
            href="/classes"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
              bg-white dark:bg-stone-900
              text-stone-800 dark:text-stone-100
              border border-stone-200 dark:border-stone-800
              hover:border-orange-500 hover:text-orange-500
              shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            Browse All Classes
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {FEATURED_CLASSES.map((cls, index) => (
            <motion.div
              key={cls.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl overflow-hidden
                bg-white dark:bg-stone-900
                border border-stone-200 dark:border-stone-800
                hover:border-orange-500/50
                shadow-md hover:shadow-2xl hover:shadow-orange-500/20
                transition-all duration-300 flex flex-col"
            >
              {/* Rank badge */}
              <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full
                bg-black/40 backdrop-blur-sm text-white text-[10px] font-black tracking-wider">
                #{String(index + 1).padStart(2, "0")}
              </span>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                <Image
                  src={cls.image}
                  alt={cls.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full
                  bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm
                  text-[10px] font-bold uppercase tracking-wider
                  text-stone-800 dark:text-stone-100">
                  {cls.category}
                </span>

                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                  bg-orange-500 text-white text-[10px] font-bold shadow-lg">
                  <HiOutlineUserGroup className="h-3 w-3" />
                  {cls.bookingsCount}
                </span>
              </div>

              {/* ═══ Content ═══ */}
              <div className="p-4 flex flex-col flex-1">

                <div className="h-6 mb-2" />

                {/* Class Name — min-h matches forum title */}
                <h3 className="text-sm font-extrabold text-stone-900 dark:text-white leading-snug line-clamp-2 min-h-[2.5rem]
                  group-hover:text-orange-500 transition-colors">
                  {cls.name}
                </h3>

                {/* Trainer Name */}
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 truncate">
                  by <span className="font-bold text-stone-700 dark:text-stone-300">{cls.trainer}</span>
                </p>

            
                <div className="mt-2 min-h-[2.5rem]" />

                {/* Spacer */}
                <div className="flex-1" />

                {/* Meta row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800">
                  <span className="inline-flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <HiOutlineClock className="h-3.5 w-3.5" />
                    {cls.duration}
                  </span>
                  <span className="text-base font-black text-orange-500">
                    ${cls.price}
                  </span>
                </div>

                {/* Button */}
                <Link
                  href={`/classes/${cls.id}`}
                  className="group/btn mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold
                    bg-orange-500
                    text-white
                    hover:bg-orange-600
                    shadow-md shadow-orange-500/20 hover:shadow-orange-500/40
                    transition-all duration-300"
                >
                  View Details
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}