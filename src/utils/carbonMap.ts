import { Feature, FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { StateStatsDataPoint } from '@/types';

export interface CarbonFeatureProperties extends GeoJsonProperties {
  stateName: string;
  carbonKg: number;
  distanceKm: number;
  intensity: number;
  hasData: boolean;
}

export type CarbonFeature = Feature<Geometry, CarbonFeatureProperties>;
export type CarbonFeatureCollection = FeatureCollection<Geometry, CarbonFeatureProperties>;

/**
 * Reusable alias mapping for mismatched state names between API and GeoJSON.
 * Maps common variations to a standard display name.
 */
export const STATE_NAME_ALIASES: Record<string, string> = {
  'New Delhi': 'Delhi',
  'NCT of Delhi': 'Delhi',
  'Orissa': 'Odisha',
  'Pondicherry': 'Puducherry',
  'J&K': 'Jammu and Kashmir',
  'Jammu & Kashmir': 'Jammu and Kashmir',
  'Telengana': 'Telangana',
  'Andaman and Nicobar': 'Andaman and Nicobar Islands',
  'Dadra and Nagar Haveli': 'Dadra and Nagar Haveli and Daman and Diu',
  'Daman and Diu': 'Dadra and Nagar Haveli and Daman and Diu',
};

const displayNamesByKey: Record<string, string> = {
  andamanandnicobarislands: 'Andaman and Nicobar Islands',
  andhrapradesh: 'Andhra Pradesh',
  arunachalpradesh: 'Arunachal Pradesh',
  assam: 'Assam',
  bihar: 'Bihar',
  chandigarh: 'Chandigarh',
  chhattisgarh: 'Chhattisgarh',
  dadraandnagarhavelianddamananddiu: 'Dadra and Nagar Haveli and Daman and Diu',
  delhi: 'Delhi',
  goa: 'Goa',
  gujarat: 'Gujarat',
  haryana: 'Haryana',
  himachalpradesh: 'Himachal Pradesh',
  jammuandkashmir: 'Jammu and Kashmir',
  jharkhand: 'Jharkhand',
  karnataka: 'Karnataka',
  kerala: 'Kerala',
  lakshadweep: 'Lakshadweep',
  madhyapradesh: 'Madhya Pradesh',
  maharashtra: 'Maharashtra',
  manipur: 'Manipur',
  meghalaya: 'Meghalaya',
  mizoram: 'Mizoram',
  nagaland: 'Nagaland',
  odisha: 'Odisha',
  puducherry: 'Puducherry',
  punjab: 'Punjab',
  rajasthan: 'Rajasthan',
  sikkim: 'Sikkim',
  tamilnadu: 'Tamil Nadu',
  telangana: 'Telangana',
  tripura: 'Tripura',
  uttarpradesh: 'Uttar Pradesh',
  uttarakhand: 'Uttarakhand',
  westbengal: 'West Bengal',
  ladakh: 'Ladakh',
};

/**
 * Helper to normalize state names into a consistent format (lowercase, no spaces, no special chars).
 * This ensures that "New Delhi", "Delhi", and "NCT of Delhi" all match correctly.
 */
export function normalizeStateName(value = '') {
  if (!value) return '';

  // Basic normalization: lowercase, replace & with and, remove non-alphabetic chars
  const base = value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z]/g, '');

  // Check against aliases
  const aliasMatch = Object.entries(STATE_NAME_ALIASES).find(([alias]) => {
    const normAlias = alias.toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');
    return normAlias === base;
  });

  if (aliasMatch) {
    // Return the normalized version of the target name
    return aliasMatch[1].toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');
  }

  return base;
}

/**
 * Get a pretty display name for a given raw state name.
 */
function getDisplayStateName(value: string) {
  const normalized = normalizeStateName(value);
  return displayNamesByKey[normalized] ?? value;
}

/**
 * Extract state name from API response data point.
 */
function getApiStateName(item: StateStatsDataPoint) {
  return item.state ?? item.state_name ?? item.label ?? item.state_code ?? '';
}

/**
 * Extract state name from GeoJSON feature properties.
 */
function getGeoJsonStateName(properties: GeoJsonProperties) {
  return String(
    properties?.NAME_1 ??
      properties?.ST_NM ??
      properties?.State_Name ??
      properties?.state ??
      properties?.name ??
      '',
  );
}

/**
 * Merges backend carbon emission data with GeoJSON features for map rendering.
 * Normalizes state names to ensure reliable matching across different data sources.
 */
export function mergeCarbonDataWithGeoJson(
  geoJson: FeatureCollection,
  carbonData: StateStatsDataPoint[],
): CarbonFeatureCollection {
  // Find max carbon for intensity calculation
  const maxCarbonKg = Math.max(...carbonData.map((item) => item.carbon_kg), 0);

  // Map of normalized state name to its carbon data
  const carbonByState = new Map<string, StateStatsDataPoint>();
  carbonData.forEach((item) => {
    const apiName = getApiStateName(item);
    if (apiName) {
      carbonByState.set(normalizeStateName(apiName), item);
    }
  });

  const features = geoJson.features.map((feature): CarbonFeature => {
    const rawStateName = getGeoJsonStateName(feature.properties);
    const normalizedName = normalizeStateName(rawStateName);
    const carbonStats = carbonByState.get(normalizedName);

    // Convert snake_case API fields to camelCase frontend properties
    const carbonKg = carbonStats?.carbon_kg ?? 0;
    const distanceKm = carbonStats?.distance_km ?? 0;

    return {
      ...feature,
      properties: {
        ...(feature.properties ?? {}),
        stateName: getDisplayStateName(rawStateName),
        carbonKg,
        distanceKm,
        intensity: maxCarbonKg > 0 ? carbonKg / maxCarbonKg : 0,
        hasData: Boolean(carbonStats),
      },
    } as CarbonFeature;
  });

  return {
    ...geoJson,
    features: features as CarbonFeature[],
  } as CarbonFeatureCollection;
}
