"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineArrowRight,
  HiOutlineBolt,
} from "react-icons/hi2";

const CATEGORIES = [
  {
    id: 1,
    name: "Yoga",
    count: 42,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    name: "Cardio",
    count: 38,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    name: "Strength",
    count: 51,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    name: "Dance",
    count: 24,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&q=80",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 5,
    name: "Boxing",
    count: 19,
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80",
    span: "lg:col-span-1 lg:row-span-1",
  },
];

export default function ExploreCategories() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-white dark:bg-stone-950">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-orange-500/15 dark:bg-orange-500/20
              border border-orange-500/30 dark:border-orange-500/40
              text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HiOutlineBolt className="h-3 w-3" />
              Find Your Fit
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              Explore by{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 max-w-xl">
              From mindful yoga to high-intensity boxing — find the workout that fits you.
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
            See All Categories
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Categories Grid — Bento Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:auto-rows-[180px]">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer ${cat.span || ""}`}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                  {cat.count} Classes
                </span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mt-1">
                  {cat.name}
                </h3>

                {/* Arrow on hover */}
                <div className="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                    Explore
                  </span>
                  <HiOutlineArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}