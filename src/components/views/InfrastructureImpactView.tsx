import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocationSelector } from '../common/LocationSelector';
import { RiskBadge } from '../common/RiskBadge';
import {
  Building2,
  Hotel,
  School,
  Tent,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Compass,
  Filter
} from 'lucide-react';

export const InfrastructureImpactView: React.FC = () => {
  const { t, selectedLocation, locationData } = useApp();
  const [filterType, setFilterType] = useState<string>('all');

  const items = locationData.infrastructure;

  const filteredItems = items.filter(item => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'hospital':
        return Hotel;
      case 'school':
        return School;
      case 'shelter':
        return Tent;
      case 'road':
      default:
        return Navigation;
    }
  };

  const counts = {
    all: items.length,
    road: items.filter(i => i.type === 'road').length,
    hospital: items.filter(i => i.type === 'hospital').length,
    school: items.filter(i => i.type === 'school').length,
    shelter: items.filter(i => i.type === 'shelter').length
  };

  return (
    <div id="aquasense-infrastructure-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_infrastructure')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Critical Infrastructure Vulnerability, Highway Disruption & Shelter Staging • {selectedLocation.name}
          </p>
        </div>
      </div>

      <LocationSelector />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-1">
        {[
          { id: 'all', label: 'All Assets', count: counts.all },
          { id: 'road', label: t('roadsHighways'), count: counts.road },
          { id: 'hospital', label: t('hospitals'), count: counts.hospital },
          { id: 'school', label: t('schools'), count: counts.school },
          { id: 'shelter', label: t('emergencyShelters'), count: counts.shelter }
        ].map(tab => (
          <button
            key={tab.id}
            id={`infra-tab-${tab.id}`}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              filterType === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 border border-slate-700/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Infrastructure Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredItems.map(item => {
          const Icon = getIcon(item.type);
          const isAtRisk = item.riskLevel === 'critical' || item.riskLevel === 'high';

          return (
            <div
              key={item.id}
              className={`glass-panel p-4 rounded-2xl border shadow-lg flex flex-col justify-between transition-all hover:scale-[1.01] ${
                isAtRisk ? 'border-red-500/30' : 'border-slate-700/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl ${
                        item.type === 'hospital'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : item.type === 'shelter'
                          ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                          : item.type === 'school'
                          ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <RiskBadge level={item.riskLevel} size="sm" />
                </div>

                {/* Status description */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <span className="font-semibold text-white block mb-0.5">Current Operational Status:</span>
                  <span>{item.status}</span>
                </div>

                {/* Road closure ETA & alternate routes if applicable */}
                {item.closureEta && (
                  <div className="mt-2 text-xs text-amber-300 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Inundation ETA: {item.closureEta}</span>
                  </div>
                )}

                {item.alternateRoute && (
                  <div className="mt-1.5 text-xs text-cyan-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Alternate: {item.alternateRoute}</span>
                  </div>
                )}
              </div>

              {/* Capacity / Availability Footer if applicable */}
              <div className="mt-4 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                {item.capacity !== undefined ? (
                  <span>Capacity: <strong className="text-white font-mono">{item.capacity} Beds</strong></span>
                ) : (
                  <span>Sector: City Center</span>
                )}
                <span className="font-mono text-cyan-400">
                  {item.coordinates[1].toFixed(3)}°N, {item.coordinates[0].toFixed(3)}°E
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
