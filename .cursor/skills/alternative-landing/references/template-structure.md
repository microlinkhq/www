# Template Structure

Canonical reference extracted from the current `src/pages/alternative/*.js` pages (April 2026). Every new alternative landing page must match this structure.

## Imports

```js
import {
  borders,
  colors,
  layout,
  theme,
  textGradient,
  fontSizes,
  space,
  radii,
  breakpoints
} from 'theme'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import Faq from 'components/patterns/Faq/Faq'
import ArrowLink from 'components/patterns/ArrowLink'
import RaceContainer from 'components/patterns/RaceContainer/RaceContainer'
import BluePrintBackground from 'components/patterns/BluePrintBackground/BluePrintBackground'
import { cdnUrl } from 'helpers/cdn-url'
import styled, { css } from 'styled-components'
import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { extractDomain } from 'helpers/extract-domain'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { useBreakpoint } from 'components/hook/use-breakpoint'
```

Note: the `RaceHero` styled component is defined between the theme imports and the React imports in the canonical file. Keep this order.

## Wrapped components

```js
const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)
```

## Breakpoint / spacing constants

```js
const BREAKPOINT_SMALL_MAX = breakpoints[0]
const BREAKPOINT_COMPACT_MAX = `calc(${breakpoints[0]} - ${space[5]} - ${space[4]} - ${space[3]} - ${space[2]})`
const SPACE_10 = `calc(${space[2]} + ${radii[1]})`
const SPACE_12 = `calc(${space[3]} - ${space[1]})`
const SPACE_14 = `calc(${space[3]} - ${radii[1]})`
const SPACE_6 = `calc(${space[2]} - ${radii[1]})`

const CTA_TITLE_FONT_SIZE = [
  `calc(${fontSizes[3]} + ${space[3]} - ${space[1]})`,
  `calc(${fontSizes[4]} - ${space[1]})`,
  fontSizes[4],
  `calc(${fontSizes[4]} + ${SPACE_6})`
]

const CTA_LINK_FONT_SIZE = [
  `calc(${fontSizes[2]} + ${space[1]})`,
  fontSizes[3],
  `calc(${fontSizes[3]} + ${radii[1]})`,
  `calc(${fontSizes[3]} + ${space[1]})`
]
```

## Data constants (customize per competitor)

### BENCHMARK_DATA

Copy only `microlink` and the target competitor from `src/pages/benchmarks/screenshot-api.js`. Inline the name strings (do not reference `PROVIDER_NAMES`). Keep the same `testUrls` array.

```js
const BENCHMARK_DATA = {
  timestamp: '2026-03',
  testUrls: [ /* same 7 URLs as benchmarks page */ ],
  results: {
    microlink: { name: 'Microlink', summary: { ... }, perUrl: [ ... ] },
    [competitorKey]: { name: '[CompetitorName]', summary: { ... }, perUrl: [ ... ] }
  }
}
```

### SERVICE_COLORS

```js
const SERVICE_COLORS = {
  microlink: colors.red6,
  [competitorKey]: colors.[pick unused color]
}
```

Already used colors: `pink6` (screenshotone), `grape7` (screenshotapi), `teal6` (urlbox), `blue6` (screenshotmachine), `orange6` (apiflash). Available: `cyan6`, `indigo6`, `violet6`, `lime6`, `yellow6`, etc.

### Derived constants

```js
const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })
const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })
const SERVICES = Object.keys(BENCHMARK_DATA.results)
const SORTED_SERVICES = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.avgColdDuration -
    BENCHMARK_DATA.results[b].summary.avgColdDuration
)
```

## Styled components catalog

Copy these definitions verbatim into every new page.

### RaceHero

```js
const RaceHero = styled(Box)`
  width: 100%;
  max-width: 960px;
  ${theme({
    borderRadius: 4,
    bg: 'white',
    p: [3, 3, 4, 4],
    boxShadow: `0 25px 50px ${colors.black10}, 0 0 0 1px ${colors.black05}`
  })}
  & > div {
    min-height: 220px;
    @media (max-width: ${breakpoints[0]}) {
      min-height: 190px;
    }
  }
