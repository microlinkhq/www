import {
  Flex,
  Caps,
  Spinner,
  Button,
  Select,
  Choose,
  Image
} from 'components/elements'
import { useLocalStorage } from 'components/hook'
import React, { useState, useRef } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { highlight } from 'sugar-high'
import ProBadge from '../../patterns/ProBadge/ProBadge'
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  space,
  theme,
  transition
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
import Input from '../Input/Input'

const Content = styled(TerminalText)`
  padding: 0 ${space[2]};
`

const fontStyles = {
  fontFamily: fonts.mono,
  fontSize: fontSizes[0],
  lineHeight: lineHeights[4],
  letterSpacing: '0px',
  fontWeight: fontWeights.normal,
  tabSize: 2
}

function ViewButton ({ view, activeView, onClick, isExpanded, disabled }) {
  const isActive = activeView === view
  const buttonId = `view-button-${view}`
  const ariaLabel = `View ${view} content${
    isActive ? ' (currently active)' : ''
  }`

  return (
    <button
      id={buttonId}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      role='tab'
      aria-selected={isActive}
      aria-controls={`tabpanel-${view}`}
      css={theme({
        outline: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: isActive ? 'black' : 'black50',
        fontWeight: isActive ? fontWeights.bold : fontWeights.normal,
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        '&:hover': {
          textDecoration: 'underline'
        }
      })}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {view}
      {isActive && (
        <FeatherIcon
          icon={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          color='black'
          size={[0, 0, 0, 0]}
          aria-hidden='true'
        />
      )}
    </button>
  )
}

function CodeEditor ({
  value,
  onChange,
  onKeyDown,
  style,
  editable = false,
  ...props
}) {
  const textareaRef = useRef(null)
  const preRef = useRef(null)

  const handleScroll = () => {
    if (editable && textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop
      preRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      role='group'
      aria-label='Code editor'
      aria-labelledby='aria-labelledby'
      {...props}
    >
      <Content
        as='pre'
        ref={preRef}
        role='presentation'
        aria-hidden={editable}
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
          aria-label='Edit code'
          aria-describedby='code-editor-help'
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
      {editable && (
        <span id='code-editor-help' style={{ display: 'none' }}>
          Use Tab to indent, Shift+Tab to outdent. Press Ctrl+Enter to execute
          code.
        </span>
      )}
    </div>
  )
}

const PlayIcon = () => (
  <svg
    style={{ width: '12px', height: '12px' }}
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
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
    role='toolbar'
    aria-label='Code editor actions'
  >
    <Select
      value={currentLanguage}
      onChange={onLanguageChange}
      aria-label='Select programming language'
      style={{
        backgroundColor: 'white',
        width: '6rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center'
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
      aria-label={isLoading ? 'Executing code...' : 'Execute code'}
      aria-describedby='execute-button-help'
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
      {isLoading
        ? (
          <Spinner
            width='12px'
            height='16px'
            color={colors.white}
            style={{ padding: '0' }}
            aria-label='Loading'
          />
          )
        : (
          <PlayIcon />
          )}
    </Button>
    <span id='execute-button-help' style={{ display: 'none' }}>
      Click to run the code and see the API response
    </span>
  </div>
)

const ViewNavigation = ({
  activeView,
  onViewClick,
  isExpanded,
  showApiKeyInput
}) => (
  <Flex
    as='nav'
    role='tablist'
    aria-label='Response view options'
    css={theme({
      pt: 2,
      justifyContent: 'flex-end'
    })}
  >
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
        disabled={showApiKeyInput}
        view='code'
        activeView={activeView}
        onClick={() => onViewClick('code')}
        isExpanded={isExpanded}
      />
      <span aria-hidden='true'>|</span>
      <ViewButton
        disabled={showApiKeyInput}
        view='body'
        activeView={activeView}
        onClick={() => onViewClick('body')}
        isExpanded={isExpanded}
      />
      <span aria-hidden='true'>|</span>
      <ViewButton
        disabled={showApiKeyInput}
        view='headers'
        activeView={activeView}
        onClick={() => onViewClick('headers')}
        isExpanded={isExpanded}
      />
    </Text>
  </Flex>
)

const ContentArea = ({
  activeView,
  code,
  setCode,
  editable,
  responseData,
  fontStyles,
  apiKey,
  tempApiKey,
  setTempApiKey,
  handleApiKeySubmit,
  setApiKey,
  showApiKeyInput,
  setShowApiKeyInput
}) => {
  if (showApiKeyInput) {
    return (
      <Content
        as='div'
        data-debug
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Text as='h3' css={theme({ fontSize: 2, fontWeight: 'bold' })}>
            {apiKey ? 'Ready to Execute' : 'API Key Setup'}
          </Text>

          {!apiKey
            ? (
              <>
                <Text css={theme({ py: 3, fontSize: 0, color: 'black60' })}>
                  Some requests require a <ProBadge /> plan.
                  <br />
                  Enter your Microlink API key to unlock all features.
                </Text>
                <Flex css={theme({ justifyContent: 'center' })}>
                  <Input
                    type='text'
                    placeholder='Enter your API key…'
                    css={theme({ width: '8rem', fontSize: '12px' })}
                    labelCss={{ py: '4px' }}
                    value={tempApiKey}
                    onChange={e => setTempApiKey(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && tempApiKey.trim()) {
                        handleApiKeySubmit()
                      }
                    }}
                    required
                  />
                  <Button
                    css={theme({ ml: 2 })}
                    disabled={!tempApiKey.trim()}
                    onClick={handleApiKeySubmit}
                    variant='black'
                  >
                    <Caps css={theme({ fontSize: '12px' })}>use it</Caps>
                  </Button>
                </Flex>
              </>
              )
            : (
              <>
                <p
                  style={{
                    margin: 0,
                    marginBottom: '1rem',
                    color: colors.black60,
                    fontSize: '0.9rem'
                  }}
                >
                  API key configured. <br />
                  Execute a request to see the response here.
                </p>
                <Button
                  onClick={() => {
                    setApiKey('')
                    setTempApiKey('')
                    setShowApiKeyInput(false)
                  }}
                  variant='white'
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  Clear API Key
                </Button>
              </>
              )}
        </div>
      </Content>
    )
  }

  return (
    <Choose>
      <Choose.When condition={activeView === 'code'}>
        <CodeEditor
          value={code}
          onChange={setCode}
          editable={editable}
          style={fontStyles}
          aria-label='Code editor'
          aria-describedby='code-editor-help'
          id='tabpanel-code'
          aria-labelledby='view-button-code'
        />
      </Choose.When>
      <Choose.When
        condition={activeView === 'body'}
        render={() => {
          if (!responseData) {
            return (
              <Content
                as='div'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: colors.black50,
                  fontStyle: 'italic',
                  ...fontStyles
                }}
              >
                No response data available. Execute a request to see the
                response.
              </Content>
            )
          }

          const { body, headers } = responseData
          const contentType = headers['content-type']

          if (contentType.includes('application/json')) {
            return (
              <Content
                as='pre'
                role='code'
                aria-label='JSON response data'
                id={`tabpanel-${activeView}`}
                aria-labelledby={`view-button-${activeView}`}
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-words',
                  ...fontStyles
                }}
              >
                {(() => {
                  const text = new TextDecoder().decode(body)
                  const payload =
                    responseData.status === 'rejected'
                      ? JSON.parse(text)
                      : JSON.parse(text).data
                  return JSON.stringify(payload, null, 2)
                })()}
              </Content>
            )
          }

          if (contentType.startsWith('image/')) {
            const blob = new Blob([body], { type: contentType })
            const imageUrl = URL.createObjectURL(blob)

            const handleImageClick = () => {
              window.open(imageUrl, '_blank')
            }

            const handleKeyDown = e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleImageClick()
              }
            }

            return (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative'
                }}
                onClick={handleImageClick}
                onKeyDown={handleKeyDown}
                role='button'
                tabIndex={0}
                aria-label='Click to open image in new tab'
                id={`tabpanel-${activeView}`}
                aria-labelledby={`view-button-${activeView}`}
                onMouseEnter={e => {
                  const overlay =
                    e.currentTarget.querySelector('.image-overlay')
                  if (overlay) overlay.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const overlay =
                    e.currentTarget.querySelector('.image-overlay')
                  if (overlay) overlay.style.opacity = '0'
                }}
              >
                <Image
                  src={imageUrl}
                  alt='API response image - click to view full size'
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    cursor: 'pointer',
                    transition: `opacity ${transition.normal}`
                  }}
                  title='Click to open image in new tab'
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: colors.white70,
                    color: colors.black50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0,
                    transition: `opacity ${transition.normal}`,
                    cursor: 'pointer',
                    fontSize: fontSizes[0],
                    fontWeight: fontWeights.bold,
                    textAlign: 'center'
                  }}
                  className='image-overlay'
                  aria-hidden='true'
                >
                  Click to expand
                </div>
              </div>
            )
          }

          return (
            <Content
              as='pre'
              role='code'
              aria-label='Response content'
              id={`tabpanel-${activeView}`}
              aria-labelledby={`view-button-${activeView}`}
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-words',
                ...fontStyles
              }}
            >
              {contentType && contentType.includes('text/')
                ? new TextDecoder().decode(body)
                : `Binary content (${contentType})\nSize: ${body.byteLength} bytes`}
            </Content>
          )
        }}
      />

      <Choose.When
        condition={activeView === 'headers'}
        render={() => (
          <TerminalText
            style={{ padding: 0, ...fontStyles }}
            role='tabpanel'
            id={`tabpanel-${activeView}`}
            aria-labelledby={`view-button-${activeView}`}
            aria-label='Response headers'
          >
            {!responseData
              ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    color: colors.black50,
                    fontStyle: 'italic',
                    padding: '2rem'
                  }}
                >
                  No response headers available. Execute a request to see the
                  headers.
                </div>
                )
              : (
                <div role='table' aria-label='HTTP response headers'>
                  {(() => {
                    const headers = responseData?.headers || {}
                    const maxKeyLength = Math.max(
                      ...Object.keys(headers).map(key => key.length)
                    )
                    const sortedHeaders = Object.entries(headers).sort(
                      ([a], [b]) => a.localeCompare(b)
                    )
                    return sortedHeaders.map(([key, value], index) => (
                      <Box
                        key={key}
                        css={theme({ mb: index > 0 ? 1 : 0 })}
                        role='row'
                      >
                        <span role='cell' aria-label={`Header name: ${key}`}>
                          {key.padEnd(maxKeyLength, ' ')}
                        </span>
                        <span role='cell' aria-hidden='true'>
                          :
                        </span>
                        <span role='cell' aria-label={`Header value: ${value}`}>
                          {value}
                        </span>
                      </Box>
                    ))
                  })()}
                </div>
                )}
          </TerminalText>
        )}
      />
    </Choose>
  )
}

