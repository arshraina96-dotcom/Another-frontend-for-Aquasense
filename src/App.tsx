import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { LiveRiskMapView } from './components/views/LiveRiskMapView';
import { RainfallPredictionView } from './components/views/RainfallPredictionView';
import { FloodPredictionView } from './components/views/FloodPredictionView';
import { InfrastructureImpactView } from './components/views/InfrastructureImpactView';
import { AlertsView } from './components/views/AlertsView';
import { HistoricalEventsView } from './components/views/HistoricalEventsView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { EmergencySOPModal } from './components/modals/EmergencySOPModal';
import { LandingPageModal } from './components/modals/LandingPageModal';
import { LoginRoleModal } from './components/modals/LoginRoleModal';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, isRTL, language, toast } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'live_map':
        return <LiveRiskMapView />;
      case 'rainfall':
        return <RainfallPredictionView />;
      case 'flood':
        return <FloodPredictionView />;
      case 'infrastructure':
        return <InfrastructureImpactView />;
      case 'alerts':
        return <AlertsView />;
      case 'historical':
        return <HistoricalEventsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div
      id="aquasense-root-container"
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={language}
      className={`min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white ${
        isRTL ? 'font-arabic' : ''
      }`}
    >
      {/* Top Main Navigation Header */}
      <Header />

      {/* Main Workspace: Sidebar + Dynamic Content View */}
      <div className="flex-1 flex w-full relative">
        {/* Collapsible Command Center Sidebar */}
        <Sidebar />

        {/* Primary Page Canvas */}
        <main
          id="aquasense-main-canvas"
          className="flex-1 min-w-0 px-3 sm:px-5 lg:px-7 py-4 sm:py-6 overflow-y-auto max-w-[1920px] mx-auto w-full"
        >
          {renderActiveView()}
        </main>
      </div>

      {/* Toast Notification Banner */}
      {toast && (
        <div
          id="aquasense-toast-banner"
          className={`fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl border shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-xs sm:text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
              : toast.type === 'alert'
              ? 'bg-red-950/90 border-red-500/50 text-red-200'
              : 'bg-slate-900/95 border-cyan-500/50 text-cyan-200'
          }`}
          role="alert"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : toast.type === 'alert' ? (
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modals */}
      <LoginRoleModal />
      <EmergencySOPModal />
      <LandingPageModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
