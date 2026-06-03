const STEPS = [
  {
    step: '1',
    icon: 'manage_accounts',
    title: 'Setup Account',
    description:
      'Connect your existing data sources in minutes with our native API connectors and one-click cloud integration.',
  },
  {
    step: '2',
    icon: 'tune',
    title: 'Configure Settings',
    description:
      'Our engine processes millions of data points to provide actionable insights and real-time performance tracking.',
  },
  {
    step: '3',
    icon: 'rocket_launch',
    title: 'Launch & Scale',
    description:
      'Execute decisions faster and watch your operational efficiency increase with our automated reporting tools.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-2xl max-w-[1280px] mx-auto px-4 md:px-lg">
      <div className="text-center mb-2xl">
        <h2 className="headline-lg text-on-surface mb-md">Simplified Professional Workflow</h2>
        <p className="body-md text-on-surface-variant max-w-3xl mx-auto">
          Three simple steps to transform how your team handles complex enterprise operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
        {STEPS.map(({ step, icon, title, description }) => (
          <div key={step} className="flex flex-col items-center text-center p-lg group">
            {/* Step badge */}
            <div className="relative mb-lg">
              <div className="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-[32px]">{icon}</span>
              </div>
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white label-sm flex items-center justify-center">
                {step}
              </span>
            </div>
            <h3 className="headline-md mb-sm">{title}</h3>
            <p className="body-md text-on-surface-variant">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
