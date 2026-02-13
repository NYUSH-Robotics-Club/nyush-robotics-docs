export type SupportedLocale = 'zh' | 'en'

const DEFAULT_LOCALE: SupportedLocale = 'zh'

function normalizeLocale(value?: string | null): SupportedLocale | null {
  if (!value) return null
  const locale = value.toLowerCase()
  if (locale.startsWith('zh')) return 'zh'
  if (locale.startsWith('en')) return 'en'
  return null
}

export function detectPreferredLocale(): SupportedLocale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const candidates = Array.isArray(navigator.languages) && navigator.languages.length > 0
    ? navigator.languages
    : [navigator.language]

  for (const candidate of candidates) {
    const locale = normalizeLocale(candidate)
    if (locale) return locale
  }
  return DEFAULT_LOCALE
}

export function getLocaleFromPath(path: string): SupportedLocale | null {
  const match = path.match(/^\/(zh|en)(\/|$)/)
  if (!match) return null
  return match[1] as SupportedLocale
}

function stripLocalePrefix(path: string): string {
  const stripped = path.replace(/^\/(zh|en)(?=\/|$)/, '')
  return stripped || '/'
}

export function withLocale(path: string, locale: SupportedLocale): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const withoutLocale = stripLocalePrefix(normalizedPath)
  if (withoutLocale === '/') return `/${locale}/`
  return `/${locale}${withoutLocale}`
}

