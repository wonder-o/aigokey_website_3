export type EvidenceLevel = 'A1' | 'A2' | 'B' | 'C'

export interface CaseSource {
  title: string
  url: string
  note: string
}

export interface CodexCase {
  id: string
  title: string
  section: string
  category: string
  professions: string[]
  industry: string
  roles: string
  sourceLanguage: string
  evidence: EvidenceLevel
  problem: string
  workflow: string
  outcome: string
  source: CaseSource
}

export interface CaseTaxonomyItem {
  id: string
  label: string
  description?: string
}

export interface EvidenceDefinition {
  label: string
  description: string
}

export interface CasesCatalog {
  generatedAt: string
  sourceTitle: string
  categories: CaseTaxonomyItem[]
  professions: CaseTaxonomyItem[]
  evidence: Record<EvidenceLevel, EvidenceDefinition>
  cases: CodexCase[]
}
