import { CalendarDays, MessageSquareText, Send } from 'lucide-react';

const inputClassName =
  'w-full rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition-all duration-200 focus:border-[#4CAF7D] focus:ring-4 focus:ring-[#4CAF7D]/10';

type DataCollectionFormProps = {
  liveTracking: boolean;
  carbonAnalysis: boolean;
  publicTransport: boolean;
  onLiveTrackingChange: (enabled: boolean) => void;
  onCarbonAnalysisChange: (enabled: boolean) => void;
  onPublicTransportChange: (enabled: boolean) => void;
};

export function DataCollectionForm({
  liveTracking,
  carbonAnalysis,
  publicTransport,
  onLiveTrackingChange,
  onCarbonAnalysisChange,
  onPublicTransportChange,
}: DataCollectionFormProps) {
  return (
    <form className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-[#4CAF7D]/10 p-3 text-[#4CAF7D]">
          <CalendarDays className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">
            Configure collection details
          </h2>
          <p className="mt-1 text-sm text-[#64748B]">
            Fine-tune source, geography, and analysis options.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#0F172A]">
            Vehicle category
          </span>
          <select className={inputClassName} defaultValue="electric-fleet">
            <option value="electric-fleet">Electric fleet</option>
            <option value="private-vehicle">Private vehicle</option>
            <option value="public-transit">Public transport</option>
            <option value="freight">Freight and logistics</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#0F172A]">
            Region or state
          </span>
          <select className={inputClassName} defaultValue="west-bengal">
            <option value="west-bengal">West Bengal</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="karnataka">Karnataka</option>
            <option value="delhi">Delhi NCR</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#0F172A]">
            Start date
          </span>
          <input className={inputClassName} type="date" />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-[#0F172A]">
            End date
          </span>
          <input className={inputClassName} type="date" />
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-[#0F172A]">
            Time period
          </span>
          <select className={inputClassName} defaultValue="quarterly">
            <option value="weekly">Weekly monitoring</option>
            <option value="monthly">Monthly reporting</option>
            <option value="quarterly">Quarterly analysis</option>
            <option value="custom">Custom range</option>
          </select>
        </label>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <label className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={carbonAnalysis}
            onChange={(event) => onCarbonAnalysisChange(event.target.checked)}
            className="h-4 w-4 rounded border-[#E2E8F0] accent-[#4CAF7D]"
          />
          Carbon emission analysis
        </label>
        <label className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={publicTransport}
            onChange={(event) => onPublicTransportChange(event.target.checked)}
            className="h-4 w-4 rounded border-[#E2E8F0] accent-[#4CAF7D]"
          />
          Public transport data
        </label>
        <label className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-sm font-medium text-[#0F172A]">
          <span>Enable live tracking</span>
          <button
            type="button"
            onClick={() => onLiveTrackingChange(!liveTracking)}
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              liveTracking ? 'bg-[#4CAF7D]' : 'bg-[#CBD5E1]'
            }`}
            aria-pressed={liveTracking}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                liveTracking ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0F172A]">
          <MessageSquareText className="h-4 w-4 text-[#4CAF7D]" />
          Optional notes
        </span>
        <textarea
          className={`${inputClassName} min-h-32 resize-none`}
          placeholder="Add collection rules, exclusions, reporting needs, or team notes..."
        />
      </label>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4CAF7D] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4CAF7D]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3F9C6D] hover:shadow-lg hover:shadow-[#4CAF7D]/25 focus:outline-none focus:ring-4 focus:ring-[#4CAF7D]/20 sm:w-auto"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        Start Data Collection
      </button>
    </form>
  );
}
