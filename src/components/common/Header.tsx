import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES, LanguageOption } from '../../locales';
import {
  Waves,
  Activity,
  Bell,
  Globe,
  MapPin,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  Users,
  Radio,
  UserCheck,
  RefreshCw
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    selectedLocation,
    locationData,
    mobileMenuOpen,
    setMobileMenuOpen,
    setActiveTab,
    setIsLandingModalOpen,
    acknowledgedAlertIds,
    geographicLevel,
    resetToNationalView,
    isDemoMode,
    setIsDemoMode,
    activeScenario,
    loadScenario,
    scenarios,
    userProfile,
    userRole,
    switchRole,
    setIsLoginModalOpen
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);
  const [langFilter, setLangFilter] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' IST'
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const unacknowledgedAlerts = locationData.alerts.filter(
    a => !acknowledgedAlertIds.includes(a.id)
  );

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    l =>
      l.name.toLowerCase().includes(langFilter.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(langFilter.toLowerCase())
  );

  return (
    <header
      id="aquasense-main-header"
      className="sticky top-0 z-40 w-full bg-[#0a101f]/95 backdrop-blur-md border-b border-slate-800/90 px-3 sm:px-5 lg:px-6 py-2"
    >
      <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Toggle, Brand & National Indicator */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            id="brand-header-link"
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans">
                  Aqua<span className="text-cyan-400">Sense</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono tracking-wider font-semibold rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  INDIA EWS
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                {t('commandCenter')}
              </p>
            </div>
          </div>

          {/* National vs State Hierarchy Breadcrumb */}
          <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-800 text-xs text-slate-400">
            <button
              onClick={resetToNationalView}
              className={`px-2 py-0.5 rounded transition-colors flex items-center gap-1 ${
                geographicLevel === 'national'
                  ? 'bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/40'
                  : 'hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>National Overview</span>
            </button>
            {geographicLevel !== 'national' && (
              <>
                <span className="text-slate-600">/</span>
                <span className="text-cyan-400 font-medium capitalize">
                  {geographicLevel}: {selectedLocation.name}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Selected Location Banner & Clock (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 border border-slate-700/60 rounded-full px-3 py-1 text-xs shadow-inner">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-slate-200 font-medium">
            {selectedLocation.name}, {selectedLocation.district}
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-cyan-300 text-[11px]">{currentTime}</span>
        </div>

        {/* Right Controls: Role Badge, Demo Mode, Languages, Status, Alerts */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Active Role Indicator & Switch Button */}
          <div className="relative flex items-center">
            <button
              id="role-indicator-header-btn"
              onClick={() => setIsLoginModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all shadow-sm ${
                userRole === 'citizen'
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25'
                  : 'bg-blue-600/20 border-blue-500/40 text-blue-300 hover:bg-blue-600/30'
              }`}
              title={`Active Role: ${userRole === 'citizen' ? 'Citizen Portal' : 'Authority Command'}. Click to switch dashboard.`}
            >
              {userRole === 'citizen' ? (
                <Users className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Radio className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span className="capitalize font-bold">
                {userRole === 'citizen' ? 'Citizen' : 'Authority'}
              </span>
              <span className="hidden xl:inline text-[10px] text-slate-300 font-normal">
                • {userProfile.name.split(' ')[0]}
              </span>
              <RefreshCw className="w-3 h-3 text-slate-400 hover:text-white shrink-0 ml-0.5" />
            </button>
          </div>

          {/* SIH DEMO MODE Scenario Switcher */}
          <div className="relative">
            <button
              id="demo-mode-toggle-btn"
              onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isDemoMode
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm shadow-amber-500/10 hover:bg-amber-500/25'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Quick Load SIH Disaster Scenarios"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="tracking-wide">DEMO MODE</span>
              <ChevronDown className={`w-3 h-3 text-amber-400/80 transition-transform ${scenarioDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {scenarioDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setScenarioDropdownOpen(false)}
                />
                <div
                  id="scenario-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-slate-900/98 border border-amber-500/40 shadow-2xl backdrop-blur-xl py-2 z-50 divide-y divide-slate-800"
                >
                  <div className="px-3.5 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>SIH Disaster Scenarios</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Select to load</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Pre-configured emergency simulations across Indian states with verified hydraulic responses.
                    </p>
                  </div>

                  <div className="py-1 max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                    {scenarios.map(sc => (
                      <button
                        key={sc.id}
                        id={`scenario-btn-${sc.id}`}
                        onClick={() => {
                          loadScenario(sc.id);
                          setScenarioDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 transition-colors flex items-start justify-between gap-2 ${
                          activeScenario?.id === sc.id
                            ? 'bg-amber-500/15 border-l-2 border-amber-400'
                            : 'hover:bg-slate-800/60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-white">
                              {sc.cityName}, {sc.stateName}
                            </span>
                            <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-red-500/20 text-red-300 border border-red-500/30">
                              {sc.riskLevel.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-1">
                            {sc.title}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Rainfall: <span className="text-cyan-300 font-semibold">{sc.rainfallMmHr} mm/h</span> • Depth: <span className="text-amber-300">{sc.waterDepthRange}</span>
                          </p>
                        </div>
                        {activeScenario?.id === sc.id && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Multilingual Selector (22 Scheduled Languages + English) */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors shadow-sm"
              aria-expanded={langDropdownOpen}
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium truncate max-w-[70px] sm:max-w-[100px]">
                {currentLangObj.nativeName}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-50"
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl bg-slate-900/98 border border-slate-700 shadow-2xl backdrop-blur-xl py-2 z-50"
                  role="menu"
                >
                  <div className="px-3 pb-2 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold uppercase text-slate-300 tracking-wider">
                        22 Scheduled Languages of India
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">8th Schedule</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Search language (e.g. Hindi, தமிழ், বাংলা)..."
                      value={langFilter}
                      onChange={e => setLangFilter(e.target.value)}
                      className="w-full px-2.5 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      autoFocus
                    />
                  </div>

                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-slate-800/40">
                    {filteredLanguages.map((item: LanguageOption) => (
                      <button
                        key={item.code}
                        id={`lang-opt-${item.code}`}
                        onClick={() => {
                          setLanguage(item.code);
                          setLangDropdownOpen(false);
                          setLangFilter('');
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                          language === item.code
                            ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        }`}
                        role="menuitem"
                      >
                        <div>
                          <span className="text-sm font-medium">{item.nativeName}</span>
                          <span className="text-[10px] text-slate-400 block">
                            {item.name} {item.isRTL ? '• RTL' : ''} ({item.script})
                          </span>
                        </div>
                        {language === item.code && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Operational status badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">{t('operational')}</span>
          </div>

          {/* System Overview Info Button */}
          <button
            id="hero-modal-btn"
            onClick={() => setIsLandingModalOpen(true)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors"
            title="Explore System Overview & Physics Engine"
          >
            <span>Architecture</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* Active Notifications / Alerts Bell */}
          <button
            id="notifications-header-btn"
            onClick={() => setActiveTab('alerts')}
            className="relative p-1.5 sm:p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="View Active Alerts"
            title={t('notifications')}
          >
            <Bell className="w-4 h-4" />
            {unacknowledgedAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                {unacknowledgedAlerts.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
