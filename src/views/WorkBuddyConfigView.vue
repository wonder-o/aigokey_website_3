<template>
  <div class="workbuddy-page">
    <SiteHeader @trial="showSupport = true" />

    <main id="top">
      <section class="workbuddy-hero">
        <div class="hero-copy-block">
          <p class="eyebrow">{{ page.hero.eyebrow }}</p>
          <h1>{{ page.hero.title }}</h1>
          <p class="hero-copy">{{ page.hero.copy }}</p>
          <div class="hero-tags" aria-label="Tutorial scope">
            <span v-for="(tag, index) in page.hero.tags" :key="tag">
              <component :is="heroTagIcons[index]" :size="15" aria-hidden="true" />
              {{ tag }}
            </span>
          </div>
        </div>

        <aside class="connection-card" aria-label="AIGOKEY connection summary">
          <div class="connection-brand">
            <img src="/assets/brand-logos/workbuddy.svg" alt="" />
            <div><strong>WorkBuddy</strong><span>Custom model</span></div>
            <span class="ready-state"><i aria-hidden="true"></i> READY</span>
          </div>
          <div class="connection-flow" aria-hidden="true">
            <span>WorkBuddy</span><ArrowRight :size="17" /><span>AIGOKEY</span><ArrowRight :size="17" /><span>Model</span>
          </div>
          <dl>
            <div><dt>Provider</dt><dd>Custom</dd></div>
            <div><dt>Protocol</dt><dd>OpenAI</dd></div>
            <div class="connection-wide"><dt>Endpoint</dt><dd>https://llm.aigokey.cn/v1/chat/completions</dd></div>
          </dl>
          <p>{{ page.hero.note }}</p>
        </aside>
      </section>

      <nav class="jumpbar" :aria-label="page.quickJump">
        <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
          <span>{{ item.label.slice(0, 2) }}</span>{{ item.label.slice(3) }}
        </a>
      </nav>

      <div class="tutorial-layout">
        <aside class="side-index">
          <p class="side-label">{{ page.quickJump }}</p>
          <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
            {{ item.label }}<ChevronRight :size="14" aria-hidden="true" />
          </a>
          <a class="back-top" href="#top" @click.prevent="scrollToSection('top')">{{ page.backTop }}</a>
        </aside>

        <article class="guide">
          <section id="prepare" class="guide-section">
            <SectionHeading number="01" :title="page.prepare.head" />
            <p class="lead">{{ page.prepare.lead }}</p>
            <div class="parameter-table" role="table" :aria-label="page.prepare.head">
              <div v-for="row in page.prepare.rows" :key="row.label" class="parameter-row" role="row">
                <span class="parameter-label" role="cell">{{ row.label }}</span>
                <code role="cell">{{ row.value }}</code>
                <span class="parameter-note" role="cell">{{ row.note }}</span>
              </div>
            </div>
          </section>

          <section id="settings" class="guide-section">
            <SectionHeading number="02" :title="page.settings.head" />
            <p class="lead">{{ page.settings.lead }}</p>
            <ScreenshotFigure src="/assets/workbuddy-aigokey/001.webp" :alt="page.settings.imageAlt" :caption="page.settings.caption" @open="openImage" />
          </section>

          <section id="models" class="guide-section">
            <SectionHeading number="03" :title="page.models.head" />
            <p class="lead">{{ page.models.lead }}</p>
            <ScreenshotFigure src="/assets/workbuddy-aigokey/002.webp" :alt="page.models.imageAlt" :caption="page.models.caption" @open="openImage" />
          </section>

          <section id="add" class="guide-section">
            <SectionHeading number="04" :title="page.add.head" />
            <p class="lead">{{ page.add.lead }}</p>
            <div class="screenshot-pair">
              <ScreenshotFigure src="/assets/workbuddy-aigokey/003.webp" :alt="page.add.imageAlts[0]" :caption="page.add.captions[0]" @open="openImage" />
              <ScreenshotFigure src="/assets/workbuddy-aigokey/004.webp" :alt="page.add.imageAlts[1]" :caption="page.add.captions[1]" @open="openImage" />
            </div>
          </section>

          <section id="configure" class="guide-section">
            <SectionHeading number="05" :title="page.configure.head" />
            <p class="lead">{{ page.configure.lead }}</p>
            <div class="config-table">
              <div v-for="row in page.configure.rows" :key="row.label" class="config-row">
                <span>{{ row.label }}</span><code>{{ row.value }}</code>
              </div>
            </div>
            <ScreenshotFigure src="/assets/workbuddy-aigokey/005.webp" :alt="page.configure.imageAlt" :caption="page.configure.caption" @open="openImage" />

            <div class="subsection-heading">
              <SlidersHorizontal :size="19" aria-hidden="true" />
              <div><h3>{{ page.configure.advancedTitle }}</h3><p>{{ page.configure.advancedLead }}</p></div>
            </div>
            <div class="capability-grid">
              <div v-for="item in page.configure.advancedItems" :key="item.title">
                <Check :size="15" aria-hidden="true" /><p><strong>{{ item.title }}</strong>{{ item.text }}</p>
              </div>
            </div>
            <div class="info-note info-note--amber">
              <ShieldAlert :size="18" aria-hidden="true" />
              <div><strong>{{ page.configure.noteTitle }}</strong><p>{{ page.configure.note }}</p></div>
            </div>
          </section>

          <section id="test" class="guide-section">
            <SectionHeading number="06" :title="page.test.head" />
            <p class="lead">{{ page.test.lead }}</p>
            <ol class="test-steps">
              <li v-for="step in page.test.steps" :key="step">{{ step }}</li>
            </ol>
            <div class="info-note">
              <Layers3 :size="18" aria-hidden="true" />
              <div><strong>{{ page.test.noteTitle }}</strong><p>{{ page.test.note }}</p></div>
            </div>
          </section>

          <section id="troubleshooting" class="guide-section">
            <SectionHeading number="07" :title="page.troubleshooting.head" />
            <p class="lead">{{ page.troubleshooting.lead }}</p>
            <div class="faq-list">
              <details v-for="(item, index) in page.troubleshooting.items" :key="item.question" :open="index === 0">
                <summary><span>{{ item.question }}</span><ChevronRight :size="17" aria-hidden="true" /></summary>
                <p>{{ item.answer }}</p>
              </details>
            </div>
          </section>

          <section id="security" class="guide-section guide-section--final">
            <SectionHeading number="08" :title="page.security.head" />
            <p class="lead">{{ page.security.lead }}</p>
            <div class="local-path">
              <div><HardDrive :size="18" aria-hidden="true" /><span>{{ page.security.pathLabel }}</span></div>
              <code>{{ page.security.path }}</code>
              <button type="button" :title="page.copy.action" @click="copyText(page.security.path, $event)">
                <Copy :size="15" aria-hidden="true" /><span>{{ page.copy.action }}</span>
              </button>
            </div>
            <p v-for="paragraph in page.security.paragraphs" :key="paragraph" class="security-copy">{{ paragraph }}</p>
            <ul class="checklist">
              <li v-for="item in page.security.checklist" :key="item"><span><Check :size="15" aria-hidden="true" /></span>{{ item }}</li>
            </ul>
            <div class="reference-line">
              <span>{{ page.security.referenceLabel }}</span>
              <a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Model" target="_blank" rel="noopener">
                {{ page.security.referenceText }}<ArrowUpRight :size="15" aria-hidden="true" />
              </a>
            </div>
          </section>
        </article>
      </div>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="activeImage" class="image-lightbox" role="dialog" aria-modal="true" :aria-label="activeImage.alt" @click.self="activeImage = null">
        <button type="button" :aria-label="closeLabel" :title="closeLabel" @click="activeImage = null"><X :size="22" aria-hidden="true" /></button>
        <figure><img :src="activeImage.src" :alt="activeImage.alt" /><figcaption>{{ activeImage.caption }}</figcaption></figure>
      </div>

      <div v-if="showSupport" class="support-modal" @click.self="showSupport = false">
        <div class="support-modal-card">
          <div class="support-modal-head">
            <h2>{{ t.modal.title }}</h2>
            <button type="button" :aria-label="closeLabel" @click="showSupport = false"><X :size="20" aria-hidden="true" /></button>
          </div>
          <div class="support-modal-body"><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Copy, HardDrive, Layers3, Monitor, Settings2, ShieldAlert, SlidersHorizontal, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'

