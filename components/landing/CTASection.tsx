import Link from 'next/link';

const AVATAR_INITIALS = ['AJ', 'SK', 'MR', 'TC'];

export default function CTASection() {
  return (
    <section className="py-2xl px-4 md:px-lg">
      <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-xl md:p-2xl text-center text-white relative overflow-hidden shadow-2xl">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <h2 className="text-3xl md:text-[48px] font-bold leading-tight tracking-tight mb-md">
            Ready to transform your business?
          </h2>
          <p className="body-lg text-white/80 mb-xl max-w-3xl mx-auto">
            Join over 10,000 teams scaling their operations with SaaS Pro&rsquo;s advanced toolset.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-md mb-lg">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-semibold rounded-lg bg-white text-primary hover:bg-white/90 hover:shadow-xl transition-all active:scale-[0.98]"
            >
              Start Free Trial
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center h-14 px-8 text-base font-semibold rounded-lg bg-transparent text-white hover:bg-white/10 transition-all active:scale-[0.98]"
              style={{ border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Contact Sales
            </Link>
          </div>

          {/* Social proof avatars */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center">
              {AVATAR_INITIALS.map((initials, i) => (
                <div
                  key={initials}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white relative"
                  style={{
                    backgroundColor: '#9b3dbf',
                    marginLeft: i === 0 ? '0' : '-0.75rem',
                    zIndex: AVATAR_INITIALS.length - i,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="label-md text-white/80">Join 10,000+ teams</p>
          </div>

          <p className="label-sm text-white/50 mt-lg">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
