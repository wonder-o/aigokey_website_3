<template>
  <div class="codex-page">
    <header class="site-header">
      <div class="topbar">
        <a class="brand" href="javascript:void(0)" @click="scrollTo('top')">
          <img src="/assets/aigokey-logo.png" alt="AigoKey" />
          <span>Codex 安装使用教程</span>
        </a>
        <nav class="nav" aria-label="页面目录">
          <a v-for="item in navItems" :key="item.id" href="javascript:void(0)" @click="scrollTo(item.id)">
            {{ item.label }}
          </a>
        </nav>
      </div>
    </header>

    <main id="top">
      <section class="hero">
        <p class="eyebrow">Codex App · CC-Switch · VS Code · AigoKey</p>
        <h1>Codex 安装使用教程手册</h1>
        <p class="hero-copy">
          根据飞书教程重新整理页面顺序：先给非编程用户放 Windows / Mac 图文安装流程，再把程序员需要的 CLI、VS Code 插件和 CC-Switch 配置放到后面。
        </p>
        <div class="hero-actions">
          <a class="button" href="javascript:void(0)" @click="scrollTo('config-video')">配置视频</a>
          <a class="button secondary" href="javascript:void(0)" @click="scrollTo('non-developer')">非程序员安装</a>
          <a class="button secondary" href="javascript:void(0)" @click="scrollTo('developer')">程序员安装</a>
        </div>
      </section>

      <section class="jumpbar" aria-label="快速跳转">
        <a v-for="item in tocItems" :key="item.id" href="javascript:void(0)" @click="scrollTo(item.id)">
          {{ item.label }}
        </a>
      </section>

      <div class="guide">
        <section id="prep" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">01</span>
            <h2>前置：联系客服和打开订阅站点</h2>
          </div>
          <p class="lead">
            有使用问题、充值问题、密钥不可用或导入后没有生效，请先联系微信客服确认。
          </p>
          <ul class="link-list">
            <li>Codex 订阅站点：<a href="https://www.aigokey.cc/" target="_blank" rel="noopener">https://www.aigokey.cc/</a></li>
            <li>网站首页：<router-link to="/">返回 AigoKey 首页</router-link></li>
          </ul>
          <figure class="qr-figure">
            <img src="/assets/01_联系客服_微信二维码.png" alt="联系客服微信二维码" />
            <figcaption>飞书截图 01：联系客服微信二维码</figcaption>
          </figure>
        </section>

        <section id="config-video" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">02</span>
            <h2>配置教程视频</h2>
          </div>
          <p class="lead">飞书文档里的配置视频已放入页面，可直接播放查看完整配置过程。</p>
          <figure class="video-figure">
            <video
              src="/assets/codex_config_tutorial.mp4"
              poster="/assets/codex_config_tutorial_cover.jpg"
              controls
              preload="metadata"
            ></video>
            <figcaption>飞书视频：Codex 配置教程</figcaption>
          </figure>
        </section>

        <section id="non-developer" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">03</span>
            <h2>非程序员用户安装流程</h2>
          </div>
          <p class="lead">
            产品经理、电商运营、品牌营销、自媒体等用户，优先按这一段操作。安装 Codex App 后不要登录，直接退出程序，再通过 CC-Switch 导入密钥。
          </p>

          <div id="windows-user" class="step-block">
            <h3>Windows 安装方法</h3>
            <ol class="steps">
              <li>下载安装 Codex App。安装好之后不要登录，直接退出程序。</li>
              <li>下载安装 CC-Switch。GitHub Release 页面里的 Windows 下载包可能被折叠，需要先展开资源列表。</li>
              <li>登录 AigoKey 网站，进入 API 密钥管理页面，创建密钥并选择分组。</li>
              <li>把创建好的密钥导入 CC-Switch，然后启用刚导入的密钥。</li>
              <li>重启 Codex App 即可开始使用。</li>
            </ol>
            <ul class="link-list">
              <li>Codex App：<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">Microsoft Store Codex</a></li>
              <li>CC-Switch：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="media-list">
              <figure v-for="shot in windowsUserScreenshots" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="mac-user" class="step-block">
            <h3>Mac 安装方法</h3>
            <ol class="steps">
              <li>下载安装 Codex App。安装好之后不要登录，直接退出程序。</li>
              <li>下载安装 CC-Switch。不会使用命令行时，直接从 Release 页面下载 Mac 安装包。</li>
              <li>登录 AigoKey 网站创建密钥。创建密钥的页面和 Windows 流程相同。</li>
              <li>把创建好的密钥导入 CC-Switch，然后启用刚导入的密钥。</li>
              <li>重启 Codex App 即可开始使用。</li>
            </ol>
            <ul class="link-list">
              <li>Codex App：<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">OpenAI Codex 官网</a></li>
              <li>CC-Switch：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="command">
              <span>Mac 可选命令</span>
              <code>brew tap farion1231/ccswitch &amp;&amp; brew install --cask cc-switch</code>
              <button type="button" @click="copyText('brew tap farion1231/ccswitch && brew install --cask cc-switch', $event)">复制</button>
            </div>
            <div class="media-list">
              <figure v-for="shot in macUserScreenshots" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="developer" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">04</span>
            <h2>程序员用户安装流程</h2>
          </div>
          <p class="lead">
            用于编程开发的用户再继续完成 CLI、CC-Switch、VS Code 插件和 Codex App 配置。
          </p>

          <div id="cli-install" class="step-block">
            <h3>安装 Codex CLI</h3>
            <div class="command-group">
              <div class="command">
                <span>Windows</span>
                <code>npm install -g @openai/codex</code>
                <button type="button" @click="copyText('npm install -g @openai/codex', $event)">复制</button>
              </div>
              <div class="command">
                <span>Mac</span>
                <code>brew install --cask codex</code>
                <button type="button" @click="copyText('brew install --cask codex', $event)">复制</button>
              </div>
            </div>
          </div>

          <div id="cc-switch" class="step-block">
            <h3>安装 CC-Switch 并导入密钥</h3>
            <p>导入密钥后，记得在 CC-Switch 里启用刚导入的密钥，再回到 Codex App 或 VS Code 使用。</p>
            <ul class="link-list">
              <li>项目地址：<a href="https://github.com/farion1231/cc-switch" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch</a></li>
              <li>Windows / Mac 下载地址：<a href="https://github.com/farion1231/cc-switch/releases" target="_blank" rel="noopener">https://github.com/farion1231/cc-switch/releases</a></li>
            </ul>
            <div class="command">
              <span>Mac 命令行安装</span>
              <code>brew tap farion1231/ccswitch &amp;&amp; brew install --cask cc-switch</code>
              <button type="button" @click="copyText('brew tap farion1231/ccswitch && brew install --cask cc-switch', $event)">复制</button>
            </div>
            <div class="media-list">
              <figure v-for="shot in developerCcScreenshots" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="vscode-plugin" class="step-block">
            <h3>安装 VS Code Codex 插件</h3>
            <p>如果你主要在 VS Code 里开发，可以安装 Codex 插件，并从侧边栏打开 Codex。</p>
            <div class="media-list">
              <figure v-for="shot in vscodeScreenshots" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <div id="codex-app" class="step-block">
            <h3>安装 Codex App</h3>
            <ul class="link-list">
              <li>Windows 下载地址：<a href="https://apps.microsoft.com/detail/9plm9xgg6vks?hl=zh-cn&gl=GP" target="_blank" rel="noopener">Microsoft Store Codex</a></li>
              <li>Mac 下载地址：<a href="https://openai.com/zh-Hans-CN/codex/" target="_blank" rel="noopener">OpenAI Codex 官网</a></li>
            </ul>
            <div class="media-list">
              <figure v-for="shot in codexAppScreenshots" :key="shot.src" class="screenshot">
                <img :src="shot.src" :alt="shot.alt" />
                <figcaption>{{ shot.caption }}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section id="support" class="guide-section">
          <div class="section-head">
            <span class="section-kicker">05</span>
            <h2>联系客服</h2>
          </div>
          <p>
            Codex 订阅站点：<a href="https://www.aigokey.cc/" target="_blank" rel="noopener">https://www.aigokey.cc/</a>，也可以 <router-link to="/">返回 AigoKey 首页</router-link>。
          </p>
          <p>有使用问题、充值问题、密钥不可用或导入后没有生效，请联系微信客服。</p>
          <figure class="qr-figure">
            <img src="/assets/12_联系客服_微信二维码.png" alt="联系客服微信二维码" />
            <figcaption>飞书截图 12：联系客服微信二维码</figcaption>
          </figure>
        </section>
      </div>
    </main>

    <footer class="footer">Codex 安装使用教程 · AigoKey</footer>
  </div>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

