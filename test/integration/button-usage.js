import fs from 'node:fs'
import { describe, expect, test } from 'vitest'
import { variants } from '../../src/theme'
import { SRC, elementsOf, lineAt, relative, walk } from '../utils/jsx-source'

const SKIP = /\.stories\.|[\\/]story\.jsx$/
const VARIANTS = Object.keys(variants.buttons)
const NOT_A_CTA = new Set(['ButtonToggle'])
const ALWAYS_BUTTONS = ['Button', 'Checkout']
const TYPOGRAPHY = /(fontSize|fontWeight|letterSpacing|textTransform)\s*[:=]/
const NAMED_CONSTANT =
  /(fontSize|fontWeight|letterSpacing|textTransform)\s*[:=]\s*\{?\s*[A-Z][A-Z0-9_]+\b/
const VARIANT_PROP = /\bvariant\s*[:=]\s*\{?\s*['"]([^'"]+)['"]/g
const STYLED_BUTTON = /(?:export\s+)?const\s+([A-Z]\w*)\s*=\s*styled\(Button\)/g
const ICON_IMPORT =
  /import\s*\{([^}]*)\}\s*from\s*['"](?:react-feather|components\/icons\/[^'"]+)['"]/g
const DEFAULT_ICON_IMPORT =
  /import\s+([A-Z]\w*)\s+from\s*['"]components\/icons\/[^'"]+['"]/g

const files = walk(SRC).filter(file => !SKIP.test(file))
const sources = new Map(
  files.map(file => [file, fs.readFileSync(file, 'utf8')])
)

const styledButtonNames = [...sources.values()].flatMap(src =>
  [...src.matchAll(STYLED_BUTTON)].map(([, name]) => name)
)
const BUTTON_NAMES = [
  ...new Set([...ALWAYS_BUTTONS, ...styledButtonNames])
].filter(name => !NOT_A_CTA.has(name))

const iconNamesOf = src => {
  const named = [...src.matchAll(ICON_IMPORT)].flatMap(([, list]) =>
    list
      .split(',')
      .map(entry =>
        entry
          .trim()
          .split(/\s+as\s+/)
          .pop()
      )
      .filter(Boolean)
  )
  const defaults = [...src.matchAll(DEFAULT_ICON_IMPORT)].map(
    ([, name]) => name
  )
  return [...named, ...defaults, 'FeatherIcon', 'ButtonIcon']
}

const buttonElements = () =>
  [...sources].flatMap(([file, src]) => {
    const fromButtons = BUTTON_NAMES.flatMap(name =>
      elementsOf(src, name).map(element => ({ ...element, name }))
    )
    const fromSignupLinks = elementsOf(src, 'SignupLink')
      .filter(({ openingTag }) => /component=\{Button\}/.test(openingTag))
      .map(element => ({ ...element, name: 'SignupLink' }))
    return [...fromButtons, ...fromSignupLinks].map(element => ({
      ...element,
      file,
      src,
      where: `${relative(file)}:${lineAt(src, element.index)} <${element.name}>`
    }))
  })

const report = (violations, fix) =>
  violations.length ? `\n\n${fix}\n  ${violations.join('\n  ')}\n` : undefined

describe('buttons follow the design system', () => {
  test('the theme defines exactly the default and featured variants', () => {
    expect(VARIANTS).toEqual(['default', 'featured'])
  })

  test('every variant passed to a button exists', () => {
    const fromCallSites = buttonElements().flatMap(({ openingTag, where }) =>
      [...openingTag.matchAll(VARIANT_PROP)].map(([, value]) => ({
        value,
        where
      }))
    )
    const fromStyledAttrs = [...sources].flatMap(([file, src]) =>
      [...src.matchAll(/styled\(Button\)\.attrs\(\{([^}]*)\}\)/g)].flatMap(
        match =>
          [...match[1].matchAll(VARIANT_PROP)].map(([, value]) => ({
            value,
            where: `${relative(file)}:${lineAt(
              src,
              match.index
            )} styled(Button).attrs`
          }))
      )
    )
    const violations = [...fromCallSites, ...fromStyledAttrs]
      .filter(({ value }) => !VARIANTS.includes(value))
      .map(({ value, where }) => `${where} variant='${value}'`)

    expect(
      violations,
      report(
        violations,
        `Buttons only come in ${VARIANTS.join(' and ')} (AGENTS.md › Buttons):`
      )
    ).toEqual([])
  })

  test('labels are plain text, never wrapped in Caps', () => {
    const violations = buttonElements()
      .filter(({ body }) => /<Caps\b/.test(body))
      .map(({ where }) => where)

    expect(
      violations,
      report(
        violations,
        'Button already sets the uppercase label, its weight and size. Remove the Caps wrapper:'
      )
    ).toEqual([])
  })

  test('labeled buttons carry no decorative icon', () => {
    const violations = buttonElements()
      .filter(({ openingTag, body, src }) => {
        if (/aria-label=/.test(openingTag)) return false
        const icon = new RegExp(`<(svg|${iconNamesOf(src).join('|')})\\b`)
        return icon.test(body)
      })
      .map(({ where }) => where)

    expect(
      violations,
      report(
        violations,
        "Remove the icon next to the label. Only icon-only buttons (with an aria-label) keep an icon; the loading spinner comes from Button's loading prop:"
      )
    ).toEqual([])
  })

  test('no per-call label typography overrides', () => {
    const violations = buttonElements()
      .filter(
        ({ openingTag }) =>
          TYPOGRAPHY.test(openingTag) && !NAMED_CONSTANT.test(openingTag)
      )
      .map(({ where }) => where)

    expect(
      violations,
      report(
        violations,
        'Button owns its label size, weight, tracking and case. Remove the override, or name a deliberate one as an UPPER_SNAKE constant:'
      )
    ).toEqual([])
  })
})
