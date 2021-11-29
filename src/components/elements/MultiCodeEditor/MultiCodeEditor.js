import { useLocalStorage } from 'components/hook'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { colors } from 'theme'
import React from 'react'

import CodeEditor from '../CodeEditor/CodeEditor'

import Flex from '../Flex'
import Text from '../Text'
import Box from '../Box'
import Tabs from '../Tabs.js'

const LOCALSTORAGE_KEY = 'multi_code_editor'

const TabWrapper = styled(Box)`
  width: 100%;
`

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

export const SelectLanguage = ({
  theme,
  children,
  value,
  onClick,
  ...props
}) => {
  const color = theme === 'dark' ? colors.white : colors.black
  const background = theme === 'dark' ? colors.black : colors.white

  return (
    <TabWrapper>
      <Tabs
        color={color}
        background={background}
        value={value}
        tabs={children}
        onClick={event => {
          event.preventDefault()
          const label = event.target.textContent
          onClick(label)
        }}
        {...props}
      />
    </TabWrapper>
  )
}

const Actions = styled(Flex)`
  position: relative;
  overflow: visible;
  top: 4px;
  width: 85%;

  .codecopy_button {
    background: ${props => props.background};
    position: relative;
    top: 0;
    left: 0;
  }
`

const StyledText = styled(Text)`
  width: 100%;
`

const ActionComponent = ({
  setEditorLanguage,
  editorLanguage,
  editorLanguages,
  text,
  theme
}) => {
  const background = theme === 'dark' ? colors.black : colors.white

  return (
    <Actions background={background} theme={theme}>
      <StyledText as='div' mr={2} fontSize={0}>
        <SelectLanguage
          theme={theme}
          pt='2px'
          pb='2px'
          ml='auto'
          mr='auto'
          width='4.8rem'
          mb={2}
          bg='white'
          value={editorLanguage}
          onClick={setEditorLanguage}
        >
          {editorLanguages}
        </SelectLanguage>
      </StyledText>
      <CodeCopy theme={theme} interactive text={text} />
    </Actions>
  )
}

const MultiCodeEditor = ({ theme, languages: codeByLanguage, ...props }) => {
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
