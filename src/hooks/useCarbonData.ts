import { useEffect, useState } from 'react';
import { apiService } from '@/services/apiService';
import { PublicStateStatsResponse, StateStatsDataPoint } from '@/types';

export type CarbonRange = 'today' | 'this-week' | 'this-month' | 'this-year' | 'all-time';

interface UseCarbonDataResult {
  data: StateStatsDataPoint[];
  loading: boolean;
  error: string | null;
}

const stateLoaders: Record<CarbonRange, () => Promise<PublicStateStatsResponse>> = {
  today: apiService.getStateToday,
  'this-week': apiService.getStateThisWeek,
  'this-month': apiService.getStateThisMonth,
  'this-year': apiService.getStateThisYear,
  'all-time': apiService.getStateAllTime,
};

export function useCarbonData(range: CarbonRange): UseCarbonDataResult {
  const [data, setData] = useState<StateStatsDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCarbonData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await stateLoaders[range]();

        if (!isMounted) return;

        setData(response.data ?? []);
      } catch (err) {
        if (!isMounted) return;

        setData([]);
        setError(err instanceof Error ? err.message : 'Could not load state carbon data.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCarbonData();

    return () => {
      isMounted = false;
    };
  }, [range]);

  return { data, loading, error };
}
