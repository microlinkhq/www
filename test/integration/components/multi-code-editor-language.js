import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const EDITORS = [
  'src/components/patterns/MultiCodeEditor/MultiCodeEditor.js',
  'src/components/patterns/MultiCodeEditor/MultiCodeEditorInteractive.js'
]

describe('code editors share one persisted language choice', () => {
  test('both editors resolve their language through useCodeLanguage', () => {
    for (const file of EDITORS) {
      const source = read(file)
      expect(source).toContain(
        "import { useCodeLanguage } from 'components/hook/use-code-language'"
      )
      expect(source).toContain('useCodeLanguage(')
      expect(source).not.toContain('multi_code_editor_index')
      expect(source).not.toMatch(/useLocalStorage\(\s*''/)
      expect(source).not.toContain('mql-language-change')
    }
  })

  test('the hook subscribes to the shared store instead of local state', () => {
    const hook = read('src/components/hook/use-code-language.js')
    expect(hook).toContain('useSyncExternalStore(')
    expect(hook).toContain('store.getServerSnapshot')
    expect(hook).not.toContain('useLocalStorage')
  })

  test('the store persists labels under one key for every editor', () => {
    const helper = read('src/helpers/code-language.js')
    expect(helper).toContain(
      "export const CODE_LANGUAGE_STORAGE_KEY = 'mql-code-editor-language'"
    )
    expect(helper).toContain("addEventListener('storage'")
  })
})
