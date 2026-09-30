"use client";

import {
  HiOutlineClock,
  HiOutlineSignal,
  HiOutlineFire,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

const STATS = [
  { key: "duration", icon: HiOutlineClock, label: "Duration", color: "orange" },
  { key: "difficulty", icon: HiOutlineSignal, label: "Level", color: "emerald" },
  { key: "category", icon: HiOutlineFire, label: "Category", color: "rose" },
  { key: "schedule", icon: HiOutlineCalendarDays, label: "Schedule", color: "violet" },
];

const COLOR_CLASSES = {
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    ring: "group-hover:ring-orange-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    ring: "group-hover:ring-emerald-500/30",
  },
  rose: {
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    ring: "group-hover:ring-rose-500/30",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-500",
    ring: "group-hover:ring-violet-500/30",
  },
};

export default function ClassInfoGrid({ cls }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        const value = cls[stat.key] || "—";
        const colors = COLOR_CLASSES[stat.color];

        return (
          <div
            key={stat.key}
            className={`group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5
              hover:border-stone-300 dark:hover:border-stone-700
              hover:shadow-lg hover:-translate-y-0.5
              ring-1 ring-transparent ${colors.ring}
              transition-all duration-300`}
          >
            <div
              className={`h-10 w-10 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">
              {stat.label}
            </p>
            <p className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white truncate">
              {value}
            </p>
          </div>
        );
      })}
    </div>
  );
}