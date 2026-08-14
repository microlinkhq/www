'use strict'

/**
 * Generates static/llms.txt from the docs content tree, following the
 * llmstxt.org format: an H1, a blockquote summary, and H2 sections whose
 * items are markdown links.
 *
 * Usage:
 *   node scripts/build-llms-txt.js
 */

const { readdirSync, readFileSync, writeFileSync } = require('fs')
const path = require('path')

const BASE_URL = 'https://microlink.io'
const ROOT_DIR = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT_DIR, 'src', 'content', 'docs')
const OUTPUT_PATH = path.join(ROOT_DIR, 'static', 'llms.txt')

const SECTIONS = [
  { dir: 'api', title: 'API' },
  { dir: 'cards', title: 'Cards' },
  { dir: 'mql', title: 'MQL' },
  { dir: 'guides', title: 'Guides' },
  { dir: 'sdk', title: 'SDK' },
  { dir: 'sdk-legacy', title: 'SDK (legacy)' }
]

const unquote = value =>
  value
    .trim()
    .replace(/^['"]/, '')
    .replace(/['"]$/, '')
    .replace(/''/g, "'")
    .trim()

const frontmatterField = (content, field) => {
  const frontmatter = content.split(/^---$/m)[1] || ''
  const line = frontmatter
    .split('\n')
    .find(line => line.startsWith(`${field}:`))
  return line ? unquote(line.slice(field.length + 1)) : ''
}

const markdownFiles = dir =>
  readdirSync(dir, { recursive: true })
    .filter(entry => entry.endsWith('.md'))
    .map(entry => entry.split(path.sep).join('/'))
    .sort()

// Mirrors gatsby-source-filesystem's createFilePath, which drops `index` from
// the slug, plus gatsby-node's markdown emitter, which writes `<slug>.md`.
const toMarkdownUrl = (sectionDir, file) => {
  const slug = file.replace(/\.md$/, '').replace(/\/?index$/, '')
  return `${BASE_URL}/docs/${sectionDir}${slug ? `/${slug}` : ''}.md`
}

const toEntry = (sectionDir, file) => {
  const content = readFileSync(path.join(CONTENT_DIR, sectionDir, file), 'utf8')
  const title = frontmatterField(content, 'title')
  const description = frontmatterField(content, 'description')
  const url = toMarkdownUrl(sectionDir, file)
  return `- [${title}](${url})${description ? `: ${description}` : ''}`
}

const toSection = ({ dir, title }) => {
  const entries = markdownFiles(path.join(CONTENT_DIR, dir)).map(file =>
    toEntry(dir, file)
  )
  return `## ${title}\n\n${entries.join('\n')}`
}

const llmsTxt = [
  '# Microlink',
  '',
  '> Turn any website into data. APIs for link previews, screenshots, PDF generation, and web scraping.',
  '',
  SECTIONS.map(toSection).join('\n\n'),
  ''
].join('\n')

writeFileSync(OUTPUT_PATH, llmsTxt)

console.log(`Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)}`)
