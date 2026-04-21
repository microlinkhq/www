import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import styled, { keyframes } from 'styled-components'
import { Check as CheckIcon, X as XIcon } from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Highlight from 'components/elements/Highlight'
import { Link } from 'components/elements/Link'
import LineBreak from 'components/elements/LineBreak'
import Meta from 'components/elements/Meta/Meta'
import PricePicker, {
  DEFAULT_PLAN,
  PLANS
} from 'components/elements/PricePicker'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Checkout from 'components/patterns/Checkout'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import {
  borders,
  colors,
  gradient,
  layout,
  radii,
  space,
  textGradient,
  theme,
  transition
} from 'theme'

// ─── HOCs ────────────────────────────────────────────────────────────────────

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

// ─── Constants ───────────────────────────────────────────────────────────────

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]
const FREE_PLAN_RATE_LIMIT = 50

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})
const formatCompact = n => COMPACT_NUMBER_FORMATTER.format(n).toLowerCase()

// ─── Currency ────────────────────────────────────────────────────────────────

const EUR_TO_USD = 1.17
const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: EUR_TO_USD,
    label: 'USD',
    word: 'dollars'
  },
  EUR: { code: 'EUR', symbol: '€', rate: 1, label: 'EUR', word: 'euros' }
}
const EUROPE_TZ_PREFIX = 'Europe/'

const convert = (eurAmount, currencyCode) =>
  eurAmount * CURRENCIES[currencyCode].rate

const formatPrice = (eurAmount, currencyCode, { decimals = 0 } = {}) => {
  const value = convert(eurAmount, currencyCode)
  return value.toFixed(decimals)
}

const detectInitialCurrency = () => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    return tz.startsWith(EUROPE_TZ_PREFIX) ? 'EUR' : 'USD'
  } catch (_) {
    return 'USD'
  }
}

const useCurrency = () => {
  const [currency, setCurrencyState] = useState('USD')

  useEffect(() => {
    const next = detectInitialCurrency()
    if (next !== 'USD') setCurrencyState(next)
  }, [])

  const setCurrency = useCallback(next => {
    setCurrencyState(next)
  }, [])

  return [currency, setCurrency]
}

const CurrencyContext = createContext(['USD', () => {}])
const useCurrencyContext = () => useContext(CurrencyContext)

// ─── Head / SEO ──────────────────────────────────────────────────────────────

export const Head = () => {
  const proOffers = PLANS.map(({ id, monthlyPrice, reqsPerMonth }) => ({
    '@type': 'Offer',
    sku: id,
    name: `Pro · ${reqsPerMonth} requests / month`,
    price: monthlyPrice.toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: 'https://microlink.io/pricing',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: monthlyPrice.toFixed(2),
      priceCurrency: 'EUR',
      billingIncrement: 1,
      unitCode: 'MON',
      referenceQuantity: {
        '@type': 'QuantitativeValue',
        value: reqsPerMonth.replace(/,/g, ''),
        unitCode: 'C62'
      }
    }
  }))

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Microlink — Pricing',
    description:
      'Simple, predictable pricing for the Microlink browser API. Start free, scale to millions of requests, with custom Enterprise tiers when you need them.',
    brand: { '@type': 'Brand', name: 'Microlink' },
    image: 'https://cdn.microlink.io/logo/logo.png',
    url: 'https://microlink.io/pricing',
    offers: [
      {
        '@type': 'Offer',
        sku: 'free',
        name: 'Free · 50 requests / day',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://microlink.io/pricing'
      },
      ...proOffers,
      {
        '@type': 'Offer',
        sku: 'enterprise',
        name: 'Enterprise · custom volume',
        price: '500',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://microlink.io/enterprise'
      }
    ]
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is there really a free plan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — the free plan is forever free, no credit card required. You get 50 requests per day against the public endpoint, with the same screenshot, PDF, metadata, SDK, insights and recipes capabilities used on Pro. It runs with rate limits and shared concurrency, so it\u2019s ideal for prototypes, side-projects and evaluation. When you outgrow it, upgrade in a click.'
        }
      },
      {
        '@type': 'Question',
        name: 'What counts as a request?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'One request is one API call to a Microlink endpoint — screenshot, PDF, metadata, insights, or any other. Cached responses count too, but they\u2019re served from our edge in milliseconds and don\u2019t exhaust your concurrency.'
        }
      },
      {
        '@type': 'Question',
        name: 'What happens if I exceed my quota?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You\u2019re never billed by surprise. We notify you at 80% usage so you can upgrade before hitting the ceiling. If you do reach 100%, requests are paused until the next billing cycle or until you upgrade — no overage fees.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I change plan at any time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Upgrades take effect immediately and are pro-rated; downgrades apply at the start of the next billing cycle. Just email hello@microlink.io from the address you signed up with.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I cancel anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — no contracts, no commitments. Cancel by sending an email to hello@microlink.io and we\u2019ll process it within 24 hours. You keep access through the end of your paid period.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer annual billing or volume discounts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Annual contracts and custom volume discounts are available on Enterprise. Contact hello@microlink.io with your expected volume and we\u2019ll send a quote.'
        }
      },
      {
        '@type': 'Question',
        name: 'How is payment processed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Payments are handled by Stripe — the same provider trusted by Twitter, Pinterest, and Lyft. We never see or store your card details. Invoices are emailed automatically each cycle.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you offer refunds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If something goes wrong on our side, we\u2019ll make it right — including refunds. Reach out at hello@microlink.io and we\u2019ll review your case personally.'
        }
      },
      {
        '@type': 'Question',
        name: "What's your SLA?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We commit to 99.9% uptime (three nines) on paid plans. You can monitor live availability and incident history on our status page at https://microlink.io/status.'
        }
      },
      {
        '@type': 'Question',
        name: 'When do I need Enterprise?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enterprise makes sense when you need any of: dedicated infrastructure, custom API endpoints, S3-compatible storage, custom SLAs, a signed DPA, or pricing for very high volumes (millions of requests / month). See https://microlink.io/enterprise for details, or email hello@microlink.io.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I get an API key?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After payment we send the API key to the email you signed up with. Use it as a header in the API or as the apiKey option in the SDK.'
        }
      }
    ]
  }

  return (
    <Meta
      title='Pricing'
      description='Simple, predictable pricing for the Microlink browser API. Start free, scale to millions of requests, with custom Enterprise tiers when you need them.'
      structured={[productSchema, faqSchema]}
    />
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const DashedGridOverlay = styled(Box)`
  ${theme({ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 })}
  height: 1200px;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 3px,
      transparent 3px,
      transparent 8px
    ),
    radial-gradient(ellipse 90% 80% at 50% 0%, #000 50%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
`

const Dot = () => (
  <Text
    as='span'
    aria-hidden='true'
    css={theme({ color: 'black30', px: [2, 2, 3, 3], display: 'inline-block' })}
  >
    ·
  </Text>
)

const Hero = () => {
  return (
    <Container
      as='section'
      css={theme({
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '100%',
        pt: [2, 2, 3, 3],
        px: [3, 3, 4, 4]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['34px', '42px', '54px', '62px'],
          maxWidth: layout.large,
          textAlign: 'center'
        })}
      >
        Pricing built for <span css={textGradient}>builders</span>
      </Subhead>

      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Start free. No seats, no minimums, no surprises.
      </Caption>
    </Container>
  )
}

// ─── Plans ────────────────────────────────────────────────────────────────────

const PricingCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    borderRadius: 3,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: 1,
    minWidth: 0,
    maxWidth: ['100%', '100%', '380px', '380px']
  })}
  border: solid 1px ${colors.gray4};
  box-shadow: 0 2px 8px ${colors.black05};
