import { editorLanguage, isTypeScriptFile } from './shared'

const flattenMessage = text => {
  if (typeof text === 'string') return text
  if (text && text.messageText) return flattenMessage(text.messageText)
  return String(text || '')
}

const uriFor = (monaco, name) => monaco.Uri.parse(`file:///${name}`)

export const modelForFile = (monaco, name) => {
  const uri = uriFor(monaco, name)
  return (
    monaco.editor.getModel(uri) ||
    monaco.editor.getModels().find(model => {
      const path = model.uri.path.replace(/^\//, '')
      return path === name || path.endsWith(`/${name}`)
    })
  )
}

export const ensureModels = (monaco, files) => {
  for (const [name, source] of Object.entries(files || {})) {
    const existing = modelForFile(monaco, name)
    if (existing) {
      if (existing.getValue() !== source) existing.setValue(source)
      continue
    }
    monaco.editor.createModel(
      source,
      editorLanguage(name),
      uriFor(monaco, name)
    )
  }
}

const diagnosticsFor = async (monaco, name, uri) => {
  const getter = isTypeScriptFile(name)
    ? monaco.languages.typescript.getTypeScriptWorker
    : monaco.languages.typescript.getJavaScriptWorker
  const worker = await getter()
  const client = await worker(uri)
  return client.getSyntacticDiagnostics(uri.toString())
}

export const formatSyntaxError = errors => ({
  name: 'SyntaxError',
  message: errors
    .map(err => `${err.file}:${err.line}:${err.column} ${err.message}`)
    .join('\n')
})

export const collectSyntaxErrors = async (monaco, files) => {
  if (!monaco?.editor || !files) return []
  try {
    ensureModels(monaco, files)
    const groups = await Promise.all(
      Object.keys(files).map(async name => {
        const model = modelForFile(monaco, name)
        if (!model) return []
        const diags = await diagnosticsFor(monaco, name, model.uri)
        return diags.map(diag => {
          const pos = model.getPositionAt(diag.start || 0)
          return {
            file: name,
            line: pos.lineNumber,
            column: pos.column,
            message: flattenMessage(diag.messageText)
          }
        })
      })
    )
    return groups.flat()
  } catch (_) {
    return []
  }
}
