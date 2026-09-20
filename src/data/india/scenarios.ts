export interface DisasterScenario {
  id: string;
  title: string;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  cityId: string;
  cityName: string;
  coordinates: [number, number];
  riskLevel: 'critical' | 'high' | 'moderate';
  rainfallMmHr: number;
  predictedRainfallMm: number;
  floodProbabilityPercent: number;
  waterDepthRange: string;
  leadTimeMinutes: number;
  badge: string;
  description: string;
  primaryRiver: string;
  actionSop: string;
}

export const DEMO_SCENARIOS: DisasterScenario[] = [
  {
    id: 'jk-jhelum',
    title: 'J&K / Jhelum River Catastrophic Inundation',
    stateId: 'jammu-kashmir',
    stateName: 'Jammu & Kashmir',
    districtId: 'srinagar-dist',
    districtName: 'Srinagar District',
    cityId: 'srinagar',
    cityName: 'Srinagar',
    coordinates: [74.7973, 34.0837],
    riskLevel: 'critical',
    rainfallMmHr: 48.5,
    predictedRainfallMm: 96.0,
    floodProbabilityPercent: 92,
    waterDepthRange: '1.2 - 2.1 m',
    leadTimeMinutes: 52,
    badge: 'RED ALERT • HYDRO DANGER',
    description: 'Upper catchment cloudburst surge propagating into Jhelum basin. Sangam & Ram Munshi Bagh gauges breaching danger mark. Embankment overtopping active in Rajbagh, Batmaloo and Bemina lowlands.',
    primaryRiver: 'Jhelum River at Ram Munshi Bagh',
    actionSop: 'Activate 4 NDRF battalions; issue immediate sirens in Wards 1-12; shift electrical substation load to Bemina bypass.'
  },
  {
    id: 'assam-brahmaputra',
    stateId: 'assam',
    stateName: 'Assam',
    districtId: 'kamrup-metro-dist',
    districtName: 'Kamrup Metropolitan',
    cityId: 'guwahati',
    cityName: 'Guwahati',
    coordinates: [91.7362, 26.1445],
    riskLevel: 'critical',
    rainfallMmHr: 54.0,
    predictedRainfallMm: 110.0,
    floodProbabilityPercent: 94,
    waterDepthRange: '1.4 - 2.5 m',
    leadTimeMinutes: 45,
    badge: 'CRITICAL MULTI-HAZARD',
    title: 'Assam / Brahmaputra Monsoon Mega-Flood',
    description: 'Brahmaputra flowing 1.8 meters above highest flood level (HFL). Heavy trans-boundary discharge from Arunachal foothills causing severe backflow across Bharalu river and urban inundation.',
    primaryRiver: 'Brahmaputra at DC Court Gauge',
    actionSop: 'SDRF boat deployment at Anil Nagar & Nabin Nagar; open 14 relief camps across Kamrup; deploy high-capacity diesel pumps.'
  },
  {
    id: 'mumbai-flashflood',
    stateId: 'maharashtra',
    stateName: 'Maharashtra',
    districtId: 'mumbai-dist',
    districtName: 'Mumbai Suburban',
    cityId: 'mumbai',
    cityName: 'Mumbai',
    coordinates: [72.8777, 19.0760],
    riskLevel: 'critical',
    rainfallMmHr: 58.0,
    predictedRainfallMm: 125.0,
    floodProbabilityPercent: 91,
    waterDepthRange: '1.1 - 2.0 m',
    leadTimeMinutes: 40,
    badge: 'FLASH INUNDATION & HIGH TIDE',
    title: 'Mumbai Severe Urban Surge (Mithi River & High Tide)',
    description: 'Extremely heavy localized cloudburst coincide with 4.6m high tide. Mithi River outfalls choked at Mahim Creek. Western Express Highway subways and Kurla rail tracks waterlogged.',
    primaryRiver: 'Mithi River at Kurla Bridge',
    actionSop: 'Halt suburban rail operations on Harbor/Central low lines; activate BMC floodgates; deploy disaster management cells at Hindmata.'
  },
  {
    id: 'uttarakhand-cloudburst',
    stateId: 'uttarakhand',
    stateName: 'Uttarakhand',
    districtId: 'dehradun-dist',
    districtName: 'Dehradun District',
    cityId: 'dehradun',
    cityName: 'Dehradun',
    coordinates: [78.0322, 30.3165],
    riskLevel: 'critical',
    rainfallMmHr: 46.0,
    predictedRainfallMm: 88.0,
    floodProbabilityPercent: 88,
    waterDepthRange: '0.9 - 1.8 m',
    leadTimeMinutes: 50,
    badge: 'OROGRAPHIC CLOUDBURST',
    title: 'Uttarakhand / Dehradun Orographic Flash Surge',
    description: 'Intense orographic convective cell trapped against Mussoorie foothills triggering flash torrents along Rispana and Bindal rivers. Bridges and road approaches at risk of scouring.',
    primaryRiver: 'Rispana River at EC Road',
    actionSop: 'Evacuate slum clusters along Rispana riverbed; inspect Haridwar bypass bridge piers; divert traffic from Mussoorie diversion.'
  },
  {
    id: 'chennai-surge',
    stateId: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    districtId: 'chennai-dist',
    districtName: 'Chennai District',
    cityId: 'chennai',
    cityName: 'Chennai',
    coordinates: [80.2707, 13.0827],
    riskLevel: 'high',
    rainfallMmHr: 44.0,
    predictedRainfallMm: 92.0,
    floodProbabilityPercent: 86,
    waterDepthRange: '0.9 - 1.9 m',
    leadTimeMinutes: 55,
    badge: 'CYCLONIC RAINFALL ADVISORY',
    title: 'Chennai Coastal Surge & Basin Flooding',
    description: 'Deep depression in Bay of Bengal feeding continuous convective bands into Chennai coastal plain. Chembarambakkam reservoir release into Adyar River coinciding with coastal storm surge.',
    primaryRiver: 'Adyar River at Saidapet Basin',
    actionSop: 'Pre-position boats in Velachery, Mudichur and Tambaram; inspect stormwater drains on OMR IT corridor; open school shelters.'
  },
  {
    id: 'bihar-patna',
    stateId: 'bihar',
    stateName: 'Bihar',
    districtId: 'patna-dist',
    districtName: 'Patna District',
    cityId: 'patna',
    cityName: 'Patna',
    coordinates: [85.1376, 25.5941],
    riskLevel: 'critical',
    rainfallMmHr: 47.0,
    predictedRainfallMm: 95.0,
    floodProbabilityPercent: 91,
    waterDepthRange: '1.2 - 2.2 m',
    leadTimeMinutes: 48,
    badge: 'GANGA BASIN DANGER',
    title: 'Bihar / Patna Ganga Basin Flash Inundation',
    description: 'Ganga river level at Digha Ghat 1.2m over danger level following heavy upstream releases from Sone and Gandak rivers. City drainage sluices locked to prevent river backflow into residential wards.',
    primaryRiver: 'Ganga River at Digha Ghat',
    actionSop: 'Run 18 sump drainage pumping stations 24x7; deploy relief supplies in Kankarbagh & Rajendra Nagar; position NDRF 9th Bn.'
  }
];