`

const ProPricingCard = styled(PricingCard)`
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  position: relative;
  box-shadow: 0 12px 32px ${colors.black10};

  @media (min-width: 1200px) {
    transform: translateY(-12px);
  }
`

const Pill = styled(Box)`
  ${theme({
    position: 'absolute',
    top: '-14px',
    left: '50%',
    px: 3,
    py: 1,
    borderRadius: 5,
    fontSize: 0,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2
  })}
  transform: translateX(-50%);
  background: ${gradient};
  white-space: nowrap;
  text-transform: uppercase;
`

const PlanCheck = ({ accent = 'black60', children }) => (
  <Flex css={theme({ alignItems: 'flex-start', pt: 2 })}>
    <FeatherIcon
      css={theme({
        display: 'inline-flex',
        pr: 2,
        pt: '4px',
        color: accent,
        flexShrink: 0
      })}
      icon={CheckIcon}
      size='16px'
    />
    <Text as='span' css={theme({ fontSize: [1, 1, '17px', '17px'] })}>
      {children}
    </Text>
  </Flex>
)

const PriceTag = ({ eur, suffix = '/month', highlight = false }) => {
  const [currency] = useCurrencyContext()
  const { symbol, word } = CURRENCIES[currency]
  const amount = formatPrice(eur, currency)
  const ariaLabel = `${amount} ${word} per month`
  const amountNode = highlight
    ? (
      <Highlight as='span'>{amount}</Highlight>
      )
    : (
        amount
      )

  return (
    <Flex
      css={theme({
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        gap: 1
      })}
      aria-label={ariaLabel}
    >
      <Text
        as='span'
        css={theme({
          fontSize: [2, 2, 3, 3],
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 0,
          position: 'relative',
          top: '-12px'
        })}
      >
        {symbol}
      </Text>
      <Text
        as='span'
        css={theme({
          fontSize: ['32px', '32px', '42px', '42px'],
          fontWeight: 'bold',
          color: 'black',
          lineHeight: 0,
          fontVariantNumeric: 'tabular-nums'
        })}
      >
        {amountNode}
      </Text>
      <Text css={theme({ fontSize: [0, 0, 1, 1], color: 'black60' })}>
        {suffix}
      </Text>
    </Flex>
  )
}

const PlanName = ({ children }) => (
  <Text
    css={theme({
      fontSize: ['20px', '20px', '24px', '24px'],
      fontWeight: 'bold',
      color: 'black',
      lineHeight: 1
    })}
  >
    {children}
  </Text>
)

const CURRENCY_CODES = Object.keys(CURRENCIES)
const TOGGLE_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const TOGGLE_DURATION = '320ms'

const CurrencyToggleGroup = styled(Flex)`
  ${theme({
    display: 'inline-flex',
    bg: 'black05',
    borderRadius: 5,
    p: '4px'
  })}
  position: relative;
  border: 1px solid ${colors.black10};
