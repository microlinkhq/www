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
const VARIANT_PROP = () => /\bvariant\s*[:=]\s*\{?\s*['"]([^'"]+)['"]/g
const STYLED_BUTTON = () =>
  /(?:export\s+)?const\s+([A-Z]\w*)\s*=\s*styled\(Button\)/g
const ICON_IMPORT =
  /import\s*\{([^}]*)\}\s*from\s*['"](?:react-feather|components\/icons\/[^'"]+)['"]/g
const DEFAULT_ICON_IMPORT =
  /import\s+([A-Z]\w*)\s+from\s*['"]components\/icons\/[^'"]+['"]/g

const files = walk(SRC).filter(file => !SKIP.test(file))
const sources = new Map(
  files.map(file => [file, fs.readFileSync(file, 'utf8')])
)

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

const visibleLabel = body => body.replace(/<[^>]*>/g, '').trim()

const keepsIcon = (openingTag, body) =>
  /aria-label=/.test(openingTag) && visibleLabel(body) === ''

const decorativeIcon = ({ openingTag, body, src }) => {
  if (keepsIcon(openingTag, body)) return false
  const icon = new RegExp(`<(?:svg|${iconNamesOf(src).join('|')})\\b`)
  return icon.test(body)
}

const buttonNames = sourceMap => {
  const styled = [...sourceMap.values()].flatMap(src =>
    [...src.matchAll(STYLED_BUTTON())].map(([, name]) => name)
  )
  return [...new Set([...ALWAYS_BUTTONS, ...styled])].filter(
    name => !NOT_A_CTA.has(name)
  )
}

