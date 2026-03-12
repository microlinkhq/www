/* global IntersectionObserver */
import {
  borders,
  layout,
  colors,
  space,
  textGradient,
  theme,
  transition
} from 'theme'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Check as CheckIcon } from 'react-feather'
import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const BENCHMARK_DATA = {
  timestamp: '2026-03',
  testUrls: [
    {
      url: 'https://vercel.com',
      width: 1920,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://example.com',
      width: 1280,
      height: 800,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://stripe.com',
      width: 393,
      height: 852,
      fullPage: false,
      format: 'jpeg'
    },
    {
      url: 'https://screenshotone.com',
      width: 1920,
      fullPage: true,
      format: 'png'
    },
    {
      url: 'https://news.ycombinator.com',
      width: 1440,
      fullPage: true,
      format: 'jpeg'
    },
    {
      url: 'https://github.com/trending',
      width: 768,
      height: 1024,
      fullPage: false,
      format: 'png'
    },
    {
      url: 'https://www.framer.com',
      width: 1920,
      height: 1800,
      fullPage: false,
      format: 'jpeg'
    }
  ],
  results: {
    apiflash: {
      name: 'ApiFlash',
      summary: {
        avgColdDuration: 9463.2,
        totalColdDuration: 66242.4
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 14232.91
        },
        {
          url: 'https://example.com',
          coldDuration: 1819.86
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5900.18
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 9802.49
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 1967.53
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 5365.86
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 27153.57
        }
      ]
    },
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 4111.84,
        totalColdDuration: 28782.87
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6361.22
        },
        {
          url: 'https://example.com',
          coldDuration: 967.96
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3217.22
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 5474.39
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 3435.08
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3059.69
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6267.31
        }
      ]
    },
    screenshotapi: {
      name: 'ScreenshotAPI',
      summary: {
        avgColdDuration: 5915.71,
        totalColdDuration: 41409.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 6143.4
        },
        {
          url: 'https://example.com',
          coldDuration: 4987.8
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5613.77
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 6805.46
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 5384.65
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 6174.08
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6300.83
        }
      ]
    },
    screenshotmachine: {
      name: 'ScreenshotMachine',
      summary: {
        avgColdDuration: 6099.77,
        totalColdDuration: 42698.4
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 9790.6
        },
        {
          url: 'https://example.com',
          coldDuration: 1321.19
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3167.16
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 12403.69
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 4328.76
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 3898.21
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 7788.79
        }
      ]
    },
    screenshotone: {
      name: 'ScreenshotOne',
      summary: {
        avgColdDuration: 7711.14,
        totalColdDuration: 53977.99
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 12695.34
        },
        {
          url: 'https://example.com',
          coldDuration: 3134.84
        },
        {
          url: 'https://stripe.com',
          coldDuration: 5677.9
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 12138.63
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 6857.3
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 6058.52
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 7415.46
        }
      ]
    },
    urlbox: {
      name: 'Urlbox',
      summary: {
        avgColdDuration: 7334.22,
        totalColdDuration: 51339.56
      },
      perUrl: [
        {
          url: 'https://vercel.com',
          coldDuration: 14952.83
        },
        {
          url: 'https://example.com',
          coldDuration: 2331.45
        },
        {
          url: 'https://stripe.com',
          coldDuration: 3678.79
        },
        {
          url: 'https://screenshotone.com',
          coldDuration: 14975.56
        },
        {
          url: 'https://news.ycombinator.com',
          coldDuration: 4748.08
        },
        {
          url: 'https://github.com/trending',
          coldDuration: 4266.84
        },
        {
          url: 'https://www.framer.com',
          coldDuration: 6386.01
        }
      ]
    }
  }
}

const SERVICES = Object.keys(BENCHMARK_DATA.results)
const SORTED_BY_AVG = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.avgColdDuration -
    BENCHMARK_DATA.results[b].summary.avgColdDuration
)

const SORTED_BY_TOTAL = [...SERVICES].sort(
  (a, b) =>
    BENCHMARK_DATA.results[a].summary.totalColdDuration -
    BENCHMARK_DATA.results[b].summary.totalColdDuration
)

const SORTED_SERVICES = SORTED_BY_AVG

const ALPHABETICAL_SERVICES = [...SERVICES].sort((a, b) =>
  BENCHMARK_DATA.results[a].name.localeCompare(BENCHMARK_DATA.results[b].name)
)

const SERVICE_COLORS = {
  microlink: 'rgba(253, 73, 74, 0.5)',
  apiflash: 'rgba(99, 102, 241, 0.5)',
  screenshotapi: 'rgba(245, 158, 11, 0.5)',
  screenshotmachine: 'rgba(16, 185, 129, 0.5)',
  screenshotone: 'rgba(139, 92, 246, 0.5)',
  urlbox: 'rgba(6, 182, 212, 0.5)'
}

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })
const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const extractDomain = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const getDeviceType = width => {
  if (width <= 480) return 'Mobile'
  if (width <= 1024) return 'Tablet'
  return 'Desktop'
}

const getTestUrlConfig = url => BENCHMARK_DATA.testUrls.find(t => t.url === url)

const COUNTER_DURATION = 500

const AnimatedCounter = ({ value, animate }) => {
  const displayRef = useRef(null)
  const prevValue = useRef(value)

  useEffect(() => {
    if (!animate || prevValue.current === value) {
      prevValue.current = value
      return
    }

    const from = prevValue.current
    const to = value
    const start = performance.now()
    let raf

    const tick = now => {
      const t = Math.min((now - start) / COUNTER_DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (to - from) * eased)
      if (displayRef.current) {
        displayRef.current.textContent = `${formatMs(current)}\u2009ms`
      }
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        prevValue.current = to
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, animate])

  useEffect(() => {
    if (!animate) {
      prevValue.current = value
      if (displayRef.current) {
        displayRef.current.textContent = `${formatMs(value)}\u2009ms`
      }
    }
  }, [value, animate])

  return <span ref={displayRef}>{formatMs(value)}&thinsp;ms</span>
}

const MONO_FONT =
  "'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo, monospace"

const barGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(253, 73, 74, 0); }
  50% { box-shadow: 0 0 12px 2px rgba(253, 73, 74, 0.3); }
`

const introSweep = keyframes`
  0% { transform: scaleX(0); opacity: 0.6; }
  50% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0.3; }
`

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
`

const RaceContainer = styled('div')`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  min-height: 360px;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 32px 28px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  overflow: hidden;

  @media (max-width: 600px) {
    min-height: 310px;
    padding: 24px 16px 32px;
    border-radius: 10px;
  }
`

const RaceInner = styled('div')`
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const UrlLabel = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 16px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 0.03em;
  margin-bottom: 0;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const UrlMeta = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.02em;
  text-transform: none;
  margin-top: 13px;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 11px;
    margin-top: 6px;
    margin-bottom: 8px;
  }
`

const domainShrink = keyframes`
  0% {
    font-size: 42px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  60% {
    font-size: 42px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    font-size: 16px;
    opacity: 1;
    top: 30px;
    transform: translate(-50%, 0);
  }
`

const domainShrinkMobile = keyframes`
  0% {
    font-size: 28px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  60% {
    font-size: 28px;
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    font-size: 14px;
    opacity: 1;
    top: 32px;
    transform: translate(-50%, 0);
  }
`

const AnnounceMeta = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.02em;
  text-transform: none;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: 11px;
    gap: 6px;
    margin-top: 6px;
  }