`

const CurrencyToggleThumb = styled('span')`
  ${theme({
    position: 'absolute',
    top: '4px',
    left: '4px',
    bottom: '4px',
    borderRadius: 4,
    bg: 'white'
  })}
  width: calc((100% - 8px) / ${CURRENCY_CODES.length});
  box-shadow: 0 1px 2px ${colors.black10}, 0 0 0 1px ${colors.black05};
  transform: translate3d(${({ $index }) => `${$index * 100}%`}, 0, 0);
  transition: transform ${TOGGLE_DURATION} ${TOGGLE_EASING};
  pointer-events: none;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const CurrencyToggleButton = styled('button')`
  ${theme({
    appearance: 'none',
    px: 3,
    py: 2,
    borderRadius: 4,
    fontFamily: 'sans',
    fontSize: [0, 0, 1, 1],
    fontWeight: 'bold',
    cursor: 'pointer',
    minHeight: '32px',
    color: 'black60',
    bg: 'transparent'
  })}
  position: relative;
  z-index: 1;
  border: 0;
  letter-spacing: 0.5px;
  touch-action: manipulation;
  transition: color ${TOGGLE_DURATION} ${TOGGLE_EASING};

  &[aria-pressed='true'] {
    color: ${colors.pink7};
  }

  &:hover:not([aria-pressed='true']) {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.pink7};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const CurrencyToggle = () => {
  const [currency, setCurrency] = useCurrencyContext()
  const activeIndex = Math.max(0, CURRENCY_CODES.indexOf(currency))
  return (
    <CurrencyToggleGroup role='group' aria-label='Display currency'>
      <CurrencyToggleThumb aria-hidden='true' $index={activeIndex} />
      {CURRENCY_CODES.map(code => {
        const { symbol, label } = CURRENCIES[code]
        return (
          <CurrencyToggleButton
            key={code}
            type='button'
            aria-pressed={currency === code}
            aria-label={`Display prices in ${label}`}
            onClick={() => setCurrency(code)}
            data-event-location='Pricing'
            data-event-name={`Currency toggle · ${label}`}
          >
            {symbol} {label}
          </CurrencyToggleButton>
        )
      })}
    </CurrencyToggleGroup>
  )
}

const Plans = ({ canonicalUrl, stripeKey }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)
  const [currency] = useCurrencyContext()
  const { monthlyPrice, id: planId, reqsPerMonth } = plan
  const reqsPerMonthNumber = Number(reqsPerMonth.replace(/,/g, ''))
  const pricePer1kEur = monthlyPrice / (reqsPerMonthNumber / 1000)
  const pricePer1kDisplay = formatPrice(pricePer1kEur, currency, {
    decimals: 2
  })
  const { symbol: currencySymbol } = CURRENCIES[currency]
  const isUsd = currency === 'USD'
  const totalStars = useOssTotalStars()

  return (
    <Container
      as='section'
      id='pricing-plans'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        py: [4, 4, 5, 5],
        px: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          justifyContent: 'center',
          width: '100%',
          mb: [4, 4, 5, 5]
        })}
      >
        <CurrencyToggle />
      </Flex>

      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
          justifyContent: 'center',
          gap: [4, 4, 3, 4],
          width: '100%'
        })}
      >
        <ProPricingCard css={theme({ order: [1, 1, 2, 2] })}>
          <Pill>
            <Caps css={theme({ fontSize: 0, letterSpacing: 2 })}>
              Most popular
            </Caps>
          </Pill>
          <PlanName>Pro</PlanName>
          <Text
            css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black60' })}
          >
            For production workloads.
          </Text>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PriceTag eur={monthlyPrice} highlight />
            <Text
              css={theme({
                pt: 2,
                fontSize: 0,
                color: 'pink7',
                fontWeight: 'bold',
                fontVariantNumeric: 'tabular-nums'
              })}
            >
              ≈ {currencySymbol}
              {pricePer1kDisplay} per 1,000 requests
            </Text>
            {isUsd && (
              <Text
                css={theme({
                  pt: 1,
                  fontSize: 0,
                  color: 'black60'
                })}
              >
                Billed in EUR · USD shown for reference
              </Text>
            )}
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <Text css={theme({ fontSize: [1, 1, 2, 2] })}>
              <PricePicker onChange={setPlan} />{' '}
              <Text as='span' css={theme({ color: 'black60' })}>
                requests / month
              </Text>
            </Text>
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PlanCheck accent='pink7'>Everything in Free</PlanCheck>
            <PlanCheck accent='pink7'>
              <Link href='/docs/api/parameters/ttl'>Configurable TTL</Link>
            </PlanCheck>
            <PlanCheck accent='pink7'>
              <Link href='/docs/guides/common/private-pages'>
                Custom HTTP headers
              </Link>
            </PlanCheck>
            <PlanCheck accent='pink7'>
              <Link href='/docs/api/parameters/proxy'>
                Automatic proxy resolution
              </Link>
            </PlanCheck>
            <PlanCheck accent='pink7'>
              <Link href='/docs/api/parameters/adblock'>
                Adblock & cookie banners
              </Link>
            </PlanCheck>
            <PlanCheck accent='pink7'>Priority email support</PlanCheck>
          </Box>
          <Box css={theme({ pt: [4, 4, 5, 5], mt: 'auto' })}>
            <Checkout
              variant='gradient'
              planId={planId}
              canonicalUrl={canonicalUrl}
              stripeKey={stripeKey}
              css={theme({ width: '100%' })}
            />
            <Text
              css={theme({
                pt: 2,
                fontSize: 0,
                color: 'black60',
                textAlign: 'center'
              })}
            >
              Cancel anytime · No setup fees
            </Text>
          </Box>
        </ProPricingCard>

        <PricingCard css={theme({ order: [2, 2, 1, 1] })}>
          <PlanName>Free</PlanName>
          <Text
            css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black60' })}
          >
            Try the API in seconds. No card.
          </Text>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PriceTag eur={0} />
            <Text
              css={theme({
                pt: 2,
                fontSize: 0,
                color: 'black60',
                fontVariantNumeric: 'tabular-nums'
              })}
            >
              {FREE_PLAN_RATE_LIMIT} requests per day
            </Text>
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PlanCheck>50 requests / day</PlanCheck>
            <PlanCheck>
              <Link href='/screenshot'>Screenshot</Link>,{' '}
              <Link href='/pdf'>PDF</Link>, <Link href='/sdk'>SDK</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/metadata'>Metadata</Link>,{' '}
              <Link href='/logo'>Logo</Link>,{' '}
              <Link href='/insights'>insights</Link>
            </PlanCheck>
            <PlanCheck>Global edge cache</PlanCheck>
            <PlanCheck>Community support</PlanCheck>
          </Box>
          <Box
            css={theme({
              pt: [4, 4, 5, 5],
              mt: 'auto',
              display: 'flex',
              justifyContent: 'center',
              fontSize: [1, 1, 2, 2]
            })}
          >
            <ArrowLink href='/docs/guides'>Get started free</ArrowLink>
          </Box>
        </PricingCard>

        <PricingCard css={theme({ order: 3 })}>
          <PlanName>Enterprise</PlanName>
          <Text
            css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black60' })}
          >
            Dedicated infra for high-volume.
          </Text>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <Flex css={theme({ alignItems: 'baseline', gap: 1 })}>
              <Text
                as='span'
                css={theme({
                  fontSize: [2, 2, 3, 3],
                  fontWeight: 'bold',
                  color: 'black',
                  lineHeight: 0
                })}
              >
                Custom
              </Text>
            </Flex>
            <Text css={theme({ pt: 2, fontSize: 0, color: 'black60' })}>
              From {currencySymbol}
              {formatPrice(500, currency)} / month
            </Text>
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PlanCheck>Everything in Pro</PlanCheck>
            <PlanCheck>
              <Link href='/enterprise'>Custom API endpoint</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/enterprise'>Dedicated CDN distribution</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/enterprise'>S3-like storage integration</Link>
            </PlanCheck>
            <PlanCheck>Custom SLA & DPA available</PlanCheck>
          </Box>
          <Box
            css={theme({
              pt: [4, 4, 5, 5],
              mt: 'auto',
              display: 'flex',
              justifyContent: 'center',
              fontSize: [1, 1, 2, 2]
            })}
          >
            <ArrowLink href='/enterprise'>Talk to sales</ArrowLink>
          </Box>
        </PricingCard>
      </Flex>

      <Box
        aria-hidden='true'
        css={`
          margin-top: 32px;
          width: 100%;
          max-width: ${layout.normal};
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.black10},
            transparent
          );
        `}
      />

      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: [0, 0, 1, 1],
          color: 'black60',
          fontWeight: 'bold',
          letterSpacing: 1
        })}
      >
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            {formatCompact(totalStars)}
          </Text>{' '}
          GitHub stars
        </Text>
        <Dot />
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            641M+
          </Text>{' '}
          requests last month
        </Text>
        <Dot />
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            99.9%
          </Text>{' '}
          SLA
        </Text>
      </Flex>
    </Container>
  )
}

// ─── Comparison table ─────────────────────────────────────────────────────────

const PLAN_NAMES = ['Free', 'Pro', 'Enterprise']

const COMPARISON_ROWS = [
  {
    label: 'Daily quota',
    values: ['50 req/day', 'unlimited', 'unlimited']
  },
  {
    label: 'Monthly quota',
    values: ['~1.5K req/month', '45K – 560K req/month', 'Millions+']
  },
  { label: 'API key', values: [false, true, true] },
  { label: 'Configurable TTL', values: [false, true, true] },
  { label: 'Custom HTTP headers', values: [false, true, true] },
  { label: 'Automatic proxy resolution', values: [false, true, true] },
  { label: 'Adblock & cookie banners', values: [true, true, true] },
  { label: 'Global CDN edge cache', values: ['Shared', 'Shared', 'Dedicated'] },
  { label: 'Concurrency', values: ['Limited', 'Standard', 'Custom'] },
  { label: 'SLA', values: ['Best effort', '99.9%', '99,99%'] },
  {
    label: 'Support',
    values: ['Community', 'Priority email', 'Dedicated channel']
  },
  { label: 'Dedicated infrastructure', values: [false, false, true] }
]

const ComparisonTable = styled(Box)`
  ${theme({ width: '100%', bg: 'white', borderRadius: 3, overflow: 'hidden' })}
  border: 1px solid ${colors.black10};
  box-shadow: 0 2px 8px ${colors.black05};
