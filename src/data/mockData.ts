import {
  LocationInfo,
  WeatherCondition,
  RainfallForecastItem,
  FloodPredictionData,
  RiskFactorItem,
  RiverStation,
  InfrastructureItem,
  AlertItem,
  HistoricalEvent,
  SOPResourcePlan
} from '../types';

export interface LocationDataset {
  location: LocationInfo;
  weather: WeatherCondition;
  rainfallForecast: RainfallForecastItem[];
  floodPrediction: FloodPredictionData;
  riskDrivers: RiskFactorItem[];
  riverStations: RiverStation[];
  infrastructure: InfrastructureItem[];
  alerts: AlertItem[];
  sop: SOPResourcePlan;
  districtStats: {
    districtRisk: 'low' | 'moderate' | 'high' | 'critical';
    affectedZones: number;
    highRiskAreas: number;
    moderateRiskAreas: number;
    populationExposure: number;
    criticalInfraAtRisk: number;
  };
  hotspots: {
    name: string;
    coordinates: [number, number];
    rainfallMmHr: number;
    predictedRainfallMm: number;
    floodProbabilityPercent: number;
    waterDepthRange: string;
    leadTimeMinutes: number;
    riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  }[];
}

export const ALL_LOCATIONS: LocationInfo[] = [
  {
    id: 'srinagar',
    name: 'Srinagar',
    district: 'Srinagar District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [74.7973, 34.0837],
    elevationMeters: 1585,
    population: 1350000
  },
  {
    id: 'anantnag',
    name: 'Anantnag',
    district: 'Anantnag District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [75.1552, 33.7311],
    elevationMeters: 1600,
    population: 435000
  },
  {
    id: 'baramulla',
    name: 'Baramulla',
    district: 'Baramulla District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [74.3636, 34.1980],
    elevationMeters: 1593,
    population: 380000
  },
  {
    id: 'pulwama',
    name: 'Pulwama',
    district: 'Pulwama District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [74.8955, 33.8718],
    elevationMeters: 1630,
    population: 290000
  },
  {
    id: 'jammu',
    name: 'Jammu',
    district: 'Jammu District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [74.8570, 32.7266],
    elevationMeters: 327,
    population: 950000
  },
  {
    id: 'kupwara',
    name: 'Kupwara',
    district: 'Kupwara District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [74.2546, 34.5262],
    elevationMeters: 1615,
    population: 240000
  },
  {
    id: 'kathua',
    name: 'Kathua',
    district: 'Kathua District',
    state: 'Jammu & Kashmir',
    country: 'India',
    coordinates: [75.5173, 32.3725],
    elevationMeters: 307,
    population: 190000
  },
  {
    id: 'leh',
    name: 'Leh',
    district: 'Leh District',
    state: 'Ladakh',
    country: 'India',
    coordinates: [77.5771, 34.1526],
    elevationMeters: 3524,
    population: 110000
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    district: 'Dehradun District',
    state: 'Uttarakhand',
    country: 'India',
    coordinates: [78.0322, 30.3165],
    elevationMeters: 435,
    population: 780000
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    district: 'Kamrup Metropolitan',
    state: 'Assam',
    country: 'India',
    coordinates: [91.7362, 26.1445],
    elevationMeters: 55,
    population: 1120000
  },
  {
    id: 'delhi',
    name: 'Delhi (New Delhi)',
    district: 'Central Delhi',
    state: 'Delhi (NCT)',
    country: 'India',
    coordinates: [77.2090, 28.6139],
    elevationMeters: 216,
    population: 16787941
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    country: 'India',
    coordinates: [72.8777, 19.0760],
    elevationMeters: 14,
    population: 12442373
  },
  {
    id: 'pune',
    name: 'Pune',
    district: 'Pune District',
    state: 'Maharashtra',
    country: 'India',
    coordinates: [73.8567, 18.5204],
    elevationMeters: 560,
    population: 3124458
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    district: 'Kolkata District',
    state: 'West Bengal',
    country: 'India',
    coordinates: [88.3639, 22.5726],
    elevationMeters: 9,
    population: 4496694
  },
  {
    id: 'chennai',
    name: 'Chennai',
    district: 'Chennai District',
    state: 'Tamil Nadu',
    country: 'India',
    coordinates: [80.2707, 13.0827],
    elevationMeters: 6,
    population: 7088000
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    country: 'India',
    coordinates: [77.5946, 12.9716],
    elevationMeters: 920,
    population: 8443675
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    district: 'Hyderabad District',
    state: 'Telangana',
    country: 'India',
    coordinates: [78.4867, 17.3850],
    elevationMeters: 542,
    population: 6809970
  },
  {
    id: 'kochi',
    name: 'Kochi (Cochin)',
    district: 'Ernakulam',
    state: 'Kerala',
    country: 'India',
    coordinates: [76.2673, 9.9312],
    elevationMeters: 3,
    population: 677381
  },
  {
    id: 'patna',
    name: 'Patna',
    district: 'Patna District',
    state: 'Bihar',
    country: 'India',
    coordinates: [85.1376, 25.5941],
    elevationMeters: 53,
    population: 1684222
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    district: 'Ahmedabad District',
    state: 'Gujarat',
    country: 'India',
    coordinates: [72.5714, 23.0225],
    elevationMeters: 53,
    population: 5577940
  },
  {
    id: 'shimla',
    name: 'Shimla',
    district: 'Shimla District',
    state: 'Himachal Pradesh',
    country: 'India',
    coordinates: [77.1734, 31.1048],
    elevationMeters: 2276,
    population: 169578
  }
];

