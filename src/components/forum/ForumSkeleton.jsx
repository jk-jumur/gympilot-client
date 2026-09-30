export default function ForumSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 animate-pulse">
      <div className="aspect-[16/10] bg-stone-200 dark:bg-stone-800" />
      <div className="p-4 space-y-3">
        {/* Author */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-1">
            <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-2 w-12 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Title */}
        <div className="h-4 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-4 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />

        {/* Excerpt */}
        <div className="h-3 rounded bg-stone-200 dark:bg-stone-800" />
        <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />

        {/* Meta */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-dashed border-stone-200 dark:border-stone-800">
          <div className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="flex gap-1.5">
            <div className="h-6 w-6 rounded-full bg-stone-200 dark:bg-stone-800" />
            <div className="h-6 w-6 rounded-full bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Button */}
        <div className="h-10 rounded-xl bg-stone-200 dark:bg-stone-800" />
      </div>
    </div>
  );
}