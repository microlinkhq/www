import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Radar from './Radar'

const storyName = 'Radar'

const data = [
  {
    id: 'First Contentful Paint',
    'kikobeats.com': 96,
    'karliky.dev': 100,
    'elenatorro.com': 80
  },
  {
    id: 'First Meaningful Paint',
    'kikobeats.com': 95,
    'karliky.dev': 100,
    'elenatorro.com': 75
  },
  {
    id: 'Speed Index',
    'kikobeats.com': 100,
    'karliky.dev': 100,
    'elenatorro.com': 60
  },
  {
    id: 'First CPU Idle',
    'kikobeats.com': 99,
    'karliky.dev': 100,
    'elenatorro.com': 90
  },
  {
    id: 'Time to Interactive',
    'kikobeats.com': 99,
    'karliky.dev': 100,
    'elenatorro.com': 80
  }
]

const code = `
import { Radar } from 'components/elements'

export default () => (
  <Radar
    data={${JSON.stringify(data, null, 2)}}
  />
)`

const RadarStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Radar
        data={data}
        indexBy='id'
        keys={['kikobeats.com', 'elenatorro.com']}
      />
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <RadarStory />)
