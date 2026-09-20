import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  LanguageCode,
  LocationInfo,
  MapLayerState,
  RiskLevel,
  UserRole,
  UserProfile,
  CitizenSOSRequest,
  ReliefShelter
} from '../types';
import {
  SUPPORTED_LANGUAGES,
  translations,
  TranslationKey
} from '../locales';
import {
  ALL_LOCATIONS,
  LocationDataset,
  getDatasetForLocation
} from '../data/mockData';
import { DEMO_SCENARIOS, DisasterScenario } from '../data/india/scenarios';
import {
  INITIAL_RELIEF_SHELTERS,
  INITIAL_CITIZEN_SOS_REQUESTS,
  SURVIVAL_KIT_ITEMS
} from '../data/citizenData';
import {
  getStateById,
  getDistrictById,
  getCityById,
  IndiaStateData,
  IndiaDistrictData,
  IndiaCityData
} from '../data/india';

export interface HotspotInfo {
  name: string;
  coordinates: [number, number];
  rainfallMmHr: number;
  predictedRainfallMm: number;
  floodProbabilityPercent: number;
  waterDepthRange: string;
  leadTimeMinutes: number;
  riskLevel: RiskLevel;
}

export type GeographicViewLevel = 'national' | 'state' | 'district' | 'city';

