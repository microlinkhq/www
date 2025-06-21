import { Spinner, Button, Select, Choose } from 'components/elements'
import React, { useState, useRef, useEffect } from 'react'
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

import Terminal, {
  TERMINAL_WIDTH,
  TerminalText
} from 'components/elements/Terminal/Terminal'

import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

const FadeOverlay = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: ${({ position }) => (position === 'top' ? '2rem' : '3rem')};
  pointer-events: none;
  z-index: 5;
  transition: opacity 0.2s ease;
  ${({ position }) => `
    ${position}: 0;
    background: linear-gradient(to ${
      position === 'top' ? 'bottom' : 'top'
    }, rgba(255, 255, 255, 1) 0%, transparent 100%);
  `}
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

const CODE = {
  javascript:
    "const url = 'https://api.microlink.io/?url=https://kikobeats.com';\n" +
    "const options = {method: 'GET', headers: {'Content-Type': 'application/json'}};\n" +
    'const response = await fetch(url, options);\n',
  python:
    'import requests\n' +
    '\n' +
    'url = "https://api.microlink.io/"\n' +
    '\n' +
    'headers = {"Content-Type": "application/json"}\n' +
    '\n' +
    'response = requests.get(url, headers=headers)\n' +
    '\n' +
    'print(response.json())',
  ruby:
    "require 'uri'\n" +
    "require 'net/http'\n" +
    '\n' +
    'url = URI("https://api.microlink.io/")\n' +
    '\n' +
    'http = Net::HTTP.new(url.host, url.port)\n' +
    'http.use_ssl = true\n' +
    '\n' +
    'request = Net::HTTP::Get.new(url)\n' +
    'request["Content-Type"] = \'application/json\'\n' +
    '\n' +
    'response = http.request(request)\n' +
    'puts response.read_body',
  go:
    'package main\n' +
    '\n' +
    'import (\n' +
    '\t"fmt"\n' +
    '\t"net/http"\n' +
    '\t"io"\n' +
    ')\n' +
    '\n' +
    'func main() {\n' +
    '\n' +
    '\turl := "https://api.microlink.io/"\n' +
    '\n' +
    '\treq, _ := http.NewRequest("GET", url, nil)\n' +
    '\n' +
    '\treq.Header.Add("Content-Type", "application/json")\n' +
    '\n' +
    '\tres, _ := http.DefaultClient.Do(req)\n' +
    '\n' +
    '\tdefer res.Body.Close()\n' +
    '\tbody, _ := io.ReadAll(res.Body)\n' +
    '\n' +
    '\tfmt.Println(res)\n' +
    '\tfmt.Println(string(body))\n' +
    '\n' +
    '}'
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

// Custom code editor component with sugar-high syntax highlighting
function CodeEditor ({ value, onChange, onKeyDown, style, editable = false }) {
  const textareaRef = useRef(null)
  const preRef = useRef(null)
  const [highlightedCode, setHighlightedCode] = useState('')

  useEffect(() => {
    // Highlight the code using sugar-high
    const highlighted = highlight(value)
    setHighlightedCode(highlighted)
  }, [value])

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
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
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

// Extract toolbar components for better organization
const ToolbarButton = ({ onClick, title, children, variant = 'secondary' }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      backgroundColor: `var(--${variant})`,
      color: `var(--${variant}-foreground)`,
      borderRadius: '6px',
      boxShadow:
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: 'none',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
      width: '2rem',
      height: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    onMouseEnter={e => {
      e.target.style.opacity = '0.8'
    }}
    onMouseLeave={e => {
      e.target.style.opacity = '1'
    }}
  >
    {children}
  </button>
)

const ExternalLinkIcon = () => (
  <svg
    style={{ width: '12px', height: '12px' }}
    fill='none'
    stroke='currentColor'
    viewBox='0 0 24 24'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
    />
  </svg>
)

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
  isLoading
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
        background: 'white',
        width: '6rem',
        height: '2rem'
      }}
    >
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='ruby'>Ruby</option>
      <option value='golang'>Go</option>
    </Select>

    <ToolbarButton
      onClick={onOpenInBrowser}
      title='Open in Browser (GET requests only)'
    >
      <ExternalLinkIcon />
    </ToolbarButton>

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
        {responseData && Object.keys(responseData.headers || {}).length > 0 ? (
          <div>
            {(() => {
              const headers = responseData?.headers || {}
              const maxKeyLength = Math.max(
                ...Object.keys(headers).map(key => key.length)
              )
              return Object.entries(headers).map(([key, value], index) => (
                <Box key={key} css={theme({ mb: index > 0 ? 1 : 0 })}>
                  <span>{key.padEnd(maxKeyLength, ' ')}</span>
                  <span>:</span>
                  <span>{value}</span>
                </Box>
              ))
            })()}
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: 'var(--muted-foreground)' }}>
            No headers available
          </div>
        )}
      </TerminalText>
    </Choose.When>
  </Choose>
)

