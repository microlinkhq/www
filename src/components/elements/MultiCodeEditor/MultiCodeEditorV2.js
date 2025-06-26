import { Spinner, Button, Select, Choose } from 'components/elements'
import { useLocalStorage } from 'components/hook'
import React, { useState, useRef } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { highlight } from 'sugar-high'
import { mqlCode } from 'helpers/mql-code-v2'
import {
  space,
  fonts,
  fontSizes,
  colors,
  theme,
  fontWeights,
  lineHeights
} from 'theme'
import styled from 'styled-components'

import Terminal, {
  TERMINAL_WIDTH,
  TerminalText
} from 'components/elements/Terminal/Terminal'

import CodeCopy from 'components/elements/Codecopy'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

const loadMql = async () => {
  if (window.mql) return window.mql
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src =
      'https://cdn.jsdelivr.net/npm/@microlink/mql@latest/dist/mql.min.js'
    script.onload = () => {
      resolve(window.mql)
    }
    script.onerror = () => {
      reject(new Error('Failed to load mql library'))
    }
    document.head.appendChild(script)
  })
}

const FadeOverlay = styled(Box)`
  height: ${({ position }) => (position === 'top' ? '20px' : '28px')};
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: ${({ position }) => (position === 'top' ? '-4px' : 'auto')};
  bottom: ${({ position }) => (position === 'bottom' ? '-6px' : 'auto')};

  &:before {
    background: white;
    bottom: 0px;
    content: '';
    filter: blur(4px);
    height: ${({ position }) => (position === 'top' ? '20px' : '28px')};
    left: 0px;
    position: absolute;
    width: 100%;
  }
`

const Content = styled(TerminalText)`
  padding: ${space[3]};
`

// Common font styles to ensure perfect alignment between textarea and pre
const fontStyles = {
  fontFamily: fonts.mono,
  fontSize: fontSizes[0],
  lineHeight: lineHeights[4],
  letterSpacing: '0px',
  fontWeight: '400',
  tabSize: 2
}