type TutorialShot = {
  src: string
  alt: string
  caption: string
}

const navItems = [
  { id: 'prep', label: '客服' },
  { id: 'non-developer', label: '非程序员' },
  { id: 'windows-user', label: 'Windows' },
  { id: 'mac-user', label: 'Mac' },
  { id: 'config-video', label: '视频' },
  { id: 'developer', label: '程序员' },
]

const tocItems = [
  { id: 'prep', label: '1. 前置客服' },
  { id: 'config-video', label: '2. 配置视频' },
  { id: 'non-developer', label: '3. 非程序员安装' },
  { id: 'windows-user', label: 'Windows 流程' },
  { id: 'mac-user', label: 'Mac 流程' },
  { id: 'developer', label: '4. 程序员安装' },
  { id: 'cli-install', label: 'Codex CLI' },
  { id: 'cc-switch', label: 'CC-Switch' },
  { id: 'vscode-plugin', label: 'VS Code 插件' },
  { id: 'codex-app', label: 'Codex App' },
  { id: 'support', label: '5. 联系客服' },
]

const windowsUserScreenshots: TutorialShot[] = [
  { src: '/assets/windows_install_1.png', alt: 'Windows 下载 CC-Switch 步骤 1', caption: 'Windows 下载 CC-Switch：展开 Release 资源区域' },
  { src: '/assets/windows_install_2.png', alt: 'Windows 下载 CC-Switch 步骤 2', caption: 'Windows 下载 CC-Switch：选择 Windows 安装包' },
  { src: '/assets/08_网站_API密钥管理.png', alt: '网站 API 密钥管理页面', caption: '飞书截图 08：在网站进入 API 密钥管理页面' },
  { src: '/assets/09_创建密钥_选择分组.png', alt: '创建密钥并选择分组', caption: '飞书截图 09：创建密钥时选择对应分组' },
  { src: '/assets/10_Windows_密钥导入到CCS.png', alt: 'Windows 将密钥导入 CC-Switch', caption: '飞书截图 10：Windows 将密钥导入 CC-Switch' },
  { src: '/assets/13_CCSwitch_启用导入密钥.png', alt: '启用导入到 CC-Switch 的密钥', caption: '飞书截图 13：在 CC-Switch 里启用导入的 AigoKey 密钥' },
]

