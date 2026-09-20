import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocationSelector } from '../common/LocationSelector';
import { RiskBadge } from '../common/RiskBadge';
import {
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  FileText,
  Map,
  Radio,
  Clock,
  Send,
  MessageSquare,
  Globe
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const {
    t,
    language,
    selectedLocation,
    locationData,
    acknowledgedAlertIds,
    acknowledgeAlert,
    setActiveTab,
    setIsSOPModalOpen,
    showToast
  } = useApp();

  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const alerts = locationData.alerts;

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  const handleSendCitizenAdvisory = () => {
    setBroadcastSent(true);
    showToast('Multi-lingual citizen SMS & CAP advisory broadcast triggered.', 'success');
  };

  return (
    <div id="aquasense-alerts-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-red-500" />
            <span>{t('nav_alerts')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Emergency Broadcasts, Common Alerting Protocol (CAP) Directives & Incident History
          </p>
        </div>

        <button
          id="trigger-citizen-broadcast-btn"
          onClick={handleSendCitizenAdvisory}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition-all active:scale-[0.98]"
        >
          <Radio className="w-4 h-4" />
          <span>{broadcastSent ? 'Advisory Broadcast Sent ✓' : 'Dispatch Multi-channel Advisory'}</span>
        </button>
      </div>

      <LocationSelector />

      {/* Severity Filter Tabs */}
      <div className="flex items-center gap-2 pb-1">
        {['all', 'critical', 'high', 'moderate'].map(sev => (
          <button
            key={sev}
            id={`filter-alert-${sev}`}
            onClick={() => setFilterSeverity(sev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
              filterSeverity === sev
                ? 'bg-slate-700 text-white border border-slate-600'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {sev}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3.5">
        {filteredAlerts.map(alert => {
          const isAcked = acknowledgedAlertIds.includes(alert.id);
          return (
            <div
              key={alert.id}
              className={`glass-panel p-4 sm:p-5 rounded-2xl border shadow-xl transition-all ${
                alert.severity === 'critical'
                  ? 'border-red-500/50 bg-red-950/20'
                  : alert.severity === 'high'
                  ? 'border-orange-500/50 bg-orange-950/20'
                  : 'border-slate-700/60 bg-slate-900/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl flex-shrink-0 ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-orange-500/20 text-orange-400'
                    }`}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <RiskBadge level={alert.severity} size="sm" />
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                      {isAcked && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {t('alertAcknowledged')}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mt-1.5">
                      {alert.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl leading-relaxed">
                      {alert.description}
                    </p>

                    {/* Affected Zones Tag list */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span className="text-xs text-slate-400 font-semibold mr-1">
                        Affected Zones:
                      </span>
                      {alert.affectedZones.map(zone => (
                        <span
                          key={zone}
                          className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-mono"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Quick Action Buttons */}
                <div className="flex sm:flex-col items-center gap-2 flex-shrink-0 mt-3 sm:mt-0">
                  {!isAcked && (
                    <button
                      id={`ack-btn-${alert.id}`}
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="w-full px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('acknowledgeAlert')}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setIsSOPModalOpen(true)}
                    className="w-full px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t('generateSOP')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('live_map')}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Map className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Map</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multilingual Citizen Advisory Preview Card */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-700/60 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">
              Automated Citizen SMS & Siren Dispatch Preview (Multilingual)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Language: {language.toUpperCase()}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-300 leading-relaxed">
          {language === 'hi' ? (
            <p>
              [एक्वासेंस आपातकालीन चेतावनी]: {selectedLocation.name} में अगले 74 मिनट में गंभीर बाढ़ और जलभराव का खतरा है। सुरक्षित शरण स्थल की ओर बढ़ें। आपातकालीन हेल्पलाइन: 112
            </p>
          ) : language === 'ur' ? (
            <p dir="rtl" className="text-right font-serif text-sm">
              [ایکوا سینس ہنگامی وارننگ]: {selectedLocation.name} میں اگلے 74 منٹ میں شدید بارش اور سیلاب کا شدید خطرہ ہے۔ قریبی محفوظ پناہ گاہ میں منتقل ہوں۔ ہیلپ لائن: 112
            </p>
          ) : language === 'ks' ? (
            <p dir="rtl" className="text-right font-serif text-sm">
              [ایکوا سینس خطرہ وارننگ]: {selectedLocation.name} منز چھ اگلے 74 منٹن منز شدید سیلابک خطرہ۔ محفوظ جاین کن پکیو۔ ہیلپ لائن: 112
            </p>
          ) : language === 'pa' ? (
            <p>
              [ਐਕਵਾਸੈਂਸ ਐਮਰਜੈਂਸੀ ਚੇਤਾਵਨੀ]: {selectedLocation.name} ਵਿੱਚ ਅਗਲੇ 74 ਮਿੰਟਾਂ ਵਿੱਚ ਭਾਰੀ ਹੜ੍ਹ ਦਾ ਖ਼ਤਰਾ ਹੈ। ਸੁਰੱਖਿਅਤ ਸਥਾਨ ਤੇ ਜਾਓ। ਹੈਲਪਲਾਈਨ: 112
            </p>
          ) : (
            <p>
              [AQUASENSE EMERGENCY ALERT]: Critical flood and inundation expected in {selectedLocation.name} basin within 74 minutes. Expected water depth up to {locationData.floodPrediction.maxExpectedDepthM}m. Avoid low-lying underpasses and proceed to designated relief shelters. Emergency Control: 112 / NDRF: 1078.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
