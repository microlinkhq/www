import Text from 'components/elements/Text'
import Highlight from 'components/elements/Highlight'
import uniqueRandomArray from 'unique-random-array'
import React, { useEffect, useState, useMemo } from 'react'
import { useMounted } from 'components/hook/use-mounted'
import range from 'lodash/range'
import { theme } from 'theme'

import Caption from '../Caption/Caption'

const INTERVAL = 3500

const trimUnit = str => str.replace(/ms|s/, '')

const prettyNumber = str => (str.length === 3 ? `${str}0` : str)

const Average = ({ size, value }) => {
  const isMounted = useMounted()
  const base = Number(trimUnit(value))
  const bottom = base - base * 0.2
  const top = base + base * 0.15
  const steps = base * 0.1

  const unit = value.includes('ms') ? 'msecs' : 'secs'
  const values = useMemo(
    () =>
      range(bottom, top, steps).map(value =>
        value.toFixed(unit === 'secs' ? 2 : 0)
      ),
    [bottom, top, steps, unit]
  )

  const rand = useMemo(() => uniqueRandomArray(values), [values])
  const [average, setAverage] = useState(null)

  useEffect(() => {
    if (!isMounted) return
    setAverage(rand())
    const interval = setInterval(() => setAverage(rand()), INTERVAL)
    return () => clearInterval(interval)
  }, [isMounted, rand])

  const displayValue =
    isMounted && average ? prettyNumber(average) : trimUnit(value)

  if (size === 'tiny') {
    return (
      <Highlight display='inline'>
        <Text
          as='span'
          css={theme({ px: '2px', color: 'black80', fontWeight: 'bold' })}
        >
          {displayValue} {unit}
        </Text>
      </Highlight>
    )
  }

  return (
    <Highlight css={theme({ px: 3 })}>
      <Text as='span' css={theme({ fontSize: 6, fontWeight: 'bold' })}>
        {displayValue}
      </Text>
      <Caption
        css={theme({
          ml: 2,
          color: 'white',
          display: 'inline',
          fontWeight: 'bold'
        })}
      >
        {unit}
      </Caption>
    </Highlight>
  )
}

export default Average