`
```

### Section / SectionInner

```js
const Section = styled(Box)`
  ${theme({ py: [5, 5, 6, 6], px: [3, 3, 4, 4] })}
`
const SectionInner = styled(Container)`
  ${theme({
    maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
    alignItems: 'center',
    pt: 0
  })}
`
```

### Badge

```js
const Badge = styled(Caps)`
  display: inline-flex;
  align-items: center;
  ${theme({
    fontSize: '11px',
    fontWeight: 'bold',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    letterSpacing: '0.08em'
  })}
`
```

### GradientText

```js
const GradientText = styled('span')`
  ${css`
    ${textGradient}
  `}
`
```

### FeatureTable

```js
const FeatureTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;
  th,
  td {
    padding: ${SPACE_10} ${SPACE_14};
    ${theme({ textAlign: 'left', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};
    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      padding: ${space[2]} ${SPACE_10};
      white-space: normal;
      word-break: break-word;
    }
  }
  th {
    font-weight: 600;
    text-transform: uppercase;
    ${theme({ color: 'black', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black10};
  }
  td {
    ${theme({ color: 'black' })};
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`
```

### PerUrlTable

```js
const PerUrlTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;
  th,
  td {
    padding: ${space[2]} ${SPACE_12};
    ${theme({ textAlign: 'right', fontSize: 0, fontFamily: 'mono' })};
    border-bottom: ${borders[1]} ${colors.black05};
    white-space: nowrap;
  }
  th {
    font-weight: 600;
    text-transform: uppercase;
    ${theme({ color: 'black', fontSize: 0 })};
    border-bottom: ${borders[1]} ${colors.black10};
  }
  th:first-child,
  td:first-child {
    text-align: left;
    font-weight: 500;
    ${theme({ color: 'black' })};
  }
  th:last-child,
  td:last-child {
    @media (max-width: ${BREAKPOINT_COMPACT_MAX}) {
      display: none;
    }
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  tbody tr:hover {
    ${theme({ bg: 'black05' })};
  }
`
```

### Cell helpers

```js
const CellHighlight = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'green7' })};
`
const CellLoser = styled('span')`
  ${theme({ fontWeight: 'bold', color: 'red8' })};
`
```

### Mobile benchmark cards

```js
const MobileCards = styled('div')`
  ${theme({ display: 'none', flexDirection: 'column', width: '100%' })};
  gap: ${SPACE_12};
  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ display: 'flex' })};
  }
`
const MobileCard = styled('div')`
  ${theme({ borderRadius: 4, bg: 'white' })};
  border: ${borders[1]} ${colors.black10};
  overflow: hidden;
`
const MobileCardHeader = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    bg: 'black05'
  })};
  color: ${colors.black} !important;
  padding: ${SPACE_10} ${SPACE_14};
  border-bottom: ${borders[1]} ${colors.black10};
`
const MobileCardRow = styled('div')`
  ${theme({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'mono',
    fontSize: 0
  })};
  padding: ${space[2]} ${SPACE_14};
  font-variant-numeric: tabular-nums;
  border-bottom: ${borders[1]} ${colors.black05};
  &:last-child {
    border-bottom: 0;
  }
`
const MobileCardName = styled('span')`
  ${theme({ color: 'black' })};
  font-weight: 500;
`
const MobileCardTime = styled('span')`
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  color: ${({ $isMin, $isMax }) =>
    $isMin ? colors.green7 : $isMax ? colors.red8 : colors.black};
`
```

### Pricing components

