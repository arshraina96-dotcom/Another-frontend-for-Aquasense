import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, ArrowRight, FileText, Map, ShieldCheck } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const ActiveAlertBanner: React.FC = () => {
  const {
    t,
    locationData,
    selectedLocation,
    setActiveTab,
    setIsSOPModalOpen,
    acknowledgedAlertIds,
    acknowledgeAlert
  } = useApp();

  const { floodPrediction, alerts } = locationData;
  const isElevatedRisk = floodPrediction.riskLevel === 'high' || floodPrediction.riskLevel === 'critical';

  if (!isElevatedRisk && alerts.length === 0) {
    return null;
  }

  const primaryAlert = alerts[0];
  const isAcknowledged = primaryAlert ? acknowledgedAlertIds.includes(primaryAlert.id) : false;

  return (
    <div
      id="aquasense-active-alert-banner"
      className={`rounded-2xl p-4 sm:p-5 border shadow-xl relative overflow-hidden transition-all ${
        floodPrediction.riskLevel === 'critical'
          ? 'bg-gradient-to-r from-red-950/80 via-red-900/60 to-slate-900/90 border-red-500/50 shadow-red-950/40'
          : 'bg-gradient-to-r from-orange-950/80 via-amber-950/60 to-slate-900/90 border-orange-500/50 shadow-orange-950/40'
      }`}
    >
      {/* Background strobe pattern */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div
            className={`p-3 rounded-2xl flex-shrink-0 shadow-lg ${
              floodPrediction.riskLevel === 'critical'
                ? 'bg-red-600/30 text-red-400 border border-red-500/50 animate-pulse'
                : 'bg-orange-600/30 text-orange-400 border border-orange-500/50'
            }`}
          >
            {floodPrediction.riskLevel === 'critical' ? (
              <ShieldAlert className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={floodPrediction.riskLevel} size="md" />
              <span className="text-xs font-mono text-slate-300">
                {selectedLocation.name}, {selectedLocation.district}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                {t('warningLeadTime')}: {floodPrediction.timeToThresholdMinutes} min
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mt-1 leading-tight">
              {primaryAlert ? primaryAlert.title : `${selectedLocation.name} Flash Flood & Inundation Warning`}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {primaryAlert
                ? primaryAlert.description
                : `Torrential rainfall exceeding ${locationData.weather.currentRainfallMmHr} mm/hr is generating severe runoff. Expected water depth reaches up to ${floodPrediction.maxExpectedDepthM}m.`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto flex-shrink-0">
          <button
            id="alert-banner-view-map-btn"
            onClick={() => setActiveTab('live_map')}
            className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Map className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('viewRiskMap')}</span>
          </button>

          <button
            id="alert-banner-generate-sop-btn"
            onClick={() => setIsSOPModalOpen(true)}
            className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all active:scale-[0.98]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('generateSOP')}</span>
          </button>

          {primaryAlert && !isAcknowledged && (
            <button
              id="alert-banner-ack-btn"
              onClick={() => acknowledgeAlert(primaryAlert.id)}
              className="flex-1 lg:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('acknowledgeAlert')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
