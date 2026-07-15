import Email from 'components/elements/Email'
import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Faq from 'components/patterns/Faq/Faq'
import React from 'react'
import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import { CAPACITY_REQUESTS_PER_MONTH } from 'components/pages/home/catalog'

let questions

export const getFaqQuestions = () => {
  if (questions) return questions
  questions = [
    {
      question: 'Can I use Microlink for free?',
      answer: (
        <>
          <div>
            Absolutely. We have a forever free{' '}
            <Link href='/docs/api/basics/endpoint'>endpoint</Link> you can use.
            It’s the best way to start using the service.
          </div>
          <div>
            The free plan has limits to prevent abuse: burst rate, concurrency,
            and a daily quota.
          </div>
          <div>It should be enough for small projects or a low API quota.</div>
        </>
      )
    },
    {
      question: 'What’s the difference between the free and paid plans?',
      answer: (
        <>
          <div>
            The paid plan is built for scale, with better performance and
            unlocked features such as{' '}
            <Link href='/docs/api/parameters/headers'>headers</Link>,{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link> or{' '}
            <Link href='/docs/api/parameters/proxy'>proxy</Link>.
          </div>
          <div>
            It comes with an associated API key and configurable quota. You only
            pay for what you need.
          </div>
        </>
      )
    },
    {
      question: "What if I don't know how much API quota I need?",
      answer: (
        <div>
          No problem, just start with the smallest pro plan, and at the moment
          you need more, you can upgrade your plan.
        </div>
      )
    },
    {
      question: 'How do I get an API key?',
      answer: (
        <>
          <div>
            After your payment, we send you the API key associated with the
            email you signed up with.
          </div>
          <div>
            The API key needs to be attached to all your requests:
            <Box as='ul' css={theme({ pt: 3, my: 0 })}>
              <Box as='li'>
                In{' '}
                <Link href='/docs/sdk/getting-started/overview'>
                  Microlink SDK
                </Link>
                , attach it as{' '}
                <Link href='/docs/sdk/parameters/api-key/'>apiKey</Link>.
              </Box>
              <Box as='li' css={theme({ pt: 3 })}>
                In{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                , attach it as a{' '}
                <Link href='/docs/api/basics/authentication'>header</Link>.
              </Box>
            </Box>
          </div>
        </>
      )
    },
    {
      question: 'Can Microlink handle my traffic?',
      answer: (
        <>
          <div>
            Yes. The platform is built for production workloads and the bursty
            traffic agents generate: retries, loops, and parallel fan-outs.
            We&rsquo;ve supported enterprise deployments processing up to{' '}
            {CAPACITY_REQUESTS_PER_MONTH} requests per month, with sustained
            daily traffic of more than 6 million requests.
          </div>
          <div>
            No need to warn us before a spike or throttle on your side; your
            quota is the only limit.
          </div>
        </>
      )
    },
    {
      question: "What's your SLA level?",
      answer: (
        <div>
          Our Service-Level Agreements commitment is 99.9% (three nines). You
          can see the live <Link href='/status'>status</Link> of the service.
        </div>
      )
    },
    {
      question: 'How do I know my plan usage?',
      answer: (
        <div>
          We notify you automatically when you reach 80% or more of your usage
          plan, offering to upgrade your plan to one more suitable based on your
          plan usage.
        </div>
      )
    },
    {
      question: 'What if I want to change my plan?',
      answer: (
        <div>
          You can upgrade, downgrade, or cancel your plan at any time with no
          further obligation from{' '}
          <Link href='https://dashboard.microlink.io'>
            dashboard.microlink.io
          </Link>
          .
        </div>
      )
    },
    {
      question: 'How is the payment processed?',
      answer: (
        <div>
          We use Stripe to process your payment, the same payment provider
          behind companies like Amazon, Shopify, and Zoom. We never see your
          credit card information.
        </div>
      )
    },
    {
      question: 'Can I update my card details?',
      answer: (
        <div>
          Yes, send an email to{' '}
          <Link href='mailto:hello@microlink.io'>
            <Email>hello@microlink.io</Email>
          </Link>{' '}
          requesting the change. You will receive a link where you&apos;ll be
          able to securely update your details.
        </div>
      )
    },
    {
      question: 'Can I cancel my subscription?',
      answer: (
        <div>
          Yes, at any time from{' '}
          <Link href='https://dashboard.microlink.io'>
            dashboard.microlink.io
          </Link>
          , no questions asked.
        </div>
      )
    },
    {
      question: 'Other questions?',
      answer: (
        <div>
          We’re always available at{' '}
          <Link href='mailto:hello@microlink.io'>
            <Email>hello@microlink.io</Email>
          </Link>
          .
        </div>
      )
    }
  ]
  return questions
}

const FAQs = props => (
  <Faq
    css={theme({ py: SECTION_VERTICAL_SPACING })}
    title='FAQs'
    caption='Frequently asked questions.'
    questions={getFaqQuestions()}
    {...props}
  />
)

export default FAQs
