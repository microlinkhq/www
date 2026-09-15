import React from 'react'
import { theme } from 'theme'

import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import { DocumentViewer } from 'components/pages/markdown/shared'

const SAMPLE_OUTPUT = `## Table of Contents

- [Overview](#overview)
  - [CLI Microlink API example](#cli-microlink-api-example)
  - [cURL Microlink API example](#curl-microlink-api-example)
  - [JavaScript Microlink API example](#javascript-microlink-api-example)
  - [Python Microlink API example](#python-microlink-api-example)
  - [Ruby Microlink API example](#ruby-microlink-api-example)
  - [PHP Microlink API example](#php-microlink-api-example)
  - [Golang Microlink API example](#golang-microlink-api-example)

---

[API](https://microlink.io/docs/api/getting-started/overview)`

const MarkdownDemo = ({ alt }) => (
  <DocumentViewer role='img' aria-label={alt}>
    <Box css={theme({ width: '100%', textAlign: 'left' })}>
      <CodeEditor
        autoHeight
        language='markdown'
        title='https://microlink.io/docs → markdown'
      >
        {SAMPLE_OUTPUT}
      </CodeEditor>
    </Box>
  </DocumentViewer>
)

export default MarkdownDemo
