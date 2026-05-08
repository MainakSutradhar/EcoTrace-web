import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Map, Source, Layer, Popup } from 'react-map-gl/maplibre';
import type { FeatureCollection } from 'geojson';
import type { StyleSpecification } from 'maplibre-gl';
import type { LayerProps, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { CarbonRange, useCarbonData } from '@/hooks/useCarbonData';
import {
  CarbonFeature,
  CarbonFeatureCollection,
  mergeCarbonDataWithGeoJson,
} from '@/utils/carbonMap';

const rangeOptions: { label: string; value: CarbonRange }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Week', value: 'this-week' },
  { label: 'Month', value: 'this-month' },
  { label: 'Year', value: 'this-year' },
  { label: 'All-time', value: 'all-time' },
];

const indiaBaseMapStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
  ],
};

const stateFillLayer: LayerProps = {
  id: 'india-state-emissions',
  type: 'fill',
  source: 'india-states',
  paint: {
    'fill-color': [
      'case',
      ['==', ['get', 'hasData'], true],
      [
        'interpolate',
        ['linear'],
        ['get', 'intensity'],
        0,
        '#22c55e',
        0.5,
        '#facc15',
        1,
        '#ef4444',
      ],
      '#e2e8f0',
    ],
    'fill-opacity': ['case', ['==', ['get', 'hasData'], true], 0.78, 0.35],
  },
};

const stateLineLayer: LayerProps = {
  id: 'india-state-boundaries',
  type: 'line',
  source: 'india-states',
  paint: {
    'line-color': '#0f172a',
    'line-opacity': 0.35,
    'line-width': 1,
  },
};

interface HoverInfo {
  longitude: number;
  latitude: number;
  feature: CarbonFeature;
}

function formatNumber(value: number, maximumFractionDigits = 1) {
  return value.toLocaleString('en-IN', { maximumFractionDigits });
}

export default function MapPage() {
  const [range, setRange] = useState<CarbonRange>('today');
  const [indiaGeoJson, setIndiaGeoJson] = useState<FeatureCollection | null>(null);
  const [geoJsonError, setGeoJsonError] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const { data, loading, error } = useCarbonData(range);

  useEffect(() => {
    let isMounted = true;

    const loadIndiaGeoJson = async () => {
      try {
        const response = await fetch('/india-states.geojson');

        if (!response.ok) {
          throw new Error('Could not load India state boundaries.');
        }

        const geoJson = (await response.json()) as FeatureCollection;

        if (isMounted) {
          setIndiaGeoJson(geoJson);
        }
      } catch (err) {
        if (isMounted) {
          setGeoJsonError(err instanceof Error ? err.message : 'Could not load India state boundaries.');
        }
      }
    };

    loadIndiaGeoJson();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setHoverInfo(null);
  }, [range]);

  const mapData = useMemo<CarbonFeatureCollection | null>(() => {
    if (!indiaGeoJson) return null;

    return mergeCarbonDataWithGeoJson(indiaGeoJson, data);
  }, [indiaGeoJson, data]);

  const onMapHover = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0] as unknown as CarbonFeature | undefined;

    if (!feature) {
      setHoverInfo(null);
      return;
    }

    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      feature,
    });
  };

  const isMapLoading = loading || !mapData;
  const activeError = error ?? geoJsonError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">India Carbon Emission Map</h1>
          <p className="text-slate-600">
            State-wise carbon intensity based on aggregated travel emissions.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {rangeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRange(option.value)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                range === option.value
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-[620px]">
          {isMapLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/75 text-sm font-semibold text-slate-500">
              Loading map data...
            </div>
          )}

          {activeError && (
            <div className="absolute left-4 top-4 z-10 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 shadow-sm">
              {activeError}
            </div>
          )}

          <Map
            initialViewState={{
              longitude: 79.5,
              latitude: 22.8,
              zoom: 3.8,
            }}
            minZoom={3}
            maxZoom={8}
            mapStyle={indiaBaseMapStyle}
            interactiveLayerIds={['india-state-emissions']}
            cursor={hoverInfo ? 'pointer' : 'grab'}
            onMouseMove={onMapHover}
            onMouseLeave={() => setHoverInfo(null)}
          >
            {mapData && (
              <Source id="india-states" type="geojson" data={mapData}>
                <Layer {...stateFillLayer} />
                <Layer {...stateLineLayer} />
              </Source>
            )}

            {hoverInfo && (
              <Popup
                longitude={hoverInfo.longitude}
                latitude={hoverInfo.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="top"
              >
                <div className="min-w-44 text-sm">
                  <p className="font-bold text-slate-900">{hoverInfo.feature.properties.stateName}</p>
                  <p className="mt-1 text-slate-600">
                    Carbon: <span className="font-semibold">{formatNumber(hoverInfo.feature.properties.carbonKg)} kg</span>
                  </p>
                  <p className="text-slate-600">
                    Distance:{' '}
                    <span className="font-semibold">
                      {formatNumber(hoverInfo.feature.properties.distanceKm)} km
                    </span>
                  </p>
                </div>
              </Popup>
            )}
          </Map>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 px-5 py-4 text-xs font-semibold text-slate-500">
          <span>Low</span>
          <div className="h-3 w-52 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" />
          <span>High</span>
          <span className="ml-auto">Range: {rangeOptions.find((option) => option.value === range)?.label}</span>
        </div>
      </div>
    </motion.div>
  );
}