`

const ComparisonRow = styled(Flex)`
  ${theme({ alignItems: 'stretch', width: '100%' })}
  border-top: 1px solid ${colors.black10};
  &:first-of-type {
    border-top: 0;
  }
`

const ComparisonHeaderRow = styled(ComparisonRow)`
  ${theme({ bg: 'black05' })}
  border-top: 0;
`

const ComparisonLabelCell = styled(Flex)`
  ${theme({
    flex: '1.4 1 0',
    minWidth: 0,
    px: [2, 3, 4, 4],
    py: [3, 3, 3, 3],
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'sans',
    fontSize: [0, 1, '15px', '15px'],
    fontWeight: 'bold',
    color: 'black'
  })}
`

const ComparisonPlanCell = styled(Flex)`
  ${theme({
    flex: '1 1 0',
    minWidth: 0,
    px: [2, 3, 3, 3],
    py: [3, 3, 3, 3],
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'sans',
    fontSize: [0, 1, 1, 1],
    color: 'black80',
    fontVariantNumeric: 'tabular-nums'
  })}
`

const ComparisonProPlanCell = styled(ComparisonPlanCell)`
  ${theme({ bg: 'pink0', color: 'black' })}
`

const ComparisonHeaderLabelCell = styled(ComparisonLabelCell)`
  ${theme({ fontSize: [0, 1, 2, 2], letterSpacing: 1 })}
