"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostHero({ post }) {
  return (
    <>
      {/* Back Button */}
      <Link
        href="/forum"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-orange-500 transition-colors mb-6"
      >
        <HiOutlineArrowLeft className="h-3.5 w-3.5" />
        Back to Forum
      </Link>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
        {post.title}
      </h1>

      {/* Author Row */}
      <div className="flex items-center gap-3 mt-5 mb-6">
        <div className="relative shrink-0">
          <div className="h-11 w-11 rounded-full p-[2px] bg-gradient-to-tr from-orange-500 to-amber-400">
            <Image
              src={post.authorImage || "https://i.pravatar.cc/100"}
              alt={post.author}
              width={44}
              height={44}
              className="h-full w-full rounded-full object-cover ring-2 ring-white dark:ring-stone-950"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-950" />
        </div>
        <div>
          <p className="text-sm font-bold text-stone-900 dark:text-white">
            {post.author}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1">
              <HiOutlineCalendarDays className="h-3 w-3" />
              {formatDate(post.createdAt)}
            </span>
            <span className="h-1 w-1 rounded-full bg-stone-400" />
            <span className="inline-flex items-center gap-1">
              <HiOutlineClock className="h-3 w-3" />
              5 min read
            </span>
          </div>
        </div>
      </div>

      {/* Full Image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>
    </>
  );
}