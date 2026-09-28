"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiOutlineBars3,
  HiOutlineBell,
  HiOutlineArrowLeft,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

// 🎯 Role page title
const PAGE_TITLES = {
  "/dashboard": "Overview",
  "/dashboard/booked-classes": "Booked Classes",
  "/dashboard/favorites": "Favorite Classes",
  "/dashboard/apply-trainer": "Apply as Trainer",
  "/dashboard/add-class": "Add Class",
  "/dashboard/my-classes": "My Classes",
  "/dashboard/add-post": "Add Forum Post",
  "/dashboard/my-posts": "My Forum Posts",
  "/dashboard/manage-users": "Manage Users",
  "/dashboard/applied-trainers": "Applied Trainers",
  "/dashboard/manage-trainers": "Manage Trainers",
  "/dashboard/manage-classes": "Manage Classes",
  "/dashboard/manage-posts": "Manage Forum Posts",
  "/dashboard/transactions": "Transactions",
};

export default function DashboardNavbar({ user, onMenuClick, onLogout }) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "Dashboard";
  const role = user?.role?.toLowerCase() || "user";

  return (
    <header className="h-16 shrink-0 px-4 sm:px-6 flex items-center justify-between
      bg-white/80 dark:bg-stone-900/80 backdrop-blur-md
      border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30">

      {/* ═══ LEFT: hamburger + title ═══ */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base font-bold text-stone-900 dark:text-white truncate">
            {pageTitle}
          </h1>
          <p className="hidden sm:block text-[11px] text-stone-500 dark:text-stone-400 truncate">
            Welcome back, {user?.name || "Explorer"}
          </p>
        </div>
      </div>

      {/* ═══ RIGHT: actions ═══ */}
      <div className="flex items-center gap-2">

        {/* Notification */}
        <button
          className="relative p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-500 transition-colors"
          aria-label="Notifications"
        >
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-stone-900" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-stone-200 dark:border-stone-800">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
              priority
            />
          ) : (
            <span className="h-9 w-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}
          <span className="hidden sm:block text-left">
            <span className="block text-xs font-semibold text-stone-900 dark:text-white truncate max-w-[100px]">
              {user?.name || "User"}
            </span>
            <span className="block text-[10px] text-stone-500 dark:text-stone-400 capitalize">
              {role}
            </span>
          </span>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 ml-1 rounded-lg text-xs font-semibold
            bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900
            hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Site
        </Link>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-2.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          aria-label="Logout"
        >
          <HiOutlineArrowLeftOnRectangle className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}