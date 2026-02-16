import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import './style.css'
import LanguageSwitchNotice from './components/LanguageSwitchNotice.vue'
import { detectPreferredLocale, getLocaleFromPath, withLocale } from './lang'

let mermaidImport: Promise<any> | null = null

const loadMermaid = async () => {
  if (!mermaidImport) {
    mermaidImport = import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')
  }
  return mermaidImport
}

const renderMermaid = async () => {
  if (typeof window === 'undefined') return
  const nodes = Array.from(document.querySelectorAll('pre.mermaid'))
  if (!nodes.length) return

  try {
    const mod = await loadMermaid()
    const mermaid = mod.default
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
    })

    for (const el of nodes) {
      el.removeAttribute('data-processed')
    }

    await mermaid.run({ nodes })
  } catch (err) {
    console.error('[docs] Mermaid render failed:', err)
  }
}

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

    const afterRoute = (to: string) => {
      redirectWithoutLocale(to)
      setTimeout(() => {
        renderMermaid()
      }, 0)
    }

    afterRoute(window.location.href)
    router.onAfterRouteChanged = afterRoute
  }
}

export default theme
