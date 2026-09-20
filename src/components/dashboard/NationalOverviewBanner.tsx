import React from 'react';
import { useApp } from '../../context/AppContext';
import { getNationalStats } from '../../data/india';
import {
  Globe2,
  ShieldAlert,
  Users,
  Activity,
  Waves,
  Zap,
  RotateCcw
} from 'lucide-react';

export const NationalOverviewBanner: React.FC = () => {
  const {
    geographicLevel,
    resetToNationalView,
    drillDownToState,
    activeScenario,
    clearScenario,
    isDemoMode
  } = useApp();

  const stats = getNationalStats();

  const keyStates = [
    { id: 'jammu-kashmir', name: 'Jammu & Kashmir', risk: 'critical' },
    { id: 'assam', name: 'Assam', risk: 'critical' },
    { id: 'maharashtra', name: 'Maharashtra', risk: 'critical' },
    { id: 'uttarakhand', name: 'Uttarakhand', risk: 'critical' },
    { id: 'bihar', name: 'Bihar', risk: 'critical' },
    { id: 'tamil-nadu', name: 'Tamil Nadu', risk: 'high' },
    { id: 'west-bengal', name: 'West Bengal', risk: 'high' },
    { id: 'kerala', name: 'Kerala', risk: 'high' },
    { id: 'delhi', name: 'Delhi NCR', risk: 'high' }
  ];

  return (
    <div
      id="aquasense-national-overview-bar"
      className="bg-[#0b1222]/95 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md relative overflow-hidden"
    >
      {/* Background atmospheric gradient */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Title + SIH Demo Scenario Highlight */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                India National Flood Intelligence & Early Warning Matrix
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                IMD • CWC • NRSC
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-basin hydrological telemetry across 36 States & Union Territories
            </p>
          </div>
        </div>

        {/* Demo Scenario Pill if active */}
        {activeScenario && isDemoMode && (
          <div className="flex items-center gap-2 bg-amber-500/15 border border-amber-500/40 rounded-xl px-3 py-1.5 text-xs text-amber-300">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold truncate max-w-[200px] sm:max-w-xs">
              Scenario: {activeScenario.title}
            </span>
            <button
              onClick={clearScenario}
              className="text-amber-400 hover:text-white ml-1 p-0.5"
              title="Clear Active Scenario"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Metric Counters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-slate-800/80">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-red-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Critical Flood Zones</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-red-400">
              {stats.criticalZones}
            </span>
            <span className="text-[10px] text-red-300/80 font-mono">Red Alert Level</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-orange-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Districts on High Alert</span>
            <Activity className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-orange-400">
              {stats.highRiskDistricts}
            </span>
            <span className="text-[10px] text-orange-300/80 font-mono">{stats.activeWarnings} Warnings</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Population Exposed</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-cyan-300">
              {stats.populationExposed}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Citizens in Risk Zones</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400">Radar & Sensors</span>
            <Waves className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black font-mono text-indigo-300">
              {stats.dataSourcesOnline.active} / {stats.dataSourcesOnline.total}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Telemetry Nodes</span>
          </div>
        </div>
      </div>

      {/* State Quick-Filter & Navigation Ribbon */}
      <div className="flex items-center justify-between gap-3 pt-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto text-xs text-slate-300 w-full sm:w-auto">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0">
            High Priority States:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {keyStates.map(st => (
              <button
                key={st.id}
                id={`priority-state-btn-${st.id}`}
                onClick={() => drillDownToState(st.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                  st.risk === 'critical'
                    ? 'bg-red-950/50 hover:bg-red-900/60 border-red-500/40 text-red-200'
                    : 'bg-orange-950/50 hover:bg-orange-900/60 border-orange-500/40 text-orange-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    st.risk === 'critical' ? 'bg-red-400 animate-pulse' : 'bg-orange-400'
                  }`}
                />
                <span>{st.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle button */}
        {geographicLevel !== 'national' && (
          <button
            onClick={resetToNationalView}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 rounded-lg text-xs font-semibold transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to All-India View</span>
          </button>
        )}
      </div>
    </div>
  );
};
