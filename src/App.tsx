import { DashboardPage } from '@/components/home/layout/DashboardPage';
import { DashboardDataProvider } from '@/components/home/providers/DashboardDataProvider';

export default function App() {
  return (
    <DashboardDataProvider>
      <DashboardPage />
    </DashboardDataProvider>
  );
}
