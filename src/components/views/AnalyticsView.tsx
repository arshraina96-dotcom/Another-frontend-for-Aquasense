import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Cpu,
  Radio,
  Clock,
  ShieldCheck,
  Server,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { t } = useApp();

  const accuracyTrend = [
    { day: 'Day 1', accuracy: 89.2 },
    { day: 'Day 5', accuracy: 90.4 },
    { day: 'Day 10', accuracy: 91.1 },
    { day: 'Day 15', accuracy: 91.8 },
    { day: 'Day 20', accuracy: 92.4 },
    { day: 'Day 25', accuracy: 92.1 },
    { day: 'Day 30', accuracy: 92.6 }
  ];

  return (
    <div id="aquasense-analytics-view" className="space-y-4 sm:space-y-5 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            <span>{t('nav_analytics')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            System Telemetry, AI Model Latency, Sensor Health & Accuracy Benchmarks
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <Activity className="w-4 h-4" />
          <span>All 4 Services Healthy</span>
        </div>
      </div>

      {/* 4 Top Telemetry KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Inference Latency</span>
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mt-2">
            12.4s
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            &lt; 15s Target Met
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Active Sensor Nodes</span>
            <Radio className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mt-2">
            428 AWS
          </div>
          <span className="text-[11px] text-slate-400">
            Across 22 Himalayan Basins
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>System Availability</span>
            <Server className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-white mt-2">
            99.98%
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            Zero Outages (30d)
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Model Precision (POD)</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-cyan-300 mt-2">
            92.6%
          </div>
          <span className="text-[11px] text-cyan-400 font-mono">
            +3.4% vs baseline
          </span>
        </div>
      </div>

      {/* Model Accuracy Over Time Chart */}
      <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">
              AI Nowcasting Model Precision Trend (30 Days)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous validation against IMD Doppler radar observations
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">ConvLSTM-Hydro v2.4</span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accuracyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={[85, 95]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="#22d3ee"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#accuracyGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
