export default function DashboardLoading() {
  return (
    <div className="p-4 md:p-6 max-w-[1280px] mx-auto w-full animate-pulse">
      {/* Welcome skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-10 w-80 bg-surface-container-highest rounded-lg" />
        <div className="h-5 w-96 bg-surface-container-high rounded-lg" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Chart */}
        <div className="col-span-12 lg:col-span-8 h-80 bg-surface-container-highest rounded-xl" />
        {/* Quick actions */}
        <div className="col-span-12 lg:col-span-4 h-80 bg-surface-container-highest rounded-xl" />
        {/* Stats */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="col-span-12 sm:col-span-6 lg:col-span-3 h-28 bg-surface-container-highest rounded-xl" />
        ))}
        {/* Table */}
        <div className="col-span-12 h-64 bg-surface-container-highest rounded-xl" />
      </div>
    </div>
  );
}
