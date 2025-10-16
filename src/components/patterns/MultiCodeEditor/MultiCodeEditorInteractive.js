import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Choose from 'components/elements/Choose'
import {
  Code,
  wrapLinesWithHighlight
} from 'components/elements/CodeEditor/CodeEditor'
import CodeCopy from 'components/elements/Codecopy'
import Flex from 'components/elements/Flex'
import If from 'components/elements/If'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import Select from 'components/elements/Select/Select'
import Spinner from 'components/elements/Spinner'
import Text from 'components/elements/Text'
import { ChevronUp, ChevronDown, Key, Globe } from 'react-feather'
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

import { useLocalStorage } from 'components/hook/use-local-storage'
import React, { useState, useRef, useCallback } from 'react'
import FeatherIcon from 'components/icons/Feather'
import ProBadge from '../ProBadge/ProBadge'
import { highlight } from 'sugar-high'
import styled from 'styled-components'
import mql from '@microlink/mql'

import Terminal, {
  TERMINAL_WIDTH,
  TerminalText
} from 'components/elements/Terminal/Terminal'

const fontStyles = {
  fontFamily: fonts.mono,
  fontSize: fontSizes[0],
  lineHeight: lineHeights[4],
  letterSpacing: '0px',
  fontWeight: fontWeights.normal,
  tabSize: 2
}

const Content = styled(TerminalText)`
  padding: 0 ${space[2]};
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  ${theme(fontStyles)}
`

