"use client";

import { motion } from "motion/react";
import { HiOutlineEnvelope, HiOutlineCheckCircle } from "react-icons/hi2";

export default function Newsletter() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden
      bg-stone-100 dark:bg-black transition-colors duration-500">

      {/* Dot pattern — inverted for light/dark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Colored orbs — same both themes but subdued */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-72 w-72 rounded-full bg-orange-500/20 dark:bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-rose-500/20 dark:bg-rose-500/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="inline-flex h-14 w-14 rounded-2xl
            bg-gradient-to-br from-orange-500 to-amber-500
            items-center justify-center shadow-2xl shadow-orange-500/30 mb-6">
            <HiOutlineEnvelope className="h-7 w-7 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Stay in the{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Loop
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-4 max-w-xl mx-auto leading-relaxed">
            Get weekly fitness tips, exclusive class announcements, and member-only offers — straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full flex-1 px-5 py-3.5 rounded-xl
                bg-white dark:bg-white/5
                backdrop-blur-sm
                border border-stone-200 dark:border-white/10
                hover:border-stone-300 dark:hover:border-white/20
                focus:border-orange-500 dark:focus:border-orange-500
                text-sm text-stone-900 dark:text-white
                placeholder-stone-400 dark:placeholder-stone-500
                outline-none transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold
                bg-gradient-to-r from-orange-500 to-amber-500
                text-white shadow-lg shadow-orange-500/30
                hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95
                transition-all duration-300 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6">
            {["No spam, ever", "Unsubscribe anytime", "Weekly, not daily"].map((text, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-500 dark:text-stone-500">
                <HiOutlineCheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}