'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/layout/TopBar';
import Sidebar from '@/components/layout/Sidebar';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/components/ui/ToastProvider';

interface Props {
  children: React.ReactNode;
  userName: string;
  userInitials: string;
}

export default function DashboardShell({ children, userName, userInitials }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  const handleManageBilling = async () => {
    setBillingLoading(true);
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast(
          res.status === 404
            ? 'No active subscription found. Subscribe from the Pricing page first.'
            : (data.error ?? 'Could not open billing portal. Please try again.'),
          'error',
        );
      }
    } catch {
      toast('Network error. Please check your connection.', 'error');
    } finally {
      setBillingLoading(false);
    }
  };

  return (
    <>
      <TopBar
        onMenuClick={() => setSidebarOpen(true)}
        userName={userName}
        userInitials={userInitials}
        onSignOut={handleSignOut}
        onManageBilling={handleManageBilling}
        isBillingLoading={billingLoading}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:ml-72 lg:w-[calc(100%-18rem)] pt-16 min-h-screen bg-background">
        {children}
      </main>
    </>
  );
}
