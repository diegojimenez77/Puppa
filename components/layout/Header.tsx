'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Pricing', href: '/pricing' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-sm',
        'border-b border-outline-variant transition-shadow duration-300',
        scrolled ? 'shadow-sm' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="h-16 flex items-center justify-between px-4 md:px-lg max-w-[1280px] mx-auto w-full">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px]">rocket_launch</span>
          <span className="text-xl font-bold text-primary tracking-tight">SaaS Pro</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={[
                'label-md px-3 py-2 rounded-lg transition-colors',
                pathname === href
                  ? 'text-primary font-semibold bg-surface-container-low'
                  : 'text-on-surface-variant hover:bg-surface-container-low',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outlined" size="sm" href="/auth/login">
            Sign In
          </Button>
          <Button variant="primary" size="sm" href="/auth/signup">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-on-surface-variant"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <span className="material-symbols-outlined text-[24px]">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="label-md text-on-surface-variant hover:text-primary px-3 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-outline-variant">
            <Button variant="outlined" size="md" fullWidth href="/auth/login">
              Sign In
            </Button>
            <Button variant="primary" size="md" fullWidth href="/auth/signup">
              Get Started
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
