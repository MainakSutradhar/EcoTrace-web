import { EmissionDataPoint, VehicleEmission, SummaryStats } from './types';

export const MOCK_SUMMARY: SummaryStats = {
  daily: 452.8,
  weekly: 3164.2,
  monthly: 12450.5,
  yearly: 148900.0,
  allTime: 1842500.0,
  dailyChange: -4.2,
};

export const MOCK_VEHICLE_DATA: VehicleEmission[] = [
  { type: 'Car', emissions: 65, color: '#ef4444' },
  { type: 'Bus', emissions: 18, color: '#f59e0b' },
  { type: 'Train', emissions: 12, color: '#3b82f6' },
  { type: 'Walking', emissions: 0, color: '#10b981' },
  { type: 'Others', emissions: 5, color: '#94a3b8' },
];

export const MOCK_TREND_DATA: EmissionDataPoint[] = [
  { label: 'Mon', value: 420 },
  { label: 'Tue', value: 380 },
  { label: 'Wed', value: 450 },
  { label: 'Thu', value: 410 },
  { label: 'Fri', value: 490 },
  { label: 'Sat', value: 350 },
  { label: 'Sun', value: 320 },
];

export const MOCK_MONTHLY_TREND: EmissionDataPoint[] = [
  { label: 'Jan', value: 12000 },
  { label: 'Feb', value: 11500 },
  { label: 'Mar', value: 13000 },
  { label: 'Apr', value: 12800 },
];
