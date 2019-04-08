import React from 'react'
import { storiesOf } from '@storybook/react'
import { CodeEditor } from 'components/elements'
import { Story } from 'story'

const code = `
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

storiesOf('Elements', module).add('CodeEditor', () => (
  <Story name='CodeEditor'>
    <CodeEditor language='jsx' children={code} />
  </Story>
))