`

const ComparisonHeaderPlanCell = styled(ComparisonPlanCell)`
  ${theme({ fontWeight: 'bold', color: 'black', fontSize: [0, 1, 2, 2] })}
`

const ComparisonProHeaderPlanCell = styled(ComparisonHeaderPlanCell)`
  ${theme({ bg: 'black05', color: 'pink7' })}
`

const renderComparisonValue = value => {
  if (value === true) {
    return (
      <FeatherIcon
        icon={CheckIcon}
        size='18px'
        css={theme({ color: 'pink7' })}
        aria-label='Included'
      />
    )
  }
  if (value === false) {
    return (
      <Text
        as='span'
        aria-label='Not included'
        css={theme({ color: 'black30', fontWeight: 'bold' })}
      >
        —
      </Text>
    )
  }
  return value
}

const MobileComparisonStack = ({ plan, planIndex }) => (
  <Box
    css={theme({
      bg: 'white',
      borderRadius: 3,
      border: 1,
      borderColor: 'black10',
      fontFamily: 'sans',
      overflow: 'hidden'
    })}
  >
    <Text
      css={theme({
        fontSize: 2,
        fontWeight: 'bold',
        bg: planIndex === 1 ? 'pink0' : 'white',
        px: 3,
        py: 3,
        borderBottom: 1,
        borderBottomColor: 'black10'
      })}
      style={{ color: planIndex === 1 ? colors.pink7 : colors.black }}
    >
      {plan}
    </Text>
    <Box css={theme({ pt: 2, px: 3, pb: 3 })}>
      {COMPARISON_ROWS.map(({ label, values }) => (
        <Flex
          key={label}
          css={theme({
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            fontSize: 1
          })}
        >
          <Text as='span' css={theme({ color: 'black70', pr: 2 })}>
            {label}
          </Text>
          <Box css={theme({ textAlign: 'right', color: 'black' })}>
            {renderComparisonValue(values[planIndex])}
          </Box>
        </Flex>
      ))}
    </Box>
  </Box>
)

const Comparison = () => (
  <Container
    as='section'
    id='comparison'
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'center',
        maxWidth: layout.normal,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({ fontSize: ['28px', '34px', '42px', '46px'] })}
      >
        Compare every feature,
        <LineBreak />
        side by <span css={theme({ color: 'pink7' })}>side</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({ pt: [3, 3, 4, 4], fontSize: [1, 2, 2, 2] })}
      >
        Every paid plan unlocks the same toolbox. Pick the volume that matches
        your traffic — upgrade or downgrade in a click.
      </Caption>
    </Box>

    <Box
      css={theme({
        display: ['none', 'none', 'block', 'block'],
        width: '100%',
        maxWidth: layout.large
      })}
    >
      <ComparisonTable role='table'>
        <Box role='rowgroup'>
          <ComparisonHeaderRow role='row'>
            <ComparisonHeaderLabelCell role='columnheader'>
              Feature
            </ComparisonHeaderLabelCell>
            {PLAN_NAMES.map((name, i) =>
              i === 1
                ? (
                  <ComparisonProHeaderPlanCell role='columnheader' key={name}>
                    {name}
                  </ComparisonProHeaderPlanCell>
                  )
                : (
                  <ComparisonHeaderPlanCell role='columnheader' key={name}>
                    {name}
                  </ComparisonHeaderPlanCell>
                  )
            )}
          </ComparisonHeaderRow>
        </Box>
        <Box role='rowgroup'>
          {COMPARISON_ROWS.map(({ label, values }) => (
            <ComparisonRow role='row' key={label}>
              <ComparisonLabelCell role='rowheader'>
                {label}
              </ComparisonLabelCell>
              {values.map((value, i) =>
                i === 1
                  ? (
                    <ComparisonProPlanCell role='cell' key={i}>
                      {renderComparisonValue(value)}
                    </ComparisonProPlanCell>
                    )
                  : (
                    <ComparisonPlanCell role='cell' key={i}>
                      {renderComparisonValue(value)}
                    </ComparisonPlanCell>
                    )
              )}
            </ComparisonRow>
          ))}
        </Box>
      </ComparisonTable>
    </Box>

    <Box
      css={theme({
        display: ['flex', 'flex', 'none', 'none'],
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: layout.normal
      })}
    >
      {PLAN_NAMES.map((plan, i) => (
        <MobileComparisonStack key={plan} plan={plan} planIndex={i} />
      ))}
    </Box>
  </Container>
)

// ─── Capabilities ─────────────────────────────────────────────────────────────

const ClockIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </svg>
)
const HeaderIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <line x1='4' y1='9' x2='20' y2='9' />
    <line x1='4' y1='15' x2='20' y2='15' />
    <line x1='10' y1='3' x2='8' y2='21' />
    <line x1='16' y1='3' x2='14' y2='21' />
  </svg>
)
const ProxyIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='2' y1='12' x2='22' y2='12' />
    <path d='M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' />
  </svg>
)
const ShieldXIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
    <line x1='9' y1='9' x2='15' y2='15' />
    <line x1='15' y1='9' x2='9' y2='15' />
  </svg>
)
const CAPABILITIES = [
  {
    icon: ClockIcon,
    title: 'Configurable cache (TTL)',
    description:
      'Tune cache lifetime per request. Cached hits are served from the edge and billed at a fraction of the price.',
    href: '/docs/api/parameters/ttl'
  },
  {
    icon: HeaderIcon,
    title: 'Custom HTTP headers',
    description:
      'Forward auth tokens, cookies, or any custom headers. Reach private dashboards, gated content, and authenticated APIs.',
    href: '/docs/guides/common/private-pages'
  },
  {
    icon: ProxyIcon,
    title: 'Automatic proxy resolution',
    description:
      'Bypass geo-restrictions and avoid IP blocks with rotating residential proxies. Pick the country, we handle the rest.',
    href: '/docs/api/parameters/proxy'
  },
  {
    icon: ShieldXIcon,
    title: 'Adblock & cookie banners',
    description:
      'Strip ads, trackers, and consent banners automatically so screenshots and previews stay clean and consistent.',
    href: '/docs/api/parameters/adblock'
  }
]

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'pink7',
    bg: 'pinkest'
  })}
`

