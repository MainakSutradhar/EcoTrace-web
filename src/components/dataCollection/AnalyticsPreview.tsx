import { MapPinned } from 'lucide-react';
import { analyticsCards } from './dataCollectionData';

export function AnalyticsPreview() {
  return (
    <aside className="flex flex-col gap-6">
      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#4CAF7D]">
              Analytics Preview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#0F172A]">
              Live dashboard widgets
            </h2>
          </div>
          <MapPinned className="h-6 w-6 text-[#4CAF7D]" aria-hidden="true" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {analyticsCards.map(({ title, value, detail, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-[#4CAF7D]/35 hover:shadow-[0_14px_34px_rgba(76,175,125,0.14)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#4CAF7D] shadow-sm">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="rounded-full bg-[#4CAF7D]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2F8F61]">
                  Ready
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                {title}
              </p>
              <p className="mt-1 text-2xl font-bold text-[#0F172A]">{value}</p>
              <p className="mt-1 text-sm text-[#64748B]">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
