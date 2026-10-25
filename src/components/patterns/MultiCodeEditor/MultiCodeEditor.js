import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import CodeCopy from 'components/elements/Codecopy'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import { useCodeLanguage } from 'components/hook/use-code-language'
import React, { useMemo } from 'react'
import { Download } from 'react-feather'
import Tabs from '../Tabs'
import styled from 'styled-components'
import { cx, theme } from 'theme'

const SelectLanguage = ({ value, onClick, ...props }) => (
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

const DownloadButton = styled('button')`
  position: relative;
  top: -2px;
  display: inline-flex;
  align-items: center;
  margin-right: 14px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  color: ${cx('black20')};
  transition: color 300ms;

  &:hover {
    color: ${cx('black')};
  }
`

const downloadFile = (filename, text) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

const ActionComponent = ({
  setLanguage,
  language,
  languages,
  filename,
  text
}) => {
  return (
    <>
      <Actions>
        <Box css={{ width: '100%' }}>
          <SelectLanguage
            css={theme({ py: '2px' })}
            value={language}
            onClick={setLanguage}
          >
            {languages}
          </SelectLanguage>
        </Box>
      </Actions>
      {filename && (
        <DownloadButton
          type='button'
          aria-label={`Download ${filename}`}
          title={`Download ${filename}`}
          onClick={() => downloadFile(filename, text)}
        >
          <Download size={16} />
        </DownloadButton>
      )}
      <CodeCopy text={text} />
    </>
  )
}

const DEFAULT_LANGUAGE_INDEX = 1

const MultiCodeEditor = ({
  interactive,
  languages: codeByLanguage,
  download,
  aliases,
  ...props
}) => {
  const languages = useMemo(() => Object.keys(codeByLanguage), [codeByLanguage])

  const [language, setLanguage] = useCodeLanguage(
    languages,
    languages[DEFAULT_LANGUAGE_INDEX] || languages[0]
  )

  const code = codeByLanguage[language]

  // The tab label (e.g. `Vanilla`) doubles as the highlight language, but a
  // caller can remap it — e.g. the builder highlights its `Vanilla` tab as `js`
  // so it gets colors, without affecting other pages that reuse the label.
  const editorLanguage = (aliases && aliases[language]) || language

  return (
    <CodeEditor
      interactive={interactive}
      header={{ style: { marginBottom: '8px' } }}
      language={editorLanguage}
      {...props}
      ActionComponent={props => (
        <ActionComponent
          setLanguage={setLanguage}
          language={language}
          languages={languages}
          filename={download && download[language]}
          {...props}
        />
      )}
    >
      {typeof code === 'function' ? code(props) : code}
    </CodeEditor>
  )
}

export default MultiCodeEditor
