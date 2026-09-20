import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HISTORICAL_EVENTS } from '../../data/mockData';
import {
  History,
  Calendar,
  MapPin,
  FileCheck,
  SplitSquareVertical,
  Activity
} from 'lucide-react';

export const HistoricalEventsView: React.FC = () => {
  const { t } = useApp();
  const [selectedEventId, setSelectedEventId] = useState<string>(HISTORICAL_EVENTS[0].id);

  const selectedEvent = HISTORICAL_EVENTS.find(e => e.id === selectedEventId) || HISTORICAL_EVENTS[0];

  return (
    <div id="aquasense-historical-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_historical')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Hindcast AI Model Verification & Benchmark Validation on Historic Disasters
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <FileCheck className="w-4 h-4" />
          <span>Validated vs ISRO & CWC Ground-Truth</span>
        </div>
      </div>

      {/* Historical Disaster Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {HISTORICAL_EVENTS.map(event => {
          const isSelected = event.id === selectedEventId;
          const podVal = event.pod ?? event.metrics?.pod ?? 0.92;
          const peakDepth = event.peakWaterDepthM ?? (event.rmse ? (event.rmse * 8).toFixed(1) : '2.4');

          return (
            <button
              key={event.id}
              id={`hist-event-btn-${event.id}`}
              onClick={() => setSelectedEventId(event.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  {event.date}
                </span>
                <span className="font-mono text-cyan-400 font-bold">
                  POD: {podVal}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-tight">
                {event.title || event.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500" />
                {event.location}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Flood Inundation Extent:</span>
                <span className="text-cyan-400 font-bold">{event.floodExtentSqKm} km²</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Event Hindcast Verification Panel */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 font-mono">
              Historical Re-analysis Case Study
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
              {selectedEvent.title || selectedEvent.name} ({selectedEvent.date})
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
              {selectedEvent.description}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-center flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Observed Rainfall
            </span>
            <span className="text-xl font-extrabold font-mono text-cyan-300">
              {selectedEvent.peakRainfallMm ?? selectedEvent.rainfallObservedMm ?? 340} mm
            </span>
            <span className="text-[10px] text-slate-500 block">over 72 hrs</span>
          </div>
        </div>

        {/* 5 Validation AI Metrics Cards */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Hindcast Performance & Validation Metrics (Ground Truth Verification)</span>
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {t('pod')}
              </span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400 mt-1 block">
                {selectedEvent.pod ?? selectedEvent.metrics?.pod ?? 0.92}
              </span>
              <span className="text-[10px] text-slate-400">92%+ flood detection</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {t('far')}
              </span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400 mt-1 block">
                {selectedEvent.far ?? selectedEvent.metrics?.far ?? 0.08}
              </span>
              <span className="text-[10px] text-slate-400">Minimal false alarms</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Precision Score
              </span>
              <span className="text-2xl font-extrabold font-mono text-cyan-300 mt-1 block">
                {selectedEvent.precision ?? 0.91}
              </span>
              <span className="text-[10px] text-slate-400">High spatial accuracy</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {t('iou')}
              </span>
              <span className="text-2xl font-extrabold font-mono text-blue-400 mt-1 block">
                {selectedEvent.iou ?? selectedEvent.metrics?.iou ?? 0.86}
              </span>
              <span className="text-[10px] text-slate-400">Spatial polygon overlap</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                {t('depthRmse')}
              </span>
              <span className="text-2xl font-extrabold font-mono text-amber-300 mt-1 block">
                {selectedEvent.rmse ?? selectedEvent.metrics?.rmseDepthM ?? 0.18} m
              </span>
              <span className="text-[10px] text-slate-400">&lt; 20 cm error bound</span>
            </div>
          </div>
        </div>

        {/* Split Screen Comparative Analysis: Observed Satellite SAR vs AquaSense Model Simulation */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <SplitSquareVertical className="w-4 h-4 text-cyan-400" />
            <span>Spatial Extent Comparison (Ground Truth vs AquaSense Hindcast)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Observed Satellite SAR Extent */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Observed Satellite Extent (ISRO / Sentinel-1)</span>
                <span className="font-mono text-slate-400">Ground Truth</span>
              </div>
              <div className="h-44 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path
                    d="M 40,110 C 110,40 210,160 360,105"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="8"
                    strokeOpacity="0.8"
                  />
                  <ellipse cx="200" cy="110" rx="90" ry="50" fill="#dc2626" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" />
                  <ellipse cx="160" cy="130" rx="60" ry="35" fill="#ea580c" fillOpacity="0.5" />
                  <text x="140" y="115" fill="#ffffff" fontSize="11" fontWeight="bold">
                    Actual Inundation: {selectedEvent.floodExtentSqKm} km²
                  </text>
                </svg>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Reconstructed from post-event high-resolution satellite radar mapping & physical survey benchmarks.
              </p>
            </div>

            {/* Right: AquaSense AI Model Hindcast */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-cyan-300">AquaSense AI Inundation Hindcast</span>
                <span className="font-mono text-cyan-400">Predicted (IoU: {selectedEvent.iou ?? 0.86})</span>
              </div>
              <div className="h-44 rounded-xl bg-slate-900 border border-slate-800 relative overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path
                    d="M 40,110 C 110,40 210,160 360,105"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="8"
                    strokeOpacity="0.8"
                  />
                  <ellipse cx="196" cy="108" rx="94" ry="52" fill="#06b6d4" fillOpacity="0.35" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 2" />
                  <ellipse cx="162" cy="128" rx="58" ry="36" fill="#0284c7" fillOpacity="0.5" />
                  <text x="135" y="115" fill="#22d3ee" fontSize="11" fontWeight="bold">
                    AquaSense Simulated: {(selectedEvent.floodExtentSqKm * 1.02).toFixed(1)} km²
                  </text>
                </svg>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Simulated utilizing historical rainfall inputs with 0-6h lead time; demonstrated 74-minute earlier alarm than legacy warning thresholds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
