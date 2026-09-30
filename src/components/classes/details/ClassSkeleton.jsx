"use client";



export default function ClassSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] sm:h-[55vh] lg:h-[65vh] overflow-hidden bg-stone-200 dark:bg-stone-900">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer" />

        {/* Bottom content placeholder */}
        <div className="absolute bottom-10 sm:bottom-14 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* Badges */}
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded-full bg-white/20 dark:bg-white/10 animate-pulse" />
              <div className="h-7 w-24 rounded-full bg-white/20 dark:bg-white/10 animate-pulse" />
            </div>

            {/* Title lines */}
            <div className="h-12 w-3/4 max-w-2xl rounded-lg bg-white/20 dark:bg-white/10 animate-pulse" />
            <div className="h-12 w-1/2 max-w-md rounded-lg bg-white/20 dark:bg-white/10 animate-pulse" />

            {/* Meta */}
            <div className="h-5 w-48 rounded bg-white/15 dark:bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4"
                  >
                    <div className="h-9 w-9 rounded-lg bg-stone-200 dark:bg-stone-800 animate-pulse mb-3" />
                    <div className="h-3 w-16 rounded bg-stone-200 dark:bg-stone-800 animate-pulse mb-2" />
                    <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  </div>
                ))}
              </div>

              {/* About Section */}
              <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 space-y-4">
                <div className="h-7 w-48 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                <div className="space-y-2.5">
                  <div className="h-4 w-full rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  <div className="h-4 w-full rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  <div className="h-4 w-5/6 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  <div className="h-4 w-4/6 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Right Column — Booking Card Skeleton */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-5">
                <div className="h-10 w-32 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                <div className="h-px bg-stone-200 dark:bg-stone-800" />
                <div className="h-14 w-full rounded-xl bg-stone-200 dark:bg-stone-800 animate-pulse" />
                <div className="h-14 w-full rounded-xl bg-stone-200 dark:bg-stone-800 animate-pulse" />
                <div className="space-y-2 pt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-4/5 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}