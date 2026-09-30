"use client";

import {
  HiOutlineCheckCircle,
  HiOutlineSparkles,
} from "react-icons/hi2";

const BENEFITS = [
  {
    title: "Expert Coaching",
    description: "Learn from certified trainers with years of experience.",
  },
  {
    title: "Small Groups",
    description: "Personalized attention in every session.",
  },
  {
    title: "Progress Tracking",
    description: "Monitor your fitness journey via dashboard.",
  },
  {
    title: "Community Support",
    description: "Join a vibrant fitness community.",
  },
];

export default function ClassAbout({ cls }) {
  return (
    <div className="space-y-6">

      {/* About Section */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-stone-100 dark:border-stone-800/50">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
            About this class
          </h2>
        </div>

        {/* Description */}
        <div className="px-6 sm:px-8 py-6">
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
            {cls.description || "No description available for this class."}
          </p>
        </div>
      </section>

      {/* What You'll Gain */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4 border-b border-stone-100 dark:border-stone-800/50">
          <div className="flex items-center gap-2">
            <HiOutlineSparkles className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
              What you'll gain
            </h2>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 gap-px bg-stone-100 dark:bg-stone-800/50">
          {BENEFITS.map((benefit, i) => (
            <div
              key={benefit.title}
              className="bg-white dark:bg-stone-900 p-5 sm:p-6 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainer Mini Card */}
      <section className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">
          Your Trainer
        </p>

        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xl font-black shrink-0">
            {cls.trainer?.charAt(0) || "T"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-extrabold text-stone-900 dark:text-white truncate">
              {cls.trainer}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Certified {cls.category} Trainer
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}