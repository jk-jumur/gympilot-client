"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function ClassCard({ cls }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -5 }}
      className="
        group flex h-full flex-col overflow-hidden
        rounded-2xl
        border border-stone-200
        bg-white
        shadow-sm
        transition-all duration-300
        hover:border-orange-400
        hover:shadow-xl hover:shadow-orange-500/10
        dark:border-stone-800
        dark:bg-stone-900
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative aspect-[16/9] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={cls.image}
          alt={cls.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* Category */}
        <span
          className="
            absolute left-3 top-3
            rounded-lg
            bg-white/95
            px-2.5 py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-stone-700
            shadow-sm
            backdrop-blur-sm
            dark:bg-stone-900/95
            dark:text-stone-200
          "
        >
          {cls.category}
        </span>

        {/* Price */}
        <span
          className="
            absolute right-3 top-3
            rounded-lg
            bg-orange-500
            px-2.5 py-1
            text-xs
            font-extrabold
            text-white
            shadow-md
          "
        >
          ${cls.price}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3
          className="
            line-clamp-2
            min-h-[40px]
            text-base
            font-extrabold
            leading-5
            text-stone-900
            transition-colors
            group-hover:text-orange-500
            dark:text-white
          "
        >
          {cls.name}
        </h3>

        {/* Trainer */}
        <p className="mt-1 text-xs text-stone-400">
          by{" "}
          <span className="font-semibold text-stone-600 dark:text-stone-300">
            {cls.trainer}
          </span>
        </p>

        {/* ================= META ================= */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Difficulty */}
          {cls.difficulty && (
            <span
              className={`
                rounded-full px-2.5 py-1
                text-[10px] font-bold
                ${
                  cls.difficulty === "Beginner"
                    ? "bg-green-50 text-green-600"
                    : cls.difficulty === "Intermediate"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-500"
                }
              `}
            >
              {cls.difficulty}
            </span>
          )}

          {/* Duration */}
          {cls.duration && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-400">
              <HiOutlineClock className="h-3.5 w-3.5 text-orange-500" />
              {cls.duration}
            </span>
          )}

          {/* Students */}
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-400">
            <HiOutlineUserGroup className="h-3.5 w-3.5 text-orange-500" />
            {cls.enrolledStudents ?? cls.bookingsCount ?? 0}
          </span>
        </div>

        {/* Description */}
        {cls.description && (
          <p
            className="
              mt-3
              line-clamp-2
              text-xs
              leading-5
              text-stone-500
              dark:text-stone-400
            "
          >
            {cls.description}
          </p>
        )}

        {/* Schedule */}
        {cls.schedule && (
          <div className="mt-3 flex items-center gap-2">
            <HiOutlineCalendarDays className="h-4 w-4 shrink-0 text-orange-500" />

            <p className="line-clamp-1 text-[11px] font-medium text-stone-500 dark:text-stone-400">
              {cls.schedule}
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* ================= BOTTOM ================= */}
        <div
          className="
            mt-4
            flex items-center justify-between
            border-t border-stone-100
            pt-3
            dark:border-stone-800
          "
        >
          {/* Price */}
          <div>
            <span className="text-lg font-black text-orange-500">
              ${cls.price}
            </span>

            <span className="ml-1 text-[10px] text-stone-400">
              / session
            </span>
          </div>

          {/* Details */}
          <Link
            href={`/classes/${cls._id}`}
            className="
              group/btn
              inline-flex items-center gap-1.5
              rounded-lg
              bg-orange-500
              px-3 py-2
              text-[10px]
              font-bold
              text-white
              shadow-sm
              shadow-orange-500/20
              transition-all duration-200
              hover:bg-orange-600
              hover:shadow-orange-500/30
            "
          >
            View Details

            <HiOutlineArrowRight
              className="
                h-3.5 w-3.5
                transition-transform
                group-hover/btn:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}