import { isTypeScriptFile } from './shared'

const rewriteSpecifiers = source =>
  source
    .replace(/((?:from|import)\s*\(?\s*['"])\.\/([^'"]+)(['"])/g, '$1$2$3')
    .replace(
      /((?:from|import)\s*\(?\s*['"])https:\/\/esm\.sh\/microlink\.io(?:@[^'"]*)?(['"])/g,
      '$1microlink.io$2'
    )

let transformTs

const loadTransform = async () => {
  if (!transformTs) {
    const { transform } = await import('sucrase')
    transformTs = source =>
      transform(source, {
        transforms: ['typescript'],
        disableESTransforms: true
      }).code
  }
  return transformTs
}

export const toModuleSource = async (name, source) => {
  const rewritten = rewriteSpecifiers(source)
  if (!isTypeScriptFile(name)) return rewritten
  const transform = await loadTransform()
  return transform(rewritten)
}
