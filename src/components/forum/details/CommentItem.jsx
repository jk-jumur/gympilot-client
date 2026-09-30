"use client";

import { useState } from "react";
import Image from "next/image";
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import { toast } from "@/lib/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CommentItem({ comment, postId, currentUser, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [loading, setLoading] = useState(false);

  const isOwner = currentUser?.id === comment.userId;

  async function handleUpdate() {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/forum/${postId}/comments/${comment._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: editText.trim() }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Comment updated");
        setEditing(false);
        if (onUpdate) onUpdate(data.data);
      } else {
        toast.error(data.error || "Failed to update");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this comment?")) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/forum/${postId}/comments/${comment._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Comment deleted");
        if (onDelete) onDelete(comment._id);
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-3 py-4 border-b border-stone-100 dark:border-stone-800/50 last:border-none">
      {/* Avatar */}
      {comment.userImage ? (
        <Image
          src={comment.userImage}
          alt={comment.userName}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover shrink-0"
        />
      ) : (
        <span className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {comment.userName?.charAt(0)?.toUpperCase() || "U"}
        </span>
      )}

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-bold text-stone-900 dark:text-white truncate">
              {comment.userName}
            </span>
            <span className="text-[11px] text-stone-400 shrink-0">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          {/* Owner Actions */}
          {isOwner && !editing && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-md text-stone-400 hover:text-orange-500 hover:bg-orange-500/10 transition-colors"
                aria-label="Edit"
              >
                <HiOutlinePencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="p-1.5 rounded-md text-stone-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                aria-label="Delete"
              >
                <HiOutlineTrash className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Body — view or edit */}
        {editing ? (
          <div className="mt-2 space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm
                bg-stone-50 dark:bg-stone-950
                border border-stone-200 dark:border-stone-800
                focus:border-orange-500 outline-none resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold
                  bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-60"
              >
                <HiOutlineCheck className="h-3.5 w-3.5" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditText(comment.text);
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold
                  text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <HiOutlineXMark className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed whitespace-pre-line">
            {comment.text}
          </p>
        )}
      </div>
    </div>
  );
}