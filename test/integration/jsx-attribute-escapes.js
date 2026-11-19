import fs from 'node:fs'
import { describe, expect, test } from 'vitest'
import { SRC, lineAt, relative, walk } from '../utils/jsx-source'

const JSX_STRING_ATTRIBUTE_WITH_ESCAPE =
  /\s[a-zA-Z][\w-]*=(['"])(?:(?!\1)[^\\\n])*\\(?:u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\}|x[0-9a-fA-F]{2})/g

const escapedAttributes = () =>
  walk(SRC).flatMap(file => {
    const src = fs.readFileSync(file, 'utf8')
    return [...src.matchAll(JSX_STRING_ATTRIBUTE_WITH_ESCAPE)].map(
      match =>
        `${relative(file)}:${lineAt(
          src,
          match.index
        )} → JSX attribute strings render escapes literally, use {'…'} or &nbsp;`
    )
  })

describe('JSX attribute escapes', () => {
  test('no JSX string attribute carries a JS escape sequence', () => {
    expect(escapedAttributes()).toEqual([])
  })
})
