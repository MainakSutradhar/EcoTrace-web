import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { DashboardDataProvider } from '@/components/home/providers/DashboardDataProvider';
import { MainLayout } from '@/components/home/layout/MainLayout';

const DashboardPage = lazy(() =>
  import('@/components/home/layout/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  }))
);

const VehiclePage = lazy(() => import('@/pages/VehiclePage'));
const MapPage = lazy(() => import('@/pages/MapPage'));
const StatewisePage = lazy(() => import('@/pages/StatewisePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const DataCollectionPage = lazy(() => import('@/pages/DataCollectionPage'));
const ContactUsPage = lazy(() => import('@/pages/ContactUsPage'));

export default function App() {
  return (
    <DashboardDataProvider>
      <BrowserRouter>
        <MainLayout>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/vehicle" element={<VehiclePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/statewise" element={<StatewisePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/data-collection"
                element={<DataCollectionPage />}
              />
              <Route path="/contact" element={<ContactUsPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </BrowserRouter>
    </DashboardDataProvider>
  );
}
