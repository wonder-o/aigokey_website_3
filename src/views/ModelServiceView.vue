<template>
  <div class="model-page" :style="{ '--model-accent': model.accent, '--model-soft': model.softAccent }">
    <SiteHeader @trial="showModal = true" />
    <main>
      <section class="model-hero">
        <div class="model-shell model-hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">{{ modelCopy.vendor }} · {{ model.label }}</p>
            <h1>{{ model.model }}<span>{{ model.label }}</span></h1>
            <p class="hero-tagline">{{ modelCopy.tagline }}</p>
            <p class="hero-intro">{{ modelCopy.intro }}</p>
          </div>
          <aside class="model-stamp" aria-label="Model identity">
            <div class="stamp-orbit"><span class="stamp-core">{{ model.label.slice(0, 2).toUpperCase() }}</span><i></i><b></b></div>
            <div class="stamp-meta"><span>MODEL SERVICE</span><strong>{{ model.label }}</strong><small>{{ modelCopy.vendor }}</small></div>
          </aside>
        </div>
      </section>

      <section id="token-plan" class="model-section plan-section">
        <div class="model-shell">
          <div class="section-heading"><div><p class="eyebrow">{{ page.planEyebrow }}</p><h2>{{ page.planTitle }}</h2></div><p>{{ page.planText }}</p></div>
          <div class="plan-layout">
            <article class="plan-callout"><span class="callout-mark"><Layers3 :size="22" aria-hidden="true" /></span><p class="callout-kicker">AIGOKEY TOKEN PLAN</p><h3>{{ model.label }}<br />{{ page.planHeadline }}</h3><p>{{ modelCopy.planNote }}</p></article>
            <div class="plan-list"><div v-for="(plan, index) in plans" :key="plan.id" class="plan-row"><span class="plan-index">0{{ index + 1 }}</span><div><strong>{{ plan.label }}</strong><small>{{ plan.period }} · {{ plan.summary }}</small></div><b>{{ plan.tiers.length }} {{ page.tiers }}</b></div><footer><CheckCircle2 :size="17" aria-hidden="true" />{{ page.included }}</footer></div>
          </div>
        </div>
      </section>

      <section class="model-section intro-section">
        <div class="model-shell intro-layout">
          <div><p class="eyebrow">{{ page.introEyebrow }}</p><h2>{{ page.introTitle }}<br /><em>{{ model.label }}</em></h2></div>
          <div class="capability-list"><article v-for="(item, index) in modelCopy.capabilities" :key="item"><span>0{{ index + 1 }}</span><div><h3>{{ item }}</h3><p>{{ page.capabilityNotes[index] }}</p></div></article></div>
        </div>
      </section>
    </main>
    <SiteFooter />
    <Teleport to="body"><div v-if="showModal" class="trial-modal" @click.self="showModal = false"><div class="trial-dialog" role="dialog" aria-modal="true"><header><h2>{{ t.modal.title }}</h2><button type="button" :aria-label="page.close" @click="showModal = false"><X :size="19" aria-hidden="true" /></button></header><div><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div></div></div></Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { CheckCircle2, Layers3, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'
import { getModelService } from '@/data/model-services'
import type { ModelService } from '@/data/model-services'
import { SITE_ORIGIN } from '@/config/site'

const props = defineProps<{ slug: string }>()
const { lang, t } = useI18n()
const showModal = ref(false)
const model = computed<ModelService>(() => getModelService(props.slug))
const plans = computed(() => t.value.plans)
type ModelCopy = Pick<ModelService, 'vendor' | 'tagline' | 'intro' | 'capabilities' | 'planNote'>
const englishModelCopy: Record<string, ModelCopy> = {
  gpt: { vendor: 'OpenAI', tagline: 'General intelligence for complex tasks, coding, and agent workflows.', intro: 'OpenAI positions GPT-5.6 as a flagship model for complex reasoning and coding, with variants that balance intelligence and cost. The latest models support text and image input, multilingual capability, and vision.', capabilities: ['Complex problem decomposition and reasoning', 'Code generation, refactoring, and debugging', 'Tool use and long-running agent tasks'], planNote: 'A practical fit for bringing GPT into everyday work, engineering, content, and automation workflows.' },
  image: { vendor: 'OpenAI', tagline: 'Turn written ideas into production-ready visual assets.', intro: 'GPT-Image-2 is an advanced image generation model for turning natural-language descriptions into visuals across design, content, and product workflows.', capabilities: ['Text-to-image and visual concept exploration', 'Marketing, ecommerce, and social creative', 'A connected workflow from copy to visual output with GPT'], planNote: 'Keep Image creation connected with GPT and Codex workflows under one AIGOKEY account.' },
  deepseek: { vendor: 'DeepSeek', tagline: 'A new generation model for million-token context, agents, and complex reasoning.', intro: 'DeepSeek V4 is built for the agent era with 1M context, thinking and non-thinking modes, and optimizations for code and long-document tasks.', capabilities: ['1M long-context understanding', 'Thinking and non-thinking modes', 'Code and agent tool collaboration'], planNote: 'A strong fit for cost-conscious reasoning, code analysis, and high-volume content workflows.' },
  glm: { vendor: 'Z.ai / Zhipu AI', tagline: 'Agent, reasoning, and coding capabilities in one open MoE model.', intro: 'GLM5.3 is designed for agent, reasoning, and coding tasks, with thinking and direct-response modes for Chinese-language understanding and engineering collaboration.', capabilities: ['Agent tool use and task execution', 'Thinking and direct-response modes', 'Chinese understanding, coding, and engineering collaboration'], planNote: 'Useful for Chinese-language development, operations automation, and complex document work.' },
  kimi: { vendor: 'Moonshot AI', tagline: 'Kimi intelligence for coding, long-horizon execution, and agent collaboration.', intro: 'K3 is designed for coding, long-running task execution, and agent collaboration, making it suitable for long documents, complex projects, and work that needs continuous progress.', capabilities: ['Long-context document understanding', 'Code generation and engineering tasks', 'Multi-agent collaboration and long-horizon execution'], planNote: 'A practical fit for long documents, complex projects, and persistent agent work.' },
  seedance: { vendor: 'ByteDance Seed', tagline: 'A multimodal video model for turning a prompt into a complete creative work.', intro: 'Seedance 2.5 is a next-generation video creation model focused on moving from generated clips toward complete works, with multimodal references and expressive camera language.', capabilities: ['Text, image, video, and audio references', 'Camera motion and multi-shot storytelling', 'Advertising, short films, and product demos'], planNote: 'Built for creators, brands, and content teams that need dependable video-generation capacity.' },
}
const modelCopy = computed<ModelCopy>(() => {
  const value = lang.value === 'en' ? englishModelCopy[model.value.slug] : model.value
  return lang.value === 'zh-TW' ? localizeTraditional(value) : value
})
function localizeTraditional<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map((item) => localizeTraditional(item)) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, localizeTraditional(nested)])) as T
  return value
}
type PageCopy = { planEyebrow: string; planTitle: string; planText: string; planHeadline: string; tiers: string; included: string; introEyebrow: string; introTitle: string; capabilityNotes: string[]; close: string }
const page = computed<PageCopy>(() => {
  const zh = { navLabel: '模型服务', planEyebrow: '01 · TOKEN PLAN 服务', planTitle: '按周期选择额度，直接开始使用', planText: 'AIGOKEY 提供日卡、周卡和月卡 14 档标准套餐，覆盖个人尝试、项目冲刺和团队高频生产。模型服务页负责选型，订阅页负责查看完整价格和额度。', planHeadline: 'Token Plan', tiers: '档', included: '套餐额度可用于 AIGOKEY 支持的模型服务', introEyebrow: '02 · 模型摘要', introTitle: '为什么选择', capabilityNotes: ['把复杂任务拆成清晰步骤，并保持稳定的输出质量。', '从一次回答推进到可交付的代码、内容或视觉资产。', '和工具、上下文与团队流程连接，减少来回切换。'], close: '关闭' }
  const en = { navLabel: 'Model Services', planEyebrow: '01 · TOKEN PLAN SERVICE', planTitle: 'Choose a cadence and start', planText: 'AIGOKEY offers 14 day, week, and month tiers for personal trials, project sprints, and high-frequency team production.', planHeadline: 'Token Plan', tiers: 'tiers', included: 'Plans can be used across supported AIGOKEY model services', introEyebrow: '02 · MODEL SUMMARY', introTitle: 'Why teams use', capabilityNotes: ['Break complex work into clear steps with consistent output quality.', 'Move from one response to shippable code, content, or visual assets.', 'Connect models to tools, context, and team workflows.'], close: 'Close' }
  return lang.value === 'en' ? en : lang.value === 'zh-TW' ? localizeTraditional(zh) : zh
})

