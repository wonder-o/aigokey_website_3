<template>
  <div class="claude-page">
    <SiteHeader @trial="showSupport = true" />

    <main id="top">
      <section class="claude-hero">
        <div>
          <p class="eyebrow">Claude Code · Claude Desktop · CC Switch</p>
          <h1>在 Claude Code 和 Claude Desktop 中使用 AIGOKEY</h1>
          <p class="hero-copy">通过 CC Switch 配置 AIGOKEY，让 Claude Code 和 Claude Desktop 使用 AIGOKEY 提供的第三方模型。两个应用分别管理配置，按本文操作即可完成接入、测试与排错。</p>
          <div class="hero-tags"><span><Terminal :size="15" />Claude Code</span><span><Monitor :size="15" />Claude Desktop</span><span><KeyRound :size="15" />AIGOKEY API</span></div>
        </div>

        <aside class="connection-card" aria-label="配置路径概览">
          <div class="card-label"><span class="status-dot"></span> CONFIGURATION MAP <span class="ready">READY</span></div>
          <div class="flow-row"><span>CC Switch</span><ArrowRight :size="16" /><span>Claude Code</span></div>
          <div class="flow-row"><span>CC Switch</span><ArrowRight :size="16" /><span>Claude Desktop</span></div>
          <dl>
            <div><dt>API 地址</dt><dd>llm.aigokey.cn</dd></div>
            <div><dt>协议建议</dt><dd>Anthropic Messages</dd></div>
          </dl>
          <p>两套配置相互独立；桌面端切换后需要重启。</p>
        </aside>
      </section>

      <nav class="jumpbar" aria-label="教程目录">
        <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)"><span>{{ item.number }}</span>{{ item.label }}</a>
      </nav>

      <div class="tutorial-layout">
        <aside class="side-index">
          <p class="side-label">教程目录</p>
          <a v-for="item in toc" :key="item.id" :href="`#${item.id}`" @click.prevent="scrollToSection(item.id)">{{ item.number }} {{ item.label }}<ChevronRight :size="14" /></a>
          <a class="back-top" href="#top" @click.prevent="scrollToSection('top')">返回顶部</a>
        </aside>

        <article class="guide">
          <section id="prepare" class="guide-section">
            <SectionHeading number="01" title="准备配置参数" />
            <p class="lead">在 AIGOKEY 后台创建 API 密钥，并准备以下信息。请将示例密钥替换为真实密钥。</p>
            <div class="parameter-table">
              <div v-for="row in parameters" :key="row.label" class="parameter-row"><span class="parameter-label">{{ row.label }}</span><code>{{ row.value }}</code><span class="parameter-note">{{ row.note }}</span></div>
            </div>
            <div class="info-note info-note--amber"><ShieldAlert :size="18" /><div><strong>安全提示</strong><p>不要把真实 API 密钥发布到文章、截图、GitHub 仓库或聊天记录中。</p></div></div>
          </section>

          <section id="install" class="guide-section">
            <SectionHeading number="02" title="安装 CC Switch" />
            <p class="lead">从 CC Switch 官网或 GitHub Releases 下载对应系统版本并安装。Claude Desktop 的第三方 3P Profile 目前主要支持 Windows 和 macOS。</p>
            <div class="link-panel"><div><Globe :size="17" /><span>官方资源</span></div><a href="https://ccswitch.io/" target="_blank" rel="noopener">CC Switch 官网 <ArrowUpRight :size="15" /></a><a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">GitHub Releases <ArrowUpRight :size="15" /></a></div>
            <div class="info-note"><Download :size="18" /><div><strong>安装完成后</strong><p>启动 CC Switch，后续 Claude Code 与 Claude Desktop 都在同一个左侧应用切换器中分别配置。</p></div></div>
          </section>

          <section id="code" class="guide-section">
            <SectionHeading number="03" title="在 Claude Code 中配置 AIGOKEY" />
            <p class="lead">Claude Code 在 CC Switch 中显示为“Claude”。它使用自己的配置文件，与 Claude Desktop 的 3P Profile 相互独立。</p>
            <div class="step-grid">
              <div v-for="step in codeSteps" :key="step.title" class="step-card"><span class="step-number">{{ step.number }}</span><div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></div></div>
            </div>
            <div class="code-block"><div class="code-head"><span>供应商参数</span><button type="button" @click="copyText(codeConfig, $event)"><Copy :size="15" /><span>复制</span></button></div><pre><code>{{ codeConfig }}</code></pre></div>
            <div class="subsection-heading"><Terminal :size="19" /><div><h3>验证 Claude Code</h3><p>配置启用后，重新打开终端或重启 Claude Code。</p></div></div>
            <ol class="test-steps"><li><code>claude</code> 启动 Claude Code</li><li>发送“请简单介绍一下你自己。”</li><li>输入 <code>/model</code> 查看模型菜单</li></ol>
          </section>

          <section id="desktop" class="guide-section">
            <SectionHeading number="04" title="在 Claude Desktop 中配置 AIGOKEY" />
            <p class="lead">Claude Desktop 需要单独配置，不能直接沿用 Claude Code 当前启用的供应商。</p>
            <ol class="steps"><li>在 CC Switch 左侧应用切换器中选择“Claude Desktop”，点击右上角“+”添加自定义供应商。</li><li>若看不到入口，前往“设置 → 通用 → 应用可见性”，确认 Claude Desktop 没有被隐藏。</li><li>填写 AIGOKEY 参数，API 格式按实际支持协议选择；Anthropic Messages 是常用默认格式。</li><li>点击“获取模型”自动读取模型，或手动填入 AIGOKEY 后台提供的真实模型 ID。</li><li>在供应商卡片上点击“启用”，然后完全退出并重新打开 Claude Desktop。</li></ol>
            <div class="code-block compact"><div class="code-head"><span>Claude Desktop 参数</span><button type="button" @click="copyText(codeConfig, $event)"><Copy :size="15" /><span>复制</span></button></div><pre><code>{{ codeConfig }}</code></pre></div>
            <div class="method-grid">
              <div class="method-panel"><div class="method-top"><span class="method-index">A</span><h3>直连模式</h3></div><p>当返回模型名属于 <code>claude-sonnet-*</code>、<code>claude-opus-*</code> 或 <code>claude-haiku-*</code>，且接口原生支持 Anthropic Messages API 时，关闭“需要模型映射”后直接添加。</p></div>
              <div class="method-panel method-panel--primary"><div class="method-top"><span class="method-index">B</span><h3>模型映射模式</h3></div><p>当返回的是 GPT、DeepSeek、Kimi 或其他非 Claude 模型名时，开启“需要模型映射”，将 Sonnet / Opus / Haiku 角色映射到 AIGOKEY 的真实模型 ID。</p></div>
            </div>
            <div class="mapping-table"><div class="mapping-row mapping-head"><span>模型角色</span><span>菜单显示名</span><span>实际请求模型</span></div><div class="mapping-row"><strong>Sonnet</strong><span>AIGOKEY</span><code>AIGOKEY 实际模型 ID</code></div><div class="mapping-row"><strong>Opus / Haiku</strong><span>按需命名</span><code>对应的真实模型 ID</code></div></div>
            <div class="info-note info-note--green"><Route :size="18" /><div><strong>模型映射需要本地路由</strong><p>进入“设置 → 路由 → 本地路由”，开启“在主页面显示本地路由开关”，回到 Claude Desktop 面板后开启“Claude Desktop 本地路由”。使用期间保持 CC Switch 运行。</p></div></div>
          </section>

          <section id="modes" class="guide-section">
            <SectionHeading number="05" title="两种模式的区别" />
            <div class="mode-table"><div class="mode-row mode-head"><span>模式</span><span>本地路由</span><span>是否需要重启 Claude Desktop</span></div><div class="mode-row"><strong>直连模式</strong><span>不需要</span><span>需要</span></div><div class="mode-row"><strong>模型映射模式</strong><span>需要，并保持 CC Switch 运行</span><span>需要</span></div></div>
          </section>

          <section id="faq" class="guide-section">
            <SectionHeading number="06" title="常见问题" />
            <div class="faq-list"><details v-for="(item, index) in faqs" :key="item.question" :open="index === 0"><summary><span>{{ item.question }}</span><ChevronRight :size="17" /></summary><p>{{ item.answer }}</p></details></div>
          </section>

          <section id="checklist" class="guide-section guide-section--final">
            <SectionHeading number="07" title="配置完成后的使用方式" />
            <p class="lead">完成配置后，按使用场景选择对应面板。API 密钥由 CC Switch 保存和管理，不建议手动修改 Claude 或 Claude Desktop 配置文件。</p>
            <ul class="checklist"><li v-for="item in checklist" :key="item"><span><Check :size="15" /></span>{{ item }}</li></ul>
            <div class="reference-line"><span>参考文档</span><a href="https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md" target="_blank" rel="noopener">CC Switch 添加供应商 <ArrowUpRight :size="15" /></a><a href="https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.6-claude-desktop.md" target="_blank" rel="noopener">Claude Desktop 配置 <ArrowUpRight :size="15" /></a></div>
          </section>
        </article>
      </div>
    </main>

    <SiteFooter />
    <Teleport to="body"><div v-if="showSupport" class="support-modal" @click.self="showSupport = false"><div class="support-modal-card"><div class="support-modal-head"><h2>添加客服免费开通体验</h2><button type="button" aria-label="关闭" @click="showSupport = false"><X :size="20" /></button></div><div class="support-modal-body"><img src="/assets/customer-service-qr.png" alt="联系客服微信二维码" /><p>扫码添加客服，免费开通体验并确认可用额度。</p></div></div></div></Teleport>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Copy, Download, Globe, KeyRound, Monitor, Route, ShieldAlert, Terminal, X } from '@lucide/vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'

