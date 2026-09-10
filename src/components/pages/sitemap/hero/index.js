import React from 'react'
import { ArrowRight } from 'react-feather'
import { theme } from 'theme'
import prependHttp from 'prepend-http'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'
import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import Caps from 'components/elements/Caps'
import Caption from 'components/patterns/Caption/Caption'
import { trackEvent } from 'helpers/gtag'
import { Results } from 'components/pages/sitemap/results'
import { ErrorPanel } from './error-panel'
import { Highlights } from './highlights'
import { ExampleLinks } from './examples'
import { useSitemapState } from './use-sitemap-state'

export const Hero = () => {
  const {
    inputUrl,
    setInputUrl,
    inputError,
    setInputError,
    currentUrl,
    urls,
    error,
    isLoading,
    skipBlurRef,
    lastSubmittedRef,
    fetchSite,
    handleBlur
  } = useSitemapState()

  const submitUrl = value => {
    trackEvent('sitemap inspect')
    const trimmedValue = value.trim()
    const normalizedUrl = trimmedValue ? prependHttp(trimmedValue) : ''
    if (
      normalizedUrl &&
      lastSubmittedRef.current === normalizedUrl &&
      urls &&
      !error
    ) {
      return
    }
    fetchSite(value)
  }

  const handleSubmit = event => {
    if (event) event.preventDefault()
    skipBlurRef.current = true
    submitUrl(inputUrl)
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      skipBlurRef.current = true
      setInputUrl(currentUrl)
      event.target.blur()
    }
  }

  const handleExample = url => {
    trackEvent('sitemap inspect')
    skipBlurRef.current = true
    fetchSite(url)
  }

  const trimmedInput = inputUrl.trim()

  return (
    <Box as='section' id='hero'>
      <Box id='input'>
        <Heading>Sitemap URLs</Heading>
        <Caption
          forwardedAs='h2'
          css={theme({
            pt: '20px',
            px: [4, 0]
          })}
        >
          Paste a site URL. We read its sitemap (and robots.txt) and list every
          page location.
        </Caption>

        <Highlights />

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
                id='sitemap-url'
                css={theme({
                  fontSize: 2,
                  width: ['100%', '320px', '320px', '320px']
                })}
                iconComponent={
                  <InputIcon.Microlink
                    url={trimmedInput ? prependHttp(trimmedInput) : undefined}
                  />
                }
                aria-invalid={Boolean(inputError)}
                aria-label='Site URL to inspect'
                autoCapitalize='none'
                autoComplete='url'
                autoCorrect='off'
                inputMode='url'
                name='url'
                placeholder='https://example.com…'
                spellCheck={false}
                type='text'
                value={inputUrl}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
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
              <Flex
                as='span'
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'center'
                })}
              >
                <Caps css={theme({ fontSize: 1 })}>List URLs</Caps>
                <Box
                  as='span'
                  aria-hidden
                  css={theme({
                    display: 'inline-flex',
                    ml: 2,
                    lineHeight: 0
                  })}
                >
                  <ArrowRight size={16} />
                </Box>
              </Flex>
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

        <ExampleLinks onPick={handleExample} />
      </Box>

      {error && (
        <ErrorPanel
          error={error}
          onRetry={() => submitUrl(inputUrl || currentUrl)}
        />
      )}

      {urls && <Results urls={urls} />}
    </Box>
  )
}
