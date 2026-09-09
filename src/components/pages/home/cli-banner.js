import React, { useEffect, useRef, useState } from 'react'
import { Check as CheckIcon, Copy as CopyIcon } from 'react-feather'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'
import ArrowLink from 'components/patterns/ArrowLink'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'
import { INSTALL_SNIPPET } from 'components/pages/cli/shared'
import { trackEvent } from 'helpers/gtag'
import {
  colors,
  theme,
  transition,
  touchTargets,
  SECTION_VERTICAL_SPACING
} from 'theme'

const DEVICE_SRC = '/images/cli-banner.jpg'
const DEVICE_WIDTH = 1024
const DEVICE_HEIGHT = 576

const Command = styled(Flex)`
  ${theme({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
    minWidth: 0,
    width: '100%',
    maxWidth: ['100%', '100%', '420px', '420px'],
    mt: 3,
    pl: 3,
    pr: 1,
    bg: 'gray0',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 3,
    color: 'black60'
  })}
  appearance: none;
  min-height: ${touchTargets.minHeight};
  cursor: pointer;
  text-align: left;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color ${transition.short}, color ${transition.short};

  &:hover {
    border-color: ${colors.gray4};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  &[data-copied='true'] {
    color: ${colors.green8};
  }
`

const DeviceLink = styled(Link)`
  ${theme({
    display: 'block',
    height: '100%',
    color: 'inherit',
    _hover: { color: 'inherit' }
  })}

  &:focus-within {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }
`

const DeviceWell = styled(Box)`
  ${theme({
    overflow: 'hidden',
    bg: 'black',
    height: ['180px', '200px', '220px', '100%']
  })}

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }

  @media (prefers-reduced-motion: no-preference) {
    img {
      transform-origin: center center;
      transition: transform ${transition.medium};
    }

    @media (hover: hover) and (pointer: fine) {
      ${DeviceLink}:hover & img {
        transform: scale(1.08);
      }
    }

    ${DeviceLink}:focus-within & img {
      transform: scale(1.08);
    }
  }
`

const CliBanner = () => {
  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const copyInstall = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(INSTALL_SNIPPET)
      .then(() => {
        trackEvent('Home CLI Banner', { action: 'copy' })
        setCopied(true)
        clearTimeout(copiedTimer.current)
        copiedTimer.current = setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  return (
    <Box
      as='section'
      id='cli'
      aria-labelledby='home-cli-banner-title'
      css={theme({ py: SECTION_VERTICAL_SPACING, scrollMarginTop: 4 })}
    >
      <Box
        css={theme({
          maxWidth: HOME_CONTENT_WIDTH,
          mx: 'auto',
          px: [3, 3, 4, 4]
        })}
      >
        <Flex
          css={theme({
            flexDirection: ['column', 'column', 'column', 'row'],
            alignItems: 'stretch',
            overflow: 'hidden',
            bg: 'white',
            border: 1,
            borderColor: 'gray2',
            borderRadius: 5,
            boxShadow: 2
          })}
        >
          <Box
            css={theme({
              minWidth: 0,
              flex: ['none', 'none', 'none', 1],
              px: [4, 4, 5, 5],
              pt: [4, 4, 5, 5],
              pb: [4, 4, 4, 5],
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            })}
          >
            <Text
              as='h2'
              id='home-cli-banner-title'
              css={theme({
                m: 0,
                fontSize: [2, 2, 3, 3],
                fontWeight: 'bold',
                lineHeight: 0,
                color: 'black'
              })}
            >
              Try it in your terminal
            </Text>
            <Text
              as='p'
              css={theme({
                m: 0,
                mt: 2,
                color: 'black80',
                lineHeight: 2
              })}
            >
              One command to install. Works with any URL, any product, right
              now.
            </Text>
            <Command
              as='button'
              type='button'
              data-copied={copied}
              onClick={copyInstall}
              aria-label={copied ? 'Copied!' : 'Copy install command'}
              aria-live='polite'
            >
              <Text
                as='span'
                css={theme({
                  fontFamily: 'mono',
                  fontSize: [0, 0, 1, 1],
                  color: 'black',
                  lineHeight: 0,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                })}
              >
                <Text
                  as='span'
                  aria-hidden='true'
                  css={theme({
                    color: 'black40',
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  })}
                >
                  ${' '}
                </Text>
                {INSTALL_SNIPPET}
              </Text>
              <Flex
                aria-hidden='true'
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  width: touchTargets.minHeight,
                  height: touchTargets.minHeight
                })}
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              </Flex>
            </Command>
            <Box css={theme({ mt: 3 })}>
              <ArrowLink
                href='/integrations/cli'
                css={theme({ fontSize: 1 })}
                data-event-location='Home CLI Banner'
                data-event-name='See the CLI'
              >
                See the CLI
              </ArrowLink>
            </Box>
          </Box>
          <Box
            css={theme({
              minWidth: 0,
              flex: ['none', 'none', 'none', 1],
              width: ['100%', '100%', '100%', 'auto'],
              alignSelf: 'stretch'
            })}
          >
            <DeviceLink
              href='/terminal'
              externalIcon={false}
              aria-label='Try the Microlink CLI in your browser'
              data-event-location='Home CLI Banner'
              data-event-name='Try now'
            >
              <DeviceWell>
                <Box
                  as='img'
                  src={DEVICE_SRC}
                  alt='Microlink CLI running in a browser on a phone'
                  width={DEVICE_WIDTH}
                  height={DEVICE_HEIGHT}
                  loading='lazy'
                  decoding='async'
                />
              </DeviceWell>
            </DeviceLink>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default CliBanner
