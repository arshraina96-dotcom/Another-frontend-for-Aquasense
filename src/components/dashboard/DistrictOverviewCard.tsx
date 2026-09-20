import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Users, AlertTriangle, ShieldCheck, MapPin, ChevronRight } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const DistrictOverviewCard: React.FC = () => {
  const { t, selectedLocation, locationData, setSelectedLocation } = useApp();
  const { districtStats } = locationData;

  return (
    <div
      id="aquasense-district-overview-card"
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
            Regional Telemetry
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>{selectedLocation.district} District Overview</span>
          </h3>
        </div>
        <RiskBadge level={districtStats.districtRisk} size="sm" />
      </div>

      {/* Grid of 4 Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3.5">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 font-medium">{t('affectedZones')}</span>
          <div className="text-xl font-bold font-mono text-white mt-1">
            {districtStats.affectedZones}
          </div>
          <span className="text-[10px] text-slate-400">Tehsils & Wards</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 font-medium">{t('populationExposure')}</span>
          <div className="text-xl font-bold font-mono text-amber-300 mt-1">
            {districtStats.populationExposure.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">Citizens in basin</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 font-medium">{t('highRiskAreas')}</span>
          <div className="text-xl font-bold font-mono text-red-400 mt-1">
            {districtStats.highRiskAreas}
          </div>
          <span className="text-[10px] text-slate-400">{districtStats.moderateRiskAreas} Moderate</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 font-medium">{t('criticalInfraRisk')}</span>
          <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
            {districtStats.criticalInfraAtRisk}
          </div>
          <span className="text-[10px] text-slate-400">Roads, Bridges, Hosps</span>
        </div>
      </div>

      {/* Hotspot Breakdown in District */}
      <div className="space-y-2 mt-2">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Hyperlocal Municipal Wards</span>
          <span className="text-slate-400 text-[11px]">Click to inspect</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {locationData.hotspots.slice(0, 4).map(spot => (
            <div
              key={spot.name}
              className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">{spot.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Depth: {spot.waterDepthRange}
                  </span>
                </div>
              </div>
              <RiskBadge level={spot.riskLevel} size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
