"use client";

import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
   const pathname = usePathname();
   
   if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-orange-100 bg-white text-gray-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="group flex items-center gap-2.5 no-underline">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-md shadow-orange-500/25 transition-transform duration-300 group-hover:scale-105">
                <svg
                  className="h-5 w-5 text-white"
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
              <div className="flex items-center whitespace-nowrap text-xl font-extrabold tracking-tight">
                <span className="text-gray-950">Gym</span>
                <span className="text-orange-500">Pilot</span>
              </div>
            </Link>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              Your ultimate fitness partner. Track workouts, explore expert classes, and join a vibrant fitness community to achieve your goals.
            </p>

            {/* Social Media Links (Including the new X logo) */}
            <div className="flex items-center gap-3 pt-2">
              {/* X (Twitter) Logo */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50/50 text-gray-800 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook Logo */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50/50 text-gray-800 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Instagram Logo */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-orange-200 bg-orange-50/50 text-gray-800 transition-all duration-200 hover:bg-orange-500 hover:text-white hover:border-orange-500"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-gray-600 no-underline transition-colors hover:text-orange-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/classes" className="text-sm text-gray-600 no-underline transition-colors hover:text-orange-500">
                  All Classes
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-sm text-gray-600 no-underline transition-colors hover:text-orange-500">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-600 no-underline transition-colors hover:text-orange-500">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2.5">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>123 Fitness Avenue, Gym Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-5 w-5 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (555) 234-5678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="h-5 w-5 shrink-0 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@gympilot.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter / Extra info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-950">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-500">
              Subscribe to get fitness tips, latest class schedules, and special offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl border border-orange-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; {currentYear} GymPilot. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="#" className="no-underline text-gray-500 hover:text-orange-500">Privacy Policy</Link>
            <Link href="#" className="no-underline text-gray-500 hover:text-orange-500">Terms of Service</Link>
            <Link href="#" className="no-underline text-gray-500 hover:text-orange-500">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}