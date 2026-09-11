<template>
  <div class="pi-page">
    <SiteHeader @trial="showModal = true" />
    <main id="top">
      <section class="pi-hero">
        <div>
          <p class="pi-eyebrow">Pi coding agent · AIGOKEY · models.json</p>
          <h1>{{ copy.title }}</h1>
          <p class="pi-intro">{{ copy.intro }}</p>
          <div class="pi-tags"><span>OpenAI Completions</span><span>自定义 Provider</span><span>本地配置文件</span></div>
        </div>
        <aside class="pi-terminal" aria-label="Pi configuration preview">
          <div class="terminal-bar"><i></i><i></i><i></i><span>~/.pi/agent/models.json</span></div>
          <pre><code>{
  "providers": {
    "aigokey": {
      "api": "openai-completions",
      "baseUrl": "https://llm.aigokey.cn/v1"
    }
  }
}</code></pre>
        </aside>
      </section>

      <nav class="pi-jump" :aria-label="copy.contents">
        <a v-for="item in sections" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">{{ item.label }}</a>
      </nav>

      <div class="pi-shell">
        <aside class="pi-index">
          <span>{{ copy.contents }}</span>
          <a v-for="item in sections" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">{{ item.label }}</a>
        </aside>
        <article class="pi-guide">
          <section id="prepare" class="pi-section">
            <div class="section-title"><b>01</b><h2>{{ copy.prepare.title }}</h2></div>
            <p>{{ copy.prepare.lead }}</p>
            <div class="field-grid">
              <div v-for="row in copy.prepare.rows" :key="row.label" class="field-row"><strong>{{ row.label }}</strong><code>{{ row.value }}</code><small>{{ row.note }}</small></div>
            </div>
          </section>

          <section id="file" class="pi-section">
            <div class="section-title"><b>02</b><h2>{{ copy.file.title }}</h2></div>
            <p>{{ copy.file.lead }}</p>
            <div class="path-chip"><FolderOpen :size="17" /> <code>~/.pi/agent/models.json</code></div>
            <ol class="pi-steps"><li v-for="step in copy.file.steps" :key="step">{{ step }}</li></ol>
            <div class="pi-note"><Info :size="18" /><p><strong>{{ copy.file.noteTitle }}</strong>{{ copy.file.note }}</p></div>
          </section>

          <section id="config" class="pi-section">
            <div class="section-title"><b>03</b><h2>{{ copy.config.title }}</h2></div>
            <p>{{ copy.config.lead }}</p>
            <div class="code-card">
              <div class="code-head"><span>models.json</span><button type="button" @click="copyCode"><Copy :size="15" />{{ copied ? copy.copied : copy.copy }}</button></div>
              <pre><code>{{ config }}</code></pre>
            </div>
            <div class="key-grid"><div v-for="item in copy.config.keys" :key="item.key"><code>{{ item.key }}</code><span>{{ item.text }}</span></div></div>
          </section>

          <section id="model" class="pi-section">
            <div class="section-title"><b>04</b><h2>{{ copy.model.title }}</h2></div>
            <p>{{ copy.model.lead }}</p>
            <div class="model-callout"><div class="model-id">MODEL<br />ID</div><div><code>your-model-id</code><p>{{ copy.model.callout }}</p></div></div>
            <ul class="checks"><li v-for="item in copy.model.checks" :key="item"><Check :size="16" />{{ item }}</li></ul>
          </section>

          <section id="run" class="pi-section">
            <div class="section-title"><b>05</b><h2>{{ copy.run.title }}</h2></div>
            <p>{{ copy.run.lead }}</p>
            <div class="run-grid"><div v-for="(step, i) in copy.run.steps" :key="step"><span>0{{ i + 1 }}</span><p>{{ step }}</p></div></div>
            <div class="command-row"><code>/model</code><span>{{ copy.run.command }}</span></div>
          </section>

          <section id="trouble" class="pi-section">
            <div class="section-title"><b>06</b><h2>{{ copy.trouble.title }}</h2></div>
            <p>{{ copy.trouble.lead }}</p>
            <div class="faq"><details v-for="(item, i) in copy.trouble.items" :key="item.q" :open="i === 0"><summary>{{ item.q }}<ChevronRight :size="17" /></summary><p>{{ item.a }}</p></details></div>
          </section>

          <section id="check" class="pi-section pi-section--accent">
            <div class="section-title"><b>07</b><h2>{{ copy.check.title }}</h2></div>
            <p>{{ copy.check.lead }}</p>
            <ul class="checks checks--two"><li v-for="item in copy.check.items" :key="item"><Check :size="16" />{{ item }}</li></ul>
            <div class="reference"><span>{{ copy.reference }}</span><a href="https://pi.dev/docs/latest/models" target="_blank" rel="noopener">Pi 官方文档：Custom Models <ArrowUpRight :size="15" /></a></div>
          </section>
        </article>
      </div>
    </main>
    <SiteFooter />
    <Teleport to="body"><div v-if="showModal" class="support-modal" @click.self="showModal = false"><div class="support-modal-card"><div class="support-modal-head"><h2>{{ t.modal.title }}</h2><button type="button" @click="showModal = false">×</button></div><div class="support-modal-body"><img src="/assets/customer-service-qr.png" alt="QR" /><p>{{ t.modal.text }}</p></div></div></div></Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowUpRight, Check, ChevronRight, Copy, FolderOpen, Info } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import { useI18n } from '@/composables/useI18n'

