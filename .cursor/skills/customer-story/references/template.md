# Template

This is the canonical template for `src/pages/customers/<slug>.js`. It mirrors `src/pages/customers/example.js` exactly. Every author-supplied value is a `{{TOKEN}}` placeholder.

The skill fills these in after gathering all answers in steps 1–8 of the workflow.

## Token reference

### Identity

- `{{CUSTOMER_NAME}}` — display name, used in H1 span and copy. e.g. `Vercel`
- `{{CUSTOMER_NAME_LOWER}}` — same but lowercased, used in prose like "About vercel". Capitalize naturally where it starts a sentence.
- `{{CUSTOMER_DOMAIN}}` — bare hostname (no protocol, no path), e.g. `vercel.com`. Used for the About-section "Visit <domain>" link, the ThanksSection logo path (`/images/clients/<CUSTOMER_DOMAIN>.svg`), and the ThanksSection logo link target (`https://<CUSTOMER_DOMAIN>`).

### Accent (resolved via `references/accent-colors.md`)

- `{{ACCENT_TEXT}}`       — e.g. `teal7`
- `{{ACCENT_BG_SOFT}}`    — e.g. `teal0`
- `{{ACCENT_BG_EDGE}}`    — e.g. `teal1`
- `{{ACCENT_HIGHLIGHT}}`  — e.g. `teal5`
- `{{ACCENT_RGB}}`        — e.g. `12, 166, 120` — comma-separated RGB triplet of the `*7` shade. Used in the CTA panel's translucent background.

### Hero

- `{{HERO_HEADLINE}}`   — what comes after `{{CUSTOMER_NAME}}:` in the H1.
- `{{HERO_INTRO}}`      — one or two sentence caption.
- `{{HERO_CTA_HREF}}`   — resolved via `references/cta-routing.md`.
- `{{HERO_CTA_LABEL}}`  — resolved via `references/cta-routing.md`. MUST differ from `{{CTA_LABEL}}`.

### About the customer

- `{{ABOUT_HERO_IMAGE_BLOCK}}`   — optional: the wide hero/website screenshot at the top of the section (Variant A or empty).
- `{{ABOUT_SUBHEAD}}`            — one-line description of what the customer does.
- `{{ABOUT_PARA_1}}`             — first paragraph (research from website).
- `{{ABOUT_SCREENSHOT_BLOCK}}`   — primary screenshot between paragraphs 1 and 2 (Variant A `Figure`+`FigureImage` or Variant B `FigurePlaceholder`).
- `{{ABOUT_PARA_2}}`             — second paragraph (research from website).
- `{{TESTIMONIAL_RENDER}}`       — `<Testimonial />` (or empty if no testimonial). Nested INSIDE `AboutCustomer`, after the external website link.

### How they use Microlink

- `{{HOW_SUBHEAD}}`        — short headline summarizing what Microlink powers for them.
- `{{HOW_PARA_1}}`         — paragraph before the diagram.
- `{{HOW_DIAGRAM_BLOCK}}`  — flow / image / placeholder. See "Conditional blocks".
- `{{HOW_PARA_2}}`         — paragraph after the diagram.

### Why Microlink

- `{{WHY_SUBHEAD}}`           — short headline.
- `{{WHY_LEAD}}`              — lead paragraph.
- `{{WHY_CARD_1_KICKER}}`     — e.g. `Reliability`
- `{{WHY_CARD_1_TITLE}}`      — short title
- `{{WHY_CARD_1_BODY}}`       — explanation
- `{{WHY_CARD_2_KICKER}}` / `{{WHY_CARD_2_TITLE}}` / `{{WHY_CARD_2_BODY}}`
- `{{WHY_CARD_3_KICKER}}` / `{{WHY_CARD_3_TITLE}}` / `{{WHY_CARD_3_BODY}}`

### Testimonial

- `{{TESTIMONIAL_SECTION}}`        — the entire `Testimonial` component definition + styled components. Empty string if no testimonial.
- `{{TESTIMONIAL_QUOTE}}`          — quote text (or bracketed placeholder text if Step 5 used `placeholder` mode).
- `{{TESTIMONIAL_AUTHOR_NAME}}`    — author display name (or `[Author Name]` for placeholder mode).
- `{{TESTIMONIAL_AUTHOR_ROLE}}`    — role / job title.
- `{{TESTIMONIAL_AUTHOR_COMPANY}}` — company (defaults to `{{CUSTOMER_NAME}}`).
- `{{TESTIMONIAL_AUTHOR_INITIALS}}` — uppercased initials of the author's first and last name (e.g. `SC`). Rendered inside `AuthorAvatar`. For placeholder mode, use `[X]`.
- `{{TESTIMONIAL_PLACEHOLDER_COMMENT}}` — `{/* TODO: replace placeholder testimonial before publishing */}` or empty string.

