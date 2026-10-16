"use client";

import { useTheme } from "next-themes";
import { Button, Avatar, Dropdown, Label } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi2";     // ⭐ ADDED
import Link from "next/link";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (pathname?.includes("dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/95 backdrop-blur-md dark:border-[#2A2A2A] dark:bg-[#1A1A1A]/95">
      {/* ═══════════ MAIN NAV ═══════════ */}
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-4 md:h-16 md:px-6 lg:h-20 lg:gap-6 lg:px-8 xl:px-10">
        
        {/* LOGO */}
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2 no-underline sm:gap-2.5"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 shadow-md shadow-orange-500/25 transition-transform duration-300 group-hover:scale-105 sm:h-9 sm:w-9 sm:rounded-xl lg:h-11 lg:w-11">
            <svg
              className="h-4 w-4 text-white sm:h-5 sm:w-5 lg:h-6 lg:w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <div className="flex items-center whitespace-nowrap text-base font-extrabold tracking-tight sm:text-lg lg:text-2xl">
            <span className="text-gray-950 dark:text-white">Gym</span>
            <span className="text-orange-500 dark:text-[#FF4D00]">Pilot</span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-0.5 rounded-full border border-orange-100 bg-orange-50/50 px-2 py-1.5 dark:border-[#2A2A2A] dark:bg-[#242424]/50 lg:flex xl:gap-1 xl:px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold no-underline transition-all duration-200 xl:px-4 xl:py-2 xl:text-sm ${
                  isActive
                    ? "bg-white text-orange-500 shadow-sm dark:bg-[#1A1A1A] dark:text-[#FF4D00]"
                    : "text-gray-600 hover:bg-white/70 hover:text-orange-500 dark:text-[#A0A0A0] dark:hover:bg-[#1A1A1A]/70 dark:hover:text-[#FF4D00]"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          
          {/* Theme Toggle */}
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="h-8 w-8 min-w-8 border border-orange-200 bg-white text-orange-500 hover:bg-orange-50 sm:h-9 sm:w-9 sm:min-w-9 lg:h-10 lg:w-10 lg:min-w-10 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:text-[#FF4D00] dark:hover:bg-[#242424]"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <HiOutlineSun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <HiOutlineMoon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </Button>
          )}

          <div className="hidden h-7 w-px bg-gray-200 lg:block dark:bg-[#2A2A2A]" />

          {/* LOGGED OUT */}
          {!user ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Link href="/login" className="no-underline">
                <Button
                  variant="light"
                  radius="full"
                  className="px-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-500 dark:text-[#E0E0E0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00] xl:px-5"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" className="no-underline">
                <Button
                  radius="full"
                  className="bg-gradient-to-r from-orange-500 to-amber-400 px-5 text-sm font-semibold text-white shadow-md shadow-orange-500/25 hover:scale-[1.02] dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30 xl:px-6"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            /* LOGGED IN — Avatar Dropdown */
            <div className="hidden items-center lg:flex">
              <Dropdown>
                <Dropdown.Trigger className="cursor-pointer rounded-full">
                  <Avatar size="sm" aria-label="User Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name || "User"}
                      src={user?.image}
                    />
                    <Avatar.Fallback>
                      {user?.name?.charAt(0) || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Popover className="w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-orange-100 bg-white p-1 shadow-xl dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
                  
                  {/* User Info */}
                  <div className="border-b border-gray-100 px-3 pb-2 pt-3 dark:border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col overflow-hidden">
                        <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                          {user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-[#A0A0A0]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <Dropdown.Menu className="space-y-1 p-1">
                    
                    {/* Dashboard */}
                    <Dropdown.Item
                      id="dashboard"
                      textValue="Dashboard"
                      className="cursor-pointer rounded-xl p-2 hover:bg-orange-50 dark:hover:bg-[#242424]"
                    >
                      <Link
                        className="flex w-full items-center gap-2.5 text-sm font-medium text-gray-700 no-underline hover:text-orange-500 dark:text-[#E0E0E0] dark:hover:text-[#FF4D00]"
                        href="/dashboard"
                      >
                        <MdDashboard className="text-lg text-orange-500 dark:text-[#FF4D00]" />
                        <Label className="cursor-pointer">Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    {/* ⭐ MY PROFILE */}
                    <Dropdown.Item
                      id="profile"
                      textValue="My Profile"
                      className="cursor-pointer rounded-xl p-2 hover:bg-orange-50 dark:hover:bg-[#242424]"
                    >
                      <Link
                        className="flex w-full items-center gap-2.5 text-sm font-medium text-gray-700 no-underline hover:text-orange-500 dark:text-[#E0E0E0] dark:hover:text-[#FF4D00]"
                        href="/dashboard/profile"
                      >
                        <HiOutlineUser className="text-lg text-orange-500 dark:text-[#FF4D00]" />
                        <Label className="cursor-pointer">My Profile</Label>
                      </Link>
                    </Dropdown.Item>

                    {/* Logout */}
                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={handleSignOut}
                      className="cursor-pointer rounded-xl p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <div className="flex items-center gap-2.5 text-sm font-medium">
                        <BiLogOut className="text-lg" />
                        <Label className="cursor-pointer">Logout</Label>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}

          {/* HAMBURGER */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-700 transition-all duration-200 hover:bg-orange-50 hover:text-orange-500 sm:h-9 sm:w-9 lg:hidden dark:text-[#E0E0E0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00]"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-orange-100 bg-white px-3 py-4 shadow-lg sm:px-6 sm:py-5 lg:hidden dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
          <div className="mx-auto w-full max-w-7xl">
            
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2 lg:grid-cols-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`w-full rounded-xl px-4 py-3 text-sm font-semibold no-underline transition ${
                      isActive
                        ? "bg-orange-50 text-orange-500 dark:bg-[#242424] dark:text-[#FF4D00]"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500 dark:text-[#A0A0A0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {user && (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className="w-full rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-500 no-underline dark:bg-[#242424] dark:text-[#FF4D00]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={closeMenu}
                    className="w-full rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-500 no-underline dark:bg-[#242424] dark:text-[#FF4D00]"
                  >
                    My Profile
                  </Link>
                </>
              )}
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-[#2A2A2A]">
              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={closeMenu} className="w-full no-underline">
                    <Button
                      radius="lg"
                      className="h-10 w-full bg-gray-100 font-semibold text-gray-800 hover:bg-gray-200 dark:bg-[#242424] dark:text-[#E0E0E0] dark:hover:bg-[#333333]"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="w-full no-underline">
                    <Button
                      radius="lg"
                      className="h-10 w-full bg-gradient-to-r from-orange-500 to-amber-400 font-semibold text-white shadow-md dark:from-[#FF4D00] dark:to-[#FF4D00]"
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  color="danger"
                  variant="flat"
                  className="h-10 w-full font-semibold"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}