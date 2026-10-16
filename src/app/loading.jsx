"use client";

import { useState, useEffect } from "react";

export default function Loading() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Force loader to show for at least 1 second
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] dark:bg-zinc-950">
      
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 dark:opacity-30">
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-transparent blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[140px]" />
      </div>

      {/* Main loader */}
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Spinner + Logo */}
        <div className="relative h-20 w-20 sm:h-24 sm:w-24">
          
          {/* Outer spinning ring */}
          <div 
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-orange-200/50 border-t-orange-500 dark:border-orange-500/20 dark:border-t-orange-500" 
            style={{ animationDuration: "1.4s" }}
          />

          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/40 sm:h-12 sm:w-12">
              
              {/* Ping ring */}
              <span 
                className="absolute inset-0 animate-ping rounded-xl bg-orange-500/40" 
                style={{ animationDuration: "2s" }}
              />
              
              {/* Lightning icon */}
              <svg
                className="relative h-5 w-5 text-white sm:h-6 sm:w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 2L4 14h7.5L10.5 22L20 10h-7.5L13.5 2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2">
          
          {/* Brand name */}
          <div className="flex items-center gap-1">
            <span className="text-base font-black tracking-tight sm:text-lg">
              <span className="text-gray-900 dark:text-white">Gym</span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Pilot
              </span>
            </span>
          </div>
          
          {/* Loading text with dots */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-zinc-500">
              Loading
            </span>
            <span className="flex gap-0.5">
              <span 
                className="h-1 w-1 animate-bounce rounded-full bg-orange-500" 
                style={{ animationDelay: "0ms" }} 
              />
              <span 
                className="h-1 w-1 animate-bounce rounded-full bg-orange-500" 
                style={{ animationDelay: "150ms" }} 
              />
              <span 
                className="h-1 w-1 animate-bounce rounded-full bg-orange-500" 
                style={{ animationDelay: "300ms" }} 
              />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}