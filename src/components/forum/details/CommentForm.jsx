"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiOutlinePaperAirplane, HiOutlineXMark } from "react-icons/hi2";
import { toast } from "@/lib/toast";
import ButtonLoader from "@/components/ui/ButtonLoader";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CommentForm({
  postId,
  user,
  editingComment,
  onCancelEdit,
  onSuccess,
}) {
  const router = useRouter();
  const [text, setText] = useState(editingComment?.text || "");
  const [loading, setLoading] = useState(false);

  const isEditing = !!editingComment;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment");
      router.push(`/login?redirect=/forum/${postId}`);
      return;
    }

    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const url = isEditing
        ? `${API_URL}/api/forum/${postId}/comments/${editingComment._id}`
        : `${API_URL}/api/forum/${postId}/comments`;

      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(isEditing ? "Comment updated!" : "Comment posted!");
        setText("");
        if (onSuccess) onSuccess(data.data);
      } else {
        toast.error(data.error || "Failed to post comment");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4"
    >
      {isEditing && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
            Editing comment
          </span>
          <button
            type="button"
            onClick={onCancelEdit}
            className="p-1 rounded-md text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <HiOutlineXMark className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex gap-3">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <span className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        )}

        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={user ? "Write your comment..." : "Login to comment"}
            rows={isEditing ? 2 : 3}
            disabled={!user}
            className="w-full px-4 py-3 rounded-xl
              bg-stone-50 dark:bg-stone-950
              border border-stone-200 dark:border-stone-800
              focus:border-orange-500 dark:focus:border-orange-500
              text-sm text-stone-900 dark:text-white
              placeholder-stone-400 dark:placeholder-stone-500
              outline-none transition-all resize-none
              disabled:opacity-60"
          />

          <div className="flex items-center justify-end gap-2 mt-3">
            {isEditing && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="px-4 py-2 rounded-lg text-xs font-bold
                  text-stone-600 dark:text-stone-400
                  hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading || !text.trim() || !user}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold
                bg-orange-500 text-white hover:bg-orange-600
                disabled:opacity-60 disabled:cursor-not-allowed
                transition-all"
            >
              {loading ? (
                <ButtonLoader
                  text={isEditing ? "Updating" : "Posting"}
                  color="white"
                />
              ) : (
                <>
                  <HiOutlinePaperAirplane className="h-3.5 w-3.5" />
                  {isEditing ? "Update" : "Post"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}