const CapabilityTile = ({ icon, title, description, href }) => (
  <Flex
    css={theme({
      gap: 3,
      alignItems: 'flex-start',
      flex: [
        '1 1 100%',
        '1 1 100%',
        '1 1 calc(50% - 16px)',
        '1 1 calc(33.333% - 24px)'
      ],
      minWidth: 0
    })}
  >
    <CapabilityIcon>{icon}</CapabilityIcon>
    <Flex
      css={theme({ flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 })}
    >
      <Text
        css={theme({
          fontWeight: 'bold',
          fontSize: [2, 2, '18px', '18px'],
          color: 'black',
          lineHeight: 1
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, '15px', '15px'],
          color: 'black70',
          lineHeight: 2
        })}
      >
        {description}
      </Text>
      {href && (
        <Box css={theme({ pt: 1 })}>
          <Link
            href={href}
            css={theme({
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold',
              color: 'pink7'
            })}
          >
            Read the docs →
          </Link>
        </Box>
      )}
    </Flex>
  </Flex>
)

const Capabilities = () => (
  <Container
    as='section'
    id='capabilities'
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'left',
        width: '100%',
        maxWidth: layout.large,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['28px', '34px', '42px', '46px'],
          textAlign: 'left'
        })}
      >
        Everything you need,
        <LineBreak />
        in <span css={theme({ color: 'pink7' })}>one API call</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.normal
        })}
      >
        Every paid plan unlocks the same set of capabilities. Pay for the volume
        you need, not for features you don&apos;t.
      </Caption>
    </Box>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexWrap: 'wrap',
        rowGap: [4, 4, 4, 5],
        columnGap: [0, 0, 4, 5]
      })}
    >
      {CAPABILITIES.map(cap => (
        <CapabilityTile key={cap.title} {...cap} />
      ))}
    </Flex>
  </Container>
)

// ─── Build vs Buy ─────────────────────────────────────────────────────────────

const BUILD_BULLETS = [
  'Spin up Chromium clusters and babysit browser pools.',
  '$200–$800 / month minimum on infra (browsers are RAM-hungry).',
  '~2 weeks to a working v1, then ~4 hrs / month maintenance.',
  'Build retries, caching, proxies, and adblock from scratch.',
  'Wake up at 3 a.m. when the cluster goes down.'
]

const BUY_BULLETS = [
  'One HTTP call. No SDK to install, no daemon to run.',
  'Start at €0. Pay only for the volume you actually use.',
  'Zero ops: cache, proxies, adblock, retries baked in.',
  '240+ edge nodes, 99.9% SLA, isolated browsers per request.',
  'Spend engineering time on your product, not on Chromium.'
]

const BvbCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    borderRadius: 3,
    px: [3, 3, 4, 4],
    py: [4, 4, 5, 5],
    bg: 'white'
  })}
  border: ${borders[1]};
`

const BuildCard = styled(BvbCard)`
  ${theme({ bg: 'black05' })}
  border-color: ${colors.black10};
  box-shadow: 0 1px 4px ${colors.black05};
`

const BuyCard = styled(BvbCard)`
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  box-shadow: 0 12px 32px ${colors.black10};
  @media (min-width: 1024px) {
    transform: translateY(-8px);
  }
