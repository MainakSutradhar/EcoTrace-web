import { useVehicleComparisonData } from '@/components/vehicleComparison/providers/VehicleComparisonDataProvider';

export function VehicleComparisonShell() {
  const { selectedVehicles } = useVehicleComparisonData();

  return (
    <section>
      <div data-selected-vehicles={selectedVehicles.length} />
    </section>
  );
}
