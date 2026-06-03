const LOGOS = [
  { icon: 'bolt', name: 'VOLTA' },
  { icon: 'hub', name: 'NEXUS' },
  { icon: 'language', name: 'GLOBAL' },
  { icon: 'auto_awesome', name: 'SPARK' },
  { icon: 'storage', name: 'CORE' },
];

export default function TrustLogos() {
  return (
    <section className="py-xl bg-surface-container border-y border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 md:px-lg">
        <p className="label-sm text-center text-on-surface-variant uppercase tracking-widest mb-lg">
          Trusted by 500+ companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-xl opacity-50 grayscale">
          {LOGOS.map(({ icon, name }) => (
            <div key={name} className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[24px]">{icon}</span>
              <span className="text-xl font-extrabold tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
