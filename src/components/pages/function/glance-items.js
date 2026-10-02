import { EXAMPLES } from '../editor/examples'
import { ENTRY_FILE, editorTemplateHref } from '../editor/shared'

const toCardCode = source => {
  const text = source
    .split('\n')
    .filter(line => line !== "import createClient from 'microlink.io'")
    .filter(line => line !== 'const microlink = createClient()')
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .replace(/^export default /m, 'const { value } = await ')

  return text.replace(
    /const \{ value \} = await microlink\.function\('([^']*)', ([^\n]+)\)/,
    (_, url, rest) =>
      `const { value } = await microlink.function(\n  '${url}',\n  ${rest}\n)`
  )
}

const glanceCode = example => {
  const main = toCardCode(example.files[ENTRY_FILE])
  const extra = Object.entries(example.files).find(
    ([name]) => name !== ENTRY_FILE
  )
  if (!extra) return main
  const [name, source] = extra
  return `// ${name}\n${source.trim()}\n\n${main}`
}

export const glanceItems = EXAMPLES.map(example => ({
  id: example.id,
  title: example.label,
  href: editorTemplateHref(example.id),
  span: 2,
  code: glanceCode(example)
}))
