import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { apiService, transformToTrendData } from '@/services/apiService';
import { EmissionDataPoint, PublicStatsResponse } from '@/types';

interface TrendChartProps {
  data: EmissionDataPoint[];
  title: string;
}

type TrendRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

const trendRanges: Record<
  TrendRange,
  {
    label: string;
    title: string;
    load: () => Promise<PublicStatsResponse>;
  }
> = {
  daily: {
    label: 'Daily',
    title: 'Emissions Trend (Last 7 Days)',
    load: apiService.getLast7Days,
  },
  weekly: {
    label: 'Weekly',
    title: 'Emissions Trend (Last 7 Weeks)',
    load: apiService.getLast7Weeks,
  },
  monthly: {
    label: 'Monthly',
    title: 'Emissions Trend (Last 12 Months)',
    load: apiService.getLast12Months,
  },
  yearly: {
    label: 'Yearly',
    title: 'Emissions Trend (Last 10 Years)',
    load: apiService.getLast10Years,
  },
};

const rangeOptions = Object.entries(trendRanges) as [TrendRange, (typeof trendRanges)[TrendRange]][];

export const TrendChart: React.FC<TrendChartProps> = ({ data, title }) => {
  const [selectedRange, setSelectedRange] = useState<TrendRange>('daily');
  const [chartData, setChartData] = useState<EmissionDataPoint[]>(data);
  const [loadingRange, setLoadingRange] = useState<TrendRange | null>(null);
  const [rangeError, setRangeError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRange === 'daily') {
      setChartData(data);
    }
  }, [data, selectedRange]);

  const handleRangeChange = async (range: TrendRange) => {
    setSelectedRange(range);
    setLoadingRange(range);
    setRangeError(null);

    try {
      const response = await trendRanges[range].load();
      setChartData(transformToTrendData(response.data));
    } catch (err) {
      setRangeError(`Could not load ${trendRanges[range].label.toLowerCase()} trend data.`);
      console.warn('Trend range load failed:', err);
    } finally {
      setLoadingRange(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">
            {selectedRange === 'daily' ? title : trendRanges[selectedRange].title}
          </h3>
          {rangeError && <p className="mt-1 text-xs font-medium text-red-500">{rangeError}</p>}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {rangeOptions.map(([range, config]) => {
            const isSelected = selectedRange === range;
            const isLoading = loadingRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => handleRangeChange(range)}
                disabled={isLoading}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-colors ${
                  isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                } ${isLoading ? 'cursor-wait opacity-70' : ''}`}
                aria-pressed={isSelected}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: 0, right: 32, top: 12, bottom: 8 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#059669', fontWeight: 600 }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
