import { useState } from 'react';
import { CheckCircle2, Loader2, PlayCircle } from 'lucide-react';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';
import { apiService } from '@/services/apiService';

const vehicleTypes = ['car', 'bus', 'motorbike', 'train'];

function buildMockTraceRecords() {
  return Array.from({ length: 5 }, () => ({
    timestamp: Math.floor(Date.now() / 1000),
    lat: 22.57 + (Math.random() - 0.5) * 0.1,
    lng: 88.36 + (Math.random() - 0.5) * 0.1,
    distance_km: parseFloat((Math.random() * 2).toFixed(4)),
    vehicle_type: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
  }));
}

export function AppHeader() {
  const { refreshData, setError, summaryStats } = useDashboardData();
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<number | null>(null);

  const handleSimulateTrace = async () => {
    setIsSimulating(true);
    setLastProcessed(null);

    try {
      const result = await apiService.ingestBatch(buildMockTraceRecords());
      setLastProcessed(result.processed);
      setTimeout(() => refreshData(), 2000);
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
    <header className="app-header">
      <div>
        <h1 className="app-title">
          ECOTRACE <span className="app-title-muted">| Public Analytics</span>
        </h1>
        <p className="app-subtitle">Global Aggregate Emission Monitoring</p>
      </div>
      <div className="header-actions">
        <button
          onClick={handleSimulateTrace}
          disabled={isSimulating}
          className={`simulate-button ${lastProcessed ? 'simulate-button-success' : 'simulate-button-default'}`}
        >
          {isSimulating ? (
            <Loader2 className="simulate-button-icon simulate-button-icon-spin" />
          ) : lastProcessed ? (
            <CheckCircle2 className="simulate-button-icon" />
          ) : (
            <PlayCircle className="simulate-button-icon" />
          )}
          {isSimulating ? 'Simulating...' : lastProcessed ? `Processed ${lastProcessed}` : 'Simulate Movement'}
        </button>

        <div className="active-tracking">
          <p className="active-tracking-label">Total Active Tracking</p>
          <p className="active-tracking-value">{summaryStats?.today.user_count ?? '---'}</p>
        </div>
        <div className="header-divider"></div>
        <div className="live-badge">
          <span className="live-badge-dot"></span>
          <span className="live-badge-text">Live Data Feed</span>
        </div>
      </div>
    </header>
  );
}
