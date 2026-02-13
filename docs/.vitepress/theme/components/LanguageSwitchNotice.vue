<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { detectPreferredLocale, getLocaleFromPath, type SupportedLocale, withLocale } from '../lang'

const route = useRoute()
const router = useRouter()
const visible = ref(false)
const targetLocale = ref<SupportedLocale | null>(null)

const currentLocale = computed(() => getLocaleFromPath(route.path))

const copy = computed(() => {
  if (currentLocale.value === 'en') {
    return {
      title: 'Detected Chinese system language. Switch to Chinese?',
      switchText: 'Switch to Chinese',
      dismissText: 'Keep English'
    }
  }
  return {
    title: '检测到你的系统语言是英文，是否切换到英文页面？',
    switchText: '切换到英文',
    dismissText: '保持中文'
  }
})

function getDismissKey(locale: SupportedLocale) {
  return `vp-language-switch-dismiss:${locale}`
}

function refreshNotice() {
  const locale = currentLocale.value
  if (!locale || typeof window === 'undefined') {
    visible.value = false
    return
  }

  const preferred = detectPreferredLocale()
  if (preferred === locale) {
    visible.value = false
    return
  }

  const dismissed = window.localStorage.getItem(getDismissKey(preferred)) === '1'
  if (dismissed) {
    visible.value = false
    return
  }

  targetLocale.value = preferred
  visible.value = true
}

function dismissNotice() {
  if (targetLocale.value && typeof window !== 'undefined') {
    window.localStorage.setItem(getDismissKey(targetLocale.value), '1')
  }
  visible.value = false
}

function switchLanguage() {
  if (!targetLocale.value) return
  visible.value = false
  router.go(withLocale(route.path, targetLocale.value))
}

onMounted(refreshNotice)
watch(() => route.path, refreshNotice)
</script>

<template>
  <div v-if="visible" class="lang-switch-notice" role="status" aria-live="polite">
    <p>{{ copy.title }}</p>
    <div class="lang-switch-actions">
      <button type="button" class="lang-switch-primary" @click="switchLanguage">
        {{ copy.switchText }}
      </button>
      <button type="button" class="lang-switch-secondary" @click="dismissNotice">
        {{ copy.dismissText }}
      </button>
    </div>
  </div>
</template>
