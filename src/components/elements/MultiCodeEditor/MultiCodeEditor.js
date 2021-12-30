import { useLocalStorage } from 'components/hook'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { cx } from 'theme'
import React from 'react'

import CodeEditor from '../CodeEditor/CodeEditor'

import Tabs from '../Tabs'
import Flex from '../Flex'
import Box from '../Box'

const LOCALSTORAGE_KEY = 'multi_code_editor'

const toAlias = (lang = '') => {
  lang = lang.toLowerCase()
  switch (lang) {
    case 'vanilla':
      return 'html'
    case 'react':
      return 'jsx'
    case 'jekyll':
      return 'markdown'
    case 'curl':
    case 'shell':
      return 'bash'
    case 'node.js':
      return 'javascript'
    default:
      return lang
  }
}

export const SelectLanguage = ({ theme, value, onClick, ...props }) => {
  const color = cx(theme === 'dark' ? 'white' : 'black')

  return (
    <Tabs
      color={color}
      value={value}
      onClick={event => {
        event.preventDefault()
        const label = event.target.textContent
        onClick(label)
      }}
      {...props}
    />
  )
}

const Actions = styled(Flex)`
  position: relative;
  overflow: visible;
  top: 4px;
  width: 85%;

  .codecopy_button {
    &:hover {
      box-shadow: none;
    }

    svg {
      fill: ${({ theme }) => cx(theme === 'dark' ? 'white50' : 'black20')};

      &:hover {
        fill: ${({ theme }) => cx(theme === 'dark' ? 'white' : 'black')};
      }
    }

    background: ${props => props.background};
    border: 0;
    padding: 0;
    position: relative;
    top: -0.15rem;
    left: 0.25rem;
    right: 0;
  }
`

const ActionComponent = ({
  setEditorLanguage,
  editorLanguage,
  editorLanguages,
  text,
  theme
}) => {
  return (
    <Actions theme={theme}>
      <Box width='100%'>
        <SelectLanguage
          theme={theme}
          pt='2px'
          pb='2px'
          ml='auto'
          mr='auto'
          width='4.8rem'
          mb={2}
          them={theme}
          value={editorLanguage}
          onClick={setEditorLanguage}
        >
          {editorLanguages}
        </SelectLanguage>
      </Box>
      <CodeCopy theme={theme} interactive text={text} />
    </Actions>
  )
}

const MultiCodeEditor = ({ languages: codeByLanguage, ...props }) => {
  const editorLanguages = Object.keys(codeByLanguage)

  const [editorLanguage, setEditorLanguage] = useLocalStorage(
    LOCALSTORAGE_KEY,
    editorLanguages[0]
  )

  let codeLanguage = codeByLanguage[editorLanguage]

  // since we are memoizing the latest language used,
  // need to be reset when the memoized language is missing
  if (!codeLanguage) {
    codeLanguage = codeByLanguage[editorLanguages[0]]
    setEditorLanguage(editorLanguages[0])
  }

  const code =
    typeof codeLanguage === 'function' ? codeLanguage(props) : codeLanguage

  return (
    <CodeEditor
      language={toAlias(editorLanguage)}
      {...props}
      ActionComponent={props => (
        <ActionComponent
          setEditorLanguage={setEditorLanguage}
          editorLanguage={editorLanguage}
          editorLanguages={editorLanguages}
          {...props}
        />
      )}
    >
      {code}
    </CodeEditor>
  )
}

MultiCodeEditor.defaultProps = {
  ...CodeEditor.defaultProps
}

export default MultiCodeEditor
