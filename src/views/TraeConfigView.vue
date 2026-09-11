<template>
  <div class="trae-page">
    <SiteHeader @trial="showSupport = true" />

    <main id="top">
      <section class="hero">
        <div class="hero-copy-block">
          <p class="eyebrow">{{ page.hero.eyebrow }}</p>
          <h1>{{ page.hero.title }}</h1>
          <p class="hero-copy">{{ page.hero.copy }}</p>
          <div class="hero-tags">
            <span><Code2 :size="15" aria-hidden="true" />TraeCode</span>
            <span><PanelsTopLeft :size="15" aria-hidden="true" />TraeWork</span>
            <span><Waypoints :size="15" aria-hidden="true" />OpenAI Chat Completions</span>
          </div>
        </div>

        <aside class="connection-card" :aria-label="page.hero.cardLabel">
          <div class="connection-head">
            <div class="product-mark"><img src="/assets/brand-logos/trae.png" alt="" /></div>
            <div><strong>TRAE + AIGOKEY</strong><span>{{ page.hero.customModel }}</span></div>
            <span class="status"><i aria-hidden="true"></i>{{ page.hero.ready }}</span>
          </div>
          <div class="connection-line" aria-hidden="true">
            <span>TRAE</span><ArrowRight :size="17" /><span>AIGOKEY</span><ArrowRight :size="17" /><span>MODEL</span>
          </div>
          <dl>
            <div><dt>{{ page.labels.protocol }}</dt><dd>OpenAI</dd></div>
            <div><dt>{{ page.labels.fullUrl }}</dt><dd>{{ page.values.off }}</dd></div>
            <div class="wide"><dt>{{ page.labels.endpoint }}</dt><dd>https://llm.aigokey.cn</dd></div>
          </dl>
          <p><ShieldCheck :size="16" aria-hidden="true" />{{ page.hero.security }}</p>
        </aside>
      </section>

      <nav class="jumpbar" :aria-label="page.quickJump">
        <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">
          <span>{{ item.number }}</span>{{ item.label }}
        </a>
      </nav>

      <div class="tutorial-layout">
        <aside class="side-index">
          <p>{{ page.quickJump }}</p>
          <a v-for="item in page.toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">
            <span>{{ item.number }}</span>{{ item.label }}<ChevronRight :size="14" aria-hidden="true" />
          </a>
          <a class="back-top" href="#top" @click.prevent="scrollTo('top')">{{ page.backTop }}</a>
        </aside>

        <article class="guide">
          <section id="prepare" class="guide-section">
            <SectionHeading number="01" :title="page.prepare.title" />
            <p class="lead">{{ page.prepare.lead }}</p>
            <div class="warning-note">
              <ShieldAlert :size="20" aria-hidden="true" />
              <p>{{ page.prepare.warning }}</p>
            </div>
            <ConfigTable :rows="page.configRows" />
            <div class="info-note">
              <Info :size="19" aria-hidden="true" />
              <p>{{ page.prepare.fullUrlNote }}</p>
            </div>
          </section>

          <section id="traecode" class="guide-section">
            <SectionHeading number="02" :title="page.traeCode.title" />
            <ol class="steps">
              <li v-for="(step, index) in page.traeCode.steps" :key="step">
                <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ step }}</p>
              </li>
            </ol>
            <ConfigTable :rows="page.detailRows" compact />
            <div class="info-note info-note--amber">
              <CircleAlert :size="19" aria-hidden="true" />
              <p>{{ page.traeCode.autoNote }}</p>
            </div>
          </section>

          <section id="traework" class="guide-section">
            <SectionHeading number="03" :title="page.traeWork.title" />
            <ol class="steps">
              <li v-for="(step, index) in page.traeWork.steps" :key="step">
                <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ step }}</p>
              </li>
            </ol>
            <ConfigTable :rows="page.detailRows" compact />
            <div class="info-note info-note--purple">
              <MonitorDown :size="19" aria-hidden="true" />
              <p>{{ page.traeWork.desktopNote }}</p>
            </div>
          </section>

          <section id="verify" class="guide-section">
            <SectionHeading number="04" :title="page.verify.title" />
            <p class="lead">{{ page.verify.lead }}</p>
            <div class="prompt-grid">
              <div v-for="prompt in page.verify.prompts" :key="prompt.label" class="prompt-card">
                <span>{{ prompt.label }}</span>
                <code>{{ prompt.text }}</code>
                <button type="button" :title="page.copy.action" :aria-label="page.copy.action" @click="copyText(prompt.text, $event)">
                  <Copy :size="16" aria-hidden="true" /><span>{{ page.copy.action }}</span>
                </button>
              </div>
            </div>
            <p class="success-line"><CheckCircle2 :size="18" aria-hidden="true" />{{ page.verify.success }}</p>
          </section>

          <section id="faq" class="guide-section">
            <SectionHeading number="05" :title="page.faq.title" />
            <div class="faq-list">
              <details v-for="(item, index) in page.faq.items" :key="item.question" :open="index === 0">
                <summary><span>{{ item.question }}</span><ChevronRight :size="17" aria-hidden="true" /></summary>
                <p>{{ item.answer }}</p>
              </details>
            </div>
          </section>

          <section id="security" class="guide-section guide-section--final">
            <SectionHeading number="06" :title="page.security.title" />
            <p class="lead">{{ page.security.lead }}</p>
            <ul class="security-list">
              <li v-for="item in page.security.items" :key="item"><span><Check :size="15" aria-hidden="true" /></span>{{ item }}</li>
            </ul>
            <div class="reference-line">
              <span>{{ page.references }}</span>
              <a href="https://docs.trae.cn/ide_models" target="_blank" rel="noopener">TraeCode<ArrowUpRight :size="15" aria-hidden="true" /></a>
              <a href="https://docs.trae.cn/work_models" target="_blank" rel="noopener">TraeWork<ArrowUpRight :size="15" aria-hidden="true" /></a>
            </div>
          </section>
        </article>
      </div>
    </main>

    <SiteFooter />

    <Teleport to="body">
      <div v-if="showSupport" class="support-modal" @click.self="showSupport = false">
        <div class="support-card">
          <div><h2>{{ t.modal.title }}</h2><button type="button" :aria-label="closeLabel" @click="showSupport = false"><X :size="20" aria-hidden="true" /></button></div>
          <section><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></section>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, ChevronRight, CircleAlert, Code2, Copy, Info, MonitorDown, PanelsTopLeft, ShieldAlert, ShieldCheck, Waypoints, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { toTraditionalText, useI18n } from '@/composables/useI18n'

