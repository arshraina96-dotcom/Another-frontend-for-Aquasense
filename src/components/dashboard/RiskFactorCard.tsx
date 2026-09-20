import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiskFactorItem } from '../../types';
import { HelpCircle, Sparkles } from 'lucide-react';

export const RiskFactorCard: React.FC = () => {
  const { t, locationData } = useApp();
  const factors = locationData.riskDrivers || [];

  return (
    <div
      id="aquasense-risk-factors-card"
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              {t('riskDrivers')}
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Explainable AI (XAI)
          </span>
        </div>

        <p className="text-xs text-slate-400 mt-1">
          {t('riskDriversSubtitle')}
        </p>

        {/* Explainable AI factor percentage bars */}
        <div className="space-y-3 mt-4">
          {factors.map((factor: RiskFactorItem) => (
            <div key={factor.factor} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">{factor.factor}</span>
                <span className="font-mono font-bold text-cyan-300">{factor.percentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${factor.percentage}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                {factor.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          <span>{t('whyAreaAtRisk')}</span>
        </div>
        <span className="font-mono text-cyan-400">SHAP Attributions</span>
      </div>
    </div>
  );
};
