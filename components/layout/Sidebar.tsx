'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: 'bar_chart' },
  { label: 'Files', href: '/dashboard/files', icon: 'folder' },
  { label: 'Team', href: '/dashboard/team', icon: 'group' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const navContent = (
    <nav className="flex flex-col gap-xs px-2 pt-lg">
      {NAV_ITEMS.map(({ label, href, icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'flex items-center gap-md px-4 py-3 rounded-full transition-all label-md',
              isActive
                ? 'bg-primary-container text-on-surface font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-high',
            ].join(' ')}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar — always visible on lg+ */}
      <aside className="hidden lg:flex flex-col w-72 bg-surface-container-lowest border-r border-outline-variant fixed left-0 top-16 h-[calc(100vh-64px)] overflow-y-auto">
        {navContent}
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-inverse-surface/40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={[
          'lg:hidden fixed left-0 top-16 h-[calc(100vh-64px)] w-72 z-50',
          'bg-surface-container-lowest border-r border-outline-variant',
          'transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-hidden={!isOpen}
      >
        {navContent}
      </aside>
    </>
  );
}
