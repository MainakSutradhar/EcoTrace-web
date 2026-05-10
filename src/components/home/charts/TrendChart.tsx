import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { EmissionDataPoint, TrendRange } from '@/types';

interface TrendChartProps {
  data: EmissionDataPoint[];
  dataByRange: Record<TrendRange, EmissionDataPoint[]>;
  title: string;
}

const trendRanges: Record<
  TrendRange,
  {
    label: string;
    title: string;
  }
> = {
  daily: {
    label: 'Daily',
    title: 'Emissions Trend (Last 7 Days)',
  },
  weekly: {
    label: 'Weekly',
    title: 'Emissions Trend (Last 7 Weeks)',
  },
  monthly: {
    label: 'Monthly',
    title: 'Emissions Trend (Last 12 Months)',
  },
  yearly: {
    label: 'Yearly',
    title: 'Emissions Trend (Last 10 Years)',
  },
};

const rangeOptions = Object.entries(trendRanges) as [TrendRange, (typeof trendRanges)[TrendRange]][];

export const TrendChart: React.FC<TrendChartProps> = ({ data, dataByRange, title }) => {
  const [selectedRange, setSelectedRange] = useState<TrendRange>('daily');
  const [chartData, setChartData] = useState<EmissionDataPoint[]>(data);
  const [rangeError, setRangeError] = useState<string | null>(null);

  useEffect(() => {
    const selectedData = dataByRange[selectedRange];
    setChartData(selectedData.length > 0 ? selectedData : data);
  }, [data, dataByRange, selectedRange]);

  const handleRangeChange = (range: TrendRange) => {
    setSelectedRange(range);
    const selectedData = dataByRange[range];

    if (selectedData.length === 0) {
      setRangeError(`Could not load ${trendRanges[range].label.toLowerCase()} trend data.`);
      setChartData(data);
      return;
    }

    setRangeError(null);
    setChartData(selectedData);
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-100 shadow-sm h-full min-w-0 flex flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-6 sm:mb-8">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight leading-snug">
            {selectedRange === 'daily' ? title : trendRanges[selectedRange].title}
          </h3>
          {rangeError && <p className="mt-1 text-xs font-medium text-red-500">{rangeError}</p>}
        </div>
        <div className="grid grid-cols-2 min-[420px]:flex min-[420px]:flex-wrap sm:justify-end gap-2">
          {rangeOptions.map(([range, config]) => {
            const isSelected = selectedRange === range;

            return (
              <button
                key={range}
                type="button"
                onClick={() => handleRangeChange(range)}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-colors ${
                  isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
                aria-pressed={isSelected}
              >
                {config.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full min-w-0 h-[280px] sm:h-[340px] lg:h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ left: -12, right: 12, top: 12, bottom: 8 }}>
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
