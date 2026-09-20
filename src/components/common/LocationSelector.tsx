import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  getAllStates,
  getDistrictsByState,
  getCitiesByDistrict,
  searchIndiaLocations,
  SearchResultItem,
  IndiaStateData,
  IndiaDistrictData,
  IndiaCityData
} from '../../data/india';
import { ALL_LOCATIONS } from '../../data/mockData';
import { reverseGeocode } from '../../services/api';
import { LocationInfo } from '../../types';
import {
  Search,
  MapPin,
  Compass,
  History,
  Navigation,
  ChevronDown,
  Check,
  Layers,
  ArrowRight
} from 'lucide-react';

export const LocationSelector: React.FC = () => {
  const {
    t,
    selectedLocation,
    setSelectedLocation,
    recentLocations,
    showToast,
    drillDownToState,
    drillDownToDistrict,
    drillDownToCity
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // Cascading dropdown state based on India geographic dataset
  const allStates = getAllStates();
  const [selectedStateId, setSelectedStateId] = useState<string>('jammu-kashmir');
  const [availableDistricts, setAvailableDistricts] = useState<IndiaDistrictData[]>(() =>
    getDistrictsByState('jammu-kashmir')
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('srinagar-dist');
  const [availableCities, setAvailableCities] = useState<IndiaCityData[]>(() =>
    getCitiesByDistrict('srinagar-dist')
  );
  const [selectedCityId, setSelectedCityId] = useState<string>('srinagar');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keep cascading dropdowns synchronized with state selections
  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const districts = getDistrictsByState(stateId);
    setAvailableDistricts(districts);

    if (districts.length > 0) {
      const firstDist = districts[0];
      setSelectedDistrictId(firstDist.id);
      const cities = getCitiesByDistrict(firstDist.id);
      setAvailableCities(cities);
      if (cities.length > 0) {
        setSelectedCityId(cities[0].id);
      } else {
        setSelectedCityId(firstDist.id);
      }
    } else {
      setSelectedDistrictId('');
      setAvailableCities([]);
      setSelectedCityId('');
    }
  };

  const handleDistrictChange = (distId: string) => {
    setSelectedDistrictId(distId);
    const cities = getCitiesByDistrict(distId);
    setAvailableCities(cities);
    if (cities.length > 0) {
      setSelectedCityId(cities[0].id);
    } else {
      setSelectedCityId(distId);
    }
  };

  // Sync cascading dropdowns when selectedLocation changes globally
  useEffect(() => {
    const matchedState = allStates.find(
      s => s.name.toLowerCase() === selectedLocation.state.toLowerCase() ||
           selectedLocation.state.toLowerCase().includes(s.name.toLowerCase())
    );
    if (matchedState) {
      setSelectedStateId(matchedState.id);
      const districts = getDistrictsByState(matchedState.id);
      setAvailableDistricts(districts);

      const matchedDist = districts.find(
        d => selectedLocation.district.toLowerCase().includes(d.name.toLowerCase())
      );
      if (matchedDist) {
        setSelectedDistrictId(matchedDist.id);
        const cities = getCitiesByDistrict(matchedDist.id);
        setAvailableCities(cities);
        const matchedCity = cities.find(
          c => c.id.toLowerCase() === selectedLocation.id.toLowerCase() ||
               c.name.toLowerCase() === selectedLocation.name.toLowerCase()
        );
        if (matchedCity) {
          setSelectedCityId(matchedCity.id);
        }
      }
    }
  }, [selectedLocation]);

  // Autocomplete debouncing with India-wide fuzzy search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const results = searchIndiaLocations(searchQuery);
      setSuggestions(results);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSuggestion = (item: SearchResultItem) => {
    if (item.type === 'state' || item.type === 'ut') {
      drillDownToState(item.stateId);
    } else if (item.type === 'district') {
      drillDownToDistrict(item.districtId || item.id);
    } else {
      drillDownToCity(item.cityId || item.id);
    }
    setSearchQuery('');
    setSuggestions([]);
    setShowDropdown(false);
    setGeoError(null);
  };

  const handleApplyCascading = () => {
    if (selectedCityId) {
      drillDownToCity(selectedCityId);
    } else if (selectedDistrictId) {
      drillDownToDistrict(selectedDistrictId);
    } else if (selectedStateId) {
      drillDownToState(selectedStateId);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setGeoError(t('locationDenied'));
      showToast(t('locationDenied'), 'alert');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async position => {
        setIsLocating(false);
        const { latitude, longitude } = position.coords;
        try {
          const loc = await reverseGeocode(latitude, longitude);
          setSelectedLocation(loc);
          showToast(`Detected nearest meteorological station: ${loc.name}, ${loc.district}`, 'success');
        } catch {
          setSelectedLocation(ALL_LOCATIONS[0]);
        }
      },
      error => {
        setIsLocating(false);
        setGeoError(error.message || t('locationDenied'));
        showToast(t('locationDenied'), 'alert');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'text-red-400 bg-red-500/15 border-red-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/15 border-orange-500/30';
      case 'moderate':
        return 'text-amber-400 bg-amber-500/15 border-amber-500/30';
      default:
        return 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30';
    }
  };

  return (
    <div
      id="aquasense-location-selector-bar"
      className="w-full bg-[#0d1527]/90 border border-slate-800/80 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md"
    >
      <div className="flex flex-col gap-3">
        {/* Top Row: Search Input + Geolocation Button */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
          {/* Autocomplete Search */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-cyan-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                id="location-search-input"
                type="text"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search any city, district or state in India (e.g. Srinagar, Mumbai, Guwahati, Delhi)..."
                className="w-full pl-9 pr-8 py-2.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="absolute right-2.5 text-xs text-slate-400 hover:text-white px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && (suggestions.length > 0 || searchQuery.trim().length > 0) && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div
                  id="location-suggestions-dropdown"
                  className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900/95 border border-slate-700/90 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden divide-y divide-slate-800/80 max-h-80 overflow-y-auto"
                >
                  {suggestions.length > 0 ? (
                    suggestions.map(item => (
                      <button
                        key={`${item.type}-${item.id}`}
                        id={`suggestion-${item.id}`}
                        onClick={() => handleSelectSuggestion(item)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-left text-xs hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {item.name}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <span className="capitalize text-slate-300 font-mono text-[10px] px-1 py-0.2 bg-slate-800 rounded border border-slate-700">
                                {item.type.toUpperCase()}
                              </span>
                              <span>{item.parentName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded border uppercase ${getRiskColor(
                              item.riskLevel
                            )}`}
                          >
                            {item.riskLevel}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-xs text-slate-400 text-center">
                      No Indian locations matching &quot;{searchQuery}&quot;. Try searching another city, district or state.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Use My Location GPS Button */}
          <button
            id="use-my-location-btn"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white rounded-xl transition-colors shadow-sm disabled:opacity-50 shrink-0"
            title="Locate via GPS"
          >
            <Navigation className={`w-3.5 h-3.5 text-cyan-400 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>
        </div>

        {/* Cascading Dropdowns: State / UT -> District -> City / Town */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 pt-2 border-t border-slate-800/70 items-center">
          {/* State / UT Dropdown (36 States & UTs) */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              <span>State / Union Territory ({allStates.length})</span>
            </label>
            <div className="relative">
              <select
                id="state-dropdown-select"
                value={selectedStateId}
                onChange={e => handleStateChange(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
              >
                {allStates.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} ({st.type.toUpperCase()})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* District Dropdown */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              District
            </label>
            <div className="relative">
              <select
                id="district-dropdown-select"
                value={selectedDistrictId}
                onChange={e => handleDistrictChange(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
              >
                {availableDistricts.length > 0 ? (
                  availableDistricts.map(dist => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} District
                    </option>
                  ))
                ) : (
                  <option value="">All Districts in State</option>
                )}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* City / Town Dropdown */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              City / Town / Basin
            </label>
            <div className="relative">
              <select
                id="city-dropdown-select"
                value={selectedCityId}
                onChange={e => setSelectedCityId(e.target.value)}
                className="w-full appearance-none pl-3 pr-8 py-2 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-sans"
              >
                {availableCities.length > 0 ? (
                  availableCities.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <option value={selectedDistrictId || selectedStateId}>
                    District Headquarters
                  </option>
                )}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Apply Button */}
          <div className="sm:col-span-1 flex items-end">
            <button
              id="apply-location-btn"
              onClick={handleApplyCascading}
              className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-md shadow-cyan-600/20 flex items-center justify-center gap-1 sm:mt-5"
              title="Load Selected Region"
            >
              <Check className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Go</span>
              <span className="sm:hidden">Load Area</span>
            </button>
          </div>
        </div>

        {/* Quick Recent Locations Pills */}
        {recentLocations.length > 0 && (
          <div className="flex items-center gap-2 pt-1 overflow-x-auto text-[11px] text-slate-400">
            <span className="flex items-center gap-1 shrink-0 text-slate-500">
              <History className="w-3 h-3" />
              <span>Quick Access:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {recentLocations.map(loc => (
                <button
                  key={loc.id}
                  id={`recent-loc-${loc.id}`}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-2 py-0.5 rounded-lg border transition-all text-left whitespace-nowrap ${
                    selectedLocation.id === loc.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-medium'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  {loc.name}, {loc.state}
                </button>
              ))}
            </div>
          </div>
        )}

        {geoError && (
          <div className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-2.5 py-1">
            {geoError}
          </div>
        )}
      </div>
    </div>
  );
};
