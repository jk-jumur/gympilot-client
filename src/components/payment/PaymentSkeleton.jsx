export default function PaymentSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="h-16 w-16 mx-auto rounded-2xl bg-stone-200 dark:bg-stone-800 animate-pulse mb-5" />
          <div className="h-9 w-64 mx-auto rounded bg-stone-200 dark:bg-stone-800 animate-pulse mb-3" />
          <div className="h-4 w-48 mx-auto rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
          {/* Class info */}
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-56 aspect-video sm:aspect-auto sm:min-h-[220px] bg-stone-200 dark:bg-stone-800 animate-pulse" />
            <div className="flex-1 p-6 space-y-3">
              <div className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
              <div className="h-6 w-3/4 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
            </div>
          </div>

          {/* Order summary */}
          <div className="border-t border-stone-200 dark:border-stone-800 p-6 space-y-3">
            <div className="h-5 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
            <div className="h-5 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
            <div className="h-px bg-stone-200 dark:bg-stone-800" />
            <div className="h-7 rounded bg-stone-200 dark:bg-stone-800 animate-pulse" />
          </div>

          {/* Button */}
          <div className="p-6 pt-0">
            <div className="h-14 rounded-2xl bg-stone-200 dark:bg-stone-800 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}