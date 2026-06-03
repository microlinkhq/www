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
  embedBreadcrumb
} from 'components/pages/embed-url'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const EXAMPLE_URL = 'https://www.facebook.com/photo/?fbid=122216444028063453'

const FEATURES_LIST = [
  {
    title: 'Native Facebook embed',
    description:
      'The real Facebook post with reactions, comments, and sharing — not a screenshot or static image.'
  },
  {
    title: 'Posts, videos & pages',
    description:
      'Handles all public Facebook content types including posts, videos, reels, and page embeds.'
  },
  {
    title: 'Preview card fallback',
    description:
      'When embed is restricted, the tool falls back to a styled card with image and description.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a Facebook link',
    description:
      'Copy any facebook.com URL — posts, photos, videos, reels, or page links.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the content type and generates the correct embed HTML.'
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
    title: 'No Facebook SDK setup',
    description:
      'Skip the App ID and JavaScript SDK configuration. Paste a link and get working embed code instantly.'
  },
  {
    title: 'Posts, videos & pages',
    description:
      'Works with all Facebook content — posts, photos, videos, reels, and public page embeds.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with image and description.
        Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 Facebook embeds per day for free. No login, no API key, no watermarks.'
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
      Facebook Embed Code Generator
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
      Paste any Facebook URL — get a ready-to-paste embed or custom preview card
      for posts and videos.
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
      How to embed a Facebook post
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
        question: 'How do I embed a Facebook post on my website?',
        answer: (
          <>
            <div>
              Paste any Facebook post URL into the tool above and click
              Generate. You'll get a ready-to-paste embed HTML snippet. Copy it
              and add it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed Facebook videos?',
        answer: (
          <>
            <div>
              Yes. Paste any Facebook video URL and the tool will generate the
              correct embed code. The video player will include playback
              controls and fullscreen support.
            </div>
          </>
        )
      },
      {
        question: 'Does the post need to be public?',
        answer: (
          <>
            <div>
              Yes. Only public Facebook posts can be embedded. If a post is set
              to Friends Only or has restricted visibility, the embed will not
              load. The tool will fall back to a preview card when possible.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Facebook
              embeds are resolved instantly from cache after the first request.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Facebook Embed Code Generator — Embed Posts & Videos'
    noSuffix
    description='Free Facebook embed code generator. Paste any Facebook URL — get a ready-to-paste embed for posts, videos, and pages. No signup, no API key.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/facebook',
        name: 'Facebook Embed Code Generator',
        description:
          'Free Facebook embed code generator. Paste any Facebook URL and get a ready-to-paste embed for posts, videos, and pages.',
        url: 'https://microlink.io/tools/embed-url/facebook',
        image: 'https://cdn.microlink.io/banner/sdk.jpeg',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed facebook post',
          'facebook embed code',
          'facebook embed code generator',
          'embed facebook video',
          'facebook post embed html',
          'facebook embed generator',
          'facebook iframe code',
          'embed facebook on website'
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
            name: 'How do I embed a Facebook post on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Facebook post URL into the tool and click Generate. You'll get a ready-to-paste embed HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed Facebook videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste any Facebook video URL and the tool will generate the correct embed code. The video player will include playback controls and fullscreen support.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does the post need to be public?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Only public Facebook posts can be embedded. If a post is set to Friends Only or has restricted visibility, the embed will not load. The tool will fall back to a preview card when possible.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Facebook embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      },
      embedBreadcrumb({ name: 'Facebook', slug: 'facebook' })
    ]}
  />
)

const FacebookEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <WhyChoose
      heading='Why use our Facebook embed code generator'
      reasons={REASON_TO_USE}
      accentColor='#1877F2'
    />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Facebook Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#1877F2',
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

export default FacebookEmbedPage
