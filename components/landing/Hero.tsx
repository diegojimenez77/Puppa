import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section
      className="relative min-h-[707px] flex items-center justify-center overflow-hidden px-4 md:px-6 py-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #2d3038 0%, #181c22 50%, #3d1a4a 100%)',
          }}
        />
        {/* Purple glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(138,51,169,0.3) 0%, transparent 70%)',
          }}
        />
        {/* Fade to page background — starts at 78% so centered content is never washed out */}
        <div className="absolute inset-0 hero-bottom-fade" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Feature pill */}
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-xs font-semibold tracking-wider mb-6 bg-primary-container"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
            security
          </span>
          NEW FEATURE: ENHANCED SECURITY V2
        </span>

        {/* Headline */}
        <h1
          className="text-4xl md:text-[48px] font-bold tracking-tight text-white max-w-4xl mb-4"
          style={{ lineHeight: '1.15' }}
        >
          Scale Your Enterprise With{' '}
          <span className="text-inverse-primary">Precision &amp; Speed</span>
        </h1>

        {/* Sub-headline */}
        <p
          className="max-w-3xl mb-10"
          style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '28px',
            color: 'rgba(255, 255, 255, 0.82)',
          }}
        >
          SaaS Pro delivers high-performance enterprise tools designed for decision-makers who
          value clarity, efficiency, and robust security.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" size="lg" href="/auth/signup" icon="arrow_forward">
            Get Started Free
          </Button>
          {/* Outlined white button */}
          <a
            href="#how-it-works"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 text-base font-semibold rounded-lg text-white transition-all active:scale-[0.98] hover:bg-[rgba(255,255,255,0.1)]"
            style={{ border: '1px solid rgba(255,255,255,0.4)' }}
          >
            Watch Demo
          </a>
        </div>
      </div>
    </section>
  );
}
