import { createClient } from '@/lib/supabase/server';
import Badge from '@/components/ui/Badge';
import CheckoutSuccessBanner from '@/components/dashboard/CheckoutSuccessBanner';

const STATS = [
  { label: 'Active Users',   value: '1,284',  trend: '+8.2%',   icon: 'group',            up: true  },
  { label: 'Revenue',        value: '$42,300', trend: '+14.5%',  icon: 'payments',         up: true  },
  { label: 'Server Uptime',  value: '99.98%',  trend: 'Stable',  icon: 'check_circle',     up: true  },
  { label: 'Open Tickets',   value: '18',      trend: '-3 today',icon: 'confirmation_number', up: false },
];

const FILES = [
  { name: 'Q4_Financial_Report.pdf',       icon: 'description', modified: 'Oct 12, 2024', size: '2.4 MB', status: 'Completed'   },
  { name: 'Customer_Success_Metrics.csv',  icon: 'table_view',  modified: 'Oct 10, 2024', size: '156 KB', status: 'In Progress' },
  { name: 'Asset_Library_V2',              icon: 'folder',      modified: 'Oct 09, 2024', size: '--',     status: 'Archived'    },
  { name: 'Product_Roadmap_Q1.pptx',       icon: 'slideshow',   modified: 'Oct 07, 2024', size: '8.1 MB', status: 'Completed'   },
];

const BAR_DATA = [
  { day: 'Mon', pct: 40 },
  { day: 'Tue', pct: 65 },
  { day: 'Wed', pct: 85 },
  { day: 'Thu', pct: 55 },
  { day: 'Fri', pct: 95 },
  { day: 'Sat', pct: 75 },
  { day: 'Sun', pct: 60 },
];

const QUICK_ACTIONS = [
  { icon: 'add_circle',          label: 'New Task' },
  { icon: 'send',                label: 'Invoice'  },
  { icon: 'group_add',           label: 'Add Team' },
  { icon: 'settings_account_box',label: 'Profile'  },
];

function statusVariant(s: string): 'success' | 'primary' | 'default' {
  if (s === 'Completed')   return 'success';
  if (s === 'In Progress') return 'primary';
  return 'default';
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = (
    user?.user_metadata?.full_name ?? user?.email ?? 'there'
  ).split(' ')[0];

  const params = await searchParams;
  const showSuccess = params.checkout === 'success';

  return (
    <div className="p-4 md:p-6 max-w-[1280px] mx-auto w-full">

      {showSuccess && <CheckoutSuccessBanner />}

      {/* Welcome */}
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-1">
          Welcome back, {firstName}
        </h1>
        <p className="text-body-lg text-on-surface-variant">
          Your business performance is up 12% compared to last month.
        </p>
      </section>

      {/* Bento grid */}
      <div className="grid grid-cols-12 gap-6">

        {/* Bar chart — 8 cols */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
          <div className="flex justify-between items-center mb-6">
            <h2 className="headline-md text-on-surface">Platform Activity</h2>
            <div className="flex gap-2">
              <span className="bg-surface-container-high px-3 py-1 rounded-full label-sm text-on-surface-variant">Daily</span>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full label-sm">Monthly</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2 px-2 h-56">
            {BAR_DATA.map(({ day, pct }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  className="w-full bg-surface-container-highest hover:bg-primary rounded-t-lg transition-colors cursor-pointer"
                  style={{ height: `${pct}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 px-2">
            {BAR_DATA.map(({ day }) => (
              <span key={day} className="flex-1 text-center label-sm text-on-surface-variant">{day}</span>
            ))}
          </div>
        </div>

        {/* Quick actions — 4 cols */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
          <h3 className="headline-md text-on-surface mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {QUICK_ACTIONS.map(({ icon, label }) => (
              <button
                key={label}
                className="flex flex-col items-center justify-center gap-2 p-5 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors active:scale-95 group"
              >
                <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
                  {icon}
                </span>
                <span className="label-md">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats — 4 cards × 3 cols */}
        {STATS.map(({ label, value, trend, icon, up }) => (
          <div
            key={label}
            className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">{icon}</span>
              <p className="label-md text-on-surface-variant">{label}</p>
            </div>
            <p className="text-3xl font-bold text-on-surface mt-2">{value}</p>
            <p className={`label-sm mt-2 flex items-center gap-1 ${up ? 'text-green-600 dark:text-emerald-400' : 'text-orange-500 dark:text-orange-400'}`}>
              <span className="material-symbols-outlined text-sm">
                {up ? 'trending_up' : 'trending_down'}
              </span>
              {trend}
            </p>
          </div>
        ))}

        {/* Recent Files table — 12 cols */}
        <div className="col-span-12 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="headline-md text-on-surface">Recent Project Files</h3>
            <button className="text-primary label-md hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  {['Name', 'Modified', 'Size', 'Status', ''].map((h) => (
                    <th key={h} className="px-6 py-3 label-sm text-on-surface-variant whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {FILES.map((file, i) => (
                  <tr
                    key={file.name}
                    className={`hover:bg-surface-container-low transition-colors ${i % 2 === 1 ? 'bg-surface-container-lowest/60' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="material-symbols-outlined text-primary text-[20px] shrink-0">{file.icon}</span>
                        <span className="body-md truncate">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 body-sm text-on-surface-variant whitespace-nowrap">{file.modified}</td>
                    <td className="px-6 py-4 body-sm text-on-surface-variant">{file.size}</td>
                    <td className="px-6 py-4">
                      <Badge variant={statusVariant(file.status)}>{file.status}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded transition-colors"
                        aria-label={`Actions for ${file.name}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* FAB */}
      <button
        className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
        aria-label="New item"
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
}
