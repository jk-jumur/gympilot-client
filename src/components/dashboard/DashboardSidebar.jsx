"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineHeart,
  HiOutlineUserPlus,
  HiOutlineAcademicCap,
  HiOutlineSquares2X2,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentCheck,
  HiOutlineUsers,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineXMark,
} from "react-icons/hi2";

// 🎯 ৩ role-এর জন্য ৩টা menu
const MENU_BY_ROLE = {
  user: [
    { label: "Overview",       href: "/dashboard",                icon: HiOutlineHome },
    { label: "Booked Classes", href: "/dashboard/booked-classes", icon: HiOutlineCalendarDays },
    { label: "Favorites",      href: "/dashboard/favorites",      icon: HiOutlineHeart },
    { label: "Apply as Trainer", href: "/dashboard/apply-trainer", icon: HiOutlineUserPlus },
  ],
  trainer: [
    { label: "Overview",      href: "/dashboard",             icon: HiOutlineHome },
    { label: "Add Class",     href: "/dashboard/add-class",   icon: HiOutlineAcademicCap },
    { label: "My Classes",    href: "/dashboard/my-classes",  icon: HiOutlineSquares2X2 },
    { label: "Add Post",      href: "/dashboard/add-post",    icon: HiOutlineChatBubbleLeftRight },
    { label: "My Posts",      href: "/dashboard/my-posts",    icon: HiOutlineClipboardDocumentCheck },
  ],
  admin: [
    { label: "Overview",        href: "/dashboard",                  icon: HiOutlineHome },
    { label: "Manage Users",    href: "/dashboard/manage-users",     icon: HiOutlineUsers },
    { label: "Applied Trainers",href: "/dashboard/applied-trainers", icon: HiOutlineClipboardDocumentCheck },
    { label: "Manage Trainers", href: "/dashboard/manage-trainers",  icon: HiOutlineShieldCheck },
    { label: "Manage Classes",  href: "/dashboard/manage-classes",   icon: HiOutlineAcademicCap },
    { label: "Add Post",        href: "/dashboard/add-post",         icon: HiOutlineChatBubbleLeftRight },
    { label: "Manage Posts",    href: "/dashboard/manage-posts",     icon: HiOutlineClipboardDocumentCheck },
    { label: "Transactions",    href: "/dashboard/transactions",     icon: HiOutlineCurrencyDollar },
  ],
};

export default function DashboardSidebar({ user, isOpen, onClose }) {
  const pathname = usePathname();
  const role = user?.role?.toLowerCase() || "user";
  const menu = MENU_BY_ROLE[role] || MENU_BY_ROLE.user;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 h-full w-64 shrink-0
          bg-white dark:bg-stone-900
          border-r border-stone-200 dark:border-stone-800
          flex flex-col transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* ═══ LOGO ═══ */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-stone-200 dark:border-stone-800">
          <Link
            href="/"
            className="flex items-center gap-2.5 no-underline group"
            aria-label="GymPilot Home"
          >
            {/* Logo Icon */}
            <div className="relative h-10 w-10 shrink-0 rounded-xl 
              bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500
              flex items-center justify-center
              shadow-lg shadow-orange-500/30
              transition-all duration-300
              group-hover:scale-105 group-hover:shadow-orange-500/50
              group-hover:rotate-[5deg]">

              {/* Glow ring on hover */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-400 to-amber-400 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />

              {/* Lightning + spark dots SVG */}
              <svg
                className="relative h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 2L4 14h7.5L10.5 22L20 10h-7.5L13.5 2Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="19" cy="5" r="1" fill="currentColor" />
                <circle cx="5" cy="19" r="1" fill="currentColor" />
              </svg>
            </div>

            {/* Logo Text */}
            <div className="flex items-baseline text-lg font-black tracking-tight whitespace-nowrap">
              <span className="text-stone-900 dark:text-white">Gym</span>
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Pilot
              </span>
            </div>
          </Link>

          {/* Close (mobile) */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Close sidebar"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        {/* ═══ Role label ═══ */}
        <p className="px-5 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          {role} menu
        </p>

        {/* ═══ Menu ═══ */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                    : "text-stone-600 dark:text-stone-300 hover:bg-orange-50 dark:hover:bg-stone-800 hover:text-orange-600"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ═══ Footer (optional) ═══ */}
        <div className="border-t border-stone-200 dark:border-stone-800 p-4">
          <p className="text-[10px] text-center text-stone-400 dark:text-stone-500">
            © {new Date().getFullYear()} GymPilot
          </p>
        </div>
      </aside>
    </>
  );
}