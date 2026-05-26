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

const EXAMPLE_URL = 'https://github.com/microlinkhq/microlink-www'

const FEATURES_LIST = [
  {
    title: 'Rich repo previews',
    description:
      'Get a card with repo name, description, stars, language, and owner avatar — not just a plain link.'
  },
  {
    title: 'Repos, gists & files',
    description:
      'Handles all GitHub URL types including repositories, gists, issues, pull requests, and file links.'
  },
  {
    title: 'Gist embeds',
    description:
      'GitHub Gists get the real interactive embed with syntax highlighting, just like on github.com.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste a GitHub link',
    description:
      'Copy any github.com URL — repos, gists, issues, pull requests, or file links.'
  },
  {
    icon: Code,
    title: 'Get the embed code',
    description:
      'The tool detects the content type and generates the correct embed or preview card HTML.'
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
    title: 'No GitHub API token',
    description:
      'Skip the personal access token setup. Paste a link and get working embed code instantly.'
  },
  {
    title: 'Repos, gists, issues & PRs',
    description:
      'Works with all GitHub content — repositories, gists, issues, pull requests, and file links.'
  },
  {
    title: 'Customizable preview card',
    description: (
      <>
        Switch to Card mode to get a styled preview with repo info and avatar.
        Customize colors, fonts, and layout — or use the{' '}
        <Link href='/tools/embed-url'>full embed tool</Link> for advanced
        options.
      </>
    )
  },
  {
    title: 'Free, no signup',
    description:
      'Generate up to 50 GitHub embeds per day for free. No login, no API key, no watermarks.'
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
      GitHub Embed Code Generator
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
      Paste any GitHub URL — get a ready-to-paste embed or preview card for
      repos, gists, and files.
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
      How to embed a GitHub repo
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
      Why use our GitHub embed code generator
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
      <Link href='/tools/embed-url/figma'>Figma</Link>
      {' · '}
      <Link href='/tools/embed-url/google-docs'>Google Docs</Link>
      {' · '}
      <Link href='/tools/embed-url/datawrapper'>Datawrapper</Link>
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
        question: 'How do I embed a GitHub repo on my website?',
        answer: (
          <>
            <div>
              Paste any GitHub repository URL into the tool above and click
              Generate. You'll get a rich preview card with the repo name,
              description, stars, and language. Copy the HTML and add it to your
              blog, docs, CMS, or MDX file.
            </div>
          </>
        )
      },
      {
        question: 'Can I embed GitHub Gists?',
        answer: (
          <>
            <div>
              Yes. Paste any GitHub Gist URL and the tool will generate the
              correct embed code with syntax highlighting. The embedded Gist is
              interactive and works just like on github.com.
            </div>
          </>
        )
      },
      {
        question: 'Does the embed show stars and language?',
        answer: (
          <>
            <div>
              Yes. Repository preview cards include the repo name, description,
              star count, primary language, and owner avatar — all pulled
              automatically from the GitHub URL.
            </div>
          </>
        )
      },
      {
        question: 'Is this free?',
        answer: (
          <>
            <div>
              Yes — 50 requests per day, no login, no credit card. GitHub embeds
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
    title='GitHub Embed Code Generator — Embed Repos & Gists'
    noSuffix
    description='Free GitHub embed code generator. Paste any GitHub URL — get a ready-to-paste embed for repositories, gists, and files. No signup.'
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/embed-url/github',
        name: 'GitHub Embed Code Generator',
        description:
          'Free GitHub embed code generator. Paste any GitHub URL and get a ready-to-paste embed for repositories, gists, and files.',
        url: 'https://microlink.io/tools/embed-url/github',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords: [
          'embed github',
          'github embed code',
          'github embed code generator',
          'embed github gist',
          'github readme embed',
          'embed github repo',
          'github embed html',
          'github embed for website'
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
            name: 'How do I embed a GitHub repo on my website?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Paste any GitHub repository URL into the tool and click Generate. You'll get a rich preview card with the repo name, description, stars, and language."
            }
          },
          {
            '@type': 'Question',
            name: 'Can I embed GitHub Gists?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Paste any GitHub Gist URL and the tool will generate the correct embed code with syntax highlighting.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does the embed show stars and language?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Repository preview cards include the repo name, description, star count, primary language, and owner avatar.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes — 50 requests per day, no login, no credit card. GitHub embeds are resolved instantly from cache after the first request.'
            }
          }
        ]
      }
    ]}
  />
)

const GitHubEmbedPage = () => (
  <Layout>
    <Hero />
    <EmbedTool initialUrl={EXAMPLE_URL} />
    <HowItWorks />
    <Explanation />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          GitHub Embed{' '}
          <span
            css={{
              display: 'block',
              color: '#24292e',
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

export default GitHubEmbedPage
