import React from 'react'
import { storiesOf } from '@storybook/react'
import prettyBytes from 'pretty-bytes'
import { Stack } from 'components/elements'
import { Story } from 'story'

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

const code = `
import { Stack } from 'components/elements'

export default () => (
  <Stack
    data={${JSON.stringify(data, null, 2)}}
    indexBy='url'
    keys={[
      'image',
      'script',
      'stylesheet',
      'document',
      'font',
      'other',
      'media',
      'third party'
    ]}
    label={e => prettyBytes(e.data[\`\${e.id}Bytes\`])}
  />
)`

const StackStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Stack
        data={data}
        indexBy='url'
        keys={[
          'image',
          'script',
          'stylesheet',
          'document',
          'font',
          'other',
          'media',
          'third party'
        ]}
        label={e => prettyBytes(e.data[`${e.id}Bytes`])}
      />
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <StackStory />)