export const MOCK_DATASETS: Record<string, LocationDataset> = {
  srinagar: {
    location: ALL_LOCATIONS[0],
    weather: {
      temperatureC: 21,
      humidityPercent: 87,
      windSpeedKmh: 18,
      windDirection: 'NNW',
      atmosphericPressureHpa: 1004,
      currentRainfallMmHr: 32,
      rainfallTrend: 'rising',
      recentRainfallTrend: [12, 18, 25, 32],
      conditionText: 'Continuous Intense Downpour & Surface Waterlogging'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 12, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '09:00', rainfallMm: 18, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 25, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '11:00', rainfallMm: 32, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '12:00', rainfallMm: 48, isAiPrediction: true, confidencePercent: 94, intensity: 'torrential' },
      { time: '13:00', rainfallMm: 67, isAiPrediction: true, confidencePercent: 92, intensity: 'torrential' },
      { time: '14:00', rainfallMm: 58, isAiPrediction: true, confidencePercent: 89, intensity: 'heavy' },
      { time: '15:00', rainfallMm: 44, isAiPrediction: true, confidencePercent: 88, intensity: 'heavy' },
      { time: '16:00', rainfallMm: 31, isAiPrediction: true, confidencePercent: 85, intensity: 'moderate' },
      { time: '17:00', rainfallMm: 20, isAiPrediction: true, confidencePercent: 82, intensity: 'moderate' },
      { time: '18:00', rainfallMm: 14, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '19:00', rainfallMm: 8, isAiPrediction: true, confidencePercent: 79, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 78,
      expectedWaterDepthMinM: 0.6,
      expectedWaterDepthMaxM: 1.0,
      timeToThresholdMinutes: 74,
      maxExpectedDepthM: 1.1,
      riskLevel: 'high',
      confidenceScorePercent: 92,
      inundationAreaSqKm: 28.4,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.35, inundationAreaSqKm: 8.2, riskLevel: 'moderate' },
        { step: '+1h', label: '+1h', waterDepthM: 0.65, inundationAreaSqKm: 16.5, riskLevel: 'high' },
        { step: '+2h', label: '+2h', waterDepthM: 0.88, inundationAreaSqKm: 23.1, riskLevel: 'high' },
        { step: '+3h', label: '+3h', waterDepthM: 1.05, inundationAreaSqKm: 28.4, riskLevel: 'high' },
        { step: '+6h', label: '+6h', waterDepthM: 0.72, inundationAreaSqKm: 21.0, riskLevel: 'moderate' }
      ]
    },
    riskDrivers: [
      { factor: 'Heavy Rainfall', percentage: 42, description: 'Catchment precipitation exceeding 60mm in 3-hour cluster' },
      { factor: 'Low Elevation', percentage: 28, description: 'Basin depressions and flat floodplain bowl morphology' },
      { factor: 'Drainage Stress', percentage: 18, description: 'Primary gravity storm drains overwhelmed by backflow' },
      { factor: 'River Level', percentage: 8, description: 'Jhelum River gauge exceeding high discharge threshold' },
      { factor: 'Other Factors', percentage: 4, description: 'Saturated soil moisture index at 91%' }
    ],
    riverStations: [
      { name: 'Jhelum (Ram Munshi Bagh)', currentLevelM: 21.4, warningLevelM: 18.0, dangerLevelM: 21.0, trend: 'rising', status: 'critical' },
      { name: 'Jhelum (Sangam Headwaters)', currentLevelM: 24.8, warningLevelM: 21.0, dangerLevelM: 25.0, trend: 'rising', status: 'danger' },
      { name: 'Doodh Ganga Nallah', currentLevelM: 7.6, warningLevelM: 6.5, dangerLevelM: 8.0, trend: 'rising', status: 'warning' }
    ],
    infrastructure: [
      {
        id: 'inf-1',
        name: 'NH-44 Srinagar Bypass',
        type: 'road',
        riskLevel: 'high',
        status: 'Submerged sections reported near Pantha Chowk',
        impactDetail: 'Possible vehicular disruption in 52 min',
        coordinates: [74.8320, 34.0410],
        alternativeRoute: 'Boulevard Road via Harwan or Old Airport Highway',
        accessibility: 'limited'
      },
      {
        id: 'inf-2',
        name: 'Maulana Azad Road',
        type: 'road',
        riskLevel: 'high',
        status: 'Surface inundation 0.45m',
        impactDetail: 'Closed for light vehicles',
        coordinates: [74.8140, 34.0720],
        alternativeRoute: 'Gupkar Road diversion',
        accessibility: 'inundated'
      },
      {
        id: 'inf-3',
        name: 'SMHS Hospital, Karan Nagar',
        type: 'hospital',
        riskLevel: 'high',
        status: 'Ground level storm surge risk',
        impactDetail: 'Emergency department flood barrier raised',
        coordinates: [74.8050, 34.0880],
        distanceKm: 2.1,
        accessibility: 'limited'
      },
      {
        id: 'inf-4',
        name: 'SKIMS Soura Medical Institute',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Operational on elevated ridge',
        impactDetail: 'Designated primary regional trauma center',
        coordinates: [74.8010, 34.1350],
        distanceKm: 6.4,
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-5',
        name: 'Burn Hall Higher Secondary School',
        type: 'school',
        riskLevel: 'high',
        status: 'Campus water accumulation 0.5m',
        impactDetail: 'Evacuation recommended immediately',
        coordinates: [74.8290, 34.0680],
        accessibility: 'limited'
      },
      {
        id: 'inf-6',
        name: 'Kashmir University Indoor Stadium',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Active Relief Camp',
        impactDetail: 'Food supplies, power genset and medical station active',
        coordinates: [74.8420, 34.1290],
        capacity: 1500,
        currentAvailability: 920,
        distanceKm: 4.8,
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-7',
        name: 'TRC Indoor Sports Complex',
        type: 'shelter',
        riskLevel: 'moderate',
        status: 'Standby Evacuation Center',
        impactDetail: 'Capacity 800 people, drinking water tanks deployed',
        coordinates: [74.8210, 34.0710],
        capacity: 800,
        currentAvailability: 650,
        distanceKm: 1.4,
        accessibility: 'limited'
      }
    ],
    alerts: [
      {
        id: 'alt-sri-1',
        title: 'CRITICAL FLOOD WARNING (RED ALERT)',
        description: 'Heavy rainfall is expected during the next 1–3 hours. Flood probability in the selected zone is 78%. Water depth may reach 0.6–1.0 m near Jhelum river banks and low-lying urban pockets.',
        severity: 'critical',
        issuedAt: '13:25 IST',
        validUntil: '16:30 IST',
        confidencePercent: 91,
        affectedZones: ['Lal Chowk', 'Rajbagh', 'Batamaloo', 'Bemina', 'Mehjoor Nagar'],
        recommendedAction: 'Move valuables to higher floors; avoid underpasses; NDRF teams deploying rescue rafts.'
      },
      {
        id: 'alt-sri-2',
        title: 'Jhelum River Gauge Flash Warning',
        description: 'Ram Munshi Bagh gauge crossed 21.0 ft critical mark. Spill channel gates opened at Padgampora.',
        severity: 'high',
        issuedAt: '12:45 IST',
        validUntil: '18:00 IST',
        confidencePercent: 95,
        affectedZones: ['Pantha Chowk', 'Sonwar', 'Shivpora'],
        recommendedAction: 'Keep emergency kits ready; follow official SDRF evacuation advisories.'
      }
    ],
    sop: {
      immediateActions: [
        'Monitor high-risk zones along Jhelum embankment and low-lying wards',
        'Inspect drainage channels, clear sluice gates and activate high-capacity dewatering de-pumps',
        'Pre-position emergency response teams (NDRF & SDRF) at Batamaloo and Rajbagh',
        'Prepare evacuation shelters at Kashmir University and Sanat Nagar',
        'Restrict access to high-risk roads including NH-44 low underpasses and bund roads'
      ],
      evacuationZones: ['Zone A: Rajbagh & Jawahar Nagar Bund', 'Zone B: Bemina Lower Catchment & Batamaloo Bus Terminal'],
      ndrfTeams: 2,
      ambulances: 5,
      shelterCapacity: 1250,
      helplineNumbers: ['1077 (Disaster Control Room)', '112 (Emergency)', '0194-2452138 (Srinagar Flood Cell)']
    },
    districtStats: {
      districtRisk: 'high',
      affectedZones: 12,
      highRiskAreas: 5,
      moderateRiskAreas: 7,
      populationExposure: 245000,
      criticalInfraAtRisk: 18
    },
    hotspots: [
      {
        name: 'Lal Chowk (City Center)',
        coordinates: [74.8095, 34.0725],
        rainfallMmHr: 31,
        predictedRainfallMm: 67,
        floodProbabilityPercent: 78,
        waterDepthRange: '0.6 – 1.0 m',
        leadTimeMinutes: 74,
        riskLevel: 'high'
      },
      {
        name: 'Rajbagh Riverbank Zone',
        coordinates: [74.8210, 34.0620],
        rainfallMmHr: 34,
        predictedRainfallMm: 72,
        floodProbabilityPercent: 88,
        waterDepthRange: '0.9 – 1.4 m',
        leadTimeMinutes: 48,
        riskLevel: 'critical'
      },
      {
        name: 'Batamaloo Drainage Bowl',
        coordinates: [74.7950, 34.0780],
        rainfallMmHr: 29,
        predictedRainfallMm: 61,
        floodProbabilityPercent: 75,
        waterDepthRange: '0.5 – 0.85 m',
        leadTimeMinutes: 82,
        riskLevel: 'high'
      },
      {
        name: 'Bemina Bypass Lowland',
        coordinates: [74.7730, 34.0890],
        rainfallMmHr: 33,
        predictedRainfallMm: 69,
        floodProbabilityPercent: 82,
        waterDepthRange: '0.8 – 1.2 m',
        leadTimeMinutes: 60,
        riskLevel: 'critical'
      },
      {
        name: 'Dal Lake Boulevard Foothills',
        coordinates: [74.8450, 34.0950],
        rainfallMmHr: 22,
        predictedRainfallMm: 45,
        floodProbabilityPercent: 38,
        waterDepthRange: '0.1 – 0.3 m',
        leadTimeMinutes: 190,
        riskLevel: 'moderate'
      }
    ]
  },

  anantnag: {
    location: ALL_LOCATIONS[1],
    weather: {
      temperatureC: 19,
      humidityPercent: 92,
      windSpeedKmh: 24,
      windDirection: 'NE',
      atmosphericPressureHpa: 998,
      currentRainfallMmHr: 46,
      rainfallTrend: 'rising',
      recentRainfallTrend: [22, 31, 38, 46],
      conditionText: 'Severe Torrential Cloudburst Pattern'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 22, isAiPrediction: false, confidencePercent: 99, intensity: 'heavy' },
      { time: '09:00', rainfallMm: 31, isAiPrediction: false, confidencePercent: 99, intensity: 'heavy' },
      { time: '10:00', rainfallMm: 38, isAiPrediction: false, confidencePercent: 98, intensity: 'torrential' },
      { time: '11:00', rainfallMm: 46, isAiPrediction: false, confidencePercent: 98, intensity: 'torrential' },
      { time: '12:00', rainfallMm: 72, isAiPrediction: true, confidencePercent: 96, intensity: 'torrential' },
      { time: '13:00', rainfallMm: 89, isAiPrediction: true, confidencePercent: 94, intensity: 'torrential' },
      { time: '14:00', rainfallMm: 78, isAiPrediction: true, confidencePercent: 91, intensity: 'torrential' },
      { time: '15:00', rainfallMm: 52, isAiPrediction: true, confidencePercent: 89, intensity: 'heavy' },
      { time: '16:00', rainfallMm: 36, isAiPrediction: true, confidencePercent: 86, intensity: 'heavy' },
      { time: '17:00', rainfallMm: 24, isAiPrediction: true, confidencePercent: 84, intensity: 'moderate' },
      { time: '18:00', rainfallMm: 16, isAiPrediction: true, confidencePercent: 82, intensity: 'moderate' },
      { time: '19:00', rainfallMm: 10, isAiPrediction: true, confidencePercent: 80, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 91,
      expectedWaterDepthMinM: 1.2,
      expectedWaterDepthMaxM: 1.8,
      timeToThresholdMinutes: 35,
      maxExpectedDepthM: 2.1,
      riskLevel: 'critical',
      confidenceScorePercent: 95,
      inundationAreaSqKm: 42.1,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.8, inundationAreaSqKm: 18.2, riskLevel: 'high' },
        { step: '+1h', label: '+1h', waterDepthM: 1.35, inundationAreaSqKm: 31.0, riskLevel: 'critical' },
        { step: '+2h', label: '+2h', waterDepthM: 1.75, inundationAreaSqKm: 39.5, riskLevel: 'critical' },
        { step: '+3h', label: '+3h', waterDepthM: 1.85, inundationAreaSqKm: 42.1, riskLevel: 'critical' },
        { step: '+6h', label: '+6h', waterDepthM: 1.20, inundationAreaSqKm: 33.4, riskLevel: 'high' }
      ]
    },
    riskDrivers: [
      { factor: 'Heavy Rainfall', percentage: 56, description: 'Extreme orographic precipitation at Pir Panjal ridge' },
      { factor: 'River Level', percentage: 22, description: 'Breach imminent at Sangam and Bringi tributary confluence' },
      { factor: 'Low Elevation', percentage: 12, description: 'Broad alluvial floor at base of mountain runoff' },
      { factor: 'Drainage Stress', percentage: 7, description: 'Canals filled with high sediment debris flow' },
      { factor: 'Other Factors', percentage: 3, description: 'Upstream meltwater surge' }
    ],
    riverStations: [
      { name: 'Sangam Gauging Station', currentLevelM: 26.2, warningLevelM: 21.0, dangerLevelM: 25.0, trend: 'rising', status: 'critical' },
      { name: 'Bringi Nallah Bridge', currentLevelM: 11.4, warningLevelM: 9.0, dangerLevelM: 10.5, trend: 'rising', status: 'critical' }
    ],
    infrastructure: [
      {
        id: 'inf-an-1',
        name: 'NH-44 Qazigund - Khanabal Stretch',
        type: 'road',
        riskLevel: 'critical',
        status: 'Closed due to 1.1m mudflow inundation',
        impactDetail: 'Traffic halted; bypass impassable',
        coordinates: [75.1410, 33.7150],
        alternativeRoute: 'No direct alternate for heavy vehicles',
        accessibility: 'inundated'
      },
      {
        id: 'inf-an-2',
        name: 'GMC District Hospital Anantnag',
        type: 'hospital',
        riskLevel: 'high',
        status: 'Ground floor evacuated to Level 2',
        impactDetail: 'Generators moved to terrace; flood barrier active',
        coordinates: [75.1620, 33.7280],
        distanceKm: 1.2,
        accessibility: 'limited'
      },
      {
        id: 'inf-an-3',
        name: 'Government Degree College Shelter',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Main Relief Center',
        impactDetail: 'Capacity for 1800 refugees; dry rations staged',
        coordinates: [75.1710, 33.7420],
        capacity: 1800,
        currentAvailability: 1100,
        distanceKm: 2.8,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-an-1',
        title: 'FLASH FLOOD & INUNDATION RED ALERT',
        description: 'Catastrophic river surge occurring along Bringi and Jhelum upper basin. Immediate evacuation of riparian communities ordered.',
        severity: 'critical',
        issuedAt: '12:10 IST',
        validUntil: '17:00 IST',
        confidencePercent: 96,
        affectedZones: ['Khanabal', 'Bijbehara', 'Nai Basti', 'Mehmoodabad'],
        recommendedAction: 'Immediate vertical or upland evacuation to designated relief camps.'
      }
    ],
    sop: {
      immediateActions: [
        'Sound siren network in Khanabal and downstream villages',
        'Deploy 3 NDRF motorboat units to river confluences',
        'Initiate mandatory evacuation of Zone A riparian corridor',
        'Close Khanabal and Sangam vehicular bridges'
      ],
      evacuationZones: ['Zone A: Khanabal Lowlands', 'Zone B: Bijbehara Old Town'],
      ndrfTeams: 4,
      ambulances: 8,
      shelterCapacity: 2400,
      helplineNumbers: ['01932-222870 (Anantnag Control Room)', '112']
    },
    districtStats: {
      districtRisk: 'critical',
      affectedZones: 19,
      highRiskAreas: 11,
      moderateRiskAreas: 6,
      populationExposure: 185000,
      criticalInfraAtRisk: 24
    },
    hotspots: [
      {
        name: 'Khanabal Junction',
        coordinates: [75.1430, 33.7290],
        rainfallMmHr: 48,
        predictedRainfallMm: 92,
        floodProbabilityPercent: 93,
        waterDepthRange: '1.4 – 1.9 m',
        leadTimeMinutes: 30,
        riskLevel: 'critical'
      },
      {
        name: 'Sangam Bridge Confluence',
        coordinates: [75.1150, 33.7850],
        rainfallMmHr: 44,
        predictedRainfallMm: 85,
        floodProbabilityPercent: 89,
        waterDepthRange: '1.2 – 1.7 m',
        leadTimeMinutes: 40,
        riskLevel: 'critical'
      }
    ]
  },

  jammu: {
    location: ALL_LOCATIONS[4],
    weather: {
      temperatureC: 29,
      humidityPercent: 74,
      windSpeedKmh: 14,
      windDirection: 'SE',
      atmosphericPressureHpa: 1008,
      currentRainfallMmHr: 18,
      rainfallTrend: 'steady',
      recentRainfallTrend: [10, 14, 17, 18],
      conditionText: 'Monsoonal Thunderstorms with Local Runoff'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 10, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '09:00', rainfallMm: 14, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 17, isAiPrediction: false, confidencePercent: 98, intensity: 'moderate' },
      { time: '11:00', rainfallMm: 18, isAiPrediction: false, confidencePercent: 98, intensity: 'moderate' },
      { time: '12:00', rainfallMm: 28, isAiPrediction: true, confidencePercent: 90, intensity: 'heavy' },
      { time: '13:00', rainfallMm: 35, isAiPrediction: true, confidencePercent: 88, intensity: 'heavy' },
      { time: '14:00', rainfallMm: 26, isAiPrediction: true, confidencePercent: 86, intensity: 'moderate' },
      { time: '15:00', rainfallMm: 18, isAiPrediction: true, confidencePercent: 84, intensity: 'moderate' },
      { time: '16:00', rainfallMm: 12, isAiPrediction: true, confidencePercent: 81, intensity: 'light' },
      { time: '17:00', rainfallMm: 8, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '18:00', rainfallMm: 4, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '19:00', rainfallMm: 2, isAiPrediction: true, confidencePercent: 75, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 45,
      expectedWaterDepthMinM: 0.2,
      expectedWaterDepthMaxM: 0.4,
      timeToThresholdMinutes: 180,
      maxExpectedDepthM: 0.5,
      riskLevel: 'moderate',
      confidenceScorePercent: 88,
      inundationAreaSqKm: 9.8,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.1, inundationAreaSqKm: 2.1, riskLevel: 'low' },
        { step: '+1h', label: '+1h', waterDepthM: 0.25, inundationAreaSqKm: 5.4, riskLevel: 'moderate' },
        { step: '+2h', label: '+2h', waterDepthM: 0.38, inundationAreaSqKm: 8.7, riskLevel: 'moderate' },
        { step: '+3h', label: '+3h', waterDepthM: 0.45, inundationAreaSqKm: 9.8, riskLevel: 'moderate' },
        { step: '+6h', label: '+6h', waterDepthM: 0.22, inundationAreaSqKm: 4.2, riskLevel: 'low' }
      ]
    },
    riskDrivers: [
      { factor: 'Drainage Stress', percentage: 38, description: 'Urban nullah blockage and storm culvert capacity' },
      { factor: 'Heavy Rainfall', percentage: 32, description: 'Scattered short-duration convective cloudbursts' },
      { factor: 'River Level', percentage: 18, description: 'Tawi River water surge from Udhampur catchment' },
      { factor: 'Low Elevation', percentage: 8, description: 'Island and riverbed informal settlements' },
      { factor: 'Other Factors', percentage: 4, description: 'Urban impermeable road runoff' }
    ],
    riverStations: [
      { name: 'Tawi River (Guajar Nagar Bridge)', currentLevelM: 14.2, warningLevelM: 14.0, dangerLevelM: 17.0, trend: 'rising', status: 'warning' },
      { name: 'Chenab River (Akhnoor)', currentLevelM: 28.5, warningLevelM: 32.0, dangerLevelM: 35.0, trend: 'stable', status: 'normal' }
    ],
    infrastructure: [
      {
        id: 'inf-jmu-1',
        name: 'Tawi 4th Bridge Approach',
        type: 'road',
        riskLevel: 'moderate',
        status: 'Waterlogging in slow lane',
        impactDetail: 'Speed restricted to 30 km/h',
        coordinates: [74.8610, 32.7150],
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-jmu-2',
        name: 'Government Medical College (GMC) Jammu',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Normal Operations',
        impactDetail: 'Fully protected by natural hillside gradient',
        coordinates: [74.8720, 32.7380],
        distanceKm: 3.5,
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-jmu-3',
        name: 'MA Stadium Relief Hub',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Standby Capacity',
        impactDetail: 'Capacity 2500, emergency water and food packets stocked',
        coordinates: [74.8680, 32.7210],
        capacity: 2500,
        currentAvailability: 2350,
        distanceKm: 1.8,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-jmu-1',
        title: 'MODERATE FLOOD & NULLAH SURGE ADVISORY',
        description: 'Tawi River level is rising towards warning threshold. Low-lying riverbed zones should avoid staying near riverfront.',
        severity: 'moderate',
        issuedAt: '11:30 IST',
        validUntil: '18:00 IST',
        confidencePercent: 88,
        affectedZones: ['Guajar Nagar Riverbed', 'Belicharana', 'Nikki Tawi Island'],
        recommendedAction: 'Fishermen and riverbed residents advised to shift to higher embankments.'
      }
    ],
    sop: {
      immediateActions: [
        'Deploy SDRF quick rescue boats at Tawi barrage',
        'Clear silt grates along canal road nullahs',
        'Maintain continuous wireless contact with Chenab flood control room'
      ],
      evacuationZones: ['Riverbed Settlements near 4th Bridge'],
      ndrfTeams: 1,
      ambulances: 3,
      shelterCapacity: 800,
      helplineNumbers: ['0191-2544574 (Jammu Flood Control)', '112']
    },
    districtStats: {
      districtRisk: 'moderate',
      affectedZones: 6,
      highRiskAreas: 2,
      moderateRiskAreas: 4,
      populationExposure: 42000,
      criticalInfraAtRisk: 5
    },
    hotspots: [
      {
        name: 'Nikki Tawi Causeway',
        coordinates: [74.8390, 32.6950],
        rainfallMmHr: 22,
        predictedRainfallMm: 40,
        floodProbabilityPercent: 55,
        waterDepthRange: '0.3 – 0.6 m',
        leadTimeMinutes: 140,
        riskLevel: 'moderate'
      }
    ]
  },

  baramulla: {
    location: ALL_LOCATIONS[2],
    weather: {
      temperatureC: 20,
      humidityPercent: 85,
      windSpeedKmh: 16,
      windDirection: 'WNW',
      atmosphericPressureHpa: 1005,
      currentRainfallMmHr: 28,
      rainfallTrend: 'rising',
      recentRainfallTrend: [10, 16, 22, 28],
      conditionText: 'Continuous Mountain Rain & High River Discharge'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 10, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '09:00', rainfallMm: 16, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 22, isAiPrediction: false, confidencePercent: 98, intensity: 'moderate' },
      { time: '11:00', rainfallMm: 28, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '12:00', rainfallMm: 42, isAiPrediction: true, confidencePercent: 91, intensity: 'heavy' },
      { time: '13:00', rainfallMm: 58, isAiPrediction: true, confidencePercent: 89, intensity: 'heavy' },
      { time: '14:00', rainfallMm: 49, isAiPrediction: true, confidencePercent: 87, intensity: 'heavy' },
      { time: '15:00', rainfallMm: 33, isAiPrediction: true, confidencePercent: 85, intensity: 'moderate' },
      { time: '16:00', rainfallMm: 21, isAiPrediction: true, confidencePercent: 82, intensity: 'moderate' },
      { time: '17:00', rainfallMm: 14, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '18:00', rainfallMm: 9, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '19:00', rainfallMm: 5, isAiPrediction: true, confidencePercent: 75, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 68,
      expectedWaterDepthMinM: 0.5,
      expectedWaterDepthMaxM: 0.8,
      timeToThresholdMinutes: 95,
      maxExpectedDepthM: 0.95,
      riskLevel: 'high',
      confidenceScorePercent: 90,
      inundationAreaSqKm: 19.4,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.25, inundationAreaSqKm: 6.1, riskLevel: 'low' },
        { step: '+1h', label: '+1h', waterDepthM: 0.52, inundationAreaSqKm: 12.3, riskLevel: 'moderate' },
        { step: '+2h', label: '+2h', waterDepthM: 0.74, inundationAreaSqKm: 16.8, riskLevel: 'high' },
        { step: '+3h', label: '+3h', waterDepthM: 0.82, inundationAreaSqKm: 19.4, riskLevel: 'high' },
        { step: '+6h', label: '+6h', waterDepthM: 0.58, inundationAreaSqKm: 14.0, riskLevel: 'moderate' }
      ]
    },
    riskDrivers: [
      { factor: 'River Level', percentage: 44, description: 'Wular Lake discharge bottleneck at Baramulla Gorge' },
      { factor: 'Heavy Rainfall', percentage: 31, description: 'Pohru and Ningli mountain catchments runoff' },
      { factor: 'Low Elevation', percentage: 15, description: 'Old Town riparian riverbank vulnerability' },
      { factor: 'Drainage Stress', percentage: 7, description: 'Local town drains submerged by river level' },
      { factor: 'Other Factors', percentage: 3, description: 'Saturated slopes' }
    ],
    riverStations: [
      { name: 'Jhelum at Baramulla Gorge', currentLevelM: 14.8, warningLevelM: 13.5, dangerLevelM: 15.0, trend: 'rising', status: 'danger' }
    ],
    infrastructure: [
      {
        id: 'inf-bar-1',
        name: 'Cement Bridge Old Town',
        type: 'road',
        riskLevel: 'high',
        status: 'River water touching girder bottom',
        impactDetail: 'Heavy trucks diverted to New Bypass Bridge',
        coordinates: [74.3580, 34.2050],
        alternativeRoute: 'Kanispora Bypass Bridge',
        accessibility: 'limited'
      },
      {
        id: 'inf-bar-2',
        name: 'GMC Hospital Baramulla (Kanthbagh)',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Safe on upper plateau',
        impactDetail: 'High standby capacity',
        coordinates: [74.3720, 34.2120],
        distanceKm: 2.4,
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-bar-3',
        name: 'Showkat Ali Indoor Stadium',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Designated Shelter',
        impactDetail: 'Capacity 1200, heating gensets prepared',
        coordinates: [74.3640, 34.2020],
        capacity: 1200,
        currentAvailability: 850,
        distanceKm: 1.1,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-bar-1',
        title: 'HIGH FLOOD RISK WARNING (ORANGE ALERT)',
        description: 'Jhelum River approaching danger mark downstream of Wular. Low-lying Old Town areas are at risk of inundation within 95 minutes.',
        severity: 'high',
        issuedAt: '12:50 IST',
        validUntil: '17:30 IST',
        confidencePercent: 90,
        affectedZones: ['Old Town Baramulla', 'Khawaja Bagh', 'Kanispora Lowlands'],
        recommendedAction: 'Move merchandise to upper floors; prepare for temporary relocation if instructed.'
      }
    ],
    sop: {
      immediateActions: [
        'Close pedestrian walks under river embankments',
        'Pre-position boat units at Jetty Ghat',
        'Inspect sluice valves along Wular exit canals'
      ],
      evacuationZones: ['Zone A: Old Town Riverfront'],
      ndrfTeams: 2,
      ambulances: 4,
      shelterCapacity: 950,
      helplineNumbers: ['01954-234241 (Baramulla Control Room)', '112']
    },
    districtStats: {
      districtRisk: 'high',
      affectedZones: 9,
      highRiskAreas: 4,
      moderateRiskAreas: 5,
      populationExposure: 112000,
      criticalInfraAtRisk: 11
    },
    hotspots: [
      {
        name: 'Old Town Bund',
        coordinates: [74.3590, 34.2020],
        rainfallMmHr: 28,
        predictedRainfallMm: 58,
        floodProbabilityPercent: 68,
        waterDepthRange: '0.5 – 0.8 m',
        leadTimeMinutes: 95,
        riskLevel: 'high'
      }
    ]
  },

  pulwama: {
    location: ALL_LOCATIONS[3],
    weather: {
      temperatureC: 20,
      humidityPercent: 88,
      windSpeedKmh: 17,
      windDirection: 'NNE',
      atmosphericPressureHpa: 1002,
      currentRainfallMmHr: 34,
      rainfallTrend: 'rising',
      recentRainfallTrend: [15, 22, 28, 34],
      conditionText: 'Intense Downpour over Upper Tributaries'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 15, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '09:00', rainfallMm: 22, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 28, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '11:00', rainfallMm: 34, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '12:00', rainfallMm: 48, isAiPrediction: true, confidencePercent: 93, intensity: 'heavy' },
      { time: '13:00', rainfallMm: 62, isAiPrediction: true, confidencePercent: 90, intensity: 'torrential' },
      { time: '14:00', rainfallMm: 51, isAiPrediction: true, confidencePercent: 88, intensity: 'heavy' },
      { time: '15:00', rainfallMm: 36, isAiPrediction: true, confidencePercent: 85, intensity: 'moderate' },
      { time: '16:00', rainfallMm: 22, isAiPrediction: true, confidencePercent: 82, intensity: 'moderate' },
      { time: '17:00', rainfallMm: 14, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '18:00', rainfallMm: 8, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '19:00', rainfallMm: 4, isAiPrediction: true, confidencePercent: 75, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 72,
      expectedWaterDepthMinM: 0.7,
      expectedWaterDepthMaxM: 1.1,
      timeToThresholdMinutes: 65,
      maxExpectedDepthM: 1.25,
      riskLevel: 'high',
      confidenceScorePercent: 91,
      inundationAreaSqKm: 22.8,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.38, inundationAreaSqKm: 7.5, riskLevel: 'moderate' },
        { step: '+1h', label: '+1h', waterDepthM: 0.75, inundationAreaSqKm: 14.8, riskLevel: 'high' },
        { step: '+2h', label: '+2h', waterDepthM: 0.98, inundationAreaSqKm: 19.5, riskLevel: 'high' },
        { step: '+3h', label: '+3h', waterDepthM: 1.12, inundationAreaSqKm: 22.8, riskLevel: 'high' },
        { step: '+6h', label: '+6h', waterDepthM: 0.65, inundationAreaSqKm: 13.2, riskLevel: 'moderate' }
      ]
    },
    riskDrivers: [
      { factor: 'Heavy Rainfall', percentage: 48, description: 'Rambiara and Romshi mountain stream cloudbursts' },
      { factor: 'Low Elevation', percentage: 24, description: 'Flood basin agricultural and town depression' },
      { factor: 'River Level', percentage: 16, description: 'Romshi Nallah flash discharge' },
      { factor: 'Drainage Stress', percentage: 8, description: 'Orchard drainage overflow' },
      { factor: 'Other Factors', percentage: 4, description: 'Alluvial soil liquefaction' }
    ],
    riverStations: [
      { name: 'Romshi Nallah at Pulwama', currentLevelM: 8.9, warningLevelM: 7.5, dangerLevelM: 9.0, trend: 'rising', status: 'danger' }
    ],
    infrastructure: [
      {
        id: 'inf-pul-1',
        name: 'Pulwama - Shopian Highway',
        type: 'road',
        riskLevel: 'high',
        status: 'Water crossing bridge approach near Rajpora',
        impactDetail: 'Disruption likely in 45 min',
        coordinates: [74.8850, 33.8620],
        alternativeRoute: 'Via Newa - Chadoora link road',
        accessibility: 'limited'
      },
      {
        id: 'inf-pul-2',
        name: 'District Hospital Pulwama',
        type: 'hospital',
        riskLevel: 'moderate',
        status: 'Operational with sandbag barriers in place',
        impactDetail: 'Ground floor triage shifted to 1st floor',
        coordinates: [74.8990, 33.8740],
        distanceKm: 1.5,
        accessibility: 'limited'
      },
      {
        id: 'inf-pul-3',
        name: 'Govt Boys Degree College Camp',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Active Relief Camp',
        impactDetail: 'Capacity 1100, kitchen and bedding set up',
        coordinates: [74.9120, 33.8820],
        capacity: 1100,
        currentAvailability: 780,
        distanceKm: 2.2,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-pul-1',
        title: 'HIGH FLASH FLOOD & INUNDATION WARNING',
        description: 'Romshi Nallah is at near-burst levels following heavy downpour. Water depth could exceed 1.0 m in low-lying orchards and wards.',
        severity: 'high',
        issuedAt: '13:00 IST',
        validUntil: '17:00 IST',
        confidencePercent: 91,
        affectedZones: ['Pulwama Town Wards 4-8', 'Rajpora Lowlands', 'Lassipora Industrial Area'],
        recommendedAction: 'Keep livestocks away from river banks; shift machinery and dry goods.'
      }
    ],
    sop: {
      immediateActions: [
        'Deploy SDRF team to Romshi bridge junction',
        'Inspect Lassipora industrial drainage outlet',
        'Issue sirens in downstream agricultural villages'
      ],
      evacuationZones: ['Zone A: Romshi Riverbed Wards'],
      ndrfTeams: 2,
      ambulances: 4,
      shelterCapacity: 900,
      helplineNumbers: ['01933-241280 (Pulwama Emergency Cell)', '112']
    },
    districtStats: {
      districtRisk: 'high',
      affectedZones: 8,
      highRiskAreas: 4,
      moderateRiskAreas: 4,
      populationExposure: 95000,
      criticalInfraAtRisk: 9
    },
    hotspots: [
      {
        name: 'Romshi Confluence Sector',
        coordinates: [74.8960, 33.8710],
        rainfallMmHr: 34,
        predictedRainfallMm: 62,
        floodProbabilityPercent: 72,
        waterDepthRange: '0.7 – 1.1 m',
        leadTimeMinutes: 65,
        riskLevel: 'high'
      }
    ]
  },

  kupwara: {
    location: ALL_LOCATIONS[5],
    weather: {
      temperatureC: 18,
      humidityPercent: 78,
      windSpeedKmh: 12,
      windDirection: 'NW',
      atmosphericPressureHpa: 1007,
      currentRainfallMmHr: 15,
      rainfallTrend: 'steady',
      recentRainfallTrend: [8, 11, 14, 15],
      conditionText: 'Intermittent Mountain Showers'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 8, isAiPrediction: false, confidencePercent: 99, intensity: 'light' },
      { time: '09:00', rainfallMm: 11, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 14, isAiPrediction: false, confidencePercent: 98, intensity: 'moderate' },
      { time: '11:00', rainfallMm: 15, isAiPrediction: false, confidencePercent: 98, intensity: 'moderate' },
      { time: '12:00', rainfallMm: 24, isAiPrediction: true, confidencePercent: 88, intensity: 'moderate' },
      { time: '13:00', rainfallMm: 29, isAiPrediction: true, confidencePercent: 86, intensity: 'heavy' },
      { time: '14:00', rainfallMm: 21, isAiPrediction: true, confidencePercent: 84, intensity: 'moderate' },
      { time: '15:00', rainfallMm: 16, isAiPrediction: true, confidencePercent: 82, intensity: 'moderate' },
      { time: '16:00', rainfallMm: 10, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '17:00', rainfallMm: 6, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '18:00', rainfallMm: 3, isAiPrediction: true, confidencePercent: 76, intensity: 'light' },
      { time: '19:00', rainfallMm: 1, isAiPrediction: true, confidencePercent: 74, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 38,
      expectedWaterDepthMinM: 0.1,
      expectedWaterDepthMaxM: 0.3,
      timeToThresholdMinutes: 210,
      maxExpectedDepthM: 0.35,
      riskLevel: 'moderate',
      confidenceScorePercent: 86,
      inundationAreaSqKm: 5.2,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.05, inundationAreaSqKm: 1.2, riskLevel: 'low' },
        { step: '+1h', label: '+1h', waterDepthM: 0.15, inundationAreaSqKm: 2.8, riskLevel: 'low' },
        { step: '+2h', label: '+2h', waterDepthM: 0.25, inundationAreaSqKm: 4.4, riskLevel: 'moderate' },
        { step: '+3h', label: '+3h', waterDepthM: 0.32, inundationAreaSqKm: 5.2, riskLevel: 'moderate' },
        { step: '+6h', label: '+6h', waterDepthM: 0.18, inundationAreaSqKm: 2.9, riskLevel: 'low' }
      ]
    },
    riskDrivers: [
      { factor: 'Heavy Rainfall', percentage: 38, description: 'Localized mountain showers in Lolab valley' },
      { factor: 'Low Elevation', percentage: 26, description: 'Stream bends along Kehmil nallah' },
      { factor: 'Drainage Stress', percentage: 18, description: 'Sediment siltation in culverts' },
      { factor: 'River Level', percentage: 12, description: 'Kehmil river level below warning mark' },
      { factor: 'Other Factors', percentage: 6, description: 'Soil absorption moderate' }
    ],
    riverStations: [
      { name: 'Kehmil River Gauge', currentLevelM: 4.2, warningLevelM: 6.0, dangerLevelM: 7.5, trend: 'stable', status: 'normal' }
    ],
    infrastructure: [
      {
        id: 'inf-kup-1',
        name: 'Kupwara - Handwara Road',
        type: 'road',
        riskLevel: 'low',
        status: 'Clear for all traffic',
        impactDetail: 'No disruptions expected',
        coordinates: [74.2610, 34.5120],
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-kup-2',
        name: 'Sub-District Hospital Kupwara',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Normal Operations',
        impactDetail: 'Fully operational',
        coordinates: [74.2580, 34.5310],
        distanceKm: 1.1,
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-kup-3',
        name: 'Govt Higher Secondary School Shelter',
        type: 'shelter',
        riskLevel: 'low',
        status: 'Standby Relief Hub',
        impactDetail: 'Capacity 600 beds',
        coordinates: [74.2490, 34.5240],
        capacity: 600,
        currentAvailability: 580,
        distanceKm: 0.8,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-kup-1',
        title: 'MODERATE WEATHER ADVISORY',
        description: 'Intermittent rainfall expected in catchment. Risk remains low-to-moderate with adequate drain throughput.',
        severity: 'low',
        issuedAt: '10:00 IST',
        validUntil: '18:00 IST',
        confidencePercent: 88,
        affectedZones: ['Lolab Valley Streams', 'Trehgam Lowlands'],
        recommendedAction: 'Maintain routine watch on stream levels.'
      }
    ],
    sop: {
      immediateActions: [
        'Maintain automated river gauge telemetry',
        'Verify emergency equipment in Handwara and Kupwara depots'
      ],
      evacuationZones: ['None required currently'],
      ndrfTeams: 0,
      ambulances: 2,
      shelterCapacity: 500,
      helplineNumbers: ['01955-252480 (Kupwara Emergency Desk)', '112']
    },
    districtStats: {
      districtRisk: 'low',
      affectedZones: 3,
      highRiskAreas: 0,
      moderateRiskAreas: 3,
      populationExposure: 18000,
      criticalInfraAtRisk: 2
    },
    hotspots: [
      {
        name: 'Kehmil Bank',
        coordinates: [74.2530, 34.5250],
        rainfallMmHr: 15,
        predictedRainfallMm: 29,
        floodProbabilityPercent: 38,
        waterDepthRange: '0.1 – 0.3 m',
        leadTimeMinutes: 210,
        riskLevel: 'moderate'
      }
    ]
  },

  kathua: {
    location: ALL_LOCATIONS[6],
    weather: {
      temperatureC: 31,
      humidityPercent: 65,
      windSpeedKmh: 10,
      windDirection: 'SSE',
      atmosphericPressureHpa: 1010,
      currentRainfallMmHr: 8,
      rainfallTrend: 'falling',
      recentRainfallTrend: [6, 12, 10, 8],
      conditionText: 'Passing Light Monsoon Showers'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 6, isAiPrediction: false, confidencePercent: 99, intensity: 'light' },
      { time: '09:00', rainfallMm: 12, isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: 10, isAiPrediction: false, confidencePercent: 98, intensity: 'light' },
      { time: '11:00', rainfallMm: 8, isAiPrediction: false, confidencePercent: 98, intensity: 'light' },
      { time: '12:00', rainfallMm: 14, isAiPrediction: true, confidencePercent: 88, intensity: 'moderate' },
      { time: '13:00', rainfallMm: 10, isAiPrediction: true, confidencePercent: 85, intensity: 'light' },
      { time: '14:00', rainfallMm: 6, isAiPrediction: true, confidencePercent: 83, intensity: 'light' },
      { time: '15:00', rainfallMm: 4, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '16:00', rainfallMm: 2, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '17:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' },
      { time: '18:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' },
      { time: '19:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 22,
      expectedWaterDepthMinM: 0.0,
      expectedWaterDepthMaxM: 0.1,
      timeToThresholdMinutes: 360,
      maxExpectedDepthM: 0.15,
      riskLevel: 'low',
      confidenceScorePercent: 92,
      inundationAreaSqKm: 1.4,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.0, inundationAreaSqKm: 0.2, riskLevel: 'low' },
        { step: '+1h', label: '+1h', waterDepthM: 0.05, inundationAreaSqKm: 0.8, riskLevel: 'low' },
        { step: '+2h', label: '+2h', waterDepthM: 0.10, inundationAreaSqKm: 1.4, riskLevel: 'low' },
        { step: '+3h', label: '+3h', waterDepthM: 0.08, inundationAreaSqKm: 1.1, riskLevel: 'low' },
        { step: '+6h', label: '+6h', waterDepthM: 0.0, inundationAreaSqKm: 0.2, riskLevel: 'low' }
      ]
    },
    riskDrivers: [
      { factor: 'Drainage Stress', percentage: 40, description: 'Minor localized pooling in low paved zones' },
      { factor: 'Heavy Rainfall', percentage: 28, description: 'Normal seasonal showers' },
      { factor: 'River Level', percentage: 16, description: 'Ravi River flow well regulated by Ranjit Sagar dam' },
      { factor: 'Low Elevation', percentage: 12, description: 'Sub-montane plain' },
      { factor: 'Other Factors', percentage: 4, description: 'High soil infiltration rate' }
    ],
    riverStations: [
      { name: 'Ujh River at Kathua', currentLevelM: 3.1, warningLevelM: 6.5, dangerLevelM: 8.0, trend: 'stable', status: 'normal' }
    ],
    infrastructure: [
      {
        id: 'inf-kat-1',
        name: 'NH-44 Kathua Bypass',
        type: 'road',
        riskLevel: 'low',
        status: 'Clear for all traffic',
        impactDetail: 'Fully open',
        coordinates: [75.5210, 32.3680],
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-kat-2',
        name: 'District Hospital Kathua',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Normal Operations',
        impactDetail: 'No risk',
        coordinates: [75.5180, 32.3780],
        distanceKm: 1.5,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [],
    sop: {
      immediateActions: [
        'Standard monsoon readiness monitoring',
        'Routine clearance of city drain outfalls'
      ],
      evacuationZones: [],
      ndrfTeams: 0,
      ambulances: 1,
      shelterCapacity: 400,
      helplineNumbers: ['01922-238796 (Kathua Control)', '112']
    },
    districtStats: {
      districtRisk: 'low',
      affectedZones: 1,
      highRiskAreas: 0,
      moderateRiskAreas: 1,
      populationExposure: 4500,
      criticalInfraAtRisk: 0
    },
    hotspots: [
      {
        name: 'Ujh Plain Road',
        coordinates: [75.5150, 32.3710],
        rainfallMmHr: 8,
        predictedRainfallMm: 14,
        floodProbabilityPercent: 22,
        waterDepthRange: '0.0 – 0.1 m',
        leadTimeMinutes: 360,
        riskLevel: 'low'
      }
    ]
  },

  leh: {
    location: ALL_LOCATIONS[7],
    weather: {
      temperatureC: 14,
      humidityPercent: 32,
      windSpeedKmh: 20,
      windDirection: 'ENE',
      atmosphericPressureHpa: 675,
      currentRainfallMmHr: 4,
      rainfallTrend: 'steady',
      recentRainfallTrend: [1, 2, 3, 4],
      conditionText: 'High Altitude Cloud Bands & Glacial Monitoring'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: 1, isAiPrediction: false, confidencePercent: 99, intensity: 'light' },
      { time: '09:00', rainfallMm: 2, isAiPrediction: false, confidencePercent: 99, intensity: 'light' },
      { time: '10:00', rainfallMm: 3, isAiPrediction: false, confidencePercent: 98, intensity: 'light' },
      { time: '11:00', rainfallMm: 4, isAiPrediction: false, confidencePercent: 98, intensity: 'light' },
      { time: '12:00', rainfallMm: 6, isAiPrediction: true, confidencePercent: 85, intensity: 'light' },
      { time: '13:00', rainfallMm: 8, isAiPrediction: true, confidencePercent: 82, intensity: 'light' },
      { time: '14:00', rainfallMm: 5, isAiPrediction: true, confidencePercent: 80, intensity: 'light' },
      { time: '15:00', rainfallMm: 3, isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '16:00', rainfallMm: 1, isAiPrediction: true, confidencePercent: 75, intensity: 'light' },
      { time: '17:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' },
      { time: '18:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' },
      { time: '19:00', rainfallMm: 0, isAiPrediction: true, confidencePercent: 75, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: 15,
      expectedWaterDepthMinM: 0.0,
      expectedWaterDepthMaxM: 0.1,
      timeToThresholdMinutes: 480,
      maxExpectedDepthM: 0.1,
      riskLevel: 'low',
      confidenceScorePercent: 90,
      inundationAreaSqKm: 0.8,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: 0.0, inundationAreaSqKm: 0.1, riskLevel: 'low' },
        { step: '+1h', label: '+1h', waterDepthM: 0.02, inundationAreaSqKm: 0.3, riskLevel: 'low' },
        { step: '+2h', label: '+2h', waterDepthM: 0.05, inundationAreaSqKm: 0.6, riskLevel: 'low' },
        { step: '+3h', label: '+3h', waterDepthM: 0.07, inundationAreaSqKm: 0.8, riskLevel: 'low' },
        { step: '+6h', label: '+6h', waterDepthM: 0.02, inundationAreaSqKm: 0.2, riskLevel: 'low' }
      ]
    },
    riskDrivers: [
      { factor: 'Other Factors', percentage: 55, description: 'Glacial lake expansion & thermal permafrost thaw tracking' },
      { factor: 'Heavy Rainfall', percentage: 22, description: 'Arid steep slope flash runoff risk' },
      { factor: 'Low Elevation', percentage: 12, description: 'Valley alluvial fan morphology' },
      { factor: 'River Level', percentage: 8, description: 'Indus River glacial discharge' },
      { factor: 'Drainage Stress', percentage: 3, description: 'Gravel culvert capacity' }
    ],
    riverStations: [
      { name: 'Indus River at Choglamsar', currentLevelM: 3.2, warningLevelM: 6.0, dangerLevelM: 7.5, trend: 'stable', status: 'normal' }
    ],
    infrastructure: [
      {
        id: 'inf-leh-1',
        name: 'Leh - Manali Highway (Choglamsar Sector)',
        type: 'road',
        riskLevel: 'low',
        status: 'Open for all traffic',
        impactDetail: 'Dry',
        coordinates: [77.5850, 34.1280],
        accessibility: 'fully_accessible'
      },
      {
        id: 'inf-leh-2',
        name: 'SNM Hospital Leh',
        type: 'hospital',
        riskLevel: 'low',
        status: 'Fully Operational',
        impactDetail: 'Designated disaster center',
        coordinates: [77.5750, 34.1620],
        distanceKm: 1.4,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: 'alt-leh-1',
        title: 'GLOF SATELLITE WATCH ADVISORY',
        description: 'High-altitude moraine lakes monitored via Sentinel-2. Water levels normal; no outburst threats detected.',
        severity: 'low',
        issuedAt: '09:00 IST',
        validUntil: '24:00 IST',
        confidencePercent: 94,
        affectedZones: ['Khardung Catchment', 'Shyok Basin Upper'],
        recommendedAction: 'Routine surveillance active.'
      }
    ],
    sop: {
      immediateActions: [
        'Monitor satellite SAR lake expansion index',
        'Verify satellite phone links at remote bridge checkpoints'
      ],
      evacuationZones: [],
      ndrfTeams: 1,
      ambulances: 2,
      shelterCapacity: 500,
      helplineNumbers: ['01982-255555 (Leh Disaster Cell)', '112']
    },
    districtStats: {
      districtRisk: 'low',
      affectedZones: 1,
      highRiskAreas: 0,
      moderateRiskAreas: 1,
      populationExposure: 2800,
      criticalInfraAtRisk: 0
    },
    hotspots: [
      {
        name: 'Choglamsar Bridge',
        coordinates: [77.5810, 34.1350],
        rainfallMmHr: 4,
        predictedRainfallMm: 8,
        floodProbabilityPercent: 15,
        waterDepthRange: '0.0 – 0.1 m',
        leadTimeMinutes: 480,
        riskLevel: 'low'
      }
    ]
  }
};

