<template>
  <div class="config-guides" :class="{ 'config-guides--embedded': embedded }">
    <main id="top" class="config-guides__main">
      <section class="config-hero" aria-labelledby="page-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="eyebrow-mark"></span>AIGOKEY / CONFIGURATION DESK</p>
          <h1 id="page-title">选择你的配置教程</h1>
          <p class="hero-lead">从常用开发工具到 AI 工作台，选择正在使用的产品，按步骤接入 AIGOKEY。</p>
          <div class="hero-meta" aria-label="教程信息">
            <span><strong>06</strong> 个配置入口</span>
            <span class="meta-divider" aria-hidden="true"></span>
            <span>持续更新中</span>
          </div>
        </div>
        <div class="hero-signal" aria-hidden="true">
          <span class="signal-line signal-line--one"></span>
          <span class="signal-line signal-line--two"></span>
          <span class="signal-node signal-node--one"></span>
          <span class="signal-node signal-node--two"></span>
          <span class="signal-node signal-node--three"></span>
          <span class="signal-label">SETUP / READY</span>
        </div>
      </section>

      <section class="guide-board" aria-labelledby="board-title">
        <div class="board-heading">
          <div>
            <p class="board-kicker">配置入口 / SETUP ROUTES</p>
            <h2 id="board-title">找到对应的工具，开始配置</h2>
          </div>
          <p class="board-note">每个入口都会在新页面打开完整配置方法。</p>
        </div>

        <div class="guide-grid">
          <router-link
            v-for="(guide, index) in guides"
            :key="guide.path"
            class="guide-card"
            :class="`guide-card--${guide.tone}`"
            :to="guide.path"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="guide-card__index">0{{ index + 1 }}</span>
            <span class="guide-card__icon" :class="{ 'guide-card__icon--letter': guide.letter }">
              <img v-if="guide.logo" :src="guide.logo" :alt="`${guide.name} logo`" />
              <span v-else aria-hidden="true">{{ guide.letter }}</span>
            </span>
            <span class="guide-card__content">
              <strong>{{ guide.name }}</strong>
              <span>{{ guide.description }}</span>
            </span>
            <span class="guide-card__action" aria-hidden="true">进入教程 <ArrowUpRight :size="17" /></span>
          </router-link>
        </div>
      </section>

      <section class="config-footnote" aria-label="配置提示">
        <KeyRound :size="18" aria-hidden="true" />
        <p>开始前请准备好 AIGOKEY API 密钥。密钥只填写在对应客户端的本地配置中，请勿发布到截图、仓库或聊天记录。</p>
      </section>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ArrowUpRight, KeyRound } from '@lucide/vue'
import { useHead } from '@unhead/vue'

withDefaults(defineProps<{ embedded?: boolean }>(), { embedded: false })

useHead({
  title: 'AI 工具配置教程导航 - AIGOKEY',
  meta: [
    { name: 'description', content: '选择 Codex、Claude Code、DeepSeek Harness、Pi、WorkBuddy 或 Trae，查看 AIGOKEY 对应的配置教程。' },
    { property: 'og:title', content: 'AI 工具配置教程导航 - AIGOKEY' },
    { property: 'og:description', content: '六个常用 AI 工具的 AIGOKEY 配置入口，点击即可进入对应教程。' },
  ],
})

const guides: Array<{ name: string; description: string; path: string; logo?: string; letter?: string; tone: string }> = [
  { name: 'Codex 配置教程', description: 'ChatGPT Codex App、CLI 与 VS Code', path: '/codex-help/', logo: '/assets/brand-logos/openai.svg', tone: 'blue' },
  { name: 'Claude Code 配置教程', description: 'Claude Code 与 Claude Desktop', path: '/claude-code-config/', logo: '/assets/brand-logos/claude-code.png', tone: 'sand' },
  { name: 'DeepSeek Harness 配置教程', description: 'DeepSeek Harness 自定义模型', path: '/deepseek-harness/', logo: '/assets/brand-logos/deepseek.svg', tone: 'cyan' },
  { name: 'Pi 配置教程', description: 'Pi 终端工作台与模型接入', path: '/pi-config/', letter: 'π', tone: 'violet' },
  { name: 'WorkBuddy 配置教程', description: 'WorkBuddy 模型与密钥配置', path: '/workbuddy-config/', logo: '/assets/brand-logos/workbuddy.svg', tone: 'green' },
  { name: 'Trae 配置教程', description: 'TraeCode 与 TraeWork 自定义模型', path: '/trae-config/', logo: '/assets/brand-logos/trae.png', tone: 'orange' },
] as const
</script>

