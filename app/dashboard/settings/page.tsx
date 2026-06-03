import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import SettingsClient from '@/components/dashboard/SettingsClient';

export default async function SettingsPage() {
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

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan_name')
    .eq('user_id', user.id)
    .maybeSingle();

  const planName = sub?.plan_name ?? 'Free';

  return (
    <SettingsClient
      userName={fullName}
      userEmail={user.email ?? ''}
      userInitials={initials}
      planName={planName}
    />
  );
}
