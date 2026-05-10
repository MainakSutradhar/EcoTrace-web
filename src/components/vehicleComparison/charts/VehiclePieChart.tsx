import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { VehicleEmission } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface VehiclePieChartProps {
  data: VehicleEmission[];
}

export const VehiclePieChart: React.FC<VehiclePieChartProps> = ({ data }) => {
  const [activeTypes, setActiveTypes] = useState<string[]>(data.map(d => d.type));

  useEffect(() => {
    setActiveTypes((prev) => {
      const availableTypes = data.map(d => d.type);
      if (prev.length > 0 || availableTypes.length === 0) return prev;
      return availableTypes;
    });
  }, [data]);

  const toggleType = (type: string) => {
    setActiveTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const filteredData = data.filter(d => activeTypes.includes(d.type));
  const totalEmissions = filteredData.reduce((sum, d) => sum + d.emissions, 0);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-sm h-full min-w-0 flex flex-col">
      <h2 className="font-bold text-slate-800 mb-6 sm:mb-8 text-center uppercase tracking-widest text-[10px]">Vehicle Composition</h2>
      
      <div className="w-full min-w-0 h-[260px] sm:h-[320px] lg:h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius="48%"
              outerRadius="70%"
              paddingAngle={filteredData.length > 1 ? 5 : 0}
              dataKey="emissions"
              nameKey="type"
              animationBegin={0}
              animationDuration={800}
            >
              {filteredData.map((entry) => (
                <Cell key={`cell-${entry.type}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.span 
              key={totalEmissions}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-2xl font-black text-slate-900"
            >
              {filteredData.length > 0 ? '100%' : '0%'}
            </motion.span>
          </AnimatePresence>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Current Share</span>
        </div>
      </div>

      {/* Interactive Legend / Filter */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-1 gap-2">
        {data.map((item) => {
          const isActive = activeTypes.includes(item.type);
          return (
            <button
              key={item.type}
              onClick={() => toggleType(item.type)}
              className={cn(
                "flex min-w-0 items-center justify-between gap-3 p-2 rounded-xl transition-all duration-200 group text-left",
                isActive ? "bg-slate-50 border border-slate-100" : "opacity-40 grayscale border border-transparent"
              )}
            >
              <div className="flex min-w-0 items-center">
                <div 
                  className="w-2.5 h-2.5 rounded-full mr-3 shadow-sm transition-transform group-hover:scale-125" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="truncate text-[11px] font-bold text-slate-600 uppercase tracking-tight">{item.type}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-900">{item.emissions.toFixed(2)}%</span>
                <div className={cn(
                  "w-4 h-4 rounded flex items-center justify-center transition-colors",
                  isActive ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                )}>
                  <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-emerald-600" : "bg-slate-400")} />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {activeTypes.length === 0 && (
        <p className="text-[10px] text-center text-slate-400 mt-4 font-medium italic">
          Select a vehicle type to view data
        </p>
      )}
    </div>
  );
};
