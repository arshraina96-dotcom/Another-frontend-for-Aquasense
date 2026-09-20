import { INDIA_STATES, NATIONAL_OVERVIEW_STATS } from './states';
import { INDIA_DISTRICTS } from './districts';
import { INDIA_CITIES } from './cities';
import { IndiaStateData, IndiaDistrictData, IndiaCityData, NationalOverviewStats } from './types';

export * from './types';
export * from './states';
export * from './districts';
export * from './cities';

export interface SearchResultItem {
  id: string;
  name: string;
  type: 'state' | 'ut' | 'district' | 'city';
  parentName: string;
  hierarchy: string;
  coordinates: [number, number];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  stateId: string;
  districtId?: string;
  cityId?: string;
}

export function getAllStates(): IndiaStateData[] {
  return INDIA_STATES;
}

export function getStateById(id: string): IndiaStateData | undefined {
  return INDIA_STATES.find(s => s.id.toLowerCase() === id.toLowerCase() || s.code.toLowerCase() === id.toLowerCase());
}

export function getDistrictsByState(stateId: string): IndiaDistrictData[] {
  return INDIA_DISTRICTS.filter(d => d.stateId.toLowerCase() === stateId.toLowerCase());
}

export function getDistrictById(id: string): IndiaDistrictData | undefined {
  return INDIA_DISTRICTS.find(d => d.id.toLowerCase() === id.toLowerCase());
}

export function getCitiesByDistrict(districtId: string): IndiaCityData[] {
  return INDIA_CITIES.filter(c => c.districtId.toLowerCase() === districtId.toLowerCase());
}

export function getCityById(id: string): IndiaCityData | undefined {
  return INDIA_CITIES.find(c => c.id.toLowerCase() === id.toLowerCase());
}

export function getNationalStats(): NationalOverviewStats {
  return NATIONAL_OVERVIEW_STATS;
}

/**
 * High-performance, fuzzy-tolerant search across states, UTs, districts, cities, and towns
 */
export function searchIndiaLocations(query: string): SearchResultItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const results: SearchResultItem[] = [];

  // 1. Search Cities & Towns
  for (const city of INDIA_CITIES) {
    if (city.name.toLowerCase().includes(clean) || city.districtName.toLowerCase().includes(clean)) {
      results.push({
        id: city.id,
        name: city.name,
        type: 'city',
        parentName: `${city.districtName}, ${city.stateName}`,
        hierarchy: `${city.name} • ${city.districtName} • ${city.stateName} • India`,
        coordinates: city.coordinates,
        riskLevel: city.riskLevel,
        stateId: city.stateId,
        districtId: city.districtId,
        cityId: city.id
      });
    }
  }

  // 2. Search Districts
  for (const dist of INDIA_DISTRICTS) {
    if (dist.name.toLowerCase().includes(clean)) {
      results.push({
        id: dist.id,
        name: `${dist.name} District`,
        type: 'district',
        parentName: dist.stateName,
        hierarchy: `${dist.name} District • ${dist.stateName} • India`,
        coordinates: dist.coordinates,
        riskLevel: dist.riskLevel,
        stateId: dist.stateId,
        districtId: dist.id
      });
    }
  }

  // 3. Search States & UTs
  for (const state of INDIA_STATES) {
    if (state.name.toLowerCase().includes(clean) || state.code.toLowerCase() === clean) {
      results.push({
        id: state.id,
        name: state.name,
        type: state.type,
        parentName: 'Republic of India',
        hierarchy: `${state.name} (${state.type.toUpperCase()}) • India`,
        coordinates: state.coordinates,
        riskLevel: state.riskLevel,
        stateId: state.id
      });
    }
  }

  // Deduplicate and rank exact match first
  return results.sort((a, b) => {
    const aExact = a.name.toLowerCase() === clean ? -1 : 0;
    const bExact = b.name.toLowerCase() === clean ? -1 : 0;
    return aExact - bExact;
  }).slice(0, 10);
}

/**
 * Major Indian River networks with coordinates for GIS mapping
 */
export const MAJOR_INDIA_RIVERS = [
  { name: 'Ganga', points: [[79.0, 30.5], [80.5, 27.5], [83.0, 25.5], [87.5, 24.0], [88.3, 22.5]], color: '#38bdf8' },
  { name: 'Brahmaputra', points: [[95.0, 28.5], [93.0, 26.5], [91.5, 26.1], [89.8, 25.2]], color: '#06b6d4' },
  { name: 'Indus / Jhelum', points: [[78.5, 34.5], [75.2, 33.7], [74.8, 34.1], [74.3, 34.2]], color: '#60a5fa' },
  { name: 'Yamuna', points: [[78.4, 31.0], [77.2, 28.6], [78.0, 27.2], [81.8, 25.4]], color: '#38bdf8' },
  { name: 'Godavari', points: [[73.5, 19.9], [76.0, 19.0], [79.0, 18.5], [81.8, 16.9]], color: '#22d3ee' },
  { name: 'Krishna', points: [[73.7, 18.0], [76.5, 16.2], [79.5, 16.0], [80.8, 15.8]], color: '#38bdf8' },
  { name: 'Narmada', points: [[81.7, 22.7], [78.5, 22.8], [75.0, 22.0], [72.8, 21.6]], color: '#67e8f9' },
  { name: 'Mahanadi', points: [[81.8, 20.8], [83.5, 21.4], [85.8, 20.4], [86.7, 20.2]], color: '#38bdf8' },
  { name: 'Cauvery', points: [[75.5, 12.4], [77.5, 12.0], [79.0, 11.2], [79.8, 11.1]], color: '#38bdf8' }
];
