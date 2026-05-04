# Template

This is the canonical template for `src/pages/customers/<slug>.js`. It mirrors `src/pages/customers/example.js` exactly but every author-supplied value has been replaced by a `{{TOKEN}}` placeholder.

The skill fills these in after gathering all answers in steps 1–8 of the workflow.

## Token reference

### Identity

- `{{CUSTOMER_NAME}}` — display name, used in H1 span and copy. e.g. `Vercel`
- `{{CUSTOMER_NAME_LOWER}}` — same but lowercased, used in prose like "About vercel". Capitalize naturally where it starts a sentence.

### Accent (resolved via `references/accent-colors.md`)

- `{{ACCENT_TEXT}}`       — e.g. `teal7`
- `{{ACCENT_BG_SOFT}}`    — e.g. `teal0`
- `{{ACCENT_BG_EDGE}}`    — e.g. `teal1`
- `{{ACCENT_HIGHLIGHT}}`  — e.g. `teal5`

### Hero

- `{{HERO_HEADLINE}}`   — what comes after `{{CUSTOMER_NAME}}:` in the H1.
- `{{HERO_INTRO}}`      — one or two sentence caption.
- `{{HERO_CTA_HREF}}`   — resolved via `references/cta-routing.md`.
- `{{HERO_CTA_LABEL}}`  — resolved via `references/cta-routing.md`.

### About the customer

- `{{ABOUT_SUBHEAD}}`            — one-line description of what the customer does.
- `{{ABOUT_PARA_1}}`             — first paragraph (research from website).
- `{{ABOUT_PARA_2}}`             — second paragraph (research from website).
- `{{ABOUT_SCREENSHOT_BLOCK}}`   — either a `Figure`+`FigureImage` block (if user provided an image path) or a `Figure`+`FigurePlaceholder` block labelled with the customer name. See "Conditional blocks" below.

### How they use Microlink

- `{{HOW_SUBHEAD}}`        — short headline summarizing what Microlink powers for them.
- `{{HOW_PARA_1}}`         — paragraph before the diagram.
- `{{HOW_DIAGRAM_BLOCK}}`  — either a flow diagram (ported from `proxy.js`) or an image figure or a placeholder. See "Conditional blocks".
- `{{HOW_PARA_2}}`         — paragraph after the diagram.

### Why Microlink

- `{{WHY_SUBHEAD}}`           — short headline.
- `{{WHY_LEAD}}`              — lead paragraph.
- `{{WHY_CARD_1_KICKER}}`     — e.g. `Reliability`
- `{{WHY_CARD_1_TITLE}}`      — short title
- `{{WHY_CARD_1_BODY}}`       — explanation
- `{{WHY_CARD_2_KICKER}}` / `{{WHY_CARD_2_TITLE}}` / `{{WHY_CARD_2_BODY}}`
- `{{WHY_CARD_3_KICKER}}` / `{{WHY_CARD_3_TITLE}}` / `{{WHY_CARD_3_BODY}}`

### Testimonial (optional)

- `{{TESTIMONIAL_SECTION}}`        — the entire `<Testimonial />` styled-component block + the `Testimonial` component definition. Empty string if no testimonial.
- `{{TESTIMONIAL_RENDER}}`         — `<Testimonial />` line inside the page composition. Empty string if no testimonial.

### More customer stories carousel (auto-detected)

- `{{MORE_CUSTOMERS_SECTION}}`     — the entire styled-component block + `MORE_CUSTOMERS` array + `MoreCustomers` component. Empty string if fewer than 2 other customer pages exist.
- `{{MORE_CUSTOMERS_RENDER}}`      — `<MoreCustomers />` line. Empty string if removed.

### CTA

- `{{CTA_HEADLINE_PREFIX}}` — e.g. `Ready to ship with`
- `{{CTA_HEADLINE_ACCENT}}` — accent-colored span content, e.g. `Microlink` (default) or product name like `screenshots`
- `{{CTA_BODY}}`            — short closing line.
- `{{CTA_HREF}}`            — same logic as Hero, may differ.
- `{{CTA_LABEL}}`           — broader label than the hero.

### Head / SEO

- `{{HEAD_TITLE}}`        — e.g. `How {{CUSTOMER_NAME}} uses Microlink`
- `{{HEAD_DESCRIPTION}}`  — 1-2 sentence summary, no marketing fluff.

## Full template

