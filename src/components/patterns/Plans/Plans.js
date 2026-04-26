import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Highlight from 'components/elements/Highlight'
import { Link } from 'components/elements/Link'
import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import ArrowLink from 'components/patterns/ArrowLink'
import Checkout from 'components/patterns/Checkout'
import { colors, gradient, layout, theme } from 'theme'

// ─── Constants ───────────────────────────────────────────────────────────────

const FREE_PLAN_RATE_LIMIT = 50

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})
const formatCompact = n => COMPACT_NUMBER_FORMATTER.format(n).toLowerCase()

// ─── Currency ────────────────────────────────────────────────────────────────

const EUR_TO_USD = 1.17
export const CURRENCIES = {
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

export const formatPrice = (eurAmount, currencyCode, { decimals = 0 } = {}) => {
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

export const useCurrency = () => {
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

export const CurrencyContext = createContext(['USD', () => {}])
export const useCurrencyContext = () => useContext(CurrencyContext)

// ─── Decorative dot separator ────────────────────────────────────────────────

const Dot = () => (
  <Text
    as='span'
    aria-hidden='true'
    css={theme({ color: 'black30', px: [2, 2, 3, 3], display: 'inline-block' })}
  >
    ·
  </Text>
)

// ─── Cards & primitives ──────────────────────────────────────────────────────

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

export const PriceTag = ({ eur, suffix = '/month', highlight = false }) => {
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

// ─── Currency toggle ─────────────────────────────────────────────────────────

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

// ─── Plans ───────────────────────────────────────────────────────────────────

const Plans = ({ canonicalUrl, stripeKey, showUsageStats = false }) => {
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
              <Link href='/insights'>Insights</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/blog/edge-cdn'>Global edge cache</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/community'>Community support</Link>
            </PlanCheck>
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
            <ArrowLink href='/enterprise'>Explore Enterprise</ArrowLink>
          </Box>
        </PricingCard>
      </Flex>

      {showUsageStats && (
        <>
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
        </>
      )}
    </Container>
  )
}

export default Plans
