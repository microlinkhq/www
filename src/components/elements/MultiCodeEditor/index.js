import { Flex, Text, Box, CodeEditor } from 'components/elements'
import React, { useState, Fragment } from 'react'
import styled, { css } from 'styled-components'
import { serializeComponent } from 'helpers'
import CodeCopy from 'react-codecopy'

import Select from '../Select'

const actionStyle = css`
  color: #fff;
  background-color: #24292e;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewbox='0 0 32 32' fill='white'> <path d='M0 6 L32 6 L16 28 z' /> </svg>`
)

const CustomSelect = styled(Select)`
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: transparent;
  margin-bottom: 0;
  background-image: url("${arrow}");
`

const CustomBox = styled(Box)`
  ${actionStyle};
  border: 0;
`

const SelectLanguage = ({ children, value, onChange, ...props }) => {
  return (
    <CustomBox>
      <CustomSelect
        value={value}
        onChange={event => {
          event.preventDefault()
          const language = event.target.value
          onChange(language)
        }}
        {...props}
      >
        {children.map(language => {
          return (
            <option
              key={language}
              children={language}
              fontSize={0}
              fontWeight='regular'
              mr={2}
            />
          )
        })}
      </CustomSelect>
    </CustomBox>
  )
}

function MultiCodeEditor ({ languages, defaultLanguage, ...props }) {
  const languagesKeys = Object.keys(languages)
  const [language, setLanguage] = useState(() => languages[languagesKeys[0]])
  const code = language(props)

  const ActionComponent = () => (
    <Flex>
      <Text as='span' mr={2} fontSize={0}>
        <SelectLanguage
          mx='auto'
          width={'4.5rem'}
          mb={2}
          bg='white'
          children={languagesKeys}
          value={language.language}
          onChange={languageName => setLanguage(() => languages[languageName])}
        />
      </Text>
      <CustomCodeCopy
        theme='dark'
        interactive
        text={serializeComponent(code)}
      />
    </Flex>
  )

  return (
    <Fragment>
      <Box px={2}>
        <CodeEditor
          language={language.language}
          children={code}
          ActionComponent={ActionComponent}
        />
      </Box>
    </Fragment>
  )
}

export default MultiCodeEditor
