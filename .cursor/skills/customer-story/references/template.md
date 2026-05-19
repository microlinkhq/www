# Template

This is the canonical template for `src/pages/customers/<slug>.js`. It mirrors the live customer pages (`mymahi.js`, `r-advertising.js`, `luckynote.js`) and consumes shared components from `src/components/patterns/CustomerStory/`.

The skill fills these in after gathering all answers in steps 1–8 of the workflow.

## Shared module

All cross-page primitives live in `src/components/patterns/CustomerStory/`. The customer page imports them by name from the barrel `'components/patterns/CustomerStory'`. Do NOT re-declare these locally:

| Import | Source | Notes |
|---|---|---|
| `CUSTOMERS` | `customers.js` | Single registry of all customer story metadata. Add the new entry here too. |
| `Section`, `SectionInner`, `BodyText`, `Caption`, `Figure`, `FigureImage` | `primitives.js` | Layout primitives (no accent dependency). |
| `SECTION_PX`, `SECTION_PY`, `SECTION_MAX_WIDTH` | `primitives.js` | Spacing constants. |
| `DashedGridOverlay` | `DashedGridOverlay.js` | Decorative background. |
| `StoryTag`, `Eyebrow` | `chrome.js` | Accent-aware. Pass `accent={ACCENT}`. |
| `Testimonial` | `Testimonial.js` | Composed from props (`accent`, `quote`, `author`, `role`, `company`, `initials`, optional `maxWidth`). |
| `MoreCustomers` | `MoreCustomers.js` | Reads from `CUSTOMERS`, filters out `currentSlug`. Self-omits when fewer than 2 siblings remain. |
| `CtaSection` | `CtaSection.js` | Full CTA panel. Looks up RGB triplet from `accent.text`. Optional `mt` prop (default `5`). |
| `WhyCard` | `WhyCards.js` | One numbered card. Pass `accent`, `number`, `kicker`, `title`, `body`. |
| `FlowDiagram` | `FlowDiagram.js` | Renders nodes + arrows. Pass `accent` and a `nodes` array (`{ label, sub, active? }`). |

**Customer-specific bits stay inline in the page file**: the `ACCENT` constant; the `Hero`, `AboutCustomer`, `HowTheyUseIt`, `WhyMicrolink`, `ThanksSection` components (each composes shared primitives + customer copy); a small `ThanksLogo` styled `<img>` (because logo height varies per customer).

## Token reference

### Identity

- `{{CUSTOMER_NAME}}` — display name. e.g. `Vercel`
- `{{CUSTOMER_DOMAIN}}` — bare hostname, e.g. `vercel.com`. Used for the Visit link, the Thanks logo path, and the Thanks logo target.

### Accent

- `{{ACCENT_TEXT}}` / `{{ACCENT_BG_SOFT}}` / `{{ACCENT_BG_EDGE}}` / `{{ACCENT_HIGHLIGHT}}` — values like `teal7`, `teal0`, `teal1`, `teal5`. Resolved via `references/accent-colors.md`.

The `ACCENT_RGB` triplet is no longer needed in the customer page — the shared `CtaSection` looks it up internally from `accent.text`. The triplet table still lives in `references/accent-colors.md` for reference and is mirrored inside `CtaSection.js`. If a new accent ramp is added to `accent-colors.md`, mirror it in `CtaSection.js`.

### Hero

- `{{HERO_HEADLINE}}` — what comes after `{{CUSTOMER_NAME}}:` in the H1.
- `{{HERO_INTRO}}` — one or two sentence caption.
- `{{HERO_CTA_HREF}}` / `{{HERO_CTA_LABEL}}` — see `references/cta-routing.md`. Hero label MUST differ from `{{CTA_LABEL}}`.

### About the customer

- `{{ABOUT_HERO_IMAGE_BLOCK}}` — optional wide screenshot, top of section.
- `{{ABOUT_SUBHEAD}}` / `{{ABOUT_PARA_1}}` / `{{ABOUT_PARA_2}}` — research-grounded copy.
- `{{ABOUT_SCREENSHOT_BLOCK}}` — primary screenshot between paragraphs (real or `FigurePlaceholder`).
- `{{TESTIMONIAL_BLOCK}}` — `<Testimonial accent={ACCENT} ... />` if present, or the empty string.

