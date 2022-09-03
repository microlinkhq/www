import { CodeEditor } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

const jsCode = `
const mql = require('@microlink/mql')

const { status, data } = await mql('https://github.com/microlinkhq')

console.log(data)
`.trim()

const code = `
<>
  <CodeEditor interactive mx='auto'>
    ${jsCode
      .split('\n')
      .filter(Boolean)
      .join('\n')}
  </CodeEditor>
</>

`.trim()

storiesOf('Elements', module).add('Runkit', () => (
  <Story name='Runkit' code={code}>
    <CodeEditor interactive mx='auto'>
      {jsCode}
    </CodeEditor>
  </Story>
))
