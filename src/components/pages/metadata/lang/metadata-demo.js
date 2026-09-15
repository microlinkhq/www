import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

const SAMPLE_RESPONSE = `{
  "title": "Microlink | The web, ready for AI",
  "author": "Microlink",
  "lang": "en",
  "description": "A single API for turning any URL into data. Built for apps & agents. Powered by real browsers. Try it, no signup.",
  "url": "https://microlink.io/",
  "publisher": "Microlink",
  "date": null,
  "image": {
    "url": "https://microlink.io/images/og/home.png?v=pzsfu2",
    "type": "png",
    "size": 32357,
    "height": 1260,
    "width": 2400,
    "size_pretty": "32.4 kB"
  },
  "logo": {
    "url": "https://cdn.microlink.io/logo/logo.svg",
    "type": "svg",
    "size": 837,
    "height": 31,
    "width": 44,
    "size_pretty": "837 B"
  }
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