interface AppContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isRTL: boolean;
  t: (key: TranslationKey) => string;

  selectedLocation: LocationInfo;
  setSelectedLocation: (loc: LocationInfo) => void;
  locationData: LocationDataset;

  recentLocations: LocationInfo[];
  addRecentLocation: (loc: LocationInfo) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  mapLayers: MapLayerState;
  toggleMapLayer: (layer: keyof MapLayerState) => void;

  timelineHour: 'now' | '+1h' | '+2h' | '+3h' | '+6h';
  setTimelineHour: (hour: 'now' | '+1h' | '+2h' | '+3h' | '+6h') => void;

  selectedHotspot: HotspotInfo | null;
  setSelectedHotspot: (h: HotspotInfo | null) => void;

  acknowledgedAlertIds: string[];
  acknowledgeAlert: (id: string) => void;

  isLandingModalOpen: boolean;
  setIsLandingModalOpen: (open: boolean) => void;

  isSOPModalOpen: boolean;
  setIsSOPModalOpen: (open: boolean) => void;

  toast: { message: string; type?: 'info' | 'success' | 'alert' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;

  // Geographic Drill-Down Hierarchy (India -> State -> District -> City)
  geographicLevel: GeographicViewLevel;
  setGeographicLevel: (level: GeographicViewLevel) => void;
  selectedStateId: string | null;
  selectedDistrictId: string | null;
  selectedStateData: IndiaStateData | null;
  selectedDistrictData: IndiaDistrictData | null;
  drillDownToState: (stateId: string) => void;
  drillDownToDistrict: (districtId: string) => void;
  drillDownToCity: (cityId: string) => void;
  resetToNationalView: () => void;

  // Role-Based Architecture
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  userRole: UserRole;
  loginAs: (role: UserRole, customData?: Partial<UserProfile>) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Citizen SOS & Shelters
  sosRequests: CitizenSOSRequest[];
  submitSOSRequest: (req: Omit<CitizenSOSRequest, 'id' | 'timestamp' | 'status'>) => string;
  updateSOSStatus: (id: string, status: CitizenSOSRequest['status'], assignedUnit?: string) => void;
  reliefShelters: ReliefShelter[];
  survivalCheckedIds: string[];
  toggleSurvivalItem: (id: string) => void;

  // Demo Scenarios & Simulation
  isDemoMode: boolean;
  setIsDemoMode: (enabled: boolean) => void;
  activeScenario: DisasterScenario | null;
  loadScenario: (scenarioId: string) => void;
  clearScenario: () => void;
  scenarios: DisasterScenario[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const RECENT_LOC_KEY = 'aquasense_recent_locations';
const USER_PROFILE_KEY = 'aquasense_user_profile';
const SURVIVAL_KEY = 'aquasense_survival_checked';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [selectedLocation, setSelectedLocationState] = useState<LocationInfo>(ALL_LOCATIONS[0]);
  const [locationData, setLocationData] = useState<LocationDataset>(getDatasetForLocation('srinagar'));

  // Role-Based State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      role: 'citizen',
      name: 'Mohammad Farooq',
      phone: '+91 94190 44821',
      locality: 'Rajbagh, Srinagar',
      isLoggedIn: false // Prompt user to select their role at login
    };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(USER_PROFILE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return !parsed.isLoggedIn;
      }
    } catch {
      // ignore
    }
    return true; // Show login role selection on first visit!
  });

  const [sosRequests, setSosRequests] = useState<CitizenSOSRequest[]>(INITIAL_CITIZEN_SOS_REQUESTS);
  const [reliefShelters] = useState<ReliefShelter[]>(INITIAL_RELIEF_SHELTERS);
  const [survivalCheckedIds, setSurvivalCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SURVIVAL_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['water', 'docs'];
  });
  const [recentLocations, setRecentLocations] = useState<LocationInfo[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_LOC_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [ALL_LOCATIONS[0], ALL_LOCATIONS[4], ALL_LOCATIONS[2]]; // Srinagar, Jammu, Baramulla
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Geographic Hierarchy
  const [geographicLevel, setGeographicLevel] = useState<GeographicViewLevel>('national');
  const [selectedStateId, setSelectedStateId] = useState<string | null>('jammu-kashmir');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>('srinagar-dist');

  // Demo Mode
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [activeScenario, setActiveScenario] = useState<DisasterScenario | null>(DEMO_SCENARIOS[0]);

  const [mapLayers, setMapLayers] = useState<MapLayerState>({
    rainfall: true,
    floodRisk: true,
    waterDepth: true,
    riverLevel: true,
    roads: true,
    hospitals: true,
    schools: false,
    shelters: true,
    satellite: false
  });

  const [timelineHour, setTimelineHour] = useState<'now' | '+1h' | '+2h' | '+3h' | '+6h'>('now');
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotInfo | null>(() => {
    return locationData.hotspots[0] || null;
  });

  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState<string[]>([]);
  const [isLandingModalOpen, setIsLandingModalOpen] = useState<boolean>(false);
  const [isSOPModalOpen, setIsSOPModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'alert' } | null>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language);
  const isRTL = currentLangObj ? currentLangObj.isRTL : false;

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    const target = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    const targetIsRTL = target ? target.isRTL : false;

    document.documentElement.lang = lang;
    document.documentElement.dir = targetIsRTL ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  const setSelectedLocation = (loc: LocationInfo) => {
    setSelectedLocationState(loc);
    const dataset = getDatasetForLocation(loc.id);
    setLocationData(dataset);
    if (dataset.hotspots.length > 0) {
      setSelectedHotspot(dataset.hotspots[0]);
    } else {
      setSelectedHotspot(null);
    }
    addRecentLocation(loc);
    showToast(`Loaded prediction data for ${loc.name}, ${loc.district}`, 'info');
  };

  const addRecentLocation = (loc: LocationInfo) => {
    setRecentLocations(prev => {
      const filtered = prev.filter(item => item.id !== loc.id);
      const updated = [loc, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_LOC_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const toggleMapLayer = (layer: keyof MapLayerState) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  const acknowledgeAlert = (id: string) => {
    setAcknowledgedAlertIds(prev => [...prev, id]);
    showToast(t('acknowledge'), 'success');
  };

  const showToast = (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Geographic navigation handlers
  const drillDownToState = (stateId: string) => {
    setSelectedStateId(stateId);
    setSelectedDistrictId(null);
    setGeographicLevel('state');
    const state = getStateById(stateId);
    if (state) {
      showToast(`Navigated to ${state.name} Risk Overview`, 'info');
    }
  };

  const drillDownToDistrict = (districtId: string) => {
    setSelectedDistrictId(districtId);
    setGeographicLevel('district');
    const district = getDistrictById(districtId);
    if (district) {
      setSelectedStateId(district.stateId);
      showToast(`Focusing on ${district.name} District`, 'info');
    }
  };

  const drillDownToCity = (cityId: string) => {
    setGeographicLevel('city');
    const city = getCityById(cityId);
    if (city) {
      setSelectedStateId(city.stateId);
      setSelectedDistrictId(city.districtId);
      const matchedLoc = ALL_LOCATIONS.find(l => l.id.toLowerCase() === city.id.toLowerCase()) || {
        id: city.id,
        name: city.name,
        district: city.districtName,
        state: city.stateName,
        country: 'India',
        coordinates: city.coordinates,
        elevationMeters: city.elevationMeters,
        population: city.population
      };
      setSelectedLocation(matchedLoc);
    } else {
      const loc = ALL_LOCATIONS.find(l => l.id.toLowerCase() === cityId.toLowerCase());
      if (loc) {
        setSelectedLocation(loc);
      }
    }
  };

  const resetToNationalView = () => {
    setGeographicLevel('national');
    showToast('Reset to National Overview (All-India)', 'info');
  };

  // Scenario loading
  const loadScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;

    setActiveScenario(scenario);
    setSelectedStateId(scenario.stateId);
    setSelectedDistrictId(scenario.districtId);
    setGeographicLevel('city');

    const matchedLoc = ALL_LOCATIONS.find(l => l.id.toLowerCase() === scenario.cityId.toLowerCase()) || {
      id: scenario.cityId,
      name: scenario.cityName,
      district: scenario.districtName,
      state: scenario.stateName,
      country: 'India',
      coordinates: scenario.coordinates,
      elevationMeters: 220,
      population: 1500000
    };

    setSelectedLocation(matchedLoc);
    showToast(`DEMO SCENARIO ACTIVATED: ${scenario.title}`, 'alert');
  };

  const clearScenario = () => {
    setActiveScenario(null);
    showToast('Demo scenario cleared', 'info');
  };

  // Role Authentication and Management
  const loginAs = (role: UserRole, customData?: Partial<UserProfile>) => {
    let profile: UserProfile;
    if (role === 'citizen') {
      profile = {
        role: 'citizen',
        name: customData?.name || 'Priya Sharma',
        phone: customData?.phone || '+91 94190 44821',
        locality: customData?.locality || 'Rajbagh, Srinagar',
        designation: 'Citizen / Local Resident',
        isLoggedIn: true
      };
      setActiveTab('dashboard');
      showToast(`Logged in to Citizen Safety Portal as ${profile.name}`, 'success');
    } else {
      profile = {
        role: 'authority',
        name: customData?.name || 'Cmdr. Rajesh Verma',
        officialId: customData?.officialId || 'NDRF-HQ-04',
        department: customData?.department || 'NDRF / National Disaster Management Authority',
        designation: customData?.designation || 'Incident Commander & Chief Hydro-Officer',
        isLoggedIn: true
      };
      setActiveTab('dashboard');
      showToast(`Authenticated into Authority Command Center (${profile.officialId})`, 'success');
    }

    setUserProfile(profile);
    setIsLoginModalOpen(false);
    try {
      localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setUserProfile(prev => ({
      ...prev,
      isLoggedIn: false
    }));
    setIsLoginModalOpen(true);
    showToast('Logged out. Please select a dashboard role.', 'info');
    try {
      localStorage.removeItem(USER_PROFILE_KEY);
    } catch {
      // ignore
    }
  };

  const switchRole = (newRole: UserRole) => {
    loginAs(newRole);
  };

  const submitSOSRequest = (req: Omit<CitizenSOSRequest, 'id' | 'timestamp' | 'status'>) => {
    const newId = `SOS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: CitizenSOSRequest = {
      ...req,
      id: newId,
      timestamp: 'Just now',
      status: 'pending'
    };
    setSosRequests(prev => [newReq, ...prev]);
    showToast(`EMERGENCY SOS TRANSMITTED [Ref: ${newId}]. NDRF & DEOC notified!`, 'alert');
    return newId;
  };

  const updateSOSStatus = (id: string, status: CitizenSOSRequest['status'], assignedUnit?: string) => {
    setSosRequests(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            assignedUnit: assignedUnit !== undefined ? assignedUnit : item.assignedUnit
          };
        }
        return item;
      })
    );
    showToast(`SOS ${id} status updated to: ${status.toUpperCase()}`, 'info');
  };

  const toggleSurvivalItem = (id: string) => {
    setSurvivalCheckedIds(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      try {
        localStorage.setItem(SURVIVAL_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const selectedStateData = selectedStateId ? getStateById(selectedStateId) || null : null;
  const selectedDistrictData = selectedDistrictId ? getDistrictById(selectedDistrictId) || null : null;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isRTL,
        t,
        selectedLocation,
        setSelectedLocation,
        locationData,
        recentLocations,
        addRecentLocation,
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        mapLayers,
        toggleMapLayer,
        timelineHour,
        setTimelineHour,
        selectedHotspot,
        setSelectedHotspot,
        acknowledgedAlertIds,
        acknowledgeAlert,
        isLandingModalOpen,
        setIsLandingModalOpen,
        isSOPModalOpen,
        setIsSOPModalOpen,
        toast,
        showToast,

        // Role-Based Architecture
        userProfile,
        setUserProfile,
        userRole: userProfile.role,
        loginAs,
        logout,
        switchRole,
        isLoginModalOpen,
        setIsLoginModalOpen,

        // Citizen SOS & Shelters
        sosRequests,
        submitSOSRequest,
        updateSOSStatus,
        reliefShelters,
        survivalCheckedIds,
        toggleSurvivalItem,

        // Geographic Drill-down
        geographicLevel,
        setGeographicLevel,
        selectedStateId,
        selectedDistrictId,
        selectedStateData,
        selectedDistrictData,
        drillDownToState,
        drillDownToDistrict,
        drillDownToCity,
        resetToNationalView,

        // Demo Scenarios
        isDemoMode,
        setIsDemoMode,
        activeScenario,
        loadScenario,
        clearScenario,
        scenarios: DEMO_SCENARIOS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