`

const DomainAnnounce = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: ${MONO_FONT};
  font-size: 42px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${domainShrink} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  & > ${AnnounceMeta} {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 600px) {
    font-size: 28px;
    animation: ${domainShrinkMobile} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    font-size: 16px;
    top: 32px;
    transform: translate(-50%, 0);
  }
`

const AnnounceBackdrop = styled('div')`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 14px;
  z-index: 5;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ $visible }) => ($visible ? '0.4s' : '0s')} ease;
  pointer-events: none;

  @media (max-width: 600px) {
    border-radius: 10px;
  }
`

const IntroLabel = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 18px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 42px;
  letter-spacing: 0.02em;
  animation: ${fadeIn} 0.4s ease forwards;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 34px;
  }
`

const IntroHighlightBar = styled('div')`
  position: absolute;
  inset: 0;
  border-radius: 5px;
  transform-origin: left center;
  animation: ${introSweep} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`

const LaneRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 38px;
  opacity: ${({ $animate }) => ($animate ? 0 : 1)};
  animation: ${({ $animate, $delay }) =>
    $animate
      ? css`
        ${slideInFromRight} 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${$delay ||
        '0s'} forwards
      `
      : 'none'};

  @media (max-width: 600px) {
    height: 32px;
    gap: 8px;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const LaneRank = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.45);
  width: 28px;
  flex-shrink: 0;
  text-align: center;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;

  @media (max-width: 600px) {
    width: 22px;
    font-size: 11px;
  }
`

const LaneName = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: ${({ $isMicrolink }) => ($isMicrolink ? '700' : '500')};
  color: ${({ $isMicrolink }) =>
    $isMicrolink ? '#fd494a' : 'rgba(255, 255, 255, 0.90)'};
  width: 150px;
  flex-shrink: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    width: 90px;
    font-size: 12px;
  }
`

const LaneTrack = styled('div')`
  flex: 1;
  height: 100%;
  position: relative;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  overflow: hidden;
`

const LaneBar = styled('div')`
  height: 100%;
  border-radius: 5px;
  transform-origin: left center;
  animation: ${({ $noGrow }) =>
    $noGrow
      ? 'none'
      : css`
        ${barGrow} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards
      `};
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  ${({ $isMicrolink }) =>
    $isMicrolink &&
    css`
      &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 5px;
        animation: ${pulseGlow} 2s ease-in-out infinite;
      }
    `}
`

const LaneTime = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isMicrolink }) =>
    $isMicrolink ? '#fd494a' : 'rgba(255, 255, 255, 0.7)'};
  width: 90px;
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;

  @media (max-width: 600px) {
    width: 68px;
    font-size: 12px;
  }
`

const BarTimeLabel = styled('span')`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${MONO_FONT};
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  white-space: nowrap;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: 600px) {
    font-size: 11px;
    right: 5px;
  }
`

const CumulativeTime = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  width: 90px;
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;

  @media (max-width: 600px) {
    width: 68px;
    font-size: 12px;
  }
`

const LaneHeaderRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;

  @media (max-width: 600px) {
    gap: 8px;
  }
`

const LaneHeaderSpacer = styled('span')`
  flex-shrink: 0;

  &.rank {
    width: 28px;

    @media (max-width: 600px) {
      width: 22px;
    }
  }

  &.name {
    width: 150px;

    @media (max-width: 600px) {
      width: 90px;
    }
  }
`

const LaneHeaderLabel = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
  width: 90px;
  flex-shrink: 0;
  text-align: right;

  @media (max-width: 600px) {
    width: 68px;
    font-size: 10px;
  }
`

const StepIndicator = styled('div')`
  display: flex;
  gap: 6px;
  justify-content: center;
  padding: 4px 0;
  position: relative;
  z-index: 15;
`

const StepDot = styled('button')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: ${({ $active, $done }) =>
    $active ? '#fd494a' : $done ? 'rgba(255, 255, 255, 0.45)' : 'transparent'};
  padding: 0;
  cursor: pointer;
  transition: background ${transition.medium}, transform ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.3);
    background: ${({ $active }) =>
      $active ? '#fd494a' : 'rgba(255, 255, 255, 0.4)'};
  }

  &:focus-visible {
    outline: 2px solid rgba(253, 73, 74, 0.6);
    outline-offset: 2px;
  }
`

const LeaderboardRow = styled('div')`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 18px;
  border-radius: 8px;
  background: ${({ $rank }) =>
    $rank === 0 ? 'rgba(22, 163, 74, 0.1)' : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${({ $rank }) =>
      $rank === 0 ? 'rgba(22, 163, 74, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  animation: ${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${({ $rank }) => $rank * 80}ms;
  opacity: 0;

  @media (max-width: 600px) {
    padding: 10px 14px;
    gap: 10px;
  }
`

const RankBadge = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: 700;
  color: ${({ $rank }) => ($rank === 0 ? '#16a34a' : 'rgba(255,255,255,0.6)')};
  width: 28px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`

const LeaderName = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: ${({ $rank }) => ($rank === 0 ? '700' : '500')};
  color: ${({ $rank }) =>
    $rank === 0 ? '#16a34a' : 'rgba(255, 255, 255, 0.9)'};
  flex: 1;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`

const LeaderTime = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: 600;
  color: ${({ $rank }) =>
    $rank === 0 ? '#16a34a' : 'rgba(255, 255, 255, 0.7)'};
  font-variant-numeric: tabular-nums;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`

const LeaderDelta = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  font-variant-numeric: tabular-nums;
  width: 80px;
  text-align: right;

  @media (max-width: 600px) {
    display: none;
  }
`

const MetricTabs = styled('div')`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 28px;
`

const MetricTab = styled('button')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.12)' : 'transparent'};
  border: 1px solid
    ${({ $active }) =>
      $active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.12)'};
  border-radius: 6px;
  padding: 6px 18px;
  color: ${({ $active }) =>
    $active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.medium}, border-color ${transition.medium},
    color ${transition.medium};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus-visible {
    outline: 2px solid rgba(253, 73, 74, 0.5);
    outline-offset: 2px;
  }
