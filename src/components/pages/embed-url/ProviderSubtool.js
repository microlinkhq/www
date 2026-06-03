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
import { EmbedTool } from 'components/pages/embed-url'
import WhyChoose from './WhyChoose'

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

const FaqSection = ({ questions }) => (
  <Faq
    title='FAQ'
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [5, 5, 6, 6],
      pb: 4
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

// Breadcrumb trail (Home › Tools › Embed URL › Provider) shared by every
// embed-url subtool page so the BreadcrumbList schema stays consistent.
export const embedBreadcrumb = ({ name, slug }) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://microlink.io'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Tools',
      item: 'https://microlink.io/tools'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Embed URL',
      item: 'https://microlink.io/tools/embed-url'
    },
    {
      '@type': 'ListItem',
      position: 4,
      name,
      item: `https://microlink.io/tools/embed-url/${slug}`
    }
  ]
})

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
        image: 'https://cdn.microlink.io/banner/sdk.jpeg',
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
        mainEntity: faq.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer }
        }))
      },
      embedBreadcrumb({ name: name || metaTitle.split(' — ')[0], slug })
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
  faq
}) => (
  <Layout>
    <Hero title={heroTitle} subtitle={heroSubtitle} />
    <EmbedTool initialUrl={exampleUrl} />
    <HowItWorksSection heading={howItWorksHeading} steps={howItWorksSteps} />
    <WhyChoose
      heading={explanationHeading}
      reasons={reasons}
      accentColor={color}
    />
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
    <FaqSection questions={faq} />
  </Layout>
)
