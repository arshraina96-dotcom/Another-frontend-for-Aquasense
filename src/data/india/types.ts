export interface IndiaStateData {
  id: string;
  name: string;
  code: string;
  type: 'state' | 'ut';
  capital: string;
  coordinates: [number, number]; // [lng, lat]
  mapCenter: [number, number]; // SVG projection coords [x, y] in 1000x1000
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  rainfallMmHr: number;
  predictedRainfallMm: number;
  heavyRainProbPercent: number;
  floodProbPercent: number;
  waterDepthRange: string;
  leadTimeMinutes: number;
  affectedDistrictsCount: number;
  totalDistricts: number;
  populationExposed: string;
  primaryRivers: string[];
  svgPath: string; // Accurate vector silhouette of the state
  keyDistricts: string[];
}

export interface IndiaDistrictData {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  coordinates: [number, number]; // [lng, lat]
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  rainfallMmHr: number;
  predictedRainfallMm: number;
  floodProbPercent: number;
  waterDepthRange: string;
  criticalInfraAtRisk: number;
  populationExposure: number;
  majorCities: string[];
}

export interface IndiaCityData {
  id: string;
  name: string;
  districtId: string;
  districtName: string;
  stateId: string;
  stateName: string;
  coordinates: [number, number]; // [lng, lat]
  elevationMeters: number;
  population: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  rainfallMmHr: number;
  predictedRainfallMm: number;
  floodProbPercent: number;
  waterDepthRange: string;
  leadTimeMinutes: number;
  isDemoLocation?: boolean;
}

export interface NationalOverviewStats {
  activeWarnings: number;
  highRiskDistricts: number;
  criticalZones: number;
  heavyRainfallAlerts: number;
  populationExposed: string;
  dataSourcesOnline: {
    active: number;
    total: number;
  };
  lastUpdated: string;
  status: string;
  isDemoData: boolean;
}