### How they use Microlink

- `{{HOW_SUBHEAD}}` / `{{HOW_PARA_1}}` / `{{HOW_PARA_2}}` — narrative around the integration.
- `{{HOW_DIAGRAM_BLOCK}}` — `<FlowDiagram>`, `<Figure><FigureImage/></Figure>`, or `<Figure><FigurePlaceholder/></Figure>`. See "Conditional blocks" below.

### Why Microlink

- `{{WHY_SUBHEAD}}` / `{{WHY_LEAD}}` — short headline + lead.
- Three `<WhyCard>` invocations with `kicker`, `title`, `body`.

### Testimonial

- `{{TESTIMONIAL_QUOTE}}` / `{{TESTIMONIAL_AUTHOR}}` / `{{TESTIMONIAL_ROLE}}` / `{{TESTIMONIAL_COMPANY}}` / `{{TESTIMONIAL_INITIALS}}` — props passed to the shared `<Testimonial>` component.
- `{{TESTIMONIAL_PLACEHOLDER_COMMENT}}` — `{/* TODO: replace placeholder testimonial before publishing */}` for placeholder mode, otherwise empty string.
- Optional `maxWidth={layout.normal}` on the `<Testimonial>` if the customer copy is long (otherwise default `layout.small`).

### CTA

- `{{CTA_HEADLINE_PREFIX}}` — e.g. `Ready to ship link`.
- `{{CTA_HEADLINE_ACCENT}}` — accent-colored span, e.g. `previews`.
- `{{CTA_BODY}}` / `{{CTA_HREF}}` / `{{CTA_LABEL}}` — props passed to shared `<CtaSection>`.
- Optional `mt={0}` to disable the default top margin (use only when the preceding section already has heavy bottom padding).

### Thanks

- `{{THANKS_LOGO_BLOCK}}` — `<Text as='a'>` wrapping `<ThanksLogo>` (Variant A) or just the customer name as a styled link (Variant B).
- `{{THANKS_USE_CASE_SHORT}}` — short noun-phrase.
- `{{THANKS_LOGO_HEIGHT}}` — varies per customer (typical: `'32px'` for wordmarks, `'96px'` for square brand marks).

### Head / SEO

- `{{HEAD_TITLE}}` — `{{CUSTOMER_NAME}}: <one-line use case>` (no brand suffix; `Meta` appends ` — Microlink`).
- `{{HEAD_DESCRIPTION}}` — 1-2 sentences.

### MoreCustomers registry

When creating a new customer page, also add an entry to `src/components/patterns/CustomerStory/customers.js`:

```js
{
  slug: '<slug>',
  name: '{{CUSTOMER_NAME}}',
  blurb: '<one-line summary, ~10 words>',
  icon: '/images/clients/<icon-file>'
}
```

The `MoreCustomers` carousel and the `/customers` index page both read from this registry. **Single source of truth** — do NOT duplicate the array in the customer page.

## Full template

