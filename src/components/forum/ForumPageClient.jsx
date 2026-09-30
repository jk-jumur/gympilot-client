"use client";

import { useState, useEffect } from "react";
import ForumPostCard from "./ForumPostCard";
import ForumPagination from "./ForumPagination";
import ForumEmptyState from "./ForumEmptyState";
import ForumSkeleton from "./ForumSkeleton";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const POSTS_PER_PAGE = 6;   // ⭐ 6 per page → 8 posts = 2 pages ✅

export default function ForumPageClient() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: POSTS_PER_PAGE.toString(),
        });

        const res = await fetch(`${API_URL}/api/forum?${params}`, {
          signal: controller.signal,
        });

        const data = await res.json();

        if (data.success) {
          setPosts(data.data);
          setPagination(data.pagination || {});
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Failed to fetch posts:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
    return () => controller.abort();
  }, [currentPage]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/60 to-white dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="pointer-events-none absolute top-0 -left-32 h-72 w-72 rounded-full bg-orange-300/20 dark:bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -right-32 h-72 w-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
            bg-orange-500/15 dark:bg-orange-500/20
            border border-orange-500/30 dark:border-orange-500/40
            text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
            Community
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
            Community{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Forum
            </span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-4 max-w-2xl mx-auto">
            Insights, tips, and stories from our trainers and community members.
          </p>
        </div>
      </section>

      {/* ⭐ Posts Grid — 3 columns, 6 per page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
              <ForumSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <ForumEmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <ForumPostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* ⭐ Pagination — will show when totalPages > 1 */}
        {!loading && pagination.totalPages > 1 && (
          <ForumPagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>
    </>
  );
}