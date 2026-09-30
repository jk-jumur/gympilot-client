"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
  HiOutlineHome,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function PaymentSuccess({ cls }) {

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/booked-classes");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex h-24 w-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 items-center justify-center shadow-2xl shadow-emerald-500/30 mb-6"
        >
          <HiOutlineCheckCircle className="h-12 w-12 text-white" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white mb-3">
          Payment Successful
        </h1>

        <p className="text-sm text-stone-500 dark:text-stone-400 mb-8">
          Your booking for{" "}
          <span className="font-bold text-stone-700 dark:text-stone-300">
            {cls?.name}
          </span>{" "}
          has been confirmed.
        </p>

        <div className="space-y-3">
          <Link
            href="/dashboard/booked-classes"
            className="group w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl
              bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm
              hover:from-orange-600 hover:to-orange-700
              shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50
              transition-all duration-300"
          >
            <HiOutlineCalendarDays className="h-5 w-5" />
            View My Bookings
            <HiOutlineArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl
              bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 font-bold text-sm
              border border-stone-200 dark:border-stone-800
              hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <HiOutlineHome className="h-5 w-5" />
            Back to Home
          </Link>
        </div>

        <p className="text-[11px] text-stone-400 mt-6">
          A confirmation email has been sent to your registered email.
        </p>
      </motion.div>
    </div>
  );
}