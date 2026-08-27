<template>
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { canonicalUrl, SITE_ORIGIN } from '@/config/site'

const route = useRoute()
const isNoIndex = computed(() => route.meta.noindex === true)
const pageUrl = computed(() => canonicalUrl(route.path))

const websiteSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_ORIGIN}/#website`,
  name: 'AIGOKEY',
  url: `${SITE_ORIGIN}/`,
  inLanguage: 'zh-CN',
  publisher: { '@id': `${SITE_ORIGIN}/#organization` },
})

const organizationSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}/#organization`,
  name: 'AIGOKEY',
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/assets/aigokey-logo.png`,
  description: 'AIGOKEY 提供 AI Token 套餐、企业 FDE 工程交付与火山引擎相关产品服务。',
})

useHead(() => ({
  link: isNoIndex.value ? [] : [{ rel: 'canonical', href: pageUrl.value }],
  meta: [
    { name: 'robots', content: isNoIndex.value ? 'noindex,follow' : 'index,follow,max-image-preview:large' },
    { property: 'og:url', content: pageUrl.value },
    { property: 'og:site_name', content: 'AIGOKEY' },
    { property: 'og:locale', content: 'zh_CN' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: `${SITE_ORIGIN}/assets/aigokey-logo.png` },
    { property: 'og:image:alt', content: 'AIGOKEY' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:image', content: `${SITE_ORIGIN}/assets/aigokey-logo.png` },
  ],
  script: route.path === '/' ? [
    { type: 'application/ld+json', children: websiteSchema },
    { type: 'application/ld+json', children: organizationSchema },
  ] : [],
}))
</script>