`

const LEADERBOARD_MODES = [
  {
    key: 'avg',
    label: 'Avg cold duration',
    field: 'avgColdDuration',
    sorted: SORTED_BY_AVG
  },
  {
    key: 'total',
    label: 'Total cold duration',
    field: 'totalColdDuration',
    sorted: SORTED_BY_TOTAL
  }
]

const INTRO_DELAY_PER_LANE = 800

const ROW_HEIGHT = 38
const ROW_GAP = 8
const ROW_SLOT = ROW_HEIGHT + ROW_GAP

const initCumulativeTimes = () =>
  ALPHABETICAL_SERVICES.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {})

const getRankedOrder = cumulative =>
  [...ALPHABETICAL_SERVICES].sort((a, b) => cumulative[a] - cumulative[b])

const getVisualIndex = (key, rankedOrder) => rankedOrder.indexOf(key)

const getCumulativeAtStep = targetStep => {
  const cum = initCumulativeTimes()
  for (let s = 0; s <= targetStep; s++) {
    const url = BENCHMARK_DATA.testUrls[s]?.url
    ALPHABETICAL_SERVICES.forEach(key => {
      const d =
        BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
          ?.coldDuration || 0
      cum[key] += d
    })
  }
  return cum
}

const HeroRace = () => {
  const totalSteps = BENCHMARK_DATA.testUrls.length
  const [phase, setPhase] = useState('idle')
  const [introHighlight, setIntroHighlight] = useState(-1)
  const [step, setStep] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [modeIndex, setModeIndex] = useState(0)
  const [cumulativeTimes, setCumulativeTimes] = useState(initCumulativeTimes)
  const [displayedCumulative, setDisplayedCumulative] =
    useState(initCumulativeTimes)
  const [rankedOrder, setRankedOrder] = useState(ALPHABETICAL_SERVICES)
  const rankedOrderRef = useRef(ALPHABETICAL_SERVICES)
  const [isReordering, setIsReordering] = useState(false)
  const [isSumming, setIsSumming] = useState(false)
  const [isAnnouncing, setIsAnnouncing] = useState(false)
  const [announcingUrl, setAnnouncingUrl] = useState(null)
  const introTimerRef = useRef(null)
  const modeTimerRef = useRef(null)
  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const hasAutoStarted = useRef(false)
  const stepRef = useRef(0)
  const pendingTimers = useRef([])

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    pendingTimers.current.push(id)
    return id
  }, [])

  const clearPending = useCallback(() => {
    pendingTimers.current.forEach(clearTimeout)
    pendingTimers.current = []
  }, [])

  const scheduleNextBars = useCallback(() => {
    const currentStep = stepRef.current
    const url = BENCHMARK_DATA.testUrls[currentStep]?.url

    setCumulativeTimes(prev => {
      const next = { ...prev }
      ALPHABETICAL_SERVICES.forEach(key => {
        const d =
          BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
            ?.coldDuration || 0
        next[key] = prev[key] + d
      })

      schedule(() => {
        setIsSumming(true)
        setDisplayedCumulative(next)

        schedule(() => {
          setIsSumming(false)
          const newOrder = getRankedOrder(next)
          const orderChanged = newOrder.some(
            (k, i) => k !== rankedOrderRef.current[i]
          )

          const advance = () => {
            setIsReordering(false)
            const nextStep = currentStep + 1
            if (nextStep >= BENCHMARK_DATA.testUrls.length) {
              setPhase('finished')
            } else {
              stepRef.current = nextStep
              setActiveStep(nextStep)
              setAnnouncingUrl(BENCHMARK_DATA.testUrls[nextStep]?.url)
              setIsAnnouncing(true)
              schedule(() => {
                schedule(() => {
                  setIsAnnouncing(false)
                  setAnnouncingUrl(null)
                  setStep(nextStep)
                  scheduleNextBars()
                }, 300)
              }, 1500)
            }
          }

          if (orderChanged) {
            schedule(() => {
              setIsReordering(true)
              setRankedOrder(newOrder)
              rankedOrderRef.current = newOrder
              schedule(advance, 2000)
            }, 1000)
          } else {
            setRankedOrder(newOrder)
            rankedOrderRef.current = newOrder
            schedule(advance, 500)
          }
        }, 1000)
      }, 1500)

      return next
    })
  }, [schedule])

  const scheduleNext = useCallback(() => {
    const url = BENCHMARK_DATA.testUrls[stepRef.current]?.url
    setActiveStep(stepRef.current)
    setAnnouncingUrl(url)
    setIsAnnouncing(true)

    schedule(() => {
      schedule(() => {
        setIsAnnouncing(false)
        setAnnouncingUrl(null)
        setStep(stepRef.current)
        scheduleNextBars()
      }, 300)
    }, 1500)
  }, [schedule, scheduleNextBars])

  const jumpToStep = useCallback(
    targetStep => {
      clearPending()
      setIsReordering(false)
      setIsSumming(false)

      const prevCum =
        targetStep > 0
          ? getCumulativeAtStep(targetStep - 1)
          : initCumulativeTimes()
      const order =
        targetStep > 0 ? getRankedOrder(prevCum) : ALPHABETICAL_SERVICES

      stepRef.current = targetStep
      setActiveStep(targetStep)
      setCumulativeTimes(prevCum)
      setDisplayedCumulative(prevCum)
      setRankedOrder(order)
      rankedOrderRef.current = order
      setAnnouncingUrl(BENCHMARK_DATA.testUrls[targetStep]?.url)
      setIsAnnouncing(true)

      schedule(() => {
        schedule(() => {
          setIsAnnouncing(false)
          setAnnouncingUrl(null)
          setStep(targetStep)
          const cum = getCumulativeAtStep(targetStep)

          setCumulativeTimes(cum)

          schedule(() => {
            setIsSumming(true)
            setDisplayedCumulative(cum)

            schedule(() => {
              setIsSumming(false)
              const newOrder = getRankedOrder(cum)
              const orderChanged = newOrder.some(
                (k, i) => k !== rankedOrderRef.current[i]
              )

              const advance = () => {
                setIsReordering(false)
                const nextStep = targetStep + 1
                if (nextStep >= BENCHMARK_DATA.testUrls.length) {
                  setPhase('finished')
                } else {
                  stepRef.current = nextStep
                  setActiveStep(nextStep)
                  setAnnouncingUrl(BENCHMARK_DATA.testUrls[nextStep]?.url)
                  setIsAnnouncing(true)
                  schedule(() => {
                    schedule(() => {
                      setIsAnnouncing(false)
                      setAnnouncingUrl(null)
                      setStep(nextStep)
                      scheduleNextBars()
                    }, 300)
                  }, 1500)
                }
              }

              if (orderChanged) {
                schedule(() => {
                  setIsReordering(true)
                  setRankedOrder(newOrder)
                  rankedOrderRef.current = newOrder
                  schedule(advance, 2600)
                }, 1000)
              } else {
                setRankedOrder(newOrder)
                rankedOrderRef.current = newOrder
                schedule(advance, 500)
              }
            }, 1000)
          }, 2300)
        }, 300)
      }, 1500)
    },
    [schedule, clearPending, scheduleNext]
  )

  const startRace = useCallback(() => {
    clearPending()
    stepRef.current = 0
    setStep(-1)
    setActiveStep(0)
    const fresh = initCumulativeTimes()
    setCumulativeTimes(fresh)
    setDisplayedCumulative(fresh)
    setRankedOrder(ALPHABETICAL_SERVICES)
    rankedOrderRef.current = ALPHABETICAL_SERVICES
    setIsReordering(false)
    setIsSumming(false)
    setIsAnnouncing(false)
    setAnnouncingUrl(null)
    setPhase('racing')
    setModeIndex(0)
    if (modeTimerRef.current) {
      clearTimeout(modeTimerRef.current)
      modeTimerRef.current = null
    }
    setTimeout(() => scheduleNext(), 0)
  }, [scheduleNext])

  const startIntro = useCallback(() => {
    if (hasAutoStarted.current) return
    hasAutoStarted.current = true
    setPhase('intro')
    setIntroHighlight(-1)

    const lastIndex = ALPHABETICAL_SERVICES.length - 1
    let i = 0
    introTimerRef.current = setInterval(() => {
      if (i <= lastIndex) {
        setIntroHighlight(i)
        i++
      } else {
        clearInterval(introTimerRef.current)
        introTimerRef.current = null
        setIntroHighlight(lastIndex + 1)
        setTimeout(() => startRace(), 1000)
      }
    }, INTRO_DELAY_PER_LANE)
  }, [startRace])

  const replay = useCallback(() => {
    if (phase === 'racing') return
    startRace()
  }, [phase, startRace])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoStarted.current) {
          observer.disconnect()
          startIntro()
        }
      },
      { threshold: 0.3 }
    )

    const el = containerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [startIntro])

  useEffect(() => {
    if (phase === 'finished') {
      modeTimerRef.current = setTimeout(() => {
        setModeIndex(1)
        modeTimerRef.current = null
      }, 5000)
    } else if (modeTimerRef.current) {
      clearTimeout(modeTimerRef.current)
      modeTimerRef.current = null
    }
    return () => {
      if (modeTimerRef.current) clearTimeout(modeTimerRef.current)
    }
  }, [phase])

  useEffect(() => {
    return () => {
      if (introTimerRef.current) clearInterval(introTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const prevHeight = el.offsetHeight
    el.style.height = 'auto'
    const nextHeight = el.scrollHeight

    if (prevHeight && prevHeight !== nextHeight) {
      el.style.height = `${prevHeight}px`
      el.offsetHeight // force reflow
      el.style.height = `${nextHeight}px`
    } else {
      el.style.height = `${nextHeight}px`
    }
  }, [phase, modeIndex, step, isAnnouncing])

  const isRacing = phase === 'racing'
  const isFinished = phase === 'finished'
  const isIntro = phase === 'intro'

  const currentUrl = BENCHMARK_DATA.testUrls[step]?.url
  const currentMaxForStep = Math.max(
    ...SERVICES.map(
      key =>
        BENCHMARK_DATA.results[key].perUrl.find(p => p.url === currentUrl)
          ?.coldDuration || 0
    )
  )

  return (
    <RaceContainer ref={containerRef}>
      <RaceInner ref={innerRef}>
        {(isIntro || phase === 'idle') && (
          <>
            <IntroLabel>
              Measuring cold-start speed across {SERVICES.length}
              &nbsp;screenshot APIs
            </IntroLabel>

            <Flex css={{ flexDirection: 'column', gap: '8px' }}>
              {ALPHABETICAL_SERVICES.map((key, i) => {
                const svc = BENCHMARK_DATA.results[key]
                const isLit = isIntro && i <= introHighlight
                const staggerDelay = `${i * 80}ms`

                return (
                  <LaneRow key={key} $animate $delay={staggerDelay}>
                    <LaneName
                      $isMicrolink={false}
                      style={{
                        color: isLit
                          ? 'rgba(255, 255, 255, 0.95)'
                          : 'rgba(255, 255, 255, 0.4)',
                        transition: 'color 0.4s ease'
                      }}
                    >
                      {svc.name}
                    </LaneName>
                    <LaneTrack>
                      {isIntro && i === introHighlight && (
                        <IntroHighlightBar
                          key={i}
                          style={{ background: SERVICE_COLORS[key] }}
                        />
                      )}
                      {isLit && i !== introHighlight && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '5px',
                            background: SERVICE_COLORS[key]
                          }}
                        />
                      )}
                    </LaneTrack>
                    <LaneTime
                      $isMicrolink={false}
                      style={{
                        color: isLit
                          ? 'rgba(255, 255, 255, 0.7)'
                          : 'rgba(255, 255, 255, 0.25)',
                        transition: 'color 0.4s ease'
                      }}
                    ></LaneTime>
                  </LaneRow>
                )
              })}
            </Flex>
          </>
        )}

        {isRacing && (
          <>
            <AnnounceBackdrop $visible={isAnnouncing} />
            {isAnnouncing &&
              announcingUrl &&
              (() => {
                const cfg = getTestUrlConfig(announcingUrl)
                const device = cfg ? getDeviceType(cfg.width) : null
                const dims = cfg
                  ? cfg.height
                    ? `${cfg.width}\u00d7${cfg.height}`
                    : `${cfg.width}w`
                  : null
                const tags = [
                  device && `${device} screenshot`,
                  dims,
                  cfg?.fullPage && 'Full\u2011page',
                  cfg?.format?.toUpperCase()
                ].filter(Boolean)
                return (
                  <DomainAnnounce key={`announce-${announcingUrl}`}>
                    {extractDomain(announcingUrl)}
                    {tags.length > 0 && (
                      <AnnounceMeta>{tags.join(' · ')}</AnnounceMeta>
                    )}
                  </DomainAnnounce>
                )
              })()}
            {(() => {
              const activeUrl = announcingUrl || currentUrl || ''
              const cfg = getTestUrlConfig(activeUrl)
              const device = cfg ? getDeviceType(cfg.width) : null
              const dims = cfg
                ? cfg.height
                  ? `${cfg.width}\u00d7${cfg.height}`
                  : `${cfg.width}w`
                : null
              const metaTags = [
                device && `${device} screenshot`,
                dims,
                cfg?.fullPage && 'Full\u2011page',
                cfg?.format?.toUpperCase()
              ].filter(Boolean)
              const vis = isAnnouncing ? 'hidden' : 'visible'
              return (
                <>
                  <UrlLabel style={{ visibility: vis }}>
                    {extractDomain(activeUrl)}
                  </UrlLabel>
                  <UrlMeta style={{ visibility: vis }}>
                    {metaTags.join(' · ')}
                  </UrlMeta>
                </>
              )
            })()}

            <LaneHeaderRow>
              <LaneHeaderSpacer className='rank' />
              <LaneHeaderSpacer className='name' />
              <span style={{ flex: 1 }} />
              <LaneHeaderLabel>Total</LaneHeaderLabel>
            </LaneHeaderRow>
            <div
              style={{
                position: 'relative',
                height: ALPHABETICAL_SERVICES.length * ROW_SLOT - ROW_GAP
              }}
            >
              {ALPHABETICAL_SERVICES.map((key, domIndex) => {
                const svc = BENCHMARK_DATA.results[key]
                const urlData = svc.perUrl.find(p => p.url === currentUrl)
                const cold = urlData?.coldDuration || 0
                const pct = (cold / currentMaxForStep) * 100
                const isMicrolink = key === 'microlink'
                const visualIndex = getVisualIndex(key, rankedOrder)
                const offset = (visualIndex - domIndex) * ROW_SLOT
                const cumTotal = displayedCumulative[key]

                return (
                  <LaneRow
                    key={key}
                    style={{
                      position: 'absolute',
                      top: domIndex * ROW_SLOT,
                      left: 0,
                      right: 0,
                      transform: `translateY(${offset}px)`,
                      transition: isReordering
                        ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                        : 'none'
                    }}
                  >
                    <LaneRank $rank={visualIndex}>#{visualIndex + 1}</LaneRank>
                    <LaneName $isMicrolink={false}>{svc.name}</LaneName>
                    <LaneTrack>
                      <LaneBar
                        $isMicrolink={isMicrolink}
                        $noGrow={isAnnouncing}
                        style={{
                          width: isAnnouncing ? '0%' : `${pct}%`,
                          background: isMicrolink
                            ? 'linear-gradient(90deg, #fd494a, #ff7b7b)'
                            : SERVICE_COLORS[key]
                        }}
                      >
                        {!isAnnouncing && (
                          <BarTimeLabel $visible>
                            {formatMs(cold)}&thinsp;ms
                          </BarTimeLabel>
                        )}
                      </LaneBar>
                    </LaneTrack>
                    <CumulativeTime
                      style={
                        isSumming
                          ? { color: 'rgba(255, 255, 255, 0.95)' }
                          : undefined
                      }
                    >
                      <AnimatedCounter value={cumTotal} animate={isSumming} />
                    </CumulativeTime>
                  </LaneRow>
                )
              })}
            </div>
          </>
        )}

        {isFinished &&
          (() => {
            const mode = LEADERBOARD_MODES[modeIndex]
            const sorted = mode.sorted
            const field = mode.field
            const bestVal = BENCHMARK_DATA.results[sorted[0]].summary[field]

            return (
              <>
                <UrlLabel
                  css={{
                    justifyContent: 'center',
                    marginBottom: '28px',
                    fontSize: '20px',
                    color: 'rgba(255,255,255,0.8)'
                  }}
                >
                  Final leaderboard
                </UrlLabel>
                <MetricTabs>
                  {LEADERBOARD_MODES.map((m, i) => (
                    <MetricTab
                      key={m.key}
                      $active={i === modeIndex}
                      onClick={() => {
                        if (modeTimerRef.current) {
                          clearTimeout(modeTimerRef.current)
                          modeTimerRef.current = null
                        }
                        setModeIndex(i)
                      }}
                      aria-label={`Show ${m.label}`}
                    >
                      {m.label}
                    </MetricTab>
                  ))}
                </MetricTabs>
                <Flex css={{ flexDirection: 'column', gap: '8px' }}>
                  {sorted.map((key, rank) => {
                    const svc = BENCHMARK_DATA.results[key]
                    const val = svc.summary[field]
                    const delta = val - bestVal

                    return (
                      <LeaderboardRow key={key} $rank={rank}>
                        <RankBadge $rank={rank}>#{rank + 1}</RankBadge>
                        <LeaderName $rank={rank}>{svc.name}</LeaderName>
                        <LeaderDelta>
                          {rank === 0 ? '—' : `+${formatMs(delta)}\u2009ms`}
                        </LeaderDelta>
                        <LeaderTime $rank={rank}>
                          {formatMsDecimal(val)}&thinsp;ms
                        </LeaderTime>
                      </LeaderboardRow>
                    )
                  })}
                </Flex>
                <Flex css={{ justifyContent: 'center', marginTop: '32px' }}>
                  <RaceButton
                    onClick={replay}
                    aria-label='Replay benchmark race'
                  >
                    ▶ Replay
                  </RaceButton>
                </Flex>
              </>
            )
          })()}
      </RaceInner>
      {isRacing && (
        <StepIndicator style={{ marginTop: '16px' }}>
          {BENCHMARK_DATA.testUrls.map((t, i) => (
            <StepDot
              key={t.url}
              $active={i === activeStep}
              $done={i < activeStep}
              aria-label={`Step ${i + 1}: ${extractDomain(t.url)}`}
              onClick={() => jumpToStep(i)}
            />
          ))}
        </StepIndicator>
      )}
    </RaceContainer>
  )
}

const RaceButton = styled('button')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 8px 22px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.medium}, border-color ${transition.medium},
    color ${transition.medium};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus-visible {
    outline: 2px solid rgba(253, 73, 74, 0.5);
    outline-offset: 2px;
  }
`

