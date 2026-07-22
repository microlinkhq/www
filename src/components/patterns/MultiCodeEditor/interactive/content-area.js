import { Code } from 'components/elements/CodeEditor/CodeEditor'
import { TerminalText } from 'components/elements/Terminal/Terminal'
import Image from 'components/elements/Image/Image'
import Choose from 'components/elements/Choose'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import React, { useState, useEffect } from 'react'
import { colors, fontSizes, fontWeights, theme, transition } from 'theme'

import ProBadge from '../../ProBadge/ProBadge'
import InteractiveCodeEditor from './interactive-code-editor'
import ApiKeyInput from './api-key-input'
import { Content, fontStyles } from './content'

const IMAGE_OVERLAY_STYLE = {
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
}

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
    language,
    codeSnippets
  }) => {
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
      if (!responseData) {
        setImageUrl(null)
        return
      }
      const { body, headers } = responseData
      const contentType = headers['content-type'] || ''
      if (!contentType.startsWith('image/')) {
        setImageUrl(null)
        return
      }
      const url = URL.createObjectURL(new Blob([body], { type: contentType }))
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }, [responseData])

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
            <InteractiveCodeEditor
              codeSnippets={codeSnippets}
              activeLanguage={language}
              editable={editable}
              code={code}
              setCode={setCode}
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
              const handleImageClick = () => {
                window.open(imageUrl, '_blank', 'noopener,noreferrer')
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
                    style={IMAGE_OVERLAY_STYLE}
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
                role='tabpanel'
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
                  <div>
                    {(() => {
                      const headers = responseData?.headers || {}
                      const maxKeyLength = Math.max(
                        ...Object.keys(headers).map(key => key.length)
                      )
                      const sortedHeaders = Object.entries(headers).sort(
                        ([a], [b]) => a.localeCompare(b)
                      )
                      return sortedHeaders.map(([key, value], index) => (
                        <Box key={key} css={theme({ mb: index > 0 ? 1 : 0 })}>
                          {`${key.padEnd(maxKeyLength, ' ')}:${value}`}
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

export default ContentArea
