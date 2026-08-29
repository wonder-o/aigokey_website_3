<template>
  <div class="partner-page">
    <SiteHeader @trial="showModal = true" />

    <main>
      <section class="partner-hero">
        <div class="partner-hero-grid">
          <div class="partner-hero-copy">
            <nav class="partner-breadcrumb" :aria-label="page.breadcrumb.label"><router-link to="/">{{ page.breadcrumb.home }}</router-link><span>/</span><span>{{ page.breadcrumb.current }}</span></nav>
            <p class="partner-eyebrow"><span></span>{{ page.hero.eyebrow }}</p>
            <h1>{{ page.hero.titleBefore }}<br /><em>{{ page.hero.titleHighlight }}</em></h1>
            <p class="partner-summary">{{ page.hero.summary }}</p>
            <div class="partner-hero-actions">
              <a class="partner-action partner-action--primary" href="#contact">{{ page.hero.primary }} <ArrowRight :size="17" aria-hidden="true" /></a>
              <a class="partner-action partner-action--secondary" href="#capabilities">{{ page.hero.secondary }}</a>
            </div>
            <div class="partner-procurement-note">
              <span class="partner-procurement-mark" aria-hidden="true">%</span>
              <div><strong>{{ page.hero.procurementTitle }}</strong><p>{{ page.hero.procurementText }}</p></div>
            </div>
            <p class="partner-disclaimer"><Info :size="15" aria-hidden="true" />{{ page.hero.disclaimer }}</p>
          </div>

          <aside class="partner-console" :aria-label="page.console.label">
            <header><span><Boxes :size="16" aria-hidden="true" />{{ page.console.title }}</span><i><b></b>{{ page.console.live }}</i></header>
            <div class="partner-console-body">
              <div class="console-orbit" aria-hidden="true"><span class="orbit-core">AI</span><i class="orbit-node orbit-node--cloud"><Cloud :size="18" /></i><i class="orbit-node orbit-node--app"><AppWindow :size="17" /></i><i class="orbit-node orbit-node--data"><Database :size="17" /></i></div>
              <ol class="console-flow">
                <li v-for="item in page.console.steps" :key="item.code"><span>{{ item.code }}</span><div><strong>{{ item.title }}</strong><small>{{ item.text }}</small></div><Check :size="15" /></li>
              </ol>
            </div>
            <footer><span>{{ page.console.outcomeLabel }}</span><strong>{{ page.console.outcome }}</strong></footer>
          </aside>
        </div>
        <div class="partner-proof"><span v-for="(item, index) in page.proof" :key="item"><component :is="proofIcons[index]" :size="17" aria-hidden="true" />{{ item }}</span></div>
      </section>

      <section class="partner-section partner-context">
        <div class="partner-shell partner-context-grid">
          <div class="partner-intro"><p class="partner-eyebrow"><span></span>{{ page.value.eyebrow }}</p><h2>{{ page.value.titleBefore }}<br />{{ page.value.titleAfter }}</h2></div>
          <div class="partner-context-copy"><p v-for="item in page.value.paragraphs" :key="item">{{ item }}</p></div>
        </div>
      </section>

      <section id="capabilities" class="partner-section partner-capabilities">
        <div class="partner-shell">
          <div class="partner-section-heading"><div><p class="partner-eyebrow"><span></span>{{ page.capabilities.eyebrow }}</p><h2>{{ page.capabilities.title }}</h2></div><p>{{ page.capabilities.description }}</p></div>
          <div class="partner-capability-list">
            <article v-for="(item, index) in page.capabilities.items" :key="item.title">
              <span class="capability-num">0{{ index + 1 }}</span>
              <component :is="capabilityIcons[index]" :size="23" aria-hidden="true" />
              <div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div>
              <ul><li v-for="point in item.points" :key="point"><Check :size="15" aria-hidden="true" />{{ point }}</li></ul>
            </article>
          </div>
        </div>
      </section>

      <section class="partner-section partner-scenarios">
        <div class="partner-shell">
          <div class="partner-section-heading"><div><p class="partner-eyebrow"><span></span>{{ page.scenarios.eyebrow }}</p><h2>{{ page.scenarios.title }}</h2></div><p>{{ page.scenarios.description }}</p></div>
          <div class="partner-scenario-grid">
            <article v-for="(item, index) in page.scenarios.items" :key="item.title"><component :is="scenarioIcons[index]" :size="22" aria-hidden="true" /><span>{{ item.label }}</span><h3>{{ item.title }}</h3><p>{{ item.text }}</p></article>
          </div>
        </div>
      </section>

      <section class="partner-section partner-process">
        <div class="partner-shell partner-process-layout">
          <div class="partner-intro"><p class="partner-eyebrow"><span></span>{{ page.process.eyebrow }}</p><h2>{{ page.process.titleBefore }}<br />{{ page.process.titleAfter }}</h2><p>{{ page.process.description }}</p></div>
          <ol>
            <li v-for="item in page.process.items" :key="item.num"><span>{{ item.num }}</span><div><h3>{{ item.title }}</h3><p>{{ item.text }}</p></div><strong>{{ item.output }}</strong></li>
          </ol>
        </div>
      </section>

      <section id="contact" class="partner-contact">
        <div class="partner-shell partner-contact-grid">
          <div><p class="partner-eyebrow"><span></span>{{ page.contact.eyebrow }}</p><h2>{{ page.contact.title }}</h2><p>{{ page.contact.text }}</p><ul><li v-for="item in page.contact.items" :key="item"><Check :size="16" aria-hidden="true" />{{ item }}</li></ul></div>
          <aside><div><MessageCircle :size="20" aria-hidden="true" /><strong>{{ page.contact.supportTitle }}</strong></div><img src="/assets/customer-service-qr.png" :alt="page.contact.qrAlt" /><p>{{ page.contact.qrText }}</p></aside>
        </div>
      </section>
    </main>

    <SiteFooter />

    <Teleport to="body"><div v-if="showModal" class="partner-modal" @click.self="showModal = false"><div role="dialog" aria-modal="true" :aria-label="page.contact.supportTitle"><header><strong>{{ page.contact.supportTitle }}</strong><button type="button" :aria-label="page.contact.close" @click="showModal = false">&times;</button></header><img src="/assets/customer-service-qr.png" :alt="page.contact.qrAlt" /><p>{{ page.contact.qrText }}</p></div></div></Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { AppWindow, ArrowRight, BadgeCheck, Boxes, Check, Cloud, Database, Headphones, Info, MessageCircle, Route, Settings2, Sparkles, Workflow } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { SITE_ORIGIN } from '@/config/site'
