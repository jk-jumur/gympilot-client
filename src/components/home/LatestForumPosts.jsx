"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineBookOpen,
} from "react-icons/hi2";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ⭐ Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ⭐ Auto category
function getCategory(post) {
  if (post.category) return post.category;
  const title = post.title?.toLowerCase() || "";
  if (title.includes("yoga") || title.includes("mobility")) return "YOGA";
  if (title.includes("cardio") || title.includes("hiit")) return "CARDIO";
  if (title.includes("protein") || title.includes("nutrition")) return "NUTRITION";
  if (title.includes("strength") || title.includes("weight")) return "TRAINING";
  if (title.includes("sleep") || title.includes("habit")) return "WELLNESS";
  return "COMMUNITY";
}

// ⭐ Format date
function formatDate(date) {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} week${diff >= 14 ? "s" : ""} ago`;
  return `${Math.floor(diff / 30)} month${diff >= 60 ? "s" : ""} ago`;
}

// ⭐ Skeleton
function PostSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 animate-pulse">
      <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
        <div className="h-4 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-10 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}

export default function LatestForumPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch from API
  useEffect(() => {
    let cancelled = false;

    async function fetchLatest() {
      try {
        const res = await fetch(`${API_URL}/api/forum/latest`);
        const data = await res.json();

        if (!cancelled && data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to fetch forum posts:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLatest();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden
      bg-gradient-to-b from-stone-50 via-orange-50/40 to-stone-50
      dark:from-stone-900 dark:via-orange-950/15 dark:to-stone-900">

      <div className="pointer-events-none absolute top-20 -right-32 h-72 w-72 rounded-full bg-orange-300/15 dark:bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-32 h-72 w-72 rounded-full bg-amber-300/15 dark:bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══ Section Header ═══ */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
              bg-orange-500/15 dark:bg-orange-500/20
              border border-orange-500/30 dark:border-orange-500/40
              text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <HiOutlineSparkles className="h-3 w-3" />
              Community Voice
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              Trending{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Discussions
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 max-w-xl">
              Real talk from real people — dive into what our community is buzzing about.
            </p>
          </div>

          <Link
            href="/forum"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold
              bg-white dark:bg-stone-900
              text-stone-800 dark:text-stone-100
              border border-stone-200 dark:border-stone-800
              hover:border-orange-500 hover:text-orange-500
              shadow-sm hover:shadow-md transition-all whitespace-nowrap"
          >
            Explore Forum
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* ═══ Content ═══ */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 dark:text-stone-400">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {posts.map((post) => {
              const category = getCategory(post);

              return (
                <motion.article
                  key={post._id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-3xl overflow-hidden
                    bg-white dark:bg-stone-950
                    border border-stone-200 dark:border-stone-800
                    hover:border-orange-500/50
                    shadow-md hover:shadow-2xl hover:shadow-orange-500/20
                    transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full
                      bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm
                      text-[10px] font-bold uppercase tracking-wider
                      text-stone-800 dark:text-stone-100">
                      {category}
                    </span>

                    {/* Reading time */}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full
                      bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold">
                      <HiOutlineBookOpen className="h-3 w-3" />
                      5 min read
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">

                    {/* Author row */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="relative shrink-0">
                        <div className="h-7 w-7 rounded-full p-[1.5px] bg-gradient-to-tr from-orange-500 to-amber-400">
                          <Image
                            src={post.authorImage || "https://i.pravatar.cc/100"}
                            alt={post.author}
                            width={28}
                            height={28}
                            className="h-full w-full rounded-full object-cover ring-2 ring-white dark:ring-stone-950"
                          />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-950" />
                      </div>
                      <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 truncate">
                        {post.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-extrabold text-stone-900 dark:text-white leading-snug line-clamp-2 min-h-[2.5rem]
                      group-hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
                      {post.excerpt || post.description?.substring(0, 120) + "..."}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Meta row */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800">
                      <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                        <HiOutlineClock className="h-3.5 w-3.5" />
                        {formatDate(post.createdAt)}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer">
                          <HiOutlineHeart className="h-3.5 w-3.5" />
                        </span>
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer">
                          <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/forum/${post._id}`}
                      className="group/btn mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold
                        bg-orange-500 text-white hover:bg-orange-600
                        shadow-md shadow-orange-500/20 hover:shadow-orange-500/40
                        transition-all duration-300"
                    >
                      Read Full Post
                      <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}