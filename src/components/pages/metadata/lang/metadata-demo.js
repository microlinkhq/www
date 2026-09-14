import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

const SAMPLE_RESPONSE = `{
  "title": "Microlink | The web, transformed",
  "author": "Microlink",
  "lang": "en",
  "description": "A single API for turning any URL into data. Built for apps, agents, and AI. Powered by real browsers. Try it, no signup.",
  "url": "https://microlink.io/",
  "publisher": "Microlink",
  "date": null,
  "image": "https://microlink.io/images/og/home.png?v=pzsfu2",
  "logo": "https://cdn.microlink.io/logo/logo.svg"
}`

const MetadataDemo = ({ alt }) => (
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

export default MetadataDemo