import { volcenginePartnerEn, volcenginePartnerZh } from '@/data/volcengine-partner'

const { lang } = useI18n()
const showModal = ref(false)
const capabilityIcons = [Route, Workflow, Settings2]
const scenarioIcons = [Sparkles, Database, Cloud]
const proofIcons = [BadgeCheck, Route, Headphones]

function toPartnerTraditionalText(text: string) {
  const replacements = [
    ['面包屑', '麵包屑'],
    ['合作伙伴', '合作夥伴'],
    ['价值', '價值'],
    ['確认', '確認'],
    ['復雜', '複雜'],
    ['采用', '採用'],
    ['聯系', '聯繫'],
    ['賬號', '帳號'],
    ['備注', '備註'],
    ['運營', '營運'],
    ['接口', '介面'],
    ['集成', '整合'],
    ['數據', '資料'],
    ['優先級', '優先順序'],
  ] as const
  return replacements.reduce((result, [source, target]) => result.replaceAll(source, target), toTraditionalText(text))
}

function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toPartnerTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  return value
}

const page = computed(() => lang.value === 'en' ? volcenginePartnerEn : lang.value === 'zh-TW' ? localizeTraditional(volcenginePartnerZh) : volcenginePartnerZh)

const pageUrl = `${SITE_ORIGIN}/volcengine-partner/`
const structuredData = computed(() => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: page.value.meta.title.replace(' - AIGOKEY', ''),
      description: page.value.meta.description,
      inLanguage: lang.value === 'en' ? 'en' : lang.value === 'zh-TW' ? 'zh-Hant' : 'zh-CN',
      url: pageUrl,
      provider: { '@id': `${SITE_ORIGIN}/#organization` },
      serviceType: page.value.capabilities.items.map((item) => item.title),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: page.value.breadcrumb.home, item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: page.value.breadcrumb.current, item: pageUrl },
      ],
    },
  ],
}))

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.ogDescription },
  ],
  script: [{ type: 'application/ld+json', children: structuredData.value }],
}))
</script>

