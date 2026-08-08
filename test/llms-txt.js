import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const FILE = path.join(process.cwd(), 'static/llms.txt')
const GENERATOR = path.join(process.cwd(), 'scripts/build-llms-txt.js')
const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')

const content = fs.readFileSync(FILE, 'utf8')

const links = content
  .split('\n')
  .map(line => line.match(/^- \[([^\]]+)\]\((https:\/\/[^)]+)\)/))
  .filter(Boolean)
  .map(([, label, href]) => ({ label, href }))

const docsCount = fs
  .readdirSync(DOCS_DIR, { recursive: true })
  .filter(entry => entry.endsWith('.md')).length

describe('llms.txt', () => {
  test('starts with an H1', () => {
    expect(content.startsWith('# ')).toBe(true)
  })

  test('exposes every doc as a markdown link', () => {
    expect(links).toHaveLength(docsCount)
  })

  test('every link has a label and an absolute .md URL', () => {
    for (const { label, href } of links) {
      expect(label.trim()).not.toBe('')
      expect(href).toMatch(/^https:\/\/microlink\.io\/docs\/.+\.md$/)
    }
  })

  test('groups the links under H2 sections', () => {
    expect(content.match(/^## .+$/gm).length).toBeGreaterThan(0)
  })

  test('is up to date with the docs content tree', () => {
    execFileSync(process.execPath, [GENERATOR])
    expect(fs.readFileSync(FILE, 'utf8')).toBe(content)
  })
})
