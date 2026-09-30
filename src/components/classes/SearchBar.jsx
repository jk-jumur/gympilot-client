"use client";

import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search classes by name..."
        aria-label="Search classes"
        className="w-full pl-12 pr-12 py-4 rounded-2xl
          bg-white dark:bg-stone-900
          border border-stone-200 dark:border-stone-800
          hover:border-stone-300 dark:hover:border-stone-700
          focus:border-orange-500 dark:focus:border-orange-500
          focus:ring-4 focus:ring-orange-500/10 dark:focus:ring-orange-500/20
          text-sm text-stone-900 dark:text-white
          placeholder-stone-400 dark:placeholder-stone-500
          outline-none transition-all"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full
            text-stone-400 hover:text-stone-600 dark:hover:text-stone-200
            hover:bg-stone-100 dark:hover:bg-stone-800
            transition-colors"
        >
          <HiOutlineXMark className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}