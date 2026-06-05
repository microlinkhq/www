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

const EXAMPLE_URL = 'https://x.com/elaborana/status/1925935744098652459'

const FEATURES_LIST = [
  {
    title: 'Native tweet embed',
    description:
      'Get the real interactive tweet with likes, retweets, and replies — not a screenshot. Users can engage directly from the embed.'
  },
  {
    title: 'Works with X and Twitter URLs',
    description:
      'Accepts both x.com and twitter.com links. No need to convert or rewrite URLs — paste either format and get working HTML.'
  },
  {
    title: 'Threads and quoted tweets',
    description:
      'Handles threads and quote tweets too. The embed preserves the full context of the conversation.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a tweet link',
    description:
      'Copy any tweet URL from twitter.com or x.com — regular tweets, threads, or quoted posts.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the tweet and returns the interactive embed HTML ready to use.'
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
    title: 'Both x.com and twitter.com',
    description:
      'No need to convert URLs between the old and new domains. Paste either format and the tool handles the rest.'
  },
  {
    title: 'Threads & quote tweets',
    description:
      'Handles all tweet types — single tweets, threads, quote tweets, and replies. The embed preserves the full context.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with image, text, and
        author. Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 tweet embeds per day for free. No login, no API key, no watermarks.'
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
      Twitter Embed Code Generator
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
      Paste any tweet or X post URL — get a ready-to-paste embed or custom
      preview card.
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
      How to embed a tweet
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
        question: 'How do I embed a tweet on my website?',
        answer: (
          <>
            <div>
              Paste any tweet URL into the tool above and click Generate. You'll
              get a ready-to-paste HTML snippet with the interactive tweet
              embed. Copy it and add it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Does this work with X.com URLs?',
        answer: (
          <>
            <div>
              Yes. The tool accepts both x.com and twitter.com URLs. You don't
              need to convert between the old and new domain — paste either
              format and get the embed code.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed a Twitter thread?',
        answer: (
          <>
            <div>
              Yes. Paste the URL of any tweet in a thread and the tool will
              generate the embed code. The embedded tweet links back to the full
              thread on Twitter/X.
            </div>
          </>
        )
      },
      {
        question: 'Is the Twitter embed generator free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Tweet embeds
              are resolved instantly from cache after the first request.
            </div>
          </>
        )
      },
      {
        question: 'What if the tweet is deleted?',
        answer: (
          <>
            <div>
              If the tweet has been deleted or the account is suspended, the
              tool falls back to a preview card with whatever metadata is still
              available. The embed will show a notice that the tweet is no
              longer available.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Twitter Embed Code Generator — Embed Tweets & X Posts'
    noSuffix
    description='Free Twitter embed code generator. Paste any tweet or X post URL — get a ready-to-paste embed. Works with tweets, threads, and quoted posts. No signup.'
    image='https://cdn.microlink.io/logo/banner.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/twitter-or-x',
        name: 'Twitter Embed Code Generator',
        description:
          'Free Twitter embed code generator. Paste any tweet or X post URL and get a ready-to-paste embed or custom preview card.',
        url: 'https://microlink.io/tools/embed-url/twitter-or-x',
        image: 'https://cdn.microlink.io/logo/banner.jpeg',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed tweet',
          'twitter embed code',
          'twitter embed code generator',
          'embed x post',
          'tweet embed html',
          'x post embed code',
          'embed twitter post',
          'twitter iframe code'
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
            name: 'How do I embed a tweet on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any tweet URL into the tool and click Generate. You'll get a ready-to-paste HTML snippet with the interactive tweet embed. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Does this work with X.com URLs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes. The tool accepts both x.com and twitter.com URLs. You don't need to convert between the old and new domain — paste either format and get the embed code."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed a Twitter thread?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste the URL of any tweet in a thread and the tool will generate the embed code. The embedded tweet links back to the full thread on Twitter/X.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the Twitter embed generator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Tweet embeds are resolved instantly from cache after the first request.'
            }
          },
          {
            '@type': 'Question',
            name: 'What if the tweet is deleted?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If the tweet has been deleted or the account is suspended, the tool falls back to a preview card with whatever metadata is still available. The embed will show a notice that the tweet is no longer available.'
            }
          }
        ]
      },
      embedBreadcrumb({ name: 'Twitter / X', slug: 'twitter-or-x' })
    ]}
  />
)

const TwitterEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <WhyChoose
      heading='Why use our Twitter embed code generator'
      reasons={REASON_TO_USE}
      accentColor='#1DA1F2'
    />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Twitter Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#1DA1F2',
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

export default TwitterEmbedPage