const speedStreak = keyframes`
  0% { transform: translateX(-10vw); opacity: 0; }
  5% { opacity: 1; }
  95% { opacity: 1; }
  100% { transform: translateX(100vw); opacity: 0; }
`

const SpeedLine = styled('div')`
  position: absolute;
  height: ${({ $h }) => $h || '2px'};
  border-radius: 2px;
  background: ${({ $color }) => $color || 'rgba(255, 255, 255, 0.3)'};
  top: ${({ $top }) => $top};
  animation: ${speedStreak} ${({ $dur }) => $dur || '2s'}
    ${({ $delay }) => $delay || '0s'} linear infinite;
  width: ${({ $w }) => $w || '80px'};
  box-shadow: 0 0 ${({ $glow }) => $glow || '4px'}
    ${({ $color }) => $color || 'rgba(255, 255, 255, 0.2)'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

const ComparisonTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;

  th,
  td {
    padding: 10px 14px;
    text-align: left;
    font-size: 14px;
    border-bottom: ${borders[1]} ${colors.black05};

    @media (max-width: 600px) {
      padding: 8px 10px;
      font-size: 12px;
    }
  }

  th {
    font-family: ${MONO_FONT};
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${colors.black50};
    border-bottom: ${borders[2]} ${colors.black10};
  }

  td {
    font-family: ${MONO_FONT};
    color: ${colors.black80};
  }

  th:last-child,
  td:last-child {
    @media (max-width: 480px) {
      display: none;
    }
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: ${colors.black025};
  }
`

