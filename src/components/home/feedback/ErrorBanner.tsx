import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

export function ErrorBanner() {
  const { error } = useDashboardData();

  if (!error) return null;

  return <div className="error-banner">{error}</div>;
}
