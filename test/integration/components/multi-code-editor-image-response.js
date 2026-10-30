import { describe, expect, test } from 'vitest'
import { sourceHarness } from '../../utils/eval-source.mjs'

const { source, slice } = sourceHarness(
  'src/components/patterns/MultiCodeEditor/interactive/content-area.js'
)

const { source: editor } = sourceHarness(
  'src/components/patterns/MultiCodeEditor/MultiCodeEditorInteractive.js'
)

const responseView = slice(
  "if (contentType.includes('application/json'))",
  'const handleKeyDown'
)

const [, contentTypeRead] = source
  .slice(0, source.indexOf("if (contentType.includes('application/json'))"))
  .match(/const contentType = (.*)\n\s*$/)

describe('response view', () => {
  test('waits for the blob URL before rendering the image', () => {
    expect(responseView).toContain('if (!imageUrl) return null')
    expect(responseView.indexOf('if (!imageUrl) return null')).toBeLessThan(
      responseView.indexOf('handleImageClick')
    )
  })

  test('tolerates a failed request with no content type', () => {
    expect(source.match(/const contentType = (.*)/g)).toEqual([
      "const contentType = headers?.['content-type'] || ''",
      "const contentType = headers?.['content-type'] || ''"
    ])
    expect(contentTypeRead).toBe("headers?.['content-type'] || ''")
    expect(editor).toContain('showResponseFade(responseData, showApiKeyInput)')
    expect(editor).not.toContain("headers['content-type'].includes")
  })
})
