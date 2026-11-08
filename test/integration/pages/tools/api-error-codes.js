import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const TOOLS = path.join(process.cwd(), 'src/pages/tools')
const OVERRIDES_API_STATUS = /\berr(or)?\.(statusCode|code)\s*=(?!=)/

const toolFiles = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return toolFiles(full)
    return entry.name.endsWith('.js') ? [full] : []
  })

describe('tool pages', () => {
  test.each(toolFiles(TOOLS).map(file => path.relative(TOOLS, file)))(
    '%s reports the error code the API returned',
    file => {
      const source = fs.readFileSync(path.join(TOOLS, file), 'utf8')
      expect(source).not.toMatch(OVERRIDES_API_STATUS)
    }
  )
})
