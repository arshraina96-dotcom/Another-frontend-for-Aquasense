import React from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, ArrowRight, ShieldCheck, Database, CloudRain, Waves } from 'lucide-react';

export const PhysicsEngineCard: React.FC = () => {
  const { t } = useApp();

  const pipeline = [
    { label: t('weatherData'), sub: 'Radar, AWS, Satellite', icon: Database },
    { label: t('aiModel'), sub: 'ConvLSTM + Transformer', icon: Cpu },
    { label: t('rainfallPrediction'), sub: '0–6h Precipitation', icon: CloudRain },
    { label: t('physicsConstraints'), sub: 'Saint-Venant Hydro', icon: ShieldCheck, highlight: true },
    { label: t('floodPrediction'), sub: 'Calibrated Inundation', icon: Waves }
  ];

  return (
    <div
      id="aquasense-physics-engine-card"
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">
            {t('physicsEngineTitle')}
          </h3>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          Conservation Law Enforced
        </span>
      </div>

      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
        {t('physicsEngineDesc')}
      </p>

      {/* Visual Pipeline Flow */}
      <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto py-1">
        {pipeline.map((step, idx) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.label}>
              <div
                className={`w-full md:w-auto flex-1 p-2.5 rounded-xl border flex md:flex-col items-center justify-between md:justify-center text-center gap-1.5 transition-all ${
                  step.highlight
                    ? 'bg-cyan-950/60 border-cyan-400/50 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/80 border-slate-800'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg ${
                    step.highlight ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left md:text-center">
                  <span
                    className={`text-xs font-bold block ${
                      step.highlight ? 'text-cyan-300' : 'text-slate-200'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {step.sub}
                  </span>
                </div>
              </div>

              {idx < pipeline.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 md:rotate-0 flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
