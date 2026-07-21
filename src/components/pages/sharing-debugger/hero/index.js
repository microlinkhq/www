import React from 'react'
import { trackEvent } from 'helpers/plausible'
import { theme } from 'theme'
import prependHttp from 'prepend-http'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Metatags } from 'components/pages/sharing-debugger/metatags'
import Caps from 'components/elements/Caps'
import FetchProvider from 'components/patterns/FetchProvider'
import Caption from 'components/patterns/Caption/Caption'
import { isDevelopment } from 'helpers/is-development'
import { hasDomainLikeHostname } from 'helpers/url-input'
import {
  buildSharingDebuggerUrl,
  buildSharingDebuggerDisplayUrl
} from 'helpers/share-debugger-url'
import { ErrorPanel } from './error-panel'
import { PlatformTabs } from './platform-tabs'
import { PreviewGrid } from './preview-grid'
import {
  DEFAULT_URL,
  useSharingDebuggerState
} from './use-sharing-debugger-state'

const HAS_FORCE = !isDevelopment

export const Hero = () => {
  const {
    query,
    hasQuery,
    inputError,
    setInputError,
    currentAnalyzedUrl,
    setCurrentAnalyzedUrl,
    selectedPlatform,
    setSelectedPlatform,
    inputUrl,
    setInputUrl,
    showValidation,
    setShowValidation,
    isDefaultDemo,
    setIsDefaultDemo,
    doFetchRef,
    prevFetchStatusRef
  } = useSharingDebuggerState()

  return (
    <FetchProvider mqlOpts={{ force: HAS_FORCE, meta: true }}>
      {({ status, doFetch, data, error }) => {
        const isLoading =
          (hasQuery && status === 'initial') || status === 'fetching'
        const metadata = data || null
        const shouldShowInlineError = status === 'error'
        const shareResultUrl = buildSharingDebuggerUrl(currentAnalyzedUrl)
        const shareResultDisplayUrl =
          buildSharingDebuggerDisplayUrl(currentAnalyzedUrl)
        const submitUrl = value => {
          trackEvent('debugger preview')
          const trimmedValue = value.trim()

          if (!trimmedValue) {
            setInputError('Enter a URL to inspect.')
            return
          }

          const normalizedUrl = prependHttp(trimmedValue)

          if (!hasDomainLikeHostname(normalizedUrl)) {
            setInputError('Enter a valid URL format.')
            return
          }

          if (
            status !== 'error' &&
            currentAnalyzedUrl &&
            normalizedUrl === prependHttp(currentAnalyzedUrl)
          ) {
            return
          }

          setInputError('')
          setShowValidation(true)
          setInputUrl(trimmedValue)
          setCurrentAnalyzedUrl(trimmedValue)
          doFetch(normalizedUrl, { queryUrl: trimmedValue })
        }

        const handleSubmit = event => {
          if (event) event.preventDefault()
          submitUrl(inputUrl)
        }

        doFetchRef.current = doFetch

        const prevStatus = prevFetchStatusRef.current
        prevFetchStatusRef.current = status

        if (
          isDefaultDemo &&
          prevStatus === 'fetching' &&
          (status === 'fetched' || status === 'error') &&
          prependHttp(currentAnalyzedUrl) !== DEFAULT_URL
        ) {
          setIsDefaultDemo(false)
        }

        const trimmedInput = inputUrl.trim()
        const inputMatchesResult =
          trimmedInput &&
          currentAnalyzedUrl &&
          prependHttp(trimmedInput) === prependHttp(currentAnalyzedUrl)

        return (
          <Box as='section' id='hero'>
            <Box id='input'>
              <Heading>Sharing debugger</Heading>
              <Caption
                forwardedAs='h2'
                css={theme({
                  pt: '20px',
                  px: [4, 0]
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
                    pb: 2,
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
                          src={
                            inputMatchesResult ? metadata?.logo?.url : undefined
                          }
                          url={
                            trimmedInput ? prependHttp(trimmedInput) : undefined
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
                    mt: 1,
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
              <ErrorPanel
                error={error}
                submitUrl={submitUrl}
                inputUrl={inputUrl}
                currentAnalyzedUrl={currentAnalyzedUrl}
                query={query}
              />
            )}

            {isDefaultDemo && metadata && (
              <Text
                as='p'
                aria-live='polite'
                css={theme({
                  mt: 4,
                  pb: 0,
                  fontSize: 1,
                  color: 'black80',
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
                    mt: 4,
                    flexDirection: 'column',
                    mx: 'auto'
                  })}
                >
                  <PlatformTabs
                    selectedPlatform={selectedPlatform}
                    setSelectedPlatform={setSelectedPlatform}
                  />

                  <Flex
                    css={theme({
                      flexDirection: 'column',
                      pt: 3
                    })}
                  >
                    <PreviewGrid
                      selectedPlatform={selectedPlatform}
                      metadata={metadata}
                    />
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
