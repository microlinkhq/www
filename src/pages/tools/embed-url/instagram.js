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

const EXAMPLE_URL = 'https://www.instagram.com/p/CsGRq_RMhXz/'

const FEATURES_LIST = [
  {
    title: 'Native Instagram embed',
    description:
      'Get the real Instagram embed with photo, caption, and interaction buttons — not a static screenshot.'
  },
  {
    title: 'Posts, Reels & Stories',
    description:
      'Paste any Instagram post, reel, or story URL. The tool detects the content type and returns the right embed.'
  },
  {
    title: 'Preview card fallback',
    description:
      'If the post is private or embedding is restricted, the tool generates a styled preview card with the available metadata.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste an Instagram link',
    description:
      'Copy any instagram.com URL — posts, reels, stories, or profiles.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool resolves the Instagram oEmbed endpoint and returns the real embed HTML.'
  },
  {
    icon: Clipboard,
    title: 'Copy & paste',
    description:
      'Click Copy code, then paste the HTML into your blog, newsletter, docs, or any HTML editor.'
  }
]

const REASON_TO_USE = [
  {
    title: 'No Instagram API setup',
    description:
      'Skip the Facebook Developer portal and oEmbed token dance. Paste a URL, get embed HTML — done.'
  },
  {
    title: 'Works with any public post',
    description:
      'Regular posts, carousels, reels, and IGTV — the tool handles all Instagram content types.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with image, caption, and
        author. Customize the look or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for more options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 Instagram embeds per day for free. No login, no API key, no watermarks.'
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
      Instagram Embed Code Generator
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
      Paste any Instagram URL — get a ready-to-paste embed or custom preview
      card for posts, reels, and stories.
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
      How to embed an Instagram post
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
      Why use our Instagram embed code generator
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
      <Link href='/tools/embed-url/providers'>Browse providers</Link>
      {' · '}
      <Link href='/tools/embed-url/youtube'>YouTube</Link>
      {' · '}
      <Link href='/tools/embed-url/twitter-or-x'>Twitter / X</Link>
      {' · '}
      <Link href='/tools/embed-url/tiktok'>TikTok</Link>
      {' · '}
      <Link href='/tools/embed-url/facebook'>Facebook</Link>
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
        question: 'How do I embed an Instagram post on my website?',
        answer: (
          <>
            <div>
              Paste any Instagram post URL into the tool above and click
              Generate. You'll get a ready-to-paste HTML snippet with the real
              Instagram embed. Copy it and add it to your site.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed Instagram Reels?',
        answer: (
          <>
            <div>
              Yes. Paste any Instagram Reel URL and the tool generates the
              correct embed code. The reel plays inline with full Instagram
              controls.
            </div>
          </>
        )
      },
      {
        question: 'Why does the embed show a preview card instead of the post?',
        answer: (
          <>
            <div>
              If the Instagram account is private or the post restricts
              embedding, the tool falls back to a rich preview card with the
              available metadata. You can customize the card before copying.
            </div>
          </>
        )
      },
      {
        question: 'Is the Instagram embed generator free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Cached
              responses don't count against your limit.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Instagram Embed Code Generator — Embed Posts & Reels'
    noSuffix
    description='Free Instagram embed code generator. Paste any Instagram URL — get a ready-to-paste embed for posts, reels, and stories. No API setup, no signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/instagram',
        name: 'Instagram Embed Code Generator',
        description:
          'Free Instagram embed code generator. Paste any Instagram URL and get a ready-to-paste embed for posts, reels, and stories.',
        url: 'https://microlink.io/tools/embed-url/instagram',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed instagram post',
          'instagram embed code',
          'instagram embed code generator',
          'embed instagram reel',
          'instagram post embed html',
          'embed instagram on website',
          'instagram embed generator',
          'instagram iframe code'
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
            name: 'How do I embed an Instagram post on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Instagram post URL into the tool and click Generate. You'll get a ready-to-paste HTML snippet with the real Instagram embed."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed Instagram Reels?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste any Instagram Reel URL and the tool generates the correct embed code. The reel plays inline with full Instagram controls.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the Instagram embed generator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Cached responses do not count against your limit.'
            }
          }
        ]
      }
    ]}
  />
)

const InstagramEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Instagram Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#E4405F',
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

export default InstagramEmbedPage