```jsx
import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  BodyText,
  Caption,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  Figure,
  FigureImage,
  FlowDiagram,
  MoreCustomers,
  Section,
  SectionInner,
  StoryTag,
  Testimonial,
  WhyCard
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

/* ─── Accent ─────────────────────────────────────────────────────────────── */

const ACCENT = {
  text: '{{ACCENT_TEXT}}',
  bgSoft: '{{ACCENT_BG_SOFT}}',
  bgEdge: '{{ACCENT_BG_EDGE}}',
  highlight: '{{ACCENT_HIGHLIGHT}}'
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <StoryTag accent={ACCENT}>Customer story</StoryTag>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0,
          scrollMarginTop: 4
        })}
      >
        <span css={theme({ color: ACCENT.text })}>{{CUSTOMER_NAME}}:</span>{' '}
        {{HERO_HEADLINE}}
      </Text>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        {{HERO_INTRO}}
      </BodyText>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='{{HERO_CTA_HREF}}'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          {{HERO_CTA_LABEL}}
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── About the customer ─────────────────────────────────────────────────── */

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      {{ABOUT_HERO_IMAGE_BLOCK}}
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        About {{CUSTOMER_NAME}}
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          pb: [3, 3, 4, 4]
        })}
      >
        {{ABOUT_SUBHEAD}}
      </SubheadBase>
      <BodyText>
        {{ABOUT_PARA_1}}
      </BodyText>
      {{ABOUT_SCREENSHOT_BLOCK}}
      <BodyText>
        {{ABOUT_PARA_2}}
      </BodyText>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://{{CUSTOMER_DOMAIN}}'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit {{CUSTOMER_DOMAIN}}
        </Text>
      </Box>
      {{TESTIMONIAL_PLACEHOLDER_COMMENT}}
      {{TESTIMONIAL_BLOCK}}
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 5 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <SubheadBase
        css={theme({
          fontSize: ['24px', '28px', '34px', '38px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        {{HOW_SUBHEAD}}
      </SubheadBase>
      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        {{HOW_PARA_1}}
      </BodyText>
      {{HOW_DIAGRAM_BLOCK}}
      <BodyText>
        {{HOW_PARA_2}}
      </BodyText>
    </SectionInner>
  </Section>
)

/* ─── Why Microlink ──────────────────────────────────────────────────────── */

const WhyMicrolink = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why Microlink
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'left',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          {{WHY_SUBHEAD}}
        </SubheadBase>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          {{WHY_LEAD}}
        </BodyText>
      </Box>

      <Flex
        css={theme({
          gap: 3,
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <WhyCard
          accent={ACCENT}
          number={1}
          kicker='{{WHY_CARD_1_KICKER}}'
          title='{{WHY_CARD_1_TITLE}}'
          body='{{WHY_CARD_1_BODY}}'
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='{{WHY_CARD_2_KICKER}}'
          title='{{WHY_CARD_2_TITLE}}'
          body='{{WHY_CARD_2_BODY}}'
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='{{WHY_CARD_3_KICKER}}'
          title='{{WHY_CARD_3_TITLE}}'
          body='{{WHY_CARD_3_BODY}}'
        />
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Thanks ─────────────────────────────────────────────────────────────── */

const ThanksLogo = styled('img')`
  ${theme({
    display: 'block',
    width: 'auto',
    height: '{{THANKS_LOGO_HEIGHT}}',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 0, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        {{THANKS_LOGO_BLOCK}}
      </Box>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          fontSize: [0, 1],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        <b>Thank you to the {{CUSTOMER_NAME}} team</b> for letting us share
        their use case, and for choosing Microlink to power
        {{THANKS_USE_CASE_SHORT}}.
      </Caption>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const CustomerStoryPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <AboutCustomer />
      <HowTheyUseIt />
      <WhyMicrolink />
      <CtaSection
        accent={ACCENT}
        headlinePrefix='{{CTA_HEADLINE_PREFIX}}'
        headlineAccent='{{CTA_HEADLINE_ACCENT}}'
        body='{{CTA_BODY}}'
        href='{{CTA_HREF}}'
        label='{{CTA_LABEL}}'
      />
      <MoreCustomers accent={ACCENT} currentSlug='{{SLUG}}' />
      <ThanksSection />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='{{HEAD_TITLE}}'
    description='{{HEAD_DESCRIPTION}}'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
```

## Conditional blocks

### `{{ABOUT_HERO_IMAGE_BLOCK}}`

Variant A — wider hero image (step 6c yes):

```jsx
<Figure css={theme({ pt: 0, pb: 5 })}>
  <FigureImage
    src='{{ABOUT_HERO_IMAGE_SRC}}'
    alt='{{CUSTOMER_NAME}} platform'
    width='{{ABOUT_HERO_IMAGE_WIDTH}}'
    height='{{ABOUT_HERO_IMAGE_HEIGHT}}'
    loading='eager'
    decoding='async'
    css={theme({ maxWidth: '800px' })}
  />
</Figure>
```

Variant B — empty (step 6c no): empty string. The `Eyebrow` becomes the first child.

### `{{ABOUT_SCREENSHOT_BLOCK}}`

Variant A — primary screenshot:

```jsx
<Figure>
  <FigureImage
    src='{{ABOUT_IMAGE_SRC}}'
    alt='{{CUSTOMER_NAME}} using Microlink'
    width='{{ABOUT_IMAGE_WIDTH}}'
    height='{{ABOUT_IMAGE_HEIGHT}}'
    loading='lazy'
    decoding='async'
  />
</Figure>
```

Variant B — placeholder (define `FigurePlaceholder` locally; it's not exported from the shared module since most pages don't need it):

```jsx
<Figure>
  <FigurePlaceholder aria-hidden='true'>
    [Screenshot of {{CUSTOMER_NAME}} using Microlink]
  </FigurePlaceholder>
</Figure>
```

`FigurePlaceholder` definition (drop in alongside other inline page styles when needed):

```jsx
const FigurePlaceholder = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: 3,
    width: '100%',
    maxWidth: '600px',
    mx: 'auto',
    py: [4, 4, 5, 5],
    px: 3,
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textAlign: 'center',
    textTransform: 'uppercase'
  })}