const WinnerTag = styled('span')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${MONO_FONT};
  font-size: 10px;
  font-weight: 700;
  color: #16a34a;
  background: rgba(22, 163, 74, 0.08);
  border: 1px solid rgba(22, 163, 74, 0.2);
  border-radius: 4px;
  padding: 2px 6px;
  margin-left: 6px;
  vertical-align: middle;
`

const PerUrlTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-variant-numeric: tabular-nums;
  table-layout: auto;

  @media (max-width: 767px) {
    display: none;
  }

  th,
  td {
    padding: 8px 12px;
    text-align: right;
    font-size: 12px;
    border-bottom: ${borders[1]} ${colors.black05};
    font-family: ${MONO_FONT};
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${colors.black50};
    border-bottom: ${borders[2]} ${colors.black10};
    font-size: 10px;
  }

  th:first-child,
  td:first-child {
    text-align: left;
    font-weight: 500;
    color: ${colors.black60};
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    background: ${colors.black025};
  }
`

const MobileCards = styled('div')`
  display: none;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 767px) {
    display: flex;
  }
`

const MobileCard = styled('div')`
  border: 1px solid ${colors.black10};
  border-radius: 8px;
  overflow: hidden;
  background: ${colors.white};
`

const MobileCardHeader = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 13px;
  font-weight: 600;
  color: ${colors.black80};
  padding: 10px 14px;
  background: ${colors.black025};
  border-bottom: 1px solid ${colors.black10};
`

const MobileCardRow = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  font-family: ${MONO_FONT};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  border-bottom: 1px solid ${colors.black05};

  &:last-child {
    border-bottom: 0;
  }
`

const MobileCardName = styled('span')`
  color: ${colors.black60};
  font-weight: 500;
`

const MobileCardTime = styled('span')`
  font-weight: ${({ $highlight }) => ($highlight ? 700 : 400)};
  color: ${({ $isMin, $isMax, $isSecond }) =>
    $isMin
      ? '#16a34a'
      : $isMax
        ? '#dc2626'
        : $isSecond
          ? '#d97706'
          : colors.black80};
`

const CellHighlight = styled('span')`
  font-weight: 700;
  color: #16a34a;
`

const CellLoser = styled('span')`
  font-weight: 700;
  color: #dc2626;
`

const CellRunnerUp = styled('span')`
  font-weight: 600;
  color: #d97706;
`

const Hero = () => (
  <section
    css={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%'
    }}
  >
    <div
      css={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, #e7e5e4 1px, transparent 1px),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 0',
        maskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        WebkitMaskImage: `
          repeating-linear-gradient(to right, black 0px, black 3px, transparent 3px, transparent 8px),
          repeating-linear-gradient(to bottom, black 0px, black 3px, transparent 3px, transparent 8px),
          radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
        `,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in'
      }}
    />

    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pt: [4, 4, 5, 5],
        pb: [4, 4, 5, 5],
        px: 4,
        gap: [3, 3, 4, 4]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          gap: [2, 2, 3, 3],
          mb: [2, 2, 3, 3]
        })}
      >
        <Subhead
          forwardedAs='h1'
          variant='gradient'
          css={theme({
            fontSize: ['28px', '36px', '48px', '52px'],
            textAlign: 'center'
          })}
        >
          The Screenshot API
          <br />
          Performance Benchmark
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            color: 'black60',
            textAlign: 'center',
            width: '100%',
            fontSize: [1, 1, 2, '22px'],
            px: [4, 4, 4, 0],
            maxWidth: layout.normal
          })}
        >
          Cold-start latency across 6&nbsp;providers and 7&nbsp;URLs.
          Zero&nbsp;caching.
        </Caption>
      </Flex>

      <HeroRace />
    </Flex>
  </section>
)

