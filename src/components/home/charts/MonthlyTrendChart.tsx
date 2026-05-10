import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { EmissionDataPoint } from '@/types';

interface MonthlyTrendChartProps {
  data: EmissionDataPoint[];
  title: string;
}

export const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-sm h-full min-w-0 flex flex-col">
      <div className="mb-6 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-snug">{title}</h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 leading-relaxed">Aggregated Monthly Totals (tCO2e)</p>
      </div>
      <div className="w-full min-w-0 h-[320px] sm:h-[380px] lg:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: -10, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
              interval={0}
              padding={{ left: 15, right: 15 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === data.length - 1 ? '#059669' : '#10b981'}
                  fillOpacity={index === data.length - 1 ? 1 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
