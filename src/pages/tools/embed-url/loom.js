import { borders, colors, layout, theme } from 'theme'
import React from 'react'
import { Globe, Code, Clipboard } from 'react-feather'

import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'

import { StepCard, SectionIcon, UseCaseCard } from 'components/pages/screenshot'
import { EmbedTool } from 'components/pages/embed-url'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const EXAMPLE_URL =
  'https://www.loom.com/share/1c57a2e4b64a410899ff1891e8f28129'

const FEATURES_LIST = [
  {
    title: 'Native Loom player',
    description:
      'The real Loom player with playback controls, speed settings, and chapters — not a screenshot or thumbnail.'
  },
  {
    title: 'Share links work directly',
    description:
      'Paste the share URL as-is, no conversion needed. The tool extracts the video ID automatically.'
  },
  {
    title: 'Preview card fallback',
    description:
      'When direct embed is restricted, the tool falls back to a styled card with thumbnail and title.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a Loom link',
    description:
      'Copy any loom.com share URL — screen recordings, video messages, or workspace videos.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the video ID and generates the real Loom player iframe HTML.'
  },
  {
    icon: Clipboard,
    title: 'Copy & paste',
    description:
      'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
  }
]

const REASON_TO_USE = [
  {
    title: 'No manual URL conversion',
    description:
      'Paste the share link directly — no need to manually convert it to an embed URL. The tool handles it for you.'
  },
  {
    title: 'Screen recordings & video messages',
    description:
      'Both screen recordings and video messages work. Paste any Loom share link and get the embed code.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with thumbnail and title.
        Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 Loom embeds per day for free. No login, no API key, no watermarks.'
  }
]

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Loom Embed Code Generator
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, '26px', '28px']
      })}
    >
      Paste any Loom URL — get a ready-to-paste iframe embed or preview card for
      video recordings.
    </Caption>
  </Flex>
)

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [2, 2, 3, 3],
      mt: 2
    })}
  >
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 3, 3, '28px']
      })}
    >
      How to embed a Loom video
    </Caption>
    <Flex
      css={theme({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [2, 2, 3, 4],
        pt: [2, 2, 3, 3]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title} css={theme({ px: 1, py: [3, 3, 4, 4] })}>
          <SectionIcon icon={Icon} />
          <Caps
            as='h3'
            css={theme({ fontWeight: 'regular', pb: 2, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </Container>
)

const Explanation = () => (
  <Container
    as='section'
    id='why-choose'
    css={theme({
      alignItems: 'center',
      pb: [4, 4, 5, 5],
      pt: [4, 4, 5, 5],
      mt: [3, 3, 4, 4],
      bg: 'pinky'
    })}
  >
    <Subhead css={theme({ fontSize: [3, '30px', '35px', '45px'] })}>
      Why use our Loom embed code generator
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 1 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
  </Container>
)

const RelatedLinks = () => (
  <Container
    as='nav'
    aria-label='Related embed tools'
    css={theme({
      textAlign: 'center',
      pt: [4, 4, 5, 5],
      pb: [3, 3, 4, 4]
    })}
  >
    <Text css={theme({ fontSize: 1, color: 'black60' })}>
      <Link href='/tools/embed-url'>Embed any URL</Link>
      {' · '}
      <Link href='/embed/providers'>Browse providers</Link>
      {' · '}
      <Link href='/tools/embed-url/youtube'>YouTube</Link>
      {' · '}
      <Link href='/tools/embed-url/figma'>Figma</Link>
      {' · '}
      <Link href='/tools/embed-url/google-docs'>Google Docs</Link>
      {' · '}
      <Link href='/tools/embed-url/github'>GitHub</Link>
    </Text>
  </Container>
)

const ProductInformation = () => (
  <Faq
    title='FAQ'
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [2, 2, 4, 4],
      pb: 4,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'How do I embed a Loom video on my website?',
        answer: (
          <>
            <div>
              Paste any Loom share URL into the tool above and click Generate.
              You'll get a ready-to-paste iframe HTML snippet. Copy it and add
              it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Do chapters and timestamps work in the embed?',
        answer: (
          <>
            <div>
              Yes. The generated embed uses the native Loom player, so chapters,
              timestamps, playback speed controls, and captions all work exactly
              as they do on loom.com.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed password-protected Loom videos?',
        answer: (
          <>
            <div>
              No. Only Loom videos with public or link-accessible sharing
              settings can be embedded. Password-protected videos will not load
              in the iframe. The tool will fall back to a preview card when
              possible.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Loom embeds
              are resolved instantly from cache after the first request.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Loom Embed Code Generator — Embed Loom Videos'
    noSuffix
    description='Free Loom embed code generator. Paste any Loom URL — get a ready-to-paste iframe for screen recordings and video messages. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/loom',
        name: 'Loom Embed Code Generator',
        description:
          'Free Loom embed code generator. Paste any Loom URL and get a ready-to-paste iframe for screen recordings and video messages.',
        url: 'https://microlink.io/tools/embed-url/loom',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed loom video',
          'loom embed code',
          'loom embed code generator',
          'loom iframe embed',
          'loom video embed html',
          'embed loom recording',
          'loom embed for website',
          'loom embed generator'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 requests per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I embed a Loom video on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Loom share URL into the tool and click Generate. You'll get a ready-to-paste iframe HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Do chapters and timestamps work in the embed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The generated embed uses the native Loom player, so chapters, timestamps, playback speed controls, and captions all work.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed password-protected Loom videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Only Loom videos with public or link-accessible sharing settings can be embedded. The tool will fall back to a preview card when possible.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Loom embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      }
    ]}
  />
)

const LoomEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Loom Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#625DF5',
              width: '100%',
              textAlign: 'left'
            }}
          >
            with one click.
          </span>
        </Subhead>
      }
      caption={
        <>
          Powered by the <Link href='/embed'>Microlink Embed API</Link> — the
          same infrastructure handling embeds at scale.
        </>
      }
      features={FEATURES_LIST}
    />
    <RelatedLinks />
    <ProductInformation />
  </Layout>
)

export default LoomEmbedPage