const MethodologyList = styled('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${space[3]};
`

const MethodologyItem = styled('li')`
  position: relative;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.close};
  }

  @media (max-width: 767px) {
    padding-left: 0;

    &::before {
      display: none;
    }
  }
`

const Methodology = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      bg: 'pinky',
      pt: [5, 5, 6, 6],
      pb: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto',
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        variant='gradient'
        css={theme({
          fontSize: ['28px', '32px', '40px', '44px'],
          textAlign: 'left'
        })}
      >
        Benchmark methodology &amp; testing architecture
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        To ensure a strictly objective baseline, we built a reproducible testing
        suite targeting 6 screenshot API providers (Microlink, ApiFlash,
        ScreenshotAPI, ScreenshotMachine, ScreenshotOne, and Urlbox) against
        7&nbsp;real-world URLs.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Here is exactly how the data was captured and&nbsp;aggregated:
      </Text>
      <MethodologyList>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>True Cold Starts:</strong> Every request bypassed edge
            caching and warm browser pools. We measured the total round-trip
            latency: HTTP request to Headless Chrome boot to DOM render to
            pixel&nbsp;capture.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Concurrent Execution:</strong> All 6 APIs were triggered
            simultaneously for each target URL. If a target website (e.g.,
            Vercel or Stripe) experienced a latency spike or routing bottleneck,
            every screenshot provider faced the exact same&nbsp;conditions.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>10&times; Global Polling:</strong> To account for AWS/GCP
            load balancing and natural internet traffic fluctuations, the
            benchmark was executed 10 separate times at different hours of
            the&nbsp;day.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Heavy Browser Workloads:</strong> We didn't just test simple
            viewport captures. The payload configurations forced high device
            scale factors (Retina/2&times; resolution), full-page scrolling, and
            active ad-blocking across a mix of static HTML and heavy
            React&nbsp;SPAs.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Outlier &amp; Error Mitigation:</strong> Real-world networks
            occasionally drop packets. To prevent a single anomalous DNS timeout
            (e.g., a 25,000&thinsp;ms spike) from corrupting the dataset, we
            systematically dropped the single slowest execution out of the
            10&nbsp;runs. Any request returning a non-200 HTTP error was also
            isolated and&nbsp;removed.
          </Text>
        </MethodologyItem>
        <MethodologyItem>
          <Text
            css={theme({
              fontSize: [1, 1, 2, 2],
              color: 'black70',
              lineHeight: 3
            })}
          >
            <strong>Final Aggregation:</strong> After cleaning the dataset, we
            calculated the strict avgColdDuration per URL, and summed them to
            find the totalColdDuration to determine the fastest
            overall&nbsp;provider.
          </Text>
        </MethodologyItem>
      </MethodologyList>
      <CalloutBox>
        <CalloutLabel>Transparency note</CalloutLabel>
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3
          })}
        >
          <strong>Regarding ApiFlash:</strong> During our testing, ApiFlash
          consistently struggled with the framer.com payload, returning response
          times approaching 30&nbsp;seconds. Because this metric was a
          significant outlier, we paused the benchmark publication and re-ran
          this specific configuration multiple times across different days and
          server locations. The response times remained consistently slow.
        </Text>
        <br />
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3
          })}
        >
          In the interest of absolute transparency and fairness to the other
          providers who successfully handled the complex DOM, we have chosen to
          publish the raw, unedited data exactly as it was&nbsp;recorded.
        </Text>
        <br />
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black70',
            lineHeight: 3,
            mt: 2
          })}
        >
          For context: if framer.com were excluded from the dataset, ApiFlash's
          average cold duration would drop from{' '}
          <span css={{ fontFamily: MONO_FONT }}>9,702.57&thinsp;ms</span> to{' '}
          <span css={{ fontFamily: MONO_FONT }}>6,731.14&thinsp;ms</span>,
          moving it from last place to <strong>4th in average latency</strong>{' '}
          (behind Microlink, ScreenshotAPI, and ScreenshotMachine). Its total
          cold duration would fall to{' '}
          <span css={{ fontFamily: MONO_FONT }}>40,386.86&thinsp;ms</span>,
          ranking <strong>4th overall</strong> — right
          behind&nbsp;ScreenshotMachine.
        </Text>
      </CalloutBox>
      <Text
        css={theme({
          fontSize: [0, 0, 1, 1],
          color: 'black50',
          lineHeight: 3
        })}
      >
        The complete testing architecture is{' '}
        <Link href='https://github.com/microlinkhq/benchmark'>
          open source on GitHub
        </Link>
        . Last run:{' '}
        <span
          css={{
            fontFamily: MONO_FONT,
            fontSize: '15px',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          March,&nbsp;2026
        </span>
        .
      </Text>
    </Flex>
  </Container>
)

const CompetitorComparison = () => {
  const micro = BENCHMARK_DATA.results.microlink
  const microAvg = micro.summary.avgColdDuration

  return (
    <Container
      as='section'
      css={theme({
        maxWidth: '100%',
        pt: [4, 4, 5, 5],
        pb: [5, 5, 6, 6]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          maxWidth: layout.large,
          px: [4, 4, 4, 0],
          mx: 'auto',
          gap: ['24px', '24px', '32px', '32px']
        })}
      >
        <Subhead
          css={theme({
            fontSize: ['28px', '32px', '40px', '44px'],
            textAlign: 'left'
          })}
        >
          Screenshot API speed comparison by provider
        </Subhead>

        <Text
          css={{
            fontFamily: MONO_FONT,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.black50,
            marginBottom: '-16px'
          }}
        >
          Average cold-start latency per provider
        </Text>
        <Box
          css={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            border: `${borders[1]} ${colors.black10}`,
            background: colors.white
          }}
        >
          <ComparisonTable>
            <thead>
              <tr>
                <th>Provider</th>
                <th>Avg Cold Duration</th>
                <th>vs.&nbsp;Microlink</th>
              </tr>
            </thead>
            <tbody>
              {SORTED_SERVICES.map((key, rank) => {
                const svc = BENCHMARK_DATA.results[key]
                const avg = svc.summary.avgColdDuration
                const delta = avg - microAvg
                const pctSlower =
                  microAvg > 0 ? ((delta / microAvg) * 100).toFixed(0) : 0
                const isMicrolink = key === 'microlink'
                const isRunnerUp = rank === 1

                const nameColor = isMicrolink
                  ? '#16a34a'
                  : isRunnerUp
                    ? '#d97706'
                    : colors.black80
                const timeColor = isMicrolink
                  ? '#16a34a'
                  : isRunnerUp
                    ? '#d97706'
                    : undefined

                return (
                  <tr key={key}>
                    <td>
                      <span
                        style={{
                          fontWeight: isMicrolink || isRunnerUp ? 700 : 400,
                          color: nameColor
                        }}
                      >
                        {svc.name}
                      </span>
                      {isMicrolink && <WinnerTag>Fastest</WinnerTag>}
                    </td>
                    <td
                      style={{
                        fontWeight: isMicrolink || isRunnerUp ? 700 : 400,
                        color: timeColor
                      }}
                    >
                      {formatMsDecimal(avg)}&thinsp;ms
                    </td>
                    <td
                      style={{
                        color: isMicrolink ? '#16a34a' : colors.black50
                      }}
                    >
                      {isMicrolink ? '—' : `+${pctSlower}% slower`}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </ComparisonTable>
        </Box>

        <Text
          css={{
            fontFamily: MONO_FONT,
            fontSize: '13px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: colors.black50,
            marginBottom: '-16px'
          }}
        >
          Cold-start latency breakdown by URL
        </Text>
        <Box
          css={theme({
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            border: `${borders[1]} ${colors.black10}`,
            background: colors.white,
            display: ['none', 'none', 'block']
          })}
        >
          <PerUrlTable>
            <thead>
              <tr>
                <th css={{ textAlign: 'left' }}>URL</th>
                {SORTED_SERVICES.map(key => (
                  <th
                    key={key}
                    css={{
                      color: key === 'microlink' ? '#16a34a' : colors.black50
                    }}
                  >
                    {BENCHMARK_DATA.results[key].name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BENCHMARK_DATA.testUrls.map(({ url }) => {
                const times = SORTED_SERVICES.map(
                  key =>
                    BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
                      ?.coldDuration || 0
                )
                const sorted = [...times].sort((a, b) => a - b)
                const minTime = sorted[0]
                const secondMin = sorted[1]
                const maxTime = sorted[sorted.length - 1]

                return (
                  <tr key={url}>
                    <td>{extractDomain(url)}</td>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = times[i] === minTime
                      const isSecond = !isMin && times[i] === secondMin
                      const isMax = times[i] === maxTime
                      return (
                        <td key={key}>
                          {isMin ? (
                            <CellHighlight>{formatMs(times[i])}</CellHighlight>
                          ) : isMax ? (
                            <CellLoser>{formatMs(times[i])}</CellLoser>
                          ) : isSecond ? (
                            <CellRunnerUp>{formatMs(times[i])}</CellRunnerUp>
                          ) : (
                            formatMs(times[i])
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              {(() => {
                const totals = SORTED_SERVICES.map(
                  key => BENCHMARK_DATA.results[key].summary.totalColdDuration
                )
                const minTotal = Math.min(...totals)
                const maxTotal = Math.max(...totals)

                return (
                  <tr>
                    <td
                      css={{
                        fontWeight: 700,
                        color: colors.black80,
                        borderTop: `${borders[2]} ${colors.black10}`
                      }}
                    >
                      Total
                    </td>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = totals[i] === minTotal
                      const isMax = totals[i] === maxTotal
                      return (
                        <td
                          key={key}
                          css={{
                            fontWeight: 700,
                            borderTop: `${borders[2]} ${colors.black10}`,
                            color: isMin
                              ? '#16a34a'
                              : isMax
                                ? '#dc2626'
                                : colors.black80
                          }}
                        >
                          {(totals[i] / 1000).toFixed(1)}&thinsp;s
                        </td>
                      )
                    })}
                  </tr>
                )
              })()}
            </tbody>
          </PerUrlTable>
        </Box>

        <MobileCards>
          {BENCHMARK_DATA.testUrls.map(({ url }) => {
            const times = SORTED_SERVICES.map(
              key =>
                BENCHMARK_DATA.results[key].perUrl.find(p => p.url === url)
                  ?.coldDuration || 0
            )
            const sorted = [...times].sort((a, b) => a - b)
            const minTime = sorted[0]
            const secondMin = sorted[1]
            const maxTime = sorted[sorted.length - 1]

            return (
              <MobileCard key={url}>
                <MobileCardHeader>{extractDomain(url)}</MobileCardHeader>
                {SORTED_SERVICES.map((key, i) => {
                  const isMin = times[i] === minTime
                  const isSecond = !isMin && times[i] === secondMin
                  const isMax = times[i] === maxTime
                  return (
                    <MobileCardRow key={key}>
                      <MobileCardName>
                        {BENCHMARK_DATA.results[key].name}
                      </MobileCardName>
                      <MobileCardTime
                        $highlight={isMin || isMax || isSecond}
                        $isMin={isMin}
                        $isMax={isMax}
                        $isSecond={isSecond}
                      >
                        {formatMs(times[i])}&thinsp;ms
                      </MobileCardTime>
                    </MobileCardRow>
                  )
                })}
              </MobileCard>
            )
          })}
          {(() => {
            const totals = SORTED_SERVICES.map(
              key => BENCHMARK_DATA.results[key].summary.totalColdDuration
            )
            const minTotal = Math.min(...totals)
            const maxTotal = Math.max(...totals)

            return (
              <MobileCard>
                <MobileCardHeader css={{ fontWeight: 700 }}>
                  Total
                </MobileCardHeader>
                {SORTED_SERVICES.map((key, i) => {
                  const isMin = totals[i] === minTotal
                  const isMax = totals[i] === maxTotal
                  return (
                    <MobileCardRow key={key}>
                      <MobileCardName>
                        {BENCHMARK_DATA.results[key].name}
                      </MobileCardName>
                      <MobileCardTime
                        $highlight={isMin || isMax}
                        $isMin={isMin}
                        $isMax={isMax}
                      >
                        {(totals[i] / 1000).toFixed(1)}&thinsp;s
                      </MobileCardTime>
                    </MobileCardRow>
                  )
                })}
              </MobileCard>
            )
          })()}
        </MobileCards>

        <Flex
          css={{
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontFamily: MONO_FONT,
            fontSize: '11px',
            color: colors.black50,
            marginTop: '-12px'
          }}
        >
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#16a34a',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>Fastest</span>
          </Flex>
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#d97706',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>2nd fastest</span>
          </Flex>
          <Flex css={{ alignItems: 'center', gap: '6px' }}>
            <span
              css={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#dc2626',
                flexShrink: 0
              }}
            />
            <span css={{ marginTop: '3px' }}>Slowest</span>
          </Flex>
          <span css={{ color: colors.black40 }}>·</span>
          <span css={{ marginTop: '3px' }}>
            Times in milliseconds (ms), totals in seconds&nbsp;(s)
          </span>
        </Flex>

        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [4, 4, 5, 5]
          })}
        >
          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mt: [3, 3, 4, 4],
                mb: [2, 2, 3, 3]
              })}
            >
              Urlbox alternative: speed &amp; latency
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              When evaluating a Urlbox alternative, cold-start latency is a
              primary concern. In our tests, Urlbox averaged{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.urlbox.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              per request. Microlink processed the same suite at an average of{' '}
              <strong css={{ fontFamily: MONO_FONT, color: '#fd494a' }}>
                {formatMsDecimal(microAvg)}&thinsp;ms
              </strong>
              , making it roughly 44% faster overall. The performance gap is
              most noticeable on heavy DOMs; for instance, on vercel.com, Urlbox
              took nearly 15&nbsp;seconds to resolve and capture, whereas
              Microlink completed the task in 6.3&nbsp;seconds.
            </Text>
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ApiFlash alternative: response times
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ApiFlash demonstrated significant variance depending on the target
              URL. While it handled lightweight pages like example.com
              reasonably well (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMs(
                  BENCHMARK_DATA.results.apiflash.perUrl.find(
                    p => p.url === 'https://example.com'
                  )?.coldDuration || 0
                )}
                &thinsp;ms
              </span>
              ), it struggled with complex SPAs, resulting in the highest
              average cold duration in our test at{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.apiflash.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>
              . On framer.com, ApiFlash took over 27&nbsp;seconds to return a
              payload. For developers seeking an ApiFlash alternative for
              latency-sensitive workloads, Microlink offers a much tighter
              performance baseline, handling the same URL in 6.2&nbsp;seconds.
            </Text>
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ScreenshotAPI &amp; ScreenshotMachine performance
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ScreenshotAPI (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotapi.summary.avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) and ScreenshotMachine (
              <span css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotmachine.summary
                    .avgColdDuration
                )}
                &thinsp;ms avg
              </span>
              ) performed consistently, placing them in the middle of the pack.
              Both services handle standard web pages well, but still lag behind
              Microlink's optimized browser infrastructure. Microlink
              outperformed both services by roughly 30–32% on average,
              demonstrating consistently lower latency across all 7&nbsp;test
              URLs.
            </Text>
          </Box>

          <Box>
            <Subhead
              forwardedAs='h3'
              css={theme({
                fontSize: ['22px', '24px', '28px', '28px'],
                textAlign: 'left',
                mb: [2, 2, 3, 3]
              })}
            >
              ScreenshotOne comparison
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ScreenshotOne averaged{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.screenshotone.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              across the test suite. Interestingly, when capturing its own
              domain (screenshotone.com), it required over 12&nbsp;seconds to
              resolve the request. Microlink handled the same domain in
              5.4&nbsp;seconds. For teams already utilizing ScreenshotOne,
              switching to Microlink provides the same headless browser
              capabilities while cutting the average response time nearly
              in&nbsp;half.
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

const WhyLatencyMatters = () => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      bg: 'white',
      pt: [5, 5, 6, 6],
      pb: [4, 4, 5, 5]
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto',
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        css={theme({
          fontSize: ['28px', '32px', '40px', '44px'],
          textAlign: 'left'
        })}
      >
        Why latency matters for AI agents &amp; Puppeteer alternatives
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        When you transition from managing your own headless browser
        infrastructure (like Puppeteer or Playwright) to outsourcing it to a
        managed API, you introduce a network hop into your critical path. If
        your provider is slow, every downstream system inherits
        that&nbsp;latency.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: ['22px', '24px', '28px', '28px'],
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        The "observe" phase in agentic workflows
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        For multimodal AI agents and LLMs, browser latency compounds
        exponentially. Modern agents rely on both structured DOM extraction and
        visual grounding (screenshots) to observe web state and make decisions.
        When a single page capture takes 10–15&nbsp;seconds, a multi-step
        reasoning loop quickly stalls&nbsp;out.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Microlink is built to keep this cycle as tight as physically possible.
        It includes a built-in proxy layer that handles IP rotation and
        mitigates anti-bot blocking (403s, CAPTCHAs) out-of-the-box. This
        ensures your agents get reliable access to target URLs without you
        having to maintain complex, failing proxy&nbsp;pools.
      </Text>
      <Subhead
        forwardedAs='h3'
        css={theme({
          fontSize: ['22px', '24px', '28px', '28px'],
          textAlign: 'left',
          mt: [2, 2, 3, 3]
        })}
      >
        Reducing architectural overhead
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Even a highly optimized Headless Chrome boot and SPA render takes
        3–4&nbsp;seconds. Because browser automation is inherently heavy, your
        infrastructure provider shouldn't add unnecessary network or routing
        overhead.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        When cold starts consistently stretch beyond 8&nbsp;seconds, you are
        forced to abandon synchronous code. Developers have to over-engineer
        workarounds: webhook callbacks, background job queues (Redis/Celery),
        and aggressive retry logic to handle timeouts. By minimizing cold-start
        latency, Microlink keeps response times within manageable synchronous
        limits, drastically simplifying your system&nbsp;architecture.
      </Text>
    </Flex>
  </Container>
)

const StickyCtaBar = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: ${borders[1]} ${colors.black10};
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  transform: translateY(${({ $visible }) => ($visible ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const CtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${MONO_FONT};
  font-size: 13px;
  font-weight: 600;
  background: #fd494a;
  color: white !important;
  border-radius: 6px;
  padding: 8px 20px;
  text-decoration: none !important;
  transition: background ${transition.medium}, box-shadow ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: #e5383b;
    box-shadow: 0 4px 12px rgba(253, 73, 74, 0.3);
  }

  &:focus-visible {
    outline: 2px solid rgba(253, 73, 74, 0.5);
    outline-offset: 2px;
  }
`

