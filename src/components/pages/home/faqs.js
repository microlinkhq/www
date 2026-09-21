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
            Yes. The free plan gives you 25 requests a day on every product
            except Search, with no API key and no credit card. Just call the{' '}
            <Link href='/docs/api/basics/endpoint'>free endpoint</Link>.
          </div>
          <div>
            It has limits to prevent abuse: burst rate, concurrency, and the
            daily quota. Enough for small projects and low-volume usage.
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
            The free tier works out of the box for every product except Search;
            add an API key for Search or when you need volume.
          </div>
        </>
      )
    },
    {
      question: 'What’s the difference between the free and paid plans?',
      answer: (
        <>
          <div>
            Pro is built for production: higher quota, better performance, and
            features such as{' '}
            <Link href='/docs/api/parameters/headers'>headers</Link>,{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>, or{' '}
            <Link href='/docs/api/parameters/proxy'>proxy</Link>, plus access to
            Search.
          </div>
          <div>
            It comes with an API key and a monthly quota. Not sure how much you
            need? Start with the smallest Pro tier and upgrade the moment you
            need more.
          </div>
        </>
      )
    },
    {
      question: 'How do I get an API key?',
      answer: (
        <>
          <div>
            Once you buy a plan you get access to{' '}
            <Link href='https://dashboard.microlink.io'>
              dashboard.microlink.io
            </Link>
            , where you will find your API key.
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
          <Link href='https://dashboard.microlink.io'>
            dashboard.microlink.io
          </Link>
          , no questions asked. We also notify you when you reach 80% of your
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
