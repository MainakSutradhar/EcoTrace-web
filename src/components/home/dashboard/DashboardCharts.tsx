import { motion } from 'motion/react';
import { TrendChart } from '@/components/home/charts/TrendChart';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

export function DashboardCharts() {
  const { trendData, trendDataByRange } = useDashboardData();

  return (
    <div className="chart-row-primary">
      <div className="chart-row-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="trend-chart-frame"
        >
          <TrendChart data={trendData} dataByRange={trendDataByRange} title="Emissions Trend (Last 7 Days)" />
        </motion.div>
      </div>
    </div>
  );
}
