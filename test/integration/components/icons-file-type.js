import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/icons/FileType.js'),
  'utf8'
)

const registry = source.slice(
  source.indexOf('const FILE_TYPES'),
  source.indexOf('export const FileType')
)

describe('FileType icon', () => {
  test('covers every supported extension with a tinted label bar', () => {
    const expected = {
      pdf: '#D92D20',
      xlsx: '#079455',
      docx: '#155EEF',
      pptx: '#E62E05',
      csv: '#079455',
      json: '#444CE7',
      html: '#444CE7',
      txt: '#475467'
    }

    for (const [type, tint] of Object.entries(expected)) {
      expect(registry).toContain(`${type}: {`)
      expect(registry).toContain(`tint: '${tint}'`)
    }
  })

  test('falls back to a generic document for unknown types', () => {
    expect(source).toContain('.toUpperCase()} file`')
    expect(source).toContain(": 'Document'")
    expect(source).toContain('DOC_LINES_PATH')
    expect(source).toContain("const LINE = '#155EEF'")
  })

  test('normalizes the type before lookup', () => {
    expect(source).toContain('FILE_TYPES[String(type).toLowerCase()]')
  })
})
