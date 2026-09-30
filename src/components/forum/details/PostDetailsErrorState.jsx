import Link from "next/link";
import {
  HiOutlineArrowLeft,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

export default function PostDetailsErrorState({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 rounded-2xl bg-orange-500/10 items-center justify-center mb-5">
          <HiOutlineExclamationTriangle className="h-8 w-8 text-orange-500" />
        </div>

        <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
          Post Not Found
        </h2>

        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
          {message || "The post you're looking for doesn't exist or has been removed."}
        </p>

        <Link
          href="/forum"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl
            bg-orange-500 text-white font-bold text-sm
            hover:bg-orange-600 transition-colors"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Forum
        </Link>
      </div>
    </div>
  );
}