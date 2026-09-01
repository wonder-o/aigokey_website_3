export type ModelService = {
  slug: string
  label: string
  vendor: string
  accent: string
  softAccent: string
  model: string
  tagline: string
  intro: string
  capabilities: string[]
  planNote: string
}

export const modelServices: ModelService[] = [
  {
    slug: 'gpt',
    label: 'GPT',
    vendor: 'OpenAI',
    accent: '#176fc1',
    softAccent: '#eaf4ff',
    model: 'GPT-5.6',
    tagline: '面向复杂任务、代码与 Agent 工作流的通用智能模型。',
    intro: 'OpenAI 将 GPT-5.6 定位为面向复杂推理与编码的旗舰模型，并提供平衡性能与成本的型号选择；最新模型均支持文本与图像输入、多语言能力和视觉理解。',
    capabilities: ['复杂问题拆解与推理', '代码生成、重构与调试', '工具调用与长流程 Agent 任务'],
    planNote: '适合把 GPT 接入日常办公、研发、内容和自动化工作流。',
  },
  {
    slug: 'image',
    label: 'Image',
    vendor: 'OpenAI',
    accent: '#a254c7',
    softAccent: '#f7effc',
    model: 'Image2',
    tagline: '把文字想法转成可用的视觉素材。',
    intro: 'GPT-Image-2 是先进的图像生成模型，适合把自然语言描述转化为图像，并服务于设计、内容和产品创作流程。',
    capabilities: ['文生图与视觉概念探索', '营销、电商和社媒素材创作', '与 GPT 协作完成从文案到画面'],
    planNote: '在同一个 AIGOKEY 账户里，把 Image 创作和 GPT、Codex 工作流连起来。',
  },
  {
    slug: 'deepseek',
    label: 'DeepSeek',
    vendor: 'DeepSeek',
    accent: '#2474d8',
    softAccent: '#eaf3ff',
    model: 'DeepSeek-V4',
    tagline: '面向百万上下文、Agent 与复杂推理的新一代模型。',
    intro: 'DeepSeek V4 面向 Agent 时代，支持 1M 上下文、思考与非思考模式，并针对代码和长文档任务进行了优化。',
    capabilities: ['1M 超长上下文理解', '思考 / 非思考双模式', '代码与 Agent 工具协作'],
    planNote: '适合需要高性价比推理、代码分析和批量内容处理的工作流。',
  },
  {
    slug: 'glm',
    label: 'GLM',
    vendor: 'Z.ai / 智谱',
    accent: '#e5723e',
    softAccent: '#fff1e9',
    model: 'GLM5.3',
    tagline: '把 Agent、推理与编码能力放进一个开源 MoE 模型。',
    intro: 'GLM5.3 面向 Agent、推理和编码任务，延续思考模式与直接响应模式，适合中文理解和工程协作。',
    capabilities: ['Agent 工具使用与任务执行', '思考 / 直接响应双模式', '中文理解、代码与工程协作'],
    planNote: '适合中文场景下的研发、运营自动化和复杂资料处理。',
  },
  {
    slug: 'kimi',
    label: 'Kimi',
    vendor: 'Moonshot AI',
    accent: '#199d8a',
    softAccent: '#e8f8f4',
    model: 'K3',
    tagline: '面向编码、长流程执行与 Agent 协作的 Kimi 系列。',
    intro: 'K3 面向编码、长时任务执行和 Agent 协作，适合处理长文档、复杂项目和持续推进的工作。',
    capabilities: ['长上下文资料理解', '代码生成与工程任务', '多 Agent 协作和长时执行'],
    planNote: '适合长文档、复杂项目和需要持续推进的 Agent 工作。',
  },
  {
    slug: 'seedance',
    label: 'Seedance',
    vendor: 'ByteDance Seed',
    accent: '#d14e69',
    softAccent: '#fff0f3',
    model: 'Seedance 2.5',
    tagline: '从单条提示走向完整创作的多模态视频生成模型。',
    intro: 'Seedance 2.5 是新一代视频创作模型，强调从生成片段走向完成一部创作，并支持多模态参考和镜头表达。',
    capabilities: ['文本、图像、视频和音频参考', '镜头运动与多镜头叙事', '适合广告、短片和产品演示'],
    planNote: '适合需要稳定视频生成额度的创作者、品牌和内容团队。',
  },
]

export const getModelService = (slug: string) => modelServices.find((item) => item.slug === slug) ?? modelServices[0]
