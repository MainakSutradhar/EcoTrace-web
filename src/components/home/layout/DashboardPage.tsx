import { MetricsGrid } from '@/components/home/dashboard/MetricsGrid';
import { DashboardCharts } from '@/components/home/dashboard/DashboardCharts';
import { MonthlyTrendPanel } from '@/components/home/dashboard/MonthlyTrendPanel';
import { InfoPanels } from '@/components/home/dashboard/InfoPanels';
import { ErrorBanner } from '@/components/home/feedback/ErrorBanner';
import { SyncToast } from '@/components/home/feedback/SyncToast';
import { AppFooter } from '@/components/home/layout/AppFooter';
import { AppHeader } from '@/components/home/layout/AppHeader';

export function DashboardPage() {
  return (
    <div className="app-shell">
      <SyncToast />
      <AppHeader />

      <main className="app-main">
        <ErrorBanner />
        <MetricsGrid />
        <DashboardCharts />

        <div className="chart-row-secondary">
          <MonthlyTrendPanel />
          <InfoPanels />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