const { t, lang } = useI18n()
const showModal = ref(false)
const copied = ref(false)
const isEnglish = computed(() => lang.value === 'en')
const sections = computed(() => isEnglish.value ? [
  { id: 'prepare', label: '01 Prepare fields' }, { id: 'file', label: '02 Open models.json' }, { id: 'config', label: '03 Add provider' }, { id: 'model', label: '04 Define a model' }, { id: 'run', label: '05 Select and run' }, { id: 'trouble', label: '06 Troubleshooting' }, { id: 'check', label: '07 Checklist' },
] : [
  { id: 'prepare', label: '01 准备参数' }, { id: 'file', label: '02 打开 models.json' }, { id: 'config', label: '03 添加提供方' }, { id: 'model', label: '04 定义模型' }, { id: 'run', label: '05 选择并运行' }, { id: 'trouble', label: '06 常见问题' }, { id: 'check', label: '07 检查清单' },
])
const copy = computed(() => isEnglish.value ? enCopy : zhCopy)
const config = computed(() => `{
  "providers": {
    "aigokey": {
      "name": "AIGOKEY",
      "baseUrl": "https://llm.aigokey.cn/v1",
      "apiKey": "$AIGOKEY_API_KEY",
      "api": "openai-completions",
      "models": [
        {
          "id": "your-model-id",
          "name": "AIGOKEY Model",
          "reasoning": false,
          "input": ["text"],
          "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 },
          "contextWindow": 128000,
          "maxTokens": 4096
        }
      ]
    }
  }
}`)
function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
async function copyCode() { try { await navigator.clipboard.writeText(config.value); copied.value = true; window.setTimeout(() => { copied.value = false }, 1400) } catch { copied.value = false } }

