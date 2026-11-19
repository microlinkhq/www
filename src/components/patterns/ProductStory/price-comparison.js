import React from 'react'
import styled from 'styled-components'
import { Check as CheckIcon, Minus as MinusIcon } from 'react-feather'
import { breakpoints, colors, gradient, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import ArrowLink from 'components/patterns/ArrowLink'
import { SignupLink } from 'components/patterns/SignupLink'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { formatNumber } from 'helpers/format-number'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import { DEFAULT_PLAN } from 'helpers/pro-plans'

import { Section, SectionHeader, SectionNote } from './section'

const PRICE_FONT_SIZE = [4, 4, 5, 5]
const NBSP = '\u00a0'

const DEFAULT_CURRENCY = 'USD'

export const microlinkPlan = (currency = DEFAULT_CURRENCY) => ({
  name: 'Microlink',
  price: DEFAULT_PLAN.monthlyPrice[currency],
  volume: `${formatNumber(DEFAULT_PLAN.reqsPerMonthTotal)}${NBSP}requests/month`
})

export const MICROLINK_PLAN = microlinkPlan()

const hasCents = amount => !Number.isInteger(amount)

export const formatPrice = (
  amount,
  currency = DEFAULT_CURRENCY,
  { cents = hasCents(amount) } = {}
) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: 2
  }).format(amount)

const THOUSAND = 1000
const CENTS = 100

export const formatPerThousand = (price, quota, unit, currency) => {
  const perThousand = Math.round((price * CENTS * THOUSAND) / quota) / CENTS
  const cents = hasCents(price) || hasCents(perThousand)
  return `${formatPrice(perThousand, currency, { cents })} per ${formatNumber(
    THOUSAND
  )} ${unit}`
}

export const microlinkFacts = (currency = DEFAULT_CURRENCY) => ({
  pricePerThousand: formatPerThousand(
    DEFAULT_PLAN.monthlyPrice[currency],
    DEFAULT_PLAN.reqsPerMonthTotal,
    'requests',
    currency
  ),
  freeTier: `Free plan: ${FREE_PLAN_REQUESTS_PER_DAY}${NBSP}requests/day, renews daily, no${NBSP}credit${NBSP}card`,
  noRateCap: 'No rate limit on paid plans',
  edge: `${CDN_EDGES} edge nodes, 99.9%${NBSP}SLA`,
  openSource: 'Open-source core (MIT)'
})

const competitorVolume = ({ quota, unit, volume }) =>
  quota ? `${formatNumber(quota)}${NBSP}${unit}/month` : volume

const competitorItems = ({ price, quota, unit, items = [] }, currency) =>
  quota ? [formatPerThousand(price, quota, unit, currency), ...items] : items

export const formatCheckedAt = date =>
  new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(date))

const microlinkItems = (currency, pageItems = []) => {
  const { pricePerThousand, ...facts } = microlinkFacts(currency)
  return [pricePerThousand, ...pageItems, ...Object.values(facts)]
}

const hostnameOf = href => new URL(href).hostname.replace(/^www\./, '')

const PlanGrid = styled(Box)`
  ${theme({
    display: 'grid',
    gap: [3, 3, 4, 4],
    width: '100%',
    maxWidth: layout.normal,
    mx: 'auto'
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const PlanCard = styled(Flex).attrs({ as: 'article' })`
  ${theme({
    flexDirection: 'column',
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    boxShadow: 1,
    p: [3, 3, 4, 4]
  })}

  &[data-featured='true'] {
    ${theme({ boxShadow: 2 })}
    border: 2px solid transparent;
    background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
      ${gradient} border-box;
  }
`

const PlanName = styled(Text).attrs({ as: 'h3' })`
  ${theme({
    alignSelf: 'flex-start',
    m: 0,
    px: 2,
    borderRadius: 5,
    fontSize: 0,
    fontWeight: 'bold',
    lineHeight: 2,
    bg: 'black05',
    color: 'black70'
  })}

  [data-featured='true'] > & {
    ${theme({ bg: 'pink0', color: 'secondary' })}
  }
`

const PlanItems = styled(Box).attrs({ as: 'ul' })`
  ${theme({ m: 0, pt: 3, pl: 0, listStyle: 'none' })}
