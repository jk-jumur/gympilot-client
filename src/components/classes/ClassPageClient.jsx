"use client";

import { useState, useEffect } from "react";
import ClassCard from "./ClassCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import ClassSkeleton from "./ClassSkeleton";

const CATEGORIES = ["All", "Yoga", "Cardio", "Weights", "Dance", "Boxing"];
const ITEMS_PER_PAGE = 9;
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ClassPageClient() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // ⭐ Fetch from Express API
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
        });

        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (selectedCategory !== "All") params.set("category", selectedCategory);

        const res = await fetch(`${API_URL}/api/classes?${params.toString()}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (data.success) {
          setClasses(data.data);
          setPagination(data.pagination);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch classes:", err);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // Debounce

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [searchQuery, selectedCategory, currentPage]);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/60 to-white dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="pointer-events-none absolute top-0 -left-32 h-72 w-72 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -right-32 h-72 w-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-orange-500/15 dark:bg-orange-500/20
            border border-orange-500/30 dark:border-orange-500/40
            text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            Browse & Book
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Discover Your{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Next Workout
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-4 max-w-2xl mx-auto">
            From mindful yoga to high-intensity boxing — {pagination.totalItems}+ fitness
            sessions designed for every level, guided by certified coaches.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="mb-8 space-y-4">
          <SearchBar value={searchQuery} onChange={handleSearch} />
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={handleCategory}
          />
        </div>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Showing{" "}
                <span className="font-bold text-stone-900 dark:text-white">
                  {classes.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-stone-900 dark:text-white">
                  {pagination.totalItems}
                </span>{" "}
                classes
              </>
            )}
          </p>

          {(searchQuery || selectedCategory !== "All") && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <ClassSkeleton key={i} />
            ))}
          </div>
        ) : classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <ClassCard key={cls._id} cls={cls} />
            ))}
          </div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}

        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
}