<template>
  <div class="support-page">
    <SiteHeader @trial="$router.push('/free-trial/')" />

    <main>
      <section class="support-hero">
        <div class="support-shell support-hero-grid">
          <div class="support-copy">
            <nav class="support-breadcrumb" aria-label="Breadcrumb"><router-link to="/">AIGOKEY</router-link><span>/</span><span>{{ t.footerNav.support }}</span></nav>
            <p class="support-eyebrow"><span></span>{{ page.hero.eyebrow }}</p>
            <h1>{{ page.hero.title }}</h1>
            <p class="support-summary">{{ page.hero.summary }}</p>
            <div class="support-actions">
              <router-link class="support-action support-action--primary" to="/">{{ page.hero.primary }} <ArrowRight :size="17" aria-hidden="true" /></router-link>
              <router-link class="support-action support-action--secondary" to="/codex-help/">{{ page.hero.secondary }} <BookOpen :size="16" aria-hidden="true" /></router-link>
            </div>
          </div>

          <aside class="support-qr-panel" :aria-label="page.qr.label">
            <div class="support-qr-head"><MessageCircle :size="21" aria-hidden="true" /><strong>{{ page.qr.label }}</strong></div>
            <div class="support-qr-frame"><img src="/assets/customer-service-qr.png" :alt="page.qr.alt" /></div>
            <p>{{ page.qr.tip }}</p>
            <small>{{ page.qr.note }}</small>
          </aside>
        </div>
      </section>

      <section class="support-topics">
        <div class="support-shell">
          <div class="support-section-heading">
            <div><p class="support-eyebrow"><span></span>{{ page.topics.eyebrow }}</p><h2>{{ page.topics.title }}</h2></div>
            <p>{{ page.topics.description }}</p>
          </div>
          <div class="support-topic-grid">
            <article v-for="(item, index) in page.topics.items" :key="item.title">
              <span class="support-topic-number">0{{ index + 1 }}</span>
              <component :is="[ReceiptText, WandSparkles, Building2][index]" :size="21" aria-hidden="true" />
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="support-note-band">
        <div class="support-shell support-note-grid">
          <div><p class="support-eyebrow"><span></span>AIGOKEY</p><h2>{{ page.note.title }}</h2></div>
          <p>{{ page.note.text }}</p>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, BookOpen, Building2, MessageCircle, ReceiptText, WandSparkles } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const page = computed(() => t.value.supportPage)

useHead(() => ({
  title: page.value.meta.title,
  meta: [{ name: 'description', content: page.value.meta.description }, { property: 'og:title', content: page.value.meta.title }, { property: 'og:description', content: page.value.meta.description }],
}))
</script>

