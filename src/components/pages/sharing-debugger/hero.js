import React, { useState, useEffect, createElement } from 'react'
import { theme } from 'theme'
import prependHttp from 'prepend-http'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { useQueryState } from 'components/hook/use-query-state'
import { PREVIEWS } from 'components/pages/sharing-debugger/preview'
import { Metatags } from 'components/pages/sharing-debugger/metatags'
import Caps from 'components/elements/Caps'
import FetchProvider from 'components/patterns/FetchProvider'
import Caption from 'components/patterns/Caption/Caption'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { Link } from 'components/elements/Link'
import { isDevelopment } from 'helpers/is-development'
import { hasDomainLikeHostname } from 'helpers/url-input'
import {
  buildSharingDebuggerUrl,
  buildSharingDebuggerDisplayUrl
} from 'helpers/share-debugger-url'

const DEFAULT_URL = 'https://microlink.io'

const HAS_FORCE = !isDevelopment

export const Hero = () => {
  const [query] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)
  const [inputError, setInputError] = useState('')
  const [currentAnalyzedUrl, setCurrentAnalyzedUrl] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasQuery = isMounted && !!query.url
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp')
  const [inputUrl, setInputUrl] = useState('')
  const [showValidation, setShowValidation] = useState(false)
  const [isDefaultDemo, setIsDefaultDemo] = useState(false)
  const defaultFetched = React.useRef(false)
  const doFetchRef = React.useRef(null)

  const platforms =
    selectedPlatform === 'all'
      ? Object.entries(PREVIEWS).filter(([key, value]) => value.component)
      : [[selectedPlatform, PREVIEWS[selectedPlatform]]]

  useEffect(() => {
    if (!isMounted) return

    setInputUrl(query.url || '')
  }, [isMounted, query.url])

  useEffect(() => {
    if (query.url) {
      setShowValidation(true)
      setIsDefaultDemo(false)
      setInputError('')
      setCurrentAnalyzedUrl(query.url)
    }
  }, [query.url])

  useEffect(() => {
    if (defaultFetched.current || query.url) return
    defaultFetched.current = true
    setShowValidation(true)
    setIsDefaultDemo(true)
    setCurrentAnalyzedUrl(DEFAULT_URL)
    if (doFetchRef.current) {
      doFetchRef.current(DEFAULT_URL, { syncQuery: false })
    }
  }, [query.url])

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search)
      const url = params.get('url')

      if (url) {
        setInputUrl(url)
        setCurrentAnalyzedUrl(url)
        setShowValidation(true)
        setIsDefaultDemo(false)
        setInputError('')
        if (doFetchRef.current) {
          doFetchRef.current(prependHttp(url), { syncQuery: false })
        }
      } else {
        setInputUrl('')
        setShowValidation(true)
        setIsDefaultDemo(true)
        setCurrentAnalyzedUrl(DEFAULT_URL)
        setInputError('')
        if (doFetchRef.current) {
          doFetchRef.current(DEFAULT_URL, { syncQuery: false })
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <FetchProvider mqlOpts={{ force: HAS_FORCE, meta: true }}>
      {({ status, doFetch, data, error }) => {
        const isLoading =
          (hasQuery && status === 'initial') || status === 'fetching'
        const metadata = status === 'error' ? null : data || null
        const activeTabId = `sharing-debugger-tab-${selectedPlatform}`
        const shouldShowInlineError = status === 'error'
        const shareResultUrl = buildSharingDebuggerUrl(currentAnalyzedUrl)
        const shareResultDisplayUrl =
          buildSharingDebuggerDisplayUrl(currentAnalyzedUrl)
        const inlineErrorMessage =
          error?.description ||
          error?.message ||
          "We couldn't fetch metadata for this URL."

        const submitUrl = value => {
          const trimmedValue = value.trim()

          if (!trimmedValue) {
            setInputError('Enter a URL to inspect.')
            setShowValidation(false)
            return
          }

          const normalizedUrl = prependHttp(trimmedValue)

          if (!hasDomainLikeHostname(normalizedUrl)) {
            setInputError('Enter a valid URL format.')
            setShowValidation(false)
            return
          }

          setInputError('')
          setShowValidation(true)
          setIsDefaultDemo(false)
          setInputUrl(trimmedValue)
          setCurrentAnalyzedUrl(trimmedValue)
          doFetch(normalizedUrl, { queryUrl: trimmedValue })
        }

        const handleSubmit = event => {
          if (event) event.preventDefault()
          submitUrl(inputUrl)
        }

        doFetchRef.current = doFetch

        const isAll = selectedPlatform === 'all'

        return (
          <Box as='section' id='hero'>
            <Box id='input'>
              <Heading>Sharing debugger</Heading>
              <Caption
                forwardedAs='h2'
                css={theme({
                  pt: '20px',
                  px: [4, 0],
                  fontSize: [2, 2, '25px', '25px']
                })}
              >
                Debug and validate metadata HTML markup, including Open Graph,
                microdata, RDFa, JSON-LD, and more. Preview how your URL appears
                on major social networks instantly.
              </Caption>

              <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
                <Flex
                  as='form'
                  css={theme({
                    mt: [2, 2, 3, 3],
                    pt: [3, 3, 4, 4],
                    pb: 4,
                    mx: [0, 0, 'auto', 'auto'],
                    justifyContent: 'center',
                    flexDirection: ['column', 'column', 'row', 'row']
                  })}
                  onSubmit={handleSubmit}
                >
                  <Box>
                    <Input
                      id='sharing-debugger-url'
                      css={theme({
                        fontSize: 2,
                        width: ['100%', '320px', '320px', '320px']
                      })}
                      iconComponent={
                        <InputIcon.Microlink
                          src={metadata?.logo?.url}
                          url={
                            inputUrl.trim()
                              ? prependHttp(inputUrl.trim())
                              : undefined
                          }
                        />
                      }
                      aria-invalid={Boolean(inputError)}
                      aria-label='URL to debug'
                      autoCapitalize='none'
                      autoComplete='url'
                      autoCorrect='off'
                      inputMode='url'
                      name='url'
                      placeholder='https://example.com/post'
                      spellCheck={false}
                      type='text'
                      value={inputUrl}
                      onChange={event => {
                        if (inputError) setInputError('')
                        setInputUrl(event.target.value)
                      }}
                    />
                  </Box>
                  <Button
                    type='submit'
                    css={theme({ mt: [3, 3, 0, 0], ml: [0, 2, 2, 2] })}
                    loading={isLoading}
                  >
                    <Caps css={theme({ fontSize: 1 })}>Preview</Caps>
                  </Button>
                </Flex>
              </Flex>

              {inputError && (
                <Text
                  as='p'
                  css={theme({
                    mt: 2,
                    mb: 0,
                    color: 'red8',
                    fontSize: 1,
                    textAlign: 'center'
                  })}
                >
                  {inputError}
                </Text>
              )}
            </Box>

            {shouldShowInlineError && (
              <Flex css={theme({ justifyContent: 'center', pt: [3, 4] })}>
                <Box
                  css={theme({
                    width: '100%',
                    maxWidth: '640px',
                    bg: 'red0',
                    border: 1,
                    borderColor: 'red2',
                    borderRadius: 3,
                    p: [3, 4]
                  })}
                >
                  <Text
                    as='p'
                    css={theme({
                      fontSize: [1, 2],
                      color: 'red8',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      mt: 0,
                      mb: 2
                    })}
                  >
                    We couldn&apos;t fetch metadata for this URL.
                  </Text>
                  <Text
                    as='p'
                    css={theme({
                      fontSize: 1,
                      color: 'black70',
                      textAlign: 'center',
                      mt: 0,
                      mb: 3
                    })}
                  >
                    {inlineErrorMessage}
                  </Text>
                  <Flex
                    css={theme({
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2
                    })}
                  >
                    <Button
                      type='button'
                      variant='black'
                      onClick={() => {
                        submitUrl(
                          inputUrl || currentAnalyzedUrl || query.url || ''
                        )
                      }}
                    >
                      <Caps css={theme({ fontSize: 0 })}>Try Again</Caps>
                    </Button>
                    {error?.more && (
                      <Link href={error.more} logoIcon>
                        Report it
                      </Link>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )}

            {isDefaultDemo && metadata && (
              <Text
                as='p'
                aria-live='polite'
                css={theme({
                  mt: 0,
                  mb: 3,
                  py: 2,
                  fontSize: 1,
                  color: 'black50',
                  textAlign: 'center'
                })}
              >
                Showing example results for{' '}
                <Text
                  as='span'
                  css={theme({ fontWeight: 'bold', color: 'black80' })}
                >
                  microlink.io
                </Text>
                {' \u2014 enter any URL above to debug your own.'}
              </Text>
            )}

            {metadata && (
              <Box id='previews'>
                <Flex
                  css={theme({
                    flexDirection: 'column',
                    mx: 'auto'
                  })}
                >
                  <Flex
                    id='providers'
                    css={theme({ justifyContent: 'center', mb: 3 })}
                  >
                    <Flex
                      as='div'
                      role='tablist'
                      aria-label='Preview platforms'
                      css={theme({
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                      })}
                    >
                      {Object.entries(PREVIEWS).map(([key, { icon, name }]) => {
                        const isActive = selectedPlatform === key
                        return (
                          <Tooltip
                            key={key}
                            type='pointer'
                            tabIndex={-1}
                            tooltipsOpts={{
                              interactive: false,
                              hideOnClick: true
                            }}
                            content={<Tooltip.Content>{name}</Tooltip.Content>}
                            css={theme({
                              display: 'flex',
                              alignItems: 'center'
                            })}
                          >
                            <Box
                              as='button'
                              id={`sharing-debugger-tab-${key}`}
                              type='button'
                              role='tab'
                              aria-label={name}
                              aria-selected={isActive}
                              aria-controls={`sharing-debugger-panel-${key}`}
                              onClick={() => setSelectedPlatform(key)}
                              css={theme({
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                minHeight: '44px',
                                minWidth: '44px',
                                p: 2,
                                border: 1,
                                borderColor: isActive ? 'black' : 'black10',
                                borderRadius: 2,
                                bg: isActive ? 'black' : 'white',
                                color: isActive ? 'white' : 'black70',
                                cursor: 'pointer',
                                _hover: {
                                  color: isActive ? 'white' : 'black',
                                  borderColor: isActive ? 'black' : 'black30'
                                },
                                _focusVisible: {
                                  outline: '2px solid',
                                  outlineColor: 'link',
                                  outlineOffset: '2px'
                                }
                              })}
                            >
                              <Box
                                as='span'
                                aria-hidden='true'
                                css={theme({
                                  display: 'flex',
                                  alignItems: 'center'
                                })}
                              >
                                {createElement(icon, { size: '18px' })}
                              </Box>
                            </Box>
                          </Tooltip>
                        )
                      })}
                    </Flex>
                  </Flex>

                  <Flex
                    css={theme({
                      flexDirection: 'column',
                      pt: 3
                    })}
                  >
                    <Box
                      as='section'
                      id='preview'
                      role='tabpanel'
                      aria-labelledby={activeTabId}
                      tabIndex={0}
                      css={theme({
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        overflow: 'hidden',
                        height: 'fit-content',
                        ...(isAll && {
                          borderTop: 1,
                          borderLeft: 1,
                          borderColor: 'black10'
                        })
                      })}
                    >
                      {platforms.map(([key, { name, component }]) => (
                        <Box
                          key={key}
                          id={`sharing-debugger-panel-${key}`}
                          css={theme({
                            mx: 'auto',
                            ...(isAll && {
                              p: 3,
                              borderRight: 1,
                              borderBottom: 1,
                              borderColor: 'black10',
                              bg: 'white',
                              position: 'relative'
                            })
                          })}
                        >
                          {isAll && (
                            <Caps
                              css={theme({
                                fontSize: 0,
                                color: 'black40',
                                mb: 4,
                                position: 'absolute',
                                top: '16px',
                                left: '16px'
                              })}
                            >
                              {name}
                            </Caps>
                          )}
                          <Box css={theme({ mt: isAll ? 4 : 0 })}>
                            {createElement(component, { metadata })}
                          </Box>
                        </Box>
                      ))}
                    </Box>
                    {showValidation && (
                      <Flex
                        as='section'
                        id='metatags'
                        css={theme({ justifyContent: 'center' })}
                      >
                        <Metatags
                          metadata={metadata}
                          shareResultUrl={shareResultUrl}
                          shareResultDisplayUrl={shareResultDisplayUrl}
                        />
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Box>
            )}
          </Box>
        )
      }}
    </FetchProvider>
  )
}
