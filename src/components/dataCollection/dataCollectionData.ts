import {
  Activity,
  BarChart3,
  BrainCircuit,
  Bus,
  Car,
  Gauge,
  Globe2,
  Leaf,
  Network,
  Route,
  Sparkles,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export type IconCardData = {
  id?: string;
  title: string;
  description?: string;
  value?: string;
  detail?: string;
  icon: LucideIcon;
};

export const preferenceOptions: Required<Pick<IconCardData, 'id' | 'title' | 'description' | 'icon'>>[] = [
  {
    id: 'vehicle-type',
    title: 'Vehicle Type',
    description: 'Classify cars, bikes, buses, freight, or shared mobility assets.',
    icon: Car,
  },
  {
    id: 'fuel-type',
    title: 'Fuel Type',
    description: 'Compare electric, hybrid, petrol, diesel, CNG, and low-carbon fuels.',
    icon: Zap,
  },
  {
    id: 'travel-distance',
    title: 'Travel Distance',
    description: 'Capture trip lengths, commute bands, and distance-based activity.',
    icon: Gauge,
  },
  {
    id: 'emission-metrics',
    title: 'Emission Metrics',
    description: 'Measure CO2 estimates, intensity, and avoided emissions.',
    icon: Leaf,
  },
  {
    id: 'route-tracking',
    title: 'Route Tracking',
    description: 'Map route patterns, corridor usage, and location-aware movement.',
    icon: Route,
  },
  {
    id: 'public-transport',
    title: 'Public Transport Usage',
    description: 'Include bus, rail, metro, and multimodal adoption signals.',
    icon: Bus,
  },
  {
    id: 'sustainability-insights',
    title: 'Sustainability Insights',
    description: 'Surface recommendations for cleaner travel and smarter planning.',
    icon: Sparkles,
  },
];

export const analyticsCards: Required<Pick<IconCardData, 'title' | 'value' | 'detail' | 'icon'>>[] = [
  {
    title: 'Estimated CO2 Tracking',
    value: '2.8t',
    detail: 'forecast this quarter',
    icon: Leaf,
  },
  {
    title: 'Real-Time Monitoring',
    value: 'Active',
    detail: 'live signal pipeline',
    icon: Activity,
  },
  {
    title: 'Smart Mobility Insights',
    value: '14',
    detail: 'patterns ready to review',
    icon: BarChart3,
  },
  {
    title: 'Sustainability Score',
    value: '86',
    detail: 'optimized collection plan',
    icon: Gauge,
  },
];

export const optionalFeatures: Required<Pick<IconCardData, 'title' | 'description' | 'icon'>>[] = [
  {
    title: 'Real-Time Analytics',
    description: 'Monitor mobility events as they arrive with clean operational context.',
    icon: Activity,
  },
  {
    title: 'AI-Powered Insights',
    description: 'Identify anomalies, reduction opportunities, and behavior trends faster.',
    icon: BrainCircuit,
  },
  {
    title: 'Sustainable Monitoring',
    description: 'Keep carbon, route, and adoption metrics aligned with impact goals.',
    icon: Globe2,
  },
  {
    title: 'Intelligent Transportation Analysis',
    description: 'Unify vehicle, public transit, and corridor data for better planning.',
    icon: Network,
  },
];
