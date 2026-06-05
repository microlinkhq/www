import React, { useState } from 'react'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Highlight from 'components/elements/Highlight'
import { Link } from 'components/elements/Link'
import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import { useCurrencyContext } from 'components/hook/use-currency'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import ArrowLink from 'components/patterns/ArrowLink'
import Checkout from 'components/patterns/Checkout'
import { colors, gradient, layout, theme } from 'theme'

const FREE_PLAN_RATE_LIMIT = 50

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', label: 'USD', word: 'dollars' },
  EUR: { code: 'EUR', symbol: '€', label: 'EUR', word: 'euros' }
}

const formatCompact = n => COMPACT_NUMBER_FORMATTER.format(n).toLowerCase()

export const formatPrice = (prices, currencyCode, { decimals = 0 } = {}) => {
  const value = typeof prices === 'number' ? prices : prices[currencyCode]
  return value.toFixed(decimals)
}

const Dot = () => (
  <Text
    as='span'
    aria-hidden='true'
    css={theme({ color: 'black30', px: [2, 2, 3, 3], display: 'inline-block' })}
  >
    ·
  </Text>
)

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
`

const ProPricingCard = styled(PricingCard)`
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  position: relative;
  @media (min-width: 1200px) {
    transform: translateY(-12px);
  }
`

const PlanCheck = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', gap: 2, pt: 2 })}>
    <FeatherIcon
      css={theme({
        display: 'inline-flex',
        color: 'pink7',
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

export const PriceTag = ({ prices, suffix = '/month', highlight = false }) => {
  const [currency] = useCurrencyContext()
  const { symbol, word } = CURRENCIES[currency]
  const amount = formatPrice(prices, currency)
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

const ENTERPRISE_PRICE = { EUR: 500, USD: 625 }

const Plans = ({ canonicalUrl, stripeKey, footer = 'none' }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)
  const [currency] = useCurrencyContext()
  const { monthlyPrice, id: planId, reqsPerMonth } = plan
  const reqsPerMonthNumber = Number(reqsPerMonth.replace(/,/g, ''))
  const pricePer1k = monthlyPrice[currency] / (reqsPerMonthNumber / 1000)
  const pricePer1kDisplay = pricePer1k.toFixed(2)
  const { symbol: currencySymbol } = CURRENCIES[currency]
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
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
          justifyContent: 'center',
          gap: [4, 4, 3, 4],
          width: '100%'
        })}
      >
        <ProPricingCard css={theme({ order: [1, 1, 2, 2] })}>
          <PlanName>Pro</PlanName>
          <Text
            css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black60' })}
          >
            For production workloads.
          </Text>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PriceTag prices={monthlyPrice} highlight />
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
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PricePicker onChange={setPlan} />
          </Box>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PlanCheck>Everything in Free</PlanCheck>
            <PlanCheck>
              <Link href='/feature/proxy'>Automatic proxy resolution</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/feature/ttl'>Configurable TTL</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/feature/headers'>Custom HTTP headers</Link>
            </PlanCheck>
            <PlanCheck>
              <Link href='/docs/api/parameters/cacheKey'>Custom cache key</Link>
            </PlanCheck>
            <PlanCheck>Priority email support</PlanCheck>
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
            <PriceTag prices={{ EUR: 0, USD: 0 }} />
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
              <Link href='/docs/api/parameters/adblock'>
                Adblock & cookie banners
              </Link>
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
              {formatPrice(ENTERPRISE_PRICE, currency)} / month
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

      {footer !== 'none' && (
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

          {footer === 'stats' && (
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
          )}

          {footer === 'compare' && (
            <Flex
              css={theme({
                pt: [3, 3, 4, 4],
                flexDirection: ['column', 'row', 'row', 'row'],
                alignItems: 'center',
                justifyContent: 'center',
                gap: [1, 2, 2, 2],
                textAlign: 'center',
                fontSize: [1, 1, 2, 2]
              })}
            >
              <Text as='span' css={theme({ color: 'black60' })}>
                Need more details?
              </Text>
              <ArrowLink href='/pricing'>
                Compare every plan side by side
              </ArrowLink>
            </Flex>
          )}
        </>
      )}
    </Container>
  )
}

export default Plans
