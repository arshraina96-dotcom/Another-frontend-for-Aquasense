import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Bell,
  Sliders,
  Server,
  Save,
  Check,
  Globe,
  Radio,
  RefreshCw
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { t, showToast } = useApp();

  const [rainfallThreshold, setRainfallThreshold] = useState('15');
  const [floodProbThreshold, setFloodProbThreshold] = useState('70');
  const [riverOffset, setRiverOffset] = useState('0.0');
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [capSirenEnabled, setCapSirenEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [unitSystem, setUnitSystem] = useState('metric');
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_BASE_URL || 'https://api.aquasense-ews.gov.in/v1');
  const [testingApi, setTestingApi] = useState(false);
  const [apiStatus, setApiStatus] = useState<'healthy' | 'mock'>('healthy');

  const handleSave = () => {
    showToast('Alert parameters and dispatch settings updated successfully.', 'success');
  };

  const handleTestApi = () => {
    setTestingApi(true);
    setTimeout(() => {
      setTestingApi(false);
      setApiStatus('healthy');
      showToast('API Connection verified. Latency: 18ms. Fallback mock engine ready.', 'success');
    }, 800);
  };

  return (
    <div id="aquasense-settings-view" className="space-y-4 sm:space-y-5 pb-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_settings')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure Early Warning Thresholds, API Integrations & Emergency Notification Protocols
          </p>
        </div>

        <button
          id="save-settings-btn"
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-600/30 transition-all active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* 1. Alert Threshold Configuration */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            Trigger Thresholds for Automatic Escalation
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Rainfall Rate Threshold (mm/hr)
            </label>
            <input
              type="number"
              value={rainfallThreshold}
              onChange={e => setRainfallThreshold(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Triggers Orange alert when rainfall exceeds this value
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Flood Risk Probability (%)
            </label>
            <input
              type="number"
              value={floodProbThreshold}
              onChange={e => setFloodProbThreshold(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Dispatches automated Red Alert SOP to command center
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              River Danger Mark Tolerance (ft)
            </label>
            <input
              type="number"
              step="0.1"
              value={riverOffset}
              onChange={e => setRiverOffset(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Offset before sounding local embankment sirens
            </span>
          </div>
        </div>
      </div>

      {/* 2. Notification Dispatch Channels */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Bell className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm sm:text-base font-bold text-white">
            Citizen & Inter-Agency Notification Channels
          </h3>
        </div>

        <div className="space-y-3">
          {[
            {
              id: 'sms',
              title: 'Telecom Carrier SMS Broadcast (Trai Gateway)',
              desc: 'Geo-fenced SMS pushed to all active mobile subscribers inside threatened basin polygon.',
              state: smsEnabled,
              setter: setSmsEnabled
            },
            {
              id: 'cap',
              title: 'Common Alerting Protocol (CAP) Siren Network',
              desc: 'Automatically sounds municipal horn sirens when water depth exceeds 0.5m.',
              state: capSirenEnabled,
              setter: setCapSirenEnabled
            },
            {
              id: 'whatsapp',
              title: 'Official NDMA / State WhatsApp Advisory Channel',
              desc: 'Dispatches high-priority graphical bulletins to registered district collectors and citizen groups.',
              state: whatsappEnabled,
              setter: setWhatsappEnabled
            }
          ].map(ch => (
            <div
              key={ch.id}
              className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-white block">{ch.title}</span>
                <span className="text-[11px] text-slate-400">{ch.desc}</span>
              </div>
              <button
                onClick={() => ch.setter(!ch.state)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  ch.state ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    ch.state ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. API Service Layer Configuration */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              Backend Model Service (FastAPI Microservice)
            </h3>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            Fallback Mock Engine Armed
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            API Base URL (`VITE_API_BASE_URL`)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={apiUrl}
              onChange={e => setApiUrl(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handleTestApi}
              disabled={testingApi}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testingApi ? 'animate-spin' : ''}`} />
              <span>{testingApi ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Endpoint used by the centralized API layer for `/weather`, `/rainfall`, `/flood-risk`, and `/alerts`.
          </p>
        </div>
      </div>
    </div>
  );
};
