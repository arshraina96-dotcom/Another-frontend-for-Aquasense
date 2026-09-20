import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  INDIA_STATES,
  IndiaStateData,
  getAllStates
} from '../../data/india';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  ShieldAlert,
  Building2,
  Hotel,
  School,
  Tent,
  Eye,
  Sliders,
  X,
  FileText,
  Navigation,
  Droplet,
  MapPin,
  Globe2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

interface RiskMapProps {
  isFullScreen?: boolean;
  className?: string;
}

interface NationalPin {
  id: string;
  name: string;
  state: string;
  coords: [number, number]; // [x, y] in national svg viewBox 0 0 1000 900
  risk: 'critical' | 'high' | 'moderate' | 'low';
  rainfallMmHr: number;
}

const NATIONAL_STATIONS: NationalPin[] = [
  { id: 'srinagar', name: 'Srinagar (Jhelum Basin)', state: 'Jammu & Kashmir', coords: [320, 150], risk: 'critical', rainfallMmHr: 48.5 },
  { id: 'guwahati', name: 'Guwahati (Brahmaputra)', state: 'Assam', coords: [770, 390], risk: 'critical', rainfallMmHr: 54.0 },
  { id: 'mumbai', name: 'Mumbai (Mithi / Coastal)', state: 'Maharashtra', coords: [280, 560], risk: 'critical', rainfallMmHr: 58.0 },
  { id: 'dehradun', name: 'Dehradun (Rispana Surge)', state: 'Uttarakhand', coords: [410, 260], risk: 'critical', rainfallMmHr: 46.0 },
  { id: 'patna', name: 'Patna (Ganga Basin)', state: 'Bihar', coords: [620, 390], risk: 'critical', rainfallMmHr: 47.0 },
  { id: 'chennai', name: 'Chennai (Adyar / Cooum)', state: 'Tamil Nadu', coords: [460, 770], risk: 'high', rainfallMmHr: 44.0 },
  { id: 'kolkata', name: 'Kolkata (Hooghly Estuary)', state: 'West Bengal', coords: [690, 470], risk: 'high', rainfallMmHr: 36.0 },
  { id: 'delhi', name: 'Delhi NCR (Yamuna Basin)', state: 'Delhi', coords: [385, 310], risk: 'high', rainfallMmHr: 38.0 },
  { id: 'bengaluru', name: 'Bengaluru (Vrishabhavathi)', state: 'Karnataka', coords: [400, 750], risk: 'moderate', rainfallMmHr: 22.0 },
  { id: 'kochi', name: 'Kochi (Periyar Basin)', state: 'Kerala', coords: [380, 830], risk: 'high', rainfallMmHr: 35.0 },
  { id: 'ahmedabad', name: 'Ahmedabad (Sabarmati)', state: 'Gujarat', coords: [270, 440], risk: 'moderate', rainfallMmHr: 18.0 }
];

