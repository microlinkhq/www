import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ACCENT,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  Figure,
  FigureImage,
  MoreUseCases,
  Section,
  SectionInner,
  WhyCard
} from 'components/patterns/UseCaseStory'
import Layout from 'components/patterns/Layout'

/* ─── Inline link to the partner ─────────────────────────────────────────── */

const InlineLink = styled('a')`
  ${theme({ color: 'link', fontWeight: 'bold' })}
  text-decoration: underline;
`

/* ─── Code blocks (replace the flow diagram) ─────────────────────────────── */

const EXTRACT_SNIPPET = `import mql from '@microlink/mql'

// Get the main image (og:image) of any URL, including width/height
const { data } = await mql('https://example.com')
const image = data.image // { url, width, height, type, size }`

const UPSCALE_SNIPPET = `const TARGET_WIDTH = 2048

async function ensureHighRes (image) {
  // Microlink already returns the dimensions: only upscale if needed
  if (image.width >= TARGET_WIDTH) return image.url

  // Send the hosted URL straight to Magnific (URL input = maximum quality)
  const create = await fetch(
    'https://api.magnific.com/v1/ai/image-upscaler-precision-v2',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-magnific-api-key': process.env.MAGNIFIC_API_KEY
      },
      body: JSON.stringify({
        image: image.url,
        scale_factor: 4,
        flavor: 'photo'
      })
    }
  )
  const { data: task } = await create.json()

  // Magnific is async: poll the task until it is finished
  while (true) {
    const res = await fetch(
      \`https://api.magnific.com/v1/ai/image-upscaler-precision-v2/\${task.task_id}\`,
      { headers: { 'x-magnific-api-key': process.env.MAGNIFIC_API_KEY } }
    )
    const { data } = await res.json()
    if (data.status === 'COMPLETED') return data.generated[0]
    if (data.status === 'FAILED') throw new Error('Magnific upscale failed')
    await new Promise(resolve => setTimeout(resolve, 3000))
  }
}`

const CodeStep = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const CodeBlock = ({ step, children }) => (
  <Box css={theme({ width: '100%', minWidth: 0 })}>
    <CodeStep css={theme({ color: ACCENT.text, pb: 2, display: 'block' })}>
      {step}
    </CodeStep>
    <CodeEditor
      language='js'
      autoHeight
      showFade={false}
      css={theme({ width: '100%', maxWidth: '100%' })}
    >
      {children}
    </CodeEditor>
  </Box>
)

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/use-cases/magnific.svg'
          alt=''
          width='40'
          height='40'
          css={theme({
            display: 'block',
            borderRadius: 2,
            width: '40px',
            height: '40px'
          })}
          style={{ objectFit: 'cover' }}
          decoding='async'
        />
        <Text
          css={theme({
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1
          })}
        >
          Microlink + Magnific
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
        Extract images from any URL and upscale them with AI
      </Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        Microlink returns the main image of any URL, along with its dimensions.
        When that image is too small for where it's going, Magnific upscales it
        with AI — both steps run on hosted URLs, so nothing gets downloaded or
        re-uploaded in between.
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/metadata'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          Start with the Metadata API
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/use-cases/magnific-com.png'
          alt='Magnific AI image upscaler'
          width='1200'
          height='818'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        What it does
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        From a URL to a high-resolution image
      </Text>
      <Text as='p' css={theme({ pb: 4 })}>
        Say you're pulling product shots, article images, or design references
        from pages you don't control. Microlink extracts the main image of any
        URL and returns it as a hosted image, with its real width and height.
        When the source only gives you a small version, you send that URL to{' '}
        <InlineLink href='https://magnific.com' target='_blank' rel='noopener'>
          Magnific
        </InlineLink>{' '}
        to upscale it with AI.
      </Text>
      <Text as='p'>
        Magnific returns the result as another hosted URL, so the upscaled image
        is ready to use without a storage step in between.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── How it works ───────────────────────────────────────────────────────── */

