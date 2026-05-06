import { useMemo } from 'react';
import { motion } from 'motion/react';
import { VehiclePieChart } from '@/components/vehicleComparison/charts/VehiclePieChart';
import { useDashboardData } from '@/components/home/providers/DashboardDataProvider';
import { VehicleEmission } from '@/types';

const VEHICLE_COLORS: Record<string, string> = {
  car: '#10b981', // emerald-500
  bus: '#3b82f6', // blue-500
  motorbike: '#f59e0b', // amber-500
  train: '#8b5cf6', // violet-500
  default: '#94a3b8', // slate-400
};

export default function VehiclePage() {
  const { vehicleStats, loading } = useDashboardData();

  const chartData = useMemo(() => {
    if (!vehicleStats?.vehicles) return [];
    
    return vehicleStats.vehicles.map((d): VehicleEmission => ({
      type: d.type,
      // Favor the backend's percentage calculation if available
      emissions: d.percentage ?? (vehicleStats.total.carbon_kg > 0 ? (d.carbon_kg / vehicleStats.total.carbon_kg) * 100 : 0),
      color: VEHICLE_COLORS[d.type.toLowerCase()] || VEHICLE_COLORS.default,
    }));
  }, [vehicleStats]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-4xl mx-auto"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Vehicle Analysis</h1>
        <p className="text-slate-50 mt-2">Distribution of carbon emissions by vehicle type.</p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="h-[500px]">
             <VehiclePieChart data={chartData} />
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Insights</h3>
                <p className="text-slate-600 leading-relaxed">
                    This chart shows the relative contribution of different transportation modes to the total carbon footprint. 
                    Switch between vehicle types in the legend to refocus the analysis.
                </p>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-2">Total Carbon Tracked</h3>
                <p className="text-3xl font-black text-emerald-900">
                    {vehicleStats?.total.carbon_kg.toLocaleString()} <span className="text-sm font-medium">kg CO2</span>
                </p>
                <p className="text-emerald-600 text-sm mt-2 font-medium">
                    Over {vehicleStats?.total.distance_km.toLocaleString()} km traveled
                </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
