import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ROOT = path.resolve(__dirname, '../..')

const ALTERNATIVE_PAGES = fs
  .readdirSync(path.join(ROOT, 'src/pages/alternative'))
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .map(file => file.replace(/\.js$/, ''))

const PRODUCT_STORY = 'src/components/patterns/ProductStory'

const SHARED_SOURCES = [
  ...fs
    .readdirSync(path.join(ROOT, PRODUCT_STORY))
    .filter(file => /^alternative-.*\.js$/.test(file))
    .map(file => `${PRODUCT_STORY}/${file}`),
  `${PRODUCT_STORY}/section.js`,
  `${PRODUCT_STORY}/price-comparison.js`,
  `${PRODUCT_STORY}/comparison.js`,
  `${PRODUCT_STORY}/strengths.js`,
  `${PRODUCT_STORY}/story-card.js`,
  'src/components/patterns/SpeedSection/SpeedSection.js'
]

const pageSources = page => {
  const dir = path.join('src/components/pages', page)
  if (!fs.existsSync(path.join(ROOT, dir))) return []
  return fs
    .readdirSync(path.join(ROOT, dir))
    .filter(file => file.endsWith('.js'))
    .map(file => path.join(dir, file))
}

const SOURCES = [...ALTERNATIVE_PAGES.flatMap(pageSources), ...SHARED_SOURCES]

const COLOR_PROP = /(?:^|[^-\w])color\s*:/
const COLOR_KEY = /(?:^|[^-\w])color\s*:/g
const OPENERS = '[({'
const CLOSERS = '])}'

const valueFrom = (text, start) => {
  let depth = 0
  let quote = null
  for (let i = start; i < text.length; i += 1) {
    const char = text[i]
    if (quote) {
      if (char === quote) quote = null
    } else if (char === "'" || char === '"' || char === '`') {
      quote = char
    } else if (OPENERS.includes(char)) {
      depth += 1
    } else if (CLOSERS.includes(char)) {
      if (depth === 0) return text.slice(start, i)
      depth -= 1
    } else if (depth === 0 && (char === ',' || char === '\n')) {
      return text.slice(start, i)
    }
  }
  return text.slice(start)
}

const colorValues = (lines, index) => {
  const rest = lines.slice(index).join('\n')
  return [...lines[index].matchAll(COLOR_KEY)].map(match =>
    valueFrom(rest, match.index + match[0].length)
  )
}
const COLOR_TOKEN = /'(black[1-9]0|secondary|pink\d?)'/g
const NOTE_GRAY = 'black60'
const NOTE_SIZE = /fontSize:\s*0\b/
const BODY_COLORS = [
  ...Array.from({ length: 9 }, (_, index) => `black${index + 1}0`),
  'secondary',
  'pink',
  ...Array.from({ length: 10 }, (_, index) => `pink${index}`)
]

const objectOwning = (lines, index) => {
  const text = lines.join('\n')
  const lineStart =
    index === 0 ? 0 : lines.slice(0, index).join('\n').length + 1
  const colorAt = lines[index].search(COLOR_PROP)
  const offset = lineStart + (colorAt === -1 ? 0 : colorAt)
  const open = []
  for (let i = 0; i <= offset && i < text.length; i += 1) {
    if (text[i] === '{') open.push(i)
    else if (text[i] === '}') open.pop()
  }
  const openAt = open.length === 0 ? -1 : open[open.length - 1]
  if (openAt === -1) return lines[index]
  let depth = 0
  let own = ''
  for (let i = openAt; i < text.length; i += 1) {
    const char = text[i]
    if (char === '{') {
      depth += 1
      if (depth === 1) own += char
    } else if (char === '}') {
      if (depth === 1) return own + char
      depth -= 1
    } else if (depth === 1) own += char
  }
  return own
}

