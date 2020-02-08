import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Box, Card } from 'components/elements'
import { Lighthouse } from 'components/patterns'

const data = [
  {
    text: 'First Contentful Paint',
    score: 100,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  {
    text: 'Speed Index',
    score: 60,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  {
    text: 'First Meaningful Paint',
    score: 40,
    duration: 2084.584,
    duration_pretty: '2.1s'
  },
  {
    text: 'Time to Interactive',
    score: 10,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  },
  {
    text: 'First CPU Idle',
    score: 0,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  }
]

const code = `
import { List } from 'components/patterns'

export default () => (
  <Lighthouse data={${JSON.stringify(data, null, 2)}} />
)
`

storiesOf('Patterns', module).add('Lighthouse', () => (
  <>
    <Story name='Lighthouse' code={code} width='960px'>
      <Box px={4}>
        <Lighthouse data={data} />
      </Box>
      <Box pt={4} />
      <Card
        justifyContent='center'
        alignItems='center'
        width='935px'
        height='180px'
        px={4}
      >
        <Lighthouse data={data} width='60px' />
      </Card>
    </Story>
  </>
))