const CalloutBox = styled('blockquote')`
  position: relative;
  margin: 0;
  padding: ${space[4]};
  background: ${colors.white};
  border: 1px solid ${colors.black10};
  border-left: 4px solid ${colors.close};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  @media (max-width: 600px) {
    padding: ${space[3]};
  }
`

const CalloutLabel = styled('span')`
  display: inline-block;
  font-family: ${MONO_FONT};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.close};
  background: rgba(253, 73, 74, 0.08);
  border: 1px solid rgba(253, 73, 74, 0.2);
  border-radius: 4px;
  padding: 2px 8px;
  margin-bottom: ${space[2]};
`

const BottomCta = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      pt: [4, 4, 5, 5],
      pb: 0
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        variant='gradient'
        css={theme({
          fontSize: ['40px', '48px', '52px', '58px'],
          textAlign: 'center'
        })}
      >
        Ship faster screenshots
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        50&nbsp;requests/day free — no account, no credit card. Start capturing
        screenshots at the speed your users&nbsp;deserve.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <Link
          href='/docs/api/parameters/screenshot'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Start now for free
        </Link>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {['50 requests/day free', 'No login required', 'No credit card'].map(
          label => (
            <Flex
              key={label}
              css={theme({
                alignItems: 'center',
                gap: 1,
                color: 'black60',
                fontSize: [0, 0, 1, 1]
              })}
            >
              <CheckIcon size={16} color={colors.close} />
              <Text as='span'>{label}</Text>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  </Container>
)

const StickyFooterCta = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <StickyCtaBar $visible={visible}>
      <Text
        css={theme({
          fontSize: [0, 0, 1, 1],
          color: 'black60',
          display: ['none', 'none', 'block', 'block']
        })}
      >
        The fastest screenshot API — proven by benchmarks
      </Text>
      <CtaButton href='/docs/api/parameters/screenshot'>
        Start free trial →
      </CtaButton>
    </StickyCtaBar>
  )
}

