import React from 'react';
import { useApp } from '../../context/AppContext';
import { LocationSelector } from '../common/LocationSelector';
import {
  CloudRain,
  Droplets,
  Wind,
  Gauge,
  Cloud,
  Thermometer,
  Cpu,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';

export const RainfallPredictionView: React.FC = () => {
  const { t, selectedLocation, locationData } = useApp();
  const { weather, rainfallForecast } = locationData;

  const chartData = rainfallForecast.map(item => ({
    hour: item.hour || item.time || '',
    rainfall: item.rainfallMm,
    isPrediction: item.isAiPrediction,
    intensity: item.intensity
  }));

  const pressureVal = weather.pressureHpa ?? weather.atmosphericPressureHpa ?? 1008;
  const cloudCoverVal = weather.cloudCoverPercent ?? 82;
  const dewPointVal = weather.dewPointC ?? Math.round(weather.temperatureC - (100 - weather.humidityPercent) / 5);

  const metrics = [
    { label: t('currentRainfall'), value: `${weather.currentRainfallMmHr} mm/hr`, icon: CloudRain, color: 'text-blue-400' },
    { label: t('humidity'), value: `${weather.humidityPercent}%`, icon: Droplets, color: 'text-cyan-400' },
    { label: t('wind'), value: `${weather.windSpeedKmh} km/h ${weather.windDirection}`, icon: Wind, color: 'text-teal-400' },
    { label: t('pressure'), value: `${pressureVal} hPa`, icon: Gauge, color: 'text-amber-400' },
    { label: t('cloudCover'), value: `${cloudCoverVal}%`, icon: Cloud, color: 'text-slate-300' },
    { label: t('dewPoint'), value: `${dewPointVal}°C`, icon: Thermometer, color: 'text-indigo-400' }
  ];

  return (
    <div id="aquasense-rainfall-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <CloudRain className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_rainfall')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Hyperlocal Spatiotemporal AI Nowcasting (0–6 Hours) • {selectedLocation.name}, {selectedLocation.district}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            ConvLSTM-Transformer v2.4 (92% Conf.)
          </span>
        </div>
      </div>

      <LocationSelector />

      {/* Atmospheric Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map(m => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="glass-panel p-3.5 rounded-2xl border border-slate-700/60 shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="text-base sm:text-lg font-extrabold font-mono text-white mt-2">
                {m.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Forecast Chart Card (Past 6h Observed vs Next 6h Predicted) */}
      <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t('rainfallForecast12h')}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly precipitation (mm) showing historical ground-truth AWS observations and forward AI predictions
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-blue-500" />
              <span>{t('observedHistorical')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-cyan-400" />
              <span>{t('predictedAi')}</span>
            </div>
          </div>
        </div>

        {/* Recharts Bar Graph */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" mm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(val: any) => [`${val ?? 0} mm`, 'Rainfall']}
              />
              <ReferenceLine
                y={15}
                stroke="#f97316"
                strokeDasharray="4 4"
                label={{
                  value: 'Heavy Rain Threshold (15 mm/hr)',
                  fill: '#fdba74',
                  fontSize: 10,
                  position: 'top'
                }}
              />
              <Bar dataKey="rainfall" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isPrediction ? '#22d3ee' : '#3b82f6'}
                    fillOpacity={entry.rainfall > 20 ? 1 : 0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>
              Cumulative rainfall forecast for next 6 hours: <strong>89.4 mm</strong>. Runoff threshold will be reached within 74 minutes.
            </span>
          </div>
          <span className="font-mono text-cyan-400 font-bold hidden sm:inline">
            IMD / ECMWF Ensembled
          </span>
        </div>
      </div>
    </div>
  );
};
