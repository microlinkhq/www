import { Spinner, Button, Select, Choose } from 'components/elements'
import { useLocalStorage } from 'components/hook'
import React, { useState, useRef } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { highlight } from 'sugar-high'
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
import mql from '@microlink/mql'

import Terminal, {
  TERMINAL_WIDTH,
  TerminalText
} from 'components/elements/Terminal/Terminal'

import CodeCopy from 'components/elements/Codecopy'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

const FadeOverlay = styled(Box)`
  height: ${({ position }) => (position === 'bottom' ? '34px' : '34px')};
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: ${({ position }) => (position === 'top' ? '34px' : 'auto')};
  bottom: ${({ position }) => (position === 'bottom' ? '0' : 'auto')};

  &:before {
    background: linear-gradient(
      to ${({ position }) => (position === 'bottom' ? 'top' : 'bottom')},
      white ${({ position }) => (position === 'top' ? '50%' : '50%')},
      transparent 100%
    );
    bottom: 0px;
    content: '';
    height: ${({ position }) => (position === 'bottom' ? '34px' : '34px')};
    left: 0px;
    position: absolute;
    width: 100%;
  }
`

const Content = styled(TerminalText)`
  padding: 0 ${space[2]};
`

// Common font styles to ensure perfect alignment between textarea and pre
const fontStyles = {
  fontFamily: fonts.mono,
  fontSize: fontSizes[0],
  lineHeight: lineHeights[4],
  letterSpacing: '0px',
  fontWeight: fontWeights.normal,
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
      <TerminalText style={{ padding: 0, ...fontStyles }}>
        <div>
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
        </div>
      </TerminalText>
    </Choose.When>
  </Choose>
)

function MultiCodeEditorV2 ({
  mqlCode: codeSnippets,
  height = 180,
  editable = false
}) {
  const availableLanguages = Object.keys(codeSnippets)
  const [currentLanguage, setCurrentLanguage] = useLocalStorage(
    'mql-code-editor-language',
    'JavaScript'
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

  // Listen for localStorage changes from other component instances
  React.useEffect(() => {
    const handleStorageChange = e => {
      if (
        e.key === 'mql-code-editor-language' &&
        e.newValue &&
        availableLanguages.includes(e.newValue)
      ) {
        setCurrentLanguage(e.newValue)
        setCode(codeSnippets[e.newValue])
        setActiveView('code')
      }
    }

    const handleCustomEvent = e => {
      if (
        e.detail?.key === 'mql-code-editor-language' &&
        e.detail?.newValue &&
        availableLanguages.includes(e.detail.newValue)
      ) {
        setCurrentLanguage(e.detail.newValue)
        setCode(codeSnippets[e.detail.newValue])
        setActiveView('code')
      }
    }

    // Listen for storage events (changes from other tabs/windows)
    window.addEventListener('storage', handleStorageChange)

    // Listen for custom events (changes from same page)
    window.addEventListener('mql-language-change', handleCustomEvent)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('mql-language-change', handleCustomEvent)
    }
  }, [
    setCurrentLanguage,
    availableLanguages,
    codeSnippets,
    setCode,
    setActiveView
  ])

  const parseCodeParameters = () => {
    const jsCode = codeSnippets.JavaScript
    const urlMatch = jsCode.match(/mql\(['"`]([^'"`]+)['"`]/)
    const url = urlMatch ? urlMatch[1] : ''
    let options = {}

    // Find the start of the options object after the URL
    const afterUrlMatch = jsCode.match(/mql\(['"`][^'"`]+['"`],\s*/)
    if (afterUrlMatch) {
      const startIndex = afterUrlMatch.index + afterUrlMatch[0].length
      const optionsString = extractBalancedBraces(jsCode, startIndex)

      if (optionsString) {
        try {
          // eslint-disable-next-line no-eval
          options = eval(`(${optionsString})`)
        } catch (e) {
          console.warn('Could not parse options:', e)
        }
      }
    }

    return [url, options]
  }

  // Helper function to extract balanced braces content
  const extractBalancedBraces = (str, startIndex) => {
    if (str[startIndex] !== '{') return null

    let braceCount = 0
    let i = startIndex

    while (i < str.length) {
      if (str[i] === '{') {
        braceCount++
      } else if (str[i] === '}') {
        braceCount--
        if (braceCount === 0) {
          // Found the matching closing brace
          return str.substring(startIndex, i + 1)
        }
      }
      i++
    }

    return null // No matching closing brace found
  }

  const parseCodeAndExecute = async () => {
    setIsLoading(true)
    const result = await (async () => {
      try {
        console.log(parseCodeParameters())
        const value = await mql(...parseCodeParameters())
        return {
          status: 'fulfilled',
          headers: Object.fromEntries(value.response.headers),
          body: value.data
        }
      } catch (error) {
        const { headers, name, statusCode, message, url, ...body } = error
        return { status: 'rejected', headers, body }
      }
    })()

    setResponseData(result)
    setIsLoading(false)
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
    const [url, options] = parseCodeParameters()
    const queryParams = new URLSearchParams()
    queryParams.set('url', url)
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'apiKey') return
      if (typeof value === 'object' && value !== null) {
        queryParams.set(key, JSON.stringify(value))
      } else {
        queryParams.set(key, String(value))
      }
    })
    const apiUrl = `https://api.microlink.io?${queryParams.toString()}`
    window.open(apiUrl, '_blank')
  }

  const handleLanguageChange = e => {
    const newLanguage = e.target.value
    setCurrentLanguage(newLanguage)
    setCode(codeSnippets[newLanguage])
    setActiveView('code')

    // Dispatch custom event to notify other components on the same page
    window.dispatchEvent(
      new CustomEvent('mql-language-change', {
        detail: { key: 'mql-code-editor-language', newValue: newLanguage }
      })
    )
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
        css={theme({ width: TERMINAL_WIDTH })}
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