const zhCopy = {
  meta: { title: '在 Pi 中使用 AIGOKEY - AIGOKEY', description: '通过 Pi 的 models.json 自定义模型提供方接入 AIGOKEY，配置 OpenAI 兼容接口并完成首次请求。' }, contents: '教程目录', title: '在 Pi 中使用 AIGOKEY', intro: 'Pi 支持通过 models.json 添加自定义模型提供方。照下面的配置，把 AIGOKEY 作为 OpenAI 兼容服务接入 Pi，保存后即可在模型选择器中使用。', copy: '复制配置', copied: '已复制', reference: '配置依据：Pi 官方 Custom Models 文档',
  prepare: { title: '准备连接参数', lead: '开始前准备好 API Key 和一个 AIGOKEY 实际支持的模型 ID。下面的示例使用环境变量保存密钥。', rows: [{ label: 'Provider ID', value: 'aigokey', note: '自定义提供方的唯一标识，建议保持小写。' }, { label: 'Base URL', value: 'https://llm.aigokey.cn/v1', note: 'AIGOKEY OpenAI 兼容接口根地址。' }, { label: 'API', value: 'openai-completions', note: 'Pi 对 OpenAI Chat Completions 的流式实现。' }, { label: 'API Key', value: '$AIGOKEY_API_KEY', note: '从环境变量读取，不把明文写进配置文件。' }] },
  file: { title: '打开 Pi 配置文件', lead: 'Pi 默认从用户目录读取模型配置。文件不存在时可以直接创建，目录名中的点号不要省略。', steps: ['退出正在运行的 Pi 会话。', '打开终端，进入 ~/.pi/agent 目录。', '创建或编辑 models.json，并粘贴下一节的完整配置。', '在当前终端设置 AIGOKEY_API_KEY 环境变量。'], noteTitle: '密钥解析顺序：', note: 'Pi 会优先使用命令行 --api-key，其次是 auth.json、环境变量，最后才使用 models.json 中的 apiKey 值。' },
  config: { title: '添加 AIGOKEY 提供方', lead: '将下面配置保存为 models.json。只需要把 your-model-id 替换成实际模型 ID；如果模型支持图片输入或推理，请同步调整对应字段。', keys: [{ key: 'baseUrl', text: '填写接口根地址，保留 /v1。' }, { key: 'api', text: 'AIGOKEY 使用 openai-completions。' }, { key: 'apiKey', text: '支持 $ENV_VAR 环境变量写法。' }, { key: 'models', text: '至少定义一个模型，id 必须准确。' }] },
  model: { title: '定义模型能力', lead: 'Pi 用模型对象决定模型是否可选，以及如何展示能力和用量。价格字段用于 Pi 的用量跟踪，不会改变 AIGOKEY 的实际计费。', callout: '将它替换为 AIGOKEY 控制台或模型列表中的真实 ID，大小写和连字符都要完全一致。', checks: ['文本模型使用 input: ["text"]；视觉模型再加入 "image"。', '不支持思考时保持 reasoning: false；不要为了显示选项而误设为 true。', 'contextWindow 与 maxTokens 按模型真实限制填写。'] },
  run: { title: '在 Pi 中选择并运行', lead: '保存配置并设置密钥后，重新启动 Pi。自定义模型会出现在模型列表中。', steps: ['设置环境变量并启动 Pi。', '输入 /model 打开模型选择器。', '找到 AIGOKEY 提供方并选择目标模型。', '发送一条短消息，确认返回正常。'], command: '打开模型选择器，搜索 aigokey/your-model-id' },
  trouble: { title: '常见问题与处理方式', lead: '先检查文件路径、JSON 格式和模型 ID，再重启 Pi 验证。', items: [{ q: '模型没有出现在 /model 中', a: '确认文件位于 ~/.pi/agent/models.json，JSON 可解析，并且 apiKey 已通过环境变量或 /login 配置。无凭据时模型会加载但保持不可用。' }, { q: '请求返回 401 或 MISSING_CREDENTIAL', a: '检查当前终端是否设置 AIGOKEY_API_KEY，变量值是否完整；也可以用 pi --api-key 临时验证。' }, { q: '提示 UNKNOWN_MODEL', a: 'models 数组中的 id 必须是 AIGOKEY 实际支持的模型 ID。不要填写展示名称，修正后重新启动 Pi。' }, { q: '接口路径应该写什么？', a: '在 models.json 中写 https://llm.aigokey.cn/v1。Pi 的 openai-completions 实现会拼接标准请求路径，不要重复添加 /chat/completions。' }] },
  check: { title: '配置检查清单', lead: '逐项确认后，Pi 就可以通过 AIGOKEY 发起请求。', items: ['文件路径为 ~/.pi/agent/models.json', 'baseUrl 为 https://llm.aigokey.cn/v1', 'api 为 openai-completions', 'AIGOKEY_API_KEY 已设置且未泄露', '模型 id 与 AIGOKEY 列表完全一致', '已用 /model 选择模型并发送测试消息'] },
}
const enCopy = { ...zhCopy, meta: { title: 'Use AIGOKEY in Pi - AIGOKEY', description: 'Connect AIGOKEY to Pi through a custom provider in models.json, using the OpenAI-compatible API.' }, contents: 'On this page', title: 'Use AIGOKEY in Pi', intro: 'Pi can load custom model providers from models.json. Follow this guide to connect AIGOKEY as an OpenAI-compatible service and select it from Pi’s model picker.', copy: 'Copy config', copied: 'Copied', reference: 'Based on the Pi Custom Models documentation' }
useHead(() => ({ title: copy.value.meta.title, meta: [{ name: 'description', content: copy.value.meta.description }, { property: 'og:title', content: copy.value.meta.title }, { property: 'og:description', content: copy.value.meta.description }] }))
</script>

