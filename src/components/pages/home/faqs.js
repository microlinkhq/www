import Email from 'components/elements/Email'
import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import { DashboardLink, SignupLink } from 'components/patterns/SignupLink'
import Faq from 'components/patterns/Faq/Faq'
import React from 'react'
import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import { CAPACITY_REQUESTS_PER_MONTH } from 'components/pages/home/catalog'

let questions

export const getFaqQuestions = () => {
  if (questions) return questions
  questions = [
    {
      question: 'What is Microlink?',
      answer: (
        <>
          <div>
            A single <Link href='/api'>API</Link> that turns any URL into data:
            screenshots, PDFs, markdown, metadata, rendered HTML, search
            results, or the return value of your own browser code.
          </div>
          <div>
            You call an endpoint. We run the browsers, the cache, and the CDN
            behind it, so there is nothing to install or scale on your side.
          </div>
        </>
      )
    },
    {
      question: 'Can I use Microlink for free?',
      answer: (
        <>
          <div>
            Yes. Sign up for a free API key and you get 100&nbsp;requests a
            month on every product, Search included, with every Pro feature and
            no credit card. See the{' '}
            <Link href='/docs/api/basics/endpoint'>endpoint docs</Link>.
          </div>
          <div>
            It has limits to prevent abuse: burst rate, concurrency, and the
            monthly quota. Enough for small projects and low-volume usage.
          </div>
        </>
      )
    },
    {
      question: 'Can my AI agent use Microlink?',
      answer: (
        <>
          <div>
            Yes. Open <Link href='/ai'>Microlink AI</Link> and paste the prompt
            into your agent. It installs the{' '}
            <Link href='/skills/microlink'>Microlink skill</Link>, the entry
            point for screenshots, PDFs, markdown, and the rest of the API.
          </div>
          <div>
            The free API key covers every product, Search included; paid plans
            add volume.
          </div>
        </>
      )
    },
    {
      question: 'What’s the difference between the free and paid plans?',
      answer: (
        <>
          <div>
            Volume. The free API key already includes every feature, such as{' '}
            <Link href='/docs/api/parameters/headers'>headers</Link>,{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>,{' '}
            <Link href='/docs/api/parameters/proxy'>proxy</Link>, and Search.
            Pro is built for production: a higher monthly quota and more
            concurrency on the same key.
          </div>
          <div>
            Not sure how much you need? Start with the smallest Pro tier and
            upgrade the moment you need more.
          </div>
        </>
      )
    },
    {
      question: 'How do I get an API key?',
      answer: (
        <>
          <div>
            Sign up at{' '}
            <SignupLink component={Link} cta='home:faq'>
              dashboard.microlink.io
            </SignupLink>{' '}
            and you get a free API key, no credit card required. Paid plans add
            quota to the same account.
          </div>
          <div>
            Attach it to every request:
            <Box as='ul' css={theme({ pt: 3, my: 0 })}>
              <Box as='li'>
                In the{' '}
                <Link href='/docs/sdk/getting-started/overview'>
                  Microlink SDK
                </Link>
                , as{' '}
                <Link href='/docs/sdk/getting-started/overview/#authentication'>
                  apiKey
                </Link>
                .
              </Box>
              <Box as='li' css={theme({ pt: 3 })}>
                In the{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                , as a{' '}
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
            traffic agents generate: retries, loops, and parallel fan-outs. Our
            record for a single enterprise deployment is{' '}
            {CAPACITY_REQUESTS_PER_MONTH} requests in one month, with more than
            6 million requests a day sustained.
          </div>
          <div>
            No need to warn us before a spike or throttle on your side; your
            quota is the only limit.
          </div>
        </>
      )
    },
    {
      question: 'How fast is it?',
      answer: (
        <>
          <div>
            The first request renders the page in a real browser. Repeat it and
            the result comes back from the edge cache in milliseconds.
          </div>
          <div>
            Cache hits never count toward your quota, and the{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link> parameter controls
            how fresh the response needs to be.
          </div>
        </>
      )
    },
    {
      question: 'What’s your SLA level?',
      answer: (
        <div>
          Our SLA commitment is 99.9% uptime on every paid plan. You can see the
          live <Link href='/status'>status</Link> of the service.
        </div>
      )
    },
    {
      question: 'Can I change or cancel my plan?',
      answer: (
        <div>
          Yes. Upgrade, downgrade, or cancel at any time from{' '}
          <DashboardLink cta='home:faq'>dashboard.microlink.io</DashboardLink>,
          no questions asked. We also notify you when you reach 80% of your
          quota, so you can move up before you hit the limit.
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
    caption='Short answers to what developers ask before their first request.'
    questions={getFaqQuestions()}
    {...props}
  />
)

export default FAQs
