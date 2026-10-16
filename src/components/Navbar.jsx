"use client";

import { useTheme } from "next-themes";
import { Avatar, Dropdown } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";
import Link from "next/link";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => setMounted(true), []);
  useEffect(() => setIsMenuOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/classes" },
    { name: "Community Forum", href: "/forum" },
    { name: "About Us", href: "/about" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Contact", href: "/contact" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  if (pathname?.includes("dashboard")) return null;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-zinc-200/80 bg-white/85 shadow-[0_4px_24px_-8px_rgba(249,115,22,0.12)] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/85"
            : "border-b border-zinc-200/60 bg-white/95 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/95"
        }`}
      >
        {/* ═══════════ MAIN BAR ═══════════ */}
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          
          {/* ═══ LOGO ═══ */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2 no-underline sm:gap-2.5"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50 sm:rounded-xl" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 shadow-sm shadow-orange-500/30 transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9 sm:rounded-xl">
                <svg
                  className="h-4 w-4 text-white transition-transform duration-500 group-hover:rotate-[10deg] sm:h-[18px] sm:w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            </div>
            <span className="text-base font-black tracking-tight sm:text-lg">
              <span className="text-zinc-900 dark:text-white">Gym</span>
              <span className="text-orange-500">Pilot</span>
            </span>
          </Link>

          {/* ═══ DESKTOP NAV (≥1280px) ═══ */}
          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex h-9 items-center whitespace-nowrap rounded-lg px-3 text-[13px] font-semibold no-underline transition-all duration-200 2xl:px-3.5 2xl:text-sm ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                      : "text-zinc-600 hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* ═══ RIGHT ACTIONS ═══ */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="group relative flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 active:scale-95 sm:h-9 sm:w-9 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-orange-500/40 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
                aria-label="Toggle theme"
                title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                <HiOutlineSun
                  className={`absolute h-4 w-4 transition-all duration-300 sm:h-[18px] sm:w-[18px] ${
                    resolvedTheme === "dark"
                      ? "rotate-0 scale-100 opacity-100"
                      : "rotate-90 scale-0 opacity-0"
                  }`}
                />
                <HiOutlineMoon
                  className={`absolute h-4 w-4 transition-all duration-300 sm:h-[18px] sm:w-[18px] ${
                    resolvedTheme === "dark"
                      ? "-rotate-90 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                />
              </button>
            )}

            {/* Logged Out — Desktop (≥1280px) */}
            {!user ? (
              <div className="hidden items-center gap-2 xl:flex">
                <Link
                  href="/login"
                  className="rounded-lg px-3.5 py-2 text-sm font-semibold text-zinc-700 no-underline transition-colors hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-sm font-bold text-white no-underline shadow-sm shadow-orange-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-orange-500/40"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Register</span>
                </Link>
              </div>
            ) : (
              /* Logged In — Desktop Avatar (≥1280px) */
              <div className="hidden items-center xl:flex">
                <Dropdown>
                  <Dropdown.Trigger className="cursor-pointer rounded-full outline-none">
                    <Avatar
                      size="sm"
                      aria-label="User Menu"
                      className="ring-2 ring-transparent transition-all duration-200 hover:ring-orange-500/40"
                    >
                      <Avatar.Image
                        referrerPolicy="no-referrer"
                        alt={user?.name || "User"}
                        src={user?.image}
                      />
                      <Avatar.Fallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-bold text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar.Fallback>
                    </Avatar>
                  </Dropdown.Trigger>

                  <Dropdown.Popover className="mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-zinc-200/80 bg-white p-1.5 shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950">
                    <div className="border-b border-zinc-100 px-3 pb-3 pt-2.5 dark:border-zinc-800/80">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <Avatar.Image alt={user?.name} src={user?.image} />
                          <Avatar.Fallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-bold text-white">
                            {user?.name?.charAt(0)?.toUpperCase()}
                          </Avatar.Fallback>
                        </Avatar>
                        <div className="flex min-w-0 flex-col overflow-hidden">
                          <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">
                            {user?.name}
                          </p>
                          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-0.5 pt-1.5">
                      <Link
                        href="/dashboard"
                        className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 no-underline transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                      >
                        <MdDashboard className="text-base text-zinc-400 transition-colors group-hover:text-orange-500" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-700 no-underline transition-all duration-200 hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                      >
                        <HiOutlineUser className="text-base text-zinc-400 transition-colors group-hover:text-orange-500" />
                        My Profile
                      </Link>
                      <div className="border-t border-zinc-100 dark:border-zinc-800/80" />
                      <button
                        onClick={handleSignOut}
                        className="group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        <BiLogOut className="text-base transition-transform group-hover:-translate-x-0.5" />
                        Sign out
                      </button>
                    </div>
                  </Dropdown.Popover>
                </Dropdown>
              </div>
            )}

            {/* Hamburger (< 1280px) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 active:scale-95 sm:h-9 sm:w-9 xl:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-orange-500/40 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative h-4 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════ MOBILE / TABLET OVERLAY MENU (< 1280px) ═══════════ */}
      <div
        className={`fixed inset-x-0 top-14 bottom-0 z-40 sm:top-16 xl:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm dark:bg-black/50"
          onClick={closeMenu}
        />

        {/* Menu Panel */}
        <div
          className={`absolute inset-x-0 top-0 max-h-full overflow-y-auto border-b border-zinc-200 bg-white shadow-2xl transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
            isMenuOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-5">
            
            {/* Section: Navigation */}
            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 sm:mb-3">
              Navigation
            </p>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1.5 lg:grid-cols-3">
              {menuItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold no-underline transition-all duration-200 sm:px-4 sm:py-3 ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                        : "text-zinc-700 hover:bg-orange-50 hover:text-orange-600 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-zinc-200 dark:border-zinc-800 sm:my-5" />

            {/* Section: Account */}
            {!user ? (
              <div className="space-y-2 sm:space-y-3">
                <p className="px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                  Account
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-center text-sm font-semibold text-zinc-700 no-underline transition-all hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 sm:px-4 sm:py-3 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-orange-500/40 dark:hover:bg-zinc-900"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2.5 text-center text-sm font-bold text-white no-underline shadow-md shadow-orange-500/25 transition-all hover:shadow-lg hover:shadow-orange-500/40 sm:px-4 sm:py-3"
                  >
                    Register
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                <p className="px-1 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                  My Account
                </p>

                {/* User info card */}
                <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Avatar size="sm">
                    <Avatar.Image alt={user?.name} src={user?.image} />
                    <Avatar.Fallback className="bg-gradient-to-br from-orange-500 to-amber-500 text-xs font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col overflow-hidden">
                    <p className="truncate text-sm font-bold text-zinc-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1.5">
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 no-underline transition-colors hover:bg-orange-50 hover:text-orange-600 sm:px-4 sm:py-3 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                  >
                    <MdDashboard className="text-base text-zinc-400" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-700 no-underline transition-colors hover:bg-orange-50 hover:text-orange-600 sm:px-4 sm:py-3 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-orange-400"
                  >
                    <HiOutlineUser className="text-base text-zinc-400" />
                    My Profile
                  </Link>
                </div>

                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 sm:py-3 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50"
                >
                  <BiLogOut className="text-base" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}