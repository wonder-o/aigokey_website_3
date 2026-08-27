import { existsSync, readFileSync, readdirSync } from 'fs'
import { join, relative, resolve } from 'path'

const distDir = resolve('dist')
const siteOrigin = (process.env.VITE_SITE_ORIGIN || 'https://www.aigokey.com').trim().replace(/\/+$/, '')

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) return filesIn(full)
    return entry.isFile() ? [full] : []
  })
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']+)["']`, 'i'))?.[1] || ''
}

function tags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []
}

if (!existsSync(distDir)) throw new Error('dist/ does not exist; run npm run build first')

const htmlFiles = filesIn(distDir).filter((file) => file.endsWith('.html') && !file.endsWith('404.html'))
const indexable = []
const errors = []
const titlesByValue = new Map()
const descriptionsByValue = new Map()

function trackDuplicate(map, value, label) {
  const labels = map.get(value) || []
  labels.push(label)
  map.set(value, labels)
}

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const metaTags = tags(html, 'meta')
  const robotsTag = metaTags.find((tag) => attribute(tag, 'name').toLowerCase() === 'robots')
  const robotsContent = robotsTag ? attribute(robotsTag, 'content').toLowerCase() : ''
  const canonicalTags = tags(html, 'link').filter((tag) => attribute(tag, 'rel').toLowerCase() === 'canonical')
  const canonical = canonicalTags[0] ? attribute(canonicalTags[0], 'href') : ''
  const label = relative(distDir, file)
  const title = html.match(/<title\b[^>]*>([^<]+)<\/title>/i)?.[1].trim() || ''
  const descriptionTags = metaTags.filter((tag) => attribute(tag, 'name').toLowerCase() === 'description')
  const description = descriptionTags[0] ? attribute(descriptionTags[0], 'content').trim() : ''
  const keywordTags = metaTags.filter((tag) => attribute(tag, 'name').toLowerCase() === 'keywords')

  if (!title) errors.push(`${label}: missing <title>`)
  if (keywordTags.length) errors.push(`${label}: remove unsupported meta keywords`)
  if (canonicalTags.length > 1) errors.push(`${label}: multiple canonical tags`)
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (attribute(`<script ${match[1]}>`, 'type').toLowerCase() !== 'application/ld+json') continue
    try {
      JSON.parse(match[2].trim())
    } catch {
      errors.push(`${label}: invalid JSON-LD`)
    }
  }
  if (robotsContent.includes('noindex')) {
    if (canonical) errors.push(`${label}: noindex page must not have canonical`)
    continue
  }
  if (!robotsContent.includes('max-image-preview:large')) errors.push(`${label}: indexable page must allow large image previews`)
  if (descriptionTags.length !== 1) errors.push(`${label}: expected exactly one meta description, found ${descriptionTags.length}`)
  if (!description) errors.push(`${label}: meta description is empty`)
  const h1Count = (html.match(/<h1\b/gi) || []).length
  if (h1Count !== 1) errors.push(`${label}: expected exactly one <h1>, found ${h1Count}`)
  if (!canonical) {
    errors.push(`${label}: indexable page is missing canonical`)
    continue
  }
  if (!canonical.startsWith(`${siteOrigin}/`)) errors.push(`${label}: canonical points to ${canonical}`)
  if (canonical.includes('?') || canonical.includes('#')) errors.push(`${label}: canonical contains query/hash`)
  if (canonical !== `${siteOrigin}/` && !canonical.endsWith('/')) errors.push(`${label}: canonical must use a trailing slash`)
  const outputPath = label.replace(/\\/g, '/').replace(/index\.html$/, '')
  const expectedCanonical = `${siteOrigin}/${outputPath}`
  if (canonical !== expectedCanonical) errors.push(`${label}: canonical should be ${expectedCanonical}`)
  trackDuplicate(titlesByValue, title, label)
  trackDuplicate(descriptionsByValue, description, label)
  indexable.push(canonical)
}

for (const [title, labels] of titlesByValue) {
  if (labels.length > 1) errors.push(`duplicate title "${title}" in ${labels.join(', ')}`)
}
for (const [description, labels] of descriptionsByValue) {
  if (labels.length > 1) errors.push(`duplicate meta description "${description}" in ${labels.join(', ')}`)
}

const uniqueCanonical = [...new Set(indexable)].sort()
if (uniqueCanonical.length !== indexable.length) errors.push('duplicate canonical URLs found in indexable pages')

const robotsPath = join(distDir, 'robots.txt')
const sitemapPath = join(distDir, 'sitemap.xml')
if (!existsSync(robotsPath)) errors.push('missing dist/robots.txt')
if (!existsSync(sitemapPath)) errors.push('missing dist/sitemap.xml')

if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, 'utf8')
  if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) errors.push('robots.txt has the wrong sitemap origin')
}

if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort()
  if (JSON.stringify(sitemapUrls) !== JSON.stringify(uniqueCanonical)) errors.push('sitemap URLs do not match indexable canonical URLs')
}

if (errors.length) {
  console.error(`SEO validation failed (${errors.length} issue${errors.length === 1 ? '' : 's'})`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`SEO validation passed: ${uniqueCanonical.length} indexable URLs, ${htmlFiles.length - uniqueCanonical.length} noindex HTML files`)
