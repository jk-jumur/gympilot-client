"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineUserGroup,
  HiOutlineBolt,
  HiOutlineTrophy,
  HiOutlineChevronLeft,
  HiOutlineClock,
} from "react-icons/hi2";

export default function ClassHero({ cls }) {
  const isTopRated = cls.bookingsCount > 200;

  return (
    <section className="relative h-[40vh] sm:h-[45vh] lg:h-[50vh] min-h-[380px] max-h-[520px] overflow-hidden">

      {/* ⭐ Background Image */}
      <Image
        src={cls.image}
        alt={cls.name}
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover"
      />

      {/* ⭐ Subtle overlay — image visible, text readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

      {/* ⭐ Back Button — Top Left */}
      <Link
        href="/classes"
        className="absolute top-6 left-4 sm:left-6 lg:left-8 z-10
          inline-flex items-center gap-1.5 px-3 py-2 rounded-xl
          bg-white/95 dark:bg-stone-900/95 backdrop-blur-md
          text-stone-800 dark:text-stone-100 text-xs font-bold
          hover:bg-white dark:hover:bg-stone-900
          hover:scale-105 active:scale-95
          shadow-lg transition-all duration-300"
      >
        <HiOutlineChevronLeft className="h-3.5 w-3.5" />
        Back
      </Link>

      {/* ⭐ Content — Bottom Left */}
      <div className="absolute inset-0 flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-10 w-full">

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="light">{cls.category}</Badge>

            {cls.difficulty && (
              <Badge variant="orange" icon={<HiOutlineBolt className="h-3 w-3" />}>
                {cls.difficulty}
              </Badge>
            )}

            {isTopRated && (
              <Badge variant="amber" icon={<HiOutlineTrophy className="h-3 w-3" />}>
                Top Rated
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl">
            {cls.name}
          </h1>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-white/90">
            <span>
              by <span className="font-bold text-white">{cls.trainer}</span>
            </span>

            {cls.bookingsCount !== undefined && (
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineUserGroup className="h-4 w-4" />
                <span className="font-bold text-white">{cls.bookingsCount}</span>
                <span className="text-white/70">enrolled</span>
              </span>
            )}

            {cls.duration && (
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineClock className="h-4 w-4" />
                <span className="font-bold text-white">{cls.duration}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ⭐ Price Badge — Bottom Right (Demo style) */}
      <div className="absolute bottom-8 sm:bottom-10 right-4 sm:right-6 lg:right-8">
        <div className="inline-flex flex-col items-end px-5 py-3 rounded-2xl
          bg-white/95 dark:bg-stone-900/95 backdrop-blur-md
          border border-white/30 shadow-2xl">

          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">
            Price
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
              ${cls.price}
            </span>
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
              /session
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ children, variant = "light", icon }) {
  const variants = {
    light:
      "bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-800 dark:text-stone-100",
    orange: "bg-orange-500 text-white shadow-lg shadow-orange-500/30",
    amber: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {icon}
      {children}
    </span>
  );
}