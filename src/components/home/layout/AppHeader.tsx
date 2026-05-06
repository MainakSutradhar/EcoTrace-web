import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';
import { SideDrawer } from './SideDrawer';

export function AppHeader() {
  const { summaryStats } = useDashboardData();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <header className="app-header">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors group lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-slate-500 group-hover:text-emerald-600" />
          </button>
          
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors group hidden lg:block"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-slate-500 group-hover:text-emerald-600" />
          </button>

          <div>
            <h1 className="app-title">
              ECOTRACE <span className="app-title-muted">| Public Analytics</span>
            </h1>
            <p className="app-subtitle">Global Aggregate Emission Monitoring</p>
          </div>
        </div>
        <div className="header-actions">
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
    </>
  );
}
