import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

const SAMPLE_RESPONSE = `{
  "logo": {
    "url": "https://images.stripeassets.com/fzn2n1nzq965/4vVgZi0ZMoEzOhkcv7EVwK/favicon.png?w=180&h=180",
    "type": "png",
    "size": 3143,
    "width": 180,
    "height": 180,
    "size_pretty": "3.14 kB",
    "palette": ["#543CFC", "#DEDAFC", "#4C33FB", "#3D0AFC"]
  }
}`

const LogoDemo = ({ alt }) => (
  <Box
    role='img'
    aria-label={alt}
    css={theme({
      width: '100%',
      bg: 'white',
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'black05',
      boxShadow: 3,
      overflow: 'hidden',
      textAlign: 'left'
    })}
  >
    <CodeEditor
      autoHeight
      language='json'
      title='GET api.microlink.io?url=microlink.io → data'
    >
      {SAMPLE_RESPONSE}
    </CodeEditor>
  </Box>
)

export default LogoDemo
