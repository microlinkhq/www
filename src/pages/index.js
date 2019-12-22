import { useDemoLinks, usePrinciples, useSiteMetadata } from 'components/hook'
import { Box, Container, Flex, Link, Subhead, Text } from 'components/elements'
import { Headline, Layout, PricingTable } from 'components/patterns'
import { Meta, Hero, Screenshots } from 'components/pages/home'
import { layout, colors, borders } from 'theme'
import React from 'react'

const Questions = props => {
  const title = 'FAQ'
  const caption = 'Frequently asked questions.'

  return (
    <Container id='faq' {...props}>
      <Headline pt={[0, 0, 4, 4]} title={title} caption={caption} />
      <Flex
        as='section'
        pt={[3, 4]}
        justifyContent='center'
        flexDirection='column'
        alignItems='center'
        px={[0, 0, 4, 6]}
      >
        <Box>
          <Subhead
            textAlign='left'
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I use microlink for free?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              Absolutely, we offer a free{' '}
              <Link href='/docs/api/basics/endpoint'>endpoint</Link> plan that
              you can use indefinitely.
            </Text>
            <Text pt={3} color='black80'>
              The only limitation is that the service is under IP Address
              limitation to avoid flooding the service. As soon as you need
              more, you can jump into the pro plan.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            How different is the free plan compared with pro?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
            </Text>
            <Text pt={3} color='black80'>
              Also, the free plan runs under IP Address limitation, while any
              pro plan has an API token associated for identifying where the
              requests come from.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            What if I don't know how much API quota I need?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              No problem, just start with the smallest plan; in the moment you
              need more, you can upgrade your plan.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            How do I get an API key?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              After your payment, we send you the API key associated with the
              email you signed up.
            </Text>
            <Text pt={3} color='black80'>
              The API key need to be attached to all your requests:
              <Box as='ul' pt={3} my={0}>
                <Box as='li'>
                  At <Link href='/docs/sdk/'>Microlink SDK</Link>, attach it as{' '}
                  <Link href='/docs/sdk/parameters/api-key/'>apiKey</Link>.
                </Box>
                <Box as='li' pt={3}>
                  At <Link href='/docs/api/#introduction'>Microlink API</Link>,
                  attach it as{' '}
                  <Link href='/docs/api/basics/authentication'>header</Link>.
                </Box>
              </Box>
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            Do you have a Service-Level Agreements (SLA)?
          </Subhead>
          <Text maxWidth='38em'>
            <Text pt={3} color='black80'>
              You can see our SLA level on{' '}
              <Link display='inline' href='/status' children='status' />
              {' page.'}
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            How do I know my plan usage?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              We notify you in an automatic way when you reach 50% or more of
              your usage plan, offering to upgrade your current plan to one more
              suitable based on your plan usage.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            What if I want to change my plan?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              You can upgrade, downgrade, or cancel your monthly account at any
              time with no further obligation, sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              with the email you signed up.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            How is the payment being processed?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              We use Stripe to process your payment. It's the same payment
              provider used in products such as Twitter, Pinterest, and Lyft. We
              do not handle your credit card information directly.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            Can I update my card details?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              Yes, send an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />{' '}
              requesting the change. You will receive a link from where you'll
              be able to securely update your details.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            Can I cancel my subscription?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black80'>
              Yes, by sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              . Your request will be processed within 24hrs.
            </Text>
          </Text>
          <Subhead textAlign='left' pt={4} pb={[2, 3]} fontSize={[2, 3]}>
            Other questions?
          </Subhead>
          <Text pb={[0, 0, 4, 4]} maxWidth='38em'>
            <Text color='black80'>
              We're always available at{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              .
            </Text>
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

const Pricing = ({ siteUrl, apiKey, stripeKey, apiEndpoint, ...props }) => {
  const title = 'Pricing'
  const caption = 'Growing with your business.'

  return (
    <Container id='pricing' maxWidth={layout.medium} {...props}>
      <Headline pt={[0, 0, 4, 4]} title={title} caption={caption} />
      <PricingTable
        siteUrl={siteUrl}
        apiKey={apiKey}
        stripeKey={stripeKey}
        apiEndpoint={apiEndpoint}
        pb={[0, 0, 4, 4]}
      />
    </Container>
  )
}

function Index () {
  const demoLinks = useDemoLinks()

  const {
    siteUrl,
    paymentApiKey,
    stripeKey,
    paymentEndpoint,
    headline
  } = useSiteMetadata()

  return (
    <Layout>
      <Hero title={headline} features={usePrinciples()} />
      <Screenshots
        bg='pinky'
        borderTop={`${borders[1]} ${colors.pinkest}`}
        borderBottom={`${borders[1]} ${colors.pinkest}`}
      />
      <Meta demoLinks={demoLinks} />
      {/* <Explore
        borderTop={`${borders[1]} ${colors.pinkest}`}
        borderBottom={`${borders[1]} ${colors.pinkest}`}
      /> */}
      <Pricing
        siteUrl={siteUrl}
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Questions
        bg='pinky'
        borderTop={`${borders[1]} ${colors.pinkest}`}
        borderBottom={`${borders[1]} ${colors.pinkest}`}
      />
    </Layout>
  )
}

export default Index
