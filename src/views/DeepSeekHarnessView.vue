<template>
  <div class="harness-page">
    <SiteHeader @trial="showModal = true" />

    <main id="top">
      <section class="harness-hero">
        <div class="hero-main">
          <p class="eyebrow">{{ page.hero.eyebrow }}</p>
          <h1>{{ page.hero.title }}</h1>
          <p class="hero-copy">{{ page.hero.copy }}</p>
          <div class="hero-tags" aria-label="Configuration scope">
            <span><Settings2 :size="15" aria-hidden="true" /> Web UI</span>
            <span><ShieldCheck :size="15" aria-hidden="true" /> Custom provider</span>
            <span><Terminal :size="15" aria-hidden="true" /> OpenAI protocol</span>
          </div>
        </div>

        <aside class="hero-snapshot" aria-label="AIGOKEY provider snapshot">
          <div class="snapshot-heading">
            <span class="status-dot" aria-hidden="true"></span>
            <span>AIGOKEY / provider</span>
            <span class="snapshot-state">READY</span>
          </div>
          <div class="snapshot-grid">
            <div>
              <span>Provider ID</span>
              <code>aigokey</code>
            </div>
            <div>
              <span>Protocol</span>
              <code>openai-responses</code>
            </div>
            <div class="snapshot-wide">
              <span>Base URL</span>
              <code>https://llm.aigokey.cn/v1</code>
            </div>
          </div>
          <p class="snapshot-note">{{ page.hero.note }}</p>
        </aside>
      </section>

      <nav class="jumpbar" :aria-label="page.quickJump">
        <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
          <span>{{ item.label.slice(0, 2) }}</span>{{ item.label.slice(3) }}
        </a>
      </nav>

      <div class="harness-layout">
        <aside class="side-index">
          <p class="side-label">{{ page.quickJump }}</p>
          <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">
            {{ item.label }}
            <ChevronRight :size="14" aria-hidden="true" />
          </a>
          <a class="back-top" href="#top" @click.prevent="scrollToSection('top')">Back to top</a>
        </aside>

        <article class="guide">
          <section id="prepare" class="guide-section">
            <div class="section-head">
              <span class="section-kicker">01</span>
              <h2>{{ page.prepare.head }}</h2>
            </div>
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
            <div class="section-head">
              <span class="section-kicker">02</span>
              <h2>{{ page.settings.head }}</h2>
            </div>
            <p class="lead">{{ page.settings.lead }}</p>
            <ol class="steps">
              <li v-for="step in page.settings.steps" :key="step">{{ step }}</li>
            </ol>
            <div class="info-note">
              <div class="info-note-icon"><Wrench :size="17" aria-hidden="true" /></div>
              <div><strong>{{ page.settings.noteTitle }}</strong><p>{{ page.settings.note }}</p></div>
            </div>
          </section>

          <section id="provider" class="guide-section">
            <div class="section-head">
              <span class="section-kicker">03</span>
              <h2>{{ page.provider.head }}</h2>
            </div>
            <p class="lead">{{ page.provider.lead }}</p>
            <div class="provider-panel">
              <div v-for="row in page.provider.rows" :key="row.label" class="provider-row">
                <span>{{ row.label }}</span>
                <code>{{ row.value }}</code>
              </div>
            </div>
            <div class="info-note info-note--green">
              <div class="info-note-icon"><ShieldCheck :size="17" aria-hidden="true" /></div>
              <div><strong>{{ page.provider.noteTitle }}</strong><p>{{ page.provider.note }}</p></div>
            </div>
          </section>

          <section id="models" class="guide-section">
            <div class="section-head">
              <span class="section-kicker">04</span>
              <h2>{{ page.models.head }}</h2>
            </div>
            <p class="lead">{{ page.models.lead }}</p>
            <div class="method-grid">
              <div class="method-panel method-panel--primary">
                <div class="method-top"><span class="method-index">A</span><h3>{{ page.models.autoTitle }}</h3></div>
                <ol class="compact-steps">
                  <li v-for="step in page.models.autoSteps" :key="step">{{ step }}</li>
                </ol>
              </div>
              <div class="method-panel">
                <div class="method-top"><span class="method-index">B</span><h3>{{ page.models.manualTitle }}</h3></div>
                <ol class="compact-steps">
                  <li v-for="step in page.models.manualSteps" :key="step">{{ step }}</li>
                </ol>
              </div>
            </div>
            <div class="warning-note">
              <strong>{{ page.models.cautionTitle }}</strong>
              <p>{{ page.models.caution }}</p>
            </div>
          </section>

          <section id="test" class="guide-section">
            <div class="section-head">
              <span class="section-kicker">05</span>
              <h2>{{ page.test.head }}</h2>
            </div>
            <p class="lead">{{ page.test.lead }}</p>
            <ol class="steps steps--test">
              <li v-for="step in page.test.steps" :key="step">{{ step }}</li>
            </ol>
            <div class="info-note info-note--amber">
              <div class="info-note-icon"><Terminal :size="17" aria-hidden="true" /></div>
              <div><strong>{{ page.test.noteTitle }}</strong><p>{{ page.test.note }}</p></div>
            </div>
          </section>

          <section id="troubleshooting" class="guide-section">
            <div class="section-head">
              <span class="section-kicker">06</span>
              <h2>{{ page.troubleshooting.head }}</h2>
            </div>
            <p class="lead">{{ page.troubleshooting.lead }}</p>
            <div class="faq-list">
              <details v-for="(item, index) in page.troubleshooting.items" :key="item.question" :open="index === 0">
                <summary><span>{{ item.question }}</span><ChevronRight :size="17" aria-hidden="true" /></summary>
                <p>{{ item.answer }}</p>
              </details>
            </div>
            <div class="compat-block">
              <div class="compat-heading">
                <div><h3>{{ page.troubleshooting.compatTitle }}</h3><p>{{ page.troubleshooting.compatLead }}</p></div>
                <button type="button" @click="copyText(compatConfig, $event)"><Copy :size="15" aria-hidden="true" />{{ page.copy.action }}</button>
              </div>
              <pre><code>{{ compatConfig }}</code></pre>
            </div>
          </section>

          <section id="checklist" class="guide-section guide-section--checklist">
            <div class="section-head">
              <span class="section-kicker">07</span>
              <h2>{{ page.checklist.head }}</h2>
            </div>
            <p class="lead">{{ page.checklist.lead }}</p>
            <ul class="checklist">
              <li v-for="item in page.checklist.items" :key="item"><span aria-hidden="true"><Check :size="15" /></span>{{ item }}</li>
            </ul>
            <div class="reference-line">
              <span>{{ page.reference.label }}</span>
              <a href="https://deepseek-harness.github.io/deepseek-harness/guide/providers" target="_blank" rel="noopener">
                {{ page.reference.text }} <ArrowUpRight :size="15" aria-hidden="true" />
              </a>
            </div>
          </section>
        </article>
      </div>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="showModal" class="support-modal" @click.self="showModal = false">
        <div class="support-modal-card">
          <div class="support-modal-head">
            <h2>{{ t.modal.title }}</h2>
            <button type="button" aria-label="Close" @click="showModal = false">×</button>
          </div>
          <div class="support-modal-body">
            <img src="/assets/customer-service-qr.png" alt="QR" />
            <p>{{ t.modal.text }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowUpRight, Check, ChevronRight, Copy, Settings2, ShieldCheck, Terminal, Wrench } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const page = computed(() => t.value.deepseekHarness)
