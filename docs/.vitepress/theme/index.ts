import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import './style.css'
import LanguageSwitchNotice from './components/LanguageSwitchNotice.vue'
import { detectPreferredLocale, getLocaleFromPath, withLocale } from './lang'

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(LanguageSwitchNotice)
    })
  },
  enhanceApp({ router }) {
    if (typeof window === 'undefined') return

    const redirectWithoutLocale = (target: string) => {
      const resolved = new URL(target, window.location.origin)
      if (getLocaleFromPath(resolved.pathname)) return
      const locale = detectPreferredLocale()
      const localizedPath = withLocale(resolved.pathname, locale)
      const nextUrl = `${localizedPath}${resolved.search}${resolved.hash}`
      if (nextUrl !== `${resolved.pathname}${resolved.search}${resolved.hash}`) {
        router.go(nextUrl)
      }
    }

    redirectWithoutLocale(window.location.href)
    router.onAfterRouteChanged = (to) => redirectWithoutLocale(to)
  }
}

export default theme
