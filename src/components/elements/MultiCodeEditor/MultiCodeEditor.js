import { useLocalStorage } from 'components/hook'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { cx } from 'theme'

import CodeEditor from '../CodeEditor/CodeEditor'
import CodeCopy from '../Codecopy'
import Tabs from '../Tabs'
import Flex from '../Flex'
import Box from '../Box'

export const SelectLanguage = ({ isDark, value, onClick, ...props }) => {
  const color = cx(isDark ? 'white' : 'black')

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
  margin-left: auto;
`

const ActionComponent = ({
  setLanguage,
  language,
  languages,
  text,
  isDark
}) => {
  return (
    <>
      <Actions>
        <Box width='100%'>
          <SelectLanguage
            isDark={isDark}
            pt='2px'
            pb='2px'
            ml='auto'
            mr='auto'
            width='4.8rem'
            mb={2}
            value={language}
            onClick={setLanguage}
          >
            {languages}
          </SelectLanguage>
        </Box>
      </Actions>
      <CodeCopy isDark={isDark} text={text} />
    </>
  )
}

const DEFAULT_LANGUAGE_INDEX = 1
const LOCALSTORAGE_KEY = 'multi_code_editor_index'

const MultiCodeEditor = ({
  interactive,
  languages: codeByLanguage,
  ...props
}) => {
  const [languageIndex, setLanguageIndex] = useLocalStorage(
    LOCALSTORAGE_KEY,
    DEFAULT_LANGUAGE_INDEX
  )

  const languages = useMemo(() => Object.keys(codeByLanguage), [codeByLanguage])
  const language = languages[languageIndex]
  const code = codeByLanguage[language]

  // since we are memoizing the latest language used,
  // need to be reset when the memoized language is missing
  if (!code) setLanguageIndex(DEFAULT_LANGUAGE_INDEX)

  const setLanguage = language => {
    const languageIndex = languages.findIndex(lang => lang === language)
    if (languageIndex < 0) return
    const event = new window.CustomEvent(LOCALSTORAGE_KEY, {
      detail: languageIndex
    })
    document.dispatchEvent(event)
  }

  const updateLanguageIndex = event => setLanguageIndex(event.detail)

  useEffect(() => {
    document.addEventListener(LOCALSTORAGE_KEY, updateLanguageIndex)
    return () =>
      document.removeEventListener(LOCALSTORAGE_KEY, updateLanguageIndex)
    // eslint-disable-next-line
  }, [])

  return (
    <CodeEditor
      interactive={interactive}
      header={{ style: { marginBottom: '8px' } }}
      language={language}
      {...props}
      ActionComponent={props => (
        <ActionComponent
          setLanguage={setLanguage}
          language={language}
          languages={languages}
          {...props}
        />
      )}
    >
      {typeof code === 'function' ? code(props) : code}
    </CodeEditor>
  )
}

export default MultiCodeEditor
