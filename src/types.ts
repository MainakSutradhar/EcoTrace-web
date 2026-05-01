export interface EmissionDataPoint {
  label: string;
  value: number;
  distance_km?: number;
  user_count?: number;
}

export interface VehicleEmission {
  type: string;
  emissions: number;
  color: string;
}

export interface VehicleStatsDataPoint {
  vehicle_type: string;
  distance_km: number;
  carbon_kg: number;
  user_count?: number;
}

export interface PublicVehicleStatsResponse {
  range: string;
  total: {
    distance_km: number;
    carbon_kg: number;
  };
  data: VehicleStatsDataPoint[];
}

export interface PublicStatsResponse {
  range: string;
  total: {
    distance_km: number;
    carbon_kg: number;
  };
  data: {
    label: string;
    distance_km: number;
    carbon_kg: number;
    user_count?: number;
  }[];
}

export interface StateStatsDataPoint {
  state?: string;
  state_name?: string;
  state_code?: string;
  label?: string;
  distance_km: number;
  carbon_kg: number;
  user_count?: number;
}

export interface PublicStateStatsResponse {
  range: string;
  total: {
    distance_km: number;
    carbon_kg: number;
  };
  data: StateStatsDataPoint[];
}

export interface SummaryMetric {
  distance_km: number;
  carbon_kg: number;
  user_count: number;
}

export interface PublicStatsSummaryResponse {
  today: SummaryMetric;
  this_week: SummaryMetric;
  this_month: SummaryMetric;
  this_year: SummaryMetric;
  all_time: SummaryMetric;
}

export interface SummaryStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  allTime: number;
  dailyChange: number;
}
