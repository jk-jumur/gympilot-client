"use client";

export default function PostContent({ post }) {
  return (
    <div className="mt-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8">
      <h2 className="text-lg font-black text-stone-900 dark:text-white mb-4">
        Full Story
      </h2>
      <div className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
        {post.description}
      </div>
    </div>
  );
}