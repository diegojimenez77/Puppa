const SMALL_FEATURES = [
  {
    icon: 'security',
    title: 'Enterprise Security',
    description: 'SSO, 2FA, and AES-256 encryption at rest as standard.',
  },
  {
    icon: 'public',
    title: 'Global Scale',
    description: 'Deploy across 24 regions with 99.99% uptime guaranteed.',
  },
  {
    icon: 'bolt',
    title: 'Lightning Fast',
    description: 'Sub-100ms response times globally with edge caching.',
  },
  {
    icon: 'support_agent',
    title: 'Priority Support',
    description: 'Dedicated support team available 24/7 for your team.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-2xl bg-surface-container-low">
      <div className="max-w-[1280px] mx-auto px-4 md:px-lg">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-2xl">
          <div>
            <h2 className="headline-lg text-on-surface mb-md">Built for Power Users</h2>
            <p className="body-md text-on-surface-variant max-w-3xl">
              Comprehensive features that provide the control and transparency your organization
              requires.
            </p>
          </div>
          <button className="label-md text-primary flex items-center gap-xs group self-start md:self-auto">
            View all features
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </button>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg md:h-[580px]">
          {/* Main feature card — 8 cols, full height */}
          <div className="md:col-span-8 md:row-span-2 bg-surface-container-lowest/80 backdrop-blur-[8px] rounded-xl border border-outline-variant p-lg flex flex-col justify-between overflow-hidden group hover:scale-[1.01] hover:shadow-lg transition-all duration-300">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-primary label-sm mb-md">
                ANALYTICS
              </span>
              <h3 className="headline-md mb-md">Real-time Performance Dashboards</h3>
              <p className="body-md text-on-surface-variant max-w-3xl">
                Visualize complex metrics through intuitive, customizable dashboards designed for
                executive overview and deep dives.
              </p>
            </div>
            {/* Dashboard preview placeholder */}
            <div className="mt-lg rounded-lg overflow-hidden border border-outline-variant bg-surface-container-high group-hover:scale-105 transition-transform duration-700">
              <div className="h-48 flex flex-col p-4 gap-3">
                {/* Simulated bar chart */}
                <div className="flex items-end gap-2 h-28">
                  {[40, 65, 85, 55, 95, 75, 60].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <span key={d} className="label-sm text-on-surface-variant text-[10px]">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Small feature cards — 4 cols each, 2 per row */}
          {SMALL_FEATURES.map(({ icon, title, description }) => (
            <div
              key={title}
              className="md:col-span-4 bg-surface-container-lowest rounded-xl border border-outline-variant p-lg flex flex-col gap-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined text-[24px]">{icon}</span>
              </div>
              <h3 className="headline-md">{title}</h3>
              <p className="body-md text-on-surface-variant">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
