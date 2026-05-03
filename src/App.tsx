import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@/components/home/layout/DashboardPage';
import { DashboardDataProvider } from '@/components/home/providers/DashboardDataProvider';
import { MainLayout } from '@/components/home/layout/MainLayout';
import VehiclePage from '@/pages/VehiclePage';
import MapPage from '@/pages/MapPage';
import StatewisePage from '@/pages/StatewisePage';
import AboutPage from '@/pages/AboutPage';
import DataCollectionPage from '@/pages/DataCollectionPage';
import ContactUsPage from '@/pages/ContactUsPage';

export default function App() {
  return (
    <DashboardDataProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/vehicle" element={<VehiclePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/statewise" element={<StatewisePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/data-collection" element={<DataCollectionPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </DashboardDataProvider>
  );
}