function MultiCodeEditorInteractive ({
  mqlCode: codeSnippets,
  height = 180,
  editable = false
}) {
  const availableLanguages = Object.keys(codeSnippets)
  const [currentLanguage, setCurrentLanguage] = useState('JavaScript')

  // Ensure saved language is available, fallback to first available language
  const validLanguage = availableLanguages.includes(currentLanguage)
    ? currentLanguage
    : availableLanguages[0]

  const [code, setCode] = useState(codeSnippets[validLanguage])
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState('code')
  const [isExpanded, setIsExpanded] = useState(false)

  // API key management
  const [apiKey, setApiKey] = useLocalStorage('mql-api-key', '')
  const [tempApiKey, setTempApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

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

  const checkForProPlanRequired = responseText => {
    return responseText && responseText.includes('You need a pro plan')
  }

  const parseCodeAndExecute = async () => {
    setIsLoading(true)
    const result = await (async () => {
      try {
        const [targetUrl, query] = parseCodeParameters()
        const requestOptions = {
          endpoint: 'http://localhost:3000/',
          ...query
        }

        // Add API key if available
        if (apiKey) {
          requestOptions.apiKey = apiKey
        }

        const raw = await mql.arrayBuffer(targetUrl, requestOptions)

        const { body, headers } = raw
        return {
          status: 'fulfilled',
          headers: Object.fromEntries(headers),
          body
        }
      } catch (error) {
        const { headers, name, statusCode, message, url, ...body } = error
        const encoder = new TextEncoder()
        const errorBody = encoder.encode(JSON.stringify(body))

        return {
          status: 'rejected',
          headers: headers || {},
          body: errorBody
        }
      }
    })()

    if (result.status === 'rejected') {
      const errorText = new TextDecoder().decode(result.body)
      if (checkForProPlanRequired(errorText) && !apiKey) {
        setIsLoading(false)
        return
      }
    }

    setResponseData(result)
    setIsLoading(false)
  }

  const handleApiKeySubmit = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim())
      setTempApiKey('')
      setShowApiKeyInput(false)
      // Retry the request with the new API key
      parseCodeAndExecute()
    }
  }

  const executeRequest = () => {
    if (!isLoading) {
      parseCodeAndExecute().then(() => {
        // if (!showApiKeyOverlay) { // Removed overlay state
        setActiveView('body')
        setIsExpanded(false)
        // }
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
      const { body, headers } = responseData
      const contentType = headers['content-type']
      if (contentType.includes('application/json')) {
        const text = new TextDecoder().decode(body)
        const { data } = JSON.parse(text)
        return JSON.stringify(data, null, 2)
      }

      if (contentType.startsWith('image/')) {
        return `Image content (${contentType})\nSize: ${body.byteLength} bytes`
      }

      throw new Error(`Unsupported content type: ${contentType}`)
    } else if (activeView === 'headers') {
      return Object.entries(responseData.headers || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')
    }
    return ''
  }

  const TerminalActions = ({ setActiveView }) => (
    <div
      role='group'
      aria-label='Terminal actions'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <button
        onClick={() => setShowApiKeyInput(!showApiKeyInput)}
        title={showApiKeyInput ? 'Hide API key input' : 'Show API key input'}
        aria-label={
          showApiKeyInput ? 'Hide API key input' : 'Show API key input'
        }
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          top: '-1px'
        }}
        onMouseEnter={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black
        }}
        onMouseLeave={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) {
            icon.style.stroke = showApiKeyInput ? colors.black : colors.black20
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            const newShowApiKeyInput = !showApiKeyInput
            setShowApiKeyInput(newShowApiKeyInput)
            if (newShowApiKeyInput) {
              setActiveView('body')
            } else {
              setActiveView('code')
            }
          }
        }}
      >
        <FeatherIcon
          icon='Key'
          color={showApiKeyInput ? colors.black : colors.black20}
          size={[1, 1, 1, 1]}
          aria-hidden='true'
        />
      </button>
      <button
        onClick={handleOpenInBrowser}
        title='Open API request in browser'
        aria-label='Open API request in browser'
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          top: '-1px'
        }}
        onMouseEnter={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black
        }}
        onMouseLeave={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black20
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpenInBrowser()
          }
        }}
      >
        <FeatherIcon
          icon='Globe'
          color={colors.black20}
          size={[1, 1, 1, 1]}
          aria-hidden='true'
        />
      </button>
      <CodeCopy text={getCurrentViewText()} />
    </div>
  )

  const componentHeight = isExpanded ? `${height * 2}px` : `${height}px`

  return (
    <article
      itemScope
      itemType='https://schema.org/SoftwareApplication'
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Interactive Code Editor',
            description:
              'An interactive code editor for testing API requests with multiple programming languages',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            programmingLanguage: availableLanguages,
            featureList: [
              'Multi-language code editing',
              'Real-time API testing',
              'Response visualization',
              'Code execution',
              'Syntax highlighting'
            ]
          })
        }}
      />

      <header style={{ display: 'none' }}>
        <h2 itemProp='name'>Interactive Code Editor</h2>
        <p itemProp='description'>
          Test API requests with multiple programming languages. Edit code,
          execute requests, and view responses in real-time.
        </p>
      </header>

      <main>
        <Terminal
          text={getCurrentViewText()}
          ActionComponent={() => (
            <TerminalActions setActiveView={setActiveView} />
          )}
          css={theme({ width: TERMINAL_WIDTH })}
          style={{ position: 'relative' }}
          role='application'
          aria-label='Interactive code editor and API testing tool'
        >
          <div
            style={{ height: componentHeight }}
            aria-live='polite'
            aria-busy={isLoading}
          >
            {/* FadeOverlay $position='top' aria-hidden='true' */}

            <ContentArea
              activeView={activeView}
              code={code}
              setCode={setCode}
              editable={editable}
              responseData={responseData}
              fontStyles={fontStyles}
              apiKey={apiKey}
              tempApiKey={tempApiKey}
              setTempApiKey={setTempApiKey}
              handleApiKeySubmit={handleApiKeySubmit}
              setApiKey={setApiKey}
              showApiKeyInput={showApiKeyInput}
              setShowApiKeyInput={setShowApiKeyInput}
            />

            {/* FadeOverlay $position='bottom' aria-hidden='true' */}
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
            showApiKeyInput={showApiKeyInput}
          />
        )}
      </main>
    </article>
  )
}

export default MultiCodeEditorInteractive
