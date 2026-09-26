"use client";

import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "All Classes", href: "/classes" },
    { name: "Community Forum", href: "/forum" },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/95 backdrop-blur-md">
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
              <span className="text-gray-950">Gym</span>
              <span className="text-orange-500">Pilot</span>
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
                      ? "bg-white text-orange-500 shadow-sm"
                      : "text-gray-600 hover:bg-white/70 hover:text-orange-500"
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
          <Button
            isIconOnly
            variant="light"
            radius="full"
            className="
              h-9 w-9 min-w-9
              border border-orange-200
              bg-white
              text-orange-500
              hover:bg-orange-50
              sm:h-10 sm:w-10 sm:min-w-10
            "
            aria-label="Toggle theme"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </Button>

          {/* Divider (Only on Desktop) */}
          <div className="hidden h-7 w-px bg-gray-200 lg:block" />

          {/* Login (Visible only on Desktop) */}
          <Link  href="/login">
          <Button
           
           
            variant="light"
            radius="full"
            className="
              hidden
              font-semibold text-gray-800
              hover:bg-orange-50 hover:text-orange-500
              lg:flex lg:px-5
            "
          >
            Login
          </Button>
              </Link>
          {/* Register (Visible only on Desktop) */}
          <Button
            as={Link}
            href="/register"
            radius="full"
            className="
              hidden
              bg-linear-to-r from-orange-500 to-amber-400
              text-sm font-semibold text-white
              shadow-md shadow-orange-500/25
              transition-all duration-200
              hover:scale-[1.02]
              lg:flex lg:px-6
            "
          >
            Register
          </Button>

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
            "
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
          "
        >
          <div className="mx-auto w-full max-w-7xl">
            {/* Navigation Links */}
            <div
              className="
                grid grid-cols-1 gap-2
                sm:grid-cols-3 sm:gap-3
              "
            >
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
                          ? "bg-orange-50 text-orange-500"
                          : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                      }
                    `}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Menu Actions (Login & Register inside mobile/tablet dropdown) */}
            <div
              className="
                mt-4
                border-t border-gray-100
                pt-4
              "
            >
              <div className="grid grid-cols-2 gap-3">
                <Button
                  as={Link}
                  href="/login"
                  onClick={closeMenu}
                  radius="lg"
                  className="w-full bg-gray-100 font-semibold text-gray-800 hover:bg-gray-200 h-10"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  onClick={closeMenu}
                  radius="lg"
                  className="w-full bg-linear-to-r from-orange-500 to-amber-400 font-semibold text-white shadow-md h-10"
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}