function MultiCodeEditorV2 ({
  defaultMethod = 'GET',
  height = 192,
  editable = false
}) {
  const [code, setCode] = useState(CODE.javascript)
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState('code')
  const [currentLanguage, setCurrentLanguage] = useState('javascript')
  const [results, setResults] = useState({})
  const [isExpanded, setIsExpanded] = useState(false)

  const parseCodeAndExecute = async () => {
    setIsLoading(true)
    try {
      const startTime = Date.now()
      let response
      let data

      // Only JavaScript can be executed in the browser
      if (currentLanguage === 'javascript') {
        // Wrap the code in an async function and evaluate it
        const wrappedCode = `
        (async () => {
          ${CODE.javascript}
          return response;
        })()
      `

        // Evaluate the code in the browser
        response = await eval(wrappedCode)
        console.log('response', wrappedCode)
        data = await response.json()
      } else {
        // For other languages, we can't execute them in the browser
        // But we can simulate a response structure
        throw new Error(
          `Cannot execute ${currentLanguage} code in browser environment`
        )
      }

      const endTime = Date.now()

      // Convert headers to object
      const responseHeaders = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      const result = {
        status: `${response.status} ${response.statusText}`,
        headers: responseHeaders,
        body: data,
        timing: endTime - startTime
      }

      // Store result for current language
      setResults(prev => ({
        ...prev,
        [currentLanguage]: result
      }))

      setResponseData(result)
    } catch (error) {
      const errorResult = {
        status: 'Error',
        headers: {},
        body: error instanceof Error ? error.message : 'Unknown error occurred',
        timing: 0
      }

      // Store error result for current language
      setResults(prev => ({
        ...prev,
        [currentLanguage]: errorResult
      }))

      setResponseData(errorResult)
    } finally {
      setIsLoading(false)
    }
  }

  const executeRequest = () => {
    if (!isLoading) {
      parseCodeAndExecute().then(() => {
        setActiveView('body')
        setIsExpanded(false)
        console.log('Collected results by language:', results)
      })
    }
  }

  const handleViewClick = view => {
    if (activeView === view && !isExpanded) {
      // Second click on same view - expand to full height
      setIsExpanded(true)
    } else if (activeView === view && isExpanded) {
      // Third click on same view - collapse back to normal
      setIsExpanded(false)
    } else {
      // First click or different view - switch view and reset expansion
      setActiveView(view)
      setIsExpanded(false)
    }
  }

  const handleOpenInBrowser = () => {
    try {
      // Extract URL from JavaScript fetch code
      const fetchMatch = code.match(/fetch\(['"`]([^'"`]+)['"`]/)
      const url = fetchMatch ? fetchMatch[1] : 'https://api.microlink.io/'

      // Extract method
      const methodMatch = code.match(/method:\s*['"`]([^'"`]+)['"`]/)
      const method = methodMatch ? methodMatch[1].toUpperCase() : 'GET'

      if (method === 'GET') {
        window.open(url, '_blank')
      } else {
        window.alert(
          `Cannot open ${method} requests in browser. Only GET requests are supported.`
        )
      }
    } catch (error) {
      window.alert('Could not extract URL from the request')
    }
  }

  const handleLanguageChange = e => {
    setCurrentLanguage(e.target.value)
    setCode(CODE[e.target.value])
    setActiveView('code')
  }

  const componentHeight = isExpanded ? 'calc(100vh - 200px)' : `${height}px`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Terminal
        showHeader={false}
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
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onOpenInBrowser={handleOpenInBrowser}
          onExecute={executeRequest}
          isLoading={isLoading}
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