export const RiskMap: React.FC<RiskMapProps> = ({ isFullScreen = false, className = '' }) => {
  const {
    t,
    selectedLocation,
    locationData,
    mapLayers,
    toggleMapLayer,
    timelineHour,
    setTimelineHour,
    selectedHotspot,
    setSelectedHotspot,
    setIsSOPModalOpen,
    geographicLevel,
    setGeographicLevel,
    drillDownToState,
    drillDownToCity,
    resetToNationalView
  } = useApp();

  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Hover state for national map states
  const [hoveredState, setHoveredState] = useState<IndiaStateData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const timelineSteps: ('now' | '+1h' | '+2h' | '+3h' | '+6h')[] = [
    'now',
    '+1h',
    '+2h',
    '+3h',
    '+6h'
  ];

  const getTimelineScale = () => {
    switch (timelineHour) {
      case 'now': return 0.6;
      case '+1h': return 0.85;
      case '+2h': return 1.15;
      case '+3h': return 1.35;
      case '+6h': return 1.1;
      default: return 1.0;
    }
  };

  const timelineScale = getTimelineScale();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const resetMap = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const getStateFillColor = (state: IndiaStateData) => {
    switch (state.riskLevel) {
      case 'critical':
        return '#dc2626'; // ruby red
      case 'high':
        return '#ea580c'; // amber orange
      case 'moderate':
        return '#d97706'; // warning yellow/amber
      case 'low':
      default:
        return '#0f766e'; // teal green / safe
    }
  };

  const isNationalView = geographicLevel === 'national';
  const [lng, lat] = selectedLocation.coordinates;

  return (
    <div
      id="aquasense-risk-map-container"
      className={`glass-panel rounded-2xl border border-slate-700/80 shadow-2xl relative overflow-hidden flex flex-col select-none ${
        isFullScreen ? 'h-full min-h-[680px]' : 'h-[500px] lg:h-[560px]'
      } ${className}`}
    >
      {/* Top Map Header & Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          {/* View Mode Toggle Button */}
          <div className="flex items-center bg-slate-950/90 border border-slate-700/90 rounded-xl p-0.5 shadow-lg backdrop-blur-md">
            <button
              id="map-view-national-btn"
              onClick={resetToNationalView}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isNationalView
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>National (All-India)</span>
            </button>
            <button
              id="map-view-local-btn"
              onClick={() => setGeographicLevel('city')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !isNationalView
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hyperlocal Hydro-Grid</span>
            </button>
          </div>

          {/* Active Area Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md text-xs font-semibold text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>
              {isNationalView ? 'National Early-Warning Grid' : `GIS Hydro-Grid: ${selectedLocation.name}`}
            </span>
            <span className="font-mono text-slate-400 text-[10px]">
              {isNationalView ? '36 States & UTs' : `[${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E]`}
            </span>
          </div>

          {!isNationalView && (
            <RiskBadge level={locationData.floodPrediction.riskLevel} size="sm" />
          )}
        </div>

        {/* Right Tools (Layer Switcher & Zoom) */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Layer Switcher */}
          {!isNationalView && (
            <div className="relative">
              <button
                id="map-layer-toggle-btn"
                onClick={() => setShowLayerMenu(!showLayerMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors shadow-lg backdrop-blur-md"
                title="Toggle Map Layers"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{t('mapLayers')}</span>
              </button>

              {showLayerMenu && (
                <div
                  id="map-layer-menu"
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl p-2.5 z-30 space-y-1 text-xs"
                >
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {t('mapLayers')}
                  </div>
                  {[
                    { key: 'rainfall', label: t('layerRainfall'), icon: Droplet, color: 'text-blue-400' },
                    { key: 'floodRisk', label: t('layerFloodRisk'), icon: ShieldAlert, color: 'text-red-400' },
                    { key: 'waterDepth', label: t('layerWaterDepth'), icon: Droplet, color: 'text-cyan-400' },
                    { key: 'riverLevel', label: t('layerRiverLevel'), icon: Navigation, color: 'text-indigo-400' },
                    { key: 'roads', label: t('layerRoads'), icon: Building2, color: 'text-amber-400' },
                    { key: 'hospitals', label: t('layerHospitals'), icon: Hotel, color: 'text-emerald-400' },
                    { key: 'schools', label: t('layerSchools'), icon: School, color: 'text-yellow-400' },
                    { key: 'shelters', label: t('layerShelters'), icon: Tent, color: 'text-teal-400' },
                    { key: 'satellite', label: t('layerSatellite'), icon: Eye, color: 'text-purple-400' }
                  ].map(item => {
                    const active = mapLayers[item.key as keyof typeof mapLayers];
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => toggleMapLayer(item.key as keyof typeof mapLayers)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                          active
                            ? 'bg-slate-800 text-white font-medium'
                            : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                          <span>{item.label}</span>
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full ${
                            active ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-slate-700'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Zoom In */}
          <button
            id="map-zoom-in-btn"
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors shadow-lg"
            title={t('zoomIn')}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Out */}
          <button
            id="map-zoom-out-btn"
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors shadow-lg"
            title={t('zoomOut')}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset View */}
          <button
            id="map-reset-btn"
            onClick={resetMap}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors shadow-lg"
            title={t('resetView')}
          >
            <Crosshair className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Map Canvas / Stage */}
      <div
        id="gis-map-stage"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden bg-[#070c18]"
      >
        {/* Radar concentric sweep circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[340px] h-[340px] rounded-full border border-cyan-500/30" />
          <div className="absolute w-[560px] h-[560px] rounded-full border border-cyan-500/20" />
          <div className="absolute w-[800px] h-[800px] rounded-full border border-cyan-500/15" />
          <div className="absolute w-full h-[1px] bg-cyan-500/10" />
          <div className="absolute h-full w-[1px] bg-cyan-500/10" />
        </div>

        {/* Dynamic Zoom & Pan Container */}
        <div
          className="w-full h-full transition-transform duration-100 ease-out origin-center"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
          }}
        >
          {isNationalView ? (
            /* ========================================================= */
            /* NATIONAL ALL-INDIA INTERACTIVE SVG MAP                   */
            /* ========================================================= */
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 900"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern id="nationalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />
                </pattern>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Ocean / Subcontinent Background */}
              <rect width="1000" height="900" fill="#060a14" />
              <rect width="1000" height="900" fill="url(#nationalGrid)" />

              {/* India Coastline / Exclusive Economic Zone Outer boundary */}
              <path
                d="M 280,100 Q 420,70 560,130 Q 750,170 880,360 Q 820,530 680,590 Q 560,780 430,860 Q 300,740 220,550 Q 180,410 280,100 Z"
                fill="none"
                stroke="rgba(6, 182, 212, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />

              {/* Major Indian River Networks (National Waterways & Basins) */}
              <g id="national-rivers" strokeOpacity="0.75" fill="none">
                {/* Indus & Jhelum */}
                <path d="M 270,90 Q 310,130 330,170 T 260,250" stroke="#0ea5e9" strokeWidth="2.5" />
                {/* Ganga River System (Gangotri -> Haridwar -> Prayagraj -> Patna -> Hooghly / Bay of Bengal) */}
                <path
                  d="M 390,230 Q 450,290 520,330 T 630,390 T 710,480"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  className="animate-pulse"
                />
                {/* Yamuna River */}
                <path d="M 380,240 Q 390,300 480,340" stroke="#0284c7" strokeWidth="2" />
                {/* Brahmaputra River (Arunachal -> Guwahati -> Dhubri) */}
                <path
                  d="M 850,300 Q 800,340 760,390 T 690,440"
                  stroke="#38bdf8"
                  strokeWidth="4"
                  className="animate-pulse"
                />
                {/* Narmada River */}
                <path d="M 460,490 Q 360,490 280,510" stroke="#0284c7" strokeWidth="2" />
                {/* Godavari River */}
                <path d="M 310,560 Q 430,580 540,620" stroke="#0284c7" strokeWidth="2.5" />
                {/* Krishna River */}
                <path d="M 320,640 Q 420,660 500,690" stroke="#0284c7" strokeWidth="2" />
                {/* Mahanadi River */}
                <path d="M 520,490 Q 580,510 630,520" stroke="#0284c7" strokeWidth="2" />
                {/* Cauvery River */}
                <path d="M 370,760 Q 420,780 470,800" stroke="#0284c7" strokeWidth="2" />
              </g>

              {/* 36 States & Union Territories of India */}
              <g id="national-states-layer">
                {INDIA_STATES.map(state => {
                  const fillColor = getStateFillColor(state);
                  const isHovered = hoveredState?.id === state.id;

                  return (
                    <g
                      key={state.id}
                      className="cursor-pointer transition-all duration-200"
                      onClick={() => drillDownToState(state.id)}
                      onMouseEnter={() => setHoveredState(state)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <path
                        d={state.svgPath}
                        fill={fillColor}
                        fillOpacity={isHovered ? 0.75 : 0.35}
                        stroke={isHovered ? '#38bdf8' : '#334155'}
                        strokeWidth={isHovered ? 2.5 : 1}
                        filter={isHovered ? 'url(#glow)' : undefined}
                      />
                      {/* State Risk Pulsing Dot at Center */}
                      {state.riskLevel === 'critical' && (
                        <circle
                          cx={state.mapCenter[0]}
                          cy={state.mapCenter[1]}
                          r="6"
                          fill="#ef4444"
                          className="animate-ping"
                          opacity="0.8"
                        />
                      )}
                      <circle
                        cx={state.mapCenter[0]}
                        cy={state.mapCenter[1]}
                        r={state.riskLevel === 'critical' ? 4 : 2.5}
                        fill={state.riskLevel === 'critical' ? '#ef4444' : '#38bdf8'}
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                      {/* State Abbreviation or Name */}
                      <text
                        x={state.mapCenter[0]}
                        y={state.mapCenter[1] - 8}
                        fill={isHovered ? '#ffffff' : '#94a3b8'}
                        fontSize="9"
                        fontWeight={isHovered ? 'bold' : 'normal'}
                        textAnchor="middle"
                        className="pointer-events-none font-sans select-none drop-shadow"
                      >
                        {state.name.length > 14 ? state.name.slice(0, 12) + '…' : state.name}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Key National Hotspots Markers */}
              <g id="national-stations-pins">
                {NATIONAL_STATIONS.map(pin => (
                  <g
                    key={pin.id}
                    transform={`translate(${pin.coords[0]}, ${pin.coords[1]})`}
                    className="cursor-pointer group"
                    onClick={() => drillDownToCity(pin.id)}
                  >
                    {pin.risk === 'critical' && (
                      <circle r="14" fill="#dc2626" className="animate-ping" opacity="0.4" />
                    )}
                    <circle
                      r="6"
                      fill={pin.risk === 'critical' ? '#ef4444' : pin.risk === 'high' ? '#f97316' : '#10b981'}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    {/* Badge Pill */}
                    <rect
                      x="-50"
                      y="-26"
                      width="100"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={pin.risk === 'critical' ? '#ef4444' : '#334155'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="-14"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {pin.name.split(' ')[0]} • {pin.rainfallMmHr}mm
                    </text>
                  </g>
                ))}
              </g>
            </svg>
          ) : (
            /* ========================================================= */
            /* HYPERLOCAL VECTOR HYDRO-GRID (LOCAL VIEW)                 */
            /* ========================================================= */
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <radialGradient id="radarPrecipitation" cx="50%" cy="45%" r="45%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                  <stop offset="35%" stopColor="#f97316" stopOpacity="0.35" />
                  <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                </radialGradient>
                <radialGradient id="floodInundationGrad" cx="52%" cy="48%" r="40%">
                  <stop offset="0%" stopColor="#dc2626" stopOpacity="0.65" />
                  <stop offset="40%" stopColor="#ea580c" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
                </radialGradient>
                <pattern id="topographicContour" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="18" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                  <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="rgba(6, 182, 212, 0.03)" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Background Topology */}
              <rect width="1000" height="600" fill="#090e1a" />
              <rect width="1000" height="600" fill="url(#topographicContour)" />

              {/* Mountain terrain ridges / DEM contour lines */}
              <g opacity="0.25" stroke="#475569" strokeWidth="1.2" fill="none">
                <path d="M 50,80 Q 250,40 450,110 T 850,70" />
                <path d="M 80,140 Q 300,100 520,170 T 920,130" />
                <path d="M 30,220 Q 280,180 500,240 T 950,210" />
                <path d="M 70,520 Q 320,460 580,510 T 950,480" />
              </g>

              {/* River Systems Layer */}
              {mapLayers.riverLevel && (
                <g id="map-rivers-layer">
                  <path
                    d="M 120,40 C 220,160 340,120 420,240 C 490,340 520,290 620,380 C 720,470 820,440 920,560"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeOpacity="0.4"
                  />
                  <path
                    d="M 120,40 C 220,160 340,120 420,240 C 490,340 520,290 620,380 C 720,470 820,440 920,560"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <path
                    d="M 280,520 Q 380,410 460,320"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeDasharray="4,4"
                    strokeOpacity="0.7"
                  />
                  <g transform="translate(480, 290)">
                    <circle r="7" fill="#dc2626" className="animate-ping" opacity="0.75" />
                    <circle r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="9" y="4" fill="#f87171" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {locationData.riverStations[0]?.name || 'Primary Basin Gauge'}: Danger Mark Exceeded
                    </text>
                  </g>
                </g>
              )}

              {/* Radar Rainfall Intensity Precipitation Layer */}
              {mapLayers.rainfall && (
                <g id="map-rainfall-layer">
                  <circle cx="510" cy="270" r={220 * timelineScale} fill="url(#radarPrecipitation)" />
                </g>
              )}

              {/* Predicted Inundation Polygons */}
              {mapLayers.floodRisk && (
                <g id="map-inundation-layer">
                  <ellipse
                    cx="505"
                    cy="275"
                    rx={125 * timelineScale}
                    ry={85 * timelineScale}
                    fill="url(#floodInundationGrad)"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="6,4"
                    className="transition-all duration-700 ease-out"
                  />
                  <ellipse
                    cx="430"
                    cy="320"
                    rx={95 * timelineScale}
                    ry={60 * timelineScale}
                    fill="rgba(249, 115, 22, 0.35)"
                    stroke="#f97316"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                    className="transition-all duration-700 ease-out"
                  />
                </g>
              )}

              {/* Water Depth Contours */}
              {mapLayers.waterDepth && (
                <g id="map-water-depth-contours" stroke="#38bdf8" strokeWidth="1" fill="none" opacity="0.6">
                  <ellipse cx="505" cy="275" rx={65 * timelineScale} ry={45 * timelineScale} stroke="#ef4444" strokeWidth="1.8" />
                  <text x="510" y="270" fill="#fca5a5" fontSize="9" fontFamily="monospace">
                    &gt; 1.2m Depth
                  </text>
                  <ellipse cx="505" cy="275" rx={105 * timelineScale} ry={70 * timelineScale} stroke="#f97316" />
                  <text x="540" y="325" fill="#fdba74" fontSize="9" fontFamily="monospace">
                    0.6 – 1.0m
                  </text>
                </g>
              )}

              {/* Roads & Highways */}
              {mapLayers.roads && (
                <g id="map-roads-layer">
                  <path
                    d="M 80,480 L 320,380 L 460,330 L 680,220 L 890,140"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="3.5"
                    strokeOpacity="0.4"
                  />
                  <path
                    d="M 80,480 L 320,380 L 460,330 L 680,220 L 890,140"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="8,6"
                  />
                  <g transform="translate(460, 330)">
                    <rect x="-35" y="-12" width="70" height="20" rx="4" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
                    <text x="0" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      Arterial Closed
                    </text>
                  </g>
                </g>
              )}
            </svg>
          )}

          {/* Overlaid HTML Elements (Hotspots & Infrastructure) in Local View */}
          {!isNationalView && (
            <div className="absolute inset-0 pointer-events-none">
              {locationData.hotspots.map((spot, idx) => {
                const positions = [
                  { top: '48%', left: '51%' },
                  { top: '56%', left: '58%' },
                  { top: '42%', left: '41%' },
                  { top: '38%', left: '32%' },
                  { top: '28%', left: '68%' }
                ];
                const pos = positions[idx % positions.length];
                const isSelected = selectedHotspot?.name === spot.name;

                return (
                  <div
                    key={spot.name}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group"
                    onClick={() => setSelectedHotspot(spot)}
                  >
                    {(spot.riskLevel === 'critical' || spot.riskLevel === 'high') && (
                      <span
                        className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                          spot.riskLevel === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                        }`}
                      />
                    )}

                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-xl border shadow-xl transition-all ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 scale-110 ring-2 ring-cyan-400/40 z-30'
                          : spot.riskLevel === 'critical'
                          ? 'bg-red-950/90 border-red-500/80 text-red-200'
                          : spot.riskLevel === 'high'
                          ? 'bg-orange-950/90 border-orange-500/80 text-orange-200'
                          : 'bg-slate-900/90 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          spot.riskLevel === 'critical'
                            ? 'bg-red-500 animate-pulse'
                            : spot.riskLevel === 'high'
                            ? 'bg-orange-400'
                            : 'bg-emerald-400'
                        }`}
                      />
                      <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                        {spot.name}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Infrastructure Markers */}
              {mapLayers.hospitals &&
                locationData.infrastructure
                  .filter(i => i.type === 'hospital')
                  .map((hosp, i) => (
                    <div
                      key={hosp.id}
                      style={{ top: `${40 + i * 18}%`, left: `${46 + i * 14}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      title={`Hospital: ${hosp.name}`}
                    >
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-500/80 text-emerald-300 text-[10px] font-semibold shadow-md">
                        <Hotel className="w-3 h-3 text-emerald-400" />
                        <span className="hidden sm:inline">{hosp.name}</span>
                      </div>
                    </div>
                  ))}

              {mapLayers.shelters &&
                locationData.infrastructure
                  .filter(i => i.type === 'shelter')
                  .map((sh, i) => (
                    <div
                      key={sh.id}
                      style={{ top: `${30 + i * 26}%`, left: `${62 - i * 15}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      title={`Shelter: ${sh.name}`}
                    >
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-teal-950/90 border border-teal-500/80 text-teal-300 text-[10px] font-semibold shadow-md">
                        <Tent className="w-3 h-3 text-teal-400" />
                        <span className="hidden sm:inline">{sh.name}</span>
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating State Info Tooltip on National Map */}
      {isNationalView && hoveredState && (
        <div
          id="national-state-tooltip"
          className="absolute bottom-16 left-3 sm:left-4 z-30 bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl max-w-sm pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                {hoveredState.type.toUpperCase()} • {hoveredState.capital}
              </span>
              <h4 className="text-base font-bold text-white">{hoveredState.name}</h4>
            </div>
            <RiskBadge level={hoveredState.riskLevel} size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 text-xs">
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Current Rainfall</span>
              <span className="font-mono font-bold text-white">{hoveredState.rainfallMmHr} mm/hr</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Flood Probability</span>
              <span className="font-mono font-bold text-amber-400">{hoveredState.floodProbPercent}%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Districts at Risk</span>
              <span className="font-mono font-bold text-red-400">
                {hoveredState.affectedDistrictsCount} / {hoveredState.totalDistricts}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">Population Exposed</span>
              <span className="font-mono font-bold text-slate-200">
                {hoveredState.populationExposed} citizens
              </span>
            </div>
          </div>

          <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-slate-500">Major Basins:</span>
            <span className="text-cyan-300 font-medium truncate">
              {hoveredState.primaryRivers.join(', ')}
            </span>
          </div>

          <button
            onClick={() => drillDownToState(hoveredState.id)}
            className="w-full mt-2.5 py-1.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow transition-colors"
          >
            <span>Drill Down into {hoveredState.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Selected Hotspot Detailed Inspector Panel (Local View) */}
      {!isNationalView && selectedHotspot && (
        <div
          id="hotspot-detail-inspector-panel"
          className="absolute bottom-16 right-3 left-3 sm:left-auto sm:w-80 bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3.5 shadow-2xl backdrop-blur-xl z-20 transition-all duration-300"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                {t('inspectedArea')}
              </span>
              <h4 className="text-sm font-bold text-white leading-tight">
                {selectedHotspot.name}
              </h4>
            </div>
            <button
              onClick={() => setSelectedHotspot(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Close Inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2.5 text-xs">
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">{t('currentRainfall')}</span>
              <span className="font-mono font-bold text-white text-sm">
                {selectedHotspot.rainfallMmHr} mm/hr
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">{t('rainfallPrediction')}</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">
                {selectedHotspot.predictedRainfallMm} mm/hr
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">{t('floodProbability')}</span>
              <span className="font-mono font-bold text-orange-400 text-sm">
                {selectedHotspot.floodProbabilityPercent}%
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 block">{t('expectedWaterDepth')}</span>
              <span className="font-mono font-bold text-white text-sm">
                {selectedHotspot.waterDepthRange}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-800 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">{t('timeToCritical')}:</span>
              <span className="font-mono font-bold text-amber-300 text-sm">
                {selectedHotspot.leadTimeMinutes} min
              </span>
            </div>
            <div>
              <RiskBadge level={selectedHotspot.riskLevel} size="sm" />
            </div>
          </div>

          <button
            onClick={() => setIsSOPModalOpen(true)}
            className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t('generateSOP')}</span>
          </button>
        </div>
      )}

      {/* Bottom Floating Bar: Inundation Timeline Slider & Water Depth Legend */}
      <div
        id="map-bottom-controls-bar"
        className="absolute bottom-3 left-3 right-3 z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pointer-events-none"
      >
        {/* Timeline Slider (Local View) or National Risk Legend (National View) */}
        {isNationalView ? (
          <div className="pointer-events-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-3 text-[11px]">
            <span className="text-slate-400 font-semibold">National Risk Scale:</span>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                Critical (Red Alert)
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                High Risk
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                Moderate Warning
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                Normal / Safe
              </span>
            </div>
          </div>
        ) : (
          <div className="pointer-events-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Inundation Timeline:</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {timelineSteps.map(step => (
                <button
                  key={step}
                  id={`timeline-step-btn-${step}`}
                  onClick={() => setTimelineHour(step)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                    timelineHour === step
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm shadow-cyan-500/50 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {step.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Water Depth / Depth Legend */}
        <div className="pointer-events-auto bg-slate-900/90 border border-slate-700/80 rounded-2xl px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-3 text-[11px] overflow-x-auto">
          <span className="text-slate-400 font-semibold">Inundation Depth:</span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              0–0.3m
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              0.3–0.75m
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              0.75–1.5m
            </span>
            <span className="flex items-center gap-1 text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              &gt;1.5m
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