type ConfigRow = { label: string; value: string }

const zh = {
  meta: { title: 'Trae配置教程 - 在TraeCode和TraeWork中使用AIGOKEY', description: '在 TraeCode 和 TraeWork 桌面版中通过自定义模型接入 AIGOKEY，包含 API 地址、模型 ID、密钥配置、验证与故障排查。' },
  hero: { eyebrow: 'TRAE 自定义模型教程', title: '在 TraeCode 和 TraeWork 中使用 AIGOKEY', copy: '通过“自定义模型”接入 AIGOKEY。按照本页填写 API 地址、密钥和真实模型 ID，完成后即可在 Trae 的模型列表中调用。', cardLabel: 'AIGOKEY 连接配置摘要', customModel: '自定义模型连接', ready: '可配置', security: '密钥仅填写在本地客户端中' },
  quickJump: '本页目录', backTop: '返回顶部', references: '参考文档',
  toc: [
    { id: 'prepare', number: '01', label: '配置前准备' }, { id: 'traecode', number: '02', label: 'TraeCode 配置' }, { id: 'traework', number: '03', label: 'TraeWork 配置' },
    { id: 'verify', number: '04', label: '验证配置' }, { id: 'faq', number: '05', label: '常见问题' }, { id: 'security', number: '06', label: '安全建议' },
  ],
  labels: { protocol: 'API 格式', fullUrl: '完整 URL', endpoint: 'API 地址' }, values: { off: '关闭' },
  prepare: { title: '配置前准备', lead: '请先准备 AIGOKEY 的 API 密钥，并确认要调用的具体模型 ID。Trae 除了需要 API 地址和密钥外，还要求填写模型 ID。', warning: '本文使用的 API 密钥为示例格式。请使用你在 AIGOKEY 控制台创建的真实密钥，不要将真实密钥发布到文章、截图、代码仓库或群聊中。', fullUrlNote: '关闭“完整 URL”后，Trae 会按照 OpenAI Chat Completions 格式自动在基础地址后拼接请求路径。若 AIGOKEY 后续向你提供了完整接口地址，则开启该开关并填写服务商提供的完整地址。' },
  configRows: [
    { label: '模型展示名称', value: 'AIGOKEY' }, { label: 'API 格式', value: 'OpenAI Chat Completions 格式' }, { label: 'API 地址', value: 'https://llm.aigokey.cn' },
    { label: '完整 URL', value: '关闭' }, { label: 'API 密钥', value: 'sk-你的API密钥' }, { label: '模型 ID', value: 'AIGOKEY 提供的实际模型 ID' },
  ],
  detailRows: [
    { label: 'API 格式', value: 'OpenAI Chat Completions 格式' }, { label: '自定义请求地址', value: 'https://llm.aigokey.cn' }, { label: '完整 URL', value: '关闭' },
    { label: '模型 ID', value: 'AIGOKEY 控制台中对应模型的实际 ID' }, { label: '模型展示名称', value: 'AIGOKEY' }, { label: 'API 密钥', value: '你的 AIGOKEY API 密钥，例如 sk-你的API密钥' },
  ],
  traeCode: {
    title: '在 TraeCode 中配置 AIGOKEY',
    steps: ['打开 TraeCode，进入“设置 > 模型”。', '点击“添加模型”，在模型来源中选择“自定义模型”。', '根据下方速查表完成基础配置。', '高级配置可先保留默认值。只有在明确所用模型系列时，再选择对应的 GPT-5、DeepSeek-4 等模型系列；不要因服务商名称为 AIGOKEY 而选择某个特定系列。', '点击“添加模型”。TraeCode 会验证 API 密钥和服务连接；成功后，模型将出现在模型列表中。', '回到 AI 对话，在输入框右下角打开模型列表，选择 AIGOKEY。'],
    autoNote: 'TraeCode 的 Auto 模式仅支持内置模型，无法调用自定义模型。使用 AIGOKEY 时，请在模型列表中手动选择它。',
  },
  traeWork: {
    title: '在 TraeWork 中配置 AIGOKEY',
    steps: ['打开 TraeWork 桌面版，进入“设置 > 模型”。', '点击“添加模型”，选择“自定义模型”。', '根据下方速查表填写配置。', '根据实际模型能力设置高级配置。不确定上下文窗口、工具调用轮数、Temperature、Top P、Top K 时，建议留空并使用 TraeWork 默认配置。仅当模型本身支持视觉理解时，才开启“支持图片输入”。', '点击“添加模型”。连接验证成功后，即可在 Work、Code 或 Design 模式的模型列表中选择 AIGOKEY。'],
    desktopNote: '根据 TraeWork 官方说明，添加自定义模型仅支持 TraeWork 桌面版，并且自定义模型仅可在本地环境中使用。',
  },
  verify: { title: '验证配置', lead: '添加完成后，先发送一条简单请求，再用实际任务验证模型能力。', prompts: [{ label: '基础连接测试', text: '请用一句话介绍你自己。' }, { label: '实际任务测试', text: '请检查下面这段代码是否存在明显问题，并给出修改建议。' }], success: '模型能正常返回内容，即表示 API 地址、API 密钥和模型 ID 已正确配置。' },
  faq: { title: '常见问题', items: [
    { question: '提示模型 ID 无效', answer: '检查模型 ID 是否从 AIGOKEY 的模型列表或控制台完整复制。AIGOKEY 只是展示名称，不能作为模型 ID 使用。' },
    { question: '提示无法连接 API 地址', answer: '确认基础地址为 https://llm.aigokey.cn，选择 OpenAI Chat Completions 格式并关闭“完整 URL”。如果服务商提供的是完整接口地址，则开启“完整 URL”并填写该地址。' },
    { question: '提示 API 密钥无效', answer: '确认密钥没有多余空格或换行，并在 AIGOKEY 控制台检查该密钥是否已失效、被禁用或额度不足。' },
    { question: '添加成功但在对话中找不到模型', answer: '在模型管理页确认 AIGOKEY 已启用；在 TraeCode 中还应关闭 Auto 模式，再从模型列表手动选择 AIGOKEY。' },
  ] },
  security: { title: '安全建议', lead: '把 API 密钥当作账户凭证管理。', items: ['不要在公开内容中展示完整 API 密钥。', '不要把 API 密钥提交到 Git 仓库或写入前端代码。', '一旦怀疑泄露，应立即在 AIGOKEY 控制台禁用并重新创建密钥。', '可按设备或项目分别创建密钥，便于后续排查和撤销。'] },
  copy: { action: '复制', success: '已复制', fail: '请手动复制' },
}

