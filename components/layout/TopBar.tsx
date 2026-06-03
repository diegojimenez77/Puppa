'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface TopBarProps {
  onMenuClick?: () => void;
  userInitials?: string;
  userName?: string;
  onSignOut?: () => void;
  onManageBilling?: () => void;
  isBillingLoading?: boolean;
}

export default function TopBar({
  onMenuClick,
  userInitials = 'U',
  userName = 'User',
  onSignOut,
  onManageBilling,
  isBillingLoading = false,
}: TopBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 h-16 bg-surface-container-lowest border-b border-outline-variant shadow-sm flex items-center justify-between px-4 md:px-lg">
      {/* Left: hamburger (mobile only) */}
      <div className="flex items-center gap-md">
        <button
          className="lg:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined text-[22px]">menu</span>
        </button>
        <span className="text-xl font-bold text-primary tracking-tight">SaaS Pro</span>
      </div>

      {/* Right: notification bell + avatar */}
      <div className="flex items-center gap-md">
        <button
          className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center label-sm font-bold hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-primary"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
          >
            {userInitials}
          </button>

          {dropdownOpen && (
            <div
              role="menu"
              className="absolute right-0 top-11 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-card py-1 z-50"
            >
              <div className="px-4 py-2 border-b border-outline-variant">
                <p className="label-md text-on-surface font-semibold">{userName}</p>
              </div>
              {[
                { label: 'Profile', icon: 'person', href: '/dashboard/profile' },
                { label: 'Settings', icon: 'settings', href: '/dashboard/settings' },
              ].map(({ label, icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 label-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  {label}
                </Link>
              ))}
              <button
                role="menuitem"
                disabled={isBillingLoading}
                className="w-full flex items-center gap-3 px-4 py-2 label-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => { setDropdownOpen(false); onManageBilling?.(); }}
              >
                <span className={`material-symbols-outlined text-[18px] ${isBillingLoading ? 'animate-spin' : ''}`}>
                  {isBillingLoading ? 'progress_activity' : 'credit_card'}
                </span>
                {isBillingLoading ? 'Loading…' : 'Manage Billing'}
              </button>
              <div className="border-t border-outline-variant my-1" />
              <button
                role="menuitem"
                className="w-full flex items-center gap-3 px-4 py-2 label-md text-error hover:bg-error/8 transition-colors"
                onClick={() => { setDropdownOpen(false); onSignOut?.(); }}
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
