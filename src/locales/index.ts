import { en } from './en';
import { hi } from './hi';
import { ur } from './ur';
import { ks } from './ks';
import { pa } from './pa';
import {
  bn,
  mr,
  ta,
  te,
  kn,
  ml,
  gu,
  or as odia,
  as as assamese,
  sa as sanskrit,
  sd as sindhi
} from './regional';
import { LanguageCode } from '../types';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  isRTL: boolean;
  script: string;
}

/**
 * 22 Scheduled Languages of the Eighth Schedule of the Constitution of India + English
 */
export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', isRTL: false, script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', isRTL: false, script: 'Devanagari' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', isRTL: false, script: 'Bengali' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', isRTL: false, script: 'Devanagari' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', isRTL: false, script: 'Telugu' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', isRTL: false, script: 'Tamil' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', isRTL: false, script: 'Gujarati' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', isRTL: true, script: 'Nastaliq / Arabic' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', isRTL: false, script: 'Kannada' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', isRTL: false, script: 'Odia' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', isRTL: false, script: 'Malayalam' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', isRTL: false, script: 'Gurmukhi' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', isRTL: false, script: 'Bengali-Assamese' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', isRTL: true, script: 'Perso-Arabic' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', isRTL: false, script: 'Devanagari' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', isRTL: true, script: 'Perso-Arabic' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', isRTL: false, script: 'Devanagari' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', isRTL: false, script: 'Devanagari' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', isRTL: false, script: 'Devanagari' },
  { code: 'brx', name: 'Bodo', nativeName: 'बोडो', isRTL: false, script: 'Devanagari' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', isRTL: false, script: 'Meetei Mayek' },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', isRTL: false, script: 'Ol Chiki' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', isRTL: false, script: 'Devanagari' }
];

export const translations: Record<LanguageCode, typeof en> = {
  en,
  hi: { ...en, ...hi },
  ur: { ...en, ...ur },
  ks: { ...en, ...ks },
  pa: { ...en, ...pa },
  bn: { ...en, ...bn },
  mr: { ...en, ...mr },
  ta: { ...en, ...ta },
  te: { ...en, ...te },
  kn: { ...en, ...kn },
  ml: { ...en, ...ml },
  gu: { ...en, ...gu },
  or: { ...en, ...odia },
  as: { ...en, ...assamese },
  sa: { ...en, ...sanskrit },
  sd: { ...en, ...sindhi },
  // Devanagari regional variations fallback gracefully to Hindi/English translations
  ne: { ...en, ...hi, appTagline: "एआई-सञ्चालित बाढी र भारी वर्षा पूर्व चेतावनी प्रणाली" },
  kok: { ...en, ...hi, appTagline: "एआय-संचलित हुंवार आनी मुसळधार पावस पूर्वसूचना प्रणाली" },
  doi: { ...en, ...hi, appTagline: "एआई-संचालित बाढ़ ते भारी बरसाती दी पूर्व चेतावनी प्रणाली" },
  mai: { ...en, ...hi, appTagline: "एआई-सञ्चालित बाढ़ि आ भारी वर्षाक पूर्व चेतावनी प्रणाली" },
  brx: { ...en, ...hi, appTagline: "AI-जों दैबाना आरो अखा हानायनि सिगां खौरां होनाय राहा" },
  mni: { ...en, ...assamese, appTagline: "এআইনা চলাইবা ঈশিং ইচাও অমসুং নোং চুরাক্কদবগী পাউ হায়বগী থৌরাং" },
  sat: { ...en, ...hi, appTagline: "AI ᱫᱟᱨᱟᱭ ᱛᱮ ᱫᱟᱜ ᱟᱨ ᱵᱟᱹᱰ ᱨᱮᱱᱟᱜ ᱢᱟᱬᱟᱝ ᱪᱮᱛᱟᱣᱱᱤ" }
};

export type TranslationKey = keyof typeof en;
