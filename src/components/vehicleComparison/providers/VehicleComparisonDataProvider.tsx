import { createContext, ReactNode, useContext } from 'react';

interface VehicleComparisonDataContextValue {
  selectedVehicles: string[];
}

const VehicleComparisonDataContext = createContext<VehicleComparisonDataContextValue | null>(null);

interface VehicleComparisonDataProviderProps {
  children: ReactNode;
}

export function VehicleComparisonDataProvider({ children }: VehicleComparisonDataProviderProps) {
  return (
    <VehicleComparisonDataContext.Provider value={{ selectedVehicles: [] }}>
      {children}
    </VehicleComparisonDataContext.Provider>
  );
}

export function useVehicleComparisonData() {
  const context = useContext(VehicleComparisonDataContext);

  if (!context) {
    throw new Error('useVehicleComparisonData must be used inside VehicleComparisonDataProvider');
  }

  return context;
}
