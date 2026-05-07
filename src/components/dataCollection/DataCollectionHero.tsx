import { Leaf, TrainFront } from 'lucide-react';

export function DataCollectionHero() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#4CAF7D]/20 bg-[#4CAF7D]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#2F8F61]">
          <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
          Smart Data Collection
        </span>
        <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
          Customize sustainability data streams for smarter mobility analytics
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#64748B] sm:text-lg">
          Choose the transportation, emissions, route, and usage signals you want
          to collect, then shape a clean analytics workflow around your
          operational sustainability goals.
        </p>
      </div>

      <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Collection Readiness
            </p>
            <p className="mt-2 text-4xl font-bold text-[#0F172A]">92%</p>
          </div>
          <div className="rounded-2xl bg-[#4CAF7D]/10 p-4 text-[#4CAF7D]">
            <TrainFront className="h-7 w-7" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-6 h-3 rounded-full bg-[#E2E8F0]">
          <div className="h-3 w-[92%] rounded-full bg-[#4CAF7D]" />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {['Mobility', 'Carbon', 'Routes'].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-3 text-center"
            >
              <p className="text-xs font-semibold text-[#0F172A]">{item}</p>
              <p className="mt-1 text-[11px] text-[#64748B]">ready</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
