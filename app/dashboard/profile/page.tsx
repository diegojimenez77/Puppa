import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

async function signOutAction() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const fullName: string =
    user.user_metadata?.full_name ??
    user.email?.split('@')[0] ??
    'User';

  const initials = fullName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const email = user.email ?? '';

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan_name, status, current_period_end')
    .eq('user_id', user.id)
    .maybeSingle();

  const planName = sub?.plan_name ?? 'Free';
  const renewsOn = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto w-full">
      <div className="space-y-6 w-full">

        {/* Profile card */}
        <section className="w-full flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {initials}
            </div>
            <button
              className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md active:scale-90 transition-transform"
              aria-label="Edit avatar"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-on-surface">{fullName}</h2>
            <p className="text-on-surface-variant text-sm mt-0.5">{email}</p>
          </div>
          <button className="mt-5 px-8 py-2 rounded-full border border-primary text-primary font-semibold text-sm hover:bg-primary/5 active:scale-95 transition-all">
            Edit Profile
          </button>
        </section>

        {/* Subscription card */}
        <section className="w-full space-y-3">
          <h3 className="px-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            Subscription
          </h3>
          <div
            className="w-full p-6 rounded-2xl shadow-lg text-white"
            style={{ background: 'linear-gradient(135deg, #8a33a9 0%, #a855c8 60%, #db87fd 100%)' }}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Current Plan
                </span>
                <h4 className="text-3xl font-extrabold mt-2">{planName} Plan</h4>
                {sub?.status && (
                  <p className="text-white/80 text-sm mt-1 capitalize">{sub.status}</p>
                )}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/20 flex flex-col gap-4">
              {renewsOn && (
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-white/70"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    calendar_today
                  </span>
                  <div>
                    <p className="text-[10px] opacity-70 uppercase font-bold leading-none">Renews on</p>
                    <p className="text-sm font-medium">{renewsOn}</p>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <Link
                  href="/dashboard/profile/billing"
                  className="flex-1 py-3 bg-white text-primary font-bold rounded-xl shadow-md text-sm text-center hover:brightness-95 active:scale-[0.98] transition-all"
                >
                  Manage Plan
                </Link>
                <Link
                  href="/pricing"
                  className="w-12 h-12 bg-white/20 text-white flex items-center justify-center rounded-xl active:scale-90 transition-all"
                  aria-label="Upgrade plan"
                >
                  <span className="material-symbols-outlined">upgrade</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <section className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">

          <Link
            href="/dashboard/profile/billing#invoices"
            className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <div>
                <p className="font-semibold text-on-surface">Billing History</p>
                <p className="text-xs text-on-surface-variant">View past invoices and receipts</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform shrink-0">
              chevron_right
            </span>
          </Link>

          <div className="h-px bg-outline-variant mx-5" />

          <Link
            href="/dashboard/settings"
            className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div>
                <p className="font-semibold text-on-surface">Security</p>
                <p className="text-xs text-on-surface-variant">Password, 2FA, and sessions</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform shrink-0">
              chevron_right
            </span>
          </Link>

          <div className="h-px bg-outline-variant mx-5" />

          <Link
            href="/dashboard/settings"
            className="flex items-center justify-between p-5 hover:bg-surface-container-low transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              <div>
                <p className="font-semibold text-on-surface">Notifications</p>
                <p className="text-xs text-on-surface-variant">Email and push preferences</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform shrink-0">
              chevron_right
            </span>
          </Link>
        </section>

        {/* Sign Out */}
        <form action={signOutAction} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 p-5 bg-error/10 text-error rounded-2xl font-bold hover:bg-error/15 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </form>

      </div>
    </div>
  );
}
