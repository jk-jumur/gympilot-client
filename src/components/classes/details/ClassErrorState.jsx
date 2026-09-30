import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineExclamationTriangle } from "react-icons/hi2";

export default function ClassErrorState({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 rounded-2xl bg-orange-500/10 items-center justify-center mb-5">
          <HiOutlineExclamationTriangle className="h-8 w-8 text-orange-500" />
        </div>

        <h2 className="text-2xl font-black text-stone-900 dark:text-white mb-2">
          Class Not Found
        </h2>

        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
          {message || "The class you're looking for doesn't exist or has been removed."}
        </p>

        <Link
          href="/classes"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl
            bg-orange-500 text-white font-bold text-sm
            hover:bg-orange-600 transition-colors"
        >
          Browse All Classes
          <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}