### More customer stories carousel (auto-detected)

- `{{MORE_CUSTOMERS_SECTION}}`     — entire styled-component block + `MORE_CUSTOMERS` array + `MoreCustomers` component. Empty if <2 sibling pages.
- `{{MORE_CUSTOMERS_RENDER}}`      — `<MoreCustomers />` line. Empty if removed.
- `{{MORE_CUSTOMERS_ENTRIES}}`     — comma-separated array entries.

### CTA

- `{{CTA_HEADLINE_PREFIX}}` — e.g. `Ready to ship with`, `Ready to ship link`
- `{{CTA_HEADLINE_ACCENT}}` — accent-colored span content, e.g. `Microlink`, `previews`, `screenshots`
- `{{CTA_BODY}}`            — short closing line.
- `{{CTA_HREF}}`            — same logic as Hero, may differ.
- `{{CTA_LABEL}}`           — broader label than the hero. MUST differ from `{{HERO_CTA_LABEL}}`.

### Thanks

- `{{THANKS_LOGO_BLOCK}}`     — `<Link>` wrapping `<ThanksLogo>` if customer SVG is available, otherwise empty.
- `{{THANKS_LOGO_SRC}}`       — `/images/clients/<CUSTOMER_DOMAIN>.svg`.
- `{{THANKS_LOGO_WIDTH}}` / `{{THANKS_LOGO_HEIGHT}}` — intrinsic SVG viewBox dimensions.
- `{{THANKS_USE_CASE_SHORT}}` — short noun-phrase about the use case, e.g. `link previews across their platform`, `Open Graph images for every deployment`.

### Head / SEO

- `{{HEAD_TITLE}}`        — format: `{{CUSTOMER_NAME}}: <one-line use case>` — NO brand suffix. The `Meta` component automatically appends ` — Microlink`; adding ` · Microlink` here would duplicate the brand. End-user-visible result: `{{CUSTOMER_NAME}}: <one-line use case> — Microlink` rendered by `Meta`, not authored.
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
          m: 0,
          scrollMarginTop: 4
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
    mx: 'auto',
    borderRadius: 3,
    boxShadow: 1
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

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner>
      {{ABOUT_HERO_IMAGE_BLOCK}}
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
      {{TESTIMONIAL_RENDER}}
    </SectionInner>
  </Section>
)

/* ─── How they use Microlink ─────────────────────────────────────────────── */

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
  <Section
    css={`
      background-color: rgba({{ACCENT_RGB}}, 0.06);
      ${theme({
        borderTop: 1,
        borderTopColor: ACCENT.bgEdge,
        borderBottom: 1,
        borderBottomColor: ACCENT.bgEdge
      })}
    `}
  >
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
          pt: [3, 4, 4, 4],
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

/* ─── Thanks ─────────────────────────────────────────────────────────────── */

const ThanksLogo = styled('img')`
  ${theme({
    display: 'block',
    width: 'auto',
    height: '32px',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 5, pb: [3, 3, 4, 4] })}>
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
        <b>Thank you to the {{CUSTOMER_NAME}} team</b> for letting us share their
        use case, and for choosing Microlink to power {{THANKS_USE_CASE_SHORT}}.
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
      {{MORE_CUSTOMERS_RENDER}}
      <CtaSection />
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

These blocks substitute into a single `{{TOKEN}}` slot. The skill picks one variant per token.

### `{{ABOUT_HERO_IMAGE_BLOCK}}`

Variant A — user provided a wider hero image (step 6c yes):

```jsx
<Figure css={theme({ pt: 0 })}>
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

Variant B — empty (step 6c no): the token is replaced with the empty string and the section starts directly with the Eyebrow.

### `{{ABOUT_SCREENSHOT_BLOCK}}`

Variant A — user provided a primary screenshot (step 6a yes):

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

Variant B — no screenshot (step 6a no):

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

Inside `HowTheyUseIt`:

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

