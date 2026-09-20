import React from 'react';
import { useApp } from '../../context/AppContext';
import { Database, Radio, Satellite, Mountain, Gauge, Droplet, CheckCircle2 } from 'lucide-react';

export const DataSourcesCard: React.FC = () => {
  const { t } = useApp();

  const sources = [
    {
      name: t('sourceWeather'),
      provider: 'IMD AWS Telemetry',
      status: 'Live',
      latency: '15s',
      icon: Radio,
      color: 'text-emerald-400'
    },
    {
      name: t('sourceRainfall'),
      provider: 'NWP Ensemble (NCMRWF / ECMWF)',
      status: 'Synced',
      latency: '1h',
      icon: Database,
      color: 'text-cyan-400'
    },
    {
      name: t('sourceSatellite'),
      provider: 'NASA GPM IMERG Early Run',
      status: 'Live',
      latency: '18m',
      icon: Satellite,
      color: 'text-blue-400'
    },
    {
      name: t('sourceTerrain'),
      provider: 'SRTM 30m Hydro-Corrected DEM',
      status: 'Active',
      latency: 'Static',
      icon: Mountain,
      color: 'text-amber-400'
    },
    {
      name: t('sourceRiver'),
      provider: 'Central Water Commission (CWC)',
      status: 'Live',
      latency: '45s',
      icon: Gauge,
      color: 'text-indigo-400'
    },
    {
      name: t('sourceSoil'),
      provider: 'Sentinel-1 SAR / ESA SMAP',
      status: 'Synced',
      latency: '4h',
      icon: Droplet,
      color: 'text-teal-400'
    }
  ];

  return (
    <div
      id="aquasense-data-sources-card"
      className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-700/60 shadow-lg relative overflow-hidden"
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">
            {t('dataSources')}
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          6 / 6 Feeds Ingesting
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-3.5">
        {sources.map(src => {
          const Icon = src.icon;
          return (
            <div
              key={src.name}
              className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300">
                  <Icon className={`w-4 h-4 ${src.color}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{src.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {src.provider}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {src.status}
                </span>
                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                  {src.latency}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
