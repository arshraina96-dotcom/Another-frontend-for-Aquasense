import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  X,
  Printer,
  Radio,
  CheckCircle2,
  Users,
  Ambulance,
  Home,
  ShieldAlert,
  Send,
  Download
} from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const EmergencySOPModal: React.FC = () => {
  const {
    isSOPModalOpen,
    setIsSOPModalOpen,
    selectedLocation,
    locationData,
    t,
    showToast
  } = useApp();

  const [capDispatched, setCapDispatched] = useState(false);

  if (!isSOPModalOpen) return null;

  const { floodPrediction } = locationData;

  const handlePrint = () => {
    window.print();
  };

  const handleDispatchCAP = () => {
    setCapDispatched(true);
    showToast('CAP Alert broadcast transmitted to telecom carriers & emergency sirens.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        id="emergency-sop-modal-card"
        className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {t('sopTitle')}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  AI Generated
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target Zone: {selectedLocation.name}, {selectedLocation.district} • Automated Action Directive
              </p>
            </div>
          </div>

          <button
            id="close-sop-modal-btn"
            onClick={() => setIsSOPModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Situation Snapshot */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Incident Severity Classification
              </span>
              <div className="flex items-center gap-2 mt-1">
                <RiskBadge level={floodPrediction.riskLevel} size="md" />
                <span className="text-xs text-slate-300 font-mono">
                  Probability: {floodPrediction.floodProbabilityPercent}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block">Lead Time Window:</span>
                <span className="text-amber-300 font-bold text-sm">
                  {floodPrediction.timeToThresholdMinutes} Minutes
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Peak Inundation:</span>
                <span className="text-cyan-300 font-bold text-sm">
                  {floodPrediction.maxExpectedDepthM} m
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Immediate Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              1. Immediate Operational Directives (0 - 30 min)
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  1
                </span>
                <span>
                  <strong>NDRF & SDRF Pre-positioning:</strong> Mobilize 2 battalions to low-lying flood gates along Jhelum river embankments and Doodh Ganga tributary.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  2
                </span>
                <span>
                  <strong>Traffic Arteries & Bypass Diversion:</strong> Close low-lying NH-44 highway bypass sections; redirect heavy transit toward higher elevation peripheral ring roads.
                </span>
              </li>
              <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center flex-shrink-0 text-xs">
                  3
                </span>
                <span>
                  <strong>Critical Healthcare Safeguards:</strong> Activate sub-basement flood gates at District & SMHS hospitals; verify auxiliary diesel generator elevated levels.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: Evacuation Zones & Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              2. Evacuation Sectors & Priority Zones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30">
                <span className="font-bold text-red-300 block text-sm">Zone A: Critical Lowland Basin</span>
                <p className="text-slate-300 mt-1">
                  Rajbagh, Jawahar Nagar, Bemina Lowlands (&gt;0.8m water depth expected). Immediate evacuation to designated relief schools.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30">
                <span className="font-bold text-amber-300 block text-sm">Zone B: Commercial Sump</span>
                <p className="text-slate-300 mt-1">
                  Lal Chowk city center & Batamaloo bus terminus. Stage high-volume drainage pumps (2000 LPM); sandbag commercial frontage.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Emergency Resource Staging */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Users className="w-4 h-4" />
              3. Resource Allocation Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                <span className="text-xs text-slate-400 block">{t('ndrfTeams')}</span>
                <span className="text-lg font-bold font-mono text-white">2 Teams</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Stationed & Deployed</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <Ambulance className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <span className="text-xs text-slate-400 block">{t('ambulances')}</span>
                <span className="text-lg font-bold font-mono text-white">5 Units</span>
                <span className="text-[10px] text-amber-300 block mt-0.5">High-Clearance Staged</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <Home className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                <span className="text-xs text-slate-400 block">{t('sheltersCapacity')}</span>
                <span className="text-lg font-bold font-mono text-white">1,250 Beds</span>
                <span className="text-[10px] text-teal-300 block mt-0.5">SP College & Sports Ctr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
          <button
            id="print-sop-btn"
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print SOP Directive</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="dispatch-cap-btn"
              onClick={handleDispatchCAP}
              disabled={capDispatched}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all ${
                capDispatched
                  ? 'bg-emerald-600 cursor-default'
                  : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-red-600/30 active:scale-[0.98]'
              }`}
            >
              <Radio className="w-4 h-4" />
              <span>
                {capDispatched ? 'CAP Broadcast Active ✓' : 'Transmit CAP Cell Broadcast'}
              </span>
            </button>

            <button
              onClick={() => setIsSOPModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