const macUserScreenshots: TutorialShot[] = [
  { src: '/assets/11_Mac_密钥导入到CCS.png', alt: 'Mac 将密钥导入 CC-Switch', caption: '飞书截图 11：Mac 将密钥导入 CC-Switch' },
]

const developerCcScreenshots: TutorialShot[] = [
  { src: '/assets/02_CCSwitch_主界面.png', alt: 'CC-Switch 主界面', caption: '飞书截图 02：CC-Switch 主界面' },
  { src: '/assets/03_CCSwitch_配置供应商.png', alt: 'CC-Switch 配置供应商', caption: '飞书截图 03：配置供应商信息' },
  { src: '/assets/04_CCSwitch_密钥导入到CCS.png', alt: 'CC-Switch 导入密钥', caption: '飞书截图 04：将网站生成的密钥导入 CC-Switch' },
]

const vscodeScreenshots: TutorialShot[] = [
  { src: '/assets/05_VSCode_Codex插件安装.png', alt: 'VS Code 安装 Codex 插件', caption: '飞书截图 05：在 VS Code 扩展市场安装 Codex 插件' },
  { src: '/assets/06_VSCode_Codex侧边栏.png', alt: 'VS Code Codex 侧边栏', caption: '飞书截图 06：从 VS Code 侧边栏打开 Codex' },
]

const codexAppScreenshots: TutorialShot[] = [
  { src: '/assets/07_Codex_App主界面.png', alt: 'Codex App 主界面', caption: '飞书截图 07：Codex App 主界面' },
]

useHead({
  title: 'Codex 安装使用教程 - AigoKey',
  meta: [
    { name: 'description', content: 'AigoKey Codex 安装使用教程，包含非程序员和程序员用户的 Codex App、Codex CLI、CC-Switch、VS Code 插件安装和密钥导入流程。' },
    { name: 'keywords', content: 'Codex, 安装教程, CC-Switch, VS Code Codex 插件, 密钥导入, AigoKey' },
    { property: 'og:title', content: 'Codex 安装使用教程 - AigoKey' },
    { property: 'og:description', content: '按非程序员、Windows、Mac、程序员流程整理 Codex 安装与密钥导入教程。' },
    { property: 'og:type', content: 'article' },
  ],
})

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

async function copyText(text: string, event: Event) {
  const btn = event.currentTarget as HTMLButtonElement
  const original = btn.textContent
  try {
    await navigator.clipboard.writeText(text)
    btn.textContent = '已复制'
  } catch {
    btn.textContent = '请手动复制'
  }
  setTimeout(() => { btn.textContent = original }, 1400)
}
</script>

<style scoped>
.codex-page {
  min-height: 100vh;
  color: #172027;
  font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", Arial, sans-serif;
  line-height: 1.72;
  background: #f5f7fa;
}

a {
  color: #0d5c8f;
  overflow-wrap: anywhere;
  text-underline-offset: 4px;
}

img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid #dce4eb;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(14px);
}

.topbar,
.hero,
.jumpbar,
.guide {
  width: min(1280px, calc(100% - 32px));
  margin: 0 auto;
}

.topbar {
  min-height: 66px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #172027;
  font-size: 18px;
  font-weight: 900;
  text-decoration: none;
  white-space: nowrap;
}

.brand img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
}

.nav {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
}

.nav::-webkit-scrollbar {
  display: none;
}

