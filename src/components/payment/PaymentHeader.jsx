"use client";

import { HiOutlineCreditCard } from "react-icons/hi2";

export default function PaymentHeader() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 items-center justify-center shadow-xl shadow-orange-500/30 mb-5">
        <HiOutlineCreditCard className="h-8 w-8 text-white" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
        Complete Payment
      </h1>

      <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">
        Secure checkout for your class booking
      </p>
    </header>
  );
}