const showSupport = ref(false)
useHead({
  title: '在 Claude Code 和 Claude Desktop 中使用 AIGOKEY - AIGOKEY',
  meta: [
    { name: 'description', content: '通过 CC Switch 配置 AIGOKEY，在 Claude Code 和 Claude Desktop 中使用第三方模型，包含参数准备、模型映射、本地路由和常见问题。' },
    { property: 'og:title', content: '在 Claude Code 和 Claude Desktop 中使用 AIGOKEY - AIGOKEY' },
    { property: 'og:description', content: '从安装 CC Switch 到完成 Claude Code 与 Claude Desktop 配置的完整教程。' },
    { property: 'og:type', content: 'article' },
  ],
})
const toc = [
  { id: 'prepare', number: '01', label: '准备参数' }, { id: 'install', number: '02', label: '安装 CC Switch' }, { id: 'code', number: '03', label: 'Claude Code' }, { id: 'desktop', number: '04', label: 'Claude Desktop' }, { id: 'modes', number: '05', label: '模式区别' }, { id: 'faq', number: '06', label: '常见问题' }, { id: 'checklist', number: '07', label: '完成配置' },
]
const parameters = [
  { label: '显示名称', value: 'AIGOKEY', note: '供应商列表中显示的名称。' },
  { label: 'API 地址', value: 'https://llm.aigokey.cn', note: '填写基础地址，不要自行追加 /v1。' },
  { label: 'API 密钥', value: 'sk-你的API密钥', note: '替换为真实密钥，前后不要加空格或引号。' },
]
const codeConfig = '显示名称：AIGOKEY\nAPI 地址：https://llm.aigokey.cn\nAPI 密钥：sk-你的API密钥\nAPI 格式：Anthropic Messages'
const codeSteps = [
  { number: '01', title: '打开 Claude 供应商面板', text: '在左侧应用切换器选择“Claude”，它对应 Claude Code。点击右上角“+”，建议选择“应用专属供应商”。' },
  { number: '02', title: '添加自定义供应商', text: '选择“自定义”或 Custom，填入 AIGOKEY 的显示名称、API 地址和 API 密钥。' },
  { number: '03', title: '选择 API 格式', text: 'AIGOKEY 提供 Anthropic Messages 兼容接口时选择该格式。若客服明确要求 OpenAI Chat Completions 或 Responses API，再按要求切换。' },
  { number: '04', title: '获取或填写模型', text: '点击模型输入框旁的“获取模型”。失败时手动填写 AIGOKEY 后台或客服提供的真实模型 ID。' },
  { number: '05', title: '启用供应商', text: '在供应商列表找到 AIGOKEY 并点击“启用”。Claude Code 支持热加载，但已打开的终端建议重新打开。' },
]
const faqs = [
  { question: '返回 401 或 INVALID_API_KEY 怎么办？', answer: '通常是 API 密钥错误、复制不完整或已经失效。重新复制 sk-你的API密钥，确认没有多余空格、换行或引号。' },
  { question: '返回 404 怎么办？', answer: '优先确认 API 地址为 https://llm.aigokey.cn，不要自行添加 /v1，除非 AIGOKEY 官方文档明确要求。' },
  { question: 'Claude Desktop 没有变化？', answer: '确认在 Claude Desktop 面板启用了 AIGOKEY，完全退出并重启 Claude Desktop；模型映射模式还要确认 CC Switch 与本地路由仍在运行。' },
  { question: '模型名称不被 Claude Desktop 接受？', answer: 'Claude Desktop 只接受 Sonnet、Opus、Haiku 三类角色模型。非 claude-* 模型请开启“需要模型映射”，填入真实模型 ID。' },
  { question: '获取模型列表失败？', answer: '可能是 AIGOKEY 暂未开放模型列表接口，或地址与协议不一致。可以手动填写模型 ID，并联系 AIGOKEY 获取可用模型名称和接口协议。' },
]
const checklist = ['Claude Code：在 CC Switch 的“Claude”面板中启用 AIGOKEY。', 'Claude Desktop：在“Claude Desktop”面板中启用 AIGOKEY。', '直连模式：重启 Claude Desktop 后即可使用。', '模型映射模式：保持 CC Switch 和本地路由运行。', 'API 密钥交由 CC Switch 保存和管理，不手动修改配置文件。']

