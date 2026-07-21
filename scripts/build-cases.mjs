import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const sourcePath = resolve(process.argv[2] || '../Codex案例收集/Codex_50个跨行业使用案例_中文.md')
const outputPath = resolve(process.argv[3] || 'src/data/codex-cases.json')
const markdown = await readFile(sourcePath, 'utf8')
const extraCases = JSON.parse(await readFile(resolve('src/data/codex-cases-extra.json'), 'utf8'))

const indexRows = new Map(markdown.split(/\r?\n/).flatMap((line) => {
  const match = line.match(/^\|\s*(\d{2})\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|$/)
  if (!match) return []
  return [[Number(match[1]), { industry: match[2].trim(), organization: match[3].trim(), roles: match[4].trim(), summary: match[5].trim() }]]
}))

const categoryDefinitions = [
  { id: 'public-education', label: '公共服务与教育', description: '政务信息、课程运营与无障碍工具', ids: range(1, 4) },
  { id: 'finance-services', label: '财税与专业服务', description: '税务准备、专业审查与客户服务', ids: range(5, 7) },
  { id: 'data-research', label: '数据与产品研究', description: '数据分析、语义治理与产品探索', ids: range(8, 13) },
  { id: 'product-ai', label: '产品研发与 AI 研究', description: '全栈产品、机器学习与科研工程', ids: range(14, 20) },
  { id: 'engineering-ops', label: '工程效率与运维', description: '代码审查、迁移、平台与故障处理', ids: range(21, 36) },
  { id: 'content-collaboration', label: '内容创作与协作', description: '演示、视频、配图与团队资料处理', ids: range(37, 42) },
  { id: 'knowledge-design', label: '知识管理与产品设计', description: 'Wiki、Notion、Figma 与网页发布', ids: range(43, 46) },
  { id: 'automation-research', label: '自动化运维与科研', description: '远程修复、内容检索、CI 与临床综述', ids: range(47, 50) },
  { id: 'business-operations', label: '业务运营与管理', description: '经营复盘、决策材料与流程治理', ids: [] },
  { id: 'sales-marketing', label: '销售与市场', description: '客户拓展、营销策略与创意生产', ids: [] },
  { id: 'finance-investing', label: '财务与投资', description: '月结复盘、公司比较与交易材料', ids: [] },
  { id: 'everyday-productivity', label: '日常办公与协作', description: '工作简报、文件清理与团队同步', ids: [] },
]

const professionDefinitions = [
  { id: 'founder', label: '创始人与管理者', ids: [1, 2, 7, 13] },
  { id: 'product', label: '产品经理与设计师', ids: [2, 6, 12, 13, 14, 31, 34, 38, 44] },
  { id: 'developer', label: '软件工程师', ids: [4, 6, 12, 13, 14, 16, 17, 20, 21, 22, 24, 25, 27, 31, 33, 34, 35, 36, 44, 46, 47, 49] },
  { id: 'platform', label: '平台、SRE 与 DevOps', ids: [9, 15, 20, 23, 26, 28, 29, 30, 32, 33, 36, 47, 49] },
  { id: 'data', label: '数据与 AI 研究者', ids: [1, 8, 9, 10, 11, 18, 19, 26, 39, 43, 48, 50] },
  { id: 'operations', label: '运营与项目管理', ids: [2, 10, 28, 37, 39, 41, 42, 45, 46, 48] },
  { id: 'creator', label: '内容创作者与培训师', ids: [3, 37, 38, 40, 41, 42, 46, 48] },
  { id: 'professional', label: '专业服务与研究人员', ids: [1, 3, 5, 6, 7, 18, 19, 39, 43, 45, 50] },
  { id: 'business-ops', label: '业务运营与管理者', ids: [] },
  { id: 'sales-marketing', label: '销售与市场团队', ids: [] },
  { id: 'finance-investing', label: '财务与投资岗位', ids: [] },
]

