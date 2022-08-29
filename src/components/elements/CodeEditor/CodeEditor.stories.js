import { Text, Box, CodeEditor } from 'components/elements'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import React from 'react'

const jsCode = `
const mql = require('@microlink/mql')

const github = (username) =>
  mql(\`https://github.com/\${username}\`, {
    data: {
      stats: {
        selector: '.user-profile-nav nav',
        attr: {
          repositories: {
            selector: 'a:nth-child(2) > span',
            type: 'number'
          },
          followers: {
            selector: 'a:nth-child(4) > span',
            type: 'number'
          },
          followings: {
            selector: 'a:nth-child(5) > span',
            type: 'number'
          }
        }
      }
    }
  })

const username = 'kikobeats'
const { response, data } = await github(username)

console.log(\`GitHub stats for @\${username}:\`, data.stats)
`

const bashCode = `
$ curl -i -I -X GET https://api.microlink.io/?url=https%3A%2F%2Fwww.reddit.com

x-response-time : 21.518ms
x-fetch-mode    : fetch
x-fetch-time    : 618.055ms
`

storiesOf('Elements', module).add('CodeEditor', () => (
  <Story name='CodeEditor'>
    <Box mb={4}>
      <Text color='gray6' mb={2} fontSize={0}>
        {"<CodeEditor title='mql.js' language='js'>"}
      </Text>
      <CodeEditor className='language-js{3}' title='mql.js' language='js'>
        {jsCode}
      </CodeEditor>
    </Box>

    <Box mb={4}>
      <Text color='gray6' mb={2} fontSize={0}>
        {"<CodeEditor title='mql.js' language='js' theme='dark'>"}
      </Text>
      <CodeEditor
        className='language-sh{1}'
        title='mql.sh'
        language='bash'
        theme='dark'
      >
        {bashCode}
      </CodeEditor>
    </Box>
  </Story>
))
