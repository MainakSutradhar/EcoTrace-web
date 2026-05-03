import { MetricsGrid } from '@/components/home/dashboard/MetricsGrid';
import { DashboardCharts } from '@/components/home/dashboard/DashboardCharts';
import { MonthlyTrendPanel } from '@/components/home/dashboard/MonthlyTrendPanel';
import { InfoPanels } from '@/components/home/dashboard/InfoPanels';

export function DashboardPage() {
  return (
    <>
      <MetricsGrid />
      <DashboardCharts />

      <div className="chart-row-secondary">
        <MonthlyTrendPanel />
        <InfoPanels />
      </div>
    </>
  );
}