const SectionHeading = defineComponent({ props: { number: { type: String, required: true }, title: { type: String, required: true } }, setup: (props) => () => h('div', { class: 'section-head' }, [h('span', props.number), h('h2', props.title)]) })

function scrollToSection(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
async function copyText(text: string, event: Event) { const button = event.currentTarget as HTMLButtonElement; const label = button.querySelector('span'); if (!label) return; const original = label.textContent || '复制'; try { await navigator.clipboard.writeText(text); label.textContent = '已复制' } catch { label.textContent = '请手动复制' } window.setTimeout(() => { label.textContent = original }, 1400) }
function handleEscape(event: KeyboardEvent) { if (event.key === 'Escape') showSupport.value = false }
onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))
</script>

<style scoped>
.claude-page { min-height: 100vh; color: #243440; background: #f7f6f3; font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif; line-height: 1.72; }
.claude-page a { color: #a4553d; text-underline-offset: 4px; }
.claude-page img { display: block; max-width: 100%; height: auto; }
main { padding-bottom: 88px; }
.claude-hero, .jumpbar, .tutorial-layout { width: min(1240px, calc(100% - 48px)); margin: 0 auto; }
.claude-hero { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(330px, .85fr); align-items: end; gap: 70px; padding: 76px 0 60px; }
.eyebrow { margin: 0 0 16px; color: #b76043; font-size: 12px; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
h1 { max-width: 780px; margin: 0; color: #1e303d; font-size: clamp(38px, 5.2vw, 70px); line-height: 1.08; letter-spacing: -.02em; }
.hero-copy { max-width: 730px; margin: 24px 0 0; color: #5d6c73; font-size: 18px; line-height: 1.75; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 28px; }
.hero-tags span { display: inline-flex; align-items: center; gap: 7px; min-height: 31px; padding: 0 10px; border: 1px solid #e5c5b8; border-radius: 5px; color: #92513e; background: #fff1eb; font-size: 12px; font-weight: 750; }
.connection-card { padding: 20px; border: 1px solid #e2c8bd; border-radius: 8px; background: #fff; box-shadow: 0 18px 42px rgba(91, 55, 43, .09); }
.card-label { display: flex; align-items: center; gap: 8px; padding-bottom: 16px; border-bottom: 1px solid #eee0db; color: #786d68; font-size: 11px; font-weight: 850; letter-spacing: .1em; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #b76043; box-shadow: 0 0 0 4px rgba(183,96,67,.14); }.ready { margin-left: auto; color: #b76043; font-size: 10px; }
.flow-row { display: grid; grid-template-columns: 1fr auto 1.15fr; align-items: center; gap: 9px; padding-top: 17px; color: #795e54; font-size: 12px; }.flow-row span { padding: 8px 7px; border: 1px solid #ead8d1; border-radius: 4px; color: #8b4f3a; background: #fff9f6; font-weight: 800; text-align: center; }
.connection-card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 18px 0 0; padding-top: 15px; border-top: 1px solid #eee0db; }.connection-card dt { color: #927f78; font-size: 10px; font-weight: 750; }.connection-card dd { margin: 3px 0 0; overflow-wrap: anywhere; color: #754939; font-family: Consolas, monospace; font-size: 11px; font-weight: 700; }.connection-card > p { margin: 15px 0 0; color: #7e716d; font-size: 12px; }
.jumpbar { display: flex; gap: 6px; padding: 9px; overflow-x: auto; border: 1px solid #e4ded9; border-radius: 7px; background: #fff; box-shadow: 0 8px 22px rgba(62, 51, 44, .05); scrollbar-width: none; }.jumpbar::-webkit-scrollbar { display: none; }.jumpbar a { display: inline-flex; align-items: center; gap: 7px; flex: 0 0 auto; min-height: 34px; padding: 0 10px; border-radius: 4px; color: #6d7474; font-size: 12px; font-weight: 750; text-decoration: none; }.jumpbar a span { color: #b76043; font-family: Consolas, monospace; font-size: 10px; }.jumpbar a:hover, .jumpbar a:focus-visible { color: #8f4935; background: #fff1eb; outline: none; }
.tutorial-layout { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 28px; align-items: start; padding-top: 28px; }.side-index { position: sticky; top: 102px; display: grid; gap: 2px; padding: 12px 0; }.side-label { margin: 0 0 10px; color: #9b918c; font-size: 10px; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }.side-index a { display: flex; align-items: center; justify-content: space-between; gap: 5px; min-height: 32px; padding: 0 8px; border-left: 2px solid transparent; color: #687576; font-size: 12px; text-decoration: none; }.side-index a:hover, .side-index a:focus-visible { border-color: #b76043; color: #8f4935; background: #fff1eb; outline: none; }.side-index a svg { opacity: 0; }.side-index a:hover svg, .side-index a:focus-visible svg { opacity: 1; }.side-index .back-top { margin-top: 13px; border-top: 1px solid #e2dcd8; border-left: 0; color: #a4553d; font-size: 11px; }
.guide { display: grid; gap: 18px; min-width: 0; }.guide-section { scroll-margin-top: 98px; padding: clamp(24px, 3.2vw, 42px); border: 1px solid #e2dcd8; border-radius: 8px; background: #fff; box-shadow: 0 12px 30px rgba(62, 51, 44, .045); }.guide-section--final { border-color: #e2c8bd; background: #fffaf7; }.section-head { display: grid; gap: 5px; margin-bottom: 18px; }.section-head > span { color: #b76043; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; letter-spacing: .08em; }.section-head h2 { margin: 0; color: #283b48; font-size: clamp(25px, 3vw, 38px); line-height: 1.2; letter-spacing: -.015em; }.lead { max-width: 850px; margin: 0; color: #667478; font-size: 16px; }
.parameter-table { display: grid; margin-top: 24px; border-top: 1px solid #e4ded9; }.parameter-row { display: grid; grid-template-columns: 145px minmax(220px, .95fr) minmax(210px, 1.05fr); gap: 20px; align-items: center; min-height: 62px; padding: 10px 0; border-bottom: 1px solid #eee9e5; }.parameter-label { color: #445b64; font-size: 13px; font-weight: 850; }.parameter-row code { overflow-wrap: anywhere; color: #8e4b37; font-family: Consolas, monospace; font-size: 13px; font-weight: 750; }.parameter-note { color: #7c8889; font-size: 12px; }
.link-panel { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 24px; padding: 14px 16px; border: 1px solid #ead8d1; border-radius: 6px; background: #fffaf7; }.link-panel > div { display: inline-flex; align-items: center; gap: 8px; color: #765b53; font-size: 12px; font-weight: 800; }.link-panel a { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 750; }
.info-note { display: grid; grid-template-columns: 24px 1fr; gap: 11px; margin-top: 24px; padding: 15px 16px; border: 1px solid #d8e3e5; border-radius: 6px; color: #486675; background: #f3f8fa; }.info-note--amber { border-color: #ead9b8; color: #8b632c; background: #fff9ed; }.info-note--green { border-color: #d8dfc9; color: #536b43; background: #f5f9ef; }.info-note strong { color: inherit; font-size: 13px; }.info-note p { margin: 3px 0 0; color: inherit; font-size: 13px; }
.step-grid { display: grid; gap: 10px; margin-top: 24px; }.step-card { display: grid; grid-template-columns: 34px 1fr; gap: 12px; align-items: start; padding: 14px 15px; border: 1px solid #ebe4e0; border-radius: 6px; background: #fffdfc; }.step-number { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; color: #a6533c; background: #fff0e9; font-family: Consolas, monospace; font-size: 10px; font-weight: 850; }.step-card h3 { margin: 1px 0 3px; color: #3d5059; font-size: 15px; }.step-card p { margin: 0; color: #68777b; font-size: 13px; }
.code-block { margin-top: 24px; overflow: hidden; border: 1px solid #3d4b53; border-radius: 7px; background: #1f2c33; }.code-block.compact { margin-top: 24px; }.code-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 16px; border-bottom: 1px solid #41535a; color: #e8efed; font-size: 12px; font-weight: 800; }.code-head button { display: inline-flex; align-items: center; gap: 6px; min-height: 30px; padding: 0 9px; border: 1px solid #667a7e; border-radius: 4px; color: #edf4f1; background: #304249; font: inherit; font-size: 11px; cursor: pointer; }.code-head button:hover { border-color: #e7b5a3; background: #42555c; }.code-block pre { margin: 0; padding: 17px; overflow-x: auto; }.code-block code { color: #f3d9cd; font-family: Consolas, monospace; font-size: 12px; line-height: 1.8; white-space: pre; }
.subsection-heading { display: flex; align-items: flex-start; gap: 12px; margin-top: 32px; padding-top: 28px; border-top: 1px solid #e8e0dc; color: #b76043; }.subsection-heading h3 { margin: 0; color: #344b56; font-size: 19px; }.subsection-heading p { margin: 4px 0 0; color: #718083; font-size: 13px; }.test-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 24px 0 0; padding: 0; list-style: none; }.test-steps li { min-width: 0; padding: 14px; border: 1px solid #ebe3df; border-radius: 6px; color: #5e6f74; background: #fffdfc; font-size: 13px; }.test-steps code { color: #8e4b37; font-family: Consolas, monospace; font-weight: 750; }
.steps { display: grid; gap: 12px; margin: 24px 0 0; padding: 0; list-style: none; counter-reset: step; }.steps li { position: relative; display: grid; grid-template-columns: 30px 1fr; gap: 12px; align-items: start; color: #4b6069; font-size: 15px; counter-increment: step; }.steps li::before { display: grid; width: 28px; height: 28px; place-items: center; border: 1px solid #e4c3b5; border-radius: 50%; color: #a6533c; background: #fff5f0; content: counter(step, decimal-leading-zero); font-family: Consolas, monospace; font-size: 10px; font-weight: 850; }.steps code { color: #8e4b37; font-family: Consolas, monospace; font-size: .92em; font-weight: 750; }
.method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 24px; }.method-panel { padding: 18px; border: 1px solid #e5dfdb; border-radius: 6px; background: #fffdfc; }.method-panel--primary { border-color: #e5c5b8; background: #fff8f4; }.method-top { display: flex; align-items: flex-start; gap: 10px; }.method-index { display: grid; width: 26px; height: 26px; flex: 0 0 auto; place-items: center; border-radius: 4px; color: #fff; background: #b76043; font-family: Consolas, monospace; font-size: 12px; font-weight: 850; }.method-panel:not(.method-panel--primary) .method-index { color: #5e6c70; background: #ebe5e1; }.method-top h3 { margin: 1px 0 0; color: #344b56; font-size: 16px; }.method-panel p { margin: 15px 0 0; color: #657477; font-size: 13px; }.method-panel code { color: #8e4b37; font-family: Consolas, monospace; font-size: 12px; }
.mapping-table { display: grid; margin-top: 14px; border: 1px solid #e5dfdb; border-radius: 6px; overflow: hidden; }.mapping-row { display: grid; grid-template-columns: 1fr 1fr 1.3fr; gap: 14px; align-items: center; min-height: 48px; padding: 8px 14px; border-bottom: 1px solid #eee8e4; color: #667579; font-size: 12px; }.mapping-row:last-child { border-bottom: 0; }.mapping-row strong { color: #475d66; }.mapping-row code { overflow-wrap: anywhere; color: #8e4b37; font-family: Consolas, monospace; font-size: 11px; }.mapping-head { min-height: 40px; color: #836e67; background: #fff8f4; font-size: 11px; font-weight: 850; }
.mode-table { display: grid; margin-top: 24px; border: 1px solid #e2dcd8; border-radius: 6px; overflow: hidden; }.mode-row { display: grid; grid-template-columns: 1.1fr 1fr 1.2fr; gap: 16px; align-items: center; min-height: 54px; padding: 9px 16px; border-bottom: 1px solid #eee8e4; color: #657477; font-size: 13px; }.mode-row:last-child { border-bottom: 0; }.mode-row strong { color: #425862; }.mode-head { min-height: 44px; color: #836e67; background: #fff8f4; font-size: 11px; font-weight: 850; }
.faq-list { display: grid; gap: 8px; margin-top: 24px; }.faq-list details { border: 1px solid #e3ddda; border-radius: 6px; background: #fffdfc; }.faq-list details[open] { border-color: #e5c5b8; background: #fffaf7; }.faq-list summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 54px; padding: 0 16px; color: #425962; font-size: 14px; font-weight: 800; cursor: pointer; list-style: none; }.faq-list summary::-webkit-details-marker { display: none; }.faq-list summary svg { flex: 0 0 auto; color: #8b7770; transition: transform .2s ease; }.faq-list details[open] summary svg { color: #b76043; transform: rotate(90deg); }.faq-list details p { margin: 0; padding: 0 16px 16px; color: #68777b; font-size: 13px; }
.checklist { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 22px; margin: 24px 0 0; padding: 0; list-style: none; }.checklist li { display: flex; align-items: flex-start; gap: 9px; color: #4e6468; font-size: 14px; }.checklist li > span { display: grid; width: 22px; height: 22px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #fff; background: #b76043; }.reference-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; margin-top: 26px; padding-top: 18px; border-top: 1px solid #eaded9; color: #8d7d77; font-size: 12px; }.reference-line a { display: inline-flex; align-items: center; gap: 5px; font-weight: 750; }
.support-modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px; background: rgba(31, 39, 43, .58); backdrop-filter: blur(10px); }.support-modal-card { width: min(420px, 100%); overflow: hidden; border: 1px solid #e2dcd8; border-radius: 8px; background: #fff; box-shadow: 0 28px 80px rgba(31, 39, 43, .28); }.support-modal-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px 20px; border-bottom: 1px solid #eee8e4; }.support-modal-head h2 { margin: 0; font-size: 20px; }.support-modal-head button { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #e2dcd8; border-radius: 5px; color: #586a70; background: #fff; cursor: pointer; }.support-modal-body { display: grid; justify-items: center; gap: 14px; padding: 24px; text-align: center; }.support-modal-body img { width: 100%; max-width: 280px; border: 1px solid #e2dcd8; border-radius: 6px; }.support-modal-body p { margin: 0; color: #6b797d; font-size: 13px; }
@media (max-width: 980px) { .claude-hero { grid-template-columns: 1fr; gap: 28px; padding-top: 52px; }.connection-card { max-width: 650px; }.side-index { display: none; }.tutorial-layout { display: block; } }
@media (max-width: 700px) { .claude-hero, .jumpbar, .tutorial-layout { width: min(100% - 24px, 1240px); }.claude-hero { padding: 36px 0 38px; } h1 { font-size: 39px; }.hero-copy { font-size: 16px; }.guide-section { padding: 28px 18px; }.section-head h2 { font-size: 27px; }.parameter-row, .mode-row, .mapping-row { grid-template-columns: 1fr; gap: 4px; padding: 14px 0; }.parameter-note { font-size: 12px; }.method-grid, .checklist { grid-template-columns: 1fr; }.test-steps { grid-template-columns: 1fr 1fr; }.mode-head, .mapping-head { display: none; } }
@media (max-width: 460px) { h1 { font-size: 34px; }.hero-tags { display: grid; }.hero-tags span { width: fit-content; }.connection-card dl, .test-steps { grid-template-columns: 1fr; }.flow-row { grid-template-columns: 1fr auto 1fr; }.link-panel { display: grid; }.test-steps { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
</style>