`{{NODES}}` is the rendered list of `<Node>` / `<NodeActive>` separated by `<Arrow />`. Each node has a `NodeLabel` and an optional `NodeSub`. Exactly one node should be `NodeActive`.

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

Variant C — placeholder:

```jsx
<Figure>
  <FigurePlaceholder aria-hidden='true'>
    [{{CUSTOMER_NAME}} integration diagram]
  </FigurePlaceholder>
</Figure>
```

### `{{TESTIMONIAL_SECTION}}` / `{{TESTIMONIAL_RENDER}}` / `{{TESTIMONIAL_PLACEHOLDER_COMMENT}}`

If a real or placeholder testimonial exists, expand `{{TESTIMONIAL_SECTION}}` to:

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
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ACCENT.text,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
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
  <TestimonialCard as='figure' css={theme({ mt: [3, 3, 4, 4] })}>
    <QuoteMark>“</QuoteMark>
    <Quote>
      {{TESTIMONIAL_QUOTE}}
    </Quote>
    <Author as='figcaption'>
      <AuthorAvatar aria-hidden='true'>{{TESTIMONIAL_AUTHOR_INITIALS}}</AuthorAvatar>
      <Box>
        <AuthorName>{{TESTIMONIAL_AUTHOR_NAME}}</AuthorName>
        <AuthorRole>{{TESTIMONIAL_AUTHOR_ROLE}} · {{TESTIMONIAL_AUTHOR_COMPANY}}</AuthorRole>
      </Box>
    </Author>
  </TestimonialCard>
)
```

Note: the `Testimonial` component does NOT render its own `<Section>` / `<SectionInner>` wrapper because it's nested INSIDE `AboutCustomer`'s `<SectionInner>`. The `mt` margin on the card provides separation from the external website link above it.

`{{TESTIMONIAL_RENDER}}` = `<Testimonial />` (or empty string if no testimonial).

`{{TESTIMONIAL_PLACEHOLDER_COMMENT}}`:
- Real testimonial: empty string.
- Placeholder testimonial: `{/* TODO: replace placeholder testimonial before publishing */}`.
- No testimonial: empty string.

If there is NO testimonial, all three tokens are empty strings (no comment block, no styled components, no render line, no comment). Zero dead code.

### `{{MORE_CUSTOMERS_SECTION}}` / `{{MORE_CUSTOMERS_RENDER}}` / `{{MORE_CUSTOMERS_ENTRIES}}`

If there are 2+ other customer pages (excluding `example.js` and the file being created), expand `{{MORE_CUSTOMERS_SECTION}}` to:

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

`{{MORE_CUSTOMERS_ENTRIES}}` is the comma-separated list of objects, one per sibling page:

```js
{ slug: 'vercel', name: 'Vercel', blurb: 'Open Graph images for every deployment.' },
{ slug: 'linear', name: 'Linear', blurb: 'Issue thumbnails and link previews at scale.' }
```

`{{MORE_CUSTOMERS_RENDER}}` is `<MoreCustomers />` (positioned BETWEEN `<WhyMicrolink />` and `<CtaSection />`).

If <2 sibling pages, all three tokens become empty strings — no carousel, no array, no render line.

### `{{THANKS_LOGO_BLOCK}}`

Both variants render a plain anchor (`<Text as='a'>`) with `target='_blank' rel='noopener'` — NOT the repo `Link` component. This is required so the customer's site retains the backlink follow + referrer signal (see "External-link rule" in `SKILL.md`).

Variant A — customer SVG logo available at `static/images/clients/<CUSTOMER_DOMAIN>.svg`:

```jsx
<Text as='a' href='https://{{CUSTOMER_DOMAIN}}' target='_blank' rel='noopener'>
  <ThanksLogo
    src='{{THANKS_LOGO_SRC}}'
    alt='{{CUSTOMER_NAME}}'
    width='{{THANKS_LOGO_WIDTH}}'
    height='{{THANKS_LOGO_HEIGHT}}'
    loading='lazy'
    decoding='async'
  />
</Text>
```

Variant B — no logo (text-only ThanksSection): the token becomes:

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

(A simple link to the customer's site, no image.)

If `ThanksSection` is omitted entirely: remove the entire `ThanksSection` component, the `ThanksLogo` styled component, and the `<ThanksSection />` render line. (The skill should rarely choose this — the thank-you note is the more important part and works fine without a logo.)
