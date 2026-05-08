import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiService, transformToTrendData } from '@/services/apiService';
import {
  EmissionDataPoint,
  PublicStatsResponse,
  PublicStatsSummaryResponse,
  PublicVehicleStatsResponse,
  TrendRange,
} from '@/types';

type TrendDataByRange = Record<TrendRange, EmissionDataPoint[]>;

const emptyTrendDataByRange: TrendDataByRange = {
  daily: [],
  weekly: [],
  monthly: [],
  yearly: [],
};

interface DashboardDataContextValue {
  loading: boolean;
  error: string | null;
  summaryStats: PublicStatsSummaryResponse | null;
  trendData: EmissionDataPoint[];
  trendDataByRange: TrendDataByRange;
  monthlyTrend: EmissionDataPoint[];
  vehicleStats: PublicVehicleStatsResponse | null;
  vehicleLoading: boolean;
  loadVehicleStats: () => Promise<void>;
  refreshData: () => Promise<void>;
  setError: (error: string | null) => void;
}

const DashboardDataContext = createContext<DashboardDataContextValue | null>(null);

interface DashboardDataProviderProps {
  children: ReactNode;
}

export function DashboardDataProvider({ children }: DashboardDataProviderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryStats, setSummaryStats] = useState<PublicStatsSummaryResponse | null>(null);
  const [trendData, setTrendData] = useState<EmissionDataPoint[]>([]);
  const [trendDataByRange, setTrendDataByRange] = useState<TrendDataByRange>(emptyTrendDataByRange);
  const [monthlyTrend, setMonthlyTrend] = useState<EmissionDataPoint[]>([]);
  const [vehicleStats, setVehicleStats] = useState<PublicVehicleStatsResponse | null>(null);
  const [vehicleLoading, setVehicleLoading] = useState(false);

  const refreshData = useCallback(async () => {
    setSummaryStats(null);
    setTrendDataByRange(emptyTrendDataByRange);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Backend is waking up... Please wait.')), 25000),
    );

    try {
      const resultsPromise = Promise.allSettled([
        apiService.getSummary(),
        apiService.getStats('monthly'),
        apiService.getLast7Days(),
        apiService.getLast7Weeks(),
        apiService.getLast12Months(),
        apiService.getLast10Years(),
      ]);

      const results = (await Promise.race([resultsPromise, timeoutPromise])) as PromiseSettledResult<any>[];

      if (results[0].status === 'fulfilled' && results[0].value) setSummaryStats(results[0].value);

      if (results[1].status === 'fulfilled' && results[1].value?.data?.length > 0) {
        setMonthlyTrend(transformToTrendData(results[1].value.data));
      }

      const nextTrendDataByRange: TrendDataByRange = { ...emptyTrendDataByRange };

      const setRangeData = (range: TrendRange, result: PromiseSettledResult<PublicStatsResponse>) => {
        if (result.status === 'fulfilled' && result.value?.data) {
          nextTrendDataByRange[range] = transformToTrendData(result.value.data);
        }
      };

      setRangeData('daily', results[2]);
      setRangeData('weekly', results[3]);
      setRangeData('monthly', results[4]);
      setRangeData('yearly', results[5]);

      if (nextTrendDataByRange.daily.length > 0) {
        const dailyTrend = nextTrendDataByRange.daily;
        setTrendData(dailyTrend);
      }

      setTrendDataByRange(nextTrendDataByRange);

      setError(null);
    } catch (err) {
      console.warn('Sync issue:', err);
      setError(`Notice: ${err instanceof Error ? err.message : 'Partial connection'}. Showing latest cached analytics.`);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadVehicleStats = useCallback(async () => {
    if (vehicleStats || vehicleLoading) return;

    setVehicleLoading(true);

    try {
      const response = await apiService.getVehicles();
      setVehicleStats(response);
      setError(null);
    } catch (err) {
      console.warn('Vehicle stats load failed:', err);
      setError(`Notice: ${err instanceof Error ? err.message : 'Could not load vehicle stats'}.`);
    } finally {
      setVehicleLoading(false);
    }
  }, [vehicleStats, vehicleLoading]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const value = useMemo(
    () => ({
      loading,
      error,
      summaryStats,
      trendData,
      trendDataByRange,
      monthlyTrend,
      vehicleStats,
      vehicleLoading,
      loadVehicleStats,
      refreshData,
      setError,
    }),
    [
      loading,
      error,
      summaryStats,
      trendData,
      trendDataByRange,
      monthlyTrend,
      vehicleStats,
      vehicleLoading,
      loadVehicleStats,
      refreshData,
    ],
  );

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error('useDashboardData must be used inside DashboardDataProvider');
  }

  return context;
}
