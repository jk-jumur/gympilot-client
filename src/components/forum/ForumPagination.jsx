"use client";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";

export default function ForumPagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }
    return pages;
  };

  const buttonBase = "inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all";
  const buttonIdle = "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:border-orange-500 hover:text-orange-500";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12 flex-wrap"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${buttonBase} ${buttonIdle} disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <HiOutlineChevronLeft className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-stone-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`h-10 w-10 rounded-xl text-xs font-bold transition-all
              ${currentPage === page ? "bg-orange-500 text-white shadow-md shadow-orange-500/30" : buttonIdle}`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${buttonBase} ${buttonIdle} disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <span className="hidden sm:inline">Next</span>
        <HiOutlineChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}