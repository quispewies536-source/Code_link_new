'use client'

import React from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store/hooks'
import { setLocale } from '@/app/store/slices/localeSlice'
import { LOCALE_BCP47 } from '@/i18n'
import { APP_LOCALES, type AppLocale } from '@/i18n/schema'
import { LOCALE_OPTION_LABELS } from '@/i18n/localeOptionLabels'
import { useAppStrings } from '@/hooks/useAppStrings'
import { readSessionDisplayLocale, writeSessionDisplayLocale } from '@/utils/metaVerifiedDisplayLocale'

function applyDocumentLang(locale: AppLocale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = LOCALE_BCP47[locale]
    document.documentElement.dataset.locale = locale
  }
}

export default function PrivacyLanguagePicker() {
  const t = useAppStrings()
  const dispatch = useAppDispatch()
  const currentLocale = useAppSelector((s) => s.locale.locale)

  const [pickerValue, setPickerValue] = React.useState<AppLocale>(currentLocale)

  React.useEffect(() => {
    const sessionLocale = readSessionDisplayLocale()
    if (sessionLocale) {
      setPickerValue(sessionLocale)
      return
    }
    setPickerValue(currentLocale)
  }, [currentLocale])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as AppLocale
    writeSessionDisplayLocale(locale)
    setPickerValue(locale)
    dispatch(setLocale(locale))
    applyDocumentLang(locale)
  }

  return (
    <div className="mx-auto mb-[18px] w-full max-w-[860px] px-[max(16px,env(safe-area-inset-left))] pr-[max(16px,env(safe-area-inset-right))]">
      <div className="flex flex-wrap items-center justify-between gap-[10px] rounded-[14px] border border-[#dbe6fb] bg-[#f7f9ff] px-[14px] py-[10px] shadow-[0_4px_10px_rgba(15,35,75,0.06)]">
        <div className="flex min-w-0 flex-col">
          <label
            htmlFor="meta-verified-display-lang"
            className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5a6b8d]"
          >
            {t.languagePicker.label}
          </label>
        </div>
        <div className="min-w-[180px] max-w-[260px]">
          <select
            id="meta-verified-display-lang"
            value={pickerValue}
            onChange={handleChange}
            className="block w-full min-h-[40px] cursor-pointer rounded-[12px] border border-[#dbe9ff] bg-white px-[12px] py-[8px] text-[13px] font-medium text-[#1f2a45] shadow-sm outline-none transition duration-150 hover:border-[#1877f2] focus-visible:ring-2 focus-visible:ring-[#1877f2]/30"
            aria-label={t.languagePicker.label}
          >
            {APP_LOCALES.map((code) => (
              <option key={code} value={code}>
                {LOCALE_OPTION_LABELS[code]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