const showModal = ref(false)

const compatConfig = `llm-pi-ai:
  providers:
    aigokey:
      apiKeyEnv: AIGOKEY_API_KEY
      api: openai-completions
      baseURL: https://llm.aigokey.cn/v1
      compat:
        supportsDeveloperRole: false
        maxTokensField: max_tokens
      models:
        - id: your-model-id`

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.ogDescription },
    { property: 'og:type', content: 'article' },
  ],
}))

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function copyText(text: string, event: Event) {
  const button = event.currentTarget as HTMLButtonElement
  const original = button.textContent
  try {
    await navigator.clipboard.writeText(text)
    button.lastChild!.textContent = page.value.copy.success
  } catch {
    button.lastChild!.textContent = page.value.copy.fail
  }
  window.setTimeout(() => { button.lastChild!.textContent = original }, 1400)
}
</script>

<style scoped>
.harness-page {
  min-height: 100vh;
  color: #183244;
  background: #f5f8fa;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  line-height: 1.72;
}

.harness-page a { color: #16745a; text-underline-offset: 4px; }
.harness-page img { display: block; max-width: 100%; height: auto; }

main { padding: 0 0 88px; }
.harness-hero,
.jumpbar,
.harness-layout { width: min(1240px, calc(100% - 48px)); margin: 0 auto; }

.harness-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, .8fr);
  align-items: end;
  gap: 70px;
  padding: 76px 0 60px;
}

