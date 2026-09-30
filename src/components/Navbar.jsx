"use client";

import { useTheme } from "next-themes";
import { Button, Avatar, Dropdown, Label } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // useEffect add korun
import { authClient } from "@/lib/auth-client";
import { MdDashboard } from "react-icons/md";
import { CgFileDocument, CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi"; // Sun/Moon icon
import Link from "next/link";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Hydration error thekanor jonno
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Server side rendering e theme undefined thake, tai mounted check
  useEffect(() => {
    setMounted(true);
  }, []);

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
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/95 backdrop-blur-md dark:bg-[#1A1A1A]/95 dark:border-[#2A2A2A]">
      {/* ================= MAIN NAVBAR ================= */}
      <div
        className="
          mx-auto flex w-full max-w-7xl items-center justify-between
          h-16 px-4
          sm:h-[72px] sm:px-6
          lg:h-20 lg:px-8
          xl:px-10
        "
      >
        {/* ================= LOGO ================= */}
        <div className="flex min-w-0 items-center">
          <Link
            href="/"
            className="
              group flex min-w-0 items-center
              gap-2.5
              no-underline
              sm:gap-3
            "
          >
            {/* Logo Icon */}
            <div
              className="
                flex shrink-0 items-center justify-center
                rounded-xl
                bg-linear-to-br from-orange-500 to-amber-400
                shadow-md shadow-orange-500/25
                transition-transform duration-300
                group-hover:scale-105
                h-9 w-9
                sm:h-10 sm:w-10
                lg:h-11 lg:w-11
              "
            >
              <svg
                className="
                  h-5 w-5 text-white
                  sm:h-5 sm:w-5
                  lg:h-6 lg:w-6
                "
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

            {/* Logo Text */}
            <div
              className="
                flex items-center whitespace-nowrap
                text-lg font-extrabold tracking-tight
                sm:text-xl
                lg:text-2xl
              "
            >
              <span className="text-gray-950 dark:text-white">Gym</span>
              <span className="text-orange-500 dark:text-[#FF4D00]">Pilot</span>
            </div>
          </Link>
        </div>

        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav
          className="
            absolute left-1/2 hidden -translate-x-1/2
            items-center gap-1.5
            rounded-full
            border border-orange-100
            bg-orange-50/50
            px-3 py-1.5
            lg:flex
            dark:border-[#2A2A2A] dark:bg-[#242424]/50
          "
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  whitespace-nowrap
                  rounded-full
                  px-4 py-2
                  text-sm font-semibold
                  no-underline
                  transition-all duration-200
                  xl:px-5
                  ${
                    isActive
                      ? "bg-white text-orange-500 shadow-sm dark:bg-[#1A1A1A] dark:text-[#FF4D00]"
                      : "text-gray-600 hover:bg-white/70 hover:text-orange-500 dark:text-[#A0A0A0] dark:hover:bg-[#1A1A1A]/70 dark:hover:text-[#FF4D00]"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* ================= RIGHT ACTIONS ================= */}
        <div
          className="
            flex shrink-0 items-center
            gap-2
            sm:gap-3
          "
        >
          {/* Theme Button */}
          {mounted && (
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="
                h-9 w-9 min-w-9
                border border-orange-200
                bg-white
                text-orange-500
                hover:bg-orange-50
                sm:h-10 sm:w-10 sm:min-w-10
                dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:text-[#FF4D00] dark:hover:bg-[#242424]
              "
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-4 w-4" />
              ) : (
                <HiOutlineMoon className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* Divider */}
          <div className="hidden h-7 w-px bg-gray-200 lg:block dark:bg-[#2A2A2A]" />

          {/* Conditional Rendering based on User Auth */}
          {!user ? (
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="no-underline">
                <Button
                  variant="light"
                  radius="full"
                  className="font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-500 px-5 dark:text-[#E0E0E0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00]"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" className="no-underline">
                <Button
                  radius="full"
                  className="bg-linear-to-r from-orange-500 to-amber-400 text-sm font-semibold text-white shadow-md shadow-orange-500/25 hover:scale-[1.02] px-6 dark:from-[#FF4D00] dark:to-[#FF4D00] dark:shadow-orange-900/30"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            /* User Profile & Dropdown (Desktop) */
            <div className="hidden lg:flex items-center">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer">
                  <Avatar size="sm" aria-label="User Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name || "User"}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                
                <Dropdown.Popover className="w-64 p-1 shadow-xl rounded-2xl border border-orange-100 bg-white dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
                  <div className="px-3 pt-3 pb-2 border-b border-gray-100 dark:border-[#2A2A2A]">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-sm font-bold text-gray-900 truncate dark:text-white">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-[#A0A0A0]">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Dropdown.Menu className="p-1 space-y-1">
                    <Dropdown.Item id="dashboard" textValue="Dashboard" className="rounded-xl hover:bg-orange-50 p-2 cursor-pointer dark:hover:bg-[#242424]">
                      <Link className="flex items-center gap-2.5 text-gray-700 hover:text-orange-500 no-underline w-full font-medium text-sm dark:text-[#E0E0E0] dark:hover:text-[#FF4D00]" href="/dashboard">
                        <MdDashboard className="text-lg text-orange-500 dark:text-[#FF4D00]" />
                        <Label className="cursor-pointer">Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    
                    <Dropdown.Item id="forum-details" textValue="Forum Post Details" className="rounded-xl hover:bg-orange-50 p-2 cursor-pointer dark:hover:bg-[#242424]">
                      <Link className="flex items-center gap-2.5 text-gray-700 hover:text-orange-500 no-underline w-full font-medium text-sm dark:text-[#E0E0E0] dark:hover:text-[#FF4D00]" href="/forum/details">
                        <CgFileDocument className="text-lg text-orange-500 dark:text-[#FF4D00]" />
                        <Label className="cursor-pointer">Forum Post Details</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="class-details" textValue="Class Details" className="rounded-xl hover:bg-orange-50 p-2 cursor-pointer dark:hover:bg-[#242424]">
                      <Link className="flex items-center gap-2.5 text-gray-700 hover:text-orange-500 no-underline w-full font-medium text-sm dark:text-[#E0E0E0] dark:hover:text-[#FF4D00]" href="/classes/details">
                        <CgProfile className="text-lg text-orange-500 dark:text-[#FF4D00]" />
                        <Label className="cursor-pointer">Class Details</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={handleSignOut}
                      className="rounded-xl hover:bg-red-50 p-2 text-red-600 cursor-pointer dark:hover:bg-red-900/20 dark:text-red-400"
                    >
                      <div className="flex items-center gap-2.5 font-medium text-sm">
                        <BiLogOut className="text-lg" />
                        <Label className="cursor-pointer">Logout</Label>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}

          {/* ================= MOBILE + TABLET MENU BUTTON ================= */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg
              text-gray-700
              transition-all duration-200
              hover:bg-orange-50
              hover:text-orange-500
              lg:hidden
              dark:text-[#E0E0E0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00]
            "
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE + TABLET DROPDOWN MENU ================= */}
      {isMenuOpen && (
        <div
          className="
            border-t border-orange-100
            bg-white
            px-4 py-4
            shadow-lg
            sm:px-6 sm:py-5
            lg:hidden
            dark:border-[#2A2A2A] dark:bg-[#1A1A1A]
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            {/* Navigation Links */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      w-full rounded-xl
                      px-4 py-3
                      text-sm font-semibold
                      no-underline
                      transition
                      ${
                        isActive
                          ? "bg-orange-50 text-orange-500 dark:bg-[#242424] dark:text-[#FF4D00]"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-500 dark:text-[#A0A0A0] dark:hover:bg-[#242424] dark:hover:text-[#FF4D00]"
                      }
                    `}
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
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-orange-500 bg-orange-50 no-underline dark:bg-[#242424] dark:text-[#FF4D00]"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/forum/details"
                    onClick={closeMenu}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-orange-500 bg-orange-50 no-underline dark:bg-[#242424] dark:text-[#FF4D00]"
                  >
                    Forum Post Details
                  </Link>
                  <Link
                    href="/classes/details"
                    onClick={closeMenu}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-orange-500 bg-orange-50 no-underline dark:bg-[#242424] dark:text-[#FF4D00]"
                  >
                    Class Details
                  </Link>
                </>
              )}
            </div>

            {/* Menu Actions (Login/Register or Logout for Mobile) */}
            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-[#2A2A2A]">
              {!user ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={closeMenu} className="w-full">
                    <Button radius="lg" className="w-full bg-gray-100 font-semibold text-gray-800 hover:bg-gray-200 h-10 dark:bg-[#242424] dark:text-[#E0E0E0] dark:hover:bg-[#333333]">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={closeMenu} className="w-full">
                    <Button radius="lg" className="w-full bg-linear-to-r from-orange-500 to-amber-400 font-semibold text-white shadow-md h-10 dark:from-[#FF4D00] dark:to-[#FF4D00]">
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
                  className="w-full font-semibold h-10"
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