const FadeOverlay = styled(Box)`
  height: ${({ $position }) => ($position === 'top' ? '30px' : '34px')};
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: ${({ $position }) => ($position === 'top' ? '34px' : 'auto')};
  bottom: ${({ $position }) => ($position === 'bottom' ? '0' : 'auto')};

  &:before {
    background: linear-gradient(
      to ${({ $position }) => ($position === 'bottom' ? 'top' : 'bottom')},
      white ${({ $position }) => ($position === 'top' ? '50%' : '50%')},
      transparent 100%
    );
    bottom: 0px;
    content: '';
    height: ${({ $position }) => ($position === 'top' ? '30px' : '34px')};
    left: 0px;
    position: absolute;
    width: 100%;
  }
`

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
        _hover: {
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
          icon={isExpanded ? ChevronUp : ChevronDown}
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
  editable,
  language,
  ...props
}) {
  const textareaRef = useRef(null)
  const codeRef = useRef(null)

  const handleScroll = () => {
    if (editable && textareaRef.current && codeRef.current) {
      codeRef.current.scrollTop = textareaRef.current.scrollTop
      codeRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <Box
      css={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
      role='group'
      aria-label='Code editor'
      aria-labelledby='aria-labelledby'
      {...props}
    >
      <Content
        as='pre'
        ref={codeRef}
        role='presentation'
        aria-hidden={editable}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          pointerEvents: editable ? 'none' : 'auto',
          overflow: 'auto'
        }}
        dangerouslySetInnerHTML={{
          __html: wrapLinesWithHighlight(highlight(value))
        }}
      />

      {editable && (
        <Content
          as='textarea'
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onScroll={handleScroll}
          aria-label='Edit code'
          aria-describedby='code-editor-help'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'transparent',
            color: 'transparent',
            resize: 'none',
            outline: 'none',
            border: 'none',
            caretColor: colors.secondary
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
    </Box>
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

PlayIcon.displayName = 'PlayIcon'

const Toolbar = React.memo(
  ({
    currentLanguage,
    onLanguageChange,
    onExecute,
    isLoading,
    availableLanguages
  }) => (
    <Flex
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        alignItems: 'center',
        gap: '0.5rem'
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
    </Flex>
  )
)

Toolbar.displayName = 'Toolbar'

const ApiKeyInput = React.memo(({ apiKey, onApiKeySubmit, setApiKey }) => {
  const [tempApiKey, setTempApiKey] = useState('')

  const handleSubmit = useCallback(() => {
    if (tempApiKey.trim()) {
      const newApiKey = tempApiKey.trim()
      onApiKeySubmit(newApiKey)
      setTempApiKey('')
    }
  }, [tempApiKey, onApiKeySubmit])

  return (
    <Flex css={theme({ justifyContent: 'center' })}>
      <Choose>
        <Choose.When
          condition={!apiKey}
          render={() => (
            <>
              <Input
                required
                type='text'
                placeholder='Enter your API key…'
                css={theme({ width: '8rem', fontSize: '12px' })}
                labelCss={{ py: '4px' }}
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
              />
              <Button
                css={theme({ ml: 2 })}
                disabled={!tempApiKey.trim()}
                onClick={handleSubmit}
                variant='black'
              >
                <Caps css={theme({ fontSize: '12px' })}>use it</Caps>
              </Button>
            </>
          )}
        />
        <Choose.Otherwise
          render={() => (
            <Button
              css={theme({ ml: 2 })}
              onClick={() => {
                setApiKey('')
                setTempApiKey('')
              }}
              variant='white'
            >
              <Caps css={theme({ fontSize: '12px' })}>clear it</Caps>
            </Button>
          )}
        />
      </Choose>
    </Flex>
  )
})

ApiKeyInput.displayName = 'ApiKeyInput'

const ViewNavigation = React.memo(
  ({ activeView, onViewClick, isExpanded, showApiKeyInput }) => (
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
)

ViewNavigation.displayName = 'ViewNavigation'

const ContentArea = React.memo(
  ({
    activeView,
    code,
    setCode,
    editable,
    responseData,
    apiKey,
    onApiKeySubmit,
    setApiKey,
    showApiKeyInput,
    language
  }) => {
    if (showApiKeyInput) {
      return (
        <Content
          as='div'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Text as='h3' css={theme({ fontSize: 2, fontWeight: 'bold' })}>
              API key setup
            </Text>

            <>
              <Text css={theme({ py: 3, fontSize: 0, color: 'black60' })}>
                <Choose>
                  <Choose.When
                    condition={!apiKey}
                    render={() => (
                      <>
                        Some requests require a <ProBadge /> plan.
                        <br />
                        Enter your Microlink API key to unlock all features.
                      </>
                    )}
                  />
                  <Choose.Otherwise
                    render={() => (
                      <>
                        API key already configured. <br />
                        You can access to <ProBadge /> features now.
                      </>
                    )}
                  />
                </Choose>
              </Text>
              <ApiKeyInput
                apiKey={apiKey}
                onApiKeySubmit={onApiKeySubmit}
                setApiKey={setApiKey}
              />
            </>
          </div>
        </Content>
      )
    }

    return (
      <Choose>
        <Choose.When
          condition={activeView === 'code'}
          render={() => (
            <CodeEditor
              value={code}
              onChange={setCode}
              editable={editable}
              language={language}
              aria-label='Code editor'
              aria-describedby='code-editor-help'
              id='tabpanel-code'
              aria-labelledby='view-button-code'
            />
          )}
        />
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
                    fontStyle: 'italic'
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
              const jsonText = new TextDecoder().decode(body)
              const formattedJson = JSON.stringify(
                JSON.parse(jsonText),
                null,
                2
              )

              return <Code language='json'>{formattedJson}</Code>
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
                <Flex
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
                    Click to open
                  </div>
                </Flex>
              )
            }

            return (
              <Content
                as='pre'
                role='code'
                aria-label='Response content'
                id={`tabpanel-${activeView}`}
                aria-labelledby={`view-button-${activeView}`}
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
)

ContentArea.displayName = 'ContentArea'

const TerminalActions = React.memo(
  ({
    showApiKeyInput,
    setShowApiKeyInput,
    setActiveView,
    handleOpenInBrowser,
    getCurrentViewText
  }) => (
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
          icon={Key}
          color={showApiKeyInput ? colors.black : colors.black20}
          size={[1, 1, 1, 1]}
          animations={false}
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
          icon={Globe}
          color={colors.black20}
          size={[1, 1, 1, 1]}
          animations={false}
          aria-hidden='true'
        />
      </button>
      <CodeCopy text={getCurrentViewText()} />
    </div>
  )
)

TerminalActions.displayName = 'TerminalActions'

function MultiCodeEditorInteractive ({
  mqlCode: codeSnippets,
  height = 180,
  editable = false
}) {
  const [languageIndex, setLanguageIndex] = useLocalStorage(
    'multi_code_editor_index',
    2
  )

  const availableLanguages = Object.keys(codeSnippets)
  const [language, setLanguage] = useState(availableLanguages[languageIndex])

  // Ensure saved language is available, fallback to first available language
  const currentLanguage = availableLanguages.includes(language)
    ? language
    : availableLanguages[0]

  const [code, setCode] = useState(codeSnippets[currentLanguage])
  const [responseData, setResponseData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeView, setActiveView] = useState('code')
  const [isExpanded, setIsExpanded] = useState(false)

  // API key management
  const [apiKey, setApiKey] = useLocalStorage('mql-api-key', '')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)

  React.useEffect(() => {
    const handleStorageChange = e => {
      if (
        e.key === 'mql-code-editor-language' &&
        e.newValue &&
        availableLanguages.includes(e.newValue)
      ) {
        setLanguage(e.newValue)
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
        setLanguageIndex(availableLanguages.indexOf(e.detail.newValue))
        setLanguage(e.detail.newValue)
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
  }, [setLanguage, availableLanguages, codeSnippets, setCode, setActiveView])

  const parseCodeParameters = useCallback(() => {
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
  }, [codeSnippets.JavaScript])

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

  const checkForProPlanRequired = responseText =>
    responseText && responseText.includes('You need a pro plan')

  const parseCodeAndExecute = useCallback(
    async apiKey => {
      setIsLoading(true)
      const result = await (async () => {
        try {
          const [targetUrl, mqlOpts] = parseCodeParameters()
          if (apiKey) mqlOpts.apiKey = apiKey
          const raw = await mql.arrayBuffer(targetUrl, mqlOpts)
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

      setResponseData(result)

      if (result.status === 'rejected') {
        const errorText = new TextDecoder().decode(result.body)
        if (checkForProPlanRequired(errorText) && !apiKey) {
          setShowApiKeyInput(true)
        }
      }

      setIsLoading(false)
    },
    [parseCodeParameters]
  )

  const handleApiKeySubmit = useCallback(
    newApiKey => {
      setApiKey(newApiKey)
      setShowApiKeyInput(false)
      parseCodeAndExecute(newApiKey)
    },
    [setApiKey, parseCodeAndExecute]
  )

  const executeRequest = useCallback(() => {
    if (!isLoading) {
      parseCodeAndExecute(apiKey).then(() => {
        setActiveView('body')
        setIsExpanded(false)
      })
    }
  }, [isLoading, parseCodeAndExecute, apiKey])

  const handleViewClick = useCallback(
    view => {
      if (activeView === view && !isExpanded) {
        setIsExpanded(true)
      } else if (activeView === view && isExpanded) {
        setIsExpanded(false)
      } else {
        setActiveView(view)
      }
    },
    [activeView, isExpanded]
  )

  const handleOpenInBrowser = useCallback(() => {
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
  }, [parseCodeParameters])

  const handleLanguageChange = useCallback(
    e => {
      const newLanguage = e.target.value
      setLanguage(newLanguage)
      setCode(codeSnippets[newLanguage])
      setActiveView('code')

      // Dispatch custom event to notify other components on the same page
      window.dispatchEvent(
        new CustomEvent('mql-language-change', {
          detail: { key: 'mql-code-editor-language', newValue: newLanguage }
        })
      )
    },
    [codeSnippets]
  )

  const getCurrentViewText = useCallback(() => {
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
  }, [activeView, code, responseData])

  const MemoizedActionComponent = useCallback(
    () => (
      <TerminalActions
        showApiKeyInput={showApiKeyInput}
        setShowApiKeyInput={setShowApiKeyInput}
        setActiveView={setActiveView}
        handleOpenInBrowser={handleOpenInBrowser}
        getCurrentViewText={getCurrentViewText}
      />
    ),
    [showApiKeyInput, handleOpenInBrowser, getCurrentViewText]
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
          ActionComponent={MemoizedActionComponent}
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
            <If
              condition={
                showApiKeyInput ||
                !responseData?.headers['content-type'].includes('image/')
              }
              render={() => <FadeOverlay $position='top' aria-hidden='true' />}
            />

            <ContentArea
              activeView={activeView}
              code={code}
              setCode={setCode}
              editable={editable}
              responseData={responseData}
              apiKey={apiKey}
              onApiKeySubmit={handleApiKeySubmit}
              setApiKey={setApiKey}
              showApiKeyInput={showApiKeyInput}
              language={language}
            />

            <If
              condition={
                showApiKeyInput ||
                !responseData?.headers['content-type'].includes('image/')
              }
              render={() => (
                <FadeOverlay $position='bottom' aria-hidden='true' />
              )}
            />
          </div>

          <Toolbar
            currentLanguage={currentLanguage}
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