const { lang, t } = useI18n()
const page = computed(() => t.value.workBuddyConfig)
const showSupport = ref(false)
const activeImage = ref<{ src: string; alt: string; caption: string } | null>(null)
const closeLabel = computed(() => lang.value === 'en' ? 'Close' : '关闭')
const heroTagIcons = [Monitor, Settings2, ShieldAlert]

const SectionHeading = defineComponent({
  props: { number: { type: String, required: true }, title: { type: String, required: true } },
  setup(props) {
    return () => h('div', { class: 'section-head' }, [h('span', props.number), h('h2', props.title)])
  },
})

const ScreenshotFigure = defineComponent({
  props: {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    caption: { type: String, required: true },
  },
  emits: ['open'],
  setup(props, { emit }) {
    return () => h('figure', { class: 'screenshot' }, [
      h('button', { type: 'button', title: props.alt, onClick: () => emit('open', { src: props.src, alt: props.alt, caption: props.caption }) }, [
        h('img', { src: props.src, alt: props.alt, loading: 'eager', width: 1920, height: 1160 }),
        h('span', { class: 'zoom-mark', 'aria-hidden': 'true' }, '↗'),
      ]),
      h('figcaption', props.caption),
    ])
  },
})

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.ogDescription },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: 'https://www.aigokey.com/assets/workbuddy-aigokey/005.webp' },
  ],
}))

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function openImage(image: { src: string; alt: string; caption: string }) {
  activeImage.value = image
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    activeImage.value = null
    showSupport.value = false
  }
}

