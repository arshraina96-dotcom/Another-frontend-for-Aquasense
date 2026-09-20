export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export type LanguageCode =
  | 'en'
  | 'as'
  | 'bn'
  | 'brx'
  | 'doi'
  | 'gu'
  | 'hi'
  | 'kn'
  | 'ks'
  | 'kok'
  | 'mai'
  | 'ml'
  | 'mni'
  | 'mr'
  | 'ne'
  | 'or'
  | 'pa'
  | 'sa'
  | 'sat'
  | 'sd'
  | 'ta'
  | 'te'
  | 'ur';

export interface LocationInfo {
  id: string;
  name: string;
  district: string;
  state: string;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  elevationMeters: number;
  population: number;
}

export interface WeatherCondition {
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  windDirection: string;
  atmosphericPressureHpa?: number;
  pressureHpa?: number;
  currentRainfallMmHr: number;
  rainfallTrend: 'rising' | 'steady' | 'falling';
  recentRainfallTrend: number[];
  conditionText: string;
  cloudCoverPercent?: number;
  dewPointC?: number;
}

export interface RainfallForecastItem {
  time?: string;
  hour?: string;
  rainfallMm: number;
  isAiPrediction: boolean;
  confidencePercent: number;
  intensity: 'light' | 'moderate' | 'heavy' | 'torrential';
}

export interface FloodPredictionData {
  floodProbabilityPercent: number;
  expectedWaterDepthMinM: number;
  expectedWaterDepthMaxM: number;
  timeToThresholdMinutes: number;
  maxExpectedDepthM: number;
  riskLevel: RiskLevel;
  confidenceScorePercent: number;
  inundationAreaSqKm: number;
  timelineForecast: {
    step: 'now' | '+1h' | '+2h' | '+3h' | '+6h';
    label: string;
    waterDepthM: number;
    inundationAreaSqKm: number;
    riskLevel: RiskLevel;
  }[];
}

export interface RiskFactorItem {
  factor: string;
  percentage: number;
  description: string;
}

export interface RiverStation {
  name?: string;
  stationName?: string;
  riverName?: string;
  currentLevelM?: number;
  currentLevelFt?: number;
  warningLevelM?: number;
  dangerLevelM?: number;
  alertMarkFt?: number;
  dangerMarkFt?: number;
  trend: 'rising' | 'stable' | 'steady' | 'falling';
  status: 'normal' | 'warning' | 'danger' | 'critical';
}

export interface InfrastructureItem {
  id: string;
  name: string;
  type: 'road' | 'hospital' | 'school' | 'shelter';
  riskLevel: RiskLevel;
  status: string;
  impactDetail: string;
  coordinates: [number, number];
  distanceKm?: number;
  capacity?: number;
  currentAvailability?: number;
  alternativeRoute?: string;
  alternateRoute?: string;
  closureEta?: string;
  accessibility: 'fully_accessible' | 'limited' | 'inundated';
}

export interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: RiskLevel;
  issuedAt?: string;
  timestamp?: string;
  validUntil: string;
  confidencePercent: number;
  affectedZones: string[];
  recommendedAction: string;
  acknowledged?: boolean;
}

export interface HistoricalEvent {
  id: string;
  title?: string;
  name?: string;
  date: string;
  location: string;
  peakRainfallMm?: number;
  rainfallObservedMm?: number;
  peakWaterDepthM?: number;
  floodExtentSqKm: number;
  pod?: number;
  far?: number;
  iou?: number;
  precision?: number;
  recall?: number;
  rmse?: number;
  description: string;
  metrics?: {
    pod: number;
    far: number;
    csi?: number;
    iou: number;
    precision?: number;
    recall?: number;
    rmseDepthM?: number;
    depthRmseM?: number;
  };
  observedExtentPoly: [number, number][];
  predictedExtentPoly: [number, number][];
}

export interface MapLayerState {
  rainfall: boolean;
  floodRisk: boolean;
  waterDepth: boolean;
  riverLevel: boolean;
  roads: boolean;
  hospitals: boolean;
  schools: boolean;
  shelters: boolean;
  satellite: boolean;
}

export interface SOPResourcePlan {
  immediateActions: string[];
  evacuationZones: string[];
  ndrfTeams: number;
  ambulances: number;
  shelterCapacity: number;
  helplineNumbers: string[];
}

export type UserRole = 'citizen' | 'authority';

export interface UserProfile {
  role: UserRole;
  name: string;
  phone?: string;
  officialId?: string;
  department?: string;
  designation?: string;
  locality?: string;
  isLoggedIn: boolean;
}

export interface CitizenSOSRequest {
  id: string;
  timestamp: string;
  citizenName: string;
  phone: string;
  locality: string;
  city: string;
  coordinates: [number, number];
  emergencyType: 'trapped_roof' | 'medical' | 'elderly_infant' | 'food_water' | 'structural_collapse';
  peopleCount: number;
  waterDepthM: number;
  status: 'pending' | 'dispatched' | 'rescued';
  assignedUnit?: string;
  priority: 'critical' | 'high' | 'medium';
  notes?: string;
}

export interface ReliefShelter {
  id: string;
  name: string;
  type: 'school' | 'stadium' | 'community_hall' | 'temple_mosque' | 'govt_building';
  address: string;
  cityId: string;
  coordinates: [number, number];
  distanceKm: number;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  contactPerson: string;
  contactPhone: string;
  elevationMeters: number;
  routeStatus: 'safe' | 'caution' | 'impassable';
  hasMedicalCamp: boolean;
  hasCleanWater: boolean;
  hasGeneratorPower: boolean;
}
