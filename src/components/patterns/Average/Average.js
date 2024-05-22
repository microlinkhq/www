import { Text, Highlight } from 'components/elements'
import uniqueRandomArray from 'unique-random-array'
import React, { useEffect, useState } from 'react'
import range from 'lodash/range'
import { theme } from 'theme'

import Caption from '../Caption/Caption'

const INTERVAL = 3500

const trimUnit = str => str.replace(/ms|s/, '')

const prettyNumber = str => (str.length === 3 ? `${str}0` : str)

const Average = ({ size, value }) => {
  const base = Number(trimUnit(value))
  const bottom = base - base * 0.2
  const top = base + base * 0.15
  const steps = base * 0.1

  const unit = value.includes('ms') ? 'msecs' : 'secs'
  const values = range(bottom, top, steps).map(value =>
    value.toFixed(unit === 'secs' ? 2 : 0)
  )

  const rand = uniqueRandomArray(values)
  const [average, setAverage] = useState(rand())

  useEffect(() => {
    const interval = setInterval(() => setAverage(rand()), INTERVAL)
    return () => clearInterval(interval)
  }, [rand])

  if (size === 'tiny') {
    return (
      <Highlight display='inline'>
        <Text
          as='span'
          css={theme({ px: '2px', color: 'black80', fontWeight: 'bold' })}
        >
          {prettyNumber(average)} {unit}
        </Text>
      </Highlight>
    )
  }

  return (
    <Highlight css={theme({ px: 3 })}>
      <Text as='span' css={theme({ fontSize: 6, fontWeight: 'bold' })}>
        {prettyNumber(average)}
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
