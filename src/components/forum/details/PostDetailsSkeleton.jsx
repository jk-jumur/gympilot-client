export default function PostDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
        <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800 mb-6" />
        <div className="h-10 w-3/4 rounded bg-stone-200 dark:bg-stone-800 mb-3" />
        <div className="h-10 w-1/2 rounded bg-stone-200 dark:bg-stone-800 mb-6" />

        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-1.5">
            <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        <div className="aspect-[16/9] rounded-2xl bg-stone-200 dark:bg-stone-800 mb-8" />

        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <div className="h-6 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    </div>
  );
}