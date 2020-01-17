import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Stack from './Stack'

const storyName = 'Stack'

const data = [
  {
    url: 'kikobeats.com',
    image: 20,
    imageBytes: 670553,

    script: 6,
    scriptBytes: 36191,

    stylesheet: 2,
    stylesheetBytes: 18749,

    document: 1,
    documentBytes: 6515,

    font: 1,
    fontBytes: 996,

    other: 1,
    otherBytes: 301,

    media: 0,
    mediaBytes: 0,

    'third party': 17,
    'third partyBytes': 97951
  },
  {
    url: 'karliky.dev',
    image: 0,
    imageBytes: 0,

    script: 2,
    scriptBytes: 6068,

    stylesheet: 2,
    stylesheetBytes: 10937,

    document: 1,
    documentBytes: 5894,

    font: 0,
    fontBytes: 0,

    other: 0,
    otherBytes: 0,

    media: 0,
    mediaBytes: 0,

    'third party': 0,
    'third partyBytes': 0
  }
]

// const data = [
//   { size: '644 kB', label: 'image', value: 20 },
//   { size: '644 kB', label: 'script', value: 6 },
//   { size: '644 kB', label: 'stylesheet', value: 2 },
//   { size: '644 kB', label: 'document', value: 1 },
//   { size: '644 kB', label: 'font', value: 1 },
//   { size: '644 kB', label: 'other', value: 1 },
//   { size: '644 kB', label: 'media', value: 0 },
//   { size: '644 kB', label: 'third party', value: 17 }
// ].map(item => ({ ...item, id: item.label }))

const code = `
import { Stack } from 'components/elements'

export default () => (
  <Stack
    data={${JSON.stringify(data, null, 2)}}
  />
)`

const StackStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Stack data={data} indexBy='url' />
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <StackStory />)
