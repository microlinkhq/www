/* global process */

import React, { useState, useEffect, useMemo, createElement } from 'react'
import { theme, space } from 'theme'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { useQueryState } from 'components/hook/use-query-state'
import { PREVIEWS } from 'components/pages/sharing-debugger/preview'
import { Metatags } from 'components/pages/sharing-debugger/metatags'
import Caps from 'components/elements/Caps'
import FetchProvider from 'components/patterns/FetchProvider'
import LineBreak from 'components/elements/LineBreak'
import Caption from 'components/patterns/Caption/Caption'
import { findDemoLinkById } from 'helpers/demo-links'

const INITIAL_SUGGESTION = 'microlink'

const HAS_FORCE = process.env.NODE_ENV !== 'development'

// Use O(1) Map lookup instead of O(n) array.find()
const DEMO_LINK = findDemoLinkById(INITIAL_SUGGESTION)

export const Hero = () => {
  const [query, setQuery] = useQueryState()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasQuery = isMounted && !!query.url
  const [selectedPlatform, setSelectedPlatform] = useState(
    Object.keys(PREVIEWS)[1]
  )
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [showValidation, setShowValidation] = useState(!hasQuery)

  const platforms =
    selectedPlatform === 'all'
      ? Object.entries(PREVIEWS).filter(([key, value]) => value.component)
      : [[selectedPlatform, PREVIEWS[selectedPlatform]]]

  useEffect(() => {
    if (query.url) {
      setShowValidation(true)
      if (!/^https?:\/\//.test(query.url)) {
        setQuery({ url: prependHttp(query.url) })
      }
    }
  }, [query.url, setQuery])

  return (
    <FetchProvider mqlOpts={{ force: HAS_FORCE, meta: true }}>
      {({ status, doFetch, data }) => {
        const isLoading =
          (hasQuery && status === 'initial') || status === 'fetching'
        const metadata = data || (hasQuery ? null : DEMO_LINK.data)
        const isInitialData = metadata?.url === DEMO_LINK.data.url

        const handleSubmit = e => {
          if (e) e.preventDefault()
          const url = prependHttp(inputUrl)
          if (isUrl(url)) {
            setShowValidation(true)
            setQuery({ url: inputUrl })
            doFetch(url)
          }
        }

        const url = useMemo(() => {
          const input = prependHttp(inputUrl)
          return isUrl(input) ? input : data?.url
        }, [inputUrl, data])

        const isAll = selectedPlatform === 'all'

        return (
          <Box as='section' id='hero'>
            <Box id='input'>
              <Heading>Sharing Debugger</Heading>
              <Caption
                forwardedAs='h2'
                css={theme({ pt: [3, 3, 4, 4], px: [4, 0] })}
              >
                Verify and fix Open Graph meta tags for any website.
                <LineBreak breakpoints={[2, 3]} />
                Visualize your social cards instantly.
              </Caption>

              <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
                <Flex
                  as='form'
                  css={theme({
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
                        width: ['100%', '100%', 128, 128]
                      })}
                      iconComponent={
                        <InputIcon
                          src={metadata?.logo?.url}
                          provider={!isInitialData && 'microlink'}
                          url={!isInitialData && url}
                        />
                      }
                      placeholder='Check URL'
                      type='text'
                      value={inputUrl}
                      onChange={event => setInputUrl(event.target.value)}
                    />
                  </Box>
                  <Button
                    css={theme({ mt: [3, 0, 0, 0], ml: [0, 2, 2, 2] })}
                    loading={isLoading}
                  >
                    <Caps css={theme({ fontSize: 1 })}>Preview</Caps>
                  </Button>
                </Flex>
              </Flex>
            </Box>

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
                      css={theme({
                        gap: space[3]
                      })}
                    >
                      {Object.entries(PREVIEWS).map(([key, { icon }]) => {
                        const isActive = selectedPlatform === key
                        return (
                          <Button
                            key={key}
                            onClick={() => setSelectedPlatform(key)}
                            css={theme({
                              alignItems: 'center',
                              bg: 'transparent',
                              color: isActive ? 'black' : 'black40',
                              display: 'flex',
                              height: '20px',
                              width: '20px',
                              minWidth: '20px',
                              minHeight: '20px',
                              justifyContent: 'center',
                              p: 0,
                              _hover: {
                                color: 'black',
                                border: 0,
                                boxShadow: 'none'
                              }
                            })}
                          >
                            {createElement(icon)}
                          </Button>
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
