import React from 'react';
import { useApp } from '../../context/AppContext';
import { LocationSelector } from '../common/LocationSelector';
import { RiskBadge } from '../common/RiskBadge';
import {
  Waves,
  Droplets,
  Clock,
  Gauge,
  AlertTriangle,
  Layers,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

export const FloodPredictionView: React.FC = () => {
  const { t, selectedLocation, locationData, timelineHour, setTimelineHour } = useApp();
  const { floodPrediction, riverStations } = locationData;

  // Hydrograph simulation data
  const hydrographData = [
    { time: '-6h', level: 15.2, mark: 18.0 },
    { time: '-4h', level: 16.8, mark: 18.0 },
    { time: '-2h', level: 18.4, mark: 18.0 },
    { time: 'Now', level: 21.4, mark: 18.0 },
    { time: '+1h', level: 22.1, mark: 18.0 },
    { time: '+2h', level: 22.8, mark: 18.0 },
    { time: '+3h', level: 23.2, mark: 18.0 },
    { time: '+6h', level: 22.4, mark: 18.0 }
  ];

  return (
    <div id="aquasense-flood-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Waves className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_flood')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            2D Hydrodynamic Saint-Venant Inundation Simulation • {selectedLocation.name}, {selectedLocation.district}
          </p>
        </div>

        <RiskBadge level={floodPrediction.riskLevel} size="md" />
      </div>

      <LocationSelector />

      {/* 3 Overview Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">{t('floodRisk')}</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">
              {floodPrediction.floodProbabilityPercent}%
            </div>
            <span className="text-xs text-orange-400 font-medium">Elevated Surface Water</span>
          </div>
          <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">{t('expectedWaterDepth')}</span>
            <div className="text-3xl font-extrabold text-white font-mono mt-1">
              {floodPrediction.expectedWaterDepthMinM} – {floodPrediction.expectedWaterDepthMaxM} m
            </div>
            <span className="text-xs text-slate-400">Peak: {floodPrediction.maxExpectedDepthM} m</span>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Droplets className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">{t('warningLeadTime')}</span>
            <div className="text-3xl font-extrabold text-amber-300 font-mono mt-1">
              {floodPrediction.timeToThresholdMinutes} min
            </div>
            <span className="text-xs text-slate-400">To Critical Road Submersion</span>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* River Gauging Station Telemetry Cards */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              CWC River Gauging Telemetry Stations
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time Telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {riverStations.map(station => {
            const currentLevel = station.currentLevelFt ?? station.currentLevelM ?? 0;
            const dangerMark = station.dangerMarkFt ?? station.dangerLevelM ?? 18;
            const alertMark = station.alertMarkFt ?? station.warningLevelM ?? 16;
            const isDanger = currentLevel >= dangerMark;
            const isAlert = currentLevel >= alertMark;
            const stationTitle = station.stationName || station.name || 'River Gauge';
            const riverTitle = station.riverName || 'Hydrological Basin';
            const unit = station.currentLevelFt ? 'ft' : 'm';

            return (
              <div
                key={stationTitle}
                className={`p-3.5 rounded-xl border transition-all ${
                  isDanger
                    ? 'bg-red-950/40 border-red-500/50'
                    : isAlert
                    ? 'bg-amber-950/40 border-amber-500/50'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white block">{stationTitle}</span>
                  <span
                    className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      isDanger
                        ? 'bg-red-500/20 text-red-300'
                        : isAlert
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {isDanger ? 'Above Danger' : isAlert ? 'Alert State' : 'Normal'}
                  </span>
                </div>

                <div className="my-2">
                  <span className="text-xl font-extrabold font-mono text-white">
                    {currentLevel} {unit}
                  </span>
                  <span className="text-xs text-slate-400 ml-1.5">
                    (Danger: {dangerMark} {unit})
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span>River: {riverTitle}</span>
                  <span className="font-mono text-cyan-400 uppercase">{station.trend}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* River Hydrograph Inundation Stage Chart */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              Hydrologic River Gauge Stage & Discharge Hydrograph
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Predicted river gauge water level (ft) crossing danger mark over a 12-hour simulation cycle
            </p>
          </div>
          <span className="text-xs text-cyan-400 font-mono">Saint-Venant 2D Model</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hydrographData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" ft" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <ReferenceLine
                y={18.0}
                stroke="#ef4444"
                strokeWidth={2}
                label={{
                  value: 'Danger Mark (18.0 ft)',
                  fill: '#f87171',
                  fontSize: 11,
                  position: 'top'
                }}
              />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{ fill: '#0284c7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
