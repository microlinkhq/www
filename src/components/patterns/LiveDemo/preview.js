import styled from 'styled-components'
import Microlink from '@microlink/react'
import { Choose } from 'react-extras'
import React from 'react'

import { Box, MultiCodeEditor, CodeEditor, Hide } from 'components/elements'

import languages from './languages'

const CodeEditorWrapper = styled(Box)`
  section,
  pre {
    height: 260px;
  }
`

const CodePreview = ({ children }) => (
  <CodeEditorWrapper>
    <MultiCodeEditor languages={languages} {...children} />
  </CodeEditorWrapper>
)

const STYLE = { border: '0', height: 'inherit', maxWidth: '100%' }

const CardPreview = ({ loading, children }) => (
  <>
    <Hide breakpoints={[0, 1]} style={{ height: 'inherit' }}>
      <Microlink
        url={children.url}
        loading={loading}
        size='large'
        style={STYLE}
        setData={() => children}
      />
    </Hide>
    <Hide breakpoints={[2, 3]} style={{ height: 'inherit' }}>
      <Microlink
        url={children.url}
        loading={loading}
        style={STYLE}
        size='large'
        setData={() => children}
      />
    </Hide>
  </>
)

const JSONPreview = ({ children, ...props }) => (
  <CodeEditor language='json'>{JSON.stringify(children, null, 2)}</CodeEditor>
)

export default ({ view, ...props }) => (
  <Choose>
    <Choose.When condition={view === 'preview'}>
      <CardPreview {...props} />
    </Choose.When>
    <Choose.When condition={view === 'json'}>
      <JSONPreview {...props} />
    </Choose.When>
    <Choose.When condition={view === 'code'}>
      <CodePreview {...props} />
    </Choose.When>
  </Choose>
)