.eyebrow { margin: 0 0 16px; color: #1a8d67; font-size: 12px; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
h1 { max-width: 780px; margin: 0; color: #123048; font-size: clamp(38px, 5.3vw, 72px); line-height: 1.08; letter-spacing: -.02em; }
.hero-copy { max-width: 720px; margin: 24px 0 0; color: #536875; font-size: 18px; line-height: 1.75; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
.hero-tags span { display: inline-flex; align-items: center; gap: 7px; min-height: 30px; padding: 0 10px; border: 1px solid #c7ddd5; border-radius: 5px; color: #226e59; background: #edf7f3; font-size: 12px; font-weight: 750; }

.hero-snapshot { padding: 20px; border: 1px solid #c7ddd5; border-radius: 8px; background: #ffffff; box-shadow: 0 18px 42px rgba(37, 83, 79, .08); }
.snapshot-heading { display: flex; align-items: center; gap: 8px; padding-bottom: 16px; border-bottom: 1px solid #e1ebe8; color: #547269; font-size: 12px; font-weight: 850; letter-spacing: .06em; text-transform: uppercase; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #27a877; box-shadow: 0 0 0 4px rgba(39,168,119,.13); }
.snapshot-state { margin-left: auto; color: #1d9568; font-size: 10px; letter-spacing: .12em; }
.snapshot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 20px 0 16px; }
.snapshot-grid div { display: grid; gap: 4px; min-width: 0; }
.snapshot-grid .snapshot-wide { grid-column: 1 / -1; }
.snapshot-grid span { color: #789087; font-size: 11px; font-weight: 750; }
.snapshot-grid code { overflow-wrap: anywhere; color: #1b4e40; font-family: Consolas, "SFMono-Regular", Menlo, monospace; font-size: 12px; font-weight: 700; }
.snapshot-note { margin: 0; padding-top: 14px; border-top: 1px solid #e1ebe8; color: #6a7e77; font-size: 12px; }

.jumpbar { display: flex; gap: 6px; padding: 9px; overflow-x: auto; border: 1px solid #d6e2e4; border-radius: 7px; background: #ffffff; box-shadow: 0 8px 22px rgba(30, 69, 90, .05); scrollbar-width: none; }
.jumpbar::-webkit-scrollbar { display: none; }
.jumpbar a { display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; min-height: 34px; padding: 0 10px; border-radius: 4px; color: #58707c; font-size: 12px; font-weight: 750; text-decoration: none; transition: color .2s ease, background .2s ease; }
.jumpbar a span { color: #1b9870; font-family: Consolas, monospace; font-size: 10px; }
.jumpbar a:hover { color: #155e4a; background: #edf7f3; }

.harness-layout { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 28px; align-items: start; padding-top: 28px; }
.side-index { position: sticky; top: 102px; display: grid; gap: 2px; padding: 12px 0; }
.side-label { margin: 0 0 10px; color: #8a9ca0; font-size: 10px; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
.side-index a { display: flex; align-items: center; justify-content: space-between; gap: 5px; min-height: 32px; padding: 0 8px; border-left: 2px solid transparent; color: #637a83; font-size: 12px; text-decoration: none; transition: color .2s ease, border-color .2s ease, background .2s ease; }
.side-index a:hover { border-color: #25a276; color: #185e4b; background: #edf7f3; }
.side-index a svg { opacity: 0; transition: opacity .2s ease, transform .2s ease; }
.side-index a:hover svg { opacity: 1; transform: translateX(2px); }
.side-index .back-top { margin-top: 13px; border-top: 1px solid #d9e4e5; border-left: 0; color: #1a8d67; font-size: 11px; }

.guide { display: grid; gap: 18px; min-width: 0; }
.guide-section { scroll-margin-top: 98px; padding: clamp(24px, 3.2vw, 42px); border: 1px solid #d6e2e4; border-radius: 8px; background: #ffffff; box-shadow: 0 12px 30px rgba(29, 68, 87, .045); }
.guide-section--checklist { border-color: #bcdace; background: #fbfefd; }
.section-head { display: grid; gap: 5px; margin-bottom: 18px; }
.section-kicker { color: #1b9870; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; letter-spacing: .08em; }
.section-head h2 { margin: 0; color: #17384d; font-size: clamp(25px, 3vw, 38px); line-height: 1.2; letter-spacing: -.015em; }
.lead { max-width: 830px; margin: 0; color: #5c707a; font-size: 16px; }

.parameter-table { display: grid; margin-top: 24px; border-top: 1px solid #d6e3e4; }
.parameter-row { display: grid; grid-template-columns: 150px minmax(165px, .8fr) minmax(180px, 1.2fr); gap: 20px; align-items: center; min-height: 60px; padding: 10px 0; border-bottom: 1px solid #e4ecec; }
.parameter-label { color: #345363; font-size: 13px; font-weight: 850; }
.parameter-row code, .provider-row code { overflow-wrap: anywhere; color: #1a5e4c; font-family: Consolas, "SFMono-Regular", Menlo, monospace; font-size: 13px; font-weight: 750; }
.parameter-note { color: #75878b; font-size: 12px; }

.steps { display: grid; gap: 12px; margin: 24px 0 0; padding: 0; list-style: none; counter-reset: step; }
.steps li { position: relative; display: grid; grid-template-columns: 30px 1fr; gap: 12px; align-items: start; color: #3f5966; font-size: 15px; counter-increment: step; }
.steps li::before { display: grid; width: 28px; height: 28px; place-items: center; border: 1px solid #b9d6cc; border-radius: 50%; color: #16815e; background: #f0f9f5; content: counter(step, decimal-leading-zero); font-family: Consolas, monospace; font-size: 10px; font-weight: 850; }
.info-note, .warning-note { display: grid; grid-template-columns: 32px 1fr; gap: 11px; margin-top: 24px; padding: 14px 16px; border: 1px solid #cbdde7; border-radius: 6px; color: #365c70; background: #f1f8fc; }
.info-note--green { border-color: #c5e1d5; color: #24644f; background: #f1faf6; }
.info-note--amber { border-color: #ead9b9; color: #7c5c2c; background: #fff9ed; }
.info-note-icon { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; color: inherit; background: rgba(255,255,255,.75); }
.info-note strong, .warning-note strong { font-size: 13px; }
.info-note p, .warning-note p { margin: 3px 0 0; color: inherit; font-size: 13px; }

.provider-panel { display: grid; margin-top: 24px; padding: 5px 16px; border: 1px solid #d5e3e2; border-radius: 6px; background: #fbfdfd; }
.provider-row { display: grid; grid-template-columns: 150px minmax(0, 1fr); gap: 20px; align-items: center; min-height: 48px; border-bottom: 1px solid #e7eeee; }
.provider-row:last-child { border-bottom: 0; }
.provider-row > span { color: #49636b; font-size: 13px; font-weight: 750; }

.method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }
.method-panel { padding: 18px; border: 1px solid #d8e4e5; border-radius: 6px; background: #fbfcfc; }
.method-panel--primary { border-color: #b8dccc; background: #f5fbf8; }
.method-top { display: flex; align-items: flex-start; gap: 10px; }
.method-index { display: grid; width: 26px; height: 26px; flex: 0 0 auto; place-items: center; border-radius: 4px; color: #ffffff; background: #1b9870; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; }
.method-panel:not(.method-panel--primary) .method-index { color: #516872; background: #e7eeee; }
.method-top h3 { margin: 1px 0 0; color: #24485b; font-size: 16px; line-height: 1.35; }
.compact-steps { display: grid; gap: 9px; margin: 16px 0 0; padding: 0 0 0 20px; color: #526a72; font-size: 13px; }
.compact-steps li::marker { color: #1b9870; font-family: Consolas, monospace; font-weight: 850; }
.warning-note { grid-template-columns: 1fr; border-color: #eddab8; color: #805c28; background: #fff9ed; }

.steps--test { grid-template-columns: repeat(4, 1fr); gap: 10px; }
.steps--test li { grid-template-columns: 1fr; gap: 10px; padding: 14px; border: 1px solid #d8e5e5; border-radius: 6px; color: #4d6670; background: #fbfdfd; font-size: 13px; }
.steps--test li::before { width: 28px; height: 28px; }

.faq-list { display: grid; gap: 8px; margin-top: 24px; }
.faq-list details { border: 1px solid #d9e4e5; border-radius: 6px; background: #fbfdfd; }
.faq-list details[open] { border-color: #bcdace; background: #f9fdfb; }
.faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 52px; padding: 0 16px; color: #345562; font-size: 14px; font-weight: 800; cursor: pointer; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list summary svg { flex: 0 0 auto; color: #6f8990; transition: transform .2s ease; }
.faq-list details[open] summary svg { transform: rotate(90deg); color: #1b9870; }
.faq-list details p { margin: 0; padding: 0 16px 16px; color: #64777d; font-size: 13px; }
.compat-block { margin-top: 24px; overflow: hidden; border: 1px solid #274653; border-radius: 7px; background: #152c36; }
.compat-heading { display: flex; justify-content: space-between; gap: 18px; align-items: flex-start; padding: 18px 18px 14px; border-bottom: 1px solid #2a4a56; }
.compat-heading h3 { margin: 0; color: #edf9f4; font-size: 15px; }
.compat-heading p { max-width: 650px; margin: 4px 0 0; color: #a9c6c3; font-size: 12px; }
.compat-heading button { display: inline-flex; align-items: center; gap: 6px; flex: 0 0 auto; min-height: 32px; padding: 0 10px; border: 1px solid #486c72; border-radius: 4px; color: #e4f4ef; background: #21424d; font: inherit; font-size: 12px; font-weight: 750; cursor: pointer; }
.compat-heading button:hover { border-color: #8dd6ba; color: #ffffff; background: #285967; }
.compat-block pre { margin: 0; padding: 18px; overflow-x: auto; }
.compat-block code { color: #d7eee7; font-family: Consolas, "SFMono-Regular", Menlo, monospace; font-size: 12px; line-height: 1.75; white-space: pre; }

.checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 9px 22px; margin: 24px 0 0; padding: 0; list-style: none; }
.checklist li { display: flex; align-items: flex-start; gap: 9px; color: #3d5d59; font-size: 14px; }
.checklist li > span { display: grid; width: 22px; height: 22px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #ffffff; background: #27a877; }
.reference-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-top: 26px; padding-top: 18px; border-top: 1px solid #dce9e4; color: #7a8f8e; font-size: 12px; }
.reference-line a { display: inline-flex; align-items: center; gap: 5px; font-weight: 750; }

.support-modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(18, 39, 48, .56); backdrop-filter: blur(10px); }
.support-modal-card { width: min(420px, 100%); overflow: hidden; border: 1px solid #d6e2e4; border-radius: 8px; background: #ffffff; box-shadow: 0 28px 80px rgba(17, 27, 36, .28); }
.support-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px 20px; border-bottom: 1px solid #e0e8e9; }
.support-modal-head h2 { margin: 0; font-size: 20px; }
.support-modal-head button { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #d6e2e4; border-radius: 5px; color: #4d626d; background: #ffffff; font-size: 22px; line-height: 1; cursor: pointer; }
.support-modal-body { display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }
.support-modal-body img { width: 100%; max-width: 280px; border: 1px solid #d6e2e4; border-radius: 6px; }
.support-modal-body p { margin: 0; color: #65767d; font-size: 13px; }

@media (max-width: 980px) {
  .harness-hero { grid-template-columns: 1fr; gap: 28px; padding-top: 52px; }
  .hero-snapshot { max-width: 620px; }
  .side-index { display: none; }
  .harness-layout { display: block; }
}

@media (max-width: 700px) {
  .harness-hero, .jumpbar, .harness-layout { width: min(100% - 24px, 1240px); }
  .harness-hero { padding: 36px 0 38px; }
  h1 { font-size: clamp(34px, 10vw, 52px); }
  .hero-copy { font-size: 16px; }
  .parameter-row { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }
  .parameter-note { font-size: 12px; }
  .provider-row { grid-template-columns: 1fr; gap: 3px; padding: 10px 0; }
  .method-grid, .checklist { grid-template-columns: 1fr; }
  .steps--test { grid-template-columns: 1fr 1fr; }
  .compat-heading { display: grid; }
  .compat-heading button { justify-self: start; }
  .guide-section { padding: 22px 18px; }
}

@media (max-width: 460px) {
  .steps--test { grid-template-columns: 1fr; }
  .snapshot-grid { grid-template-columns: 1fr; }
  .snapshot-grid .snapshot-wide { grid-column: auto; }
  .hero-tags { display: grid; }
  .hero-tags span { width: fit-content; }
}
</style>