const elementsIn = sourceMap => {
  const names = buttonNames(sourceMap)
  return [...sourceMap].flatMap(([file, src]) => {
    const fromButtons = names.flatMap(name =>
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
}

const variantViolations = sourceMap => {
  const fromCallSites = elementsIn(sourceMap).flatMap(({ openingTag, where }) =>
    [...openingTag.matchAll(VARIANT_PROP())].map(([, value]) => ({
      value,
      where
    }))
  )
  const fromStyledAttrs = [...sourceMap].flatMap(([file, src]) =>
    [...src.matchAll(/styled\(Button\)\.attrs\(\{([^}]*)\}\)/g)].flatMap(
      match =>
        [...match[1].matchAll(VARIANT_PROP())].map(([, value]) => ({
          value,
          where: `${relative(file)}:${lineAt(
            src,
            match.index
          )} styled(Button).attrs`
        }))
    )
  )
  return [...fromCallSites, ...fromStyledAttrs]
    .filter(({ value }) => !VARIANTS.includes(value))
    .map(({ value, where }) => `${where} variant='${value}'`)
}

const capsViolations = sourceMap =>
  elementsIn(sourceMap)
    .filter(({ body }) => /<Caps\b/.test(body))
    .map(({ where }) => where)

const iconViolations = sourceMap =>
  elementsIn(sourceMap)
    .filter(decorativeIcon)
    .map(({ where }) => where)

const typeViolations = sourceMap =>
  elementsIn(sourceMap)
    .filter(
      ({ openingTag }) =>
        TYPOGRAPHY.test(openingTag) && !NAMED_CONSTANT.test(openingTag)
    )
    .map(({ where }) => where)

const report = (violations, fix) =>
  violations.length ? `\n\n${fix}\n  ${violations.join('\n  ')}\n` : undefined

const fixture = src => new Map([['fixture.js', src]])

describe('buttons follow the design system', () => {
  test('the theme defines exactly the default and featured variants', () => {
    expect(VARIANTS).toEqual(['default', 'featured'])
  })

  test('every variant passed to a button exists', () => {
    const violations = variantViolations(sources)
    expect(
      violations,
      report(
        violations,
        `Buttons only come in ${VARIANTS.join(' and ')} (AGENTS.md › Buttons):`
      )
    ).toEqual([])
  })

  test('labels are plain text, never wrapped in Caps', () => {
    const violations = capsViolations(sources)
    expect(
      violations,
      report(
        violations,
        'Button already sets the uppercase label, its weight and size. Remove the Caps wrapper:'
      )
    ).toEqual([])
  })

  test('labeled buttons carry no decorative icon', () => {
    const violations = iconViolations(sources)
    expect(
      violations,
      report(
        violations,
        "Remove the icon next to the label. Only icon-only buttons (with an aria-label) keep an icon; the loading spinner comes from Button's loading prop:"
      )
    ).toEqual([])
  })

  test('no per-call label typography overrides', () => {
    const violations = typeViolations(sources)
    expect(
      violations,
      report(
        violations,
        'Button owns its label size, weight, tracking and case. Remove the override, or name a deliberate one as an UPPER_SNAKE constant:'
      )
    ).toEqual([])
  })

  test('the pro plan buy button is featured', () => {
    const src = sources.get(
      files.find(file => file.endsWith('/ProPlanCard.js'))
    )
    expect(src).toContain("variant: 'featured'")
  })
})

describe('button rules accept the real variants and reject the others', () => {
  test('default and featured are allowed, including braces and either quote', () => {
    expect(
      variantViolations(fixture('<Button variant="default">Buy</Button>'))
    ).toEqual([])
    expect(
      variantViolations(fixture("<Button variant='featured'>Buy</Button>"))
    ).toEqual([])
    expect(
      variantViolations(fixture('<Button variant={"featured"}>Buy</Button>'))
    ).toEqual([])
  })

  test('an unknown variant is rejected on a button, a signup link, and styled attrs', () => {
    expect(
      variantViolations(fixture('<Button variant="black">Buy</Button>'))
    ).toHaveLength(1)
    expect(
      variantViolations(fixture("<Button variant={'black'}>Buy</Button>"))
    ).toHaveLength(1)
    expect(
      variantViolations(
        fixture('<SignupLink component={Button} variant="nope">Go</SignupLink>')
      )
    ).toHaveLength(1)
    expect(
      variantViolations(fixture('<SignupLink variant="nope">Go</SignupLink>'))
    ).toEqual([])
    expect(
      variantViolations(
        fixture(
          "const GenerateButton = styled(Button).attrs({ variant: 'nope' })``"
        )
      )
    ).toHaveLength(1)
  })

  test('a Caps label is rejected and a plain label is not', () => {
    expect(
      capsViolations(fixture('<Button><Caps>Buy</Caps></Button>'))
    ).toHaveLength(1)
    expect(capsViolations(fixture('<Button>Buy</Button>'))).toEqual([])
  })

  test('an icon beside a label is rejected, including when the button is named', () => {
    expect(iconViolations(fixture('<Button><svg /></Button>'))).toHaveLength(1)
    expect(
      iconViolations(fixture('<Button><FeatherIcon /></Button>'))
    ).toHaveLength(1)
    expect(
      iconViolations(fixture('<Button><ButtonIcon /></Button>'))
    ).toHaveLength(1)
    expect(
      iconViolations(fixture('<Button aria-label="Run">Run<svg /></Button>'))
    ).toHaveLength(1)
    expect(
      iconViolations(fixture('<Button aria-label="Run"><svg /></Button>'))
    ).toEqual([])
  })

  test.each(['fontSize', 'fontWeight', 'letterSpacing', 'textTransform'])(
    'a %s literal is rejected and a named constant is allowed',
    prop => {
      expect(
        typeViolations(
          fixture(`<Button css={{ ${prop}: '12px' }}>Buy</Button>`)
        )
      ).toHaveLength(1)
      expect(
        typeViolations(
          fixture(
            `<Button css={{ ${prop}: COMPACT_BUTTON_FONT_SIZE }}>Buy</Button>`
          )
        )
      ).toEqual([])
    }
  )
})
