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
  'https://docs.google.com/document/d/1BxiMkBo_oNFIWcp7n_GEA1hxDGqS9F5aSg5HKPZ1QAk/edit'

const FEATURES_LIST = [
  {
    title: 'Full document viewer',
    description:
      'The embedded doc is scrollable and readable right in the page. Visitors can read the full document without leaving your site.'
  },
  {
    title: 'Works with published and shared docs',
    description:
      'As long as the doc has a shareable link, the embed works. No need to manually publish or change sharing settings.'
  },
  {
    title: 'Preview card fallback',
    description:
      'If the doc is private, you get a styled card with title and description instead of a broken embed.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a Google Docs link',
    description:
      'Copy the URL from your browser address bar while viewing any Google Doc, Sheet, or Slide.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool converts the URL into a working iframe embed HTML snippet automatically.'
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
      'No need to manually convert /edit to /pub URLs or figure out the embed URL format. Paste the link as-is.'
  },
  {
    title: 'Slides, Sheets & Docs',
    description:
      'Works with all Google Workspace document types — Google Docs, Google Sheets, and Google Slides.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with title and description.
        Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 Google Docs embeds per day for free. No login, no API key, no watermarks.'
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
      Google Docs Embed Code Generator
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
      Paste any Google Docs URL — get a ready-to-paste iframe embed or preview
      card.
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
      How to embed a Google Doc
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
      Why use our Google Docs embed code generator
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
      <Link href='/tools/embed-url/google-drive'>Google Drive</Link>
      {' · '}
      <Link href='/tools/embed-url/youtube'>YouTube</Link>
      {' · '}
      <Link href='/tools/embed-url/figma'>Figma</Link>
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
        question: 'How do I embed a Google Doc on my website?',
        answer: (
          <>
            <div>
              Paste any Google Docs URL into the tool above and click Generate.
              You'll get a ready-to-paste iframe HTML snippet. Copy it and add
              it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Does the document need to be published?',
        answer: (
          <>
            <div>
              Not necessarily. The tool works with any doc that has a shareable
              link. If the doc is set to "Anyone with the link can view," the
              embed will work. Fully private docs will show a preview card
              instead.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed Google Sheets or Slides too?',
        answer: (
          <>
            <div>
              Yes. Paste a Google Sheets or Google Slides URL and the tool will
              generate the correct embed code. It works with all Google
              Workspace document types.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Google Docs
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
    title='Google Docs Embed Code Generator — Embed Documents'
    noSuffix
    description='Free Google Docs embed code generator. Paste any Google Docs URL — get a ready-to-paste iframe to embed documents in your website. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/google-docs',
        name: 'Google Docs Embed Code Generator',
        description:
          'Free Google Docs embed code generator. Paste any Google Docs URL and get a ready-to-paste iframe to embed documents in your website.',
        url: 'https://microlink.io/tools/embed-url/google-docs',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed google doc',
          'google docs embed code',
          'google docs embed code generator',
          'embed google document',
          'google docs iframe',
          'embed google doc in website',
          'google document embed html',
          'google docs embed generator'
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
            name: 'How do I embed a Google Doc on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Google Docs URL into the tool and click Generate. You'll get a ready-to-paste iframe HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Does the document need to be published?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Not necessarily. The tool works with any doc that has a shareable link. If the doc is set to "Anyone with the link can view," the embed will work. Fully private docs will show a preview card instead.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed Google Sheets or Slides too?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste a Google Sheets or Google Slides URL and the tool will generate the correct embed code. It works with all Google Workspace document types.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Google Docs embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      }
    ]}
  />
)

const GoogleDocsEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Google Docs Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#4285F4',
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

export default GoogleDocsEmbedPage
