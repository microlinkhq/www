import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const TOOLS = path.join(process.cwd(), 'src', 'pages', 'tools')
const SAVED_KEY_READ = /useLocalStorage\(\s*['"]mql-api-key['"]/

const listFiles = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(fullPath)
    return entry.name.endsWith('.js') ? [fullPath] : []
  })

const toolsSendingApiKey = listFiles(TOOLS).filter(file =>
  /^\s+apiKey,?$/m.test(fs.readFileSync(file, 'utf8'))
)

describe('demo api key', () => {
  test('finds the tools that send an api key', () => {
    expect(toolsSendingApiKey.length).toBeGreaterThanOrEqual(8)
  })

  test.each(toolsSendingApiKey.map(file => path.relative(TOOLS, file)))(
    '%s takes its key from useDemoApiKey',
    relative => {
      const source = fs.readFileSync(path.join(TOOLS, relative), 'utf8')

      expect(source).toMatch(/const apiKey = useDemoApiKey\(\)/)
      expect(source).not.toMatch(SAVED_KEY_READ)
    }
  )
})
