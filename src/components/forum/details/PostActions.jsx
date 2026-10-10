"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineHeart, HiOutlineHandThumbDown } from "react-icons/hi2";
import { toast } from "@/lib/toast";

const API_URL = ""; // Relative URLs — proxied via Next.js rewrites

export default function PostActions({ post, user, setPost }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsLiked(post.likes?.includes(user.id));
    setIsDisliked(post.dislikes?.includes(user.id));
  }, [post, user]);

  async function handleVote(action) {
    if (!user) {
      toast.error("Please login to vote");
      router.push(`/login?redirect=/forum/${post._id}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/forum/${post._id}/${action}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setPost(data.data);
        if (action === "like") {
          setIsLiked(data.data.likes.includes(user.id));
          setIsDisliked(false);
          toast.success(data.data.likes.includes(user.id) ? "Liked!" : "Like removed");
        } else {
          setIsDisliked(data.data.dislikes.includes(user.id));
          setIsLiked(false);
          toast.success(data.data.dislikes.includes(user.id) ? "Disliked" : "Dislike removed");
        }
      } else {
        toast.error(data.error || "Action failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3 mt-6">
      {/* Like */}
      <button
        onClick={() => handleVote("like")}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm
          transition-all duration-300 disabled:opacity-60
          ${isLiked
            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
            : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-rose-500 hover:text-rose-500"
          }`}
      >
        <HiOutlineHeart className={`h-4 w-4 ${isLiked ? "fill-white" : ""}`} />
        {post.likes?.length || 0}
      </button>

      {/* Dislike */}
      <button
        onClick={() => handleVote("dislike")}
        disabled={loading}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm
          transition-all duration-300 disabled:opacity-60
          ${isDisliked
            ? "bg-stone-700 text-white shadow-lg shadow-stone-700/30"
            : "bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-stone-500 hover:text-stone-700"
          }`}
      >
        <HiOutlineHandThumbDown className="h-4 w-4" />
        {post.dislikes?.length || 0}
      </button>
    </div>
  );
}