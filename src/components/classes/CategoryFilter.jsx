"use client";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div
      role="tablist"
      className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => {
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300
              ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                  : "bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-orange-500/50 hover:text-orange-500"
              }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}