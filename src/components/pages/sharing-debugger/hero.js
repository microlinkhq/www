import React, { useState, useEffect, createElement } from 'react'
import { theme } from 'theme'
import isUrl from 'is-url-http/lightweight'
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
import { findDemoLinkById } from 'helpers/demo-links'
import { isDevelopment } from 'helpers/is-development'

const INITIAL_SUGGESTION = 'microlink'

const HAS_FORCE = !isDevelopment

// Use O(1) Map lookup instead of O(n) array.find()
const DEMO_LINK = findDemoLinkById(INITIAL_SUGGESTION)
const EXAMPLE_URLS = [
  { label: 'Microlink', url: DEMO_LINK?.data?.url || 'https://microlink.io' },
  { label: 'MDN', url: 'https://developer.mozilla.org/en-US/' },
  { label: 'Wikipedia', url: 'https://www.wikipedia.org/' }
]

export const Hero = () => {
  const [query, setQuery] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)
  const [inputError, setInputError] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasQuery = isMounted && !!query.url
  const [selectedPlatform, setSelectedPlatform] = useState('whatsapp')
  const [inputUrl, setInputUrl] = useState('')
  const [showValidation, setShowValidation] = useState(false)

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
      setInputError('')
      if (!/^https?:\/\//.test(query.url)) {
        setQuery({ url: prependHttp(query.url) })
      }
    }
  }, [query.url, setQuery])

  return (
    <FetchProvider mqlOpts={{ force: HAS_FORCE, meta: true }}>
      {({ status, doFetch, data, error }) => {
        const isLoading =
          (hasQuery && status === 'initial') || status === 'fetching'
        const metadata = status === 'error' ? null : data || null
        const hasMetadata = !!metadata
        const shouldShowEmptyState =
          !hasQuery && !hasMetadata && status === 'initial'
        const activeTabId = `sharing-debugger-tab-${selectedPlatform}`
        const shouldShowInlineError = status === 'error'
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

          if (!isUrl(normalizedUrl)) {
            setInputError(
              'Enter a valid URL, such as https://example.com/page.'
            )
            setShowValidation(false)
            return
          }

          setInputError('')
          setShowValidation(true)
          setInputUrl(trimmedValue)
          setQuery({ url: trimmedValue })
          doFetch(normalizedUrl)
        }

        const handleSubmit = event => {
          if (event) event.preventDefault()
          submitUrl(inputUrl)
        }

        const handleExampleClick = url => submitUrl(url)

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

            {shouldShowEmptyState && (
              <Flex css={theme({ justifyContent: 'center', pt: [3, 4] })}>
                <Box
                  css={theme({
                    width: '100%',
                    maxWidth: '640px',
                    bg: 'gray0',
                    border: 1,
                    borderColor: 'black10',
                    borderRadius: 3,
                    p: [3, 4]
                  })}
                >
                  <Text
                    as='p'
                    css={theme({
                      fontSize: [1, 2],
                      color: 'black70',
                      textAlign: 'center',
                      m: 0
                    })}
                  >
                    Paste any URL to inspect Open Graph, X Cards, title,
                    description, image, favicon, locale, and more before you
                    share it.
                  </Text>
                  <Text
                    as='p'
                    css={theme({
                      mt: 3,
                      mb: 2,
                      fontSize: 0,
                      color: 'black50',
                      textAlign: 'center'
                    })}
                  >
                    Try one of these examples:
                  </Text>
                  <Flex
                    css={theme({
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      gap: 2
                    })}
                  >
                    {EXAMPLE_URLS.map(({ label, url }) => (
                      <Button
                        key={label}
                        type='button'
                        variant='white'
                        onClick={() => handleExampleClick(url)}
                      >
                        <Caps css={theme({ fontSize: 0 })}>{label}</Caps>
                      </Button>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            )}

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
                      onClick={() => submitUrl(inputUrl || query.url || '')}
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
                        <Metatags metadata={metadata} />
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
