import { useState } from 'react';
import { motion } from 'motion/react';

import { AnalyticsPreview } from '@/components/dataCollection/AnalyticsPreview';
import { DataCollectionForm } from '@/components/dataCollection/DataCollectionForm';
import { DataCollectionHero } from '@/components/dataCollection/DataCollectionHero';
import { OptionalFeatures } from '@/components/dataCollection/OptionalFeatures';
import { PreferenceSelection } from '@/components/dataCollection/PreferenceSelection';

export default function DataCollectionPage() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    'vehicle-type',
    'emission-metrics',
    'route-tracking',
  ]);
  const [liveTracking, setLiveTracking] = useState(true);
  const [carbonAnalysis, setCarbonAnalysis] = useState(true);
  const [publicTransport, setPublicTransport] = useState(false);

  const togglePreference = (id: string) => {
    setSelectedPreferences((current) =>
      current.includes(id)
        ? current.filter((preferenceId) => preferenceId !== id)
        : [...current, id]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative left-1/2 min-h-full w-[calc(100vw-2rem)] -translate-x-1/2 sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-5rem)]"
    >
      <section className="w-full bg-[#F5F7F9] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <DataCollectionHero />

          <PreferenceSelection
            selectedPreferences={selectedPreferences}
            onTogglePreference={togglePreference}
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <DataCollectionForm
              liveTracking={liveTracking}
              carbonAnalysis={carbonAnalysis}
              publicTransport={publicTransport}
              onLiveTrackingChange={setLiveTracking}
              onCarbonAnalysisChange={setCarbonAnalysis}
              onPublicTransportChange={setPublicTransport}
            />
            <AnalyticsPreview />
          </div>

          <OptionalFeatures />
        </div>
      </section>
    </motion.div>
  );
}
