import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { BillingPortalLink } from '@/components/dashboard/billing/BillingPortalButton';
import type { InvoiceRow } from '@/lib/billing/get-billing-data';
import { invoiceStatusVariant } from '@/lib/billing/plans';

interface Props {
  invoices: InvoiceRow[];
  hasStripeCustomer: boolean;
  stripeCustomerId: string | null;
}

export default function InvoiceHistoryTable({
  invoices,
  hasStripeCustomer,
  stripeCustomerId,
}: Props) {
  return (
    <section id="invoices" className="w-full space-y-3 scroll-mt-6">
      <div className="flex items-center justify-between px-1 gap-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Billing History
        </h2>
        {hasStripeCustomer && invoices.length > 0 && (
          <BillingPortalLink
            hasStripeCustomer={hasStripeCustomer}
            stripeCustomerId={stripeCustomerId}
          />
        )}
      </div>

      <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden">
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center text-center py-12 px-6">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-3">
              receipt_long
            </span>
            <p className="font-semibold text-on-surface">No invoices yet</p>
            <p className="text-sm text-on-surface-variant mt-1 max-w-sm">
              {hasStripeCustomer
                ? 'Your payment history will appear here after your first charge.'
                : 'Subscribe to a plan to start receiving invoices.'}
            </p>
            {!hasStripeCustomer && (
              <Link
                href="/pricing"
                className="mt-5 inline-flex items-center justify-center px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-lg text-sm hover:brightness-110 active:scale-[0.98] transition-all"
              >
                View Plans
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-surface-container-high border-b border-outline-variant">
                <tr>
                  {['Date', 'Description', 'Amount', 'Status', ''].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 label-sm text-on-surface-variant whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {invoices.map((invoice, i) => (
                  <tr
                    key={invoice.id}
                    className={`hover:bg-surface-container-low transition-colors ${
                      i % 2 === 1 ? 'bg-surface-container-lowest/60' : ''
                    }`}
                  >
                    <td className="px-5 py-4 body-sm text-on-surface-variant whitespace-nowrap">
                      {invoice.date}
                    </td>
                    <td className="px-5 py-4 body-sm text-on-surface max-w-[200px] truncate">
                      {invoice.description}
                    </td>
                    <td className="px-5 py-4 body-sm font-semibold text-on-surface whitespace-nowrap">
                      {invoice.amount}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant={invoiceStatusVariant(invoice.status)} className="capitalize">
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      {invoice.pdfUrl ? (
                        <a
                          href={invoice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-on-surface-variant hover:text-primary hover:bg-surface-container-high rounded transition-colors inline-flex"
                          aria-label={`Download invoice ${invoice.id}`}
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </a>
                      ) : (
                        <span className="text-on-surface-variant/40 px-1">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
