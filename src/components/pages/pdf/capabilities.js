import React, { useState, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, theme, space, shadows } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import LineBreak from 'components/elements/LineBreak'
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import { ACCENT, Subhead, HERO_LAYOUT, PdfApiBar, CopyButton } from './shared'

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
        <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
        <path d='M8 21h8M12 17v4' />
      </svg>
    ),
    title: 'Any paper size, any orientation',
    description:
      'Generate PDFs in A0 to A6, Letter, Legal, or Tabloid. Switch between portrait and landscape with a single API parameter.'
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
    title: 'Fastest PDF generation API',
    description:
      'Sub-second cached responses with optimized cold starts. The fastest HTML to PDF rest API with a global edge network for low latency worldwide.'
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
        <path d='M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z' />
        <polyline points='3.27 6.96 12 12.01 20.73 6.96' />
        <line x1='12' y1='22.08' x2='12' y2='12' />
      </svg>
    ),
    title: 'Pixel-perfect margins',
    description:
      'Custom margin control in cm, mm, or px. Fine-tune document spacing for professional reports, invoices, and compliance documentation.'
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
        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
    title: 'Screen & print media types',
    description:
      'Choose between screen and print CSS media types. Capture the web layout as-is or switch to print stylesheets for clean, optimized PDF output.'
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
      'Inject CSS, execute JavaScript, click elements, scroll, and wait for selectors automate any interaction before PDF generation.'
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
    title: 'Simple REST integration',
    description:
      'A single REST endpoint that works from any language or framework. No SDKs required just an HTTP call with your URL to convert HTML to PDF.'
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
    flexShrink: 0
  })};
  color: ${ACCENT};
`

const CAP_API_URLS = {
  screen:
    'https://api.microlink.io?pdf&url=https://developer.mozilla.org/Printing&mediaType=screen',
  print:
    'https://api.microlink.io?pdf&url=https://developer.mozilla.org/Printing&mediaType=print'
}

export const Capabilities = () => {
  const [mediaType, setMediaType] = useState('screen')
  const [capCopied, setCapCopied] = useState(false)
  const capCopyTimerRef = useRef(null)

  const capApiUrl = CAP_API_URLS[mediaType]

  const handlePositionChange = useCallback(position => {
    setMediaType(position < 51 ? 'print' : 'screen')
  }, [])

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
                  src='/images/pdf-example-screen.jpg'
                  alt='PDF generated with mediaType=screen — web layout preserved'
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/images/pdf-example-print.jpg'
                  alt='PDF generated with mediaType=print — print-optimized layout'
                />
              }
            />
            <PdfApiBar
              className='pdf-api-bar'
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
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'black70'
                })}
              >
                https://api.microlink.io?pdf&url=https://developer.mozilla.org
                <strong css={theme({ color: 'black' })}>
                  &mediaType={mediaType}
                </strong>
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
            </PdfApiBar>
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
            <span css={{ color: ACCENT }}>one API call away</span>
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
