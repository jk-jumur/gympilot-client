"use client";

import Link from "next/link";
import { HiOutlineChatBubbleLeftRight, HiOutlineArrowRight } from "react-icons/hi2";

export default function ForumEmptyState() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex h-16 w-16 rounded-full bg-stone-100 dark:bg-stone-900 items-center justify-center mb-4">
        <HiOutlineChatBubbleLeftRight className="h-8 w-8 text-stone-400" />
      </div>

      <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2">
        No posts yet
      </h3>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6">
        Be the first to share your fitness journey, tips, or questions with the community.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold
          bg-orange-500 text-white hover:bg-orange-600
          shadow-md shadow-orange-500/20 hover:shadow-orange-500/40
          transition-all duration-300"
      >
        Back to Home
        <HiOutlineArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}