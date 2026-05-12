export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-zinc-200/70 bg-white/50 p-4 dark:border-zinc-700 dark:bg-zinc-900/40">
      <div className="aspect-[4/5] rounded-2xl bg-zinc-200/80 dark:bg-zinc-700/80" />
      <div className="mt-4 h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-2 h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-4 h-10 w-full rounded-xl bg-zinc-200 dark:bg-zinc-700" />
    </div>
  );
}
