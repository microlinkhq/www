import React, { useEffect, useState } from 'react'

import uniqueRandomArray from 'unique-random-array'
import range from 'lodash/range'

import { Text, Highlight } from 'components/elements'

import Caption from '../Caption/Caption'

const INTERVAL = 3500

const trimUnit = str => str.replace(/ms|s/, '')

const prettyNumber = n => {
  const str = String(n)
  return str.length === 3 ? `${str}0` : str
}

export default ({ size, value }) => {
  const [average, setAverage] = useState(Number(trimUnit(value)))
  const [averageHighlight, setAverageHighlight] = useState(false)
  const [unit] = useState(value.includes('ms') ? 'msecs' : 'secs')

  const top = average * 0.3
  const bottom = average * 0.3 * -1
  const steps = average * 0.1

  const timingsRange = range(bottom, top, steps)
  const rand = uniqueRandomArray(timingsRange)

  useEffect(() => {
    const interval = setInterval(() => {
      const newAverage = average + rand(timingsRange)
      setAverage(newAverage.toFixed(unit === 'secs' ? 2 : 0))
      setAverageHighlight(true)
      setTimeout(() => setAverageHighlight(false), Highlight.HIGHLIGHT_DURATION)
    }, INTERVAL)
    return () => clearInterval(interval)
  }, [])

  if (size === 'tiny') {
    return (
      <Highlight display='inline' isHighlight={averageHighlight}>
        <Text as='span' px='2px' color='black80' fontWeight='bold'>
          {prettyNumber(average)} {unit}
        </Text>
      </Highlight>
    )
  }

  return (
    <Highlight px={3} isHighlight={averageHighlight}>
      <Text as='span' fontSize={6}>
        {prettyNumber(average)}
      </Text>
      <Caption
        ml={2}
        color='white'
        display='inline'
        fontWeight='bold'
        titleize={false}
      >
        {unit}
      </Caption>
    </Highlight>
  )
}