`
```

### `{{HOW_DIAGRAM_BLOCK}}`

Variant A — flow diagram (uses the shared `<FlowDiagram>`):

```jsx
<FlowDiagram
  accent={ACCENT}
  nodes={[
    { label: 'Step 1', sub: 'caption' },
    { label: 'Microlink', sub: 'caption', active: true },
    { label: 'Step 3', sub: 'caption' },
    { label: 'Step 4', sub: 'caption' }
  ]}
/>
```

Variant B — image figure:

```jsx
<Figure>
  <FigureImage
    src='{{HOW_IMAGE_SRC}}'
    alt='{{HOW_IMAGE_ALT}}'
    width='{{HOW_IMAGE_WIDTH}}'
    height='{{HOW_IMAGE_HEIGHT}}'
    loading='lazy'
    decoding='async'
  />
</Figure>
```

Variant C — placeholder (define `FigurePlaceholder` locally as above):

```jsx
<Figure>
  <FigurePlaceholder aria-hidden='true'>
    [{{CUSTOMER_NAME}} integration diagram]
  </FigurePlaceholder>
</Figure>
```

### `{{TESTIMONIAL_BLOCK}}` / `{{TESTIMONIAL_PLACEHOLDER_COMMENT}}`

Real testimonial:

```jsx
<Testimonial
  accent={ACCENT}
  quote='{{TESTIMONIAL_QUOTE}}'
  author='{{TESTIMONIAL_AUTHOR}}'
  role='{{TESTIMONIAL_ROLE}}'
  company='{{TESTIMONIAL_COMPANY}}'
  initials='{{TESTIMONIAL_INITIALS}}'
/>
```

Placeholder testimonial:

```jsx
{/* TODO: replace placeholder testimonial before publishing */}
<Testimonial
  accent={ACCENT}
  quote='[Customer testimonial — pull-quote about why Microlink works for them.]'
  author='[Author Name]'
  role='[Role]'
  company='{{CUSTOMER_NAME}}'
  initials='[X]'
/>
```

No testimonial: `{{TESTIMONIAL_BLOCK}}` and `{{TESTIMONIAL_PLACEHOLDER_COMMENT}}` are both empty strings. Drop entirely.

Optional `maxWidth={layout.normal}` if the quote is long (look at `mymahi.js` for an example).

### `{{THANKS_LOGO_BLOCK}}`

Variant A — customer SVG/PNG logo:

```jsx
<Text as='a' href='https://{{CUSTOMER_DOMAIN}}' target='_blank' rel='noopener'>
  <ThanksLogo
    src='{{THANKS_LOGO_SRC}}'
    alt='{{CUSTOMER_NAME}}'
    width='{{THANKS_LOGO_WIDTH}}'
    height='{{THANKS_LOGO_HEIGHT_ATTR}}'
    loading='lazy'
    decoding='async'
  />
</Text>
```

Variant B — text-only (no logo file):

```jsx
<Text
  as='a'
  href='https://{{CUSTOMER_DOMAIN}}'
  target='_blank'
  rel='noopener'
  css={theme({
    color: ACCENT.text,
    fontWeight: 'bold',
    fontSize: [1, 2, 2, 2],
    textDecoration: 'underline'
  })}
>
  {{CUSTOMER_NAME}}
</Text>
```

If `ThanksSection` is omitted entirely: drop the entire component, the `ThanksLogo` styled component, and the `<ThanksSection />` render line. The skill should rarely choose this.
