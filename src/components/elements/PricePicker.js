import { formatNumber } from 'helpers/format-number'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { colors, gradient, theme } from 'theme'

const BASE_PLAN_PRICE = { EUR: 24, USD: 30 }

const MONTH_DAYS = 28

const calculateMonthlyPrice = reqsPerDay => ({
  EUR: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.EUR),
  USD: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.USD)
})

const createReqsLabels = reqsPerDay => {
  const total = reqsPerDay * MONTH_DAYS
  const reqsPerMonth = formatNumber(total)
  const pretty = Math.round(total / 1000)
  const reqsPerMonthPretty = `${formatNumber(pretty)}K`

  return {
    reqsPerMonth,
    reqsPerMonthPretty,
    monthlyPrice: calculateMonthlyPrice(reqsPerDay)
  }
}

const overrideReqsPerMonth = (plan, reqsPerMonth) => {
  const total = Number(reqsPerMonth.replace(/,/g, ''))
  const reqsPerDay = total / MONTH_DAYS
  const pretty = Math.round(total / 1000)
  return {
    ...plan,
    reqsPerMonth,
    reqsPerMonthPretty: `${formatNumber(pretty)}K`,
    monthlyPrice: calculateMonthlyPrice(reqsPerDay)
  }
}

export const PLANS = [
  overrideReqsPerMonth(
    { id: 'pro-1625-v3', ...createReqsLabels(1625) },
    '46,000'
  ),
  { id: 'pro-3k-v3', ...createReqsLabels(3000) },
  { id: 'pro-5k-v3', ...createReqsLabels(5000) },
  { id: 'pro-10k-v3', ...createReqsLabels(10000) },
  { id: 'pro-15k-v3', ...createReqsLabels(15000) }
]

export const DEFAULT_PLAN = PLANS[0]

const TRACK_HEIGHT = '6px'
const THUMB_SIZE = '20px'

const SliderTrack = styled(Box)`
  position: relative;
  width: 100%;
  height: ${TRACK_HEIGHT};
  border-radius: 999px;
  background: ${colors.black10};
`

const SliderFill = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 999px;
  background: ${gradient};
  pointer-events: none;
  transition: width 120ms ease;
`

const SliderInput = styled('input')`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: ${THUMB_SIZE};
  margin: 0;
  transform: translateY(-50%);
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  outline: none;
  z-index: 1;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: ${THUMB_SIZE};
    height: ${THUMB_SIZE};
    border-radius: 50%;
    background: ${colors.white};
    border: 2px solid #c03fa2;
    box-shadow: 0 1px 4px ${colors.black10};
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  &::-moz-range-thumb {
    width: ${THUMB_SIZE};
    height: ${THUMB_SIZE};
    border-radius: 50%;
    background: ${colors.white};
    border: 2px solid #c03fa2;
    box-shadow: 0 1px 4px ${colors.black10};
    transition: transform 120ms ease, box-shadow 120ms ease;
  }

  &:hover::-webkit-slider-thumb,
  &:focus::-webkit-slider-thumb {
    transform: scale(1.15);
    box-shadow: 0 2px 8px ${colors.black20};
  }

  &:hover::-moz-range-thumb,
  &:focus::-moz-range-thumb {
    transform: scale(1.15);
    box-shadow: 0 2px 8px ${colors.black20};
  }

  &::-moz-range-track {
    background: transparent;
    border: 0;
  }
`

const TickLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    color: 'black40',
    fontVariantNumeric: 'tabular-nums',
    userSelect: 'none'
  })}
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
  transition: color 120ms ease, font-weight 120ms ease;

  &[data-active='true'] {
    color: ${colors.black};
    font-weight: bold;
  }
`

const DEFAULT_INDEX = PLANS.indexOf(DEFAULT_PLAN)

const PricePicker = ({ onChange }) => {
  const [index, setIndex] = useState(DEFAULT_INDEX)
  const max = PLANS.length - 1

  const handleChange = useCallback(
    e => {
      const i = Number(e.target.value)
      setIndex(i)
      onChange(PLANS[i])
    },
    [onChange]
  )

  const fillPct = max > 0 ? (index / max) * 100 : 0
  const plan = PLANS[index]

  return (
    <Box css={theme({ width: '100%' })}>
      <Flex
        css={theme({
          alignItems: 'baseline',
          pb: 3
        })}
      >
        <Text
          as='span'
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            fontWeight: 'bold',
            color: 'black',
            fontVariantNumeric: 'tabular-nums'
          })}
        >
          {plan.reqsPerMonth}
        </Text>
        <Text
          as='span'
          css={theme({ fontSize: [0, 0, 1, 1], color: 'black60', pl: 1 })}
        >
          requests / month
        </Text>
      </Flex>

      <Box css={theme({ px: [2, 2, 3, 3] })}>
        <Box css={theme({ position: 'relative', py: 2 })}>
          <SliderTrack>
            <SliderFill style={{ width: `${fillPct}%` }} />
          </SliderTrack>
          <SliderInput
            type='range'
            min={0}
            max={max}
            step={1}
            value={index}
            onChange={handleChange}
            aria-label={`${plan.reqsPerMonth} requests per month`}
            aria-valuetext={`${plan.reqsPerMonthPretty} requests per month`}
          />
        </Box>

        <Box
          css={theme({ position: 'relative', height: '20px', mt: 1 })}
          aria-hidden='true'
        >
          {PLANS.map((p, i) => (
            <TickLabel
              key={p.id}
              as='span'
              data-active={i === index}
              style={{ left: `${max > 0 ? (i / max) * 100 : 0}%` }}
            >
              {p.reqsPerMonthPretty}
            </TickLabel>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default PricePicker
