import { motion } from 'motion/react';
import { MonthlyTrendChart } from '@/components/home/charts/MonthlyTrendChart';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

export function MonthlyTrendPanel() {
  const { monthlyTrend } = useDashboardData();

  return (
    <div className="monthly-chart-column">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="monthly-chart-frame"
      >
        <MonthlyTrendChart data={monthlyTrend} title="Annual Comparison" />
      </motion.div>
    </div>
  );
}