<style scoped>
.pi-page{min-height:100vh;background:#f5f8fa;color:#183244;font-family:"Microsoft YaHei","PingFang SC","Noto Sans SC",Arial,sans-serif;line-height:1.7}.pi-page img{display:block;max-width:100%}.pi-page main{padding-bottom:84px}.pi-hero,.pi-jump,.pi-shell{width:min(1240px,calc(100% - 48px));margin:0 auto}.pi-hero{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(330px,.92fr);gap:64px;align-items:center;padding:76px 0 54px}.pi-eyebrow{margin:0 0 14px;color:#1a8d67;font-size:12px;font-weight:850;letter-spacing:.12em;text-transform:uppercase}.pi-hero h1{max-width:760px;margin:0;color:#123048;font-size:clamp(40px,5.6vw,74px);line-height:1.05;letter-spacing:-.025em}.pi-intro{max-width:700px;margin:24px 0 0;color:#566d79;font-size:18px}.pi-tags{display:flex;flex-wrap:wrap;gap:9px;margin-top:25px}.pi-tags span{padding:3px 10px;border:1px solid #c6ddd4;border-radius:5px;color:#216d58;background:#edf7f3;font-size:12px;font-weight:750}.pi-terminal{overflow:hidden;border:1px solid #294754;border-radius:8px;background:#142d37;box-shadow:0 24px 48px rgba(25,65,72,.15)}.terminal-bar{display:flex;align-items:center;gap:6px;padding:14px 16px;border-bottom:1px solid #2b4a55;color:#9bb9b5;font:11px Consolas,monospace}.terminal-bar i{width:7px;height:7px;border-radius:50%;background:#71c3a1}.terminal-bar i:nth-child(2){background:#d5b36c}.terminal-bar i:nth-child(3){background:#d47776}.terminal-bar span{margin-left:7px}.pi-terminal pre{margin:0;padding:22px 20px;overflow:auto}.pi-terminal code,.code-card code{color:#d9eee8;font:12px/1.8 Consolas,"SFMono-Regular",monospace;white-space:pre}.pi-jump{display:flex;gap:4px;padding:8px;overflow:auto;border:1px solid #d5e2e4;border-radius:7px;background:#fff;box-shadow:0 7px 20px rgba(30,69,90,.05);scrollbar-width:none}.pi-jump::-webkit-scrollbar{display:none}.pi-jump a{flex:0 0 auto;padding:5px 10px;border-radius:4px;color:#5e7680;font-size:12px;font-weight:750;white-space:nowrap}.pi-jump a:hover{color:#155e4a;background:#edf7f3}.pi-shell{display:grid;grid-template-columns:190px minmax(0,1fr);gap:28px;align-items:start;padding-top:28px}.pi-index{position:sticky;top:100px;display:grid;gap:2px;padding:10px 0}.pi-index span{margin:0 0 9px;color:#8a9ca0;font-size:10px;font-weight:850;letter-spacing:.12em;text-transform:uppercase}.pi-index a{padding:5px 8px;border-left:2px solid transparent;color:#637a83;font-size:12px}.pi-index a:hover{border-color:#25a276;color:#185e4b;background:#edf7f3}.pi-guide{display:grid;gap:18px;min-width:0}.pi-section{scroll-margin-top:92px;padding:clamp(24px,3.2vw,42px);border:1px solid #d6e2e4;border-radius:8px;background:#fff;box-shadow:0 12px 30px rgba(29,68,87,.045)}.pi-section--accent{border-color:#bcdace;background:#fbfefd}.section-title{display:flex;align-items:center;gap:12px;margin-bottom:15px}.section-title b{color:#1b9870;font:850 12px Consolas,monospace;letter-spacing:.08em}.section-title h2{margin:0;color:#17384d;font-size:clamp(25px,3vw,38px);line-height:1.2}.pi-section>p{max-width:850px;margin:0;color:#5c707a;font-size:16px}.field-grid{display:grid;margin-top:23px;border-top:1px solid #d6e3e4}.field-row{display:grid;grid-template-columns:145px minmax(165px,.8fr) minmax(180px,1.2fr);gap:20px;align-items:center;min-height:60px;padding:10px 0;border-bottom:1px solid #e4ecec}.field-row strong{color:#345363;font-size:13px}.field-row code,.path-chip code,.key-grid code,.model-callout code,.command-row code{overflow-wrap:anywhere;color:#1a5e4c;font:750 13px Consolas,monospace}.field-row small{color:#75878b;font-size:12px}.path-chip{display:inline-flex;align-items:center;gap:9px;margin-top:23px;padding:10px 13px;border:1px solid #c6ddd4;border-radius:5px;color:#1b765c;background:#f1faf6}.pi-steps{display:grid;gap:9px;margin:21px 0 0;padding:0 0 0 22px;color:#526a72;font-size:14px}.pi-steps li::marker{color:#1b9870;font-weight:850}.pi-note{display:grid;grid-template-columns:22px 1fr;gap:10px;margin-top:22px;padding:13px 15px;border:1px solid #cbdde7;border-radius:6px;color:#365c70;background:#f1f8fc}.pi-note p{margin:0;font-size:13px}.pi-note strong{margin-right:4px}.code-card{margin-top:23px;overflow:hidden;border:1px solid #274653;border-radius:7px;background:#152c36}.code-head{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #2a4a56;color:#a9c6c3;font:12px Consolas,monospace}.code-head button{display:inline-flex;align-items:center;gap:6px;padding:5px 9px;border:1px solid #486c72;border-radius:4px;color:#e4f4ef;background:#21424d;font:750 12px inherit;cursor:pointer}.code-head button:hover{border-color:#8dd6ba}.code-card pre{margin:0;padding:18px;overflow:auto}.key-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px;margin-top:18px}.key-grid div{display:grid;gap:4px;padding:11px 13px;border:1px solid #d8e5e5;border-radius:5px;background:#fbfdfd}.key-grid span{color:#64777d;font-size:12px}.model-callout{display:flex;align-items:center;gap:16px;margin-top:23px;padding:17px;border:1px solid #c5e1d5;border-radius:6px;background:#f1faf6}.model-id{display:grid;place-items:center;width:54px;height:54px;border-radius:5px;color:#fff;background:#1b9870;font:850 10px/1.25 Consolas,monospace;text-align:center}.model-callout p{margin:4px 0 0;color:#57756b;font-size:13px}.checks{display:grid;gap:9px;margin:20px 0 0;padding:0;list-style:none}.checks li{display:flex;gap:8px;align-items:flex-start;color:#3d5d59;font-size:14px}.checks svg{flex:0 0 auto;margin-top:4px;color:#1d9a70}.run-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:23px}.run-grid div{padding:14px;border:1px solid #d8e5e5;border-radius:6px;background:#fbfdfd}.run-grid span{color:#1b9870;font:850 11px Consolas,monospace}.run-grid p{margin:8px 0 0;color:#4d6670;font-size:13px}.command-row{display:flex;align-items:center;gap:12px;margin-top:16px;padding:11px 13px;border:1px solid #d8e5e5;border-radius:5px;background:#f7fbfa}.command-row span{color:#64777d;font-size:12px}.faq{display:grid;gap:8px;margin-top:22px}.faq details{border:1px solid #d9e4e5;border-radius:6px;background:#fbfdfd}.faq details[open]{border-color:#bcdace;background:#f9fdfb}.faq summary{display:flex;justify-content:space-between;gap:15px;padding:13px 16px;color:#345562;font-size:14px;font-weight:800;cursor:pointer;list-style:none}.faq summary::-webkit-details-marker{display:none}.faq summary svg{flex:0 0 auto}.faq details p{margin:0;padding:0 16px 15px;color:#64777d;font-size:13px}.checks--two{grid-template-columns:1fr 1fr;column-gap:22px}.reference{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:24px;padding-top:17px;border-top:1px solid #dce9e4;color:#7a8f8e;font-size:12px}.reference a{display:inline-flex;align-items:center;gap:5px;color:#16745a;font-weight:750}.support-modal{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:24px;background:rgba(18,39,48,.56);backdrop-filter:blur(10px)}.support-modal-card{width:min(420px,100%);overflow:hidden;border:1px solid #d6e2e4;border-radius:8px;background:#fff}.support-modal-head{display:flex;justify-content:space-between;padding:17px 20px;border-bottom:1px solid #e0e8e9}.support-modal-head h2{margin:0;font-size:20px}.support-modal-head button{border:0;background:none;font-size:24px;cursor:pointer}.support-modal-body{display:grid;justify-items:center;gap:14px;padding:24px;text-align:center}.support-modal-body img{width:100%;max-width:280px}.support-modal-body p{margin:0;color:#65767d;font-size:13px}@media(max-width:980px){.pi-hero{grid-template-columns:1fr;gap:30px;padding-top:52px}.pi-terminal{max-width:650px}.pi-index{display:none}.pi-shell{display:block}}@media(max-width:700px){.pi-hero,.pi-jump,.pi-shell{width:min(100% - 24px,1240px)}.pi-hero{padding:36px 0}.pi-hero h1{font-size:clamp(36px,10vw,54px)}.pi-intro{font-size:16px}.field-row{grid-template-columns:1fr;gap:3px;padding:13px 0}.key-grid,.checks--two{grid-template-columns:1fr}.run-grid{grid-template-columns:1fr 1fr}.pi-section{padding:22px 18px}}@media(max-width:460px){.run-grid{grid-template-columns:1fr}.pi-tags{display:grid}.pi-tags span{width:max-content}}
</style>
