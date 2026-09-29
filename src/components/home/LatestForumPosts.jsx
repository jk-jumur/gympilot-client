"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineHeart,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineSparkles,
} from "react-icons/hi2";

// 💬 4 posts — with author image + excerpt
const LATEST_POSTS = [
  {
    id: 1,
    title: "How I Lost 12kg in 6 Months Without a Gym",
    author: "Olivia Bennett",
    authorImage: "https://i.pravatar.cc/100?img=47",
    excerpt:
      "You don't need a fancy gym membership to transform your body. Here's the exact routine that worked for me...",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    date: "1 day ago",
  },
  {
    id: 2,
    title: "The Truth About Protein Supplements",
    author: "Lucas Müller",
    authorImage: "https://i.pravatar.cc/100?img=13",
    excerpt:
      "Do you really need protein powder? Let's cut through the marketing and look at the actual science...",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&q=80",
    date: "3 days ago",
  },
  {
    id: 3,
    title: "5-Minute Morning Mobility Routine",
    author: "Yuki Tanaka",
    authorImage: "https://i.pravatar.cc/100?img=36",
    excerpt:
      "Start your day with this quick routine. Your joints will thank you, especially if you sit at a desk all day...",
    image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
    date: "5 days ago",
  },
  {
    id: 4,
    title: "Cardio vs Weights: Which Comes First?",
    author: "Amara Okafor",
    authorImage: "https://i.pravatar.cc/100?img=59",
    excerpt:
      "The age-old debate finally settled. Here's what the research says about workout order and results...",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
    date: "1 week ago",
  },
];

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

export default function LatestForumPosts() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden
      bg-gradient-to-b from-stone-50 via-orange-50/40 to-stone-50
      dark:from-stone-900 dark:via-orange-950/15 dark:to-stone-900">

      <div className="pointer-events-none absolute top-20 -right-32 h-72 w-72 rounded-full bg-orange-300/15 dark:bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -left-32 h-72 w-72 rounded-full bg-amber-300/15 dark:bg-amber-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
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

        {/* Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {LATEST_POSTS.map((post) => (
            <motion.article
              key={post.id}
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
              </div>

              {/* ═══ Content ═══ */}
              <div className="p-4 flex flex-col flex-1">

                {/* ⭐ Author Row — with avatar */}
                <div className="flex items-center gap-2 h-6 mb-2">
                  <div className="relative shrink-0">
                    <div className="h-6 w-6 rounded-full p-[1.5px] bg-gradient-to-tr from-orange-500 to-amber-400">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={24}
                        height={24}
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
                  {post.excerpt}
                </p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Meta row */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-stone-200 dark:border-stone-800">
                  <span className="inline-flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                    <HiOutlineClock className="h-3.5 w-3.5" />
                    {post.date}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full
                        bg-rose-500/10 text-rose-500
                        hover:bg-rose-500 hover:text-white
                        transition-colors cursor-pointer"
                      aria-label="Likes"
                    >
                      <HiOutlineHeart className="h-3.5 w-3.5" />
                    </span>
                    <span
                      className="inline-flex items-center justify-center h-6 w-6 rounded-full
                        bg-orange-500/10 text-orange-500
                        hover:bg-orange-500 hover:text-white
                        transition-colors cursor-pointer"
                      aria-label="Comments"
                    >
                      <HiOutlineChatBubbleLeftRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={`/forum/${post.id}`}
                  className="group/btn mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold
                    bg-orange-500
                    text-white
                    hover:bg-orange-600
                    shadow-md shadow-orange-500/20 hover:shadow-orange-500/40
                    transition-all duration-300"
                >
                  Read Full Post
                  <HiOutlineArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}