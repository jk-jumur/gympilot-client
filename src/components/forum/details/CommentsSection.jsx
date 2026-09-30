"use client";

import { useState } from "react";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentsSection({ post, user, setPost }) {
  const [editingComment, setEditingComment] = useState(null);

  const comments = post.comments || [];

  function handleNewComment(newComment) {
    setPost({ ...post, comments: [...comments, newComment] });
  }

  function handleUpdate(updatedComment) {
    setPost({
      ...post,
      comments: comments.map((c) =>
        c._id === updatedComment._id ? updatedComment : c
      ),
    });
    setEditingComment(null);
  }

  function handleDelete(commentId) {
    setPost({
      ...post,
      comments: comments.filter((c) => c._id !== commentId),
    });
  }

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineChatBubbleLeftRight className="h-5 w-5 text-orange-500" />
        <h2 className="text-lg font-black text-stone-900 dark:text-white">
          Comments
        </h2>
        <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold">
          {comments.length}
        </span>
      </div>

      {/* Form */}
      <CommentForm
        postId={post._id}
        user={user}
        editingComment={editingComment}
        onCancelEdit={() => setEditingComment(null)}
        onSuccess={handleNewComment}
      />

      {/* Comments List */}
      <div className="mt-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          <div>
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
                currentUser={user}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}