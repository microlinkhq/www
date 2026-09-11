import { formatNumber } from 'helpers/format-number'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components'
import {
  colors,
  fontWeights,
  gradient,
  gradientStops,
  shadows,
  theme,
  transition
} from 'theme'

const BASE_PLAN_PRICE = { EUR: 24, USD: 30 }

const MONTH_DAYS = 28

const calculateMonthlyPrice = reqsPerDay => ({
  EUR: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.EUR),
  USD: Math.round((reqsPerDay / 1000) * BASE_PLAN_PRICE.USD)
})

const createPlanFromMonthly = reqsPerMonthTotal => ({
  reqsPerMonth: formatNumber(reqsPerMonthTotal),
  reqsPerMonthTotal,
  reqsPerMonthPretty: `${formatNumber(Math.round(reqsPerMonthTotal / 1000))}K`,
  monthlyPrice: calculateMonthlyPrice(reqsPerMonthTotal / MONTH_DAYS)
})

const createPlanFromDaily = reqsPerDay =>
  createPlanFromMonthly(reqsPerDay * MONTH_DAYS)

export const PLANS = [
  { id: 'pro-1_625k-v4', ...createPlanFromMonthly(46000) },
  { id: 'pro-3k-v4', ...createPlanFromDaily(3000) },
  { id: 'pro-5k-v4', ...createPlanFromDaily(5000) },
  { id: 'pro-10k-v4', ...createPlanFromDaily(10000) },
  { id: 'pro-15k-v4', ...createPlanFromDaily(15000) }
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
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: ${gradient};
  pointer-events: none;
  transform-origin: left center;
  transition: transform ${transition.short};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const sliderThumb = css`
  width: ${THUMB_SIZE};
  height: ${THUMB_SIZE};
  border-radius: 50%;
  background: ${colors.white};
  border: 2px solid ${gradientStops[1][1]};
  box-shadow: ${shadows[1]};
  transition: transform ${transition.short}, box-shadow ${transition.short};
`

const thumbGlow = css`
  box-shadow: 0 2px 8px ${colors.black20};
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
    ${sliderThumb}
  }

  &::-moz-range-thumb {
    ${sliderThumb}
  }

  &:focus-visible::-webkit-slider-thumb {
    ${thumbGlow}
  }

  &:focus-visible::-moz-range-thumb {
    ${thumbGlow}
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover::-webkit-slider-thumb {
      ${thumbGlow}
    }

    &:hover::-moz-range-thumb {
      ${thumbGlow}
    }
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
  transition: color ${transition.short}, font-weight ${transition.short};

  &[data-active='true'] {
    color: ${colors.black};
    font-weight: ${fontWeights.bold};
  }
`

const DEFAULT_INDEX = PLANS.indexOf(DEFAULT_PLAN)

const MAX_INDEX = PLANS.length - 1

const indexPct = index => (MAX_INDEX > 0 ? (index / MAX_INDEX) * 100 : 0)

const TICK_STYLES = PLANS.map((_, i) => ({ left: `${indexPct(i)}%` }))

const PricePicker = ({ onChange }) => {
  const [index, setIndex] = useState(DEFAULT_INDEX)

  const handleChange = useCallback(
    e => {
      const i = Number(e.target.value)
      setIndex(i)
      onChange(PLANS[i])
    },
    [onChange]
  )

  const fillPct = indexPct(index)
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
        </Text>{' '}
        <Text
          as='span'
          css={theme({ fontSize: [0, 0, 1, 1], color: 'black70', pl: 1 })}
        >
          requests / month
        </Text>
      </Flex>

      <Box css={theme({ px: [2, 2, 3, 3] })}>
        <Box css={theme({ position: 'relative', py: 2 })}>
          <SliderTrack>
            <SliderFill style={{ transform: `scaleX(${fillPct / 100})` }} />
          </SliderTrack>
          <SliderInput
            type='range'
            min={0}
            max={MAX_INDEX}
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
              style={TICK_STYLES[i]}
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
