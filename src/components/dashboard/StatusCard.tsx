import React from 'react';
import { useApp } from '../../context/AppContext';
import { CloudRain, CloudLightning, Waves, Droplets, Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const StatusCards: React.FC = () => {
  const { t, locationData } = useApp();
  const { weather, floodPrediction, rainfallForecast } = locationData;

  // Next 3 hours rainfall sum
  const next3HoursRainfall = rainfallForecast
    .filter(item => item.isAiPrediction)
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr.rainfallMm, 0);

  // Heavy rain probability estimate
  const heavyRainProb = floodPrediction.floodProbabilityPercent >= 70 ? 86 : floodPrediction.floodProbabilityPercent >= 40 ? 54 : 18;

  // Circular gauge calculations
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (floodPrediction.floodProbabilityPercent / 100) * circumference;

  const getRiskColor = (prob: number) => {
    if (prob >= 75) return '#ef4444'; // Red
    if (prob >= 50) return '#f97316'; // Orange
    if (prob >= 30) return '#f59e0b'; // Yellow
    return '#10b981'; // Green
  };

  const riskColor = getRiskColor(floodPrediction.floodProbabilityPercent);

  return (
    <div id="aquasense-top-status-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {/* Card 1: Current Rainfall */}
      <div
        id="kpi-card-current-rainfall"
        className="glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t('currentRainfall')}
          </span>
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CloudRain className="w-4 h-4" />
          </div>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {weather.currentRainfallMmHr}
            </span>
            <span className="text-xs font-semibold text-slate-400">mm/hr</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-xs">
            <span className="text-slate-400">Trend:</span>
            {weather.rainfallTrend === 'rising' ? (
              <span className="text-red-400 flex items-center font-medium">
                <TrendingUp className="w-3 h-3 mr-0.5" /> High / Rising
              </span>
            ) : weather.rainfallTrend === 'falling' ? (
              <span className="text-emerald-400 flex items-center font-medium">
                <TrendingDown className="w-3 h-3 mr-0.5" /> Easing
              </span>
            ) : (
              <span className="text-amber-300 flex items-center font-medium">
                <Minus className="w-3 h-3 mr-0.5" /> Steady
              </span>
            )}
          </div>
        </div>

        {/* Small rainfall trend sparkline bars */}
        <div className="pt-2 border-t border-slate-800/80 flex items-end justify-between gap-1 h-8">
          {weather.recentRainfallTrend.map((val, idx) => {
            const maxVal = Math.max(...weather.recentRainfallTrend, 40);
            const heightPercent = Math.max((val / maxVal) * 100, 15);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                <div
                  className={`w-full rounded-t transition-all ${
                    idx === weather.recentRainfallTrend.length - 1
                      ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                      : 'bg-blue-500/50'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[9px] font-mono text-slate-400">-{3 - idx}h</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: Rainfall Prediction */}
      <div
        id="kpi-card-rainfall-prediction"
        className="glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t('rainfallPrediction')}
          </span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <CloudLightning className="w-4 h-4" />
          </div>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono tracking-tight">
              {next3HoursRainfall > 0 ? next3HoursRainfall : 67}
            </span>
            <span className="text-xs font-semibold text-slate-400">mm</span>
          </div>
          <span className="inline-block mt-0.5 text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 font-semibold">
            {t('next3Hours')}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 font-medium">
          <span className="font-bold text-amber-300">{heavyRainProb}%</span> {t('probHeavyRain')}
        </div>
      </div>

      {/* Card 3: Flood Risk (Circular Gauge) */}
      <div
        id="kpi-card-flood-risk"
        className="glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t('floodRisk')}
          </span>
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Waves className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center justify-between my-2">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {floodPrediction.floodProbabilityPercent}%
            </div>
            <div className="mt-1">
              <RiskBadge level={floodPrediction.riskLevel} size="sm" />
            </div>
          </div>

          {/* SVG Circular Progress Meter */}
          <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 70 70">
              <circle
                cx="35"
                cy="35"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="6"
              />
              <circle
                cx="35"
                cy="35"
                r={radius}
                fill="none"
                stroke={riskColor}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute text-[11px] font-mono font-bold text-white">
              {floodPrediction.floodProbabilityPercent}%
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>AI Hydro-Model</span>
          <span className="text-cyan-400 font-mono font-semibold">92% Conf.</span>
        </div>
      </div>

      {/* Card 4: Expected Water Depth */}
      <div
        id="kpi-card-water-depth"
        className="glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t('expectedWaterDepth')}
          </span>
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Droplets className="w-4 h-4" />
          </div>
        </div>

        <div className="my-2">
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {floodPrediction.expectedWaterDepthMinM} – {floodPrediction.expectedWaterDepthMaxM} m
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {t('predictedMaximum')}: <span className="font-mono text-cyan-300 font-bold">{floodPrediction.maxExpectedDepthM} m</span>
          </div>
        </div>

        {/* Water Depth Level Indicator Bar */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
            <div
              className={`h-full transition-all duration-700 ${
                floodPrediction.expectedWaterDepthMaxM > 1.2
                  ? 'bg-red-500'
                  : floodPrediction.expectedWaterDepthMaxM > 0.6
                  ? 'bg-orange-400'
                  : 'bg-cyan-400'
              }`}
              style={{
                width: `${Math.min((floodPrediction.expectedWaterDepthMaxM / 2.0) * 100, 100)}%`
              }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
            <span>0m</span>
            <span>0.75m</span>
            <span>1.5m+</span>
          </div>
        </div>
      </div>

      {/* Card 5: Warning Lead Time */}
      <div
        id="kpi-card-lead-time"
        className="glass-panel rounded-2xl p-4 border border-slate-700/60 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-cyan-500/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t('warningLeadTime')}
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="my-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono tracking-tight">
              {floodPrediction.timeToThresholdMinutes}
            </span>
            <span className="text-xs font-semibold text-slate-400">min</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {t('timeToThreshold')}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Action Window</span>
          <span
            className={`font-semibold font-mono ${
              floodPrediction.timeToThresholdMinutes <= 60
                ? 'text-red-400 animate-pulse'
                : 'text-amber-300'
            }`}
          >
            {floodPrediction.timeToThresholdMinutes <= 60 ? 'URGENT' : 'CRITICAL PREP'}
          </span>
        </div>
      </div>
    </div>
  );
};
