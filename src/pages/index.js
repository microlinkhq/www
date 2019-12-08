import { useDemoLinks, usePrinciples, useSiteMetadata } from 'components/hook'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import {
  Box,
  Container as ContainerBase,
  Flex,
  Link,
  Subhead,
  Text,
  Card
} from 'components/elements'

import { Headline, Layout, PricingTable } from 'components/patterns'

import { Meta, Hero, Screenshots } from 'components/pages/home'

import { layout, borders, colors } from 'theme'

const Questions = () => {
  const title = 'Questions'
  const caption = 'Frequently asked questions.'

  return (
    <Container
      id='faq'
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    >
      <Headline title={title} caption={caption} />
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
            <Text color='black60'>
              Absolutely, we offer a free plan you can use indefinitely. The
              free plan offers almost the same pro capabilities.
            </Text>
            <Text pt={3} color='black60'>
              The only limitation is that the service is under IP Address
              limitation to avoid flooding the service. As soon as you need
              more, you can jump in a pro plan.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How different is the free plan compared with pro?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
            </Text>
            <Text pt={3} color='black60'>
              Also, the free plan runs under IP Address limitation, while any
              pro plan has an API token associated for identifying where the
              requests come from.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            What if I don't know how much API quota I need?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              No problem, just start with the smallest plan; in the moment you
              need more, you can upgrade your plan.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How do I get an API key?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              After your payment, we send you the API key associated with the
              email you signed up.
            </Text>
            <Text pt={3} color='black60'>
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
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Do you have a Service-Level Agreements (SLA)?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Some functionalities are only available under pro plans because
              they represent an infrastructure cost that you are paying with the
              pro plan.
            </Text>
            <Text pt={3} color='black60'>
              You can see our SLA level on{' '}
              <Link display='inline' href='/status' children='status' />
              {' page.'}
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How do I know my plan usage?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              We notify you in an automatic way when you reach 50% or more of
              your usage plan, offering to upgrade your current plan to one more
              suitable based on your plan usage.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            What if I want to change my plan?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
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
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            How is the payment being processed?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              We use Stripe to process your payment. It's the same payment
              provider used in products such as Twitter, Pinterest, and Lyft. We
              do not handle your credit card information directly.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I update my card details?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
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
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Can I cancel my subscription?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
              Yes, by sending an email to{' '}
              <Link
                display='inline'
                href='mailto:hello@microlink.io'
                children='hello@microlink.io'
              />
              . Your request will be processed within 24hrs.
            </Text>
          </Text>
          <Subhead
            textAlign='left'
            pt={4}
            pb={[2, 3]}
            fontSize={[2, 3]}
            color='black90'
          >
            Other questions?
          </Subhead>
          <Text maxWidth='38em'>
            <Text color='black60'>
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

const Pricing = ({ siteUrl, apiKey, stripeKey, apiEndpoint }) => {
  const title = 'Pricing'
  const caption = 'Growing with your business.'

  return (
    <Container id='pricing' maxWidth={layout.medium}>
      <Headline pb={[0, 4]} title={title} caption={caption} />
      <PricingTable
        siteUrl={siteUrl}
        apiKey={apiKey}
        stripeKey={stripeKey}
        apiEndpoint={apiEndpoint}
      />
    </Container>
  )
}

// TODO: REMOVE
const Container = ({
  children,
  maxWidth,
  component: Component = Box,
  ...props
}) => (
  <Component as='article' pt={4} pb={4} {...props}>
    <ContainerBase children={children} maxWidth={maxWidth} />
  </Component>
)

const slide = keyframes`
from {
  transform: translate3d(0, 0, 0);
}
to {
  transform: translate3d(-50%, 0, 0);
}
`

const Dots = styled(Flex)`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 100%;
    z-index: -1;

    background-image: radial-gradient(#d7d7d7 1px, transparent 0),
      radial-gradient(#d7d7d7 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;

    animation: ${slide} 100s linear infinite;
    animation-direction: reverse;
  }
`

const Explore = () => {
  const ratio = [0.7, 0.7, 0.7, 0.7]
  return (
    <Dots as='article' id='explore'>
      <Flex
        px={4}
        pt={4}
        pb={4}
        width='100%'
        id='explore'
        flexDirection='column'
        borderTop={`${borders[1]} ${colors.gray1}`}
        borderBottom={`${borders[1]} ${colors.gray1}`}
        justifyContent='center'
        alignItems='center'
      >
        <Flex
          pt={4}
          pb={4}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Headline
            pb={[0, 4]}
            title='Explore'
            caption='discover all the things you can do'
          />
          <Flex>
            <Card ratio={ratio} p={4}>
              PDF
            </Card>
            <Card ratio={ratio} p={4} mx={4}>
              Palette
            </Card>
            <Card ratio={ratio} p={4}>
              HTML
            </Card>
          </Flex>
          <Flex pt={4}>
            <Card ratio={ratio} p={4}>
              Metrics
            </Card>
            <Card ratio={ratio} p={4} mx={4}>
              Screenshot
            </Card>
            <Card ratio={ratio} p={4}>
              Meta
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Dots>
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
      <Screenshots bg='pinky' />
      <Meta demoLinks={demoLinks} />
      {/* <Explore />
      <Pricing
        siteUrl={siteUrl}
        apiKey={paymentApiKey}
        stripeKey={stripeKey}
        apiEndpoint={paymentEndpoint}
      />
      <Questions /> */}
    </Layout>
  )
}

export default Index