// Dynamic generator for all Indian cities and locations
export function getDatasetForLocation(locId: string): LocationDataset {
  const cleanId = locId.toLowerCase();
  if (MOCK_DATASETS[cleanId]) {
    return MOCK_DATASETS[cleanId];
  }

  // Find location metadata from ALL_LOCATIONS or default
  const loc = ALL_LOCATIONS.find(l => l.id.toLowerCase() === cleanId) || {
    id: cleanId,
    name: cleanId.charAt(0).toUpperCase() + cleanId.slice(1),
    district: `${cleanId.charAt(0).toUpperCase() + cleanId.slice(1)} District`,
    state: 'National Sector',
    country: 'India',
    coordinates: [77.2090, 28.6139] as [number, number],
    elevationMeters: 220,
    population: 1200000
  };

  // City-specific river & local context mappings
  const cityRiverMap: Record<string, { river: string; road: string; hospital: string; hotspot: string }> = {
    delhi: { river: 'Yamuna at Old Railway Bridge', road: 'Ring Road (ITO to Kashmere Gate)', hospital: 'AIIMS New Delhi / LNJP Hospital', hotspot: 'ITO Yamuna Floodplain' },
    mumbai: { river: 'Mithi River at Kurla Bridge', road: 'Western Express Highway (Milan Subway)', hospital: 'KEM Hospital Parel', hotspot: 'Kurla West & Hindmata' },
    pune: { river: 'Mutha River at Baba Bhide Bridge', road: 'Sinhagad Road Riverside Artery', hospital: 'Sassoon General Hospital', hotspot: 'Deccan Gymkhana & Pulachi Wadi' },
    kolkata: { river: 'Hooghly River at Howrah Basin', road: 'VIP Road & EM Bypass Corridor', hospital: 'SSKM Medical College', hotspot: 'Salt Lake Sector V & Park Circus' },
    chennai: { river: 'Adyar River at Saidapet Basin', road: 'GST Road & Velachery Main Road', hospital: 'Rajiv Gandhi Government Hospital', hotspot: 'Velachery Lake Catchment' },
    bengaluru: { river: 'Vrishabhavathi Stream Basin', road: 'Outer Ring Road (Bellandur Tech Corridor)', hospital: 'Manipal Hospital HAL Airport Road', hotspot: 'Rainbow Drive & Bellandur Lake' },
    hyderabad: { river: 'Musi River at Moosarambagh', road: 'PVNR Elevated Expressway Lowpoints', hospital: 'Osmania General Hospital', hotspot: 'Chaderghat & Malakpet Underpass' },
    kochi: { river: 'Periyar River at Aluva Manappuram', road: 'Edappally - Aluva Metro Corridor', hospital: 'Ernakulam General Hospital', hotspot: 'Kalamassery & Aluva Sub-basin' },
    guwahati: { river: 'Brahmaputra at DC Court Gauge', road: 'GS Road (Rukminigaon Sector)', hospital: 'Gauhati Medical College Hospital', hotspot: 'Anil Nagar & Nabin Nagar' },
    dehradun: { river: 'Rispana River at EC Road Bridge', road: 'Haridwar Road (Rispana Pul)', hospital: 'Doon Government Hospital', hotspot: 'Deepnagar & Chandreshwar Nagar' },
    patna: { river: 'Ganga at Digha Ghat', road: 'Bailey Road (Raja Bazar Lowline)', hospital: 'PMCH Patna', hotspot: 'Rajendra Nagar & Kankarbagh' },
    ahmedabad: { river: 'Sabarmati at Nehru Bridge', road: '132 Feet Ring Road (Akhbarnagar)', hospital: 'Civil Hospital Asarwa', hotspot: 'Vastrapur Lake Catchment' },
    shimla: { river: 'Ashwani Khad Tributary', road: 'Cart Road (Circular Road Chhota Shimla)', hospital: 'IGMC Shimla', hotspot: 'Dhalli & Krishna Nagar' }
  };

  const context = cityRiverMap[cleanId] || {
    river: `Primary Hydro Basin at ${loc.name}`,
    road: `State Highway Corridor (${loc.name} Sector)`,
    hospital: `${loc.name} Civil & District Hospital`,
    hotspot: `${loc.name} Central Lowland Basin`
  };

  const isHighRisk = ['guwahati', 'mumbai', 'kolkata', 'chennai', 'dehradun', 'patna'].includes(cleanId);
  const rainfall = isHighRisk ? 42 : 24;
  const floodProb = isHighRisk ? 82 : 56;
  const riskLevel: 'low' | 'moderate' | 'high' | 'critical' = isHighRisk ? 'high' : 'moderate';

  return {
    location: loc,
    weather: {
      temperatureC: isHighRisk ? 27 : 29,
      humidityPercent: isHighRisk ? 91 : 78,
      windSpeedKmh: isHighRisk ? 24 : 14,
      windDirection: 'SW',
      atmosphericPressureHpa: 1002,
      currentRainfallMmHr: rainfall,
      rainfallTrend: isHighRisk ? 'rising' : 'steady',
      recentRainfallTrend: [rainfall * 0.4, rainfall * 0.6, rainfall * 0.8, rainfall],
      conditionText: isHighRisk ? 'Heavy Precipitation & Active Flash Inundation Risk' : 'Intermittent Showers with Monsoon Cloud Deck'
    },
    rainfallForecast: [
      { time: '08:00', rainfallMm: Math.round(rainfall * 0.4), isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '09:00', rainfallMm: Math.round(rainfall * 0.6), isAiPrediction: false, confidencePercent: 99, intensity: 'moderate' },
      { time: '10:00', rainfallMm: Math.round(rainfall * 0.8), isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '11:00', rainfallMm: rainfall, isAiPrediction: false, confidencePercent: 98, intensity: 'heavy' },
      { time: '12:00', rainfallMm: Math.round(rainfall * 1.3), isAiPrediction: true, confidencePercent: 94, intensity: isHighRisk ? 'torrential' : 'heavy' },
      { time: '13:00', rainfallMm: Math.round(rainfall * 1.5), isAiPrediction: true, confidencePercent: 91, intensity: isHighRisk ? 'torrential' : 'heavy' },
      { time: '14:00', rainfallMm: Math.round(rainfall * 1.2), isAiPrediction: true, confidencePercent: 88, intensity: 'heavy' },
      { time: '15:00', rainfallMm: Math.round(rainfall * 0.9), isAiPrediction: true, confidencePercent: 86, intensity: 'moderate' },
      { time: '16:00', rainfallMm: Math.round(rainfall * 0.6), isAiPrediction: true, confidencePercent: 84, intensity: 'moderate' },
      { time: '17:00', rainfallMm: Math.round(rainfall * 0.4), isAiPrediction: true, confidencePercent: 81, intensity: 'light' },
      { time: '18:00', rainfallMm: Math.round(rainfall * 0.2), isAiPrediction: true, confidencePercent: 78, intensity: 'light' },
      { time: '19:00', rainfallMm: 4, isAiPrediction: true, confidencePercent: 76, intensity: 'light' }
    ],
    floodPrediction: {
      floodProbabilityPercent: floodProb,
      expectedWaterDepthMinM: isHighRisk ? 0.7 : 0.3,
      expectedWaterDepthMaxM: isHighRisk ? 1.5 : 0.7,
      timeToThresholdMinutes: isHighRisk ? 55 : 90,
      maxExpectedDepthM: isHighRisk ? 1.6 : 0.8,
      riskLevel: riskLevel,
      confidenceScorePercent: 92,
      inundationAreaSqKm: isHighRisk ? 36.4 : 14.2,
      timelineForecast: [
        { step: 'now', label: 'Now', waterDepthM: isHighRisk ? 0.4 : 0.15, inundationAreaSqKm: isHighRisk ? 12.0 : 4.5, riskLevel: isHighRisk ? 'moderate' : 'low' },
        { step: '+1h', label: '+1h', waterDepthM: isHighRisk ? 0.8 : 0.35, inundationAreaSqKm: isHighRisk ? 22.5 : 8.2, riskLevel: isHighRisk ? 'high' : 'moderate' },
        { step: '+2h', label: '+2h', waterDepthM: isHighRisk ? 1.2 : 0.55, inundationAreaSqKm: isHighRisk ? 31.0 : 11.5, riskLevel: isHighRisk ? 'high' : 'moderate' },
        { step: '+3h', label: '+3h', waterDepthM: isHighRisk ? 1.5 : 0.70, inundationAreaSqKm: isHighRisk ? 36.4 : 14.2, riskLevel: riskLevel },
        { step: '+6h', label: '+6h', waterDepthM: isHighRisk ? 0.8 : 0.30, inundationAreaSqKm: isHighRisk ? 18.0 : 6.0, riskLevel: isHighRisk ? 'moderate' : 'low' }
      ]
    },
    riskDrivers: [
      { factor: 'Heavy Rainfall', percentage: 46, description: `Monsoon convective downpour across ${loc.district}` },
      { factor: 'Drainage Stress', percentage: 26, description: 'Stormwater outfall backflow during peak discharge' },
      { factor: 'Low Elevation', percentage: 16, description: 'Natural topographic depression & floodplain basin' },
      { factor: 'River Level', percentage: 8, description: `${context.river} gauge level elevation` },
      { factor: 'Other Factors', percentage: 4, description: 'Soil saturation index exceeding 85%' }
    ],
    riverStations: [
      {
        name: context.river,
        currentLevelM: isHighRisk ? 12.4 : 7.2,
        warningLevelM: isHighRisk ? 11.5 : 8.0,
        dangerLevelM: isHighRisk ? 13.0 : 9.5,
        trend: isHighRisk ? 'rising' : 'stable',
        status: isHighRisk ? 'warning' : 'normal'
      }
    ],
    infrastructure: [
      {
        id: `inf-${cleanId}-1`,
        name: context.road,
        type: 'road',
        riskLevel: isHighRisk ? 'high' : 'moderate',
        status: isHighRisk ? 'Severe water accumulation; lane diversions active' : 'Traffic moving slowly through puddle zones',
        impactDetail: isHighRisk ? 'High chance of temporary closure in 60 min' : 'Passable with caution',
        coordinates: [loc.coordinates[0] - 0.015, loc.coordinates[1] - 0.01],
        alternativeRoute: 'Via Elevated Ring Viaduct Corridor',
        accessibility: isHighRisk ? 'limited' : 'fully_accessible'
      },
      {
        id: `inf-${cleanId}-2`,
        name: context.hospital,
        type: 'hospital',
        riskLevel: 'low',
        status: 'Operational 24/7 with emergency power backup',
        impactDetail: 'Emergency triage and ambulance bays unobstructed',
        coordinates: [loc.coordinates[0] + 0.012, loc.coordinates[1] + 0.008],
        distanceKm: 2.1,
        accessibility: 'fully_accessible'
      },
      {
        id: `inf-${cleanId}-3`,
        name: `${loc.name} Central Multi-Hazard Disaster Relief Center`,
        type: 'shelter',
        riskLevel: 'low',
        status: 'Active Relief Camp & Dry Provision Hub',
        impactDetail: 'Shelter capacity 1800 persons; water and medical units standby',
        coordinates: [loc.coordinates[0] + 0.02, loc.coordinates[1] - 0.018],
        capacity: 1800,
        currentAvailability: 1240,
        distanceKm: 3.4,
        accessibility: 'fully_accessible'
      }
    ],
    alerts: [
      {
        id: `alt-${cleanId}-1`,
        title: isHighRisk ? 'HIGH FLOOD & INUNDATION WARNING' : 'MODERATE MONSOON RAINFALL ADVISORY',
        description: `Rapid hydrologic response modeled along ${context.river}. Low-lying areas in ${loc.district} advised to exercise caution.`,
        severity: riskLevel,
        issuedAt: '12:30 IST',
        validUntil: '18:30 IST',
        confidencePercent: 91,
        affectedZones: [context.hotspot, `${loc.name} Ward 2-6`, 'Riverbank Environs'],
        recommendedAction: 'Avoid underpasses and low-lying transit corridors; monitor emergency alerts.'
      }
    ],
    sop: {
      immediateActions: [
        `Pre-position SDRF / Civil Defence units near ${context.hotspot}`,
        `Deploy dewatering pump sets at ${context.road}`,
        'Activate district emergency telemetry control room'
      ],
      evacuationZones: [`Zone A: Low-lying tracts along ${context.river}`],
      ndrfTeams: isHighRisk ? 3 : 1,
      ambulances: isHighRisk ? 6 : 3,
      shelterCapacity: 1800,
      helplineNumbers: ['112 (National Emergency)', '1077 (District Disaster Line)']
    },
    districtStats: {
      districtRisk: riskLevel,
      affectedZones: isHighRisk ? 9 : 4,
      highRiskAreas: isHighRisk ? 5 : 1,
      moderateRiskAreas: isHighRisk ? 4 : 3,
      populationExposure: isHighRisk ? 380000 : 95000,
      criticalInfraAtRisk: isHighRisk ? 11 : 4
    },
    hotspots: [
      {
        name: context.hotspot,
        coordinates: [loc.coordinates[0] + 0.005, loc.coordinates[1] + 0.003],
        rainfallMmHr: rainfall,
        predictedRainfallMm: Math.round(rainfall * 1.8),
        floodProbabilityPercent: floodProb,
        waterDepthRange: isHighRisk ? '0.7 - 1.5 m' : '0.3 - 0.7 m',
        leadTimeMinutes: isHighRisk ? 55 : 90,
        riskLevel: riskLevel
      }
    ]
  };
}

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 'jk-2014',
    title: '2014 Jammu & Kashmir Great Flood',
    date: 'September 2014',
    location: 'Kashmir Basin (Jhelum Basin)',
    peakRainfallMm: 380,
    floodExtentSqKm: 462.5,
    pod: 0.94,
    far: 0.08,
    iou: 0.86,
    precision: 0.91,
    recall: 0.94,
    rmse: 0.18,
    description: 'Catastrophic Himalayan monsoon surge coupled with western disturbance. Over 380mm rainfall in 72 hours caused massive breaches along Jhelum river embankments at Shivpora, Rajbagh and Kakapora, inundating Srinagar city center for over 2 weeks.',
    observedExtentPoly: [
      [74.76, 34.04], [74.83, 34.02], [74.86, 34.08], [74.81, 34.12], [74.75, 34.09]
    ],
    predictedExtentPoly: [
      [74.755, 34.038], [74.832, 34.022], [74.858, 34.078], [74.812, 34.118], [74.748, 34.088]
    ]
  },
  {
    id: 'himalayan-2023',
    title: '2023 Himalayan Cloudburst & Inundation Surge',
    date: 'July 2023',
    location: 'North-Western Himalayas (J&K / HP Border)',
    peakRainfallMm: 245,
    floodExtentSqKm: 184.2,
    pod: 0.89,
    far: 0.12,
    iou: 0.81,
    precision: 0.88,
    recall: 0.89,
    rmse: 0.22,
    description: 'Intense orographic multi-cell cloudburst events triggering severe debris torrents, riverbed scour, and flash inundation across mountainous highway arteries including NH-44 and Chenab tributary catchments.',
    observedExtentPoly: [
      [74.80, 32.68], [74.88, 32.70], [74.86, 32.76], [74.78, 32.74]
    ],
    predictedExtentPoly: [
      [74.795, 32.685], [74.875, 32.705], [74.855, 32.755], [74.782, 32.738]
    ]
  },
  {
    id: 'glof-chamoli',
    title: 'High-Altitude GLOF & Flash Flood Benchmark',
    date: 'February 2021',
    location: 'Upper Himalayan Glacier Catchment',
    peakRainfallMm: 110,
    floodExtentSqKm: 64.0,
    pod: 0.92,
    far: 0.09,
    iou: 0.84,
    precision: 0.90,
    recall: 0.92,
    rmse: 0.25,
    description: 'Rock-ice avalanche detached from Ronti peak generating rapid hydraulic slurry wave propagating downstream at 35 km/h. AquaSense physics-constrained hydro-model verified against ground survey benchmarks.',
    observedExtentPoly: [
      [77.50, 34.10], [77.62, 34.12], [77.60, 34.18], [77.48, 34.15]
    ],
    predictedExtentPoly: [
      [77.51, 34.105], [77.615, 34.122], [77.595, 34.175], [77.485, 34.148]
    ]
  }
];

