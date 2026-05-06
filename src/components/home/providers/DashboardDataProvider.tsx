import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiService, transformToTrendData } from '@/services/apiService';
import { EmissionDataPoint, PublicStatsSummaryResponse, PublicVehicleStatsResponse } from '@/types';

interface DashboardDataContextValue {
  loading: boolean;
  error: string | null;
  summaryStats: PublicStatsSummaryResponse | null;
  trendData: EmissionDataPoint[];
  monthlyTrend: EmissionDataPoint[];
  vehicleStats: PublicVehicleStatsResponse | null;
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
  const [monthlyTrend, setMonthlyTrend] = useState<EmissionDataPoint[]>([]);
  const [vehicleStats, setVehicleStats] = useState<PublicVehicleStatsResponse | null>(null);

  const refreshData = useCallback(async () => {
    setSummaryStats(null);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Backend is waking up... Please wait.')), 25000),
    );

    try {
      const resultsPromise = Promise.allSettled([
        apiService.getSummary(),
        apiService.getStats('monthly'),
        apiService.getLast7Days(),
        apiService.getVehicles(),
      ]);

      const results = (await Promise.race([resultsPromise, timeoutPromise])) as PromiseSettledResult<any>[];

      if (results[0].status === 'fulfilled' && results[0].value) setSummaryStats(results[0].value);

      if (results[1].status === 'fulfilled' && results[1].value?.data?.length > 0) {
        setMonthlyTrend(transformToTrendData(results[1].value.data));
      }

      if (results[2].status === 'fulfilled' && results[2].value?.data) {
        setTrendData(transformToTrendData(results[2].value.data));
      }

      if (results[3].status === 'fulfilled' && results[3].value) {
        setVehicleStats(results[3].value);
      }

      setError(null);
    } catch (err) {
      console.warn('Sync issue:', err);
      setError(`Notice: ${err instanceof Error ? err.message : 'Partial connection'}. Showing latest cached analytics.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const value = useMemo(
    () => ({
      loading,
      error,
      summaryStats,
      trendData,
      monthlyTrend,
      vehicleStats,
      refreshData,
      setError,
    }),
    [loading, error, summaryStats, trendData, monthlyTrend, vehicleStats, refreshData],
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
