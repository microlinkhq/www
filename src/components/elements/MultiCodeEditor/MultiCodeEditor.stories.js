import { MultiCodeEditor, Box } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

const jsx = () => `
import { CodeEditor } from 'components/elements'

export default () => (
  <CodeEditor language='jsx'>
  const { status, data } = await mql('https://kikobeats.com', {
    palette: true,
    rules: {
      avatar: {
        type: 'image',
        selectors: [
          {
            selector: '#avatar',
            attr: 'href'
          }
        ],
      }
    }
  })
  </CodeEditor>
)
`

const bash = () => `
$ curl -i -I -X GET https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com

x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms
`

const json = () => `
{
  "status": "success",
  "data": {
    "video": {
      "url": "https://gcs-vimeo.akamaized.net/exp=1530385652~acl=%2A%2F823603783.mp4%2A~hmac=5237941fe7ed6229d27eb8048360786fd0a164fb877cea8c654dbeee0b2eedd1/vimeo-prod-skyfire-std-us/01/2635/7/188175573/823603783.mp4",
      "width": 1280,
      "height": 720,
      "type": "h264",
      "size": 7228264,
      "size_pretty": "7.23 MB",
      "duration": 28.533333,
      "duration_pretty": "29s"
    }
  }
}
`

const languages = {
  Shell: bash,
  JSON: json,
  React: jsx
}

storiesOf('Elements', module).add('MultiCodeEditor', () => (
  <Story name='MultiCodeEditor'>
    <Box mb={4} width={650}>
      <MultiCodeEditor languages={languages} />
    </Box>
  </Story>
))
