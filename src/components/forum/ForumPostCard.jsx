"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookOpen,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

function formatDate(date) {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  return `${Math.floor(diff / 30)} months ago`;
}

// ⭐ Auto category from title
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

export default function ForumPostCard({ post }) {
  const category = getCategory(post);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden
        bg-white dark:bg-stone-950
        border border-stone-200 dark:border-stone-800
        hover:border-orange-500/50
        shadow-md hover:shadow-xl hover:shadow-orange-500/10
        transition-all duration-300 flex flex-col"
    >
      {/* ⭐ Image — aspect 16/10 */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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

      {/* ⭐ Content — p-4 */}
      <div className="p-4 flex flex-col flex-1">

        {/* ⭐ Author row — bigger */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative shrink-0">
            <div className="h-8 w-8 rounded-full p-[2px] bg-gradient-to-tr from-orange-500 to-amber-400">
              <Image
                src={post.authorImage || "https://i.pravatar.cc/100"}
                alt={post.author}
                width={32}
                height={32}
                className="h-full w-full rounded-full object-cover ring-2 ring-white dark:ring-stone-950"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-950" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 truncate">
                {post.author}
              </span>
              <HiOutlineCheckBadge className="h-3.5 w-3.5 text-orange-500 shrink-0" />
            </div>
            <span className="block text-[10px] text-stone-400 dark:text-stone-500">
              Author
            </span>
          </div>
        </div>

        {/* ⭐ Title — text-sm */}
        <h2 className="text-sm font-extrabold text-stone-900 dark:text-white leading-snug line-clamp-2 min-h-[2.5rem]
          group-hover:text-orange-500 transition-colors">
          {post.title}
        </h2>

        {/* ⭐ Excerpt — text-xs, 2 lines */}
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {post.excerpt || post.description?.substring(0, 120) + "..."}
        </p>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ⭐ Meta row — Date + Like + Comment */}
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

        {/* ⭐ Button — py-2.5 */}
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
}