const en = {
  meta: { title: 'Trae Setup Guide - Use AIGOKEY in TraeCode and TraeWork', description: 'Connect AIGOKEY to TraeCode and the TraeWork desktop app as a custom model, with endpoint, model ID, API key, validation, and troubleshooting steps.' },
  hero: { eyebrow: 'TRAE CUSTOM MODEL GUIDE', title: 'Use AIGOKEY in TraeCode and TraeWork', copy: 'Connect AIGOKEY through Custom Model. Enter the API endpoint, key, and actual model ID below, then select it from Trae’s model list.', cardLabel: 'AIGOKEY connection summary', customModel: 'Custom model connection', ready: 'READY', security: 'Your key is entered only in the local client' },
  quickJump: 'On this page', backTop: 'Back to top', references: 'References',
  toc: [
    { id: 'prepare', number: '01', label: 'Before you start' }, { id: 'traecode', number: '02', label: 'TraeCode setup' }, { id: 'traework', number: '03', label: 'TraeWork setup' },
    { id: 'verify', number: '04', label: 'Verify' }, { id: 'faq', number: '05', label: 'Troubleshooting' }, { id: 'security', number: '06', label: 'Security' },
  ],
  labels: { protocol: 'API format', fullUrl: 'Full URL', endpoint: 'API endpoint' }, values: { off: 'Off' },
  prepare: { title: 'Before you start', lead: 'Prepare an AIGOKEY API key and confirm the exact model ID you want to call. Trae requires a model ID in addition to the API endpoint and key.', warning: 'The API key shown here is only an example. Use a real key created in the AIGOKEY console, and never publish it in articles, screenshots, repositories, or group chats.', fullUrlNote: 'With Full URL off, Trae appends the OpenAI Chat Completions request path to the base endpoint. If AIGOKEY gives you a complete endpoint later, turn this option on and use that full address.' },
  configRows: [
    { label: 'Display name', value: 'AIGOKEY' }, { label: 'API format', value: 'OpenAI Chat Completions' }, { label: 'API endpoint', value: 'https://llm.aigokey.cn' },
    { label: 'Full URL', value: 'Off' }, { label: 'API key', value: 'sk-your-api-key' }, { label: 'Model ID', value: 'The actual model ID supplied by AIGOKEY' },
  ],
  detailRows: [
    { label: 'API format', value: 'OpenAI Chat Completions' }, { label: 'Custom endpoint', value: 'https://llm.aigokey.cn' }, { label: 'Full URL', value: 'Off' },
    { label: 'Model ID', value: 'The actual model ID shown in the AIGOKEY console' }, { label: 'Display name', value: 'AIGOKEY' }, { label: 'API key', value: 'Your AIGOKEY API key, such as sk-your-api-key' },
  ],
  traeCode: { title: 'Configure AIGOKEY in TraeCode', steps: ['Open TraeCode and go to Settings > Models.', 'Select Add model, then choose Custom model as the source.', 'Complete the basic settings using the reference table below.', 'Keep advanced settings at their defaults unless you know the model family. Choose GPT-5, DeepSeek-4, or another family only when it matches the actual model.', 'Select Add model. TraeCode validates the key and connection, then adds the model to your list.', 'Return to AI chat, open the model list at the lower right of the input box, and select AIGOKEY.'], autoNote: 'TraeCode Auto mode supports built-in models only. To use AIGOKEY, turn off Auto and select it manually.' },
  traeWork: { title: 'Configure AIGOKEY in TraeWork', steps: ['Open the TraeWork desktop app and go to Settings > Models.', 'Select Add model, then choose Custom model.', 'Enter the settings from the reference table below.', 'Keep context window, tool-call rounds, Temperature, Top P, and Top K empty if you are unsure. Enable image input only when the selected model supports vision.', 'Select Add model. After validation succeeds, choose AIGOKEY in Work, Code, or Design mode.'], desktopNote: 'According to TraeWork documentation, custom models are available only in the desktop app and can be used only in the local environment.' },
  verify: { title: 'Verify the setup', lead: 'Send a simple request first, then validate the model with a real task.', prompts: [{ label: 'Connection test', text: 'Introduce yourself in one sentence.' }, { label: 'Real task test', text: 'Check the following code for obvious issues and suggest improvements.' }], success: 'A normal response confirms that the endpoint, API key, and model ID are configured correctly.' },
  faq: { title: 'Troubleshooting', items: [
    { question: 'Trae reports an invalid model ID', answer: 'Copy the complete model ID from the AIGOKEY model list or console. AIGOKEY is only the display name, not a model ID.' },
    { question: 'Trae cannot connect to the API endpoint', answer: 'Use https://llm.aigokey.cn, select OpenAI Chat Completions, and keep Full URL off. If the provider gives you a complete endpoint, turn Full URL on and enter it instead.' },
    { question: 'Trae reports an invalid API key', answer: 'Remove extra spaces or line breaks, then check in the AIGOKEY console whether the key is expired, disabled, or out of quota.' },
    { question: 'The model was added but does not appear in chat', answer: 'Confirm AIGOKEY is enabled in model management. In TraeCode, turn off Auto mode and select AIGOKEY manually.' },
  ] },
  security: { title: 'Security recommendations', lead: 'Treat your API key as an account credential.', items: ['Never show a complete API key in public content.', 'Never commit a key to Git or place it in frontend code.', 'If exposure is possible, disable the key and create a replacement immediately.', 'Use separate keys by device or project to simplify auditing and revocation.'] },
  copy: { action: 'Copy', success: 'Copied', fail: 'Copy manually' },
}

