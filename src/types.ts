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

export interface SummaryStats {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
  dailyChange: number;
}
