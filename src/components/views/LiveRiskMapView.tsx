import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiskMap } from '../map/RiskMap';
import { LocationSelector } from '../common/LocationSelector';
import { Compass, Info } from 'lucide-react';

export const LiveRiskMapView: React.FC = () => {
  const { t, selectedLocation } = useApp();

  return (
    <div id="aquasense-live-risk-map-view" className="space-y-4 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_live_map')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Interactive multi-layered GIS command map for {selectedLocation.name}, {selectedLocation.district}
          </p>
        </div>
      </div>

      <LocationSelector />

      {/* Full-height GIS map canvas */}
      <RiskMap isFullScreen={true} className="min-h-[620px] lg:min-h-[700px]" />
    </div>
  );
};