```js
const PriceCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    flex: 1,
    minWidth: '260px'
  })}
`
const PriceAmount = styled(Text)`
  ${theme({ fontSize: [4, 5, 5, 5], fontWeight: 'bold', lineHeight: 0 })}
  font-variant-numeric: tabular-nums;
`
```

### Check / Cross / Partial

```js
const Check = () => (
  <span
    css={theme({
      color: 'green7',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center'
    })}
    aria-label='Yes'
    role='img'
  >
    ✓
  </span>
)
const Cross = () => (
  <span
    css={theme({
      color: 'red5',
      fontFamily: 'mono',
      fontSize: 1,
      display: 'block',
      textAlign: 'center',
      opacity: 0.7
    })}
    aria-label='No'
    role='img'
  >
    ✕
  </span>
)
const Partial = ({ children }) => (
  <span
    css={theme({
      color: 'yellow7',
      fontFamily: 'mono',
      fontSize: 0,
      display: 'block',
      textAlign: 'center'
    })}
  >
    {children || '~'}
  </span>
)
```

### WhySwitch timeline components

The "Why Developers Switch" section uses a vertical timeline layout with numbered items and connecting lines, not a card grid.

```js
const WhySwitchTimeline = styled(Flex)`
  position: relative;
  ${theme({
    flexDirection: 'column',
    alignItems: 'flex-start'
  })}
`
const WhySwitchItem = styled(Flex)`
  ${theme({
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 0
  })}
`
const WhySwitchRail = styled('div')`
  ${theme({ flexShrink: 0, position: 'relative', mr: [3, 3, 4, 4] })}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32px;
  @media (min-width: ${breakpoints[1]}) {
    width: 40px;
  }
`
const WhySwitchConnector = styled('div')`
  width: 1px;
  flex: 1;
  ${theme({ bg: 'black10', mt: 2, mb: 2 })}
`
const WhySwitchNumber = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: [3, 3, 4, 4],
    fontWeight: 'bold',
    lineHeight: 0,
    flexShrink: 0
  })}
  ${css`
    ${textGradient}
  `}
  opacity: 0.90;
`
```

## Section order (page component)

The page component must render sections in this exact order:

```jsx
const [CompetitorName]Page = () => (
  <Layout>
    <Hero />
    <SpeedSection />
    <WhySwitchSection />
    <PricingSection />
    <CTASection />
    <ComparisonSection />
    <HonestySection />
    <TryItSection />
    <FAQSection />
  </Layout>
)
```

## Section prop patterns

### Hero

- Wrapper: `<BluePrintBackground as='section'>`
- Inner flex: `flexDirection: 'column', alignItems: 'center', pt: 3, pb: [4, 4, 5, 5], px: 4`
- Heading: `variant={null}`, `textAlign: 'center', maxWidth: '100%', fontSize: [4, 4, 5, 5], color: 'black'`
- Caption: `forwardedAs='h2'`, `pt: [3, 3, 4, 4], maxWidth: layout.large, color: 'black80'`, `titleize={false}`
- CTA flex: `pt: [3, 3, 4, 4], pb: [3, 3, 4, 4], fontSize: [2, 2, 3, 3], gap: '16px'`
- CTA: `<ArrowLink href='/screenshot'>Get Started Free</ArrowLink>`
- Race wrapper flex: `width: '100%', justifyContent: 'center', my: [3, 3, 4, 4], pb: [3, 3, 4, 4]`
- RaceHero: add `aria-label='Live benchmark race: Microlink vs [Competitor] screenshot speed'`
- RaceContainer props: `benchmarkData`, `serviceColors`, `highlightKey='microlink'`, `flat`, `compact`

### SpeedSection

- Section: `id='speed'`, `bg: 'white', pt: [3, 3, 4, 4]`
- Subhead: `pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4]`, use `<GradientText>` for speed claim
- Caption: `pb: [3, 3, 4, 4], maxWidth: layout.normal, color: 'black80', fontSize: 3`
- Methodology text: `pb: [3, 3, 4, 4], maxWidth: layout.normal, color: 'black60', fontSize: 2, lineHeight: 2, textAlign: 'center', mx: 'auto'`
- Two-column flex: `pt: [3, 3, 4, 4], flexDirection: ['column', 'column', 'row', 'row'], gap: [3, 3, 4, 4]`
- Left column: per-URL table (desktop `display: ['none', 'block']`) + MobileCards
- Right column: average table + benchmark link box (`mt: 4, p: 1`) + footnote text (`pt: 4, fontSize: 0, color: 'black40', fontFamily: 'mono'`)

