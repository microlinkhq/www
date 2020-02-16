import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Box, Card } from 'components/elements'
import { Lighthouse } from 'components/patterns'

const data = {
  'first-contentful-paint': {
    title: 'First Contentful Paint',
    score: 100,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  'speed-index': {
    title: 'Speed Index',
    score: 60,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  'first-meaningful-paint': {
    title: 'First Meaningful Paint',
    score: 40,
    duration: 2084.584,
    duration_pretty: '2.1s'
  },
  interactive: {
    title: 'Time to Interactive',
    score: 10,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  },
  'first-cpu-idle': {
    title: 'First CPU Idle',
    score: 0,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  }
}

const code = `
import { Lighthouse } from 'components/patterns'

export default () => (
  <Lighthouse data={${JSON.stringify(data, null, 2)}} />
)
`

storiesOf('Patterns', module).add('Lighthouse', () => (
  <>
    <Story name='Lighthouse' code={code} width='800px'>
      <Box px={4}>
        <Lighthouse data={data} />
      </Box>
      <Box pt={4} />
      <Lighthouse
        component={Card}
        data={data}
        width='800px'
        height='inherit'
        p={3}
      />
    </Story>
  </>
))
