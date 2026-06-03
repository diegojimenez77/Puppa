'use client';

import { useState } from 'react';

export default function CheckoutSuccessBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="mb-6 flex items-center gap-3 bg-primary-container text-on-primary-container px-5 py-4 rounded-xl text-sm font-medium">
      <span
        className="material-symbols-outlined text-[20px] shrink-0"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span>
        <strong>Subscription activated!</strong> Your plan is now active. Welcome aboard.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-auto shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