const HowItWorks = () => (
  <Section id='how-it-works' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How it works
      </Eyebrow>
      <Text as='h2'>Two requests: extract, then upscale on demand</Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        First, ask Microlink for the page's main image and its dimensions. Then
        only when the resolution is below your target, send that hosted URL to
        Magnific and poll the task until the upscaled image is ready.
      </Text>
      <Figure css={theme({ pb: 3 })}>
        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [3, 3, 4, 4],
            alignItems: 'stretch'
          })}
        >
          <CodeBlock step='1 · Extract the image'>{EXTRACT_SNIPPET}</CodeBlock>
          <CodeBlock step='2 · Upscale when needed'>
            {UPSCALE_SNIPPET}
          </CodeBlock>
        </Flex>
      </Figure>
      <Text as='p'>
        No image came back? Some pages don't expose a main image at all. In that
        case you can fall back to Magnific's{' '}
        <InlineLink
          href='https://www.magnific.com/ai/image-generator'
          target='_blank'
          rel='noopener'
        >
          image generator
        </InlineLink>{' '}
        and create one from the page's title and description — handy for a
        placeholder or social card, as long as a synthetic image is acceptable
        there.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Why it works ───────────────────────────────────────────────────────── */

const UseCaseItem = styled(Text).attrs({ as: 'p' })`
  ${theme({ color: 'black70', lineHeight: 2 })}
`

const WhyItWorks = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why it works
        </Eyebrow>
        <Text as='h2'>Why it fits together — and when it's worth it</Text>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          Both services speak URLs, and Microlink's metadata tells you whether
          the second call is even needed. Here's where that pays off.
        </Text>
      </Box>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <WhyCard
          accent={ACCENT}
          number={1}
          kicker='URL in, URL out'
          title="Microlink's output URL is Magnific's input."
          body='Microlink returns the image as a hosted URL plus its width and height, and that URL is exactly what Magnific takes as input. The result comes back as another URL, so nothing has to be downloaded, stored, or re-uploaded between the two.'
        />
        <UseCaseItem>
          This shines for <b>product catalogs and aggregators</b> — you're
          pulling images from supplier or marketplace pages you don't host, so
          the image never has to touch your servers.
        </UseCaseItem>

        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='Upscale only when needed'
          title='Decide from the dimensions before you spend a credit.'
          body='Because you get width and height up front, you can upscale only when the source is below your target. A rough rule: target width = output size in inches × 300 for print, or 2× the on-screen slot for retina. Compare that to image.width and skip the call when it already clears the bar.'
        />
        <UseCaseItem>
          That's how you catch the cases that actually need help: <b>print</b>{' '}
          (around 300 DPI, so a 1200px image won't fill an A4 page), an{' '}
          <b>editorial hero</b> (a 1200×630 lead image is small at 2× retina),
          or <b>design references</b> scaled up for comps and decks.
        </UseCaseItem>

        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Faithful by default'
          title='Precision mode upscales without inventing detail.'
          body="This uses Magnific's Precision mode (flavor: 'photo'), which keeps the upscaled image true to the original instead of hallucinating new detail — which matters when it's a real product or photo, not generative art."
        />
        <UseCaseItem>
          Fidelity matters most for real product shots and photos. If the source
          already serves a high-resolution image, skip the upscale and use it
          directly — and for small UI bits like favicons or logos, it usually
          isn't worth it.
        </UseCaseItem>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── Learn more ─────────────────────────────────────────────────────────── */

const ResourceLink = ({ href, children }) => {
  const isExternal = href.startsWith('http')
  return (
    <ArrowLink
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      css={theme({ color: 'link', fontWeight: 'bold', fontSize: [1, 2, 2, 2] })}
    >
      {children}
    </ArrowLink>
  )
}

const LearnMore = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Learn more
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        Docs and resources
      </Text>
      <Flex css={theme({ flexDirection: 'column', gap: 3 })}>
        <ResourceLink href='/metadata'>Microlink Metadata API</ResourceLink>
        <ResourceLink href='/docs'>Microlink docs</ResourceLink>
        <ResourceLink href='https://magnific.com/api'>
          Magnific API
        </ResourceLink>
        <ResourceLink href='https://docs.magnific.com'>
          Magnific docs
        </ResourceLink>
      </Flex>
    </SectionInner>
  </Section>
)

const UseCaseUpscaleImagesPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <WhatItDoes />
      <WhyItWorks />
      <HowItWorks />
      <LearnMore />
      <CtaSection
        accent={ACCENT}
        headlinePrefix='Ready to extract and upscale'
        headlineAccent='any image'
        body='Pull the main image from any URL with a single Microlink call, then upscale it on demand — drop the whole pipeline into your product.'
        href='/metadata'
        label='Start extracting images'
      />
      <MoreUseCases accent={ACCENT} currentSlug='upscale-extracted-images' />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Extract images from any URL and upscale them with AI'
    description='Microlink extracts the main image of any web page; Magnific upscales it with AI to a print-ready resolution — URL in, URL out, no re-uploading.'
    schemaType='WebPage'
  />
)

export default UseCaseUpscaleImagesPage
