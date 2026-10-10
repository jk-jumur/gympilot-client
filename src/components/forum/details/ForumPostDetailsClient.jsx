"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostHero from "./PostHero";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import CommentsSection from "./CommentsSection";
import PostDetailsSkeleton from "./PostDetailsSkeleton";
import PostDetailsErrorState from "./PostDetailsErrorState";
import { api } from "@/lib/api";

export default function ForumPostDetailsClient({ id, user }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPost() {
      try {
        const res = await fetch(
          `/api/forum/${id}`,
          { credentials: "include" }
        );
        const data = await res.json();

        if (!cancelled) {
          if (data.success) {
            setPost(data.data);
          } else {
            setError(data.error || "Post not found");
          }
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load post");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPost();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <PostDetailsSkeleton />;
  if (error || !post) return <PostDetailsErrorState message={error} />;

  return (
    <article className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <PostHero post={post} />
        <PostActions post={post} user={user} setPost={setPost} />
        <PostContent post={post} />
        <CommentsSection post={post} user={user} setPost={setPost} />
      </div>
    </article>
  );
}