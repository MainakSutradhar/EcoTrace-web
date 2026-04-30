import { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, BarChart3, Database, Leaf, Info, Loader2, PlayCircle, CheckCircle2 } from 'lucide-react';
import { StatsCard } from '@/components/StatsCard';
import { TrendChart } from '@/components/TrendChart';
import { MonthlyTrendChart } from '@/components/MonthlyTrendChart';
import { VehiclePieChart } from '@/components/VehiclePieChart';
import { MOCK_SUMMARY, MOCK_TREND_DATA, MOCK_VEHICLE_DATA, MOCK_MONTHLY_TREND } from '@/constants';
import { motion } from 'motion/react';
import { apiService, transformToTrendData } from '@/services/apiService';
import { EmissionDataPoint, PublicStatsResponse } from '@/types';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [dailyStats, setDailyStats] = useState<PublicStatsResponse | null>({
    range: 'daily',
    total: { carbon_kg: MOCK_SUMMARY.daily, distance_km: 1200 },
    data: []
  });
  const [weeklyStats, setWeeklyStats] = useState<PublicStatsResponse | null>({
    range: 'weekly',
    total: { carbon_kg: MOCK_SUMMARY.weekly, distance_km: 8400 },
    data: []
  });
  const [monthlyStats, setMonthlyStats] = useState<PublicStatsResponse | null>({
    range: 'monthly',
    total: { carbon_kg: MOCK_SUMMARY.monthly, distance_km: 34000 },
    data: []
  });
  const [yearlyStats, setYearlyStats] = useState<PublicStatsResponse | null>({
    range: 'yearly',
    total: { carbon_kg: MOCK_SUMMARY.yearly, distance_km: 412000 },
    data: []
  });
  
  const [trendData, setTrendData] = useState<EmissionDataPoint[]>(MOCK_TREND_DATA);
  const [monthlyTrend, setMonthlyTrend] = useState<EmissionDataPoint[]>(MOCK_MONTHLY_TREND);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<number | null>(null);

  const fetchData = async () => {
    // Increase safety timeout for backend cold starts (Render free tier can be slow)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Backend is waking up... Please wait.')), 25000)
    );

    try {
      // Fetch stats that can fail independently
      const resultsPromise = Promise.allSettled([
        apiService.getStats('daily'),
        apiService.getStats('weekly'),
        apiService.getStats('monthly'),
        apiService.getStats('yearly'),
        apiService.getLast7Days(),
      ]);

      const results = await Promise.race([resultsPromise, timeoutPromise]) as PromiseSettledResult<any>[];

      if (results[0].status === 'fulfilled' && results[0].value) setDailyStats(results[0].value);
      if (results[1].status === 'fulfilled' && results[1].value) setWeeklyStats(results[1].value);
      if (results[2].status === 'fulfilled' && results[2].value) setMonthlyStats(results[2].value);
      if (results[3].status === 'fulfilled' && results[3].value) setYearlyStats(results[3].value);
      
      if (results[4].status === 'fulfilled' && results[4].value?.data) {
        setTrendData(transformToTrendData(results[4].value.data));
      }

      // Automatically fallback monthly trend to monthly aggregate since 12-month endpoint is 404
      if (results[2].status === 'fulfilled' && results[2].value?.data?.length > 0) {
        setMonthlyTrend(transformToTrendData(results[2].value.data));
      }
      
      setError(null);
    } catch (err) {
      console.warn('Sync issue:', err);
      setError(`Notice: ${err instanceof Error ? err.message : 'Partial connection'}. Showing latest cached analytics.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSimulateTrace = async () => {
    setIsSimulating(true);
    setLastProcessed(null);
    try {
      const vehicleTypes = ['car', 'bus', 'motorbike', 'train'];
      const records = Array.from({ length: 5 }, () => ({
        timestamp: Math.floor(Date.now() / 1000),
        lat: 22.57 + (Math.random() - 0.5) * 0.1,
        lng: 88.36 + (Math.random() - 0.5) * 0.1,
        distance_km: parseFloat((Math.random() * 2).toFixed(4)),
        vehicle_type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
      }));

      const result = await apiService.ingestBatch(records);
      setLastProcessed(result.processed);
      // Wait for backend processing and refresh
      setTimeout(() => fetchData(), 2000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      console.error('Ingest failed:', err);
      setError(`Simulation Error: ${msg}`);
    } finally {
      setIsSimulating(false);
      setTimeout(() => setLastProcessed(null), 5000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 pb-12">
      {/* Syncing Overlay (Only if we have no live records at all yet) */}
      {loading && dailyStats?.data?.length === 0 && (
         <div className="fixed bottom-10 right-10 z-[100] bg-white border border-slate-200 shadow-2xl p-6 rounded-3xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5">
            <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
            <div>
              <p className="text-slate-700 font-bold uppercase tracking-widest text-[10px]">Syncing Live Feed</p>
              <p className="text-slate-400 text-[9px] font-medium leading-none">Waking up backend infrastructure...</p>
            </div>
         </div>
      )}

      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 md:px-10 py-6 border-b border-slate-200 bg-white sticky top-0 z-50 gap-4 sm:gap-0">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-700 uppercase">
            ECOTRACE <span className="text-slate-400 font-normal">| Public Analytics</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-semibold truncate">Global Aggregate Emission Monitoring</p>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={handleSimulateTrace}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
              lastProcessed ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900 text-white hover:bg-slate-800'
            } disabled:opacity-50`}
          >
            {isSimulating ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : lastProcessed ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <PlayCircle className="w-3 h-3" />
            )}
            {isSimulating ? 'Simulating...' : lastProcessed ? `Processed ${lastProcessed}` : 'Simulate Movement'}
          </button>
          
          <div className="text-right hidden md:block">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Total Active Tracking</p>
            <p className="text-lg font-mono font-bold text-slate-800">
              {dailyStats?.data?.[0]?.user_count || '---'}
            </p>
          </div>
          <div className="h-10 w-[1px] bg-slate-200 hidden md:block"></div>
          <div className="bg-emerald-50 px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider whitespace-nowrap">Live Data Feed</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10 w-full flex flex-col gap-6 sm:gap-10">
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold uppercase tracking-wider text-center">
            {error}
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <StatsCard 
            title="Today" 
            value={dailyStats?.total.carbon_kg.toLocaleString() || '0'} 
            unit="kg CO₂" 
            index={0} 
            change={-2.4} // Mocked change as not in simple API yet 
            icon={LayoutDashboard}
          />
          <StatsCard 
            title="Weekly Avg" 
            value={weeklyStats?.total.carbon_kg.toLocaleString() || '0'} 
            unit="kg CO₂" 
            index={1} 
            icon={Calendar}
          />
          <StatsCard 
            title="Monthly" 
            value={(monthlyStats?.total.carbon_kg || 0) > 1000 ? `${((monthlyStats?.total.carbon_kg || 0) / 1000).toFixed(1)}k` : (monthlyStats?.total.carbon_kg || 0).toString()} 
            unit="kg CO₂" 
            index={2} 
            icon={BarChart3}
          />
          <StatsCard 
            title="Yearly Forecast" 
            value={(yearlyStats?.total.carbon_kg || 0) > 1000 ? `${((yearlyStats?.total.carbon_kg || 0) / 1000).toFixed(0)}k` : (yearlyStats?.total.carbon_kg || 0).toString()} 
            unit="kg CO₂" 
            index={3} 
            icon={Database}
          />
        </div>

        {/* Charts Row 1: Daily Trend & Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="h-[300px] sm:h-[400px] lg:h-[450px]"
            >
              <TrendChart data={trendData} title="Emissions Trend (Last 7 Days)" />
            </motion.div>
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="h-[500px] sm:h-[600px] lg:h-[450px]"
            >
              <VehiclePieChart data={MOCK_VEHICLE_DATA} />
            </motion.div>
          </div>
        </div>

        {/* Charts Row 2: Monthly Trends & Mixed Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="h-[300px] sm:h-[400px] lg:h-full min-h-[350px]"
            >
              <MonthlyTrendChart data={monthlyTrend} title="Annual Comparison" />
            </motion.div>
          </div>
          
          <div className="flex flex-col gap-6 sm:gap-8">
             <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group flex-1">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                     <Leaf className="w-5 h-5 text-emerald-400" />
                     Sustainability Push
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Real-time aggregated distance: <strong>{yearlyStats?.total.distance_km.toLocaleString()} km</strong> tracked. Helping city planners optimize transit routes.
                  </p>
                  <button className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-widest">
                    View Case Study
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl -mr-32 -mt-32 rounded-full group-hover:scale-110 transition-transform"></div>
             </div>
             
             <div className="bg-white border border-slate-200 p-8 rounded-3xl flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-slate-800">
                     <Info className="w-5 h-5 text-emerald-600" />
                     Analysis Metadata
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Data reflects verified sensor readings. Values are updated every hour from synced user devices.
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-4">Last Sync: {new Date().toLocaleTimeString()} UTC</p>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 md:px-10 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-tight gap-4">
          <div className="flex gap-8">
            <span>Global Baseline: 2026 Avg</span>
            <span>Data Refresh: Internal Polling</span>
          </div>
          <div className="flex gap-6 italic text-slate-300 normal-case font-medium">
            Built for Public Awareness • Sustainability Initiative
          </div>
        </div>
      </footer>
    </div>
  );
}
