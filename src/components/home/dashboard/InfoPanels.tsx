import { Info, Leaf } from 'lucide-react';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';

export function InfoPanels() {
  const { summaryStats } = useDashboardData();
  const lastSync = new Date().toLocaleTimeString();

  return (
    <div className="info-column">
      <div className="sustainability-panel">
        <div className="panel-content">
          <h3 className="panel-title">
            <Leaf className="panel-title-icon panel-title-icon-accent" />
            Sustainability Push
          </h3>
          <p className="panel-copy">
            Real-time aggregated distance:{' '}
            <strong>{summaryStats?.this_year.distance_km.toLocaleString() ?? '---'} km</strong> tracked.
            Helping city planners optimize transit routes.
          </p>
          <button className="panel-button">View Case Study</button>
        </div>
        <div className="sustainability-glow"></div>
      </div>

      <div className="metadata-panel">
        <div>
          <h3 className="metadata-title">
            <Info className="panel-title-icon metadata-title-icon" />
            Analysis Metadata
          </h3>
          <p className="metadata-copy">
            Data reflects verified sensor readings. Values are updated every hour from synced user devices.
          </p>
        </div>
        <p className="last-sync">Last Sync: {lastSync} UTC</p>
      </div>
    </div>
  );
}
