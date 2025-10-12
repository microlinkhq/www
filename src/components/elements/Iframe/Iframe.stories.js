import Flex from '../Flex'
import Box from '../Box'
import CodeEditor from '../CodeEditor/CodeEditor'
import Iframe from './Iframe'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'
import React from 'react'

const code = `
import Iframe from './Iframe'

export default () => (
  <Iframe
    width="480px"
    height="270px"
    src="https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed"
    allowFullScreen
  />
)
`

storiesOf('Elements', module).add('Iframe', () => (
  <Story name='Iframe' code={code}>
    <Flex flexDirection='column'>
      <Box>
        <Iframe
          width={CodeEditor.width}
          height={CodeEditor.height}
          src='https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed'
        />
      </Box>
      <Box css={theme({ mt: 4 })}>
        <Iframe src='https://lighthouse.microlink.io/?url=http%3A%2F%2Fapi.microlink.io%2F%3Furl%3Dhttps%3A%2F%2Fmicrolink.io%26insights%26embed%3Dinsights.lighthouse' />
      </Box>
    </Flex>
  </Story>
))
