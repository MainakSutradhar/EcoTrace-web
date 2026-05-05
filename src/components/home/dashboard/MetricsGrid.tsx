import { Archive, BarChart3, Calendar, Database, LayoutDashboard } from 'lucide-react';
import { StatsCard } from '@/components/home/cards/StatsCard';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

function formatCarbonValue(value = 0) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}k`;
  return value.toLocaleString();
}

export function MetricsGrid() {
  const { summaryStats } = useDashboardData();

  return (
    <div className="metric-card-grid">
      <StatsCard
        title="Today"
        value={summaryStats ? formatCarbonValue(summaryStats.today.carbon_kg) : undefined}
        unit="kg CO2"
        index={0}
        icon={LayoutDashboard}
        userCount={summaryStats?.today.user_count}
      />
      <StatsCard
        title="Weekly Avg"
        value={summaryStats ? formatCarbonValue(summaryStats.this_week.carbon_kg) : undefined}
        unit="kg CO2"
        index={1}
        icon={Calendar}
        userCount={summaryStats?.this_week.user_count}
      />
      <StatsCard
        title="Monthly"
        value={summaryStats ? formatCarbonValue(summaryStats.this_month.carbon_kg) : undefined}
        unit="kg CO2"
        index={2}
        icon={BarChart3}
        userCount={summaryStats?.this_month.user_count}
      />
      <StatsCard
        title="Yearly Forecast"
        value={summaryStats ? formatCarbonValue(summaryStats.this_year.carbon_kg) : undefined}
        unit="kg CO2"
        index={3}
        icon={Database}
        userCount={summaryStats?.this_year.user_count}
      />
      <StatsCard
        title="All Time"
        value={summaryStats ? formatCarbonValue(summaryStats.all_time.carbon_kg) : undefined}
        unit="kg CO2"
        index={4}
        icon={Archive}
        userCount={summaryStats?.all_time.user_count}
      />
    </div>
  );
}