export const SYSTEM_METRICS = {
  rainfallRmse: 0.24,
  floodAccuracyPercent: 94.2,
  pod: 0.93,
  far: 0.07,
  iou: 0.87,
  dataLatencySeconds: 1.4,
  apiResponseMs: 42,
  modelInferenceSeconds: 12,
  activeSensors: 428,
  dataAvailabilityPercent: 99.85,
  totalAlertsIssued: 38,
  criticalAlerts: 4,
  moderateAlerts: 14,
  estimatedPopulationProtected: 1450000
};

export const DATA_SOURCES = [
  { name: 'NASA GPM (Global Precipitation Measurement)', type: 'Satellite Radar', latency: '12 min', status: 'connected' },
  { name: 'Doppler Weather Radar (IMD Srinagar & Jammu)', type: 'Ground Radar', latency: '4 min', status: 'connected' },
  { name: 'Automatic Weather Stations (AWS Network)', type: 'Surface Sensors (84 units)', latency: '30 sec', status: 'connected' },
  { name: 'IMD NWP High-Res WRF Numerical Models', type: 'Atmospheric Physics', latency: '3 hours', status: 'connected' },
  { name: 'SRTM / CartoDEM High-Res Elevation Grid', type: 'Topography (3m DEM)', latency: 'Static', status: 'connected' },
  { name: 'CWC Telemetric River Gauges', type: 'Acoustic Water Depth', latency: '1 min', status: 'connected' },
  { name: 'Sentinel-1 C-Band SAR Synthetic Aperture', type: 'Satellite Inundation', latency: '6 hours', status: 'delayed' }
];