<style scoped>
.partner-page { --ink: #132b3b; --muted: #5d7180; --line: #d3e0e6; --orange: #ef5d16; --orange-soft: #fff0e8; --blue: #1675b9; color: var(--ink); background: #fff; }.partner-page :where(h1,h2,h3,p) { margin: 0; }.partner-page :where(a) { text-decoration: none; }.partner-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }.partner-eyebrow { display: inline-flex; align-items: center; gap: 9px; color: #b94a17; font: 800 12px/1.3 Consolas, monospace; }.partner-eyebrow span { width: 9px; height: 9px; background: var(--orange); transform: rotate(45deg); }
.partner-breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; color: #6b7f8a; font-size: 12px; font-weight: 750; }.partner-breadcrumb a { color: #2c6f96; }.partner-breadcrumb a:hover { color: #b94a17; }
.partner-hero { position: relative; overflow: hidden; padding: 76px 0 0; border-bottom: 1px solid var(--line); background: #fbfdfe; }.partner-hero::before { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(22,117,185,.055) 1px, transparent 1px), linear-gradient(90deg,rgba(22,117,185,.055) 1px, transparent 1px); background-size: 52px 52px; mask-image: linear-gradient(180deg,#000,transparent 85%); content: ''; }.partner-hero-grid { position: relative; width: min(1180px, calc(100% - 48px)); margin: 0 auto; display: grid; grid-template-columns: minmax(0,1fr) minmax(380px,.85fr); gap: 88px; align-items: center; padding-bottom: 72px; }.partner-hero-copy h1 { margin-top: 18px; font-size: clamp(44px,5.6vw,72px); line-height: 1.05; font-weight: 900; }.partner-hero-copy h1 em { color: var(--orange); font-style: normal; }.partner-summary { max-width: 665px; margin-top: 22px !important; color: var(--muted); font-size: 17px; line-height: 1.85; }.partner-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 31px; }.partner-action { min-height: 47px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 0 18px; border: 1px solid transparent; border-radius: 6px; font-size: 14px; font-weight: 850; transition: transform .2s ease, background .2s ease; }.partner-action:hover { transform: translateY(-2px); }.partner-action--primary { color: #fff; background: var(--orange); box-shadow: 0 14px 30px rgba(239,93,22,.22); }.partner-action--primary:hover { color: #fff; background: #c8480c; }.partner-action--secondary { border-color: #b9cbd5; color: #294354; background: #fff; }.partner-procurement-note { display: flex; align-items: flex-start; gap: 12px; width: min(100%, 610px); margin-top: 20px; padding: 14px 16px; border: 1px solid #f3c4ad; border-left: 4px solid var(--orange); background: #fff7f2; }.partner-procurement-mark { display: grid; flex: 0 0 auto; width: 29px; height: 29px; place-items: center; border-radius: 50%; color: #fff; background: var(--orange); font: 900 15px/1 Consolas,monospace; }.partner-procurement-note strong { display: block; color: #8f3d17; font-size: 14px; line-height: 1.4; }.partner-procurement-note p { margin-top: 4px; color: #6d625d; font-size: 12px; line-height: 1.6; }.partner-disclaimer { display: flex; gap: 8px; max-width: 630px; margin-top: 18px !important; color: #70838e; font-size: 12px; line-height: 1.6; }.partner-disclaimer svg { flex: 0 0 auto; margin-top: 2px; color: var(--blue); }
.partner-console { overflow: hidden; border: 1px solid #c6d6df; border-radius: 8px; background: #fff; box-shadow: 0 28px 68px rgba(29,70,94,.14); }.partner-console > header { display: flex; align-items: center; justify-content: space-between; min-height: 54px; padding: 0 18px; border-bottom: 1px solid var(--line); color: #385363; font-size: 12px; font-weight: 800; }.partner-console > header span,.partner-console > header i { display: inline-flex; align-items: center; gap: 7px; }.partner-console > header i { color: #268757; font: 800 10px/1 Consolas,monospace; font-style: normal; }.partner-console > header i b { width: 7px; height: 7px; border-radius: 50%; background: #31ae70; box-shadow: 0 0 0 4px rgba(49,174,112,.13); }.partner-console-body { display: grid; grid-template-columns: 153px minmax(0,1fr); gap: 14px; padding: 19px; }.console-orbit { position: relative; align-self: center; width: 143px; height: 143px; border: 1px solid #bcd6e6; border-radius: 50%; background: radial-gradient(circle,#edf7fc 0 31%,transparent 32%); }.console-orbit::after { position: absolute; top: 17px; right: 17px; bottom: 17px; left: 17px; border: 1px dashed #97c5df; border-radius: 50%; content: ''; }.orbit-core { position: absolute; z-index: 2; top: 50%; left: 50%; display: grid; width: 48px; height: 48px; place-items: center; border-radius: 50%; color: #fff; background: #1377bb; font: 900 15px/1 Consolas,monospace; transform: translate(-50%,-50%); box-shadow: 0 0 0 8px rgba(19,119,187,.1); }.orbit-node { position: absolute; z-index: 3; display: grid; width: 33px; height: 33px; place-items: center; border: 1px solid #fad0bd; border-radius: 6px; color: #de5715; background: #fff5ef; }.orbit-node--cloud { top: 4px; left: 53px; }.orbit-node--app { right: 0; bottom: 20px; }.orbit-node--data { bottom: 2px; left: 11px; }.console-flow { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }.console-flow li { display: grid; grid-template-columns: 24px minmax(0,1fr) 18px; gap: 7px; align-items: center; min-height: 55px; padding: 8px; border: 1px solid #e0e9ed; border-radius: 6px; }.console-flow li > span { color: #e25a17; font: 850 10px/1 Consolas,monospace; }.console-flow strong,.console-flow small { display: block; }.console-flow strong { font-size: 12px; }.console-flow small { margin-top: 3px; color: #778994; font-size: 10px; }.console-flow svg { color: #299162; }.partner-console footer { display: grid; gap: 5px; padding: 16px 19px; color: #fff; background: #163244; }.partner-console footer span { color: #a6bdcb; font: 800 10px/1 Consolas,monospace; }.partner-console footer strong { font-size: 16px; }.partner-proof { position: relative; width: min(1180px, calc(100% - 48px)); min-height: 67px; margin: 0 auto; display: grid; grid-template-columns: repeat(3,1fr); border-top: 1px solid var(--line); }.partner-proof span { display: flex; align-items: center; gap: 9px; padding: 0 20px; border-right: 1px solid var(--line); color: #465f6e; font-size: 13px; font-weight: 750; }.partner-proof span:first-child { padding-left: 0; }.partner-proof span:last-child { border-right: 0; }.partner-proof svg { color: var(--orange); }
.partner-section { padding: 104px 0; }.partner-context { background: #fff; }.partner-context-grid { display: grid; grid-template-columns: minmax(0,.95fr) minmax(320px,.75fr); gap: 115px; }.partner-intro h2,.partner-section-heading h2,.partner-contact h2 { margin-top: 13px; font-size: clamp(31px,4vw,47px); line-height: 1.16; font-weight: 900; }.partner-context-copy { display: grid; gap: 19px; padding-top: 28px; color: var(--muted); font-size: 16px; line-height: 1.82; }
.partner-capabilities { background: #eef5f8; }.partner-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 52px; }.partner-section-heading > p { max-width: 430px; color: var(--muted); font-size: 15px; line-height: 1.75; }.partner-capability-list { margin-top: 48px; border-top: 1px solid #aabec8; }.partner-capability-list article { display: grid; grid-template-columns: 47px 52px minmax(0,1fr) minmax(230px,.62fr); gap: 17px; align-items: center; min-height: 180px; border-bottom: 1px solid #c6d4da; }.capability-num { align-self: start; padding-top: 37px; color: var(--orange); font: 850 11px/1 Consolas,monospace; }.partner-capability-list article > svg { display: grid; width: 48px; height: 48px; padding: 12px; border: 1px solid #b8ced8; border-radius: 7px; color: #1675b9; background: #fff; }.partner-capability-list h3 { font-size: 22px; }.partner-capability-list p { max-width: 570px; margin-top: 9px; color: var(--muted); font-size: 14px; line-height: 1.72; }.partner-capability-list ul { display: grid; gap: 9px; margin: 0; padding: 15px 17px; border-left: 3px solid var(--orange); list-style: none; color: #46606c; background: rgba(255,255,255,.6); font-size: 12px; line-height: 1.45; }.partner-capability-list li { display: flex; gap: 7px; align-items: flex-start; }.partner-capability-list li svg { flex: 0 0 auto; color: #278c5a; }
.partner-scenarios { background: #fff; }.partner-scenario-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 43px; }.partner-scenario-grid article { min-height: 248px; padding: 25px; border: 1px solid #d6e1e6; border-radius: 7px; background: #fff; transition: transform .2s ease, box-shadow .2s ease; }.partner-scenario-grid article:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(32,77,103,.1); }.partner-scenario-grid svg { color: var(--orange); }.partner-scenario-grid span { display: block; margin-top: 30px; color: #27759f; font: 800 11px/1 Consolas,monospace; }.partner-scenario-grid h3 { margin-top: 8px; font-size: 21px; }.partner-scenario-grid p { margin-top: 11px; color: var(--muted); font-size: 14px; line-height: 1.72; }
.partner-process { background: #173547; color: #fff; }.partner-process .partner-eyebrow { color: #ffb187; }.partner-process .partner-eyebrow span { background: #ff8751; }.partner-process-layout { display: grid; grid-template-columns: minmax(250px,.72fr) minmax(0,1.28fr); gap: 100px; }.partner-process .partner-intro > p:last-child { max-width: 340px; margin-top: 19px; color: #afc4cf; font-size: 15px; line-height: 1.75; }.partner-process ol { margin: 0; padding: 0; border-top: 1px solid rgba(204,226,236,.34); list-style: none; }.partner-process li { display: grid; grid-template-columns: 55px minmax(0,1fr) auto; gap: 18px; align-items: center; min-height: 104px; border-bottom: 1px solid rgba(204,226,236,.24); }.partner-process li > span { color: #ff8350; font: 850 12px/1 Consolas,monospace; }.partner-process h3 { font-size: 19px; }.partner-process li p { margin-top: 8px; color: #afc4cf; font-size: 13px; line-height: 1.6; }.partner-process li strong { padding: 7px 8px; border: 1px solid rgba(255,255,255,.22); border-radius: 5px; color: #d9e8ee; font-size: 11px; white-space: nowrap; }
.partner-contact { padding: 104px 0; background: #fff3eb; }.partner-contact-grid { display: grid; grid-template-columns: minmax(0,1fr) 286px; gap: 86px; align-items: center; }.partner-contact-grid > div > p:not(.partner-eyebrow) { max-width: 710px; margin-top: 19px; color: #596e79; font-size: 16px; line-height: 1.82; }.partner-contact ul { display: grid; gap: 10px; margin: 24px 0 0; padding: 0; list-style: none; color: #3e5967; font-size: 14px; }.partner-contact li { display: flex; align-items: center; gap: 8px; }.partner-contact li svg { color: #238b5b; }.partner-contact aside { display: grid; justify-items: center; padding: 18px; border: 1px solid #f0c9b5; border-radius: 7px; background: #fff; box-shadow: 0 18px 42px rgba(122,67,39,.1); text-align: center; }.partner-contact aside > div { display: flex; align-items: center; gap: 8px; color: #b84815; font-size: 14px; }.partner-contact aside img { width: min(100%, 200px); margin-top: 15px; border: 1px solid #e1e7ea; border-radius: 5px; }.partner-contact aside p { margin-top: 12px; color: #687b85; font-size: 12px; line-height: 1.55; }.partner-modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: rgba(15,35,48,.54); backdrop-filter: blur(8px); }.partner-modal > div { width: min(100%,390px); padding: 20px; border-radius: 8px; background: #fff; box-shadow: 0 28px 82px rgba(15,35,48,.3); text-align: center; }.partner-modal header { display: flex; justify-content: space-between; align-items: center; text-align: left; }.partner-modal button { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid #d3e0e6; border-radius: 5px; color: #597080; background: #fff; font-size: 22px; cursor: pointer; }.partner-modal img { width: min(100%,250px); margin: 18px auto 0; border: 1px solid #d3e0e6; border-radius: 5px; }.partner-modal p { margin-top: 12px; color: var(--muted); font-size: 13px; }
@media (max-width:1020px) { .partner-hero-grid,.partner-context-grid,.partner-process-layout { grid-template-columns: 1fr; gap: 44px; }.partner-hero-copy { max-width: 770px; }.partner-console { width: min(100%,560px); justify-self: center; }.partner-context-copy { padding-top: 0; }.partner-capability-list article { grid-template-columns: 42px 52px minmax(0,1fr); padding: 23px 0; }.partner-capability-list ul { grid-column: 3; max-width: 480px; }.capability-num { padding-top: 19px; }.partner-contact-grid { grid-template-columns: 1fr 270px; gap: 45px; } }
@media (max-width:720px) { .partner-shell,.partner-hero-grid,.partner-proof { width: min(100% - 32px,1180px); }.partner-hero { padding-top: 43px; }.partner-hero-grid { padding-bottom: 48px; }.partner-hero-copy h1 { font-size: clamp(41px,12vw,58px); }.partner-summary { font-size: 16px; }.partner-console-body { grid-template-columns: 1fr; }.console-orbit { display: none; }.partner-proof { grid-template-columns: 1fr; padding: 14px 0; }.partner-proof span,.partner-proof span:first-child { min-height: 36px; padding: 0; border: 0; }.partner-section,.partner-contact { padding: 68px 0; }.partner-section-heading { display: grid; gap: 18px; }.partner-section-heading > p { max-width: 610px; }.partner-scenario-grid { grid-template-columns: 1fr; gap: 11px; margin-top: 31px; }.partner-scenario-grid article { min-height: 0; }.partner-capability-list { margin-top: 32px; }.partner-capability-list article { grid-template-columns: 38px 44px minmax(0,1fr); gap: 11px; }.partner-capability-list article > svg { width: 42px; height: 42px; padding: 10px; }.partner-capability-list h3 { font-size: 18px; }.partner-capability-list ul { grid-column: 1 / -1; margin-left: 49px; }.partner-process li { grid-template-columns: 36px minmax(0,1fr); gap: 11px; padding: 18px 0; }.partner-process li strong { grid-column: 2; justify-self: start; }.partner-contact-grid { grid-template-columns: 1fr; gap: 32px; }.partner-contact aside { width: min(100%,286px); justify-self: start; } }
</style>
