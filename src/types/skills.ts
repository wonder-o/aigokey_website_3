export type LocalizedText = { zh: string; en: string }

export interface SkillDimensions {
  usefulness: number
  reliability: number
  ease: number
  maintenance: number
  documentation: number
  safety: number
}

export interface SkillItem {
  id: string
  name: string
  description: LocalizedText
  category: string
  professions: string[]
  repo: string
  branch: string
  path: string
  source: string
  stars: number
  forks: number
  openIssues: number
  license: string
  repoUpdatedAt: string
  rating: number
  dimensions: SkillDimensions
  review: LocalizedText
  bestFor: LocalizedText
  caution: LocalizedText
  tags: string[]
  official: boolean
  featured: boolean
  available: boolean
  difficulty: 'starter' | 'intermediate' | 'advanced'
  maturity: 'established' | 'growing' | 'experimental'
  setupTimeMinutes: number
  risk: 'low' | 'medium' | 'high'
  platforms: string[]
  permissions: string[]
  taskTypes: string[]
  prerequisites: LocalizedText
  outputs: LocalizedText
}

export interface SkillsCatalog {
  lastSyncedAt: string
  skills: SkillItem[]
}
