"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { authClient } from "@/lib/auth-client";

const ROLES = [
  {
    id: "user",
    icon: HiOutlineUser,
    role: "Users",
    subtitle: "For people who train",
    description:
      "Book classes, save favorites, track progress, and apply to become a trainer.",
    features: [
      "Browse & search 320+ classes",
      "Book with Stripe checkout",
      "Save favorite classes",
      "Track booked sessions",
      "Apply to become a trainer",
      "Vote, comment & reply on forum",
    ],
    cta: "Start Training",
    dashboardPath: "/dashboard",
    accent: "from-blue-500 to-cyan-500",
    accentText: "text-blue-500",
    accentBorder: "border-blue-500/30",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/25",
  },
  {
    id: "trainer",
    icon: HiOutlineAcademicCap,
    role: "Trainers",
    subtitle: "For people who teach",
    description:
      "Create classes, manage students, share knowledge in the forum, and grow your audience.",
    features: [
      "Create, update & delete classes",
      "Upload images via Imgbb",
      "View enrolled students",
      "Publish & manage forum posts",
      "Track class bookings",
      "Verified trainer badge",
    ],
    cta: "Become a Trainer",
    dashboardPath: "/dashboard/trainer",
    accent: "from-orange-500 to-amber-500",
    accentText: "text-orange-500",
    accentBorder: "border-orange-500/30",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
    shadow: "shadow-orange-500/25",
    featured: true,
  },
  {
    id: "admin",
    icon: HiOutlineShieldCheck,
    role: "Admins",
    subtitle: "For people who oversee",
    description:
      "Manage users, approve trainers, moderate classes, and oversee all platform transactions.",
    features: [
      "Manage users & roles",
      "Approve trainer applications",
      "Approve, reject & delete classes",
      "View Stripe transactions",
      "Moderate forum posts",
      "Demote trainers to users",
    ],
    cta: "Admin Panel",
    dashboardPath: "/dashboard/admin",
    accent: "from-purple-500 to-indigo-500",
    accentText: "text-purple-500",
    accentBorder: "border-purple-500/30",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/25",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Ecosystem() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = (user?.role || "").toLowerCase();

  const getCtaConfig = (role) => {
    if (!user) {
      return {
        href: `/login?redirect=${role.dashboardPath}`,
        text: role.cta,
        disabled: false,
      };
    }

    if (userRole === "admin") {
      if (role.id === "admin") {
        return { href: "/dashboard/admin", text: "Go to Dashboard", disabled: false };
      }
      return {
        href: role.id === "trainer" ? "/dashboard/admin/manage-trainers" : "/classes",
        text: role.id === "trainer" ? "Manage Trainers" : "Browse Classes",
        disabled: false,
      };
    }

    if (userRole === role.id) {
      return { href: role.dashboardPath, text: "Go to Dashboard", disabled: false };
    }

    if (userRole === "user" && role.id === "trainer") {
      return { href: "/dashboard/apply-trainer", text: "Apply as Trainer", disabled: false };
    }

    if (role.id === "admin" && userRole !== "admin") {
      return { href: "#", text: "Admin Only", disabled: true };
    }

    if (userRole === "trainer" && role.id === "user") {
      return { href: "/classes", text: "Browse Classes", disabled: false };
    }

    return { href: role.dashboardPath, text: role.cta, disabled: false };
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-32 bg-[#FAF7F2] dark:bg-zinc-950 transition-colors overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-orange-500/[0.04] rounded-full filter blur-[100px] sm:blur-[120px] lg:blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* ═══ Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4 sm:mb-6">
            <HiOutlineSparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.25em] text-orange-600 dark:text-orange-400">
              The Ecosystem
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.03em] sm:tracking-[-0.04em] text-gray-950 dark:text-white leading-[1.1] sm:leading-[1.02] mb-3 sm:mb-5">
            One platform.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Three powerful roles.
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto px-2">
            Every user gets a tailored dashboard with role-based permissions,
            secure access, and features built specifically for their needs.
          </p>
        </motion.div>

        {/* ═══ 3 Role Cards ═══ */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none mx-auto"
        >
          {ROLES.map((role) => {
            const Icon = role.icon;
            const cta = getCtaConfig(role);

            return (
              <motion.div
                key={role.id}
                variants={item}
                whileHover={{ y: -6 }}
                className={`group relative rounded-2xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col ${
                  role.featured
                    ? "bg-gradient-to-br from-orange-500 via-orange-500 to-amber-500 shadow-2xl shadow-orange-500/30 lg:-translate-y-4 lg:scale-[1.02]"
                    : "bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-orange-200 dark:hover:border-zinc-700"
                }`}
              >
                {/* Featured badge */}
                {role.featured && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-b-xl bg-gray-950 text-white text-[10px] font-black uppercase tracking-wider">
                      ⭐ Most Popular
                    </div>
                  </div>
                )}

                {/* Featured glow */}
                {role.featured && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />
                )}

                <div
                  className={`relative p-5 sm:p-7 lg:p-8 flex-1 flex flex-col ${
                    role.featured ? "pt-10 sm:pt-11 lg:pt-12" : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl mb-5 sm:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                      role.featured
                        ? "bg-white/20 backdrop-blur-sm"
                        : `${role.iconBg} shadow-lg ${role.shadow}`
                    }`}
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>

                  {/* Subtitle */}
                  <p
                    className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${
                      role.featured
                        ? "text-white/80"
                        : "text-gray-400 dark:text-zinc-600"
                    }`}
                  >
                    {role.subtitle}
                  </p>

                  {/* Role title */}
                  <h3
                    className={`text-2xl sm:text-3xl font-black tracking-tight mb-3 sm:mb-4 ${
                      role.featured
                        ? "text-white"
                        : "text-gray-950 dark:text-white"
                    }`}
                  >
                    {role.role}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 ${
                      role.featured
                        ? "text-white/90"
                        : "text-gray-600 dark:text-zinc-400"
                    }`}
                  >
                    {role.description}
                  </p>

                  {/* Divider */}
                  <div
                    className={`h-px mb-5 sm:mb-6 ${
                      role.featured
                        ? "bg-white/20"
                        : "bg-gray-100 dark:bg-zinc-800"
                    }`}
                  />

                  {/* Features */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-7 flex-1">
                    {role.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm ${
                          role.featured
                            ? "text-white/95"
                            : "text-gray-700 dark:text-zinc-300"
                        }`}
                      >
                        <HiOutlineCheckCircle
                          className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 mt-0.5 ${
                            role.featured ? "text-white" : role.accentText
                          }`}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {cta.disabled ? (
                    <div
                      className={`inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold self-start cursor-not-allowed opacity-60 ${
                        role.featured
                          ? "bg-white/20 text-white/70 border border-white/20"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 border border-gray-200 dark:border-zinc-700"
                      }`}
                    >
                      <HiOutlineLockClosed className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      {cta.text}
                    </div>
                  ) : (
                    <Link
                      href={cta.href}
                      className={`group/btn inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 self-start ${
                        role.featured
                          ? "bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                          : `border ${role.accentBorder} ${role.accentText} hover:bg-opacity-10 hover:shadow-md`
                      }`}
                    >
                      {cta.text}
                      <HiOutlineArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}