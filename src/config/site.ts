const DEFAULT_SITE_ORIGIN = 'https://www.aigokey.com'

// Keep every generated absolute URL on the same origin. Override this only for
// a deliberate staging build, never per page or per component.
const configuredSiteOrigin = (import.meta.env.VITE_SITE_ORIGIN || DEFAULT_SITE_ORIGIN).trim()
export const SITE_ORIGIN = configuredSiteOrigin.replace(/\/+$/, '') || DEFAULT_SITE_ORIGIN
export const AUTH_ORIGIN = 'https://llm.aigokey.com'

export function normalizeSitePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || '/'
  if (pathname === '/') return '/'
  return `${pathname.replace(/\/+$/, '')}/`
}

export function canonicalUrl(path: string): string {
  return `${SITE_ORIGIN}${normalizeSitePath(path)}`
}