```jsx
import { breakpoints, colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'

import { withTitle } from 'helpers/hoc/with-title'
import { cdnUrl } from 'helpers/cdn-url'

const Caption = withTitle(CaptionBase)

/* ─── Accent ─────────────────────────────────────────────────────────────── */

const ACCENT = {
  text: '{{ACCENT_TEXT}}',
  bgSoft: '{{ACCENT_BG_SOFT}}',
  bgEdge: '{{ACCENT_BG_EDGE}}',
  highlight: '{{ACCENT_HIGHLIGHT}}'
}

/* ─── Layout primitives ──────────────────────────────────────────────────── */

const SECTION_PX = [3, 3, 4, 4]
const SECTION_PY = [3, 3, 4, 5]
const SECTION_MAX_WIDTH = layout.large

const Section = styled(Box)`
  ${theme({
    py: SECTION_PY,
    px: SECTION_PX,
    width: '100%'
  })}
`

const SectionInner = styled(Box)`
  ${theme({
    width: '100%',
    maxWidth: SECTION_MAX_WIDTH,
    mx: 'auto'
  })}
`

const Eyebrow = styled(Text)`
  ${theme({
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase'
  })}
`

const BodyText = props => (
  <Caption
    forwardedAs='p'
    titleize={false}
    {...props}
    css={[
      theme({
        fontSize: [1, 2, 2, 2],
        textAlign: 'left',
        maxWidth: layout.large,
        mx: 0,
        color: 'black'
      }),
      props.css
    ]}
  />
)

const StoryTag = styled(Box)`
  display: inline-flex;
  align-items: center;
  ${theme({
    bg: ACCENT.bgSoft,
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    px: '10px',
    py: '4px',
    borderRadius: '20px',
    textTransform: 'uppercase'
  })}
`

/* ─── Background overlay ─────────────────────────────────────────────────── */

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <StoryTag>Customer story</StoryTag>
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
          m: 0
        })}
      >
        <span css={theme({ color: ACCENT.text })}>{{CUSTOMER_NAME}}:</span>{' '}
        {{HERO_HEADLINE}}
      </Text>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.large,
          mx: 0
        })}
      >
        {{HERO_INTRO}}
      </Caption>
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
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 3, display: 'block' })}>
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
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

const Figure = styled('figure')`
  ${theme({
    m: 0,
    py: [4, 4, 5, 5]
  })}
`

const FigureImage = styled('img')`
  ${theme({
    display: 'block',
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    mx: 'auto'
  })}
`

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

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 5 })}>
    <SectionInner>
      <Eyebrow css={theme({ pb: 2, display: 'block' })}>
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

/* ─── Why Microlink — numbered cards ─────────────────────────────────────── */

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: [3, 3, 4, 4],
    alignItems: 'stretch'
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardSide = styled(Box)`
  ${theme({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  })}
