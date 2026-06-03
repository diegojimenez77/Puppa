export default function ProfileLoading() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full animate-pulse">
      <div className="space-y-6 w-full">

        {/* Profile card skeleton */}
        <div className="flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant">
          <div className="w-24 h-24 rounded-full bg-surface-container-highest" />
          <div className="mt-4 space-y-2 w-full flex flex-col items-center">
            <div className="h-7 w-40 bg-surface-container-highest rounded-lg" />
            <div className="h-4 w-52 bg-surface-container-high rounded-lg" />
          </div>
          <div className="mt-5 h-9 w-32 bg-surface-container-highest rounded-full" />
        </div>

        {/* Subscription card skeleton */}
        <div className="space-y-3">
          <div className="h-3 w-24 bg-surface-container-highest rounded" />
          <div className="h-52 rounded-2xl bg-surface-container-highest" />
        </div>

        {/* Quick links skeleton */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              {i > 0 && <div className="h-px bg-outline-variant mx-5" />}
              <div className="flex items-center gap-4 p-5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-highest shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 bg-surface-container-highest rounded" />
                  <div className="h-3 w-48 bg-surface-container-high rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sign out skeleton */}
        <div className="h-14 rounded-2xl bg-surface-container-highest" />
      </div>
    </div>
  );
}
