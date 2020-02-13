import { useDemoLinks, usePrinciples, useSiteMetadata } from 'components/hook'
import { Faq, Headline, Layout, PricingTable } from 'components/patterns'
import { Meta, Hero, Screenshots } from 'components/pages/home'
import { Box, Container, Link } from 'components/elements'
import { layout, colors, borders } from 'theme'
import { cdnUrl } from 'helpers'
import React from 'react'

const Questions = props => (
  <Faq
    title='FAQ'
    caption='Frequently asked questions.'
    questions={[
      {
        question: 'Can I use microlink for free?',
        answer: [
          <>
            Absolutely, we offer a free{' '}
            <Link href='/docs/api/basics/endpoint'>endpoint</Link> plan that you
            can use indefinitely.
          </>,
          <>
            The only limitation is that the service is under IP Address
            limitation to avoid flooding the service. As soon as you need more,
            you can jump into the pro plan.
          </>
        ]
      },
      {
        question: 'How different is the free plan compared with pro?',
        answer: [
          <>
            Some functionalities are only available under pro plans because they
            represent an infrastructure cost that you are paying with the pro
            plan.
          </>,
          <>
            Also, the free plan runs under IP Address limitation, while any pro
            plan has an API token associated for identifying where the requests
            come from.
          </>
        ]
      },
      {
        question: "What if I don't know how much API quota I need?",
        answer: [
          <>
            No problem, just start with the smallest plan; in the moment you
            need more, you can upgrade your plan.
          </>
        ]
      },
      {
        question: 'How do I get an API key?',
        answer: [
          <>
            After your payment, we send you the API key associated with the
            email you signed up.
          </>,
          <>
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
          </>
        ]
      },
      {
        question: 'Do you have a Service-Level Agreements (SLA)?',
        answer: [
          <>
            You can see our SLA level on{' '}
            <Link display='inline' href='/status' children='status' />
            {' page.'}
          </>
        ]
      },
      {
        question: 'How do I know my plan usage?',
        answer: [
          <>
            We notify you in an automatic way when you reach 50% or more of your
            usage plan, offering to upgrade your current plan to one more
            suitable based on your plan usage.
          </>
        ]
      },
      {
        question: 'What if I want to change my plan?',
        answer: [
          <>
            You can upgrade, downgrade, or cancel your monthly account at any
            time with no further obligation, sending an email to{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />{' '}
            with the email you signed up.
          </>
        ]
      },
      {
        question: 'How is the payment being processed?',
        answer: [
          <>
            We use Stripe to process your payment. It's the same payment
            provider used in products such as Twitter, Pinterest, and Lyft. We
            do not handle your credit card information directly.
          </>
        ]
      },
      {
        question: 'Can I update my card details?',
        answer: [
          <>
            Yes, send an email to{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />{' '}
            requesting the change. You will receive a link from where you'll be
            able to securely update your details.
          </>
        ]
      },
      {
        question: 'Can I cancel my subscription?',
        answer: [
          <>
            Yes, by sending an email to{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />
            . Your request will be processed within 24hrs.
          </>
        ]
      },
      {
        question: 'Other questions?',
        answer: [
          <>
            We're always available at{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />
            .
          </>
        ]
      }
    ]}
    {...props}
  />
)

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
    <Layout image={cdnUrl('www/home.png')}>
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
