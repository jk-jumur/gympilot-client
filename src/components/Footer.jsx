"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineArrowUp,
} from "react-icons/hi2";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { usePathname } from "next/navigation";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Classes", href: "/classes" },
  { label: "Community Forum", href: "/forum" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const SOCIAL_LINKS = [
  { icon: FaXTwitter, href: "https://twitter.com", label: "X (Twitter)", color: "hover:bg-stone-800 hover:border-stone-700 hover:text-white" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600 hover:border-blue-500 hover:text-white" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 hover:text-white" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600 hover:border-red-500 hover:text-white" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="relative overflow-hidden bg-stone-100 text-stone-600 dark:bg-black dark:text-stone-300 border-t border-stone-200 dark:border-transparent transition-colors duration-500">
      
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-64 w-64 rounded-full bg-orange-500/5 blur-3xl dark:bg-orange-500/10" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl dark:bg-rose-500/10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
          
          {/* Brand — 5 cols */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Link href="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 transition-transform group-hover:scale-105">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.5 2L4 14h7.5L10.5 22L20 10h-7.5L13.5 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                Gym
                <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Pilot
                </span>
              </span>
            </Link>

            <p className="mb-6 max-w-sm text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              Your ultimate fitness partner. Track workouts, explore expert
              classes, and join a vibrant community to achieve your goals.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-500 transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:text-stone-400 ${social.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links + Legal — 3 cols combined */}
          <div className="grid grid-cols-2 gap-6 sm:col-span-2 lg:col-span-3">
            
            {/* Quick Links */}
            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-stone-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-stone-400 transition-colors group-hover:bg-orange-500 dark:bg-stone-600" />
                      <span className="transition-transform group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-stone-900 dark:text-white">
                Legal
              </h3>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-400 dark:hover:text-orange-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-stone-400 transition-colors group-hover:bg-orange-500 dark:bg-stone-600" />
                      <span className="transition-transform group-hover:translate-x-1">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact — 4 cols */}
          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-stone-900 dark:text-white">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlineMapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <span>123 Fitness Avenue, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlinePhone className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href="tel:+8801234567890"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  +880 1234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlineEnvelope className="h-4 w-4 shrink-0 text-orange-500" />
                <a
                  href="mailto:support@gympilot.com"
                  className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
                >
                  support@gympilot.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-200 py-6 sm:flex-row dark:border-white/10">
          <p className="text-xs text-stone-500 dark:text-stone-500">
            &copy; {new Date().getFullYear()} GymPilot. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/privacy-policy"
              className="text-xs text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-500 dark:hover:text-orange-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-500 dark:hover:text-orange-400"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-xs text-stone-500 transition-colors hover:text-orange-500 dark:text-stone-500 dark:hover:text-orange-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50 active:scale-95"
        >
          <HiOutlineArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}