.nav a,
.jumpbar a {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 12px;
  border-radius: 8px;
  color: #3f4d58;
  text-decoration: none;
  white-space: nowrap;
}

.nav a:hover,
.jumpbar a:hover {
  background: #e8f2fb;
  color: #0d5c8f;
}

.hero {
  padding: 58px 0 26px;
}

.eyebrow {
  margin: 0 0 12px;
  color: #a5481d;
  font-size: 14px;
  font-weight: 900;
}

h1 {
  max-width: 980px;
  margin: 0;
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.1;
  letter-spacing: 0;
}

.hero-copy {
  max-width: 980px;
  margin: 18px 0 0;
  color: #4d5c67;
  font-size: 18px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid #0d5c8f;
  border-radius: 8px;
  color: #fff;
  background: #0d5c8f;
  font-weight: 800;
  text-decoration: none;
}

.button.secondary {
  color: #0d5c8f;
  background: #fff;
}

.jumpbar {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
  padding: 10px;
  overflow-x: auto;
  border: 1px solid #dce4eb;
  border-radius: 8px;
  background: #fff;
}

.guide {
  display: grid;
  gap: 22px;
  padding-bottom: 72px;
}

.guide-section {
  scroll-margin-top: 86px;
  padding: clamp(22px, 3vw, 36px);
  border: 1px solid #dce4eb;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(23, 32, 39, 0.04);
}

.section-head {
  display: grid;
  gap: 6px;
  margin-bottom: 18px;
}

.section-kicker {
  color: #0d5c8f;
  font-size: 13px;
  font-weight: 900;
}

.section-head h2 {
  margin: 0;
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.18;
  letter-spacing: 0;
}

.lead {
  max-width: 960px;
  color: #52616d;
  font-size: 17px;
}

.step-block {
  scroll-margin-top: 86px;
  margin-top: 28px;
  padding-top: 26px;
  border-top: 1px solid #e2e8ef;
}

.step-block h3 {
  margin: 0 0 8px;
  font-size: 22px;
  line-height: 1.28;
}

.step-block p {
  margin: 0;
  color: #52616d;
}

.link-list,
.steps {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 22px;
}

.steps li::marker {
  color: #0d5c8f;
  font-weight: 900;
}

.command-group {
  display: grid;
  gap: 10px;
  margin-top: 12px;
}

.command {
  display: grid;
  grid-template-columns: minmax(150px, 210px) minmax(0, 1fr) auto;
  align-items: stretch;
  margin-top: 12px;
  overflow: hidden;
  border: 1px solid #243746;
  border-radius: 8px;
  background: #152430;
}

.command span {
  display: flex;
  align-items: center;
  padding: 0 14px;
  color: #a9c5d8;
  border-right: 1px solid #2d4352;
  font-size: 13px;
  font-weight: 800;
}

.command code {
  padding: 14px;
  overflow-x: auto;
  color: #f4fbff;
  font-family: Consolas, "SFMono-Regular", Menlo, monospace;
  font-size: 14px;
  white-space: nowrap;
}

.command button {
  min-width: 76px;
  border: 0;
  border-left: 1px solid #2d4352;
  color: #fff;
  background: #223847;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

.command button:hover {
  background: #0d5c8f;
}

.media-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  margin-top: 20px;
}

.screenshot,
.video-figure,
.qr-figure {
  margin: 0;
  overflow: hidden;
  border: 1px solid #cfd9e2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 32px rgba(23, 32, 39, 0.08);
}

.screenshot img {
  width: 100%;
  max-height: none;
  object-fit: contain;
  background: #fff;
}

.video-figure video {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #101820;
}

figcaption {
  padding: 12px 14px;
  border-top: 1px solid #dce4eb;
  color: #4d5c67;
  background: #f8fafc;
  font-size: 14px;
}

.qr-figure {
  width: min(420px, 100%);
  margin: 20px auto 0;
}

.qr-figure img {
  width: 100%;
  padding: 16px;
}

.footer {
  padding: 24px 16px;
  border-top: 1px solid #dce4eb;
  color: #62717d;
  background: #fff;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 760px) {
  .topbar {
    align-items: flex-start;
    flex-direction: column;
    padding: 12px 0;
  }

  .hero {
    padding-top: 36px;
  }

  .hero-copy,
  .lead {
    font-size: 16px;
  }

  .hero-actions {
    display: grid;
  }

  .button,
  .button.secondary {
    width: 100%;
  }

  .command {
    grid-template-columns: 1fr;
  }

  .command span,
  .command button {
    min-height: 40px;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid #2d4352;
  }

  .command span {
    border-top: 0;
  }
}

@media (max-width: 520px) {
  .topbar,
  .hero,
  .jumpbar,
  .guide {
    width: min(100% - 24px, 1280px);
  }

  .guide-section {
    padding: 18px;
  }
}
</style>
