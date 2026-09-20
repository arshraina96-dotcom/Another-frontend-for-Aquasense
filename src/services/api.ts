import {
  WeatherCondition,
  RainfallForecastItem,
  FloodPredictionData,
  RiverStation,
  InfrastructureItem,
  AlertItem,
  HistoricalEvent,
  LocationInfo
} from '../types';
import {
  ALL_LOCATIONS,
  HISTORICAL_EVENTS,
  getDatasetForLocation,
  LocationDataset
} from '../data/mockData';
import {
  getAllStates,
  getStateById,
  getDistrictsByState,
  getDistrictById,
  getCitiesByDistrict,
  getCityById,
  getNationalStats as fetchNationalStats,
  searchIndiaLocations,
  SearchResultItem,
  IndiaStateData,
  IndiaDistrictData,
  IndiaCityData,
  NationalOverviewStats
} from '../data/india';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Finds the closest configured location ID by coordinate distance
 */
function findClosestLocationId(lat: number, lon: number): string {
  let closestId = 'srinagar';
  let minDistance = Infinity;

  for (const loc of ALL_LOCATIONS) {
    const dLat = loc.coordinates[1] - lat;
    const dLon = loc.coordinates[0] - lon;
    const distSq = dLat * dLat + dLon * dLon;
    if (distSq < minDistance) {
      minDistance = distSq;
      closestId = loc.id;
    }
  }

  return closestId;
}

// ----------------------------------------------------
// India-Wide Geographic Hierarchy Services
// ----------------------------------------------------

export async function getIndiaStates(): Promise<IndiaStateData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/states`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return getAllStates();
}

export async function getDistricts(stateId: string): Promise<IndiaDistrictData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/states/${encodeURIComponent(stateId)}/districts`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return getDistrictsByState(stateId);
}

export async function getCities(districtId: string): Promise<IndiaCityData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/districts/${encodeURIComponent(districtId)}/cities`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return getCitiesByDistrict(districtId);
}

export async function searchLocations(query: string): Promise<SearchResultItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return searchIndiaLocations(query);
}

export async function getStateRisk(stateId: string): Promise<IndiaStateData | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/states/${encodeURIComponent(stateId)}/risk`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return getStateById(stateId);
}

export async function getDistrictRisk(districtId: string): Promise<IndiaDistrictData | undefined> {
  try {
    const res = await fetch(`${API_BASE_URL}/districts/${encodeURIComponent(districtId)}/risk`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return getDistrictById(districtId);
}

export async function getNationalStats(): Promise<NationalOverviewStats> {
  try {
    const res = await fetch(`${API_BASE_URL}/national-stats`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return fetchNationalStats();
}

// ----------------------------------------------------
// Telemetry, Weather & Predictions
// ----------------------------------------------------

export async function getWeather(lat: number, lon: number): Promise<WeatherCondition> {
  try {
    const res = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).weather;
}

export async function getRainfallForecast(lat: number, lon: number): Promise<RainfallForecastItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/rainfall?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).rainfallForecast;
}

export const getRainfallPrediction = getRainfallForecast;

export async function getFloodRisk(lat: number, lon: number): Promise<FloodPredictionData> {
  try {
    const res = await fetch(`${API_BASE_URL}/flood-risk?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).floodPrediction;
}

export async function getWaterDepth(lat: number, lon: number): Promise<{ minM: number; maxM: number; maxExpectedM: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/inundation?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  const data = getDatasetForLocation(locId).floodPrediction;
  return {
    minM: data.expectedWaterDepthMinM,
    maxM: data.expectedWaterDepthMaxM,
    maxExpectedM: data.maxExpectedDepthM
  };
}

export const getInundation = getWaterDepth;

export async function getRiverLevel(lat: number, lon: number): Promise<RiverStation[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/river?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).riverStations;
}

export async function getInfrastructure(lat: number, lon: number): Promise<InfrastructureItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/infrastructure?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).infrastructure;
}

export async function getAlerts(lat: number, lon: number): Promise<AlertItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/alerts?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  const locId = findClosestLocationId(lat, lon);
  return getDatasetForLocation(locId).alerts;
}

export async function getHistoricalEvents(): Promise<HistoricalEvent[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/historical`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }
  return HISTORICAL_EVENTS;
}

export async function geocodeLocation(query: string): Promise<LocationInfo[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/geocode?q=${encodeURIComponent(query)}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }

  // Search across ALL_LOCATIONS
  const matched = ALL_LOCATIONS.filter(
    loc =>
      loc.name.toLowerCase().includes(normalized) ||
      loc.district.toLowerCase().includes(normalized) ||
      loc.state.toLowerCase().includes(normalized)
  );

  if (matched.length > 0) return matched;

  // Fallback to India cities
  const cityMatch = getCityById(normalized) || INDIA_CITIES_LOOKUP(normalized);
  if (cityMatch) {
    return [{
      id: cityMatch.id,
      name: cityMatch.name,
      district: cityMatch.districtName,
      state: cityMatch.stateName,
      country: 'India',
      coordinates: cityMatch.coordinates,
      elevationMeters: cityMatch.elevationMeters,
      population: cityMatch.population
    }];
  }

  return [];
}

function INDIA_CITIES_LOOKUP(clean: string): IndiaCityData | undefined {
  return searchIndiaLocations(clean).length > 0 ? getCityById(searchIndiaLocations(clean)[0].id) : undefined;
}

export async function reverseGeocode(lat: number, lon: number): Promise<LocationInfo> {
  try {
    const res = await fetch(`${API_BASE_URL}/reverse-geocode?lat=${lat}&lon=${lon}`);
    if (res.ok) return await res.json();
  } catch {
    // fallback
  }

  const locId = findClosestLocationId(lat, lon);
  const found = ALL_LOCATIONS.find(l => l.id === locId);
  return found || ALL_LOCATIONS[0];
}

export function getLocationDatasetById(id: string): LocationDataset {
  return getDatasetForLocation(id);
}
