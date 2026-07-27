export default function Loading() {
  return (
    <div className="container-page py-24">
      <div className="animate-pulse space-y-8">
        <div className="h-3 w-32 rounded bg-steel-200" />
        <div className="h-10 w-2/3 rounded bg-steel-200" />
        <div className="h-4 w-full max-w-xl rounded bg-steel-200" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-44 rounded-2xl bg-steel-200/70" />
          ))}
        </div>
      </div>
      <p className="mt-10 text-sm font-medium text-steel-500">Loading content…</p>
    </div>
  )
}