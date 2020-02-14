import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { Card } from 'components/elements'
import { LighthouseScore } from 'components/patterns'

const data = {
  'first-contentful-paint': {
    title: 'First Contentful Paint',
    description:
      'First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint).',
    score: 97,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  'first-meaningful-paint': {
    title: 'First Meaningful Paint',
    description:
      'First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint).',
    score: 96,
    duration: 2084.584,
    duration_pretty: '2.1s'
  },
  'speed-index': {
    title: 'Speed Index',
    description:
      'Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index).',
    score: 99,
    duration: 2009.5839999999998,
    duration_pretty: '2s'
  },
  'first-cpu-idle': {
    title: 'First CPU Idle',
    description:
      "First CPU Idle marks the first time at which the page's main thread is quiet enough to handle input.  [Learn more](https://web.dev/first-cpu-idle).",
    score: 99,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  },
  interactive: {
    title: 'Time to Interactive',
    description:
      'Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive).',
    score: 99,
    duration: 2473.4049999999997,
    duration_pretty: '2.5s'
  }
}

const code = `
import { LighthouseScore } from 'components/patterns'

export default () => (
  <LighthouseScore data={${JSON.stringify(data, null, 2)}} />
)
`

storiesOf('Patterns', module).add('LighthouseScore', () => (
  <>
    <Story name='LighthouseScore' code={code} width='960px'>
      <Card
        justifyContent='center'
        alignItems='center'
        width='315px'
        height='150px'
        px={4}
      >
        <LighthouseScore data={data} width='60px' />
      </Card>
    </Story>
  </>
))