<style scoped>
.support-page { --ink: #132b3b; --muted: #5d7180; --line: #d3e0e6; --orange: #ef5d16; --blue: #1675b9; color: var(--ink); background: #fff; }.support-page :where(h1,h2,h3,p) { margin: 0; }.support-page :where(a) { text-decoration: none; }.support-shell { width: min(1180px, calc(100% - 48px)); margin: 0 auto; }.support-hero { position: relative; overflow: hidden; padding: 78px 0 92px; border-bottom: 1px solid var(--line); background: #fbfdfe; }.support-hero::before { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(22,117,185,.055) 1px, transparent 1px), linear-gradient(90deg,rgba(22,117,185,.055) 1px, transparent 1px); background-size: 52px 52px; mask-image: linear-gradient(180deg,#000,transparent 90%); content: ''; }.support-hero-grid { position: relative; display: grid; grid-template-columns: minmax(0,1fr) minmax(320px,390px); gap: 100px; align-items: center; }.support-breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 22px; color: #6b7f8a; font-size: 12px; font-weight: 750; }.support-breadcrumb a { color: #2c6f96; }.support-breadcrumb a:hover { color: var(--orange); }.support-eyebrow { display: inline-flex; align-items: center; gap: 9px; color: #b94a17; font: 800 12px/1.3 Consolas,monospace; }.support-eyebrow span { width: 9px; height: 9px; background: var(--orange); transform: rotate(45deg); }.support-copy h1 { max-width: 700px; margin-top: 17px; font-size: clamp(42px,5.5vw,70px); line-height: 1.08; font-weight: 900; }.support-summary { max-width: 700px; margin-top: 23px !important; color: var(--muted); font-size: 17px; line-height: 1.85; }.support-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 31px; }.support-action { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 46px; padding: 0 17px; border: 1px solid transparent; border-radius: 6px; font-size: 14px; font-weight: 850; transition: transform .2s ease, background .2s ease; }.support-action:hover { transform: translateY(-2px); }.support-action--primary { color: #fff; background: var(--orange); box-shadow: 0 14px 30px rgba(239,93,22,.2); }.support-action--primary:hover { color: #fff; background: #c8480c; }.support-action--secondary { border-color: #b9cbd5; color: #294354; background: #fff; }.support-qr-panel { padding: 23px; border: 1px solid #c6d6df; border-radius: 8px; background: #fff; box-shadow: 0 24px 58px rgba(29,70,94,.14); text-align: center; }.support-qr-head { display: flex; align-items: center; justify-content: center; gap: 8px; color: #b84815; font-size: 16px; }.support-qr-frame { margin-top: 18px; padding: 15px; border: 1px solid #e0e8ec; background: #f7fafc; }.support-qr-frame img { display: block; width: min(100%, 270px); margin: 0 auto; }.support-qr-panel > p { margin-top: 15px; color: #405b69; font-size: 14px; line-height: 1.6; }.support-qr-panel > small { display: block; margin-top: 8px; color: #738792; font-size: 12px; line-height: 1.55; }.support-topics { padding: 103px 0 112px; background: #eef5f8; }.support-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 48px; }.support-section-heading h2 { margin-top: 13px; font-size: clamp(31px,4vw,47px); line-height: 1.16; font-weight: 900; }.support-section-heading > p { max-width: 440px; color: var(--muted); font-size: 15px; line-height: 1.75; }.support-topic-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-top: 46px; }.support-topic-grid article { min-height: 230px; padding: 24px; border: 1px solid #cbd9df; border-radius: 7px; background: #fff; transition: transform .2s ease, box-shadow .2s ease; }.support-topic-grid article:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(32,77,103,.1); }.support-topic-number { display: block; color: var(--orange); font: 850 11px/1 Consolas,monospace; }.support-topic-grid article > svg { margin-top: 24px; color: var(--blue); }.support-topic-grid h3 { margin-top: 16px; font-size: 21px; }.support-topic-grid article > p { margin-top: 10px; color: var(--muted); font-size: 14px; line-height: 1.72; }.support-note-band { padding: 70px 0; color: #fff; background: #173547; }.support-note-grid { display: grid; grid-template-columns: minmax(260px,.72fr) minmax(0,1.28fr); gap: 100px; align-items: center; }.support-note-band .support-eyebrow { color: #ffb187; }.support-note-band .support-eyebrow span { background: #ff8751; }.support-note-band h2 { margin-top: 13px; font-size: clamp(29px,3.8vw,43px); line-height: 1.15; }.support-note-grid > p { color: #afc4cf; font-size: 16px; line-height: 1.8; }
@media (max-width: 900px) { .support-hero-grid { grid-template-columns: 1fr; gap: 42px; }.support-copy { max-width: 760px; }.support-qr-panel { width: min(100%, 390px); justify-self: center; }.support-note-grid { grid-template-columns: 1fr; gap: 25px; } }
@media (max-width: 720px) { .support-shell { width: min(100% - 32px, 1180px); }.support-hero { padding: 45px 0 65px; }.support-copy h1 { font-size: clamp(40px,12vw,58px); }.support-summary { font-size: 16px; }.support-actions { margin-top: 25px; }.support-action { width: 100%; }.support-topics { padding: 68px 0 76px; }.support-section-heading { display: grid; gap: 18px; }.support-topic-grid { grid-template-columns: 1fr; gap: 11px; margin-top: 31px; }.support-topic-grid article { min-height: 0; }.support-note-band { padding: 61px 0; }.support-note-grid > p { font-size: 15px; } }
</style>