`

export const missing = text => ({ missing: true, text })

export const isMissing = item => item?.missing === true

const itemColor = ({ featured, absent }) => {
  if (absent) return 'black50'
  return featured ? 'black80' : 'black70'
}

const iconColor = ({ featured, absent }) => {
  if (absent) return 'black30'
  return featured ? 'secondary' : 'black40'
}

const PlanItem = ({ featured, absent, children }) => (
  <Flex as='li' css={theme({ alignItems: 'flex-start', gap: 2, pb: 2 })}>
    <FeatherIcon
      aria-hidden='true'
      icon={absent ? MinusIcon : CheckIcon}
      size='16px'
      css={theme({
        flexShrink: 0,
        mt: '6px',
        color: iconColor({ featured, absent })
      })}
    />
    <Text
      as='span'
      css={theme({
        fontSize: 1,
        lineHeight: 2,
        color: itemColor({ featured, absent }),
        textWrap: 'pretty'
      })}
    >
      {children}
    </Text>
  </Flex>
)

const PlanFooter = styled(Flex)`
  ${theme({
    mt: 'auto',
    pt: 3,
    columnGap: 3,
    rowGap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    fontSize: 1,
    whiteSpace: 'nowrap'
  })}
`

const PlanPrice = ({ price, currency, period }) => (
  <Text
    css={theme({
      pt: 3,
      fontSize: PRICE_FONT_SIZE,
      fontWeight: 'bold',
      lineHeight: 0,
      color: 'black',
      fontVariantNumeric: 'tabular-nums'
    })}
  >
    {formatPrice(price, currency)}
    <Text
      as='span'
      css={theme({
        pl: 1,
        fontSize: 1,
        fontWeight: 'normal',
        color: 'black60'
      })}
    >
      {period}
    </Text>
  </Text>
)

const Plan = ({
  name,
  price,
  currency,
  period = 'per month',
  volume,
  items = [],
  featured = false,
  footer
}) => (
  <PlanCard data-featured={featured} aria-label={`${name} pricing`}>
    <PlanName>{name}</PlanName>
    <PlanPrice price={price} currency={currency} period={period} />
    <Text
      css={theme({
        pt: 2,
        fontSize: 2,
        fontWeight: 'bold',
        lineHeight: 1,
        color: 'black80',
        textWrap: 'balance'
      })}
    >
      {volume}
    </Text>
    {items.length > 0 && (
      <PlanItems>
        {items.map(item =>
          isMissing(item)
            ? (
              <PlanItem key={item.text} featured={featured} absent>
                {item.text}
              </PlanItem>
              )
            : (
              <PlanItem
                key={typeof item === 'string' ? item : item.key}
                featured={featured}
              >
                {item}
              </PlanItem>
              )
        )}
      </PlanItems>
    )}
    <PlanFooter>{footer}</PlanFooter>
  </PlanCard>
)

const MicrolinkActions = ({ cta, secondaryHref, secondaryLabel }) => (
  <>
    <SignupLink cta={cta}>Get your free API key</SignupLink>
    {secondaryHref && (
      <ArrowLink href={secondaryHref}>{secondaryLabel}</ArrowLink>
    )}
  </>
)

const NoWrap = ({ children }) => (
  <Text as='span' css={theme({ whiteSpace: 'nowrap', fontSize: 'inherit' })}>
    {children}
  </Text>
)

const CompetitorSource = ({ source, checkedAt }) => (
  <Text
    css={theme({
      fontSize: 0,
      color: 'black60',
      whiteSpace: 'normal',
      textWrap: 'balance'
    })}
  >
    <NoWrap>
      Price checked{' '}
      <time dateTime={checkedAt}>{formatCheckedAt(checkedAt)}</time>
    </NoWrap>{' '}
    <NoWrap>
      on <Link href={source}>{hostnameOf(source)}</Link>
    </NoWrap>
  </Text>
)

export const ProductPriceComparison = ({
  currency = DEFAULT_CURRENCY,
  title,
  caption,
  microlink,
  competitor,
  note
}) => (
  <Section id='pricing' bg='pinky'>
    <SectionHeader title={title} caption={caption} />
    <PlanGrid>
      <Plan
        {...microlinkPlan(currency)}
        currency={currency}
        items={microlinkItems(currency, microlink.items)}
        featured
        footer={<MicrolinkActions {...microlink} />}
      />
      <Plan
        {...competitor}
        volume={competitorVolume(competitor)}
        items={competitorItems(competitor, currency)}
        currency={currency}
        footer={
          <CompetitorSource
            source={competitor.source}
            checkedAt={competitor.checkedAt}
          />
        }
      />
    </PlanGrid>
    {note && <SectionNote>{note}</SectionNote>}
  </Section>
)
