import fs from 'node:fs'
import path from 'node:path'

export const sourceHarness = relpath => {
  const source = fs.readFileSync(path.join(process.cwd(), relpath), 'utf8')
  const slice = (start, end) =>
    source.slice(source.indexOf(start), source.indexOf(end))
  const evaluate = (code, name, scope = {}) =>
    // eslint-disable-next-line no-new-func
    new Function(...Object.keys(scope), `${code}; return ${name}`)(
      ...Object.values(scope)
    )
  return { source, slice, evaluate }
}
