import React from 'react'
import get from 'dlv'

import { Text, Flex } from 'components/elements'
import { getColor } from '../Lighthouse/Lighthouse'

// https://github.com/paulirish/lh-scorecalc/blob/master/script.js#L11
const getScore = data => {
  const score =
    get(data, 'first-contentful-paint.score') * 0.2 +
    get(data, 'speed-index.score') * 0.26666 +
    get(data, 'first-meaningful-paint.score') * 0.066666 +
    get(data, 'interactive.score') * 0.33333 +
    get(data, 'first-cpu-idle.score') * 0.133333

  return score.toFixed(0)
}

export default ({ data, ...props }) => {
  const score = getScore(data)
  return (
    <Flex flexDirection='column' {...props}>
      <Flex justifyContent='center' pb={2}>
        <Text
          fontWeight='regular'
          fontSize={7}
          color={getColor(score)}
          style={{ lineHeight: 1 }}
          children={score}
        />
        <Text
          color='gray5'
          fontSize={3}
          fontWeight='regular'
          children='/ 100'
          style={{ alignSelf: 'flex-end' }}
        />
      </Flex>
      <Flex borderTop={2} borderColor='gray3' pt={2} flexDirection='row'>
        <Text fontWeight='regular' mr={3} color='gray5'>
          FCP:{' '}
          <Text as='span' fontWeight='regular' color='black70'>
            {get(data, 'first-contentful-paint.duration_pretty')}
          </Text>
        </Text>
        <Text fontWeight='regular' mr={3} color='gray5'>
          TTI:{' '}
          <Text as='span' fontWeight='regular' color='black70'>
            {get(data, 'interactive.duration_pretty')}
          </Text>
        </Text>
        <Text fontWeight='regular' color='gray5'>
          FMP:{' '}
          <Text as='span' fontWeight='regular' color='black70'>
            {get(data, 'first-meaningful-paint.duration_pretty')}
          </Text>
        </Text>
      </Flex>
    </Flex>
  )
}