const evidenceDefinitions = {
  A1: { label: '一手量化案例', description: '组织或当事人的一手资料，并披露数字、时间或明确结果。' },
  A2: { label: '一手工作流', description: '组织或当事人的一手资料，工作流具体，但未披露量化指标。' },
  B: { label: '可复现实操', description: '公开可跟做的实操，包含提示词、样例文件、步骤、日志或成品。' },
  C: { label: '可执行模板', description: '可迁移的流程模板，不代表已经证明业务成效。' },
}

const lines = markdown.split(/\r?\n/)
const cases = []
let currentSection = ''

for (let index = 0; index < lines.length; index += 1) {
  const sectionMatch = lines[index].match(/^## [一二三四]、(.+)$/)
  if (sectionMatch) currentSection = sectionMatch[1].trim()

  const caseMatch = lines[index].match(/^### (\d{2})\.\s+(.+)$/)
  if (!caseMatch) continue

  const id = Number(caseMatch[1])
  const block = []
  index += 1
  while (index < lines.length && !lines[index].startsWith('### ') && !lines[index].startsWith('## ')) {
    block.push(lines[index])
    index += 1
  }
  index -= 1

  const fields = Object.fromEntries(block.flatMap((line) => {
    const match = line.match(/^- \*\*(.+?)\*\*：\s*(.+)$/)
    return match ? [[match[1], match[2].trim()]] : []
  }))
  const meta = fields['行业/岗位/证据'] || ''
  const metaParts = meta.split('；').map((value) => value.trim()).filter(Boolean)
  const evidence = (meta.match(/(?:^|[；，。])\s*(A1|A2|B|C)(?:[；，。]|$)/)?.[1] || 'C')
  const sourceText = fields['来源'] || ''
  const sourceMatch = sourceText.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/)
  const category = categoryDefinitions.find((item) => item.ids.includes(id))
  const professions = professionDefinitions.filter((item) => item.ids.includes(id)).map((item) => item.id)
  const indexMeta = indexRows.get(id)

  cases.push({
    id: caseMatch[1],
    title: caseMatch[2].trim(),
    section: currentSection,
    category: category?.id || 'automation-research',
    professions,
    industry: indexMeta?.industry || metaParts[0] || '',
    roles: indexMeta?.roles || metaParts[1] || '',
    sourceLanguage: meta.includes('中文来源') ? '中文' : '英文译述',
    evidence,
    problem: fields['问题'] || '',
    workflow: fields['Codex 工作流'] || '',
    outcome: fields['结果与边界'] || fields['产出与验证'] || '',
    source: {
      title: sourceMatch?.[1] || sourceText.replace(/，.*$/, ''),
      url: sourceMatch?.[2] || '',
      note: sourceText.replace(sourceMatch?.[0] || '', '').replace(/^，\s*/, '').trim(),
    },
  })
}

cases.push(...extraCases)

const expectedIds = Array.from({ length: 100 }, (_, index) => String(index + 1).padStart(2, '0'))
const actualIds = cases.map((item) => item.id).sort((a, b) => Number(a) - Number(b))
const incomplete = cases.filter((item) => !item.title || !item.category || !item.professions?.length || !item.industry || !item.roles || !item.problem || !item.workflow || !item.outcome || !item.source?.title || !item.source?.url)

if (cases.length !== 100 || JSON.stringify(actualIds) !== JSON.stringify(expectedIds) || incomplete.length) {
  throw new Error(`Case validation failed: count=${cases.length}, incomplete=${incomplete.map((item) => item.id).join(',') || 'none'}`)
}

const payload = {
  generatedAt: '2026-07-21',
  sourceTitle: 'Codex 100 个跨行业、跨岗位具体使用案例',
  categories: categoryDefinitions.map(({ ids, ...item }) => item),
  professions: professionDefinitions.map(({ ids, ...item }) => item),
  evidence: evidenceDefinitions,
  cases,
}

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(`Generated ${cases.length} cases at ${outputPath}`)

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}
