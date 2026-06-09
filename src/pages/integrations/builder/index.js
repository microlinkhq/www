import { layout, theme } from 'theme'
import { cdnUrl } from 'helpers/cdn-url'
import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'

import { Builder } from 'components/pages/builder'

const FRAMEWORKS = ['React', 'Vue', 'Angular', 'Svelte', 'Vanilla JS']

const STEPS = [
  {
    title: 'Design it',
    description:
      'Pick a size, place the image, set colors, fonts, border, and shadow. The preview updates as you go.'
  },
  {
    title: 'Copy it',
    description:
      'Grab a zero-dependency component for React, Vue, Angular, Svelte, or Vanilla JS — no SDK, no build step.'
  },
  {
    title: 'Ship it',
    description:
      'Drop it in, pass a url. It fetches metadata from the Microlink API itself. Add an apiKey for Pro.'
  }
]

const QUESTIONS = [
  {
    question: 'What does the generated component depend on?',
    answer: (
      <>
        <div>
          Nothing. Each component is a single self-contained file with no npm
          dependencies. It calls the Microlink REST API directly with fetch and
          renders the card with inline styles.
        </div>
      </>
    )
  },
  {
    question: 'How do free and Pro requests work?',
    answer: (
      <>
        <div>
          Without an <code>apiKey</code> the component queries{' '}
          <code>api.microlink.io</code> (free tier). Pass an <code>apiKey</code>{' '}
          prop and it switches to <code>pro.microlink.io</code> with your key,
          unlocking higher rate limits and Pro features.
        </div>
      </>
    )
  },
  {
    question: 'How does the Vanilla JS version work?',
    answer: (
      <>
        <div>
          It exposes a global <code>microlink(selector, options)</code> function
          that replaces every matched element with the card you designed — e.g.{' '}
          <code>microlink('a')</code> turns every link into a preview, and{' '}
          <code>
            microlink('.link-previews', {'{'} size: 'large' {'}'})
          </code>{' '}
          targets a class with options.
        </div>
      </>
    )
  },
  {
    question: 'How is this different from the SDK?',
    answer: (
      <>
        <div>
          The <Link href='/integrations/sdk'>SDK</Link> is a prebuilt,
          batteries-included component you install from npm. This builder
          generates source you own and can edit — handy when you want a specific
          look with zero dependencies.
        </div>
      </>
    )
  }
]

const Hero = () => (
  <Flex
    as='section'
    css={theme({ flexDirection: 'column', alignItems: 'center' })}
  >
    <Heading
      css={theme({
        mt: [3, 3, 0, 0],
        maxWidth: layout.large,
        textAlign: 'center',
        fontSize: [3, 4, 4, 5]
      })}
    >
      Build your own <br /> link preview component
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({ pt: [3, 3, 4, 4], px: 4, maxWidth: layout.large })}
    >
      Design a link preview card, then copy a zero-dependency component for{' '}
      {FRAMEWORKS.join(', ')}. It fetches metadata from the Microlink API itself
      — pass an apiKey to go Pro.
    </Caption>
    <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
      <ArrowLink css={theme({ pr: [2, 4, 4, 4] })} href='#builder'>
        Start building
      </ArrowLink>
      <ArrowLink href='/integrations/sdk'>Or use the SDK</ArrowLink>
    </Flex>
  </Flex>
)

const BuilderSection = () => (
  <Container
    as='section'
    id='builder'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      pt: [4, 4, 5, 5],
      mb: [4, 4, 5, 5],
      px: [3, 3, 4, 4]
    })}
  >
    <Builder />
  </Container>
)

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      py: [4, 4, 5, 5]
    })}
  >
    <Subhead variant='gradient' css={theme({ fontSize: [3, 3, 4, 4] })}>
      Three steps
    </Subhead>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        px: 4,
        gap: [4, 4, 5, 5],
        width: '100%',
        flexDirection: ['column', 'column', 'row', 'row'],
        justifyContent: 'center'
      })}
    >
      {STEPS.map(({ title, description }, index) => (
        <Flex
          key={title}
          css={theme({
            flexDirection: 'column',
            flex: '1 1 0',
            maxWidth: '340px',
            mx: 'auto'
          })}
        >
          <Text
            css={theme({ fontFamily: 'mono', color: 'black40', fontSize: 1 })}
          >
            {`0${index + 1}`}
          </Text>
          <Subhead
            css={theme({ pt: 2, fontSize: [2, 2, 3, 3], textAlign: 'left' })}
          >
            {title}
          </Subhead>
          <Text
            css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black60' })}
          >
            {description}
          </Text>
        </Flex>
      ))}
    </Flex>
  </Container>
)

const BuilderPage = () => (
  <Layout>
    <Hero />
    <BuilderSection />
    <Box
      css={theme({
        bg: 'pinky',
        borderTop: 1,
        borderTopColor: 'black10',
        borderBottom: 1,
        borderBottomColor: 'black10'
      })}
    >
      <HowItWorks />
    </Box>
    <Faq
      css={theme({ py: [5, 5, 6, 6] })}
      title='Frequently asked questions'
      questions={QUESTIONS}
    />
  </Layout>
)

export const Head = () => (
  <Meta
    title='Link Preview Component Builder — React, Vue, Angular, Svelte & JS'
    description='Visually design a link preview card, then copy a zero-dependency component for React, Vue, Angular, Svelte, and Vanilla JS. Fetches metadata from the Microlink API; pass an apiKey for Pro.'
    image={cdnUrl('banner/sdk.jpeg')}
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/integrations/builder',
        name: 'Microlink Link Preview Component Builder',
        description:
          'Visually design a link preview card and generate a zero-dependency component for React, Vue, Angular, Svelte, and Vanilla JS.',
        url: 'https://microlink.io/integrations/builder',
        applicationCategory: 'DeveloperApplication',
        keywords: [
          'link preview component',
          'link preview generator',
          'react link preview',
          'vue link preview',
          'angular link preview',
          'svelte link preview',
          'vanilla js link preview',
          'unfurl url',
          'microlink'
        ],
        provider: {
          '@type': 'Organization',
          '@id': 'https://microlink.io/about',
          name: 'Microlink',
          url: 'https://microlink.io'
        }
      }
    ]}
  />
)

export default BuilderPage
