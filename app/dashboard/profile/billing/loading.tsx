export default function BillingLoading() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full animate-pulse">
      <div className="space-y-6 w-full">

        <div className="space-y-3">
          <div className="h-4 w-32 bg-surface-container-highest rounded" />
          <div className="h-8 w-48 bg-surface-container-highest rounded-lg" />
          <div className="h-4 w-72 bg-surface-container-high rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-3 w-24 bg-surface-container-highest rounded" />
          <div className="h-52 rounded-2xl bg-surface-container-highest" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-surface-container-lowest border border-outline-variant"
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="h-3 w-20 bg-surface-container-highest rounded" />
          <div className="h-36 rounded-2xl bg-surface-container-lowest border border-outline-variant" />
        </div>

        <div className="space-y-3">
          <div className="h-3 w-28 bg-surface-container-highest rounded" />
          <div className="h-48 rounded-2xl bg-surface-container-lowest border border-outline-variant" />
        </div>

        <div className="space-y-3">
          <div className="h-3 w-32 bg-surface-container-highest rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-xl bg-surface-container-lowest border border-outline-variant"
              />
            ))}
          </div>
        </div>

        <div className="h-32 rounded-2xl bg-surface-container-low border border-outline-variant" />
      </div>
    </div>
  );
}