`

const CardMain = styled(Box)`
  ${theme({
    width: '100%',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
`

const CardTitle = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

const CardKicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: ACCENT.text,
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

const CardBody = styled(Text)`
  ${theme({
    fontSize: [1, 1, 1, 1],
    lineHeight: 2,
    color: 'black70'
  })}
`

const WhyMicrolink = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
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
        <Card>
          <CardSide>
            <CardKicker>01 · {{WHY_CARD_1_KICKER}}</CardKicker>
            <CardTitle>{{WHY_CARD_1_TITLE}}</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              {{WHY_CARD_1_BODY}}
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>02 · {{WHY_CARD_2_KICKER}}</CardKicker>
            <CardTitle>{{WHY_CARD_2_TITLE}}</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              {{WHY_CARD_2_BODY}}
            </CardBody>
          </CardMain>
        </Card>

        <Card>
          <CardSide>
            <CardKicker>03 · {{WHY_CARD_3_KICKER}}</CardKicker>
            <CardTitle>{{WHY_CARD_3_TITLE}}</CardTitle>
          </CardSide>
          <CardMain>
            <CardBody>
              {{WHY_CARD_3_BODY}}
            </CardBody>
          </CardMain>
        </Card>
      </Flex>
    </SectionInner>
  </Section>
)

{{TESTIMONIAL_SECTION}}

{{MORE_CUSTOMERS_SECTION}}

/* ─── CTA ────────────────────────────────────────────────────────────────── */

const CtaSection = () => (
  <Section>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <SubheadBase
        css={theme({
          color: 'black',
          fontSize: ['28px', '32px', '40px', '46px'],
          letterSpacing: '-0.01em',
          lineHeight: 0
        })}
      >
        {{CTA_HEADLINE_PREFIX}}{' '}
        <span css={theme({ color: ACCENT.text })}>{{CTA_HEADLINE_ACCENT}}</span>?
      </SubheadBase>
      <Caption
        forwardedAs='p'
        titleize={false}
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        {{CTA_BODY}}
      </Caption>
      <Flex
        css={theme({
          py: [3, 4, 4, 4],
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='{{CTA_HREF}}'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          {{CTA_LABEL}}
        </ArrowLink>
      </Flex>
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
      {{TESTIMONIAL_RENDER}}
      <WhyMicrolink />
      {{MORE_CUSTOMERS_RENDER}}
      <CtaSection />
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

These blocks substitute into a single `{{TOKEN}}` slot. The skill picks one variant per token.

### `{{ABOUT_SCREENSHOT_BLOCK}}`

Variant A — user provided an image path:

```jsx
<Figure>
  <FigureImage
    src='{{ABOUT_IMAGE_SRC}}'
    alt='{{CUSTOMER_NAME}} using Microlink'
    width='1200'
    height='870'
    loading='lazy'
    decoding='async'
  />
</Figure>
```

Variant B — no image:

```jsx
<Figure>
  <FigurePlaceholder aria-hidden='true'>
    [Screenshot of {{CUSTOMER_NAME}} using Microlink]
  </FigurePlaceholder>
</Figure>
```

### `{{HOW_DIAGRAM_BLOCK}}`

Variant A — flow diagram (port from `src/pages/feature/proxy.js` lines 484–693). Add these styled components ABOVE the `HowTheyUseIt` definition, after `FigurePlaceholder`:

```jsx
const Node = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    px: [3, 3, 3, 3],
    py: [3, 3, 3, 3],
    width: ['100%', '100%', 'auto', 'auto'],
    minWidth: [0, 0, '0', '0'],
    flex: ['0 0 auto', '0 0 auto', '1 1 0', '1 1 0']
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  text-align: center;
`

const NodeActive = styled(Node)`
  ${theme({
    bg: ACCENT.bgSoft,
    borderColor: ACCENT.text
  })}
`

const NodeLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontFamily: 'mono',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const NodeSub = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black60',
    pt: 1
  })}
`

const Arrow = () => (
  <Flex
    aria-hidden='true'
    css={`
      ${theme({
        color: 'black30',
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center'
      })}
      @media (max-width: calc(${breakpoints[1]} - 1px)) {
        transform: rotate(90deg);
      }
    `}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='9 18 15 12 9 6' />
    </svg>
  </Flex>
)
```

The diagram block itself goes inside `HowTheyUseIt`:

```jsx
<Figure>
  <Flex
    css={theme({
      alignItems: 'stretch',
      gap: [2, 2, 3, 3],
      flexDirection: ['column', 'column', 'row', 'row']
    })}
  >
    {{NODES}}
  </Flex>
</Figure>
```

`{{NODES}}` is the rendered list of `<Node>` / `<NodeActive>` separated by `<Arrow />`. Each node has a `NodeLabel` (the user-supplied label) and an optional `NodeSub` (caption). Exactly one node should be `NodeActive` — it's the Microlink node by default.

Variant B — image figure:

```jsx
<Figure>
  <FigureImage
    src='{{HOW_IMAGE_SRC}}'
    alt='{{HOW_IMAGE_ALT}}'
    width='1200'
    height='870'
    loading='lazy'
    decoding='async'
  />
</Figure>
```

Variant C — placeholder (user has no diagram yet):

```jsx
<Figure>
  <FigurePlaceholder aria-hidden='true'>
    [{{CUSTOMER_NAME}} integration diagram]
  </FigurePlaceholder>
</Figure>
```

### `{{TESTIMONIAL_SECTION}}` / `{{TESTIMONIAL_RENDER}}`

If a testimonial exists, expand to:

```jsx
/* ─── Testimonial ────────────────────────────────────────────────────────── */

const TestimonialCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderLeft: '4px solid',
    borderLeftColor: ACCENT.highlight,
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    maxWidth: layout.small,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: [2, 2, 3, 3]
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const Quote = styled(Text).attrs({ as: 'blockquote' })`
  ${theme({
    m: 0,
    color: 'black',
    fontFamily: 'serif',
    fontSize: ['16px', '17px', '19px', '20px'],
    fontStyle: 'italic',
    fontWeight: 'normal',
    lineHeight: 2,
    letterSpacing: '-0.005em'
  })}
`

const QuoteMark = styled(Text).attrs({ as: 'span', 'aria-hidden': 'true' })`
  ${theme({
    color: ACCENT.text,
    fontFamily: 'serif',
    fontSize: ['28px', '32px', '36px', '40px'],
    fontWeight: 'bold',
    lineHeight: 0,
    display: 'block'
  })}
`

const Author = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3
  })}
`

const AuthorAvatar = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    flex: '0 0 auto'
  })}
`

