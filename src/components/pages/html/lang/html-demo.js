import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

const SAMPLE_RESPONSE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Microlink | The web, transformed</title>
    <meta name="description" content="A single API for turning any URL into data." />
    <meta property="og:image" content="https://microlink.io/images/og/home.png" />
  </head>
  <body>
    <header class="hero">…</header>
    <main>…</main>
  </body>
</html>`

const HtmlDemo = ({ alt }) => (
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
      language='html'
      title='GET api.microlink.io?url=microlink.io → data'
    >
      {SAMPLE_RESPONSE}
    </CodeEditor>
  </Box>
)

export default HtmlDemo
