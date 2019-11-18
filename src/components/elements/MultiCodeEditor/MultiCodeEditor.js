import { Text, Box, CodeEditor } from 'components/elements'
import { useLocalStorage } from 'components/hook'
import styled, { css } from 'styled-components'
import CodeCopy from 'react-codecopy'
import { isFunction } from 'lodash'
import { template } from 'helpers'
import { borders } from 'theme'
import React from 'react'

import Select from '../Select/Select'
import { COLORS } from '../CodeEditor/CodeEditor'
import Flex from '../Flex'

const LOCALSTORAGE_KEY = 'multi_code_editor'

const actionStyle = css`
  color: #fff;
  background-color: red;
  border: ${borders[1]} rgba(255, 255, 255, 0.05);
  background-image: linear-gradient(
    -180deg,
    #3b424a 0%,
    ${COLORS.BACKGROUND} 90%
  );
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-repeat: repeat-x;
  background-position: -1px -1px;
  background-size: 110% 110%;
  transition: opacity 0.3s ease-in-out;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
`

const CustomCodeCopy = styled(CodeCopy)`
  position: relative;
  right: 0px;
  top: 0px;
  ${actionStyle};
`

const arrow = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='white'> <path d='M0 6 L32 6 L16 28 z' /> </svg>"
)

const CustomSelect = styled(Select)`
  border: ${borders[1]} rgba(255, 255, 255, 0.05);
  background-color: transparent;
  margin-bottom: 0;
  background-image: url("${arrow}");
`

const CustomBox = styled(Box)`
  ${actionStyle};
  border: 0;
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
    <CustomBox>
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
    </CustomBox>
  )
}

const Actions = styled(Flex)`
  position: relative;
  overflow: visible;
  top: 4px;
`

const CodeEditorWrapper = styled(Box)`
  background: ${COLORS.BACKGROUND};
  section {
    top: 8px;
    position: relative;
    overflow: visible;
  }
`

export default ({ languages: codeByLanguage, ...props }) => {
  const editorLanguages = Object.keys(codeByLanguage)

  const [editorLanguage, setEditorLanguage] = useLocalStorage(
    LOCALSTORAGE_KEY,
    editorLanguages[0]
  )

  const codeLanguage =
    codeByLanguage[editorLanguage] || codeByLanguage[editorLanguages[0]]

  const code = template(
    isFunction(codeLanguage) ? codeLanguage(props) : codeLanguage
  )

  const ActionComponent = () => (
    <Actions>
      <Text as='span' mr={2} fontSize={0}>
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
      <CustomCodeCopy theme='dark' interactive text={code} />
    </Actions>
  )

  return (
    <CodeEditorWrapper>
      <CodeEditor
        language={toAlias(editorLanguage)}
        children={code}
        ActionComponent={ActionComponent}
      />
    </CodeEditorWrapper>
  )
}
