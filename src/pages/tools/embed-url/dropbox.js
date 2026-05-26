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

const EXAMPLE_URL = 'https://www.dropbox.com/s/abc123/example.pdf'

const FEATURES_LIST = [
  {
    title: 'Inline file viewer',
    description:
      'PDFs, images, and documents open directly in the embedded viewer — no download required.'
  },
  {
    title: 'Any shared file',
    description:
      'Documents, images, videos, and folders with shared links all work. Paste the share URL as-is.'
  },
  {
    title: 'Preview card fallback',
    description:
      'When direct embed is restricted, the tool falls back to a styled card with file name and type.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a Dropbox link',
    description:
      'Copy any dropbox.com shared link — PDFs, images, videos, documents, or folder links.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the file type and generates the correct embed or preview card HTML.'
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
    title: 'No URL conversion needed',
    description:
      'Paste the share link as-is — no need to manually modify the URL. The tool handles the conversion for you.'
  },
  {
    title: 'PDFs, images & videos',
    description:
      'Supports common file types including PDFs, images, videos, and documents shared via Dropbox.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with file name and type.
        Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 Dropbox embeds per day for free. No login, no API key, no watermarks.'
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
      Dropbox Embed Code Generator
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
      Paste any Dropbox URL — get a ready-to-paste embed or preview card for
      files and documents.
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
      How to embed a Dropbox file
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
      Why use our Dropbox embed code generator
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
      <Link href='/tools/embed-url/google-docs'>Google Docs</Link>
      {' · '}
      <Link href='/tools/embed-url/github'>GitHub</Link>
      {' · '}
      <Link href='/tools/embed-url/loom'>Loom</Link>
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
        question: 'How do I embed a Dropbox file on my website?',
        answer: (
          <>
            <div>
              Paste any Dropbox shared link into the tool above and click
              Generate. You'll get a ready-to-paste embed HTML snippet. Copy it
              and add it to your HTML, blog, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Does the file need a shared link?',
        answer: (
          <>
            <div>
              Yes. Only Dropbox files with a shared link can be embedded. If the
              file is private or the link has expired, the embed will not load.
              The tool will fall back to a preview card when possible.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed Dropbox videos?',
        answer: (
          <>
            <div>
              Yes. Paste any Dropbox video shared link and the tool will
              generate an embed with the inline viewer. Video playback controls
              are included automatically.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. Dropbox
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
    title='Dropbox Embed Code Generator — Embed Files & Documents'
    noSuffix
    description='Free Dropbox embed code generator. Paste any Dropbox URL — get a ready-to-paste embed for PDFs, images, videos, and documents. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/dropbox',
        name: 'Dropbox Embed Code Generator',
        description:
          'Free Dropbox embed code generator. Paste any Dropbox URL and get a ready-to-paste embed for PDFs, images, videos, and documents.',
        url: 'https://microlink.io/tools/embed-url/dropbox',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed dropbox',
          'dropbox embed code',
          'dropbox embed code generator',
          'embed dropbox file',
          'dropbox iframe',
          'dropbox embed link',
          'dropbox embed html',
          'embed dropbox for website'
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
            name: 'How do I embed a Dropbox file on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any Dropbox shared link into the tool and click Generate. You'll get a ready-to-paste embed HTML snippet. Copy it and add it to your HTML, blog, CMS, or MDX file."
            }
          },
          {
            '@type': 'Question',
            name: 'Does the file need a shared link?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Only Dropbox files with a shared link can be embedded. The tool will fall back to a preview card when the link is private or expired.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed Dropbox videos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste any Dropbox video shared link and the tool will generate an embed with the inline viewer and playback controls.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. Dropbox embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      }
    ]}
  />
)

const DropboxEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Dropbox Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#0061FF',
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

export default DropboxEmbedPage
