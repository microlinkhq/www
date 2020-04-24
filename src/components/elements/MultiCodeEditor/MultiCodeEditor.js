import { useLocalStorage } from 'components/hook'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { isFunction } from 'helpers'
import React from 'react'

import CodeEditor from '../CodeEditor/CodeEditor'
import Select from '../Select/Select'
import Flex from '../Flex'
import Text from '../Text'
import Box from '../Box'

const LOCALSTORAGE_KEY = 'multi_code_editor'

const arrow = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='white'> <path d='M0 6 L32 6 L16 28 z' /> </svg>"
)

const SelectWrapper = styled(Box)`
  color: #fff;
  background-color: #24292e;
  background-image: linear-gradient(-180deg, #3b424a 0%, #24292e 90%);
  border-radius: 0.25em;
  border-color: rgba(27, 31, 35, 0.2);
`

const CustomSelect = styled(Select)`
  background-color: transparent;
  margin-bottom: 0;
  background-image: url("${arrow}");
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

export const SelectLanguage = ({ children, value, onChange, ...props }) => {
  return (
    <SelectWrapper>
      <CustomSelect
        value={value}
        onChange={event => {
          event.preventDefault()
          const label = event.target.value
          onChange(label)
        }}
        {...props}
      >
        {children.map(lang => (
          <option
            key={lang}
            children={lang}
            fontSize={0}
            fontWeight='regular'
            mr={2}
          />
        ))}
      </CustomSelect>
    </SelectWrapper>
  )
}

const Actions = styled(Flex)`
  position: relative;
  overflow: visible;
  top: 4px;

  .codecopy_wrapper {
    top: 0;
  }
  .codecopy_button {
    position: relative;
    top: 0;
    left: 0;
  }
`

const ActionComponent = ({
  setEditorLanguage,
  editorLanguage,
  editorLanguages,
  code,
  theme
}) => (
  <Actions>
    <Text as='div' mr={2} fontSize={0}>
      <SelectLanguage
        ml='auto'
        mr='auto'
        width='4.5rem'
        mb={2}
        bg='white'
        children={editorLanguages}
        value={editorLanguage}
        onChange={setEditorLanguage}
      />
    </Text>
    <CodeCopy theme={theme} interactive text={code} />
  </Actions>
)

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

  const code = isFunction(codeLanguage) ? codeLanguage(props) : codeLanguage

  return (
    <CodeEditor
      language={toAlias(editorLanguage)}
      children={code}
      ActionComponent={() => (
        <ActionComponent
          theme={theme}
          setEditorLanguage={setEditorLanguage}
          editorLanguage={editorLanguage}
          editorLanguages={editorLanguages}
          code={code}
        />
      )}
      {...props}
    />
  )
}

MultiCodeEditor.defaultProps = {
  ...CodeEditor.defaultProps
}

export default MultiCodeEditor