const textColorViolations = source => {
  const lines = source.split('\n')
  return lines.flatMap((line, index) => {
    if (!COLOR_PROP.test(line)) return []
    const isNote = NOTE_SIZE.test(objectOwning(lines, index))
    return colorValues(lines, index)
      .flatMap(value => [...value.matchAll(COLOR_TOKEN)])
      .map(([, token]) => token)
      .filter(token => !(token === NOTE_GRAY && isNote))
      .map(token => ({ line: index + 1, token }))
  })
}

describe('alternative pages text color', () => {
  test('finds every alternative page', () => {
    expect(ALTERNATIVE_PAGES).toHaveLength(21)
  })

  test('story card title and description are both black', () => {
    const source = fs.readFileSync(
      path.join(ROOT, `${PRODUCT_STORY}/story-card.js`),
      'utf8'
    )
    expect(source.match(/color:\s*'black'/g)).toHaveLength(2)
    expect(source).not.toMatch(/black70/)
  })

  test('the rule flags gray body copy and pink, and allows the small gray note', () => {
    expect(
      textColorViolations(
        "css={theme({\n  fontSize: 1,\n  color: 'black70'\n})}"
      )
    ).toEqual([{ line: 3, token: 'black70' }])
    expect(
      textColorViolations(
        "css={theme({\n  color: featured ? 'secondary' : 'black'\n})}"
      )
    ).toEqual([{ line: 2, token: 'secondary' }])
    expect(
      textColorViolations(
        "css={theme({\n  fontSize: 0,\n  color: 'black60'\n})}"
      )
    ).toEqual([])
    expect(
      textColorViolations(
        "css={theme({\n  fontSize: 2,\n  color: 'black60'\n})}"
      )
    ).toEqual([{ line: 3, token: 'black60' }])
    expect(
      textColorViolations("theme({ fontSize: 0, color: 'black60' })")
    ).toEqual([])
    expect(
      textColorViolations("theme({ fontSize: 1, color: 'black60' })")
    ).toEqual([{ line: 1, token: 'black60' }])
    expect(
      textColorViolations(
        "theme({\n  fontSize: 1,\n  color: 'black60',\n  '& small': { fontSize: 0 }\n})"
      )
    ).toEqual([{ line: 3, token: 'black60' }])
    expect(
      textColorViolations(
        "theme({\n  '& small': { fontSize: 0 },\n  color: 'black60'\n})"
      )
    ).toEqual([{ line: 3, token: 'black60' }])
    expect(
      textColorViolations(
        "theme({\n  '& small': { fontSize: 0, color: 'black60' }\n})"
      )
    ).toEqual([])
    expect(
      textColorViolations(
        "theme({ backgroundColor: 'black10', borderBottomColor: 'black20' })"
      )
    ).toEqual([])
    expect(
      textColorViolations("theme({ color: 'black', backgroundColor: 'pink' })")
    ).toEqual([])
    expect(
      textColorViolations("theme({ backgroundColor: 'pink', color: 'pink' })")
    ).toEqual([{ line: 1, token: 'pink' }])
    expect(textColorViolations("theme({ color: ['black', 'pink'] })")).toEqual([
      { line: 1, token: 'pink' }
    ])
    expect(
      textColorViolations(
        "theme({\n  color: [\n    'black',\n    'black70'\n  ]\n})"
      )
    ).toEqual([{ line: 2, token: 'black70' }])
    expect(
      textColorViolations(
        "theme({ color: ['black', 'black'], backgroundColor: 'pink' })"
      )
    ).toEqual([])
  })

  test('flags every non-black text color, on one line or split across lines', () => {
    for (const token of BODY_COLORS.filter(token => token !== NOTE_GRAY)) {
      expect(
        textColorViolations(`theme({ fontSize: 1, color: '${token}' })`)
      ).toEqual([{ line: 1, token }])
    }
  })

  test.each(SOURCES)(
    '%s keeps text black, with gray only for 14px notes',
    file => {
      const source = fs.readFileSync(path.join(ROOT, file), 'utf8')
      expect(textColorViolations(source)).toEqual([])
    }
  )
})