async function copyText(text: string, event: Event) {
  const label = (event.currentTarget as HTMLButtonElement).querySelector('span')
  if (!label) return
  try {
    await navigator.clipboard.writeText(text)
    label.textContent = page.value.copy.success
  } catch {
    label.textContent = page.value.copy.fail
  }
  window.setTimeout(() => { label.textContent = page.value.copy.action }, 1400)
}

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
.workbuddy-page {
  min-height: 100vh;
  color: #183244;
  background: #f4f8fa;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  line-height: 1.72;
}

.workbuddy-page a { color: #12785f; text-underline-offset: 4px; }
.workbuddy-page img { display: block; max-width: 100%; height: auto; }
main { padding-bottom: 88px; }
.workbuddy-hero, .jumpbar, .tutorial-layout { width: min(1240px, calc(100% - 48px)); margin: 0 auto; }

.workbuddy-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(340px, .88fr);
  align-items: end;
  gap: 64px;
  padding: 70px 0 56px;
}
.eyebrow { margin: 0 0 16px; color: #13896b; font-size: 12px; font-weight: 850; letter-spacing: 0; text-transform: uppercase; }
h1 { max-width: 760px; margin: 0; color: #102f46; font-size: 58px; line-height: 1.08; letter-spacing: 0; }
.hero-copy { max-width: 720px; margin: 24px 0 0; color: #536a77; font-size: 18px; line-height: 1.75; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
.hero-tags span { display: inline-flex; align-items: center; gap: 7px; min-height: 31px; padding: 0 10px; border: 1px solid #bfddd4; border-radius: 5px; color: #216d5b; background: #edf8f4; font-size: 12px; font-weight: 750; }

.connection-card { padding: 20px; border: 1px solid #c4ddd6; border-radius: 8px; background: #fff; box-shadow: 0 18px 42px rgba(27, 76, 72, .09); }
.connection-brand { display: flex; align-items: center; gap: 11px; padding-bottom: 16px; border-bottom: 1px solid #dce9e5; }
.connection-brand > img { width: 38px; height: 38px; padding: 6px; border: 1px solid #cce1da; border-radius: 6px; background: #f0faf6; }
.connection-brand div { display: grid; line-height: 1.35; }
.connection-brand strong { color: #173c48; font-size: 14px; }
.connection-brand div span { color: #789087; font-size: 11px; }
.ready-state { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; color: #168063; font-family: Consolas, monospace; font-size: 10px; font-weight: 800; }
.ready-state i { width: 7px; height: 7px; border-radius: 50%; background: #18ad82; box-shadow: 0 0 0 4px rgba(24,173,130,.13); }
.connection-flow { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 7px; padding: 19px 0; color: #668078; }
.connection-flow span { min-width: 0; padding: 7px 5px; border: 1px solid #d5e5e0; border-radius: 4px; color: #286858; background: #f5fbf8; font-size: 11px; font-weight: 800; text-align: center; }
.connection-card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 0; padding: 15px 0; border-top: 1px solid #dce9e5; border-bottom: 1px solid #dce9e5; }
.connection-card dl div { display: grid; gap: 3px; min-width: 0; }
.connection-card .connection-wide { grid-column: 1 / -1; }
.connection-card dt { color: #7c918a; font-size: 10px; font-weight: 750; }
.connection-card dd { margin: 0; overflow-wrap: anywhere; color: #245b4d; font-family: Consolas, monospace; font-size: 11px; font-weight: 700; }
.connection-card > p { margin: 14px 0 0; color: #6b7f78; font-size: 12px; }

.jumpbar { display: flex; gap: 6px; padding: 9px; overflow-x: auto; border: 1px solid #d2e1e3; border-radius: 7px; background: #fff; box-shadow: 0 8px 22px rgba(30, 69, 90, .05); scrollbar-width: none; }
.jumpbar::-webkit-scrollbar { display: none; }
.jumpbar a { display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; min-height: 34px; padding: 0 10px; border-radius: 4px; color: #58707c; font-size: 12px; font-weight: 750; text-decoration: none; }
.jumpbar a span { color: #129474; font-family: Consolas, monospace; font-size: 10px; }
.jumpbar a:hover, .jumpbar a:focus-visible { color: #155e4a; background: #eaf7f2; outline: none; }

.tutorial-layout { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 28px; align-items: start; padding-top: 28px; }
.side-index { position: sticky; top: 102px; display: grid; gap: 2px; padding: 12px 0; }
.side-label { margin: 0 0 10px; color: #84989c; font-size: 10px; font-weight: 850; letter-spacing: 0; text-transform: uppercase; }
.side-index a { display: flex; align-items: center; justify-content: space-between; gap: 5px; min-height: 32px; padding: 0 8px; border-left: 2px solid transparent; color: #607983; font-size: 12px; text-decoration: none; }
.side-index a:hover, .side-index a:focus-visible { border-color: #1ba17c; color: #185e4b; background: #eaf7f2; outline: none; }
.side-index a svg { opacity: 0; }
.side-index a:hover svg, .side-index a:focus-visible svg { opacity: 1; }
.side-index .back-top { margin-top: 13px; border-top: 1px solid #d9e4e5; border-left: 0; color: #13896b; font-size: 11px; }

.guide { min-width: 0; overflow: hidden; border: 1px solid #d4e2e4; border-radius: 8px; background: #fff; box-shadow: 0 14px 34px rgba(27, 68, 87, .05); }
.guide-section { scroll-margin-top: 98px; padding: 42px; border-bottom: 1px solid #dce7e8; }
.guide-section:last-child { border-bottom: 0; }
.guide-section--final { background: #fbfefd; }
.section-head { display: grid; gap: 5px; margin-bottom: 18px; }
.section-head > span { color: #139273; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; letter-spacing: 0; }
.section-head h2 { margin: 0; color: #17384d; font-size: 34px; line-height: 1.2; letter-spacing: 0; }
.lead { max-width: 840px; margin: 0; color: #5a707b; font-size: 16px; }

.parameter-table { display: grid; margin-top: 24px; border-top: 1px solid #d4e2e4; }
.parameter-row { display: grid; grid-template-columns: 145px minmax(240px, .95fr) minmax(220px, 1.05fr); gap: 20px; align-items: center; min-height: 62px; padding: 10px 0; border-bottom: 1px solid #e3ebec; }
.parameter-label { color: #345463; font-size: 13px; font-weight: 850; }
.parameter-row code, .config-row code { overflow-wrap: anywhere; color: #17614e; font-family: Consolas, monospace; font-size: 13px; font-weight: 750; }
.parameter-note { color: #75888d; font-size: 12px; }

.screenshot { margin: 26px 0 0; }
.screenshot button { position: relative; display: block; width: 100%; padding: 0; overflow: hidden; border: 1px solid #ccdadd; border-radius: 6px; background: #edf2f3; cursor: zoom-in; }
.screenshot button:focus-visible { outline: 3px solid rgba(20,151,116,.28); outline-offset: 3px; }
.screenshot img { width: 100%; aspect-ratio: 96 / 58; object-fit: cover; }
.zoom-mark { position: absolute; right: 10px; bottom: 10px; display: grid; width: 32px; height: 32px; place-items: center; border: 1px solid rgba(255,255,255,.75); border-radius: 5px; color: #fff; background: rgba(18,47,61,.74); font-size: 16px; }
.screenshot figcaption { margin-top: 9px; color: #7a8d92; font-size: 12px; }
.screenshot-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.config-table { display: grid; margin-top: 24px; padding: 5px 16px; border: 1px solid #d4e3df; border-radius: 6px; background: #fbfdfc; }
.config-row { display: grid; grid-template-columns: 145px minmax(0, 1fr); gap: 20px; align-items: center; min-height: 49px; border-bottom: 1px solid #e5eeeb; }
.config-row:last-child { border-bottom: 0; }
.config-row > span { color: #47626c; font-size: 13px; font-weight: 750; }
.subsection-heading { display: flex; align-items: flex-start; gap: 12px; margin-top: 32px; padding-top: 28px; border-top: 1px solid #dfe9e8; color: #18856a; }
.subsection-heading h3 { margin: 0; color: #21475a; font-size: 19px; }
.subsection-heading p { margin: 4px 0 0; color: #6c7e83; font-size: 13px; }
.capability-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; margin-top: 20px; }
.capability-grid > div { display: grid; grid-template-columns: 22px 1fr; gap: 7px; color: #1b9675; }
.capability-grid p { margin: 0; color: #64787e; font-size: 13px; }
.capability-grid strong { display: block; margin-bottom: 2px; color: #365763; font-size: 13px; }
.info-note { display: grid; grid-template-columns: 24px 1fr; gap: 11px; margin-top: 24px; padding: 15px 16px; border: 1px solid #c4dfd5; border-radius: 6px; color: #1e765e; background: #eef9f5; }
.info-note--amber { border-color: #ead9b8; color: #8b632c; background: #fff9ed; }
.info-note strong { color: inherit; font-size: 13px; }
.info-note p { margin: 3px 0 0; color: inherit; font-size: 13px; }

.test-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 24px 0 0; padding: 0; list-style: none; counter-reset: test-step; }
.test-steps li { min-width: 0; padding: 15px; border: 1px solid #d9e5e4; border-radius: 6px; color: #526a72; background: #fbfdfc; font-size: 13px; counter-increment: test-step; }
.test-steps li::before { display: grid; width: 28px; height: 28px; margin-bottom: 10px; place-items: center; border-radius: 50%; color: #fff; background: #1aa17c; content: counter(test-step, decimal-leading-zero); font-family: Consolas, monospace; font-size: 10px; font-weight: 850; }
.faq-list { display: grid; gap: 8px; margin-top: 24px; }
.faq-list details { border: 1px solid #d8e4e5; border-radius: 6px; background: #fbfdfd; }
.faq-list details[open] { border-color: #bcdace; background: #f8fdfa; }
.faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 54px; padding: 0 16px; color: #345562; font-size: 14px; font-weight: 800; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary svg { flex: 0 0 auto; color: #6f8990; transition: transform .2s ease; }
.faq-list details[open] summary svg { color: #159274; transform: rotate(90deg); }
.faq-list details p { margin: 0; padding: 0 16px 16px; color: #64777d; font-size: 13px; }

.local-path { display: grid; grid-template-columns: 180px minmax(0, 1fr) auto; align-items: center; gap: 14px; margin-top: 24px; padding: 13px 14px; border: 1px solid #294955; border-radius: 6px; color: #e6f6f0; background: #17343e; }
.local-path > div { display: flex; align-items: center; gap: 8px; color: #acd2c8; font-size: 12px; font-weight: 750; }
.local-path code { overflow-wrap: anywhere; color: #e2f4ee; font-family: Consolas, monospace; font-size: 12px; }
.local-path button { display: inline-flex; align-items: center; gap: 6px; min-height: 32px; padding: 0 10px; border: 1px solid #4e7278; border-radius: 4px; color: #e7f5f1; background: #244952; font: inherit; font-size: 12px; font-weight: 750; cursor: pointer; }
.local-path button:hover, .local-path button:focus-visible { border-color: #84d1ba; outline: none; }
.security-copy { margin: 18px 0 0; color: #5f747a; font-size: 14px; }
.checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 9px 22px; margin: 24px 0 0; padding: 0; list-style: none; }
.checklist li { display: flex; align-items: flex-start; gap: 9px; color: #3d5d59; font-size: 14px; }
.checklist li > span { display: grid; width: 22px; height: 22px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #fff; background: #1ea77f; }
.reference-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-top: 26px; padding-top: 18px; border-top: 1px solid #dce9e4; color: #7a8f8e; font-size: 12px; }
.reference-line a { display: inline-flex; align-items: center; gap: 5px; font-weight: 750; }

.image-lightbox { position: fixed; inset: 0; z-index: 120; display: grid; place-items: center; padding: 56px 24px 24px; background: rgba(11, 28, 36, .86); backdrop-filter: blur(8px); }
.image-lightbox > button { position: fixed; top: 18px; right: 20px; display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(255,255,255,.35); border-radius: 5px; color: #fff; background: rgba(255,255,255,.08); cursor: pointer; }
.image-lightbox figure { max-width: min(1500px, 96vw); max-height: calc(100vh - 80px); margin: 0; }
.image-lightbox img { max-height: calc(100vh - 112px); border-radius: 5px; object-fit: contain; box-shadow: 0 24px 80px rgba(0,0,0,.36); }
.image-lightbox figcaption { margin-top: 8px; color: #d4e5e2; font-size: 12px; text-align: center; }
.support-modal { position: fixed; inset: 0; z-index: 110; display: grid; place-items: center; padding: 24px; background: rgba(18,39,48,.56); backdrop-filter: blur(10px); }
.support-modal-card { width: min(420px, 100%); overflow: hidden; border: 1px solid #d6e2e4; border-radius: 8px; background: #fff; box-shadow: 0 28px 80px rgba(17,27,36,.28); }
.support-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px 20px; border-bottom: 1px solid #e0e8e9; }
.support-modal-head h2 { margin: 0; font-size: 20px; }
.support-modal-head button { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #d6e2e4; border-radius: 5px; color: #4d626d; background: #fff; cursor: pointer; }
.support-modal-body { display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }
.support-modal-body img { width: 100%; max-width: 280px; border: 1px solid #d6e2e4; border-radius: 6px; }
.support-modal-body p { margin: 0; color: #65767d; font-size: 13px; }

@media (max-width: 980px) {
  .workbuddy-hero { grid-template-columns: 1fr; gap: 28px; padding-top: 52px; }
  .connection-card { max-width: 650px; }
  .side-index { display: none; }
  .tutorial-layout { display: block; }
}

@media (max-width: 700px) {
  .workbuddy-hero, .jumpbar, .tutorial-layout { width: min(100% - 24px, 1240px); }
  .workbuddy-hero { padding: 36px 0 38px; }
  h1 { font-size: 39px; }
  .hero-copy { font-size: 16px; }
  .guide-section { padding: 28px 18px; }
  .section-head h2 { font-size: 27px; }
  .parameter-row, .config-row { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .screenshot-pair, .capability-grid, .checklist { grid-template-columns: 1fr; }
  .test-steps { grid-template-columns: 1fr 1fr; }
  .local-path { grid-template-columns: 1fr auto; }
  .local-path > div { grid-column: 1 / -1; }
}

@media (max-width: 460px) {
  h1 { font-size: 34px; }
  .hero-tags { display: grid; }
  .hero-tags span { width: fit-content; }
  .connection-card dl, .test-steps { grid-template-columns: 1fr; }
  .connection-card .connection-wide { grid-column: auto; }
  .connection-flow { gap: 4px; }
  .connection-flow span { font-size: 10px; }
  .local-path { grid-template-columns: 1fr; }
  .local-path button { justify-self: start; }
}

@media (prefers-reduced-motion: reduce) {
  * { scroll-behavior: auto !important; transition: none !important; }
}
</style>
