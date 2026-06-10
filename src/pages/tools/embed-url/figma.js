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

const EXAMPLE_URL = 'https://embed.figma.com/design/abc123/example'

const FEATURES_LIST = [
  {
    title: 'Interactive Figma viewer',
    description:
      'Users can zoom, pan, and navigate frames directly in the embed.'
  },
  {
    title: 'Designs, prototypes & FigJam',
    description: 'Works with all Figma file types.'
  },
  {
    title: 'Responsive iframe',
    description: 'The embed scales to fit any container width.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a Figma link',
    description: 'Copy any Figma design, prototype, or FigJam URL.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description: 'Detects the file type and generates the correct iframe.'
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
    title: 'No manual embed URL building',
    description: 'Paste any Figma URL format.'
  },
  {
    title: 'Prototypes play inline',
    description: 'Clickable prototypes work in the iframe.'
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
      'Generate up to 50 Figma embeds per day for free. No login, no API key, no watermarks.'
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
      Figma Embed Code Generator
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
      Paste any Figma URL — get a ready-to-paste iframe embed or preview card
      for designs and prototypes.
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
      How to embed a Figma design
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
        question: 'How do I embed a Figma design on my website?',
        answer: (
          <>
            <div>
              Paste any Figma URL into the tool above and click Generate. You'll
              get a ready-to-paste iframe HTML snippet. Copy it and add it to
              your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Does the prototype work in the embed?',
        answer: (
          <>
            <div>
              Yes. Figma prototypes are fully interactive inside the iframe.
              Users can click through flows, navigate frames, and interact with
              the design just like in Figma.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed FigJam boards?',
        answer: (
          <>
            <div>
              Yes. Paste a FigJam URL and the tool generates the correct embed
              code. Viewers can see the board contents directly in the iframe.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Figma embeds
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
    title='Figma Embed Code Generator — Embed Designs & Prototypes'
    noSuffix
    description='Free Figma embed code generator. Paste any Figma URL — get a ready-to-paste iframe for designs, prototypes, and FigJam boards. No signup.'
    image='https://cdn.microlink.io/logo/banner.jpeg'
    robots={embedRobots('figma')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/figma',
        name: 'Figma Embed Code Generator',
        description:
          'Free Figma embed code generator. Paste any Figma URL and get a ready-to-paste iframe for designs, prototypes, and FigJam boards.',
        url: 'https://microlink.io/tools/embed-url/figma',
        image: 'https://cdn.microlink.io/logo/banner.jpeg',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed figma',
          'figma embed code',
          'figma embed code generator',
          'figma iframe embed',
          'embed figma design',
          'figma prototype embed',
          'embed figma in website',
          'figma embed html'
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
            name: 'How do I embed a Figma design on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Figma URL into the tool and click Generate. You'll get a ready-to-paste iframe HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Does the prototype work in the embed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Figma prototypes are fully interactive inside the iframe. Users can click through flows, navigate frames, and interact with the design just like in Figma.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed FigJam boards?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste a FigJam URL and the tool generates the correct embed code. Viewers can see the board contents directly in the iframe.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Figma embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      },
      embedBreadcrumb({ name: 'Figma', slug: 'figma' })
    ]}
  />
)

const FigmaEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} provider='figma' />
    <HowItWorks />
    <WhyChoose
      heading='Why use our Figma embed code generator'
      reasons={REASON_TO_USE}
      accentColor='#F24E1E'
    />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Figma Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#F24E1E',
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

export default FigmaEmbedPage
