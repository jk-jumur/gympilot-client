"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineArrowUp,
} from "react-icons/hi2";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Classes", href: "/classes" },
  { label: "Community Forum", href: "/forum" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: FaXTwitter, href: "https://twitter.com", label: "X (Twitter)", color: "hover:bg-stone-800 hover:border-stone-700 hover:text-white" },
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600 hover:border-blue-500 hover:text-white" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:border-pink-500 hover:text-white" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600 hover:border-red-500 hover:text-white" },
];

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden
      bg-stone-100 dark:bg-black
      text-stone-600 dark:text-stone-300
      border-t border-stone-200 dark:border-transparent
      transition-colors duration-500">

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-64 w-64 rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-rose-500/5 dark:bg-rose-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 py-14">

          {/* Brand — 5 cols */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 2L4 14h7.5L10.5 22L20 10h-7.5L13.5 2Z" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">
                Gym<span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Pilot</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm mb-6 text-stone-500 dark:text-stone-400">
              Your ultimate fitness partner. Track workouts, explore expert classes, and join a vibrant community to achieve your goals.
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
                    className={`h-10 w-10 rounded-xl
                      border border-stone-200 dark:border-white/10
                      bg-white dark:bg-white/5
                      flex items-center justify-center
                      text-stone-500 dark:text-stone-400
                      hover:-translate-y-1
                      transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links — 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-black uppercase tracking-widest mb-5 text-stone-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm
                      text-stone-500 dark:text-stone-400
                      hover:text-orange-500 dark:hover:text-orange-400
                      transition-colors"
                  >
                    <span className="h-1 w-1 rounded-full bg-stone-400 dark:bg-stone-600 group-hover:bg-orange-500 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 4 cols */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-black uppercase tracking-widest mb-5 text-stone-900 dark:text-white">
              Get In Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlineMapPin className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                <span>123 Fitness Avenue, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlinePhone className="h-4 w-4 text-orange-500 shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  +880 1234 567 890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                <HiOutlineEnvelope className="h-4 w-4 text-orange-500 shrink-0" />
                <a href="mailto:support@gympilot.com" className="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                  support@gympilot.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 dark:border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500 dark:text-stone-500">
            &copy; {new Date().getFullYear()} GymPilot. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-stone-500 dark:text-stone-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-stone-500 dark:text-stone-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-xs text-stone-500 dark:text-stone-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-xl
            bg-gradient-to-br from-orange-500 to-amber-500
            text-white shadow-xl shadow-orange-500/30
            hover:shadow-orange-500/50 hover:scale-110 active:scale-95
            transition-all duration-300 flex items-center justify-center"
        >
          <HiOutlineArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}