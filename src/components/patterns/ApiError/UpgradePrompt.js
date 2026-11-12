import React from 'react'
import { theme } from 'theme'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { PLANS } from 'helpers/pro-plans'
import { Facts } from 'components/patterns/CallToAction/free-key'
import Checkout from 'components/patterns/Checkout'
import { CURRENCIES, formatPrice } from 'components/patterns/Plans/shared'
import {
  CurrencyProvider,
  useCurrencyContext
} from 'components/hook/use-currency'
import { useSiteMetadata } from 'components/hook/use-site-meta'
import { isRateLimited } from 'helpers/api-error'
import { KEYLESS_REQUESTS_PER_DAY } from 'helpers/free-tier'

export const ENTRY_PLAN = PLANS.reduce((cheapest, plan) =>
  plan.monthlyPrice.USD < cheapest.monthlyPrice.USD ? plan : cheapest
)

const PROMPTS = {
  EPROXYNEEDED: {
    slug: 'antibot',
    title: 'This site blocks bots',
    body: 'Anonymous requests can’t get past its antibot protection. On Pro, the request goes through our proxy and the page resolves.'
  },
  ERATE: {
    slug: 'rate-limit',
    title: 'Daily limit reached',
    body: `You’ve used today’s ${KEYLESS_REQUESTS_PER_DAY} anonymous requests. Pro gives you ${ENTRY_PLAN.reqsPerMonth} requests a month.`
  }
}

const ENTRY_PLAN_FACTS = [
  `${ENTRY_PLAN.reqsPerMonth} requests/month`,
  'Proxy included',
  'Cancel anytime'
]

export const hasUpgradePrompt = code => Object.hasOwn(PROMPTS, code)

export const upgradeCodeFor = error => {
  const rateLimited =
    isRateLimited(error?.code) || isRateLimited(error?.statusCode)
  if (rateLimited) return error?.keyed ? null : 'ERATE'
  return hasUpgradePrompt(error?.code) ? error.code : null
}

const EntryPlanCheckout = ({ cta }) => {
  const { canonicalUrl } = useSiteMetadata()
  const [currency] = useCurrencyContext()
  const price = formatPrice(ENTRY_PLAN.monthlyPrice, currency)
  const { symbol } = CURRENCIES[currency]

  return (
    <Checkout
      planId={ENTRY_PLAN.id}
      canonicalUrl={canonicalUrl}
      cta={cta}
      css={theme({
        mt: 4,
        px: 4,
        py: 3,
        fontSize: 1,
        borderRadius: 3,
        boxShadow: 2,
        whiteSpace: 'normal'
      })}
    >
      Get Pro for {symbol}
      {price}/month
    </Checkout>
  )
}

export const UpgradePrompt = ({ code, source }) => {
  const { slug, title, body } = PROMPTS[code]

  return (
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '520px'
      })}
    >
      <Text css={theme({ color: 'black', fontWeight: 'bold', fontSize: 3 })}>
        {title}
      </Text>
      <Text
        css={theme({
          pt: 2,
          fontSize: 2,
          color: 'black60',
          textWrap: 'balance'
        })}
      >
        {body}
      </Text>
      <CurrencyProvider>
        <EntryPlanCheckout cta={`${source}:${slug}`} />
      </CurrencyProvider>
      <Facts facts={ENTRY_PLAN_FACTS} />
    </Flex>
  )
}