`

const BvbBullet = ({ children, kind }) => (
  <Flex css={theme({ alignItems: 'flex-start', gap: 2, pt: [2, 2, 3, 3] })}>
    <FeatherIcon
      css={theme({
        flexShrink: 0,
        pt: '4px',
        color: kind === 'buy' ? 'pink7' : 'black40'
      })}
      icon={kind === 'buy' ? CheckIcon : XIcon}
      size='16px'
    />
    <Text
      as='span'
      css={theme({
        fontSize: [1, 1, '15px', '15px'],
        color: kind === 'buy' ? 'black' : 'black70',
        lineHeight: 2
      })}
    >
      {children}
    </Text>
  </Flex>
)

const BuildVsBuy = () => (
  <Container
    as='section'
    id='build-vs-buy'
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'center',
        maxWidth: layout.normal,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({ fontSize: ['28px', '34px', '42px', '46px'] })}
      >
        Build it, or just <span css={theme({ color: 'pink7' })}>call it</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({ pt: [3, 3, 4, 4], fontSize: [1, 2, 2, 2] })}
      >
        We&apos;ve been running headless browsers in production since 2017. So
        you don&apos;t have to.
      </Caption>
    </Box>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
        gap: [3, 3, 4, 4]
      })}
    >
      <BuildCard>
        <Text
          as='span'
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            letterSpacing: 2,
            color: 'black60',
            textTransform: 'uppercase'
          })}
        >
          Run it yourself
        </Text>
        <Text
          css={theme({
            pt: 2,
            fontSize: ['22px', '22px', '26px', '26px'],
            fontWeight: 'bold',
            color: 'black',
            lineHeight: 1
          })}
        >
          The DIY tax.
        </Text>
        <Box css={theme({ pt: [3, 3, 4, 4], flex: 1 })}>
          {BUILD_BULLETS.map(b => (
            <BvbBullet key={b} kind='build'>
              {b}
            </BvbBullet>
          ))}
        </Box>
      </BuildCard>
      <BuyCard>
        <Text
          as='span'
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            letterSpacing: 2,
            color: 'pink7',
            textTransform: 'uppercase'
          })}
        >
          Use Microlink
        </Text>
        <Text
          css={theme({
            pt: 2,
            fontSize: ['22px', '22px', '26px', '26px'],
            fontWeight: 'bold',
            color: 'black',
            lineHeight: 1
          })}
        >
          Headless browsers, as a service.
        </Text>
        <Box css={theme({ pt: [3, 3, 4, 4], flex: 1 })}>
          {BUY_BULLETS.map(b => (
            <BvbBullet key={b} kind='buy'>
              {b}
            </BvbBullet>
          ))}
        </Box>
      </BuyCard>
    </Flex>
  </Container>
)

// ─── Testimonials ─────────────────────────────────────────────────────────────

// TODO: replace with real customer quotes once collected.
const TESTIMONIALS = [
  {
    quote:
      'We swapped our headless cluster for the Microlink API in an afternoon. Costs dropped, p99 latency halved, on-call pages went away.',
    author: 'Alex Rivera',
    role: 'Staff Engineer',
    company: 'Beam Analytics'
  },
  {
    quote:
      'Pricing is the part nobody likes about infra APIs. With Microlink we know exactly what we pay before we ship — and the unit price is hard to beat.',
    author: 'Priya Patel',
    role: 'Head of Platform',
    company: 'Spool'
  },
  {
    quote:
      'Free plan got us to MVP. Pro carried us to product-market fit. Now Enterprise runs the whole pipeline. One vendor for the entire journey.',
    author: 'Marco Bianchi',
    role: 'Co-founder & CTO',
    company: 'Lumen Labs'
  }
]

const initialsOf = name =>
  name
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const TestimonialCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    flex: ['1 1 100%', '1 1 100%', '1 1 0', '1 1 0'],
    minWidth: 0,
    bg: 'white',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    position: 'relative'
  })}
  border: ${borders[1]};
  box-shadow: 0 2px 8px ${colors.black05};
  transition: box-shadow 200ms ease, transform 200ms ease;
  &:hover {
    box-shadow: 0 8px 24px ${colors.black10};
    transform: translateY(-2px);
  }
`

const QuoteGlyph = styled(Text)`
  ${theme({
    fontSize: ['54px', '54px', '64px', '64px'],
    color: 'pink7',
    fontWeight: 'bold',
    lineHeight: 0
  })}
  position: absolute;
  top: 12px;
  left: 16px;
  user-select: none;
  pointer-events: none;
`

const Avatar = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'pinkest',
    color: 'pink7',
    fontWeight: 'bold',
    fontSize: 1,
    flexShrink: 0
  })}
`

const Testimonial = ({ quote, author, role, company }) => (
  <TestimonialCard as='figure' css={{ margin: 0 }}>
    <QuoteGlyph aria-hidden='true' as='span'>
      &ldquo;
    </QuoteGlyph>
    <Text
      as='blockquote'
      css={theme({
        m: 0,
        pt: [4, 4, 5, 5],
        fontSize: [1, 2, 2, 2],
        lineHeight: 2,
        color: 'black',
        flex: 1
      })}
    >
      {quote}
    </Text>
    <Flex
      as='figcaption'
      css={theme({ pt: [3, 3, 4, 4], gap: 3, alignItems: 'center' })}
    >
      <Avatar aria-hidden='true'>{initialsOf(author)}</Avatar>
      <Box>
        <Text
          css={theme({
            fontSize: [1, 1, '15px', '15px'],
            fontWeight: 'bold',
            color: 'black'
          })}
        >
          {author}
        </Text>
        <Text css={theme({ fontSize: 0, color: 'black60' })}>
          {role} · {company}
        </Text>
      </Box>
    </Flex>
  </TestimonialCard>
)

const Testimonials = () => (
  <Container
    as='section'
    id='testimonials'
    css={theme({
      display: 'none', // Remove this once we have real testimonials
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'center',
        maxWidth: layout.normal,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({ fontSize: ['28px', '34px', '42px', '46px'] })}
      >
        Loved by teams in{' '}
        <span css={theme({ color: 'pink7' })}>production</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({ pt: [3, 3, 4, 4], fontSize: [1, 2, 2, 2] })}
      >
        Engineers, founders and platform teams pick Microlink because it just
        works.
      </Caption>
    </Box>
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: [3, 3, 4, 4]
      })}
    >
      {TESTIMONIALS.map(t => (
        <Testimonial key={t.author} {...t} />
      ))}
    </Flex>
  </Container>
)

// ─── Clients ──────────────────────────────────────────────────────────────────

const CLIENTS = [
  {
    name: 'Community',
    description: 'Fan engagement platform',
    url: 'https://community.com',
    logo: (
      <img
        src='/images/clients/community.com.png'
        alt='Community'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Impact',
    description: 'Partnership management',
    url: 'https://impact.com',
    logo: (
      <img
        src='/images/clients/impact.com.png'
        alt='Impact'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Mirror',
    description: 'Web3 publishing platform',
    url: 'https://mirror.xyz',
    logo: (
      <img
        src='/images/clients/mirror.xyz.png'
        alt='Mirror'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Padlet',
    description: 'Visual collaboration tool',
    url: 'https://padlet.com',
    logo: (
      <img
        src='/images/clients/padlet.com.png'
        alt='Padlet'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'SkedSocial',
    description: 'Marketing platform',
    url: 'https://skedsocial.com',
    logo: (
      <img
        src='/images/clients/skedsocial.com.png'
        alt='Sked Social'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  }
]

const ClientLogo = styled(Flex)`
  ${theme({ textDecoration: 'none' })};
  color: inherit;
  transition: transform ${transition.short};
  &:hover {
    transform: translateY(-${radii[1]}) scale(1.05);
  }
  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
    border-radius: ${radii[3]};
  }
