"use client";

import Image from "next/image";
import {
  HiOutlineClock,
  HiOutlineCalendarDays,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const INCLUDED = [
  "Instant access after payment",
  "Full class session",
  "Expert trainer guidance",
  "Community support",
];

export default function PaymentSummary({ cls }) {
  return (
    <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden shadow-2xl shadow-stone-900/5 dark:shadow-black/20">

      {/* ═══ Class Info ═══ */}
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-56 aspect-video sm:aspect-auto sm:min-h-[220px] bg-stone-100 dark:bg-stone-800 shrink-0">
          <Image
            src={cls.image}
            alt={cls.name}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
              {cls.category}
            </span>
            {cls.difficulty && (
              <>
                <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-stone-700" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  {cls.difficulty}
                </span>
              </>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white leading-tight">
            {cls.name}
          </h2>

          <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5">
            by{" "}
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              {cls.trainer}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-xs text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineClock className="h-3.5 w-3.5" />
              {cls.duration}
            </span>

            {cls.schedule && (
              <span className="inline-flex items-center gap-1.5">
                <HiOutlineCalendarDays className="h-3.5 w-3.5" />
                {cls.schedule}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ═══ Order Summary ═══ */}
      <div className="border-t border-stone-200 dark:border-stone-800 p-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">
          Order Summary
        </h3>

        <dl className="space-y-3">
          <Row label="Class fee" value={`$${cls.price}.00`} />
          <Row label="Platform fee" value="FREE" valueClass="text-emerald-600 dark:text-emerald-400" />
          <Row label="Tax" value="$0.00" />

          <div className="h-px bg-stone-200 dark:bg-stone-800 my-4" />

          <div className="flex items-baseline justify-between">
            <dt className="text-base font-bold text-stone-900 dark:text-white">
              Total
            </dt>
            <dd className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-orange-500">
                ${cls.price}
              </span>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                USD
              </span>
            </dd>
          </div>
        </dl>
      </div>

      {/* ═══ What's Included ═══ */}
      <div className="border-t border-stone-200 dark:border-stone-800 p-6 bg-stone-50 dark:bg-stone-900/50">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-3">
          You'll get
        </h3>

        <ul className="grid sm:grid-cols-2 gap-2.5">
          {INCLUDED.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400"
            >
              <HiOutlineCheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "text-stone-900 dark:text-white" }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <dt className="text-stone-500 dark:text-stone-400">{label}</dt>
      <dd className={`font-semibold ${valueClass}`}>{value}</dd>
    </div>
  );
}