### WhySwitchSection

Uses a vertical timeline layout, not a card grid.

- Section: `id='why-switch'`, `bg: 'pinky'`
- Subhead: `color: 'black', pb: [1, 2, 2, 2]`, text: `Why <GradientText>Developers</GradientText> Switch`, `titleize={false}`
- Caption: `color: 'black60', pb: [4, 4, 5, 5], maxWidth: layout.normal`, `titleize={false}`
- Data: `WHY_SWITCH_ITEMS` array with `{ number, title, description }`, 6 items numbered `'01'`–`'06'`
- Layout: `WhySwitchTimeline` wrapping `WhySwitchItem` rows, each with:
  - `WhySwitchRail` containing `WhySwitchNumber` (gradient text, `aria-hidden='true'`) and `WhySwitchConnector` (except last item)
  - Content `Box` with `flex: 1, minWidth: 0, pb: isLast ? 0 : [3, 3, 4, 4]`
  - Title: `fontWeight: 'bold', fontSize: [2, 2, 3, 3], color: 'black', pb: 2, lineHeight: 1`
  - Description: `fontSize: [1, 1, 2, 2], color: 'black90', lineHeight: 2, maxWidth: '40em'`
- Timeline container: `width: '100%', maxWidth: layout.normal, mx: 'auto'`

### PricingSection

- Section: `id='pricing'`, `py: 5`
- Subhead: `pb: [2, 2, 3, 3], fontSize: [4, 4, 5, 5], pt: 3`
- Caption: `pb: [4, 4, 5, 5], maxWidth: layout.large, color: 'black60'`
- Cards flex: `gap: [3, 3, 4, 4], flexDirection: ['column', 'column', 'row', 'row'], maxWidth: layout.normal, mx: 'auto'`
- Microlink card: wrapped in gradient-border `<Box>` with `style={{ background: 'linear-gradient(90deg, rgb(247, 102, 152), rgb(192, 63, 162) 60%, rgb(140, 27, 171) 100%)', padding: '2px' }}`
- PriceCard inside: `style={{ border: 'none', borderRadius: '6px', flex: 1, minWidth: 0, background: 'white' }}`
- Badge colors: Microlink `background: colors.blue0, color: colors.blue8`. Competitor `background: colors.gray1, color: colors.gray7`.
- CTA link: `<Link href='/screenshot'><Caps>Start for free</Caps></Link>` (wrapped in `Box` with `pt: 3`)
- Footer text: `pt: 4, mb: 4, fontSize: 1, color: 'black60', textAlign: 'center', maxWidth: layout.small, mx: 'auto', lineHeight: 2`

### CTASection

- Section: `id='get-started'`
- Background via `theme({...})`: radial-gradient (the exact gradient string from screenshotone)
- Borders: `borderTop/borderBottom: borders[1] + colors.white20`
- Padding: `py: [4, 4, 5, 5]`
- Inner flex: `flexDirection: 'column', alignItems: 'center', maxWidth: layout.large, mx: 'auto', textAlign: 'center'`
- Subhead: `color: 'white', pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4]`, `titleize={false}`
- Caption: free-request mention with `<b>` for emphasis, `color: 'white'` or `'white80'`
- CTA: `<ArrowLink href='/screenshot' css={theme({ fontSize: 3, px: 5, py: 3, color: 'white' })}>Start Building Free</ArrowLink>`

### ComparisonSection

- Section: `id='comparison'`, borders top/bottom `black05`, `py: 5`
- Subhead: `pb: [2, 2, 3, 3], fontSize: [3, 3, 4, 4], pt: 4`, text: `<GradientText>Feature-by-Feature</GradientText> Comparison`, `titleize={false}`
- Caption: `pt: 2, pb: [3, 3, 4, 4], maxWidth: layout.normal, color: 'black60'`, text: "An honest look at what each API offers.", `titleize={false}`
- Footer: `pt: 4, pb: 4, fontSize: '12px', color: 'black40', textAlign: 'center', fontFamily: 'mono'`

