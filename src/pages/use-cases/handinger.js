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
          src='/images/clients/handinger-icon.png'
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
          Handinger
        </Text>
      </Flex>
      <Heading
        variant={null}
        css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
      >
        Real-Time Google Search for AI Agents
      </Heading>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        How an AI-agent platform gives every agent live access to the web — with
        Microlink answering the Google searches, Maps lookups, and more behind
        each task.
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='/search'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          See how to integrate Google search
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
          src='/images/clients/handinger-web.png'
          alt='Handinger platform'
          width='1200'
          height='750'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        About Handinger
      </Eyebrow>
      <Subhead css={theme({ pb: [3, 3, 4, 4], textAlign: 'left' })}>
        AI agents for your company, built from plain-English instructions.
      </Subhead>
      <Text as='p' css={theme({ pb: 4 })}>
        Handinger lets teams build AI agents the way they'd brief a new hire:
        describe the job in plain English, connect the tools the team already
        uses, and let the agent run. Sales, marketing, and finance teams use it
        to automate the work they repeat every day — prospect research, lead
        enrichment, competitor monitoring, document extraction.
      </Text>
      <Text as='p'>
        Every agent ships with a practical toolbox: web search, web fetch,
        browser automation, file handling, image processing, email, and a
        scheduler for recurring runs. All of it is wrapped in a playful
        dog-themed personality — you brief a loyal pixel-art pup, and it goes
        and fetches.
      </Text>
      <Box css={theme({ pt: 2, pb: [3, 3, 4, 4] })}>
        <Text
          as='a'
          href='https://handinger.com'
          target='_blank'
          rel='noopener'
          css={theme({
            color: ACCENT.text,
            fontWeight: 'bold',
            fontSize: [1, 2, 2, 2],
            textDecoration: 'underline'
          })}
        >
          Visit handinger.com
        </Text>
      </Box>
      <Testimonial
        accent={ACCENT}
        maxWidth={layout.normal}
        quote='We are using Microlink to power Handinger agents. Thanks to Microlink, our agents can search the web, use Google Maps, and more.'
        author='Pao Ramen'
        role='Founder'
        company='Handinger'
        initials='PR'
        avatar='/images/clients/pao-ramen.jpeg'
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
        Live Google results behind every agent task
      </Subhead>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        When a Handinger agent needs the web — searching for competitors,
        checking a business on Google Maps, pulling fresh results for a research
        task — it calls Microlink under the hood. Microlink's Google Search API
        turns those queries into structured, LLM-ready JSON, so the agent gets
        back data it can reason over instead of raw HTML it has to fight with.
      </Text>
      <FlowDiagram
        accent={ACCENT}
        nodes={[
          { label: 'Task in plain English', sub: 'User briefs the agent' },
          { label: 'Handinger agent', sub: 'Picks its web tools' },
          { label: 'Microlink', sub: 'Google search + Maps', active: true },
          { label: 'Structured results', sub: 'Agent reasons and replies' }
        ]}
      />
      <Text as='p'>
        The screenshot below shows a real run: asked to find competitors, the
        agent loads its web-tasks skill, reads a landing page, and fires
        targeted searches through Microlink — then turns the results into a
        comparison its user can act on. And search is one surface among many:
        the same API covers news, images, Maps, shopping, and more, so the
        agents' reach grows without Handinger adding a single scraper.
      </Text>
      <Figure>
        <FigureImage
          src='/images/clients/handinger-preview.png'
          alt='Handinger agent using Microlink'
          width='1294'
          height='1164'
          loading='lazy'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
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
          Search infrastructure that agents can trust
        </Subhead>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          Giving autonomous agents live access to Google is a hard
          infrastructure problem — rendering, rate limits, parsing. Handinger
          reached for Microlink for three reasons.
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
          kicker='LLM-ready results'
          title='Structured JSON an agent can reason over.'
          body="Agents don't want raw HTML — they want clean, structured data they can drop straight into context. Microlink returns normalized JSON for every query, so a Handinger agent goes from search to answer without a parsing layer in between."
        />
        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='One API, many surfaces'
          title='Search, Maps, news, images — one client.'
          body="An agent's next task is unpredictable: today it's a competitor search, tomorrow it's checking businesses on Google Maps. Microlink covers ten Google surfaces through one client with the same request shape, so every new agent capability is a parameter change, not a new integration."
        />
        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='Hands-off operations'
          title='No scraping pipeline to babysit.'
          body='Google changes constantly, and keeping scrapers alive is a full-time job. Microlink absorbs the moving parts — rendering, proxies, retries — so the Handinger team spends its time on agents, not on keeping search infrastructure running.'
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
          href='https://handinger.com'
          target='_blank'
          rel='noopener'
        >
          <ThanksLogo
            src='/images/clients/handinger.com.png'
            alt='Handinger'
            width='178'
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
        <b>Thank you to the Handinger team</b> for letting us share their use
        case, and for choosing Microlink to power web search across their
        agents.
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
        headlinePrefix='Ready to give your agents'
        headlineAccent='Google search'
        body="Scrape Google search, Maps, news, and more through one unified API — structured, LLM-ready results your product can act on, the way Handinger's agents do."
        href='/search'
        label='Start scraping Google'
      />
      <MoreCustomers accent={ACCENT} currentSlug='handinger' />
      <ThanksSection />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Handinger: real-time Google search for AI agents'
    description="Handinger's AI agents search the web and use Google Maps through Microlink's Google Search API — live, structured results powering every agent task."
    schemaType='WebPage'
  />
)

export default CustomerStoryPage
