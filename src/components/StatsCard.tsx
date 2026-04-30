import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  unit: string;
  index: number;
  change?: number;
  icon: LucideIcon;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, unit, index, change, icon: Icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
    >
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</p>
        <div className="p-1.5 bg-emerald-50 rounded-lg">
          <Icon className="w-4 h-4 text-emerald-600" />
        </div>
      </div>
      <div>
        <div className="flex items-baseline mt-1">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-mono text-slate-900 tracking-tight">{value}</h3>
          <span className="ml-1 sm:ml-2 text-[10px] sm:text-sm font-medium text-slate-400 font-sans italic">{unit}</span>
        </div>
        {change !== undefined && (
          <div className={cn(
            "mt-4 flex items-center text-[10px] font-bold uppercase",
            change < 0 ? "text-emerald-600" : "text-rose-500"
          )}>
            {change < 0 ? (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7-7-7 7"/></svg>
            ) : (
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7 7 7-7"/></svg>
            )}
            <span>{Math.abs(change)}% vs yesterday</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
