import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Map,
  CloudRain,
  Waves,
  Building2,
  AlertOctagon,
  History,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Cpu,
  CheckCircle2,
  Users,
  Radio,
  LifeBuoy,
  RefreshCw
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    t,
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    locationData,
    acknowledgedAlertIds,
    userRole,
    userProfile,
    setIsLoginModalOpen,
    sosRequests
  } = useApp();

  const unacknowledgedAlerts = locationData.alerts.filter(
    a => !acknowledgedAlertIds.includes(a.id)
  );

  const pendingSosCount = sosRequests.filter(s => s.status === 'pending').length;

  const citizenNavItems = [
    { id: 'dashboard', label: 'Safety Portal', icon: LayoutDashboard },
    { id: 'live_map', label: 'Evacuation Map', icon: Map },
    { id: 'rainfall', label: 'Neighborhood Rain', icon: CloudRain },
    { id: 'infrastructure', label: 'Relief Camps & Hospitals', icon: Building2 },
    {
      id: 'alerts',
      label: 'Emergency Bulletins',
      icon: AlertOctagon,
      badge: unacknowledgedAlerts.length > 0 ? unacknowledgedAlerts.length : undefined
    },
    { id: 'settings', label: 'Preferences & Language', icon: Settings }
  ];

  const authorityNavItems = [
    { id: 'dashboard', label: 'Incident Command', icon: LayoutDashboard },
    { id: 'live_map', label: 'National GIS Map', icon: Map },
    { id: 'rainfall', label: 'Doppler Radar & Forecast', icon: CloudRain },
    { id: 'flood', label: 'Hydrodynamic Simulation', icon: Waves },
    { id: 'infrastructure', label: 'Lifeline Infrastructure', icon: Building2 },
    {
      id: 'alerts',
      label: 'CAP Siren & Alerts',
      icon: AlertOctagon,
      badge: pendingSosCount > 0 ? `${pendingSosCount} SOS` : (unacknowledgedAlerts.length > 0 ? unacknowledgedAlerts.length : undefined)
    },
    { id: 'historical', label: 'Flood Baselines', icon: History },
    { id: 'analytics', label: 'Multi-Basin Analytics', icon: BarChart3 },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const navItems = userRole === 'citizen' ? citizenNavItems : authorityNavItems;

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="aquasense-sidebar"
        className={`fixed md:sticky top-[57px] left-0 z-40 h-[calc(100vh-57px)] bg-[#0c1424] border-r border-slate-800/80 transition-all duration-300 flex flex-col justify-between ${
          mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        } ${sidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          <div className="hidden md:flex justify-end mb-2">
            <button
              id="sidebar-collapse-btn"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            {!sidebarCollapsed && t('commandCenter')}
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate flex-1 text-left rtl:text-right">{item.label}</span>
                  )}
                  {item.badge !== undefined && (
                    <span
                      className={`inline-flex items-center justify-center text-[10px] font-bold rounded-full h-5 min-w-[20px] px-1.5 bg-red-500 text-white ${
                        sidebarCollapsed ? 'absolute top-1 right-1' : ''
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Role & Profile Card */}
        {!sidebarCollapsed && (
          <div className="px-2 pt-2">
            <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
              userRole === 'citizen'
                ? 'bg-cyan-950/40 border-cyan-500/30'
                : 'bg-blue-950/40 border-blue-500/30'
            }`}>
              <div className="flex items-center gap-2 overflow-hidden">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  userRole === 'citizen' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {userRole === 'citizen' ? <Users className="w-3.5 h-3.5" /> : <Radio className="w-3.5 h-3.5" />}
                </div>
                <div className="truncate">
                  <span className="text-[11px] font-bold text-white block truncate">
                    {userProfile.name}
                  </span>
                  <span className="text-[9px] text-slate-400 capitalize block truncate">
                    {userRole === 'citizen' ? 'Citizen Portal' : (userProfile.officialId || 'Authority')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Switch Dashboard Role"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* AI Model Telemetry Widget at bottom */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/50 m-2 rounded-xl border">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t('aiPredictionEngine')}</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>Rainfall Net</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-2.5 h-2.5" /> 92% Conf.
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Physics Constraint</span>
                <span className="text-emerald-400 font-mono text-[10px]">Active</span>
              </div>
              <div className="pt-1 text-[10px] text-slate-400 font-mono">
                {t('lastInference')}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
