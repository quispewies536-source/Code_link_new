import type { AppLocale } from './schema'

/** Ước lượng ngôn ngữ giao diện phổ biến theo quốc gia (ISO 3166-1 alpha-2) từ IP geolocation */
const COUNTRY_DEFAULT: Record<string, AppLocale> = {
  VN: 'vi',
  CN: 'zh-Hans',
  TW: 'zh-Hant',
  HK: 'zh-Hant',
  MO: 'zh-Hant',
  JP: 'ja',
  KR: 'ko',
  KP: 'ko',
  TH: 'th',
  ID: 'id',
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  EC: 'es',
  GT: 'es',
  CU: 'es',
  BO: 'es',
  DO: 'es',
  HN: 'es',
  PY: 'es',
  SV: 'es',
  NI: 'es',
  CR: 'es',
  PA: 'es',
  UY: 'es',
  PT: 'pt',
  BR: 'pt',
  AO: 'pt',
  MZ: 'pt',
  FR: 'fr',
  BE: 'fr',
  LU: 'fr',
  MC: 'fr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
}

export function countryCodeToAppLocale(countryCode: string | undefined): AppLocale {
  if (!countryCode) return 'en'
  const upper = countryCode.toUpperCase()
  return COUNTRY_DEFAULT[upper] ?? 'en'
}
