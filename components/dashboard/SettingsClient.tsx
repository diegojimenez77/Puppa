'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Toggle from '@/components/ui/Toggle';
import { useTheme } from '@/components/ThemeProvider';

interface Props {
  userName: string;
  userEmail: string;
  userInitials: string;
  planName: string;
}

export default function SettingsClient({ userName, userEmail, userInitials, planName }: Props) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full">
      <div className="space-y-8 w-full">

        {/* Profile quick card */}
        <section className="p-6 rounded-xl shadow-sm bg-surface-container-lowest border border-outline-variant flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold border-2 border-primary-container">
              {userInitials}
            </div>
            <div className="absolute bottom-0 right-0 bg-primary w-5 h-5 rounded-full border-2 border-surface-container-lowest flex items-center justify-center">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-on-surface">{userName}</h2>
            <p className="text-sm text-on-surface-variant">{planName} Plan</p>
          </div>
          <button className="ml-auto text-primary font-medium text-sm hover:underline">
            Edit
          </button>
        </section>

        {/* App group */}
        <div className="space-y-4">
          <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-primary/70">App</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant">
            {/* Theme */}
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">palette</span>
                </div>
                <p className="font-medium text-on-surface">Theme</p>
              </div>
              <div className="flex items-center gap-1 bg-surface-container p-1 rounded-full">
                <button
                  onClick={() => setTheme('light')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    theme === 'light' ? 'bg-surface-container-lowest shadow-sm' : ''
                  }`}
                  aria-label="Light mode"
                  aria-pressed={theme === 'light'}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${
                      theme === 'light' ? 'text-primary' : 'text-outline-variant'
                    }`}
                    style={theme === 'light' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    light_mode
                  </span>
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    theme === 'dark' ? 'bg-surface-container-lowest shadow-sm' : ''
                  }`}
                  aria-label="Dark mode"
                  aria-pressed={theme === 'dark'}
                >
                  <span
                    className={`material-symbols-outlined text-sm ${
                      theme === 'dark' ? 'text-primary' : 'text-outline-variant'
                    }`}
                    style={theme === 'dark' ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    dark_mode
                  </span>
                </button>
              </div>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            {/* Language */}
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">language</span>
                </div>
                <p className="font-medium text-on-surface">Language</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-on-surface-variant">English</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">notifications_active</span>
                </div>
                <p className="font-medium text-on-surface">Notifications</p>
              </div>
              <Toggle
                checked={notificationsOn}
                onChange={setNotificationsOn}
                label="Toggle notifications"
              />
            </div>
          </div>
        </div>

        {/* Account group */}
        <div className="space-y-4">
          <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-primary/70">Account</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <div>
                  <p className="font-medium text-on-surface">Profile Information</p>
                  <p className="text-xs text-on-surface-variant">Name, photo, and job title</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">mail</span>
                </div>
                <div>
                  <p className="font-medium text-on-surface">Email Address</p>
                  <p className="text-xs text-on-surface-variant">{userEmail}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Privacy & Security group */}
        <div className="space-y-4">
          <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-primary/70">Privacy &amp; Security</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">lock</span>
                </div>
                <p className="font-medium text-on-surface">Change Password</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">security</span>
                </div>
                <p className="font-medium text-on-surface">Two-Factor Auth</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-[10px] font-bold uppercase bg-error/10 text-error rounded">
                  Recommended
                </span>
                <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">devices</span>
                </div>
                <p className="font-medium text-on-surface">Sessions</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Support group */}
        <div className="space-y-4">
          <h3 className="px-2 text-xs font-bold uppercase tracking-widest text-primary/70">Support</h3>
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary">help</span>
                </div>
                <p className="font-medium text-on-surface">Help Center</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">open_in_new</span>
            </div>
            <div className="h-px bg-outline-variant mx-4" />
            <div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary">info</span>
                </div>
                <p className="font-medium text-on-surface">About SaaSPro</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-on-surface-variant">v2.4.0</span>
                <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 p-4 bg-error/10 text-error rounded-xl font-bold active:scale-[0.98] transition-transform border border-error/10"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}
