import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value?: string;
  unit?: string;
  index: number;
  icon: LucideIcon;
  userCount?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, index, icon: Icon, userCount }) => {
  const hasValue = value !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="stats-card"
    >
      <div className="stats-card-header">
        <p className="stats-card-title">{title}</p>
        <div className="stats-card-icon">
          <Icon className="stats-card-icon-svg" />
        </div>
      </div>
      <div>
        <div className={`stats-card-value-row ${hasValue ? '' : 'stats-card-value-row-loading'}`}>
          <h3 className="stats-card-value">{hasValue ? value : '---'}</h3>
          {unit && <span className="stats-card-unit">{unit}</span>}
        </div>
        {userCount !== undefined && (
          <p className="stats-card-subtitle">
            {userCount === 1 ? 'Total User:' : 'Total Users:'} {userCount.toLocaleString()}
          </p>
        )}
      </div>
    </motion.div>
  );
};
