"use client";

import Image from "next/image";
import Link from "next/link";
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
  "/dashboard/admin/messages": "Contact Messages",
};

export default function DashboardNavbar({ user, onMenuClick, onLogout }) {
  const pathname = usePathname();
  const pageTitle = PAGE_TITLES[pathname] || "Dashboard";
  const role = user?.role?.toLowerCase() || "user";

  return (
    <header className="h-16 shrink-0 px-2 sm:px-4 md:px-6 flex items-center justify-between
      bg-white/80 dark:bg-stone-900/80 backdrop-blur-md
      border-b border-stone-200 dark:border-stone-800 sticky top-0 z-30 w-full overflow-hidden">

      {/* ═══ LEFT: hamburger + title ═══ */}
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
        {/* Hamburger (mobile/tablet only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 sm:p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 shrink-0"
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="min-w-0 flex-1 pr-2">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 dark:text-white truncate">
            {pageTitle}
          </h1>
          <p className="hidden sm:block text-[10px] md:text-[11px] text-stone-500 dark:text-stone-400 truncate">
            Welcome back, {user?.name || "Explorer"}
          </p>
        </div>
      </div>

      {/* ═══ RIGHT: actions ═══ */}
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
        
        {/* Back to Site (Tablet: Icon only, Desktop: Full Text) */}
        <Link
          href="/"
          title="Back to Site"
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-2 rounded-lg text-xs font-semibold
            bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900
            hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-colors mr-1"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          <span className="hidden lg:inline">Back to Site</span>
        </Link>

        {/* Notification */}
        <button
          className="relative p-1.5 sm:p-2.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-500 transition-colors shrink-0"
          aria-label="Notifications"
        >
          <HiOutlineBell className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-stone-900" />
        </button>

        {/* Profile Info - Clickable to go Home */}
        <Link
          href="/"
          title="Go to Home"
          className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 ml-0.5 sm:ml-1 border-l border-stone-200 dark:border-stone-800 shrink-0 hover:opacity-80 transition-opacity"
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={32}
              height={32}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full object-cover"
              priority
            />
          ) : (
            <span className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold shrink-0">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          )}
          
          {/* User Name (Visible on lg/desktop only to save tablet space) */}
          <span className="hidden lg:block text-left min-w-0">
            <span className="block text-xs font-semibold text-stone-900 dark:text-white truncate max-w-[80px] lg:max-w-[120px]">
              {user?.name || "User"}
            </span>
            <span className="block text-[10px] text-stone-500 dark:text-stone-400 capitalize">
              {role}
            </span>
          </span>
        </Link>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-1.5 sm:p-2.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors shrink-0 ml-0.5"
          aria-label="Logout"
        >
          <HiOutlineArrowLeftOnRectangle className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </header>
  );
}