import React, { useEffect, useState } from 'react'

import uniqueRandomArray from 'unique-random-array'
import range from 'lodash/range'

import { Text, Highlight } from 'components/elements'

import Caption from '../Caption/Caption'

const INTERVAL = 3500

export default ({ size, value }) => {
  const [average, setAverage] = useState(Number(value.replace(/ms|s/, '')))
  const [averageHighlight, setAverageHighlight] = useState(false)
  const [unit] = useState(value.includes('ms') ? 'mseg' : 'seg')

  const top = average * 0.3
  const bottom = average * 0.3 * -1
  const steps = average * 0.1

  const timingsRange = range(bottom, top, steps)
  const rand = uniqueRandomArray(timingsRange)

  useEffect(() => {
    const interval = setInterval(() => {
      const newAverage = average + rand(timingsRange)
      setAverage(newAverage.toFixed(unit === 'seg' ? 2 : 0))
      setAverageHighlight(true)
      setTimeout(() => setAverageHighlight(false), Highlight.HIGHLIGHT_DURATION)
    }, INTERVAL)
    return () => clearInterval(interval)
  }, [])

  if (size === 'tiny') {
    return (
      <Highlight display='inline' isHighlight={averageHighlight}>
        <Text as='span' color='black80' fontWeight='bold'>
          {average} {unit}
        </Text>
      </Highlight>
    )
  }

  return (
    <Highlight px={3} isHighlight={averageHighlight}>
      <span>{average}</span>
      <Caption
        ml={2}
        color='white'
        display='inline'
        fontWeight='bold'
        titleize={false}
        children={unit}
      />
    </Highlight>
  )
}
