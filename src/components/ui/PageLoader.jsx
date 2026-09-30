"use client";

import { motion } from "motion/react";
import { DotsSpinner } from "./Spinner";

export default function PageLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50 dark:bg-stone-950">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Animated Logo */}
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.5 2L4 14h7.5L10.5 22L20 10h-7.5L13.5 2Z" />
            </svg>
          </div>
        </motion.div>

        {/* Message */}
        <div className="text-center space-y-3">
          <p className="text-sm font-bold text-stone-900 dark:text-white uppercase tracking-widest">
            {message}
          </p>
          <div className="flex justify-center">
            <DotsSpinner size="md" color="orange" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}