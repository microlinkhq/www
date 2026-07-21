import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, shadows, space, theme } from 'theme'
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'
import { CopyButton, HERO_LAYOUT, ScreenshotApiBar, Subhead } from './shared'

const CAPABILITIES = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M18 6L6 18M6 6l12 12' />
      </svg>
    ),
    title: 'Blocks ads & cookie banners',
    description:
      'Built-in adblock removes ads, trackers, and cookie consent popups automatically. Get clean captures without custom scripts.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
        <path d='M8 21h8M12 17v4' />
      </svg>
    ),
    title: 'Any viewport, any device',
    description:
      'Capture the full page or just the viewport — mobile, tablet, desktop, or custom widths, with full device emulation at any resolution.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' />
        <polyline points='12 6 12 12 16 14' />
      </svg>
    ),
    title: 'Fastest screenshot API',
    description:
      'Sub-second cached responses with P95 cold starts under 3 seconds. Served from a global edge network for low latency worldwide.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
    title: 'Isolated & secure',
    description:
      'Every request runs in its own browser instance. No shared state, no data leaks — enterprise-grade isolation by default.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' />
      </svg>
    ),
    title: 'Full browser control',
    description:
      'Inject CSS, execute JavaScript, click elements, scroll, wait for selectors — full control to automate any interaction before capture.'
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    ),
    title: 'Simple integration',
    description:
      'A single REST endpoint that works from any language or framework. No SDKs required — just an HTTP call with your URL.'
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'red6'
  })};
`

export const Capabilities = () => {
  const [adblock, setAdblock] = useState(true)
  const [capCopied, setCapCopied] = useState(false)
  const capCopyTimerRef = useRef(null)

  const handlePositionChange = useCallback(position => {
    setAdblock(position < 51)
  }, [])

  const capApiUrl = `https://api.microlink.io?screenshot&url=https://ft.com&adblock=${adblock}`

  const handleCapCopy = () => {
    const markCopied = () => {
      setCapCopied(true)
      if (capCopyTimerRef.current) clearTimeout(capCopyTimerRef.current)
      capCopyTimerRef.current = setTimeout(() => setCapCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(capApiUrl)
        .then(markCopied)
        .catch(() => {})
    }
  }

  return (
    <Container
      id='capabilities'
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'pinky',
        px: [3, 3, 4, 5],
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [3, 3, 4, 4]
          })}
        >
          <Box
            css={[
              theme({
                width: ['100%', '100%', '80%', '100%'],
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: `${shadows[3]}`,
                lineHeight: 0
              }),
              {
                '& img': { display: 'block', width: '100%', height: 'auto' }
              }
            ]}
          >
            <ReactCompareSlider
              onPositionChange={handlePositionChange}
              itemOne={
                <ReactCompareSliderImage
                  src='/images/M4jeZNS.png'
                  alt='Website screenshot without adblock — cookie banner visible'
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/images/FrmIQOj.png'
                  alt='Website screenshot with adblock — clean capture'
                />
              }
            />
            <ScreenshotApiBar
              css={theme({
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [2, 3, 3, 3],
                py: '10px',
                gap: 2
              })}
            >
              <Text
                as='span'
                css={theme({
                  fontSize: ['13px', '13px', '14px', '14px'],
                  fontFamily: 'mono',
                  letterSpacing: 0,
                  flex: 1,
                  minWidth: '0',
                  color: 'black70',
                  wordBreak: 'break-all'
                })}
              >
                {capApiUrl}
              </Text>
              <CopyButton
                type='button'
                onClick={handleCapCopy}
                aria-label={capCopied ? 'Copied!' : 'Copy API URL'}
              >
                {capCopied
                  ? (
                    <svg
                      className='icon-check'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M3 8l3.5 3.5L13 4.5'
                        stroke='currentColor'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    )
                  : (
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                      />
                    </svg>
                    )}
              </CopyButton>
            </ScreenshotApiBar>
          </Box>
        </Flex>
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start'],
            gap: [3, 3, 4, 4]
          })}
        >
          <Subhead
            css={theme({
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Everything you need,
            <LineBreak />
            <span css={theme({ color: 'red6' })}>one API call away</span>
          </Subhead>
          <Flex
            css={[
              theme({ gap: [3, 3, 3, 4], width: '100%' }),
              {
                flexDirection: 'column',
                '@media (min-width: 768px) and (max-width: 1199px)': {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  '& > *': { width: 'calc(50% - 12px)' }
                }
              }
            ]}
          >
            {CAPABILITIES.map(({ icon, title, description }) => (
              <CapabilityItem key={title}>
                <CapabilityIcon>{icon}</CapabilityIcon>
                <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [1, 1, 2, 2]
                    })}
                  >
                    {title}
                  </Text>
                  <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                    {description}
                  </Text>
                </Flex>
              </CapabilityItem>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
