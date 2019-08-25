import { Flex, Text, Box, CodeEditor } from 'components/elements'
import styled, { css } from 'styled-components'
import React, { useState } from 'react'
import CodeCopy from 'react-codecopy'
import { isFunction } from 'lodash'
import { borders } from 'theme'

import Select from '../Select/Select'

const actionStyle = css`
  color: #fff;
  background-color: #24292e;
  border: ${borders[1]} rgba(255, 255, 255, 0.05);
  background-image: linear-gradient(-180deg, #3b424a 0%, #24292e 90%);
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
  'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewbox=\'0 0 32 32\' fill=\'white\'> <path d=\'M0 6 L32 6 L16 28 z\' /> </svg>'
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

function MultiCodeEditor ({ languages, defaultLanguage, ...props }) {
  const langs = Object.keys(languages)
  const [language, setLanguage] = useState(() => languages[langs[0]])
  const code = isFunction(language) ? language(props) : language
  const lang = langs.find(lang => languages[lang] === language)

  const ActionComponent = () => (
    <Flex>
      <Text as='span' mr={2} fontSize={0}>
        <SelectLanguage
          ml='auto'
          mr='auto'
          width='4.5rem'
          mb={2}
          bg='white'
          children={langs}
          value={lang}
          onChange={lang => setLanguage(() => languages[lang])}
        />
      </Text>
      <CustomCodeCopy theme='dark' interactive text={code} />
    </Flex>
  )

  return (
    <CodeEditor
      language={toAlias(lang)}
      children={code}
      ActionComponent={ActionComponent}
    />
  )
}

export default MultiCodeEditor