function translateTree<T>(value: T): T {
  if (typeof value === 'string') return toTraditionalText(value) as T
  if (Array.isArray(value)) return value.map(translateTree) as T
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateTree(item)])) as T
  return value
}

const { lang, t } = useI18n()
const page = computed(() => lang.value === 'en' ? en : lang.value === 'zh-TW' ? translateTree(zh) : zh)
const showSupport = ref(false)
const closeLabel = computed(() => lang.value === 'en' ? 'Close' : '关闭')

const SectionHeading = defineComponent({
  props: { number: { type: String, required: true }, title: { type: String, required: true } },
  setup(props) { return () => h('div', { class: 'section-head' }, [h('span', props.number), h('h2', props.title)]) },
})

const ConfigTable = defineComponent({
  props: { rows: { type: Array as () => ConfigRow[], required: true }, compact: Boolean },
  setup(props) {
    return () => h('div', { class: ['config-table', { 'config-table--compact': props.compact }], role: 'table' }, props.rows.map((row) =>
      h('div', { class: 'config-row', role: 'row' }, [h('span', { role: 'cell' }, row.label), h('code', { role: 'cell' }, row.value)]),
    ))
  },
})

useHead(() => ({
  title: page.value.meta.title,
  meta: [
    { name: 'description', content: page.value.meta.description },
    { property: 'og:title', content: page.value.meta.title },
    { property: 'og:description', content: page.value.meta.description },
    { property: 'og:type', content: 'article' },
  ],
}))

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
</script>

