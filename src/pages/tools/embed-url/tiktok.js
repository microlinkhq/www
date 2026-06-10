import { layout, theme } from 'theme'
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

import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'

import { StepCard, SectionIcon } from 'components/pages/screenshot'
import {
  EmbedTool,
  WhyChoose,
  embedBreadcrumb,
  embedRobots
} from 'components/pages/embed-url'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const EXAMPLE_URL = 'https://www.tiktok.com/@zachking/video/6768504823336815877'

const FEATURES_LIST = [
  {
    title: 'Native TikTok player',
    description:
      'The real TikTok video player with sound, likes, and sharing. Visitors can watch and interact without leaving your site.'
  },
  {
    title: 'Any TikTok link format',
    description:
      'Regular videos, trending videos, and user profiles — paste any TikTok URL format and get working embed HTML.'
  },
  {
    title: 'Preview card fallback',
    description:
      'When the embed is restricted, you get a styled card with thumbnail and creator info instead of a broken player.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a TikTok link',
    description:
      'Copy any TikTok video URL from the app or browser — regular videos, trending clips, or profile links.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the video and generates the native TikTok player embed HTML.'
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
    title: 'No TikTok API needed',
    description:
      'Skip the developer portal and API keys. Paste any public TikTok URL and get the embed code instantly.'
  },
  {
    title: 'Works with any public video',
    description:
      'Any publicly available TikTok video can be embedded. The tool handles all URL formats and redirects.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with thumbnail and creator
        info. Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 TikTok embeds per day for free. No login, no API key, no watermarks.'
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
      TikTok Embed Code Generator
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
      Paste any TikTok URL — get a ready-to-paste embed or custom preview card.
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
      How to embed a TikTok video
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

const ProductInformation = () => (
  <Faq
    title='FAQ'
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [5, 5, 6, 6],
      pb: 4
    })}
    questions={[
      {
        question: 'How do I embed a TikTok video on my website?',
        answer: (
          <>
            <div>
              Paste any TikTok video URL into the tool above and click Generate.
              You'll get a ready-to-paste HTML snippet with the native TikTok
              player. Copy it and add it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed TikTok videos in WordPress?',
        answer: (
          <>
            <div>
              Yes. Copy the generated embed code and paste it into a Custom HTML
              block in WordPress. The TikTok player will render directly in your
              post or page.
            </div>
          </>
        )
      },
      {
        question: 'Does the embed play automatically?',
        answer: (
          <>
            <div>
              Autoplay behavior depends on the browser and platform. Most
              browsers require a user interaction before allowing autoplay with
              sound. The embed will show the video thumbnail until the visitor
              clicks play.
            </div>
          </>
        )
      },
      {
        question: 'Is the TikTok embed generator free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. TikTok embeds
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
    title='TikTok Embed Code Generator — Embed TikTok Videos'
    noSuffix
    description='Free TikTok embed code generator. Paste any TikTok URL — get a ready-to-paste embed for videos and profiles. No signup, no API key.'
    image='https://cdn.microlink.io/logo/banner.jpeg'
    robots={embedRobots('tiktok')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/tiktok',
        name: 'TikTok Embed Code Generator',
        description:
          'Free TikTok embed code generator. Paste any TikTok URL and get a ready-to-paste embed for videos and profiles.',
        url: 'https://microlink.io/tools/embed-url/tiktok',
        image: 'https://cdn.microlink.io/logo/banner.jpeg',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed tiktok video',
          'tiktok embed code',
          'tiktok embed code generator',
          'tiktok embed html',
          'embed tiktok on website',
          'tiktok video embed generator',
          'tiktok iframe code',
          'tiktok embed for blog'
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
            name: 'How do I embed a TikTok video on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any TikTok video URL into the tool and click Generate. You'll get a ready-to-paste HTML snippet with the native TikTok player. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed TikTok videos in WordPress?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Copy the generated embed code and paste it into a Custom HTML block in WordPress. The TikTok player will render directly in your post or page.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does the embed play automatically?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Autoplay behavior depends on the browser and platform. Most browsers require a user interaction before allowing autoplay with sound. The embed will show the video thumbnail until the visitor clicks play.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the TikTok embed generator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. TikTok embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      },
      embedBreadcrumb({ name: 'TikTok', slug: 'tiktok' })
    ]}
  />
)

const TikTokEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} provider='tiktok' />
    <HowItWorks />
    <WhyChoose
      heading='Why use our TikTok embed code generator'
      reasons={REASON_TO_USE}
      accentColor='#010101'
    />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          TikTok Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#010101',
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
    <ProductInformation />
  </Layout>
)

export default TikTokEmbedPage
