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

const DEFAULT_HOW_IT_WORKS_ICONS = [Globe, Code, Clipboard]

const Hero = ({ title, subtitle }) => (
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
      {title}
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
      {subtitle}
    </Caption>
  </Flex>
)

const HowItWorksSection = ({ heading, steps }) => (
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
      {heading}
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
      {steps.map(({ title, description }, i) => {
        const Icon = DEFAULT_HOW_IT_WORKS_ICONS[i] || Code
        return (
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
        )
      })}
    </Flex>
  </Container>
)

const ExplanationSection = ({ heading, reasons }) => (
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
      {heading}
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
      {reasons.map(({ title, description }) => (
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

const RelatedLinksSection = ({ links }) => (
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
      <Link href='/embed/providers'>Browse providers</Link>
      {links.map(({ href, label }) => (
        <React.Fragment key={href}>
          {' · '}
          <Link href={href}>{label}</Link>
        </React.Fragment>
      ))}
    </Text>
  </Container>
)

const FaqSection = ({ questions }) => (
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
    questions={questions.map(({ question, answer }) => ({
      question,
      answer: (
        <>
          <div>{answer}</div>
        </>
      )
    }))}
  />
)

export const providerHead = ({
  name,
  slug,
  metaTitle,
  metaDescription,
  keywords,
  faq
}) => (
  <Meta
    title={metaTitle}
    noSuffix
    description={metaDescription}
    image='https://cdn.microlink.io/banner/sdk.jpeg'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': `https://microlink.io/tools/embed-url/${slug}`,
        name: metaTitle.split(' — ')[0],
        description: metaDescription,
        url: `https://microlink.io/tools/embed-url/${slug}`,
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        keywords,
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
        mainEntity: faq.slice(0, 4).map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      }
    ]}
  />
)

export const ProviderSubtool = ({
  name,
  color,
  exampleUrl,
  heroTitle,
  heroSubtitle,
  howItWorksHeading,
  howItWorksSteps,
  explanationHeading,
  reasons,
  features,
  relatedLinks,
  faq
}) => (
  <Layout>
    <Hero title={heroTitle} subtitle={heroSubtitle} />
    <EmbedTool initialUrl={exampleUrl} />
    <HowItWorksSection heading={howItWorksHeading} steps={howItWorksSteps} />
    <ExplanationSection heading={explanationHeading} reasons={reasons} />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          {name} Embed{' '}
          <span
            css={{
              display: 'block',
              color,
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
      features={features}
    />
    <RelatedLinksSection links={relatedLinks} />
    <FaqSection questions={faq} />
  </Layout>
)
