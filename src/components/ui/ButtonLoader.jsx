"use client";

import { motion } from "motion/react";

export default function ButtonLoader({ text = "Loading", color = "white" }) {
  const colors = {
    white: "bg-white",
    orange: "bg-orange-500",
    stone: "bg-stone-400",
  };

  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`h-1.5 w-1.5 ${colors[color]} rounded-full`}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
      <span>{text}...</span>
    </span>
  );
}