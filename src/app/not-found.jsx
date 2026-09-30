"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-[#FAFAF9] px-4 text-center dark:bg-[#0F0F0F]">
      
      {/* Illustration (Animated) */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[#EA580C] via-[#F97316] to-[#F59E0B] text-7xl font-extrabold text-white shadow-lg dark:from-[#1A1A1A] dark:via-[#1F120B] dark:to-[#2A1500] dark:text-[#FF4D00]">
          404
        </div>
        
        {/* Floating Emoji */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="absolute -right-3 -top-3 text-4xl"
        >
          🏋️‍♂️
        </motion.div>
      </motion.div>

      {/* Error Message */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-3 text-3xl font-extrabold tracking-tight text-[#171717] dark:text-white sm:text-4xl"
      >
        Oops! Page Not Found
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-8 max-w-md text-sm leading-relaxed text-[#737373] dark:text-[#A0A0A0] sm:text-base"
      >
        Looks like you took a wrong turn on your fitness journey. The page you are looking for doesn't exist or has been moved.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F97316] to-[#F59E0B] px-8 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/25 transition-colors duration-200 dark:bg-[#FF4D00] dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30 hover:dark:bg-[#FF6A1A]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </motion.div>

      {/* Decorative dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 flex gap-2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#F97316] dark:bg-[#FF4D00]"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#F97316]/50 dark:bg-[#FF4D00]/50"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-[#F97316]/20 dark:bg-[#FF4D00]/20"></div>
      </motion.div>
    </div>
  );
}