import {
  EmissionDataPoint,
  PublicStateStatsResponse,
  PublicStatsResponse,
  PublicStatsSummaryResponse,
  PublicVehicleStatsResponse,
} from '../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://ecotracebackend-pjo2.onrender.com'; 
const BASE_URL = `${BACKEND_URL}/api/public/stats`;
const STATE_BASE_URL = `${BASE_URL}/state`;

const fetchJson = async <T>(url: string): Promise<T> => {
  console.log(`Fetching: ${url}`);
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const text = await response.text();
      console.error(`Fetch failed for ${url}. Status: ${response.status}. Body: ${text.substring(0, 200)}`);
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
    }

    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error(`Expected JSON but got ${contentType} from ${url}. Body: ${text.substring(0, 200)}`);
      throw new Error(`Invalid Response: Expected JSON but got ${contentType || 'unknown'}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Network or fetch error for ${url}:`, error);
    throw error;
  }
};

export const apiService = {
  fetchJson,

  async getStats(range: 'daily' | 'weekly' | 'monthly' | 'yearly'): Promise<PublicStatsResponse> {
    return fetchJson<PublicStatsResponse>(`${BASE_URL}?range=${range}`);
  },

  async getSummary(): Promise<PublicStatsSummaryResponse> {
    return fetchJson<PublicStatsSummaryResponse>(`${BASE_URL}/summary`);
  },

  async getVehicles(): Promise<PublicVehicleStatsResponse> {
    return fetchJson<PublicVehicleStatsResponse>(`${BASE_URL}/vehicles`);
  },

  async getLast7Days(): Promise<PublicStatsResponse> {
    return fetchJson<PublicStatsResponse>(`${BASE_URL}/last-7-days`);
  },

  async getLast12Months(): Promise<PublicStatsResponse> {
    return fetchJson<PublicStatsResponse>(`${BASE_URL}/last-12-months`);
  },

  async getLast10Years(): Promise<PublicStatsResponse> {
    return fetchJson<PublicStatsResponse>(`${BASE_URL}/last-10-years`);
  },

  async getLast7Weeks(): Promise<PublicStatsResponse> {
    return fetchJson<PublicStatsResponse>(`${BASE_URL}/last-7-weeks`);
  },

  async getStateToday(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/today`);
  },

  async getStateThisWeek(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/this-week`);
  },

  async getStateThisMonth(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/this-month`);
  },

  async getStateThisYear(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/this-year`);
  },

  async getStateAllTime(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/all-time`);
  },

  async getStateLast7Days(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/last-7-days`);
  },

  async getStateLast7Weeks(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/last-7-weeks`);
  },

  async getStateLast12Months(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/last-12-months`);
  },

  async getStateLast10Years(): Promise<PublicStateStatsResponse> {
    return fetchJson<PublicStateStatsResponse>(`${STATE_BASE_URL}/last-10-years`);
  },

  async ingestBatch(records: any[]): Promise<{ success: boolean; processed: number }> {
    const url = `${BACKEND_URL}/api/stats/batch`;
    
    console.log(`Ingesting batch to: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ records }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ingest failed: ${text}`);
    }

    return response.json();
  }
};

export const transformToTrendData = (apiData: PublicStatsResponse['data']): EmissionDataPoint[] => {
  return (apiData || []).map(item => ({
    label: item.label,
    value: item.carbon_kg,
    distance_km: item.distance_km,
    user_count: item.user_count
  }));
};