function ViewButton ({ view, activeView, onClick, isExpanded }) {
  const isActive = activeView === view

  return (
    <button
      onClick={onClick}
      style={{
        outline: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: isActive ? colors.black : colors.black50,
        fontWeight: isActive ? fontWeights.bold : fontWeights.normal,
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem'
      }}
      onMouseEnter={e => {
        e.target.style.textDecoration = 'underline'
      }}
      onMouseLeave={e => {
        e.target.style.textDecoration = 'none'
      }}
    >
      {view}
      {isActive && (
        <FeatherIcon
          icon={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          color='black'
          size={[0, 0, 0, 0]}
        />
      )}
    </button>
  )
}

function CodeEditor ({ value, onChange, onKeyDown, style, editable = false }) {
  const textareaRef = useRef(null)
  const preRef = useRef(null)

  const handleScroll = () => {
    if (editable && textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Content
        as='pre'
        ref={preRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          color: editable ? 'transparent' : 'inherit',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-words',
          pointerEvents: editable ? 'none' : 'auto',
          ...fontStyles,
          ...style
        }}
        dangerouslySetInnerHTML={{ __html: highlight(value) }}
      />

      {editable && (
        <Content
          as='textarea'
          ref={textareaRef}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={handleScroll}
          style={{
            position: 'absolute',
            padding: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
            color: 'red',
            resize: 'none',
            outline: 'none',
            border: 'none',
            caretColor: 'blue',
            ...fontStyles,
            ...style
          }}
          spellCheck={false}
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize='off'
        />
      )}
    </div>
  )
}

const PlayIcon = () => (
  <svg
    style={{ width: '12px', height: '12px' }}
    fill='currentColor'
    viewBox='0 0 24 24'
  >
    <path d='M8 5v14l11-7z' />
  </svg>
)

const Toolbar = ({
  currentLanguage,
  onLanguageChange,
  onOpenInBrowser,
  onExecute,
  isLoading,
  availableLanguages
}) => (
  <div
    style={{
      position: 'absolute',
      bottom: '1rem',
      right: '1rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      zIndex: 10
    }}
  >
    <Select
      value={currentLanguage}
      onChange={onLanguageChange}
      style={{
        backgroundColor: 'white',
        width: '6rem',
        height: '2rem'
      }}
    >
      {availableLanguages.map(lang => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </Select>

    <Button
      onClick={onExecute}
      disabled={isLoading}
      style={{
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.5 : 1,
        transition: 'opacity 0.2s',
        height: '2rem'
      }}
      variant='black'
      onMouseEnter={e => {
        if (!isLoading) e.target.style.opacity = '0.8'
      }}
      onMouseLeave={e => {
        if (!isLoading) e.target.style.opacity = '1'
      }}
    >
      {isLoading ? (
        <Spinner
          width='12px'
          height='16px'
          color={colors.white}
          style={{ padding: '0' }}
        />
      ) : (
        <PlayIcon />
      )}
    </Button>
  </div>
)

const ViewNavigation = ({ activeView, onViewClick, isExpanded }) => (
  <Text
    style={{
      display: 'flex',
      justifyContent: 'flex-end'
    }}
    css={theme({
      fontSize: 0,
      color: 'black50'
    })}
  >
    <ViewButton
      view='code'
      activeView={activeView}
      onClick={() => onViewClick('code')}
      isExpanded={isExpanded}
    />
    <span>|</span>
    <ViewButton
      view='body'
      activeView={activeView}
      onClick={() => onViewClick('body')}
      isExpanded={isExpanded}
    />
    <span>|</span>
    <ViewButton
      view='headers'
      activeView={activeView}
      onClick={() => onViewClick('headers')}
      isExpanded={isExpanded}
    />
  </Text>
)

const ContentArea = ({
  activeView,
  code,
  setCode,
  editable,
  responseData,
  fontStyles
}) => (
  <Choose>
    <Choose.When condition={activeView === 'code'}>
      <CodeEditor value={code} onChange={setCode} editable={editable} />
    </Choose.When>

    <Choose.When condition={activeView === 'body'}>
      <Content
        as='pre'
        style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-words',
          ...fontStyles
        }}
      >
        {responseData && typeof responseData.body === 'string'
          ? responseData.body
          : responseData && JSON.stringify(responseData.body, null, 2)}
      </Content>
    </Choose.When>

    <Choose.When condition={activeView === 'headers'}>
      <TerminalText
        style={{
          ...fontStyles
        }}
      >
        <Box css={theme({ p: 3 })}>
          {(() => {
            const headers = responseData?.headers || {}
            const maxKeyLength = Math.max(
              ...Object.keys(headers).map(key => key.length)
            )
            const sortedHeaders = Object.entries(headers).sort(([a], [b]) =>
              a.localeCompare(b)
            )
            return sortedHeaders.map(([key, value], index) => (
              <Box key={key} css={theme({ mb: index > 0 ? 1 : 0 })}>
                <span>{key.padEnd(maxKeyLength, ' ')}</span>
                <span>:</span>
                <span>{value}</span>
              </Box>
            ))
          })()}
        </Box>
      </TerminalText>
    </Choose.When>
  </Choose>
)

function MultiCodeEditorV2 ({
  mqlCode: mqlCodeInput,
  height = 180,
  editable = false
}) {
  const codeSnippets = mqlCode(mqlCodeInput)
  const availableLanguages = Object.keys(codeSnippets)
  const [currentLanguage, setCurrentLanguage] = useLocalStorage(
    'mql-code-editor-language',
    'javascript'
  )

  // Ensure saved language is available, fallback to first available language
  const validLanguage = availableLanguages.includes(currentLanguage)
    ? currentLanguage
    : availableLanguages[0]

  const [code, setCode] = useState(codeSnippets[validLanguage])
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState('code')
  const [isExpanded, setIsExpanded] = useState(false)

  const parseCodeAndExecute = async () => {
    setIsLoading(true)
    try {
      await loadMql()

      const browserCode = codeSnippets.JavaScript.replace(
        /import\s+.*?from\s+['"]@microlink\/mql['"].*?\n?/g,
        ''
      )
        .replace(
          /const\s+{\s*data\s*}\s*=\s*await\s+mql\(/g,
          'const response = await window.mql('
        )
        .replace(/await\s+mql\(/g, 'await window.mql(')

      const wrappedCode = `
      (async () => {
        ${browserCode}
        return response;
      })()
    `
      // eslint-disable-next-line no-eval
      const mqlResult = await eval(wrappedCode)

      setResponseData({
        status: mqlResult.status,
        headers: Object.fromEntries(mqlResult.response.headers),
        body: mqlResult.data
      })
    } catch (error) {
      setResponseData({
        status: 'Error',
        headers: {},
        body: error.message
      })
    } finally {
      setIsLoading(false)
    }
  }

  const executeRequest = () => {
    if (!isLoading) {
      parseCodeAndExecute().then(() => {
        setActiveView('body')
        setIsExpanded(false)
      })
    }
  }

  const handleViewClick = view => {
    if (activeView === view && !isExpanded) {
      setIsExpanded(true)
    } else if (activeView === view && isExpanded) {
      setIsExpanded(false)
    } else {
      setActiveView(view)
    }
  }

  const handleOpenInBrowser = () => {
    const curlCode = codeSnippets.cURL
    const url = curlCode.split(' ')[1].replace(/^"|"$/g, '')
    console.log({ url })
    window.open(url, '_blank')
  }

  const handleLanguageChange = e => {
    const newLanguage = e.target.value
    setCurrentLanguage(newLanguage)
    setCode(codeSnippets[newLanguage])
    setActiveView('code')
  }

  const getCurrentViewText = () => {
    if (activeView === 'code') {
      return code
    } else if (activeView === 'body') {
      if (!responseData) return ''
      return typeof responseData.body === 'string'
        ? responseData.body
        : JSON.stringify(responseData.body, null, 2)
    } else if (activeView === 'headers') {
      return Object.entries(responseData.headers || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    }
    return ''
  }

  const TerminalActions = () => (
    <>
      <button
        onClick={handleOpenInBrowser}
        title='Open in Browser'
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={e => {
          const icon = e.target.querySelector('svg')
          if (icon) icon.style.stroke = colors.black
        }}
        onMouseLeave={e => {
          const icon = e.target.querySelector('svg')
          if (icon) icon.style.stroke = colors.black20
        }}
      >
        <FeatherIcon icon='Globe' color={colors.black20} size={[0, 0, 0, 0]} />
      </button>
      <CodeCopy text={getCurrentViewText()} />
    </>
  )

  const componentHeight = isExpanded ? `${height * 2}px` : `${height}px`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Terminal
        text={getCurrentViewText()}
        ActionComponent={TerminalActions}
        css={theme({ width: TERMINAL_WIDTH, pl: 0 })}
        style={{ position: 'relative' }}
      >
        <div style={{ height: componentHeight }}>
          <FadeOverlay position='top' />

          <ContentArea
            activeView={activeView}
            code={code}
            setCode={setCode}
            editable={editable}
            responseData={responseData}
            fontStyles={fontStyles}
          />

          <FadeOverlay position='bottom' />
        </div>

        <Toolbar
          currentLanguage={validLanguage}
          onLanguageChange={handleLanguageChange}
          onOpenInBrowser={handleOpenInBrowser}
          onExecute={executeRequest}
          isLoading={isLoading}
          availableLanguages={availableLanguages}
        />
      </Terminal>

      {responseData && (
        <ViewNavigation
          activeView={activeView}
          onViewClick={handleViewClick}
          isExpanded={isExpanded}
        />
      )}
    </div>
  )
}

export default MultiCodeEditorV2