export const Head = () => (
  <Meta
    title='Fastest Screenshot API: 2026 Speed Benchmark & Comparison'
    description='See the cold-start latency benchmark across 6 screenshot API providers (Microlink, Urlbox, ApiFlash, etc.) tested against 7 real-world URLs.'
    schemaType='Article'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': 'https://microlink.io/benchmarks/screenshot-api',
      headline: 'Fastest Screenshot API: 2026 Speed Benchmark & Comparison',
      description:
        'Independent performance benchmark comparing 6 screenshot API providers on cold-start latency across 7 real-world URLs.',
      url: 'https://microlink.io/benchmarks/screenshot-api',
      datePublished: '2026-03-10',
      dateModified: '2026-03-10',
      author: {
        '@type': 'Organization',
        name: 'Microlink',
        url: 'https://microlink.io'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Microlink',
        url: 'https://microlink.io'
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Screenshot API',
          sameAs: 'https://en.wikipedia.org/wiki/Screenshot'
        },
        {
          '@type': 'Thing',
          name: 'Web Performance',
          sameAs: 'https://en.wikipedia.org/wiki/Web_performance'
        }
      ]
    }}
  />
)

const ScreenshotApiBenchmarkPage = () => (
  <Layout css={{ marginTop: '0px' }}>
    <Hero />
    <CompetitorComparison />
    <Methodology />
    <WhyLatencyMatters />
    <BottomCta />
    {/* <StickyFooterCta /> */}
  </Layout>
)

export default ScreenshotApiBenchmarkPage
