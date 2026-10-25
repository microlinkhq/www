import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ACCENT,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  Figure,
  FigureImage,
  FlowDiagram,
  MoreCustomers,
  Section,
  SectionInner,
  Testimonial,
  WhyCard
} from 'components/patterns/CustomerStory'
import Layout from 'components/patterns/Layout'

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/clients/techtailors-icon.png'
          alt=''
          width='40'
          height='40'
          css={theme({
            display: 'block',
            borderRadius: 2,
            width: '40px',
            height: '40px'
          })}
          style={{ objectFit: 'cover' }}
          decoding='async'
        />
        <Text
          css={theme({
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1
          })}
        >
          TechTailors
        </Text>
      </Flex>
      <Heading
        variant={null}
        css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
      >
        Link Previews That Boost Engagement on Agency-Built Sites
      </Heading>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        How a web agency that hand-codes sites on Astro and Cloudflare adds link
        previews to its own site and to the client sites it designs, with
        Microlink serving the preview behind every link.
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/link-preview'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          See how to integrate link previews
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

const AboutCustomer = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/clients/techtailors-web.jpg'
          alt='TechTailors website'
          width='1200'
          height='818'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        About TechTailors
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        A small web agency building fast, accessible, SEO-ready websites on
        Astro and Cloudflare.
      </Subhead>
      <Text as='p' css={theme({ pb: 4 })}>
        TechTailors is a Chattanooga-based web agency that hand-codes websites
        for businesses that take their website seriously, from launch-ready
        landing pages to enterprise-grade platforms. Every build runs on Astro
        and Cloudflare, ships on accounts in the client's name, and comes with
        transparent monthly pricing, unlimited edits, and lifetime maintenance.
      </Text>
      <Text as='p'>
        The team is intentionally small: clients know everyone by name, and
        founder Mac Goldman brings a decade across marketing analysis, data, and
        software engineering to every project. Alongside design and development,
        TechTailors offers SEO, analytics, blogging, brand design, CRO testing,
        and custom integrations, so the sites it ships keep working long after
        launch.
      </Text>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://gettechtailored.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit gettechtailored.com
        </Text>
      </Box>
      <Testimonial
        accent={ACCENT}
        maxWidth={layout.normal}
        quote="Microlink's link preview service is extremely helpful for boosting client engagement on our site and other client sites we design for. It's a subtle, but very engaging and great feature."
        author='Mac Goldman'
        role='Founder & CEO'
        company='TechTailors'
        initials='MG'
        avatar='/images/clients/mac-goldman.jpeg'
      />
    </SectionInner>
  </Section>
)

const HowTheyUseIt = () => (
  <Section css={theme({ pb: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How they use Microlink
      </Eyebrow>
      <Subhead css={theme({ textAlign: 'left' })}>
        One link preview service behind the agency site and its client builds
      </Subhead>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        When a TechTailors site links out, Microlink turns the plain URL into a
        preview with the destination's title, description, and image. The agency
        runs it on gettechtailored.com and on the client sites it designs, so a
        link reads as a card a visitor wants to open rather than a bare line of
        text.
      </Text>
      <FlowDiagram
        accent={ACCENT}
        nodes={[
          { label: 'Link on the page', sub: 'Agency or client site' },
          { label: 'Microlink', sub: 'Link preview fetched', active: true },
          { label: 'Preview card', sub: 'Title, description, image' },
          { label: 'Visitor clicks through', sub: 'More engagement' }
        ]}
      />
      <Text as='p'>
        The same Microlink service covers the agency's own site and every client
        site it designs, so a preview looks and behaves the same from one build
        to the next. In Mac Goldman's words, it is a subtle feature, but a very
        engaging one.
      </Text>
    </SectionInner>
  </Section>
)

const WhyMicrolink = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why Microlink
        </Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>
          A link preview API an agency can reuse on every build
        </Subhead>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          An agency that ships many sites needs features that work the same on
          each one without adding maintenance. TechTailors reached for Microlink
          for three reasons.
        </Text>
      </Box>

      <Flex
        css={theme({
          gap: 3,
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <WhyCard
          accent={ACCENT}
          number={1}
          kicker='Engagement'
          title='A link that reads as a card gets opened.'
          body='A bare URL gives a visitor nothing to go on. A preview with the page title, description, and image tells them what is on the other side, and that is the engagement lift the TechTailors team saw on its own site and on the client sites it designs.'
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='Reusable across clients'
          title='One integration, every site the agency ships.'
          body='TechTailors builds on Astro and Cloudflare and manages every site it launches. Microlink is a plain HTTPS call that returns normalized metadata for any URL, so the same preview works on the agency site and on each client build without a scraper or a rendering pipeline per project.'
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Hands-off operations'
          title='Previews that keep working after launch.'
          body='Every TechTailors plan includes lifetime maintenance, so a feature that needs babysitting costs the agency. Microlink handles the moving parts behind a preview, from JS-heavy pages to broken Open Graph tags, and returns a clean result the site can render.'
        />
      </Flex>
    </SectionInner>
  </Section>
)

const ThanksLogo = styled('img')`
  ${theme({
    display: 'block',
    width: 'auto',
    height: '32px',
    mx: 'auto'
  })}
`

const ThanksSection = () => (
  <Section css={theme({ pt: 0, pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center', maxWidth: layout.small })}>
      <Box css={theme({ pt: [3, 3, 4, 4], pb: [2, 2, 3, 3] })}>
        <Text
          as='a'
          href='https://gettechtailored.com'
          target='_blank'
          rel='noopener'
        >
          <ThanksLogo
            src='/images/clients/gettechtailored.com.svg'
            alt='TechTailors'
            width='256'
            height='32'
            loading='lazy'
            decoding='async'
          />
        </Text>
      </Box>
      <Text
        as='p'
        css={theme({
          color: 'black70',
          fontSize: [0, 1],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        <b>Thank you to the TechTailors team</b> for letting us share their use
        case, and for choosing Microlink to power link previews across their
        site and client builds.
      </Text>
    </SectionInner>
  </Section>
)

const CustomerStoryPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <AboutCustomer />
      <HowTheyUseIt />
      <WhyMicrolink />
      <CtaSection
        accent={ACCENT}
        headlinePrefix='Ready to add link'
        headlineAccent='previews'
        body='Turn any URL into a preview card with one HTTPS call: title, description, image, logo, and brand palette, rendered in your own markup, the way TechTailors does across its client sites.'
        href='/link-preview'
        label='Start building link previews'
      />
      <MoreCustomers accent={ACCENT} currentSlug='techtailors' />
      <ThanksSection />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='TechTailors: link previews on agency-built client sites'
    description="TechTailors uses Microlink's link preview service on its own site and the client sites it designs, turning plain links into engaging preview cards."
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
