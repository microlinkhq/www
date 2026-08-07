import React from 'react'
import { layout, theme } from 'theme'

import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import TimingsBand from 'components/patterns/Timings'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { trimMs } from 'helpers/trim-ms'

import { Subhead, Caption } from './shared'

const STAT_VALUE_FONT_SIZE = ['20px', '26px', '32px', '32px']
const STAT_LABEL_FONT_SIZE = ['12px', 1, 1, 1]

const Stat = ({ value, unit, label }) => (
  <Flex
    css={theme({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    })}
  >
    <Subhead
      forwardedAs='div'
      css={theme({
        fontSize: STAT_VALUE_FONT_SIZE,
        color: 'white',
        fontWeight: 'bold'
      })}
    >
      {value}
      {unit && (
        <Caption
          forwardedAs='div'
          titleize={false}
          css={theme({
            ml: 1,
            color: 'white',
            display: 'inline',
            fontWeight: 'bold'
          })}
        >
          {unit}
        </Caption>
      )}
    </Subhead>
    <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
      <Caps css={theme({ fontWeight: 'bold', fontSize: STAT_LABEL_FONT_SIZE })}>
        {label}
      </Caps>
    </Caption>
  </Flex>
)

const Title = ({ title, subtitle }) => (
  <Flex
    css={theme({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    })}
  >
    <Subhead css={theme({ color: 'white' })}>
      {title}{' '}
      <span css={theme({ display: 'block', color: 'white60' })}>
        {subtitle}
      </span>
    </Subhead>
  </Flex>
)

const Stats = ({ stats }) => (
  <Flex
    css={theme({
      pt: [3, 3, 4, 4],
      justifyContent: 'center',
      alignItems: 'baseline',
      width: '100%',
      maxWidth: layout.large,
      gap: [3, 4, 5, 5],
      fontVariantNumeric: 'tabular-nums'
    })}
  >
    {stats.map(stat => (
      <Stat key={stat.label} {...stat} />
    ))}
  </Flex>
)

const fromHealthcheck = pretty => ({
  value: trimMs(pretty),
  unit: pretty.endsWith('ms') ? 'ms' : 'secs'
})

export const ProductTimings = ({ accent, title, subtitle, stats }) => {
  const healthcheck = useHealthcheck()

  const resolvedStats = stats.map(({ healthcheckKey, ...stat }) =>
    healthcheckKey
      ? { ...stat, ...fromHealthcheck(healthcheck[healthcheckKey].p95_pretty) }
      : stat
  )

  return (
    <TimingsBand
      accent={accent}
      title={<Title title={title} subtitle={subtitle} />}
      stats={<Stats stats={resolvedStats} />}
    />
  )
}
