"use client";

import { motion } from "motion/react";

// ═══════════════════════════════════════════════════════
// Variant 1: Dots Spinner (Apple/Google style)
// ═══════════════════════════════════════════════════════
export function DotsSpinner({ size = "md", color = "orange" }) {
  const sizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5",
  };

  const colors = {
    orange: "bg-orange-500",
    white: "bg-white",
    stone: "bg-stone-400",
  };

  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`${sizes[size]} ${colors[color]} rounded-full`}
          animate={{
            y: [0, -8, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Variant 2: Ring Spinner (Modern circular)
// ═══════════════════════════════════════════════════════
export function RingSpinner({ size = "md", color = "orange" }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  const colors = {
    orange: "border-orange-500/20 border-t-orange-500",
    white: "border-white/20 border-t-white",
    stone: "border-stone-400/20 border-t-stone-400",
  };

  return (
    <motion.div
      className={`${sizes[size]} ${colors[color]} rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ═══════════════════════════════════════════════════════
// Variant 3: Pulse Spinner (Soft pulsing circle)
// ═══════════════════════════════════════════════════════
export function PulseSpinner({ size = "md", color = "orange" }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const colors = {
    orange: "bg-orange-500",
    white: "bg-white",
    stone: "bg-stone-400",
  };

  return (
    <div className={`relative ${sizes[size]}`}>
      <motion.span
        className={`absolute inset-0 ${colors[color]} rounded-full opacity-30`}
        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.span
        className={`absolute inset-0 ${colors[color]} rounded-full opacity-40`}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
      />
      <span className={`absolute inset-0 ${colors[color]} rounded-full`} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// Variant 4: Bars Spinner (Audio wave style)
// ═══════════════════════════════════════════════════════
export function BarsSpinner({ color = "orange" }) {
  const colors = {
    orange: "bg-orange-500",
    white: "bg-white",
    stone: "bg-stone-400",
  };

  return (
    <div className="flex items-end gap-1 h-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className={`w-1 ${colors[color]} rounded-full`}
          animate={{
            height: ["20%", "100%", "20%"],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}