import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LocationSelector } from '../common/LocationSelector';
import { RiskMap } from '../map/RiskMap';
import { EMERGENCY_HELPLINES, SURVIVAL_KIT_ITEMS } from '../../data/citizenData';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Users,
  MapPin,
  Compass,
  PhoneCall,
  Volume2,
  VolumeX,
  Share2,
  ExternalLink,
  Navigation,
  Clock,
  Waves,
  HeartHandshake,
  Sparkles,
  Droplet,
  Flame,
  CheckSquare,
  Square,
  LifeBuoy,
  Building,
  Send,
  Radio,
  ArrowRight
} from 'lucide-react';

export const CitizenDashboardView: React.FC = () => {
  const {
    userProfile,
    selectedLocation,
    locationData,
    reliefShelters,
    submitSOSRequest,
    survivalCheckedIds,
    toggleSurvivalItem,
    showToast,
    language,
    t
  } = useApp();

  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [familyCheckinSent, setFamilyCheckinSent] = useState(false);

  // SOS Form
  const [sosType, setSosType] = useState<'trapped_roof' | 'medical' | 'elderly_infant' | 'food_water' | 'structural_collapse'>('trapped_roof');
  const [peopleCount, setPeopleCount] = useState(3);
  const [waterDepthM, setWaterDepthM] = useState(1.1);
  const [sosNotes, setSosNotes] = useState('');
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  const isHighRisk = locationData.floodPrediction.riskLevel === 'critical' || locationData.floodPrediction.riskLevel === 'high';

  const handleTriggerSOS = (e: React.FormEvent) => {
    e.preventDefault();
    const id = submitSOSRequest({
      citizenName: userProfile.name,
      phone: userProfile.phone || '+91 94190 44821',
      locality: `${selectedLocation.name}, ${selectedLocation.district}`,
      city: selectedLocation.name,
      coordinates: selectedLocation.coordinates,
      emergencyType: sosType,
      peopleCount: Number(peopleCount),
      waterDepthM: Number(waterDepthM),
      priority: sosType === 'medical' || sosType === 'trapped_roof' ? 'critical' : 'high',
      notes: sosNotes.trim() || 'Citizen requested immediate evacuation via AquaSense SOS Beacon.'
    });
    setLastSubmittedId(id);
    setIsSOSModalOpen(false);
  };

  const handleShareFamilyPing = () => {
    const text = `⚠️ AquaSense Flood Alert: I am currently SAFE at ${selectedLocation.name}, ${selectedLocation.district}. Status: ${locationData.floodPrediction.riskLevel.toUpperCase()}. Shelter nearby: ${reliefShelters[0]?.name || 'District Center'}. Track safety on AquaSense.`;
    navigator.clipboard?.writeText(text);
    setFamilyCheckinSent(true);
    showToast('Family safety message copied to clipboard for WhatsApp/SMS!', 'success');
  };

  const toggleAudioBroadcast = () => {
    if (isPlayingAudio) {
      window.speechSynthesis?.cancel();
      setIsPlayingAudio(false);
    } else {
      const text = `Urgent Flood Advisory for ${selectedLocation.name} residents. River water levels are rising rapidly. Please prepare for evacuation. Nearest high-ground shelter is ${reliefShelters[0]?.name || 'Government School'}. Dial 112 or 1078 for rescue.`;
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
        setIsPlayingAudio(true);
      } else {
        showToast('Audio advisory: ' + text, 'info');
      }
    }
  };

  return (
    <div id="citizen-dashboard-container" className="space-y-4 sm:space-y-6 pb-12">
      {/* 1. Top Welcome & Safety Status Alert Banner */}
      <div
        id="citizen-status-banner"
        className={`p-4 sm:p-6 rounded-2xl border transition-all relative overflow-hidden shadow-xl ${
          isHighRisk
            ? 'bg-gradient-to-r from-red-950/90 via-slate-900 to-amber-950/80 border-red-500/60 text-white'
            : 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border-emerald-500/50 text-white'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isHighRisk
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isHighRisk ? <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isHighRisk ? 'EMERGENCY EVACUATION ADVISORY' : 'NORMAL / MONITORING STATE'}</span>
              </span>

              <span className="text-xs text-slate-300 font-mono">
                {selectedLocation.name}, {selectedLocation.district}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
              {isHighRisk
                ? `Red Alert: Water Level Rising in ${selectedLocation.name}`
                : `Area Currently Safe: ${selectedLocation.name}`}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              {isHighRisk
                ? `Hydro-sensors report rapid inundation. Water depth may reach ${locationData.floodPrediction.expectedWaterDepthMaxM}m in low-lying wards. Move immediately to verified high-ground relief shelters.`
                : `Rainfall is currently stable at ${locationData.weather.currentRainfallMmHr} mm/hr. Water depth is below warning threshold. River gauges are actively monitored.`}
            </p>
          </div>

          {/* Quick Action SOS Button */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
            <button
              id="citizen-audio-broadcast-btn"
              onClick={toggleAudioBroadcast}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-md transition-all"
              title="Listen to official audio advisory"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span>Play Voice Alert</span>
                </>
              )}
            </button>

            <button
              id="trigger-citizen-sos-btn"
              onClick={() => setIsSOSModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              <LifeBuoy className="w-4 h-4 animate-spin" />
              <span>REQUEST RESCUE / SOS</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Lead Time to Evacuate</span>
            <span className="text-lg font-black font-mono text-cyan-300">
              {locationData.floodPrediction.timeToThresholdMinutes} mins
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Expected Water Depth</span>
            <span className="text-lg font-black font-mono text-amber-400">
              {locationData.floodPrediction.expectedWaterDepthMinM}m - {locationData.floodPrediction.expectedWaterDepthMaxM}m
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Nearest Relief Shelter</span>
            <span className="text-lg font-black font-mono text-emerald-400">
              {reliefShelters[0]?.distanceKm} km ({reliefShelters[0]?.name.split(',')[0]})
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-medium block">Active SOS Rescue Calls</span>
            <span className="text-lg font-black font-mono text-red-400">
              {isHighRisk ? '14 Pending' : '0 Emergency'}
            </span>
          </div>
        </div>
      </div>

      {/* Location Selector Bar for Citizen to check any city/ward */}
      <LocationSelector />

      {/* 2. Interactive Citizen Safety & Evacuation Map + Nearest Shelters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Map: Takes 7 Columns */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Hyperlocal Safety & Flood Inundation Map
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Green = Safe Shelters • Red = High Water
            </span>
          </div>

          <RiskMap />
        </div>

        {/* Right Column: Nearest Verified Relief Shelters (Takes 5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1222]/95 border border-slate-800/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Nearest Relief Camps & Safe Shelters
                </h3>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-mono">
                {reliefShelters.length} Verified
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {reliefShelters.map((shelter, idx) => {
                const occupancyPercent = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);
                return (
                  <div
                    key={shelter.id}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold font-mono">
                            {idx + 1}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                            {shelter.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{shelter.address}</span>
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono text-cyan-400 block">
                          {shelter.distanceKm} km
                        </span>
                        <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                          shelter.routeStatus === 'safe'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {shelter.routeStatus === 'safe' ? 'Safe Route' : 'Caution Route'}
                        </span>
                      </div>
                    </div>

                    {/* Occupancy Progress */}
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Capacity: {shelter.currentOccupancy} / {shelter.capacity} sheltered</span>
                        <span className="font-mono">{occupancyPercent}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            occupancyPercent > 85 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${occupancyPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Facilities Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {shelter.facilities.map((fac, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>

                    {/* Contact & Navigation Button */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">
                        Incharge: <strong className="text-slate-200">{shelter.contactPerson}</strong> ({shelter.contactPhone})
                      </span>
                      <a
                        href={`https://maps.google.com/?q=${shelter.coordinates[1]},${shelter.coordinates[0]}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Navigate</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Emergency Helplines, Family Check-In & Survival Kit Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1: 24x7 Emergency Helpline Hotlines */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1222]/95 border border-slate-800/90 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base border-b border-slate-800 pb-2.5">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Emergency 24/7 Helplines</span>
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              Direct telephone lines to active command rooms and rescue boats.
            </p>

            <div className="space-y-2 mt-3">
              {EMERGENCY_HELPLINES.map((item, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-xs font-semibold text-white block">{item.name}</span>
                    <span className="text-[10px] text-slate-400">{item.desc}</span>
                  </div>
                  <a
                    href={`tel:${item.number.split('/')[0].trim()}`}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold transition-colors shrink-0"
                  >
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 text-center">
            Toll-free government numbers accessible without internet or mobile balance.
          </div>
        </div>

        {/* Card 2: Family Safety "I Am Safe" Check-In */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1222]/95 border border-slate-800/90 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base border-b border-slate-800 pb-2.5">
              <HeartHandshake className="w-4 h-4 text-pink-400" />
              <span>Family Safety "I Am Safe" Ping</span>
            </div>

            <p className="text-xs text-slate-400 mt-1.5">
              Instantly let loved ones know you are safe and report your nearest evacuation shelter.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2 mt-3 font-mono">
              <div className="text-[10px] text-pink-400 font-bold uppercase">Pre-Formatted Message:</div>
              <p className="text-[11px] leading-relaxed bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                "⚠️ AquaSense Alert: I am currently SAFE at {selectedLocation.name}. My area status is {locationData.floodPrediction.riskLevel.toUpperCase()}. Shelter nearby: {reliefShelters[0]?.name.split(',')[0]}."
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={handleShareFamilyPing}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>{familyCheckinSent ? 'Copied to Clipboard!' : 'Share Status via WhatsApp / SMS'}</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Works offline by copying to phone SMS or messaging app.
            </p>
          </div>
        </div>

        {/* Card 3: Monsoon & Flood Survival Kit Checklist */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0b1222]/95 border border-slate-800/90 shadow-xl space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Survival Kit Checklist</span>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                {survivalCheckedIds.length} / {SURVIVAL_KIT_ITEMS.length} Ready
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-1.5">
              Essential items to pack immediately before flood waters breach ground level.
            </p>

            <div className="space-y-2 mt-3 max-h-56 overflow-y-auto pr-1">
              {SURVIVAL_KIT_ITEMS.map(item => {
                const isChecked = survivalCheckedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleSurvivalItem(item.id)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-slate-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 text-center">
            Saved automatically in your browser for quick offline reference.
          </div>
        </div>
      </div>

      {/* SOS Distress Modal Form */}
      {isSOSModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-red-500/50 rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-black text-base sm:text-lg">
                <LifeBuoy className="w-5 h-5 animate-pulse" />
                <span>Emergency Distress SOS Beacon</span>
              </div>
              <button
                onClick={() => setIsSOSModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Your signal will be routed immediately to the <strong>NDRF Command Center</strong> and local <strong>District Emergency Operation Center (DEOC)</strong> with your live GPS location.
            </p>

            <form onSubmit={handleTriggerSOS} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nature of Emergency
                </label>
                <select
                  value={sosType}
                  onChange={e => setSosType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                >
                  <option value="trapped_roof">Stranded on Roof / Upper Floor (Water rising)</option>
                  <option value="medical">Critical Medical Emergency (Oxygen / Dialysis / Injured)</option>
                  <option value="elderly_infant">Elderly / Infant / Disabled Person Evacuation Needed</option>
                  <option value="food_water">Food & Drinking Water Exhausted (Cut off)</option>
                  <option value="structural_collapse">Building Structural Cracks / Collapse Threat</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Number of Persons
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={peopleCount}
                    onChange={e => setPeopleCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Water Level (Meters)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="10"
                    value={waterDepthM}
                    onChange={e => setWaterDepthM(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Specific House Landmark / Details
                </label>
                <textarea
                  rows={2}
                  value={sosNotes}
                  onChange={e => setSosNotes(e.target.value)}
                  placeholder="e.g. Yellow gate, 2nd house near mosque, 1 infant needs milk"
                  className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-[11px] text-red-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>
                  GPS Lat/Lng: <strong className="font-mono">{selectedLocation.coordinates[1].toFixed(4)}, {selectedLocation.coordinates[0].toFixed(4)}</strong> ({selectedLocation.name})
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSOSModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-red-600/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT SOS NOW</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