<style scoped>
.trae-page { min-height: 100vh; color: #1c2a38; background: #f5f8fb; font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif; line-height: 1.72; }
.trae-page a { color: #4050ba; text-underline-offset: 4px; }
.trae-page img { display: block; max-width: 100%; height: auto; }
main { padding-bottom: 88px; }
.hero, .jumpbar, .tutorial-layout { width: min(1240px, calc(100% - 48px)); margin: 0 auto; }

.hero { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(350px, .92fr); align-items: center; gap: 68px; padding: 70px 0 56px; }
.eyebrow { margin: 0 0 15px; color: #5360cf; font-size: 12px; font-weight: 850; letter-spacing: 0; }
h1 { max-width: 760px; margin: 0; color: #172a42; font-size: 56px; line-height: 1.09; letter-spacing: 0; }
.hero-copy { max-width: 720px; margin: 23px 0 0; color: #596b7a; font-size: 18px; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 27px; }
.hero-tags span { display: inline-flex; align-items: center; gap: 7px; min-height: 32px; padding: 0 10px; border: 1px solid #cad0ef; border-radius: 5px; color: #4552b0; background: #f1f2ff; font-size: 12px; font-weight: 760; }

.connection-card { padding: 20px; border: 1px solid #ccd4e3; border-radius: 8px; background: #fff; box-shadow: 0 18px 46px rgba(39, 55, 86, .1); }
.connection-head { display: flex; align-items: center; gap: 11px; padding-bottom: 16px; border-bottom: 1px solid #e0e5ed; }
.product-mark { display: grid; width: 40px; height: 40px; flex: 0 0 auto; place-items: center; border: 1px solid #d3d7f2; border-radius: 6px; background: #f1f2ff; }
.product-mark img { width: 27px; height: 27px; object-fit: contain; }
.connection-head > div:nth-child(2) { display: grid; line-height: 1.35; }
.connection-head strong { color: #243451; font-size: 14px; }
.connection-head div span { color: #7c8797; font-size: 11px; }
.status { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; color: #268069; font-family: Consolas, monospace; font-size: 10px; font-weight: 850; }
.status i { width: 7px; height: 7px; border-radius: 50%; background: #20a77f; box-shadow: 0 0 0 4px rgba(32,167,127,.13); }
.connection-line { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 7px; padding: 20px 0; color: #748090; }
.connection-line span { padding: 7px 4px; border: 1px solid #dce1eb; border-radius: 4px; color: #485579; background: #f8f9fc; font-size: 10px; font-weight: 850; text-align: center; }
.connection-card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 0; padding: 15px 0; border-top: 1px solid #e0e5ed; border-bottom: 1px solid #e0e5ed; }
.connection-card dl div { min-width: 0; }.connection-card dl .wide { grid-column: 1 / -1; }
.connection-card dt { color: #84909e; font-size: 10px; font-weight: 750; }.connection-card dd { margin: 3px 0 0; overflow-wrap: anywhere; color: #4050a6; font-family: Consolas, monospace; font-size: 11px; font-weight: 750; }
.connection-card > p { display: flex; align-items: center; gap: 7px; margin: 14px 0 0; color: #677887; font-size: 12px; }

.jumpbar { display: flex; gap: 5px; padding: 9px; overflow-x: auto; border: 1px solid #d8dfe8; border-radius: 7px; background: #fff; box-shadow: 0 8px 22px rgba(41,58,82,.05); scrollbar-width: none; }
.jumpbar::-webkit-scrollbar { display: none; }.jumpbar a { display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; min-height: 34px; padding: 0 10px; border-radius: 4px; color: #5d6d7d; font-size: 12px; font-weight: 750; text-decoration: none; }
.jumpbar a span { color: #5964c9; font-family: Consolas, monospace; font-size: 10px; }.jumpbar a:hover, .jumpbar a:focus-visible { color: #34419d; background: #f0f2ff; outline: none; }

.tutorial-layout { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 28px; align-items: start; padding-top: 28px; }
.side-index { position: sticky; top: 102px; display: grid; gap: 2px; padding: 12px 0; }.side-index > p { margin: 0 0 10px; color: #8793a0; font-size: 10px; font-weight: 850; }
.side-index a { display: grid; grid-template-columns: 24px 1fr auto; align-items: center; min-height: 34px; padding: 0 8px; border-left: 2px solid transparent; color: #637383; font-size: 12px; text-decoration: none; }
.side-index a span { color: #6872c9; font-family: Consolas, monospace; font-size: 10px; }.side-index a svg { opacity: 0; }.side-index a:hover, .side-index a:focus-visible { border-color: #5964c9; color: #36419b; background: #eff1ff; outline: none; }.side-index a:hover svg, .side-index a:focus-visible svg { opacity: 1; }
.side-index .back-top { display: flex; margin-top: 13px; border-top: 1px solid #dce2e8; border-left: 0; color: #4d58b5; font-size: 11px; }

.guide { min-width: 0; overflow: hidden; border: 1px solid #d8dfe8; border-radius: 8px; background: #fff; box-shadow: 0 14px 36px rgba(38,54,78,.055); }
.guide-section { scroll-margin-top: 98px; padding: 42px; border-bottom: 1px solid #e2e7ed; }.guide-section:last-child { border-bottom: 0; }.guide-section--final { background: #fbfcfe; }
.section-head { display: grid; gap: 5px; margin-bottom: 18px; }.section-head > span { color: #5964c9; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; }.section-head h2 { margin: 0; color: #21364d; font-size: 34px; line-height: 1.2; letter-spacing: 0; }
.lead { max-width: 850px; margin: 0; color: #5f7080; font-size: 16px; }
.warning-note, .info-note { display: grid; grid-template-columns: 24px 1fr; gap: 11px; margin-top: 24px; padding: 15px 16px; border: 1px solid #edd7b3; border-radius: 6px; color: #805b27; background: #fff9ed; }.warning-note p, .info-note p { margin: 0; font-size: 13px; }
.info-note { border-color: #cce1e9; color: #336675; background: #eff8fb; }.info-note--amber { border-color: #edd7b3; color: #805b27; background: #fff9ed; }.info-note--purple { border-color: #d4d8f3; color: #4b56aa; background: #f3f4ff; }

.config-table { display: grid; grid-template-columns: 1fr 1fr; margin-top: 24px; overflow: hidden; border: 1px solid #d9e0e9; border-radius: 6px; background: #fbfcfe; }.config-row { display: grid; grid-template-columns: 145px minmax(0, 1fr); align-items: center; min-height: 58px; padding: 10px 14px; border-bottom: 1px solid #e5e9ef; }.config-row:nth-child(odd) { border-right: 1px solid #e5e9ef; }.config-row:nth-last-child(-n+2) { border-bottom: 0; }.config-row > span { color: #5a6879; font-size: 12px; font-weight: 800; }.config-row code { overflow-wrap: anywhere; color: #4050a6; font-family: Consolas, monospace; font-size: 12px; font-weight: 750; }
.config-table--compact { margin-top: 28px; }
.steps { display: grid; gap: 0; margin: 23px 0 0; padding: 0; list-style: none; border-top: 1px solid #dde3ea; }.steps li { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 14px; padding: 16px 0; border-bottom: 1px solid #e5e9ef; }.steps li > span { color: #5964c9; font-family: Consolas, monospace; font-size: 11px; font-weight: 850; }.steps p { margin: 0; color: #526574; font-size: 14px; }

.prompt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px; }.prompt-card { display: grid; grid-template-columns: 1fr auto; align-items: center; min-width: 0; overflow: hidden; border: 1px solid #293957; border-radius: 6px; background: #18263d; }.prompt-card > span { grid-column: 1 / -1; padding: 9px 14px; border-bottom: 1px solid #32425d; color: #9eacca; font-size: 10px; font-weight: 800; }.prompt-card code { min-width: 0; padding: 17px 14px; color: #f3f6ff; font-family: Consolas, monospace; font-size: 13px; white-space: normal; }.prompt-card button { display: inline-flex; align-items: center; align-self: stretch; gap: 6px; padding: 0 13px; border: 0; border-left: 1px solid #32425d; color: #dbe2f8; background: #22334e; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; }.prompt-card button:hover, .prompt-card button:focus-visible { color: #fff; background: #4d59b5; outline: none; }
.success-line { display: flex; align-items: flex-start; gap: 9px; margin: 20px 0 0; color: #26765e; font-size: 14px; }.success-line svg { flex: 0 0 auto; margin-top: 3px; }

.faq-list { display: grid; gap: 8px; margin-top: 22px; }.faq-list details { border: 1px solid #dce2e9; border-radius: 6px; background: #fbfcfe; }.faq-list details[open] { border-color: #cbd0ed; background: #fafaff; }.faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 54px; padding: 0 16px; color: #405267; font-size: 14px; font-weight: 800; cursor: pointer; list-style: none; }.faq-list summary::-webkit-details-marker { display: none; }.faq-list summary svg { flex: 0 0 auto; color: #758293; transition: transform .2s ease; }.faq-list details[open] summary svg { color: #5964c9; transform: rotate(90deg); }.faq-list details p { margin: 0; padding: 0 16px 16px; color: #627280; font-size: 13px; }
.security-list { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 24px; margin: 24px 0 0; padding: 0; list-style: none; }.security-list li { display: flex; align-items: flex-start; gap: 9px; color: #455d69; font-size: 14px; }.security-list li span { display: grid; width: 22px; height: 22px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #fff; background: #2b9a78; }
.reference-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-top: 28px; padding-top: 18px; border-top: 1px solid #e0e5eb; color: #7a8795; font-size: 12px; }.reference-line a { display: inline-flex; align-items: center; gap: 5px; font-weight: 750; }

.support-modal { position: fixed; inset: 0; z-index: 110; display: grid; place-items: center; padding: 24px; background: rgba(18,31,48,.58); backdrop-filter: blur(10px); }.support-card { width: min(420px, 100%); overflow: hidden; border: 1px solid #d7dee8; border-radius: 8px; background: #fff; box-shadow: 0 28px 80px rgba(17,27,36,.28); }.support-card > div { display: flex; align-items: center; justify-content: space-between; padding: 17px 20px; border-bottom: 1px solid #e1e6ec; }.support-card h2 { margin: 0; font-size: 20px; }.support-card button { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #d6dde6; border-radius: 5px; color: #4d5f70; background: #fff; cursor: pointer; }.support-card section { display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }.support-card section img { width: 100%; max-width: 280px; border: 1px solid #d6dde6; border-radius: 6px; }.support-card section p { margin: 0; color: #657482; font-size: 13px; }

@media (max-width: 980px) { .hero { grid-template-columns: 1fr; gap: 28px; padding-top: 52px; }.connection-card { max-width: 650px; }.side-index { display: none; }.tutorial-layout { display: block; } }
@media (max-width: 720px) { .hero, .jumpbar, .tutorial-layout { width: min(100% - 24px, 1240px); }.hero { padding: 38px 0; } h1 { font-size: 39px; }.hero-copy { font-size: 16px; }.guide-section { padding: 28px 18px; }.section-head h2 { font-size: 27px; }.config-table, .prompt-grid, .security-list { grid-template-columns: 1fr; }.config-row:nth-child(odd) { border-right: 0; }.config-row:nth-last-child(2) { border-bottom: 1px solid #e5e9ef; } }
@media (max-width: 470px) { h1 { font-size: 34px; }.hero-tags { display: grid; }.hero-tags span { width: fit-content; }.connection-card dl { grid-template-columns: 1fr; }.connection-card dl .wide { grid-column: auto; }.connection-line { gap: 4px; }.connection-line span { font-size: 9px; }.config-row { grid-template-columns: 1fr; gap: 4px; padding: 13px 14px; }.prompt-card { grid-template-columns: 1fr; }.prompt-card button { min-height: 42px; justify-content: center; border-top: 1px solid #32425d; border-left: 0; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
</style>
