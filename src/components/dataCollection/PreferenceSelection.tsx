import { Check } from 'lucide-react';
import { preferenceOptions } from './dataCollectionData';

type PreferenceSelectionProps = {
  selectedPreferences: string[];
  onTogglePreference: (id: string) => void;
};

export function PreferenceSelection({
  selectedPreferences,
  onTogglePreference,
}: PreferenceSelectionProps) {
  return (
    <div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#4CAF7D]">
            Preferences
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
            Select what you want to analyze
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[#64748B]">
          Active cards define the data model used for dashboards, reports, and
          route intelligence.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {preferenceOptions.map(({ id, title, description, icon: Icon }) => {
          const isSelected = selectedPreferences.includes(id);

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTogglePreference(id)}
              className={`group rounded-2xl border bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(76,175,125,0.16)] ${
                isSelected
                  ? 'border-[#4CAF7D] ring-4 ring-[#4CAF7D]/10'
                  : 'border-[#E2E8F0] hover:border-[#4CAF7D]/35'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`rounded-xl p-3 transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#4CAF7D] text-white'
                      : 'bg-[#4CAF7D]/10 text-[#4CAF7D] group-hover:bg-[#4CAF7D] group-hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200 ${
                    isSelected
                      ? 'border-[#4CAF7D] bg-[#4CAF7D] text-white'
                      : 'border-[#E2E8F0] text-transparent'
                  }`}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                {description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
