import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { Radar } from 'components/elements'

const storyName = 'Radar'

const data = [
  {
    id: 'First Contentful Paint',
    'pr-133.zeit.co': 96,
    'zeit.co': 80
  },
  {
    id: 'First Meaningful Paint',
    'pr-133.zeit.co': 95,
    'zeit.co': 75
  },
  {
    id: 'Speed Index',
    'pr-133.zeit.co': 100,
    'zeit.co': 80
  },
  {
    id: 'First CPU Idle',
    'pr-133.zeit.co': 99,
    'zeit.co': 75
  },
  {
    id: 'Time to Interactive',
    'pr-133.zeit.co': 99,
    'zeit.co': 88
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
      <Radar data={data} indexBy='id' keys={['pr-133.zeit.co', 'zeit.co']} />
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <RadarStory />)
