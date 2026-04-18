import React from 'react'

import { Link } from 'components/elements/Link'
import Faq from 'components/patterns/Faq/Faq'
import { theme } from 'theme'

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const Faqs = props => (
  <Faq
    title='Pricing FAQs'
    caption='Everything you need to know before you pick a plan.'
    titleSize={['28px', '34px', '42px', '46px']}
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4]
    })}
    questions={[
      {
        question: 'Is there really a free plan?',
        answer: (
          <>
            <div>
              Yes — the free plan is forever free, no credit card required. You
              get 50 requests per day against the public{' '}
              <Link href='/docs/api/basics/endpoint'>endpoint</Link>, with the
              same screenshot, PDF, metadata, SDK, insights and recipes
              capabilities used on Pro.
            </div>
            <div>
              It runs with rate limits and shared concurrency, so it&apos;s
              ideal for prototypes, side-projects and evaluation. When you
              outgrow it, upgrade in a click.
            </div>
          </>
        )
      },
      {
        question: 'What counts as a request?',
        answer: (
          <>
            <div>
              One request is one API call to a Microlink endpoint — screenshot,
              PDF, metadata, insights, or any other. Cached responses count too,
              but they&apos;re served from our edge in milliseconds and
              don&apos;t exhaust your concurrency.
            </div>
          </>
        )
      },
      {
        question: 'What happens if I exceed my quota?',
        answer: (
          <>
            <div>
              You&apos;re never billed by surprise. We notify you at 80% usage
              so you can upgrade before hitting the ceiling. If you do reach
              100%, requests are paused until the next billing cycle or until
              you upgrade — no overage fees.
            </div>
          </>
        )
      },
      {
        question: 'Can I change plan at any time?',
        answer: (
          <>
            <div>
              Yes. Upgrades take effect immediately and are pro-rated;
              downgrades apply at the start of the next billing cycle. Just
              email{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
              from the address you signed up with.
            </div>
          </>
        )
      },
      {
        question: 'Can I cancel anytime?',
        answer: (
          <>
            <div>
              Yes — no contracts, no commitments. Cancel by sending an email to{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
              and we&apos;ll process it within 24 hours. You keep access through
              the end of your paid period.
            </div>
          </>
        )
      },
      {
        question: 'Do you offer annual billing or volume discounts?',
        answer: (
          <>
            <div>
              Annual contracts and custom volume discounts are available on
              Enterprise. Contact{' '}
              <Link href='mailto:hello@microlink.io?subject=Annual%20billing'>
                hello@microlink.io
              </Link>{' '}
              with your expected volume and we&apos;ll send a quote.
            </div>
          </>
        )
      },
      {
        question: 'How is payment processed?',
        answer: (
          <>
            <div>
              Payments are handled by Stripe — the same provider trusted by
              Twitter, Pinterest, and Lyft. We never see or store your card
              details. Invoices are emailed automatically each cycle.
            </div>
          </>
        )
      },
      {
        question: 'Do you offer refunds?',
        answer: (
          <>
            <div>
              If something goes wrong on our side, we&apos;ll make it right —
              including refunds. Reach out at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
              and we&apos;ll review your case personally.
            </div>
          </>
        )
      },
      {
        question: "What's your SLA?",
        answer: (
          <>
            <div>
              We commit to 99.9% uptime (three nines) on paid plans. You can
              monitor live availability and incident history on our{' '}
              <Link href='/status'>status page</Link>.
            </div>
          </>
        )
      },
      {
        question: 'When do I need Enterprise?',
        answer: (
          <>
            <div>
              Enterprise makes sense when you need any of: dedicated
              infrastructure, custom API endpoints, S3-compatible storage,
              custom SLAs, a signed DPA, or pricing for very high volumes
              (millions of requests / month).
            </div>
            <div>
              See the <Link href='/enterprise'>Enterprise page</Link> for
              details, or email{' '}
              <Link href='mailto:hello@microlink.io?subject=Microlink%20Enterprise'>
                hello@microlink.io
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'How do I get an API key?',
        answer: (
          <>
            <div>
              After payment we send the API key to the email you signed up with.
              Use it as a header in the{' '}
              <Link href='/docs/api/getting-started/overview'>API</Link> or as
              the <Link href='/docs/sdk/parameters/api-key/'>apiKey</Link>{' '}
              option in the{' '}
              <Link href='/docs/sdk/getting-started/overview'>SDK</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Other questions?',
        answer: (
          <>
            <div>
              We&apos;re a real team and we read every email. Reach us at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link> —
              we usually reply within a few hours.
            </div>
          </>
        )
      }
    ]}
    {...props}
  />
)

export default Faqs