useHead(() => ({ title: lang.value === 'en' ? `${model.value.label} Model Service · AIGOKEY` : `${model.value.label} 模型服务 · AIGOKEY`, meta: [{ name: 'description', content: modelCopy.value.intro }, { property: 'og:title', content: lang.value === 'en' ? `${model.value.label} Model Service · AIGOKEY` : `${model.value.label} 模型服务 · AIGOKEY` }, { property: 'og:description', content: modelCopy.value.tagline }], link: [{ rel: 'canonical', href: `${SITE_ORIGIN}/models/${model.value.slug}/` }] }))
</script>

<style scoped>
.model-page { --model-ink:#14293a; --model-muted:#5d7283; --model-line:#d7e3e9; min-height:100vh; color:var(--model-ink); background:#fff; font-family:"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; }.model-page :where(h1,h2,h3,p){margin:0}.model-page :where(a){color:inherit;text-decoration:none}.model-shell{width:min(1180px,calc(100% - 48px));margin:0 auto}.model-hero{overflow:hidden;border-bottom:1px solid var(--model-line);background:linear-gradient(115deg,#f7fbfe 0%,#fff 68%)}.model-hero-grid{min-height:550px;padding:54px 0 68px;display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:80px;align-items:center}.model-breadcrumb{display:flex;align-items:center;gap:6px;color:#7890a0;font-size:11px;font-weight:700}.model-breadcrumb strong{color:var(--model-ink)}.eyebrow{color:var(--model-accent);font-family:"Cascadia Code","SFMono-Regular",monospace;font-size:11px;font-weight:850;letter-spacing:.06em}.hero-copy>.eyebrow{margin-top:54px}.hero-copy h1{margin-top:15px;font-size:clamp(50px,7vw,86px);font-weight:950;line-height:.98;letter-spacing:-.045em}.hero-copy h1 span{display:block;margin-top:9px;color:var(--model-accent);font-size:.32em;letter-spacing:.04em;line-height:1.2;text-transform:uppercase}.hero-tagline{max-width:690px;margin-top:28px;font-size:22px;font-weight:760;line-height:1.4}.hero-intro{max-width:670px;margin-top:16px;color:var(--model-muted);font-size:15px;line-height:1.85}.hero-actions{display:flex;align-items:center;flex-wrap:wrap;gap:18px;margin-top:30px}.action{min-height:46px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 18px;border-radius:6px;font-size:13px;font-weight:850;transition:transform .2s ease,background-color .2s ease}.action:hover{transform:translateY(-2px)}.action-primary{color:#fff!important;background:var(--model-accent);box-shadow:0 14px 28px color-mix(in srgb,var(--model-accent) 23%,transparent)}.action-primary:hover{filter:brightness(.92)}.source-link{display:inline-flex;align-items:center;gap:7px;color:var(--model-accent)!important;font-size:13px;font-weight:850}.source-link:hover{text-decoration:underline}.model-stamp{position:relative;min-height:320px;display:grid;align-content:center;justify-items:center;border:1px solid color-mix(in srgb,var(--model-accent) 26%,#d7e3e9);background:var(--model-soft);overflow:hidden}.model-stamp::before,.model-stamp::after{position:absolute;inset:25px;border:1px solid color-mix(in srgb,var(--model-accent) 19%,transparent);content:"";transform:rotate(45deg)}.model-stamp::after{inset:54px;transform:rotate(20deg)}.stamp-orbit{position:relative;z-index:1;width:170px;height:170px;border:1px solid color-mix(in srgb,var(--model-accent) 34%,transparent);border-radius:50%;display:grid;place-items:center}.stamp-orbit::before{position:absolute;inset:18px;border:1px dashed color-mix(in srgb,var(--model-accent) 36%,transparent);border-radius:50%;content:""}.stamp-core{display:grid;width:78px;height:78px;place-items:center;border-radius:50%;color:#fff;background:var(--model-accent);font-size:21px;font-weight:950;letter-spacing:.05em;box-shadow:0 0 0 12px color-mix(in srgb,var(--model-accent) 12%,transparent),0 0 40px color-mix(in srgb,var(--model-accent) 28%,transparent)}.stamp-orbit i,.stamp-orbit b{position:absolute;width:8px;height:8px;border-radius:50%;background:var(--model-accent)}.stamp-orbit i{top:16px;right:31px}.stamp-orbit b{bottom:24px;left:20px}.stamp-meta{position:relative;z-index:1;display:grid;gap:5px;margin-top:25px;text-align:center}.stamp-meta span,.stamp-meta small{color:var(--model-muted);font-family:"Cascadia Code",monospace;font-size:9px;font-weight:800;letter-spacing:.1em}.stamp-meta strong{font-size:23px}.model-section{padding:100px 0}.plan-section{border-bottom:1px solid var(--model-line);background:#fff}.section-heading{display:grid;grid-template-columns:minmax(0,.95fr) minmax(330px,.7fr);gap:90px;align-items:end}.section-heading h2{margin-top:12px;font-size:41px;font-weight:930;line-height:1.15}.section-heading>p{color:var(--model-muted);font-size:15px;line-height:1.8}.plan-layout{margin-top:48px;display:grid;grid-template-columns:minmax(275px,.75fr) minmax(0,1.25fr);border:1px solid #c9d9e1;background:#fff}.plan-callout{padding:32px;background:var(--model-soft);border-right:1px solid #c9d9e1}.callout-mark{display:grid;width:45px;height:45px;place-items:center;color:var(--model-accent);border:1px solid color-mix(in srgb,var(--model-accent) 28%,transparent);background:#fff}.callout-kicker{margin-top:23px!important;color:var(--model-accent);font-family:"Cascadia Code",monospace;font-size:10px;font-weight:850}.plan-callout h3{margin-top:11px;font-size:32px;line-height:1.1}.plan-callout>p:not(.callout-kicker){margin-top:15px;color:var(--model-muted);font-size:13px;line-height:1.75}.plan-callout .action{width:100%;margin-top:24px}.plan-list{display:grid;align-content:start}.plan-row{min-height:92px;display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:14px;align-items:center;margin:0 25px;border-bottom:1px solid #e0e9ed}.plan-index{display:grid;width:28px;height:28px;place-items:center;border:1px solid color-mix(in srgb,var(--model-accent) 38%,#c9d9e1);border-radius:50%;color:var(--model-accent);font-family:"Cascadia Code",monospace;font-size:9px;font-weight:850}.plan-row strong{display:block;font-size:16px}.plan-row small{display:block;margin-top:5px;color:var(--model-muted);font-size:11px;line-height:1.45}.plan-row b{color:var(--model-accent);font-family:"Cascadia Code",monospace;font-size:10px}.plan-list footer{min-height:57px;display:flex;align-items:center;gap:9px;padding:12px 25px;color:#4c6d81;background:#f2f8f6;font-size:12px;font-weight:750}.plan-list footer svg{color:#16835b}.intro-section{background:#f7fafb}.intro-layout{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:110px}.intro-layout h2{margin-top:14px;font-size:47px;line-height:1.1;font-weight:930}.intro-layout h2 em{color:var(--model-accent);font-style:normal}.intro-layout .source-link{margin-top:28px}.capability-list{border-top:1px solid #afc5d0}.capability-list article{min-height:108px;display:grid;grid-template-columns:42px minmax(0,1fr);gap:17px;align-items:center;border-bottom:1px solid var(--model-line)}.capability-list article>span{color:var(--model-accent);font-family:"Cascadia Code",monospace;font-size:10px;font-weight:850}.capability-list h3{font-size:18px}.capability-list p{margin-top:7px;color:var(--model-muted);font-size:13px;line-height:1.65}@media(max-width:820px){.model-shell{width:min(100% - 32px,1180px)}.model-hero-grid{grid-template-columns:1fr;gap:44px;padding:34px 0 54px}.hero-copy>.eyebrow{margin-top:35px}.model-stamp{min-height:260px}.section-heading,.intro-layout{grid-template-columns:1fr;gap:25px}.model-section{padding:72px 0}.plan-layout{grid-template-columns:1fr}.plan-callout{border-right:0;border-bottom:1px solid #c9d9e1}.intro-layout h2{font-size:39px}}@media(max-width:520px){.model-shell{width:min(100% - 24px,1180px)}.hero-copy h1{font-size:56px}.hero-tagline{font-size:19px}.section-heading h2{font-size:34px}.plan-callout h3{font-size:28px}.plan-row{grid-template-columns:30px minmax(0,1fr);gap:11px;margin:0 15px}.plan-row b{grid-column:2}.plan-list footer{padding:12px 15px}.capability-list article{grid-template-columns:30px minmax(0,1fr)}}
.hero-copy>.eyebrow{margin-top:0}
@media(max-width:820px){.hero-copy>.eyebrow{margin-top:0}}
</style>
