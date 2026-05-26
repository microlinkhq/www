# Template

Canonical template for `src/pages/customers/<slug>.js`. Mirrors `luckynote.js`.

## Token reference

- `{{CUSTOMER_NAME}}` / `{{CUSTOMER_DOMAIN}}` — display name and bare hostname.
- `{{ICON}}` — icon filename in `/images/clients/`.
- `{{HERO_HEADLINE}}` — h1 text after logo+name row.
- `{{HERO_INTRO}}` — 1–2 sentence caption.
- `{{HERO_CTA_HREF}}` / `{{HERO_CTA_LABEL}}` — per `cta-routing.md`.
- `{{ABOUT_SUBHEAD}}` / `{{ABOUT_PARA_1}}` / `{{ABOUT_PARA_2}}` — research-grounded copy.
- `{{HOW_SUBHEAD}}` / `{{HOW_PARA_1}}` / `{{HOW_PARA_2}}` — integration narrative.
- `{{WHY_SUBHEAD}}` / `{{WHY_LEAD}}` — headline + lead.
- `{{WHY_CARD_N_KICKER}}` / `{{WHY_CARD_N_TITLE}}` / `{{WHY_CARD_N_BODY}}` — 3 cards.
- `{{TESTIMONIAL_*}}` — quote, author, role, company, initials, avatar.
- `{{CTA_HEADLINE_PREFIX}}` / `{{CTA_HEADLINE_ACCENT}}` / `{{CTA_BODY}}` / `{{CTA_HREF}}` / `{{CTA_LABEL}}`
- `{{HEAD_TITLE}}` / `{{HEAD_DESCRIPTION}}`
- `{{THANKS_LOGO_HEIGHT}}` / `{{THANKS_USE_CASE_SHORT}}`

## Full template

```jsx
import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ACCENT,
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
  Testimonial,
  WhyCard
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/clients/{{ICON}}'
          alt=''
          width='40'
          height='40'
          css={theme({ display: 'block', borderRadius: 2, width: '40px', height: '40px' })}
          style={{ objectFit: 'cover' }}
          decoding='async'
        />
        <Text css={theme({ color: 'black', fontSize: 2, fontWeight: 'bold', lineHeight: 1 })}>
          {{CUSTOMER_NAME}}
        </Text>
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
        {{HERO_HEADLINE}}
      </Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {{HERO_INTRO}}
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='{{HERO_CTA_HREF}}'
          css={theme({ color: 'link', fontWeight: 'bold', fontSize: [2, 2, 3, 3] })}
        >
          {{HERO_CTA_LABEL}}
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      {{ABOUT_HERO_IMAGE_BLOCK}}
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        About {{CUSTOMER_NAME}}
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        {{ABOUT_SUBHEAD}}
      </Text>
      <Text as='p' css={theme({ pb: [3, 3, 4, 4] })}>
        {{ABOUT_PARA_1}}
      </Text>
      <Text as='p'>
        {{ABOUT_PARA_2}}
      </Text>
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
      {{TESTIMONIAL_BLOCK}}
    </SectionInner>
  </Section>
)

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <Text as='h2'>{{HOW_SUBHEAD}}</Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {{HOW_PARA_1}}
      </Text>
      {{HOW_DIAGRAM_BLOCK}}
      <Text as='p'>
        {{HOW_PARA_2}}
      </Text>
    </SectionInner>
  </Section>
)

const WhyMicrolink = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why Microlink
        </Eyebrow>
        <Text as='h2'>{{WHY_SUBHEAD}}</Text>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          {{WHY_LEAD}}
        </Text>
      </Box>
      <Flex css={theme({ gap: 3, flexDirection: 'column', alignItems: 'stretch' })}>
        <WhyCard accent={ACCENT} number={1}
          kicker='{{WHY_CARD_1_KICKER}}' title='{{WHY_CARD_1_TITLE}}' body='{{WHY_CARD_1_BODY}}' />
        <WhyCard accent={ACCENT} number={2}
          kicker='{{WHY_CARD_2_KICKER}}' title='{{WHY_CARD_2_TITLE}}' body='{{WHY_CARD_2_BODY}}' />
        <WhyCard accent={ACCENT} number={3}
          kicker='{{WHY_CARD_3_KICKER}}' title='{{WHY_CARD_3_TITLE}}' body='{{WHY_CARD_3_BODY}}' />
      </Flex>
    </SectionInner>
  </Section>
)

const ThanksLogo = styled('img')`
  ${theme({ display: 'block', width: 'auto', height: '{{THANKS_LOGO_HEIGHT}}', mx: 'auto' })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 0, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        <Text as='a' href='https://{{CUSTOMER_DOMAIN}}' target='_blank' rel='noopener'>
          <ThanksLogo
            src='/images/clients/{{CUSTOMER_DOMAIN}}.svg'
            alt='{{CUSTOMER_NAME}}'
            loading='lazy' decoding='async'
          />
        </Text>
      </Box>
      <Caption
        forwardedAs='p' titleize={false}
        css={theme({ color: 'black70', fontSize: [0, 1], maxWidth: layout.small, mx: 'auto' })}
      >
        <b>Thank you to the {{CUSTOMER_NAME}} team</b> for letting us share
        their use case, and for choosing Microlink to power {{THANKS_USE_CASE_SHORT}}.
      </Caption>
    </SectionInner>
  </Section>
)

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

With image:
```jsx
<Figure css={theme({ pt: 0, pb: 5 })}>
  <FigureImage src='{{SRC}}' alt='{{CUSTOMER_NAME}} platform'
    width='{{W}}' height='{{H}}' loading='eager' decoding='async'
    css={theme({ maxWidth: '800px' })} />
</Figure>
```

Without: empty string.

### `{{HOW_DIAGRAM_BLOCK}}`

Flow:
```jsx
<FlowDiagram accent={ACCENT} nodes={[
  { label: 'Step 1', sub: 'caption' },
  { label: 'Microlink', sub: 'caption', active: true },
  { label: 'Step 3', sub: 'caption' }
]} />
```

Image: `<Figure><FigureImage src='...' /></Figure>`

### `{{TESTIMONIAL_BLOCK}}`

With quote:
```jsx
<Testimonial accent={ACCENT} quote='...' author='...' role='...'
  company='...' initials='...' avatar='...' />
```

Placeholder:
```jsx
{/* TODO: replace placeholder testimonial before publishing */}
<Testimonial accent={ACCENT} quote='[Testimonial placeholder]'
  author='[Author]' role='[Role]' company='{{CUSTOMER_NAME}}' initials='[X]' />
```

Without: empty string.
