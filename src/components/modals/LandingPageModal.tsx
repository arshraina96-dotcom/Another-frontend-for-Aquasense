import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Waves,
  CloudRain,
  ShieldAlert,
  Cpu,
  ArrowRight,
  X,
  Compass,
  CheckCircle2,
  Activity,
  Layers
} from 'lucide-react';

export const LandingPageModal: React.FC = () => {
  const {
    isLandingModalOpen,
    setIsLandingModalOpen,
    setActiveTab,
    t
  } = useApp();

  if (!isLandingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <div
        id="landing-overview-modal-card"
        className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6 relative"
      >
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Close Button */}
        <button
          id="close-landing-modal-btn"
          onClick={() => setIsLandingModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 md:p-10 relative z-10 space-y-8">
          {/* Header Tagline & Brand */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Waves className="w-3.5 h-3.5" />
              <span>Smart India Hackathon (SIH) Flagship Innovation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Aqua<span className="text-cyan-400">Sense</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-cyan-200">
              {t('heroSubtitle')}
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Designed for disaster management authorities, emergency response teams, and citizens. Integrates radar nowcasting, satellite precipitation, terrain hydrology, and physics-constrained AI models.
            </p>
          </div>

          {/* 3 Core System Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/40 transition-colors space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25">
                <CloudRain className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Hyperlocal Nowcasting
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                0–6 hour rainfall forecasting with spatiotemporal ConvLSTM networks, ingesting Doppler radar sweeps, NASA GPM IMERG, and automated weather stations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/40 transition-colors space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Physics-Constrained Hydro
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates surface runoff through 30m hydro-corrected SRTM DEMs and Saint-Venant hydraulic equations, preventing unphysical flood spread predictions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/40 transition-colors space-y-2">
              <div className="p-2.5 w-fit rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/25">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Automated Incident SOPs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates instant tactical evacuation plans, staged NDRF battalion counts, ambulance routes, and multi-lingual citizen warnings in 5 Indian languages.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center font-mono">
            <div>
              <span className="text-xl font-extrabold text-cyan-400">74 min</span>
              <span className="text-[10px] text-slate-400 block font-sans">Avg. Warning Lead Time</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-emerald-400">92.4%</span>
              <span className="text-[10px] text-slate-400 block font-sans">Model Precision (POD)</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-amber-400">12s</span>
              <span className="text-[10px] text-slate-400 block font-sans">Real-Time Latency</span>
            </div>
            <div>
              <span className="text-xl font-extrabold text-blue-400">5 Languages</span>
              <span className="text-[10px] text-slate-400 block font-sans">English, हिन्दी, اردو, کٲشُر, ਪੰਜਾਬੀ</span>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="enter-command-center-btn"
              onClick={() => {
                setIsLandingModalOpen(false);
                setActiveTab('dashboard');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 active:scale-[0.98] transition-all"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsLandingModalOpen(false);
                setActiveTab('live_map');
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Explore Live GIS Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
