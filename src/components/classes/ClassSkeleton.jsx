export default function ClassSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-pulse">
      <div className="aspect-[4/3] bg-stone-200 dark:bg-stone-800" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-3/4" />
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/2" />
        <div className="h-3 bg-stone-200 dark:bg-stone-800 rounded w-1/3" />
        <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded-xl mt-4" />
      </div>
    </div>
  );
}