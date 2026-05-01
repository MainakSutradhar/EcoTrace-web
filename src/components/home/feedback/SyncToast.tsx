import { Loader2 } from 'lucide-react';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

export function SyncToast() {
  const { loading, trendData } = useDashboardData();

  if (!loading || trendData.length > 0) return null;

  return (
    <div className="sync-toast">
      <Loader2 className="sync-toast-icon" />
      <div>
        <p className="sync-toast-title">Syncing Live Feed</p>
        <p className="sync-toast-copy">Waking up backend infrastructure...</p>
      </div>
    </div>
  );
}
