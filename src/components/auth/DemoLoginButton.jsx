"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEMO_CREDENTIALS } from "@/config/demoCredentials";
import { toast } from "@/lib/toast";

export default function DemoLoginButton({ onFill }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleFill = (roleKey) => {
    const cred = DEMO_CREDENTIALS[roleKey];
    onFill(cred.email, cred.password);
    setShowOptions(false);

    toast.success(`${cred.role} credentials filled!`, {
      duration: 2000,
      icon: "✅",
    });
  };

  return (
    <div className="relative">
      {/* ═══ Main Trigger Button ═══ */}
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="group flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-orange-300 bg-orange-50/50 px-4 py-3 text-sm font-bold text-orange-600 transition-all hover:border-orange-500 hover:bg-orange-100 dark:border-orange-500/40 dark:bg-orange-500/5 dark:text-orange-400 dark:hover:border-orange-500 dark:hover:bg-orange-500/10"
      >
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>

        <span>Try Demo Account</span>

        <svg
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            showOptions ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ═══ Dropdown Panel ═══ */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-orange-200 bg-white p-2 shadow-2xl shadow-orange-500/10 dark:border-orange-500/20 dark:bg-zinc-950"
          >
            {/* Header label */}
            <div className="mb-1 px-3 pb-2 pt-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                Choose Demo Role
              </p>
            </div>

            {/* Role options */}
            <div className="space-y-1">
              {Object.entries(DEMO_CREDENTIALS).map(([key, cred]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleFill(key)}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all hover:bg-orange-50 dark:hover:bg-orange-500/10"
                >
                  {/* Icon container */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-xl transition-transform duration-200 group-hover:scale-110 dark:from-orange-500/20 dark:to-amber-500/20">
                    {cred.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold text-zinc-900 dark:text-white">
                      {cred.role}
                    </div>
                    <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {cred.description}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="h-4 w-4 shrink-0 text-zinc-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-1 border-t border-zinc-100 px-3 pb-1 pt-2 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                💡 Credentials will auto-fill — just click Sign In
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}