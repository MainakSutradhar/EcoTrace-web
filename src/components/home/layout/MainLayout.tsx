import { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { SyncToast } from '@/components/home/feedback/SyncToast';
import { ErrorBanner } from '@/components/home/feedback/ErrorBanner';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <SyncToast />
      <AppHeader />

      <main className="app-main">
        <ErrorBanner />
        {children}
      </main>

      <AppFooter />
    </div>
  );
}
