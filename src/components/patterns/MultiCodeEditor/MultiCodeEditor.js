import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import CodeCopy from 'components/elements/Codecopy'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { useLocalStorage } from 'components/hook/use-local-storage'
import React, { useMemo } from 'react'
import Tabs from '../Tabs'
import styled from 'styled-components'
import { theme } from 'theme'

export const SelectLanguage = ({ isDark, value, onClick, ...props }) => (
  <Tabs
    value={value}
    onClick={event => onClick(event.target.textContent)}
    {...props}
  />
)

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
        <Box css={{ width: '100%' }}>
          <SelectLanguage
            isDark={isDark}
            css={theme({ py: '2px' })}
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
const LOCALSTORAGE_KEY = ''

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
    setLanguageIndex(languageIndex)
  }

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
