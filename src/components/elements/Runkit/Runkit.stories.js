import { CodeEditor, Box } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'
import React from 'react'

const jsCode = `
const mql = require('@microlink/mql')

const { status, data } = await mql('https://github.com/microlinkhq')

console.log(data)
`.trim()

const code = `
<>
  <CodeEditor css={theme({mx: 'auto'})} language='js' interactive>
    ${jsCode.split('\n').filter(Boolean).join('\n')}
  </CodeEditor>
</>

`.trim()

storiesOf('Elements', module).add('Runkit', () => (
  <Story name='Runkit' code={code}>
    <CodeEditor css={theme({ mx: 'auto' })} language='js' interactive>
      {jsCode}
    </CodeEditor>
    <Box css={theme({ pt: 3 })} />
    <CodeEditor css={theme({ mx: 'auto' })} language='js' isDark interactive>
      {jsCode}
    </CodeEditor>
  </Story>
))
