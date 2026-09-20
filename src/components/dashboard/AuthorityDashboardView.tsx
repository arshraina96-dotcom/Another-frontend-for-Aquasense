import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveAlertBanner } from './ActiveAlertBanner';
import { NationalOverviewBanner } from './NationalOverviewBanner';
import { LocationSelector } from '../common/LocationSelector';
import { StatusCards } from './StatusCard';
import { RiskMap } from '../map/RiskMap';
import { RiskFactorCard } from './RiskFactorCard';
import { DistrictOverviewCard } from './DistrictOverviewCard';
import { PhysicsEngineCard } from './PhysicsEngineCard';
import { DataSourcesCard } from './DataSourcesCard';
import {
  Radio,
  ShieldAlert,
  Send,
  LifeBuoy,
  PhoneCall,
  CheckCircle2,
  FileText,
  Clock,
  Waves,
  Users,
  Building2,
  Cpu,
  Download,
  AlertOctagon,
  Anchor,
  Sparkles,
  MapPin
} from 'lucide-react';

export const AuthorityDashboardView: React.FC = () => {
  const {
    userProfile,
    selectedLocation,
    locationData,
    sosRequests,
    updateSOSStatus,
    showToast,
    setIsSOPModalOpen
  } = useApp();

  const [capModalOpen, setCapModalOpen] = useState(false);
  const [capSeverity, setCapSeverity] = useState('Severe / Red Alert');
  const [capScope, setCapScope] = useState('Immediate River Basin Polygon');
  const [capChannels, setCapChannels] = useState<string[]>(['sms', 'sirens', 'radio', 'tv']);
  const [capMessage, setCapMessage] = useState(
    `EMERGENCY FLOOD EVACUATION: Water levels in ${selectedLocation.name} basin expected to breach danger mark by 1.2m within 45 minutes. Evacuate immediately to designated relief shelters. Dial 112 / 1078 for rescue boats.`
  );

  const pendingSos = sosRequests.filter(s => s.status === 'pending');
  const dispatchedSos = sosRequests.filter(s => s.status === 'dispatched');
  const rescuedSos = sosRequests.filter(s => s.status === 'rescued');

  const handleSendCAPBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setCapModalOpen(false);
    showToast(
      `CAP Emergency Broadcast dispatched via [${capChannels.join(', ').toUpperCase()}] to all mobile towers in ${selectedLocation.name} basin.`,
      'alert'
    );
  };

  const toggleCapChannel = (channel: string) => {
    setCapChannels(prev =>
      prev.includes(channel) ? prev.filter(c => c !== channel) : [...prev, channel]
    );
  };

  const handleExportSITREP = () => {
    const sitrepText = `
========================================================================
NDMA / SDMA DAILY DISASTER SITUATION REPORT (SITREP) - AQUASENSE EWS
Date / Timestamp: ${new Date().toISOString()} IST
Incident Commander: ${userProfile.name} (${userProfile.officialId || 'NDRF-HQ-04'})
Jurisdiction: ${selectedLocation.name}, ${selectedLocation.district}, ${selectedLocation.state}
------------------------------------------------------------------------
HYDROLOGICAL STATUS:
- Current Rainfall Rate: ${locationData.weather.currentRainfallMmHr} mm/hr (${locationData.weather.rainfallTrend})
- Flood Probability (ConvLSTM AI): ${locationData.floodPrediction.floodProbabilityPercent}%
- Expected Water Depth: ${locationData.floodPrediction.expectedWaterDepthMinM}m - ${locationData.floodPrediction.expectedWaterDepthMaxM}m
- Lead Time Threshold: ${locationData.floodPrediction.timeToThresholdMinutes} Minutes
- Risk Severity: ${locationData.floodPrediction.riskLevel.toUpperCase()}

RESCUE & RELIEF TELEMETRY:
- Active SOS Distress Calls: ${sosRequests.length} Total (${pendingSos.length} Pending, ${dispatchedSos.length} En Route, ${rescuedSos.length} Rescued)
- NDRF Deployment: 12 Teams (480 Personnel, 32 Inflatable Motorized Boats)
- SDRF / Army Columns: 8 Columns on Alert
- Relief Camps Active: 4 Shelters Operational
========================================================================
    `.trim();

    const blob = new Blob([sitrepText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SITREP_${selectedLocation.name}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    showToast('Daily SITREP (Situation Report) downloaded successfully.', 'success');
  };

  return (
    <div id="authority-dashboard-container" className="space-y-4 sm:space-y-5 pb-10">
      {/* 1. Tactical Command & Control Banner */}
      <div
        id="authority-command-header-card"
        className="bg-[#0b1329] border border-blue-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden backdrop-blur-md"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                  DEFCON-2 DISASTER COMMAND
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Station: {userProfile.officialId || 'NDRF-HQ-04'}
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-white mt-1">
                Disaster Management & Incident Response Command Center
              </h1>
              <p className="text-xs text-slate-400">
                Authorized Official: <strong className="text-slate-200">{userProfile.name}</strong> ({userProfile.designation || 'Incident Commander'})
              </p>
            </div>
          </div>

          {/* Commander Rapid Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="authority-open-cap-modal-btn"
              onClick={() => setCapModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs shadow-lg shadow-red-500/20 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast CAP Siren / SMS</span>
            </button>

            <button
              id="authority-open-sop-btn"
              onClick={() => setIsSOPModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Incident SOPs</span>
            </button>

            <button
              id="authority-export-sitrep-btn"
              onClick={handleExportSITREP}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              title="Generate and download NDMA SITREP report"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export SITREP</span>
            </button>
          </div>
        </div>

        {/* Tactical Key Resource Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Exposed Population</span>
            <span className="text-xl font-black font-mono text-cyan-300">
              {(locationData.location.population / 1000000).toFixed(2)}M
            </span>
            <span className="text-[10px] text-slate-500 block">In Flood Basin</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-red-500/30">
            <span className="text-[10px] uppercase font-bold text-red-400 block">SOS Distress Calls</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black font-mono text-red-400">{pendingSos.length}</span>
              <span className="text-[10px] text-slate-400">({dispatchedSos.length} Dispatched)</span>
            </div>
            <span className="text-[10px] text-red-300/80 block">Requires Boat Rescue</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-blue-500/30">
            <span className="text-[10px] uppercase font-bold text-blue-400 block">NDRF / SDRF Forces</span>
            <span className="text-xl font-black font-mono text-blue-300">
              {locationData.sop.ndrfTeams * 40} Troops
            </span>
            <span className="text-[10px] text-slate-400 block">{locationData.sop.ndrfTeams} Battalions Active</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">Inflatable Boats</span>
            <span className="text-xl font-black font-mono text-emerald-300">32 Boats</span>
            <span className="text-[10px] text-slate-400 block">Motorized Rescue Units</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-amber-500/30">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">Relief Shelters</span>
            <span className="text-xl font-black font-mono text-amber-300">
              {locationData.sop.shelterCapacity.toLocaleString()} Cap.
            </span>
            <span className="text-[10px] text-slate-400 block">6 Relief Centers Ready</span>
          </div>
        </div>
      </div>

      {/* 2. Live Citizen SOS Emergency Triage & Rescue Dispatch Queue */}
      <div
        id="authority-sos-triage-card"
        className="p-4 sm:p-5 rounded-2xl bg-[#0b1222]/95 border border-red-500/30 shadow-xl space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center">
              <LifeBuoy className="w-4 h-4 animate-spin" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Citizen Emergency SOS Triage & Rescue Boat Dispatch</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/40">
                  {pendingSos.length} PENDING ACTION
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Direct telemetric distress stream from citizens requesting roof evacuation or medical aid.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Citizen & Phone</th>
                <th className="py-2.5 px-3">Locality & Coordinates</th>
                <th className="py-2.5 px-3">Emergency Type</th>
                <th className="py-2.5 px-3">Depth / Count</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Command Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sosRequests.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                    {item.id}
                    <span className="block text-[10px] text-slate-500 font-sans">{item.timestamp}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-semibold text-white block">{item.citizenName}</span>
                    <a
                      href={`tel:${item.phone}`}
                      className="text-[11px] text-cyan-300 hover:underline font-mono flex items-center gap-1 mt-0.5"
                    >
                      <PhoneCall className="w-3 h-3 text-slate-400" />
                      <span>{item.phone}</span>
                    </a>
                  </td>

                  <td className="py-3 px-3">
                    <span className="text-slate-300 block">{item.locality}</span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.coordinates[1].toFixed(4)}, {item.coordinates[0].toFixed(4)}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      item.emergencyType === 'trapped_roof'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : item.emergencyType === 'medical'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.emergencyType.replace('_', ' ')}
                    </span>
                    {item.notes && (
                      <p className="text-[11px] text-slate-400 mt-1 max-w-xs truncate" title={item.notes}>
                        {item.notes}
                      </p>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-amber-400">{item.waterDepthM}m Depth</span>
                    <span className="block text-[10px] text-slate-400">{item.peopleCount} Persons</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'pending'
                        ? 'bg-red-500/20 text-red-300 animate-pulse'
                        : item.status === 'dispatched'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.status}
                    </span>
                    {item.assignedUnit && (
                      <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                        {item.assignedUnit}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {item.status === 'pending' && (
                        <button
                          onClick={() => updateSOSStatus(item.id, 'dispatched', 'NDRF Boat Column 2')}
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                        >
                          <Anchor className="w-3 h-3" />
                          <span>Dispatch Boat</span>
                        </button>
                      )}

                      {item.status === 'dispatched' && (
                        <button
                          onClick={() => updateSOSStatus(item.id, 'rescued')}
                          className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark Rescued</span>
                        </button>
                      )}

                      {item.status === 'rescued' && (
                        <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Evacuated</span>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Common Alerting Protocol (CAP) Modal */}
      {capModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-xl bg-slate-900 border border-blue-500/50 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-base sm:text-lg">
                <Send className="w-5 h-5" />
                <span>Common Alerting Protocol (CAP) Multi-Channel Broadcast</span>
              </div>
              <button onClick={() => setCapModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                ✕
              </button>
            </div>

            <form onSubmit={handleSendCAPBroadcast} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Severity Level
                  </label>
                  <select
                    value={capSeverity}
                    onChange={e => setCapSeverity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Severe / Red Alert">Severe (Red Alert - Immediate Threat)</option>
                    <option value="Moderate / Orange Alert">Moderate (Orange Warning)</option>
                    <option value="Minor / Yellow Advisory">Minor (Yellow Advisory)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Geographic Scope
                  </label>
                  <select
                    value={capScope}
                    onChange={e => setCapScope(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Immediate River Basin Polygon">{selectedLocation.name} Basin Polygon</option>
                    <option value="Entire District Wards">{selectedLocation.district} All Wards</option>
                    <option value="State Wide Emergency">Entire State Administrative Area</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Active Dispatch Channels
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'sms', label: 'Cell Broadcast SMS' },
                    { id: 'sirens', label: 'Basin Sirens' },
                    { id: 'radio', label: 'Radio & TV Crawl' },
                    { id: 'whatsapp', label: 'Citizen WhatsApp' }
                  ].map(ch => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleCapChannel(ch.id)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-colors ${
                        capChannels.includes(ch.id)
                          ? 'bg-blue-600/30 border-blue-400 text-blue-300'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Alert Directive Text (Broadcasted in 22 Languages)
                </label>
                <textarea
                  rows={3}
                  value={capMessage}
                  onChange={e => setCapMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCapModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT CAP ADVISORY NOW</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Core National Intelligence & Multi-Basin Hydro Matrix */}
      <NationalOverviewBanner />

      {/* 5. Cascading Location Hierarchy Selector */}
      <LocationSelector />

      {/* 6. Top 5 Key Metric Cards */}
      <StatusCards />

      {/* 7. Tactical GIS Map & Explainable AI Risk Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
        <div className="lg:col-span-8">
          <RiskMap />
        </div>
        <div className="lg:col-span-4 h-full">
          <RiskFactorCard />
        </div>
      </div>

      {/* 8. Regional District Telemetry & Sub-basins */}
      <DistrictOverviewCard />

      {/* 9. AI Physics-Constrained Pipeline Diagram & Telemetry Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        <div className="lg:col-span-6">
          <PhysicsEngineCard />
        </div>
        <div className="lg:col-span-6">
          <DataSourcesCard />
        </div>
      </div>
    </div>
  );
};