`

const Clients = () => (
  <Container
    as='section'
    id='clients'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4]
    })}
  >
    <Caps
      css={theme({
        fontSize: [0, 1, 1, 1],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3,
        textAlign: 'center'
      })}
    >
      Trusted by teams shipping to production
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 4, 0],
        flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%'
      })}
    >
      {CLIENTS.map(({ name, description, logo, url }) => (
        <ClientLogo
          as='a'
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${name}`}
          css={theme({ flexDirection: 'column', alignItems: 'center', gap: 1 })}
        >
          <Box css={theme({ color: 'black' })}>{logo}</Box>
          <Text
            css={theme({ fontWeight: 'bold', fontSize: 1, color: 'black' })}
          >
            {name}
          </Text>
          <Text
            css={theme({ fontSize: 0, color: 'black80', textAlign: 'center' })}
          >
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

// ─── FAQs ─────────────────────────────────────────────────────────────────────

const Faqs = () => (
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
  />
)

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_CHARS = 'Start'.split('')
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${colors.pink7}; }
  `
}

const ctaAnims = Array.from({ length: CTA_LEAD_CHARS.length }, (_, i) =>
  ctaCharAnim(i)
)

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${colors.pink7}; }
`

const CtaNow = styled('span')`
  animation: ${ctaNowAnim} ${CTA_DURATION}s step-end infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${colors.pink7};
  }
`

const Cta = () => {
  const [currency] = useCurrencyContext()
  const { symbol } = CURRENCIES[currency]
  const startingPrice = formatPrice(39, currency)
  return (
    <Container
      as='section'
      id='final-cta'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'white',
        py: SECTION_VERTICAL_SPACING,
        px: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: layout.normal,
          textAlign: 'center'
        })}
      >
        <Subhead
          titleize={false}
          css={theme({
            fontSize: ['34px', '42px', '54px', '62px'],
            textAlign: 'center'
          })}
        >
          {CTA_LEAD_CHARS.map((char, i) => (
            <CtaChar key={i} $i={i}>
              {char}
            </CtaChar>
          ))}{' '}
          <CtaNow>now</CtaNow>.
        </Subhead>
        <Caption
          forwardedAs='div'
          titleize={false}
          css={theme({ pt: [3, 3, 4, 4], fontSize: [1, 2, 2, 2] })}
        >
          Free forever plan, no credit card. Pro plans start at {symbol}
          {startingPrice}/month — cancel anytime.
        </Caption>
        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            flexDirection: ['column', 'row', 'row', 'row'],
            gap: [2, 3, 3, 3],
            alignItems: 'center',
            justifyContent: 'center'
          })}
        >
          <Button
            as='a'
            href='/docs/api/getting-started/overview'
            variant='black'
            data-event-location='Pricing'
            data-event-name='Final CTA · Get started free'
          >
            <Caps css={theme({ fontSize: [0, 0, 1, 1] })}>
              Get started free
            </Caps>
          </Button>
        </Flex>
        <Box css={theme({ pt: [3, 3, 4, 4] })}>
          <Text css={theme({ fontSize: 0, color: 'black60' })}>
            Questions?{' '}
            <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
          </Text>
        </Box>
      </Flex>
    </Container>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const PricingPage = () => {
  const { canonicalUrl, stripeKey } = useSiteMetadata()
  const currencyState = useCurrency()
  return (
    <CurrencyContext.Provider value={currencyState}>
      <Layout css={theme({ position: 'relative' })}>
        <DashedGridOverlay aria-hidden='true' />
        <Box css={theme({ position: 'relative', zIndex: 1 })}>
          <Hero />
          <Plans canonicalUrl={canonicalUrl} stripeKey={stripeKey} />
          <Comparison />
          <Testimonials />
          <Clients />
          <BuildVsBuy />
          <Capabilities />
          <Faqs />
          <Cta />
        </Box>
      </Layout>
    </CurrencyContext.Provider>
  )
}

export default PricingPage
