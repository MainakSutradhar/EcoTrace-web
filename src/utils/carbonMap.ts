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

const stateAliases: Record<string, string> = {
  andamanandnicobar: 'andamanandnicobarislands',
  andamanandnicobarislands: 'andamanandnicobarislands',
  dadraandnagarhaveli: 'dadraandnagarhavelianddamananddiu',
  damananddiu: 'dadraandnagarhavelianddamananddiu',
  delhi: 'nctofdelhi',
  jammuandkashmir: 'jammuandkashmir',
  ladakh: 'ladakh',
  nctofdelhi: 'nctofdelhi',
  odisha: 'odisha',
  orissa: 'odisha',
  pondicherry: 'puducherry',
  puducherry: 'puducherry',
  telangana: 'telangana',
  telengana: 'telangana',
};

const displayNamesByKey: Record<string, string> = {
  andamanandnicobarislands: 'Andaman and Nicobar Islands',
  andhrapradesh: 'Andhra Pradesh',
  arunachalpradesh: 'Arunachal Pradesh',
  assam: 'Assam',
  bihar: 'Bihar',
  chandigarh: 'Chandigarh',
  chhattisgarh: 'Chhattisgarh',
  dadraandnagarhaveli: 'Dadra and Nagar Haveli',
  dadraandnagarhavelianddamananddiu: 'Dadra and Nagar Haveli and Daman and Diu',
  damananddiu: 'Daman and Diu',
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
  nctofdelhi: 'NCT of Delhi',
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
};

export function normalizeStateName(value = '') {
  const normalized = value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');

  return stateAliases[normalized] ?? normalized;
}

function getDisplayStateName(value: string) {
  const normalized = value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z]/g, '');
  const key = stateAliases[normalized] ?? normalized;

  return displayNamesByKey[normalized] ?? displayNamesByKey[key] ?? value;
}

function getApiStateName(item: StateStatsDataPoint) {
  return item.state ?? item.state_name ?? item.label ?? item.state_code ?? '';
}

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

export function mergeCarbonDataWithGeoJson(
  geoJson: FeatureCollection,
  carbonData: StateStatsDataPoint[],
): CarbonFeatureCollection {
  const maxCarbonKg = Math.max(...carbonData.map((item) => item.carbon_kg), 0);
  const carbonByState = new Map(
    carbonData.map((item) => [normalizeStateName(getApiStateName(item)), item]),
  );

  const features = geoJson.features.map((feature): CarbonFeature => {
    const rawStateName = getGeoJsonStateName(feature.properties);
    const carbonStats = carbonByState.get(normalizeStateName(rawStateName));
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
    features,
  };
}
