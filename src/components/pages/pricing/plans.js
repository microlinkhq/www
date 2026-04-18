import React, { useState } from 'react'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Highlight from 'components/elements/Highlight'
import { Link } from 'components/elements/Link'
import PricePicker, { DEFAULT_PLAN } from 'components/elements/PricePicker'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import ArrowLink from 'components/patterns/ArrowLink'
import Checkout from 'components/patterns/Checkout'
import { formatNumber } from 'helpers/format-number'
import { borders, colors, gradient, theme } from 'theme'

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const FREE_PLAN_RATE_LIMIT = 50

// shared card surface (mirrors screenshot.js PricingCard)
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
  border: ${borders[1]};
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

const Check = ({ accent = 'black60', children }) => (
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

const PriceTag = ({ amount, suffix = '/month', ariaLabel }) => (
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
      €
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
      {amount}
    </Text>
    <Text css={theme({ fontSize: [0, 0, 1, 1], color: 'black60' })}>
      {suffix}
    </Text>
  </Flex>
)

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

const Plans = ({ canonicalUrl, stripeKey, apiEndpoint }) => {
  const [plan, setPlan] = useState(DEFAULT_PLAN)
  const { monthlyPrice, id: planId, reqsPerMonth } = plan
  const humanMonthlyPrice = formatNumber(monthlyPrice)
  const reqsPerMonthNumber = Number(reqsPerMonth.replace(/,/g, ''))
  const pricePer1k = (monthlyPrice / (reqsPerMonthNumber / 1000)).toFixed(2)

  return (
    <Container
      as='section'
      id='pricing-plans'
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
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
          justifyContent: 'center',
          gap: [4, 4, 3, 4],
          width: '100%'
        })}
      >
        {/* Pro: order 1 mobile, 2 desktop */}
        <ProPricingCard css={theme({ order: [1, 1, 2, 2] })}>
          <Pill>
            <Caps css={theme({ fontSize: 0, letterSpacing: 2 })}>
              Most popular
            </Caps>
          </Pill>

          <PlanName>Pro</PlanName>
          <Text
            css={theme({
              pt: 2,
              fontSize: [1, 1, 2, 2],
              color: 'black60'
            })}
          >
            For production workloads that scale.
          </Text>

          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PriceTag
              amount={<Highlight as='span'>{humanMonthlyPrice}</Highlight>}
              ariaLabel={`${humanMonthlyPrice} euros per month`}
            />
            <Text
              css={theme({
                pt: 2,
                fontSize: 0,
                color: 'pink7',
                fontWeight: 'bold',
                fontVariantNumeric: 'tabular-nums'
              })}
            >
              ≈ €{pricePer1k} per 1,000 requests
            </Text>
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
            <Check accent='pink7'>Everything in Free</Check>
            <Check accent='pink7'>
              <Link href='/docs/api/parameters/ttl'>Configurable TTL</Link>
            </Check>
            <Check accent='pink7'>
              <Link href='/docs/api/parameters/headers'>
                Custom HTTP headers
              </Link>
            </Check>
            <Check accent='pink7'>
              <Link href='/docs/api/parameters/proxy'>
                Automatic proxy resolution
              </Link>
            </Check>
            <Check accent='pink7'>
              <Link href='/docs/api/parameters/adblock'>
                Adblock & cookie banners
              </Link>
            </Check>
            <Check accent='pink7'>Priority email support</Check>
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

        {/* Free: order 2 mobile, 1 desktop */}
        <PricingCard css={theme({ order: [2, 2, 1, 1] })}>
          <PlanName>Free</PlanName>
          <Text
            css={theme({
              pt: 2,
              fontSize: [1, 1, 2, 2],
              color: 'black60'
            })}
          >
            Try the API in seconds. No login, no card.
          </Text>

          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <PriceTag amount='0' ariaLabel='0 euros per month' />
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
            <Check>50 requests / day</Check>
            <Check>
              <Link href='/screenshot'>Screenshot</Link>,{' '}
              <Link href='/pdf'>PDF</Link>, <Link href='/sdk'>SDK</Link>
            </Check>
            <Check>
              <Link href='/metadata'>Metadata</Link>,{' '}
              <Link href='/insights'>insights</Link>,{' '}
              <Link href='/recipes'>recipes</Link>
            </Check>
            <Check>Global edge cache</Check>
            <Check>Community support</Check>
          </Box>

          <Box css={theme({ pt: [4, 4, 5, 5], mt: 'auto' })}>
            <Button
              as='a'
              href='/docs/api/getting-started/overview'
              variant='black'
              css={theme({ width: '100%' })}
              data-event-location='Pricing'
              data-event-name='Get started free'
            >
              <Caps css={theme({ fontSize: [0, 0, 1, 1] })}>
                Get started free
              </Caps>
            </Button>
          </Box>
        </PricingCard>

        {/* Enterprise: order 3 always */}
        <PricingCard css={theme({ order: 3 })}>
          <PlanName>Enterprise</PlanName>
          <Text
            css={theme({
              pt: 2,
              fontSize: [1, 1, 2, 2],
              color: 'black60'
            })}
          >
            Dedicated infra for high-volume teams.
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
            <Text
              css={theme({
                pt: 2,
                fontSize: 0,
                color: 'black60'
              })}
            >
              From €500 / month
            </Text>
          </Box>

          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <Check>Everything in Pro</Check>
            <Check>
              <Link href='/enterprise'>Custom API endpoint</Link>
            </Check>
            <Check>
              <Link href='/enterprise'>Dedicated CDN distribution</Link>
            </Check>
            <Check>
              <Link href='/enterprise'>S3-like storage integration</Link>
            </Check>
            <Check>Custom SLA & DPA available</Check>
          </Box>

          <Box
            css={theme({
              pt: [4, 4, 5, 5],
              mt: 'auto',
              display: 'flex',
              justifyContent: 'center'
            })}
          >
            <ArrowLink href='/enterprise'>Talk to sales</ArrowLink>
          </Box>
        </PricingCard>
      </Flex>

      <Text
        css={theme({
          pt: [4, 4, 5, 5],
          fontSize: [0, 0, 1, 1],
          color: 'black60',
          textAlign: 'center'
        })}
      >
        Every plan includes API access, the same global edge network, and 24/7
        monitoring. Prices in EUR, excl. VAT.
      </Text>
    </Container>
  )
}

export default Plans
