import React from 'react'
import styled from 'styled-components'
import { Check as CheckIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Highlight from 'components/elements/Highlight'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import { useCurrencyContext } from 'components/hook/use-currency'
import { colors, gradient, theme } from 'theme'

export const CURRENCIES = {
  USD: { symbol: '$', word: 'dollars' },
  EUR: { symbol: '€', word: 'euros' }
}

export const formatPrice = (prices, currencyCode) => {
  const value = typeof prices === 'number' ? prices : prices[currencyCode]
  return value.toFixed(0)
}

export const planDisplay = (activePlan, id) =>
  activePlan === id ? 'flex' : ['none', 'none', 'flex', 'flex']

export const PricingCard = styled(Flex)`
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

export const ProPricingCard = styled(PricingCard)`
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  position: relative;
  @media (min-width: 1200px) {
    transform: translateY(-12px);
  }
`

export const PlanCheckList = styled(Box)`
  ${theme({ m: 0, p: 0 })}
  list-style: none;
`

export const PlanCheck = ({ children }) => (
  <Flex as='li' css={theme({ alignItems: 'center', gap: 2, pt: 2 })}>
    <FeatherIcon
      data-icon='check'
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

export const PriceTag = ({ prices, highlight = false }) => {
  const [currency] = useCurrencyContext()
  const { symbol, word } = CURRENCIES[currency]
  const amount = formatPrice(prices, currency)
  const ariaLabel = `${amount} ${word} per month`

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
        {highlight ? <Highlight as='span'>{amount}</Highlight> : amount}
      </Text>
      <Text as='span' css={theme({ fontSize: [0, 0, 1, 1], color: 'black70' })}>
        /month
      </Text>
    </Flex>
  )
}

export const PlanName = ({ children }) => (
  <Text
    as='h3'
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

export const PlanTagline = ({ children }) => (
  <Text css={theme({ pt: 2, fontSize: [1, 1, 2, 2], color: 'black70' })}>
    {children}
  </Text>
)

export const PlanAction = ({ children }) => (
  <Box
    css={theme({
      pt: [4, 4, 5, 5],
      mt: 'auto',
      display: 'flex',
      justifyContent: 'center',
      fontSize: [1, 1, 2, 2]
    })}
  >
    {children}
  </Box>
)
