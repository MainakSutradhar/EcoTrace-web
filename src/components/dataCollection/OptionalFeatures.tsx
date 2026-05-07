import { optionalFeatures } from './dataCollectionData';

export function OptionalFeatures() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {optionalFeatures.map(({ title, description, icon: Icon }) => (
        <div
          key={title}
          className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#4CAF7D]/35 hover:shadow-[0_18px_45px_rgba(76,175,125,0.16)]"
        >
          <div className="rounded-xl bg-[#4CAF7D]/10 p-3 text-[#4CAF7D] transition-colors duration-200 group-hover:bg-[#4CAF7D] group-hover:text-white">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <h3 className="mt-5 text-base font-semibold text-[#0F172A]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
}
