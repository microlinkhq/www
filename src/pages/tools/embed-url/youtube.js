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

const EXAMPLE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'

const FEATURES_LIST = [
  {
    title: 'Native YouTube player',
    description:
      "Get YouTube's real interactive embed player — not a screenshot or preview image. Play, pause, fullscreen, and captions all work."
  },
  {
    title: 'Responsive by default',
    description:
      'The generated iframe uses a 16:9 aspect ratio wrapper that adapts to any container width. Paste it into any layout.'
  },
  {
    title: 'Card fallback for unlisted videos',
    description:
      'When a video restricts embedding, the tool falls back to a rich preview card with title, thumbnail, and channel info.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a YouTube link',
    description:
      'Copy any youtube.com or youtu.be URL — regular videos, shorts, playlists, or live streams.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the video ID and generates the real YouTube player iframe HTML.'
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
    title: 'No YouTube embed gymnastics',
    description:
      'No need to manually extract the video ID or build the embed URL. Paste any YouTube link format and get working HTML.'
  },
  {
    title: 'Works with shorts, playlists & live',
    description:
      'Regular videos, YouTube Shorts, playlist URLs, and live streams — the tool handles all YouTube link formats.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with thumbnail, title, and
        channel. Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 YouTube embeds per day for free. No login, no API key, no watermarks.'
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
      YouTube Embed Code Generator
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
      Paste any YouTube URL — get a ready-to-paste iframe embed or custom
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
      How to embed a YouTube video
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
      Why use our YouTube embed code generator
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
      <Link href='/tools/embed-url/instagram'>Instagram</Link>
      {' · '}
      <Link href='/tools/embed-url/twitter-or-x'>Twitter / X</Link>
      {' · '}
      <Link href='/tools/embed-url/tiktok'>TikTok</Link>
      {' · '}
      <Link href='/tools/embed-url/figma'>Figma</Link>
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
        question: 'How do I embed a YouTube video on my website?',
        answer: (
          <>
            <div>
              Paste any YouTube URL into the tool above and click Generate.
              You'll get a ready-to-paste iframe HTML snippet. Copy it and add
              it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Does this work with YouTube Shorts?',
        answer: (
          <>
            <div>
              Yes. Paste any YouTube Shorts URL and the tool will extract the
              video ID and generate the correct embed code. Shorts are embedded
              as standard YouTube players.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed a YouTube playlist?',
        answer: (
          <>
            <div>
              Yes. Paste a playlist URL and the tool generates an embed player
              that loads the full playlist. Viewers can navigate between videos
              directly in the player.
            </div>
          </>
        )
      },
      {
        question: 'Is the YouTube embed generator free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. YouTube
              embeds are resolved instantly from cache after the first request.
            </div>
          </>
        )
      },
      {
        question: 'What if the video blocks embedding?',
        answer: (
          <>
            <div>
              If the video owner has disabled embedding, the tool falls back to
              a rich preview card showing the thumbnail, title, and channel. You
              can customize the card's style before copying.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='YouTube Embed Code Generator — Embed Any YouTube Video'
    noSuffix
    description='Free YouTube embed code generator. Paste any YouTube URL — get a ready-to-paste iframe or custom preview card. Works with videos, shorts, playlists, and live streams. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/youtube',
        name: 'YouTube Embed Code Generator',
        description:
          'Free YouTube embed code generator. Paste any YouTube URL and get a ready-to-paste iframe player or custom preview card.',
        url: 'https://microlink.io/tools/embed-url/youtube',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed youtube video',
          'youtube embed code generator',
          'youtube embed code',
          'embed youtube video in website',
          'youtube iframe code',
          'youtube embed html',
          'embed youtube shorts',
          'youtube player embed'
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
            name: 'How do I embed a YouTube video on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any YouTube URL into the tool and click Generate. You'll get a ready-to-paste iframe HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Does this work with YouTube Shorts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste any YouTube Shorts URL and the tool will extract the video ID and generate the correct embed code.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed a YouTube playlist?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste a playlist URL and the tool generates an embed player that loads the full playlist.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is the YouTube embed generator free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. YouTube embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      }
    ]}
  />
)

const YouTubeEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          YouTube Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#FF0000',
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

export default YouTubeEmbedPage
