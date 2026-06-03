'use client';

import { createContext, useCallback, useContext, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';
interface ToastItem { id: string; message: string; type: ToastType }
interface ToastContextValue { toast: (message: string, type?: ToastType) => void }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });
export const useToast = () => useContext(ToastContext);

const STYLES: Record<ToastType, { wrap: string; icon: string; iconName: string }> = {
  success: { wrap: 'bg-primary-container text-on-primary-container border-primary/20', icon: 'text-primary',             iconName: 'check_circle' },
  error:   { wrap: 'bg-error-container text-on-error-container border-error/20',       icon: 'text-error',               iconName: 'error'        },
  info:    { wrap: 'bg-surface-container-high text-on-surface border-outline-variant', icon: 'text-on-surface-variant',  iconName: 'info'         },
};

const ANIMATION: React.CSSProperties = {
  animation: 'toast-slide-in 0.2s ease-out',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), 4500);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <style>{`
        @keyframes toast-slide-in {
          from { opacity: 0; transform: translateX(1rem); }
          to   { opacity: 1; transform: translateX(0);    }
        }
      `}</style>
      <div
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none w-[min(360px,calc(100vw-2rem))]"
      >
        {toasts.map(({ id, message, type }) => {
          const s = STYLES[type];
          return (
            <div
              key={id}
              role="alert"
              style={ANIMATION}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl border shadow-card text-sm font-medium ${s.wrap}`}
            >
              <span
                className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${s.icon}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                {s.iconName}
              </span>
              <span className="flex-1">{message}</span>
              <button
                onClick={() => dismiss(id)}
                className="shrink-0 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-primary rounded"
                aria-label="Dismiss notification"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