### HonestySection

Uses a numbered list layout, not a grid.

- Section: `id='[competitor]-strengths'`, `bg: 'gray0', px: 5, pt: 5, pb: 6`
- Subhead: `pb: [4, 4, 5, 5], fontSize: [4, 4, 5, 5], pt: 3`, text uses `<GradientText>` + `<br />`, `titleize={false}`
- Container: `maxWidth: layout.normal, width: '100%', mx: 'auto'`
- Each item: `Flex` row with `alignItems: 'baseline'`, `py: [3, 3, 3, 3]`, `borderBottom: isLast ? 0 : 1`, `borderBottomColor: 'black05'`
  - Left: zero-padded index number in `Text` with `fontFamily: 'mono', fontSize: 0, color: 'black20', flexShrink: 0, mr: [3, 3, 4, 4], minWidth: '24px'`, `aria-hidden='true'`
  - Right: `Box` with `flex: 1, minWidth: 0` containing:
    - Title: `fontWeight: 'bold', fontSize: [1, 1, 2, 2], color: 'black', pb: 1`
    - Description: `fontSize: [0, 0, 1, 1], color: 'black50', lineHeight: 2, maxWidth: '40em'`
- 4–6 items covering genuine competitor strengths.

### TryItSection

Interactive code editor section with secondary CTA.

- Section: `as='section'`, `py: [5, 5, 6, 6]`
- Uses `useBreakpoint()` hook for responsive editor height
- Subhead: `fontSize: CTA_TITLE_FONT_SIZE, textAlign: 'center'`, text: `Ship <span css='color: #fa5252;'>faster</span> screenshots`
- Caption: `forwardedAs='div'`, `pt: [3, 3, 4, 4], maxWidth: [layout.small, layout.small, layout.normal, layout.normal], textAlign: 'center'`
- Editor wrapper flex: `pt: [4, 4, 5, 5], width: '100%', px: [2, 3, 0, 0]` with child width override CSS
- `MultiCodeEditorInteractive`: `height={breakpoint === 0 ? 250 : 180}`, `mqlCode={{ url: 'https://www.apple.com', screenshot: true }}`
- CTA flex: `pt: [3, 3, 4, 4], gap: [3, 3, 4, 4], flexDirection: ['column', 'column', 'row', 'row'], alignItems: 'center'`
- Link: `href='/docs/guides/screenshot'`, `fontSize: CTA_LINK_FONT_SIZE`, text: "Start now for free"

### FAQSection

- Faq component: `css={theme({ py: 0 })}`
- 7–9 questions. Each answer uses `<>` fragments with `<div>` blocks and `<Link>` components.
- Questions must be unique across all alternative pages.
- Prefer the `FAQ_ITEMS` array pattern for new pages (see below).

#### FAQ_ITEMS pattern (preferred for new pages)

Define a single array that holds JSX for rendering and plain text for schema:

```js
const FAQ_ITEMS = [
  {
    question: 'Question text here?',
    answer: (
      <>
        <div>JSX answer with <Link href='...'>links</Link>.</div>
      </>
    ),
    text: 'Plain text answer for schema. No HTML tags.'
  },
  // ... 7–9 items
]
```

Render:

```jsx
const FAQSection = () => (
  <Faq
    css={theme({ py: 0 })}
    questions={FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))}
  />
)
```

Schema (in Head):

```js
{
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ question, text }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text
    }
  }))
}
```

### Head (SEO)

```jsx
export const Head = () => (
  <Meta
    title='[Unique SEO title]'
    description='[Unique meta description]'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
    structured={[
      { '@context': 'https://schema.org', '@type': 'WebPage', ... },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [ ... ] }
    ]}
  />
)
```

- WebPage schema: `name`, `description`, `url` (must match `https://microlink.io/alternative/[slug]`), `mainEntity` with Microlink SoftwareApplication.
- FAQPage schema: mirror every FAQ question/answer as plain text (no HTML).
