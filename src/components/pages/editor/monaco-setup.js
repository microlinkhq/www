import { colors, fonts, fontSizes } from 'theme'

import { PUPPETEER_TYPES } from './monaco-puppeteer-types'
import { MICROLINK_TYPES } from './monaco-types'

const hex6 = value => {
  const short = String(value || '').match(/^#([0-9a-f]{3})$/i)
  if (!short) return value
  const [r, g, b] = short[1]
  return `#${r}${r}${g}${g}${b}${b}`
}

export const editorOptions = {
  fontFamily: fonts.mono,
  fontSize: parseInt(fontSizes[0], 10),
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: 'on',
  hideCursorInOverviewRuler: true,
  lineNumbersMinChars: 3,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },
  scrollbar: { useShadows: false },
  overviewRulerLanes: 0,
  renderLineHighlight: 'none',
  tabSize: 2
}

export const monacoTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      background: hex6(colors.white),
      foreground: hex6(colors.primary),
      token: ''
    },
    { foreground: hex6(colors.gray6), token: 'comment' },
    { foreground: hex6(colors.gray9), token: 'string' },
    { foreground: hex6(colors.secondary), token: 'keyword' },
    { foreground: hex6(colors.secondary), token: 'constant.language' },
    { foreground: hex6(colors.gray7), token: 'delimiter' }
  ],
  colors: {
    'editor.background': hex6(colors.white),
    'editor.lineHighlightBackground': hex6(colors.white),
    'editorLineNumber.foreground': hex6(colors.gray5),
    'editorLineNumber.activeForeground': hex6(colors.gray7),
    'editorCursor.foreground': hex6(colors.gray7),
    'editor.selectionBackground': hex6(colors.gray2)
  }
}

export const setupMonaco = monaco => {
  monaco.editor.defineTheme('microlink', monacoTheme)
  const compilerOptions = {
    target: monaco.languages.typescript.ScriptTarget.ESNext,
    allowJs: true,
    allowNonTsExtensions: true,
    allowSyntheticDefaultImports: true,
    esModuleInterop: true,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    lib: ['esnext', 'dom']
  }
  const extras = [
    [PUPPETEER_TYPES, 'ts:filename/puppeteer-core.d.ts'],
    [MICROLINK_TYPES, 'ts:filename/microlink.io.d.ts'],
    [
      'declare const Buffer: { concat(chunks: Uint8Array[]): { toString(encoding: string): string } }',
      'ts:filename/buffer.d.ts'
    ]
  ]
  for (const defaults of [
    monaco.languages.typescript.javascriptDefaults,
    monaco.languages.typescript.typescriptDefaults
  ]) {
    defaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false
    })
    defaults.setEagerModelSync(true)
    defaults.setCompilerOptions(compilerOptions)
    for (const [source, path] of extras) defaults.addExtraLib(source, path)
  }
}
