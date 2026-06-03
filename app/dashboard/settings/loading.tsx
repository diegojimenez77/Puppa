export default function SettingsLoading() {
  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full animate-pulse">
      <div className="space-y-8 w-full">

        {/* Profile quick card skeleton */}
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-36 bg-surface-container-highest rounded" />
            <div className="h-4 w-24 bg-surface-container-high rounded" />
          </div>
          <div className="h-5 w-10 bg-surface-container-highest rounded ml-auto" />
        </div>

        {/* App group skeleton */}
        <div className="space-y-4">
          <div className="h-3 w-12 bg-surface-container-highest rounded" />
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-outline-variant mx-4" />}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest shrink-0" />
                    <div className="h-4 w-28 bg-surface-container-highest rounded" />
                  </div>
                  <div className="h-7 w-16 bg-surface-container-highest rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account group skeleton */}
        <div className="space-y-4">
          <div className="h-3 w-16 bg-surface-container-highest rounded" />
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            {[...Array(2)].map((_, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-outline-variant mx-4" />}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-4 w-36 bg-surface-container-highest rounded" />
                      <div className="h-3 w-44 bg-surface-container-high rounded" />
                    </div>
                  </div>
                  <div className="w-5 h-5 bg-surface-container-highest rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy group skeleton */}
        <div className="space-y-4">
          <div className="h-3 w-32 bg-surface-container-highest rounded" />
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-outline-variant mx-4" />}
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest shrink-0" />
                    <div className="h-4 w-32 bg-surface-container-highest rounded" />
                  </div>
                  <div className="w-5 h-5 bg-surface-container-highest rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout skeleton */}
        <div className="h-14 rounded-xl bg-surface-container-highest" />
      </div>
    </div>
  );
}
