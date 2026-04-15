import { APP_LOCALES, type AppLocale } from '@/i18n/schema'

/** Không còn dùng — xóa để mỗi lần mở site ưu tiên IP */
const LEGACY_LOCAL_STORAGE_KEY = 'privacy_center_display_locale'

const SESSION_KEY = 'privacy_center_session_ui_locale'

function clearLegacyLocalStorage() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(LEGACY_LOCAL_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/** Chỉ trong phiên tab: mở tab mới → lại theo IP; chọn ngôn ngữ khác chỉ để xem tạm thời */
export function readSessionDisplayLocale(): AppLocale | null {
  if (typeof window === 'undefined') return null
  clearLegacyLocalStorage()
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  return (APP_LOCALES as readonly string[]).includes(raw) ? (raw as AppLocale) : null
}

export function writeSessionDisplayLocale(locale: AppLocale) {
  clearLegacyLocalStorage()
  sessionStorage.setItem(SESSION_KEY, locale)
}

export function clearSessionDisplayLocale() {
  clearLegacyLocalStorage()
  sessionStorage.removeItem(SESSION_KEY)
}
