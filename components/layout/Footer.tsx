import Link from 'next/link';

const LINKS = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '#' },
    { label: 'Roadmap', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Status', href: '#' },
    { label: 'Support', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 md:px-lg py-2xl">
        {/* Top: brand + 4-column links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2xl mb-2xl">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">rocket_launch</span>
              <span className="text-base font-bold text-primary">SaaS Pro</span>
            </div>
            <p className="label-md text-on-surface-variant leading-relaxed">
              The all-in-one platform for modern teams to build, ship, and scale.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="label-sm text-on-surface uppercase tracking-wider mb-md">
                {category}
              </h3>
              <ul className="flex flex-col gap-sm">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="label-md text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-outline-variant pt-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="label-sm text-on-surface-variant">
            © {new Date().getFullYear()} SaaS Pro Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-md">
            <button
              aria-label="Share"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <button
              aria-label="Website"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