<style scoped>
.config-guides { min-height: 100vh; color: #173247; background: #f5f9fc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; }
.config-guides__main { width: min(1180px, calc(100% - 48px)); margin: 0 auto; padding: 68px 0 84px; }
.config-hero { position: relative; min-height: 320px; display: grid; grid-template-columns: minmax(0, 1fr) 310px; align-items: center; gap: 46px; padding: 48px 54px; overflow: hidden; border: 1px solid #183d5b; border-radius: 8px; color: #e9f6ff; background: #102c42; box-shadow: 0 24px 55px rgba(18, 57, 86, .15); }
.config-hero::before { position: absolute; inset: 0; background: linear-gradient(115deg, rgba(45, 183, 210, .14), transparent 42%); content: ''; pointer-events: none; }
.hero-copy { position: relative; z-index: 1; }
.eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 18px; color: #79d2db; font: 800 11px/1.2 Consolas, monospace; letter-spacing: .12em; }
.eyebrow-mark { width: 9px; height: 9px; border: 2px solid #73d8c2; border-radius: 50%; box-shadow: 0 0 0 4px rgba(115, 216, 194, .13); }
h1 { max-width: 720px; margin: 0; color: #f3fbff; font-size: clamp(39px, 5vw, 67px); line-height: 1.05; letter-spacing: 0; }
.hero-lead { max-width: 670px; margin: 22px 0 0; color: #afc9d7; font-size: 17px; line-height: 1.75; }
.hero-meta { display: flex; align-items: center; gap: 13px; margin-top: 30px; color: #8daebe; font-size: 12px; font-weight: 700; }
.hero-meta strong { color: #b9f282; font: 800 18px Consolas, monospace; }
.meta-divider { width: 34px; height: 1px; background: rgba(155, 200, 217, .38); }
.hero-signal { position: relative; align-self: stretch; min-height: 220px; border-left: 1px solid rgba(148, 204, 225, .2); }
.signal-line { position: absolute; height: 1px; background: linear-gradient(90deg, rgba(130, 224, 203, .78), rgba(130, 224, 203, 0)); transform-origin: left center; }
.signal-line--one { top: 34%; left: 10%; width: 76%; transform: rotate(-27deg); }
.signal-line--two { top: 61%; left: 12%; width: 73%; transform: rotate(19deg); }
.signal-node { position: absolute; width: 11px; height: 11px; border: 2px solid #97e3d0; border-radius: 50%; background: #102c42; box-shadow: 0 0 0 5px rgba(125, 214, 195, .1); }
.signal-node--one { top: 29%; left: 8%; }.signal-node--two { top: 57%; left: 47%; }.signal-node--three { top: 37%; right: 11%; }
.signal-label { position: absolute; right: 4%; bottom: 5%; color: #6d9aae; font: 700 10px Consolas, monospace; letter-spacing: .1em; }
.guide-board { margin-top: 42px; }
.board-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; padding-bottom: 18px; border-bottom: 1px solid #d7e4ec; }
.board-kicker { margin: 0 0 7px; color: #4d91b5; font: 800 11px Consolas, monospace; letter-spacing: .08em; }
.board-heading h2 { margin: 0; color: #173247; font-size: clamp(24px, 3vw, 34px); line-height: 1.2; }
.board-note { max-width: 280px; margin: 0 0 3px; color: #7890a0; font-size: 13px; line-height: 1.6; text-align: right; }
.guide-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 20px; }
.guide-card { position: relative; display: grid; grid-template-columns: 52px minmax(0, 1fr) auto; grid-template-rows: auto 1fr; gap: 0 14px; min-height: 190px; padding: 22px 20px 18px; overflow: hidden; border: 1px solid #d7e3eb; border-radius: 7px; color: #173247; background: #fff; box-shadow: 0 10px 24px rgba(31, 75, 106, .05); transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
.guide-card::before { position: absolute; inset: 0 auto 0 0; width: 4px; background: #3b92c6; content: ''; }
.guide-card:hover, .guide-card:focus-visible { border-color: #86bdd7; box-shadow: 0 16px 32px rgba(31, 75, 106, .12); outline: none; transform: translateY(-4px); }
.guide-card__index { grid-column: 1 / -1; margin-bottom: 15px; color: #8aa1ae; font: 700 11px Consolas, monospace; letter-spacing: .06em; }
.guide-card__icon { display: grid; width: 52px; height: 52px; place-items: center; border: 1px solid rgba(61, 146, 198, .18); border-radius: 7px; background: #edf8fe; }
.guide-card__icon img { width: 30px; height: 30px; object-fit: contain; }.guide-card__icon--letter { color: #6d57b2; font: 800 28px Georgia, serif; background: #f4efff; border-color: #ddd1fa; }
.guide-card__content { align-self: center; min-width: 0; }.guide-card__content strong { display: block; color: #1d3b50; font-size: 16px; line-height: 1.35; }.guide-card__content span { display: block; margin-top: 6px; color: #78909f; font-size: 12px; line-height: 1.5; }
.guide-card__action { grid-column: 2 / -1; display: inline-flex; align-items: center; justify-content: flex-end; gap: 5px; align-self: end; margin-top: 20px; color: #3b89b2; font-size: 11px; font-weight: 800; }
.guide-card--sand::before { background: #b8774a; }.guide-card--sand .guide-card__icon { background: #fff6ef; border-color: #f0d6c0; }.guide-card--cyan::before { background: #20a7ad; }.guide-card--cyan .guide-card__icon { background: #eafafa; border-color: #c3e9e9; }.guide-card--violet::before { background: #8067ca; }.guide-card--violet .guide-card__action { color: #7356b7; }.guide-card--green::before { background: #2ca36c; }.guide-card--green .guide-card__icon { background: #edf9f1; border-color: #ccebd7; }.guide-card--orange::before { background: #ef8745; }.guide-card--orange .guide-card__icon { background: #fff4e9; border-color: #f5dcc3; }
.config-footnote { display: flex; align-items: flex-start; gap: 11px; margin-top: 24px; padding: 15px 17px; border: 1px solid #d9e5ec; border-radius: 6px; color: #557180; background: #eef6fa; }.config-footnote svg { flex: 0 0 auto; margin-top: 2px; color: #3f91b3; }.config-footnote p { margin: 0; font-size: 13px; line-height: 1.65; }
.config-guides--embedded .config-guides__main { padding-top: 30px; }.config-guides--embedded .config-hero { min-height: 280px; }
@media (max-width: 900px) { .config-hero { grid-template-columns: 1fr; min-height: auto; gap: 26px; padding: 38px 34px; }.hero-signal { min-height: 100px; border-top: 1px solid rgba(148, 204, 225, .2); border-left: 0; }.signal-line--one { top: 39%; left: 6%; width: 48%; }.signal-line--two { top: 70%; left: 30%; width: 50%; }.signal-node--one { top: 34%; left: 5%; }.signal-node--two { top: 65%; left: 45%; }.signal-node--three { top: 42%; right: 8%; }.guide-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 620px) { .config-guides__main { width: min(100% - 24px, 1180px); padding: 35px 0 58px; }.config-hero { padding: 30px 22px; }.hero-lead { font-size: 15px; }.hero-meta { margin-top: 22px; }.board-heading { display: block; }.board-note { margin-top: 10px; text-align: left; }.guide-grid { grid-template-columns: 1fr; gap: 11px; }.guide-card { min-height: 174px; }.config-footnote { padding: 13px 14px; } }
@media (prefers-reduced-motion: reduce) { .guide-card { transition: none; } }
</style>
