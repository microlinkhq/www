import { useLocalStorage } from 'components/hook'
import styled from 'styled-components'
import CodeCopy from 'react-codecopy'
import { isFunction } from 'helpers'
import { colors } from 'theme'
import React from 'react'

import CodeEditor from '../CodeEditor/CodeEditor'

import Select from '../Select/Select'
import Flex from '../Flex'
import Text from '../Text'
import Box from '../Box'

const LOCALSTORAGE_KEY = 'multi_code_editor'

const arrow = color =>
  encodeURI(
    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='${color}'> <path d='M0 6 L32 6 L16 28 z' /> </svg>`
  )

const SelectWrapper = styled(Box)`
  border-radius: 0.25em;
  border-color: rgba(27, 31, 35, 0.2);
`

const CustomSelect = styled(Select)`
  background-color: transparent;
  margin-bottom: 0;
  background-image: ${props => `url('${arrow(props.color)}')`};

  &:hover,
  &:focus {
    border-color: rgba(27, 31, 35, 0.35);
  }
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
  onChange,
  ...props
}) => {
  const color = theme === 'dark' ? colors.white : colors.black
  const background = theme === 'dark' ? colors.black : colors.white

  return (
    <SelectWrapper color={color} background={background}>
      <CustomSelect
        color={color}
        value={value}
        onChange={event => {
          event.preventDefault()
          const label = event.target.value
          onChange(label)
        }}
        {...props}
      >
        {children.map(lang => (
          <option key={lang} fontWeight='regular' mr={2}>
            {lang}
          </option>
        ))}
      </CustomSelect>
    </SelectWrapper>
  )
}

const Actions = styled(Flex)`
  position: relative;
  overflow: visible;
  top: 4px;

  .codecopy_button {
    background: ${props => props.background};
    position: relative;
    top: 0;
    left: 0;
  }
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
      <Text as='div' mr={2} fontSize={0}>
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
          onChange={setEditorLanguage}
        >
          {editorLanguages}
        </SelectLanguage>
      </Text>
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

  const code = isFunction(codeLanguage) ? codeLanguage(props) : codeLanguage

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