const AuthorName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const AuthorRole = styled(Text)`
  ${theme({
    color: 'black60',
    fontSize: 0,
    pt: 1
  })}
`

const Testimonial = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <TestimonialCard as='figure'>
        <QuoteMark>“</QuoteMark>
        <Quote>
          {{TESTIMONIAL_QUOTE}}
        </Quote>
        <Author as='figcaption'>
          <AuthorAvatar aria-hidden='true' />
          <Box>
            <AuthorName>{{TESTIMONIAL_AUTHOR_NAME}}</AuthorName>
            <AuthorRole>{{TESTIMONIAL_AUTHOR_ROLE}} · {{TESTIMONIAL_AUTHOR_COMPANY}}</AuthorRole>
          </Box>
        </Author>
      </TestimonialCard>
    </SectionInner>
  </Section>
)
```

And `{{TESTIMONIAL_RENDER}}` becomes `<Testimonial />`.

If there is NO testimonial, both tokens are replaced with empty strings (no comment block, no styled components, no render line). Zero dead code.

### `{{MORE_CUSTOMERS_SECTION}}` / `{{MORE_CUSTOMERS_RENDER}}`

If there are 2+ other customer pages (excluding `example.js` and the file being created), expand to:

```jsx
/* ─── More customer stories carousel ─────────────────────────────────────── */

const CarouselTrack = styled(Flex)`
  ${theme({
    gap: [3, 3, 4, 4],
    width: '100%',
    overflowX: 'auto',
    px: SECTION_PX,
    py: 3,
    justifyContent: ['flex-start', 'flex-start', 'center', 'center']
  })}
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 24px;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (min-width: ${breakpoints[1]}) {
    scroll-padding-inline: 32px;
  }
`

const CarouselCard = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    minWidth: ['260px', '280px', '300px', '320px'],
    maxWidth: '320px',
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: 0 1px 2px ${colors.black05};
  scroll-snap-align: start;
`

const LogoPlaceholder = styled(Box)`
  ${theme({
    bg: ACCENT.bgSoft,
    border: 1,
    borderColor: ACCENT.bgEdge,
    borderRadius: 2,
    width: '40px',
    height: '40px'
  })}
`

const CarouselCardName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CarouselCardBlurb = styled(Text)`
  ${theme({
    color: 'black70',
    fontSize: 1,
    lineHeight: 2
  })}
`

const CarouselCardLink = styled(Link)`
  ${theme({
    color: ACCENT.text,
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const MORE_CUSTOMERS = [
  {{MORE_CUSTOMERS_ENTRIES}}
]

const MoreCustomers = () => (
  <Section css={theme({ px: 0 })}>
    <SectionInner css={theme({ maxWidth: '100%', px: 0 })}>
      <Box
        css={theme({
          maxWidth: SECTION_MAX_WIDTH,
          mx: 'auto',
          px: SECTION_PX,
          pb: [3, 3, 4, 4],
          textAlign: 'center'
        })}
      >
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>
          More customer stories
        </Eyebrow>
        <SubheadBase
          css={theme({
            fontSize: ['24px', '28px', '34px', '38px'],
            textAlign: 'center',
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          See how other teams ship with Microlink
        </SubheadBase>
      </Box>

      <CarouselTrack
        role='list'
        aria-label='More customer stories'
        css={theme({ maxWidth: '100%', mx: 'auto' })}
      >
        {MORE_CUSTOMERS.map(({ slug, name, blurb }) => (
          <CarouselCard key={slug} role='listitem'>
            <LogoPlaceholder aria-hidden='true' />
            <CarouselCardName>{name}</CarouselCardName>
            <CarouselCardBlurb>{blurb}</CarouselCardBlurb>
            <CarouselCardLink href={`/customers/${slug}`}>
              Read story →
            </CarouselCardLink>
          </CarouselCard>
        ))}
      </CarouselTrack>
    </SectionInner>
  </Section>
)
```

`{{MORE_CUSTOMERS_ENTRIES}}` is a comma-separated list of objects auto-built from globbing `src/pages/customers/*.js`:

```js
{ slug: 'vercel', name: 'Vercel', blurb: 'Open Graph images for every deployment.' },
{ slug: 'linear', name: 'Linear', blurb: 'Issue thumbnails and link previews at scale.' }
```

If fewer than 2 entries are found, BOTH `{{MORE_CUSTOMERS_SECTION}}` and `{{MORE_CUSTOMERS_RENDER}}` become empty strings.

`{{MORE_CUSTOMERS_RENDER}}` (when present) is `<MoreCustomers />`.
