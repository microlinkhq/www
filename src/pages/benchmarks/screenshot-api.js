/* global IntersectionObserver */
import { borders, layout, colors, theme, transition } from 'theme'
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
  timestamp: '2026-03-10T17:51:40.480Z',
  testUrls: [
    { url: 'https://vercel.com' },
    { url: 'https://example.com' },
    { url: 'https://stripe.com' },
    { url: 'https://screenshotone.com' },
    { url: 'https://news.ycombinator.com' },
    { url: 'https://github.com/trending' },
    { url: 'https://www.framer.com' }
  ],
  results: {
    microlink: {
      name: 'Microlink',
      summary: {
        avgColdDuration: 3745.82,
        totalColdDuration: 26220.68
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6172.32 },
        { url: 'https://example.com', coldDuration: 972.44 },
        { url: 'https://stripe.com', coldDuration: 3114.02 },
        { url: 'https://screenshotone.com', coldDuration: 4823.36 },
        { url: 'https://news.ycombinator.com', coldDuration: 3195.26 },
        { url: 'https://github.com/trending', coldDuration: 3079.05 },
        { url: 'https://www.framer.com', coldDuration: 4864.23 }
      ]
    },
    apiflash: {
      name: 'ApiFlash',
      summary: {
        avgColdDuration: 9702.57,
        totalColdDuration: 67917.96
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 13956.19 },
        { url: 'https://example.com', coldDuration: 2010.55 },
        { url: 'https://stripe.com', coldDuration: 5313.18 },
        { url: 'https://screenshotone.com', coldDuration: 9900.12 },
        { url: 'https://news.ycombinator.com', coldDuration: 2061.07 },
        { url: 'https://github.com/trending', coldDuration: 7145.75 },
        { url: 'https://www.framer.com', coldDuration: 7531.1 }
      ]
    },
    screenshotapi: {
      name: 'ScreenshotAPI',
      summary: {
        avgColdDuration: 5876.14,
        totalColdDuration: 41132.97
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 6204.79 },
        { url: 'https://example.com', coldDuration: 4849.4 },
        { url: 'https://stripe.com', coldDuration: 4808.85 },
        { url: 'https://screenshotone.com', coldDuration: 7259.61 },
        { url: 'https://news.ycombinator.com', coldDuration: 5295.75 },
        { url: 'https://github.com/trending', coldDuration: 5807.86 },
        { url: 'https://www.framer.com', coldDuration: 6906.71 }
      ]
    },
    screenshotmachine: {
      name: 'ScreenshotMachine',
      summary: {
        avgColdDuration: 6076.81,
        totalColdDuration: 42537.63
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 9347.0 },
        { url: 'https://example.com', coldDuration: 1332.77 },
        { url: 'https://stripe.com', coldDuration: 3612.38 },
        { url: 'https://screenshotone.com', coldDuration: 11815.22 },
        { url: 'https://news.ycombinator.com', coldDuration: 4872.24 },
        { url: 'https://github.com/trending', coldDuration: 3878.28 },
        { url: 'https://www.framer.com', coldDuration: 7679.74 }
      ]
    },
    screenshotone: {
      name: 'ScreenshotOne',
      summary: {
        avgColdDuration: 8002.65,
        totalColdDuration: 56018.5
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 10339.49 },
        { url: 'https://example.com', coldDuration: 3618.0 },
        { url: 'https://stripe.com', coldDuration: 6500.47 },
        { url: 'https://screenshotone.com', coldDuration: 12907.7 },
        { url: 'https://news.ycombinator.com', coldDuration: 7026.93 },
        { url: 'https://github.com/trending', coldDuration: 6806.01 },
        { url: 'https://www.framer.com', coldDuration: 8819.9 }
      ]
    },
    urlbox: {
      name: 'Urlbox',
      summary: {
        avgColdDuration: 7417.9,
        totalColdDuration: 51925.3
      },
      perUrl: [
        { url: 'https://vercel.com', coldDuration: 13724.91 },
        { url: 'https://example.com', coldDuration: 2252.97 },
        { url: 'https://stripe.com', coldDuration: 3967.98 },
        { url: 'https://screenshotone.com', coldDuration: 15606.44 },
        { url: 'https://news.ycombinator.com', coldDuration: 4656.41 },
        { url: 'https://github.com/trending', coldDuration: 4862.29 },
        { url: 'https://www.framer.com', coldDuration: 6854.3 }
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

const RaceContainer = styled('div')`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);

  @media (max-width: 600px) {
    padding: 24px 16px;
    border-radius: 10px;
  }
`

const UrlLabel = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.03em;
  margin-bottom: 16px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const IntroLabel = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 0.02em;
  animation: ${fadeIn} 0.4s ease forwards;

  @media (max-width: 600px) {
    font-size: 13px;
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

  @media (max-width: 600px) {
    height: 32px;
    gap: 8px;
  }
`

const LaneName = styled('div')`
  font-family: ${MONO_FONT};
  font-size: 14px;
  font-weight: ${({ $isMicrolink }) => ($isMicrolink ? '700' : '500')};
  color: ${({ $isMicrolink }) =>
    $isMicrolink ? '#fd494a' : 'rgba(255, 255, 255, 0.85)'};
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
  animation: ${barGrow} 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
  width: 80px;
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;

  @media (max-width: 600px) {
    width: 60px;
    font-size: 12px;
  }
`

const StepIndicator = styled('div')`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-bottom: 28px;
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
    $rank === 0 ? 'rgba(253, 73, 74, 0.1)' : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${({ $rank }) =>
      $rank === 0 ? 'rgba(253, 73, 74, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
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
  color: ${({ $rank }) => ($rank === 0 ? '#fd494a' : 'rgba(255,255,255,0.6)')};
  width: 28px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`

const LeaderName = styled('span')`
  font-family: ${MONO_FONT};
  font-size: 15px;
  font-weight: ${({ $rank }) => ($rank === 0 ? '700' : '500')};
  color: ${({ $rank }) =>
    $rank === 0 ? '#fd494a' : 'rgba(255, 255, 255, 0.9)'};
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
    $rank === 0 ? '#fd494a' : 'rgba(255, 255, 255, 0.7)'};
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
    label: 'Total cold duration (7 URLs)',
    field: 'totalColdDuration',
    sorted: SORTED_BY_TOTAL
  }
]

const INTRO_DELAY_PER_LANE = 800

const HeroRace = () => {
  const totalSteps = BENCHMARK_DATA.testUrls.length
  const [phase, setPhase] = useState('idle')
  const [introHighlight, setIntroHighlight] = useState(-1)
  const [step, setStep] = useState(0)
  const [modeIndex, setModeIndex] = useState(0)
  const timerRef = useRef(null)
  const introTimerRef = useRef(null)
  const modeTimerRef = useRef(null)
  const containerRef = useRef(null)
  const hasAutoStarted = useRef(false)

  const advanceStep = useCallback(() => {
    setStep(prev => {
      const next = prev + 1
      if (next >= totalSteps) {
        clearInterval(timerRef.current)
        timerRef.current = null
        setPhase('finished')
        return prev
      }
      return next
    })
  }, [totalSteps])

  const startRace = useCallback(() => {
    setStep(0)
    setPhase('racing')
    setModeIndex(0)
    if (modeTimerRef.current) {
      clearInterval(modeTimerRef.current)
      modeTimerRef.current = null
    }
    timerRef.current = setInterval(advanceStep, 1800)
  }, [advanceStep])

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
    if (phase === 'racing' || phase === 'intro') return
    hasAutoStarted.current = false
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
      modeTimerRef.current = setInterval(() => {
        setModeIndex(prev => (prev + 1) % LEADERBOARD_MODES.length)
      }, 5000)
    } else if (modeTimerRef.current) {
      clearInterval(modeTimerRef.current)
      modeTimerRef.current = null
    }
    return () => {
      if (modeTimerRef.current) clearInterval(modeTimerRef.current)
    }
  }, [phase])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (introTimerRef.current) clearInterval(introTimerRef.current)
    }
  }, [])

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
      {isIntro && (
        <>
          <IntroLabel>
            Measuring cold-start speed across {SERVICES.length}&nbsp;screenshot
            APIs…
          </IntroLabel>

          <Flex css={{ flexDirection: 'column', gap: '8px' }}>
            {ALPHABETICAL_SERVICES.map((key, i) => {
              const svc = BENCHMARK_DATA.results[key]
              const isLit = i <= introHighlight

              return (
                <LaneRow key={key}>
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
                    {i === introHighlight && (
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
                  >
                    —
                  </LaneTime>
                </LaneRow>
              )
            })}
          </Flex>
        </>
      )}

      {isRacing && (
        <>
          <StepIndicator>
            {BENCHMARK_DATA.testUrls.map((t, i) => (
              <StepDot
                key={t.url}
                $active={i === step}
                $done={i < step}
                aria-label={`Step ${i + 1}: ${extractDomain(t.url)}`}
                onClick={() => {}}
              />
            ))}
          </StepIndicator>

          <UrlLabel>{extractDomain(currentUrl)}</UrlLabel>

          <Flex css={{ flexDirection: 'column', gap: '8px' }}>
            {ALPHABETICAL_SERVICES.map(key => {
              const svc = BENCHMARK_DATA.results[key]
              const urlData = svc.perUrl.find(p => p.url === currentUrl)
              const cold = urlData?.coldDuration || 0
              const pct = (cold / currentMaxForStep) * 100
              const isMicrolink = key === 'microlink'

              return (
                <LaneRow key={key}>
                  <LaneName $isMicrolink={isMicrolink}>{svc.name}</LaneName>
                  <LaneTrack>
                    <LaneBar
                      $isMicrolink={isMicrolink}
                      style={{
                        width: `${pct}%`,
                        background: isMicrolink
                          ? 'linear-gradient(90deg, #fd494a, #ff7b7b)'
                          : SERVICE_COLORS[key]
                      }}
                    />
                  </LaneTrack>
                  <LaneTime $isMicrolink={isMicrolink}>
                    {formatMs(cold)}&thinsp;ms
                  </LaneTime>
                </LaneRow>
              )
            })}
          </Flex>
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
              <MetricTabs>
                {LEADERBOARD_MODES.map((m, i) => (
                  <MetricTab
                    key={m.key}
                    $active={i === modeIndex}
                    onClick={() => {
                      setModeIndex(i)
                      if (modeTimerRef.current) {
                        clearInterval(modeTimerRef.current)
                      }
                      modeTimerRef.current = setInterval(() => {
                        setModeIndex(
                          prev => (prev + 1) % LEADERBOARD_MODES.length
                        )
                      }, 5000)
                    }}
                    aria-label={`Show ${m.label}`}
                  >
                    {m.label}
                  </MetricTab>
                ))}
              </MetricTabs>
              <UrlLabel
                css={{
                  justifyContent: 'center',
                  marginBottom: '28px',
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.8)'
                }}
              >
                Final leaderboard — {mode.label}
              </UrlLabel>
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
                <RaceButton onClick={replay} aria-label='Replay benchmark race'>
                  ▶ Replay
                </RaceButton>
              </Flex>
            </>
          )
        })()}
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
    color: rgba(255, 255, 255, 0.85);
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
  color: #fd494a;
  background: rgba(253, 73, 74, 0.08);
  border: 1px solid rgba(253, 73, 74, 0.2);
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

  th,
  td {
    padding: 8px 12px;
    text-align: right;
    font-size: 12px;
    border-bottom: ${borders[1]} ${colors.black05};
    font-family: ${MONO_FONT};
    white-space: nowrap;

    @media (max-width: 600px) {
      padding: 6px 8px;
      font-size: 10px;
    }
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

const CellHighlight = styled('span')`
  font-weight: 700;
  color: #fd494a;
`

const Hero = () => (
  <section
    css={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      backgroundImage: `radial-gradient(
        circle at center right,
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
      )`,
      borderBottom: `${borders[1]} ${colors.white20}`
    }}
  >
    <Box
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <SpeedLine
        $top='10%'
        $w='140px'
        $h='3px'
        $dur='1.27s'
        $delay='0s'
        $color='rgba(255,255,255,0.45)'
        $glow='8px'
      />
      <SpeedLine
        $top='25%'
        $w='80px'
        $h='2px'
        $dur='1.78s'
        $delay='0.6s'
        $color='rgba(255,255,255,0.2)'
        $glow='4px'
      />
      <SpeedLine
        $top='40%'
        $w='110px'
        $h='2px'
        $dur='1.1s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.55)'
        $glow='10px'
      />
      <SpeedLine
        $top='55%'
        $w='50px'
        $h='1px'
        $dur='2.11s'
        $delay='1.1s'
        $color='rgba(255,255,255,0.12)'
        $glow='3px'
      />
      <SpeedLine
        $top='70%'
        $w='130px'
        $h='3px'
        $dur='1.01s'
        $delay='0.3s'
        $color='rgba(255,255,255,0.6)'
        $glow='12px'
      />
      <SpeedLine
        $top='85%'
        $w='60px'
        $h='1px'
        $dur='1.91s'
        $delay='1.35s'
        $color='rgba(255,255,255,0.15)'
        $glow='3px'
      />
      <SpeedLine
        $top='15%'
        $w='90px'
        $h='2px'
        $dur='1.19s'
        $delay='0.2s'
        $color='rgba(255,255,255,0.35)'
        $glow='6px'
      />
      <SpeedLine
        $top='45%'
        $w='120px'
        $h='3px'
        $dur='0.94s'
        $delay='0s'
        $color='rgba(255,255,255,0.5)'
        $glow='10px'
      />
      <SpeedLine
        $top='60%'
        $w='45px'
        $h='1px'
        $dur='1.8s'
        $delay='0.8s'
        $color='rgba(255,255,255,0.18)'
        $glow='3px'
      />
      <SpeedLine
        $top='75%'
        $w='75px'
        $h='2px'
        $dur='1.35s'
        $delay='0.45s'
        $color='rgba(255,255,255,0.3)'
        $glow='5px'
      />
    </Box>

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
          css={theme({
            fontSize: ['28px', '36px', '48px', '52px'],
            color: 'white',
            textAlign: 'center'
          })}
        >
          The Screenshot API{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            Performance Benchmark
          </span>
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            color: 'white80',
            textAlign: 'center',
            width: '100%',
            fontSize: [1, 1, 2, '22px'],
            px: [4, 4, 4, 0],
            maxWidth: layout.normal
          })}
        >
          Cold-start latency across 6&nbsp;providers, 7&nbsp;URLs, zero caching.
          <br />
          Microlink finishes first on every test.
        </Caption>
      </Flex>

      <HeroRace />
    </Flex>
  </section>
)

const Methodology = () => (
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
        Finding the Fastest Screenshot API
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        We benchmarked 6 screenshot API providers — Microlink, ApiFlash,
        ScreenshotAPI, ScreenshotMachine, ScreenshotOne, and Urlbox — against
        7&nbsp;real-world URLs. The test suite ranges from trivial static pages
        (example.com) to complex SPAs and heavy marketing sites (Framer, Vercel,
        Stripe).
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Every request was a cold start: no caching, no warm browser pools. We
        measured the full round-trip from HTTP request to pixel delivery,
        including DNS resolution, Headless Chrome boot, DOM rendering, and
        viewport capture. This is the latency your users actually experience on
        a first&nbsp;hit.
      </Text>
      <Text
        css={theme({
          fontSize: [0, 0, 1, 1],
          color: 'black50',
          lineHeight: 3
        })}
      >
        The benchmark suite is{' '}
        <Link href='https://github.com/microlinkhq/benchmark'>
          open source on GitHub
        </Link>{' '}
        for full reproducibility. Last run:{' '}
        <span
          css={{
            fontFamily: MONO_FONT,
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          March&nbsp;10,&nbsp;2026
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
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`,
        pt: [5, 5, 6, 6],
        pb: [5, 5, 6, 6]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          maxWidth: layout.large,
          px: [4, 4, 4, 0],
          mx: 'auto',
          gap: [4, 4, 5, 5]
        })}
      >
        <Subhead
          css={theme({
            fontSize: ['28px', '32px', '40px', '44px'],
            textAlign: 'left'
          })}
        >
          Microlink vs. The Competitors
        </Subhead>

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
              {SORTED_SERVICES.map(key => {
                const svc = BENCHMARK_DATA.results[key]
                const avg = svc.summary.avgColdDuration
                const delta = avg - microAvg
                const pctSlower =
                  microAvg > 0 ? ((delta / microAvg) * 100).toFixed(0) : 0
                const isMicrolink = key === 'microlink'

                return (
                  <tr key={key}>
                    <td>
                      <span
                        css={{
                          fontWeight: isMicrolink ? 700 : 400,
                          color: isMicrolink ? '#fd494a' : colors.black80
                        }}
                      >
                        {svc.name}
                      </span>
                      {isMicrolink && <WinnerTag>Fastest</WinnerTag>}
                    </td>
                    <td
                      css={{
                        fontWeight: isMicrolink ? 700 : 400,
                        color: isMicrolink ? '#fd494a' : undefined
                      }}
                    >
                      {formatMsDecimal(avg)}&thinsp;ms
                    </td>
                    <td
                      css={{
                        color: isMicrolink ? '#fd494a' : colors.black50
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

        <Box
          css={{
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '8px',
            border: `${borders[1]} ${colors.black10}`,
            background: colors.white
          }}
        >
          <PerUrlTable>
            <thead>
              <tr>
                <th css={{ textAlign: 'left' }}>URL</th>
                {SORTED_SERVICES.map(key => (
                  <th
                    key={key}
                    css={{
                      color: key === 'microlink' ? '#fd494a' : colors.black50
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
                const minTime = Math.min(...times)

                return (
                  <tr key={url}>
                    <td>{extractDomain(url)}</td>
                    {SORTED_SERVICES.map((key, i) => {
                      const isMin = times[i] === minTime
                      return (
                        <td key={key}>
                          {isMin
                            ? (
                              <CellHighlight>{formatMs(times[i])}</CellHighlight>
                              )
                            : (
                                formatMs(times[i])
                              )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </PerUrlTable>
        </Box>

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
                mb: [2, 2, 3, 3]
              })}
            >
              Urlbox Alternative: Speed &amp; Latency
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              Urlbox averaged{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.urlbox.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>{' '}
              per cold request — nearly 2&times; slower than Microlink's{' '}
              <strong css={{ fontFamily: MONO_FONT, color: '#fd494a' }}>
                {formatMsDecimal(microAvg)}&thinsp;ms
              </strong>
              . On heavy pages like screenshotone.com, Urlbox took 15.6&nbsp;s
              compared to Microlink's 4.8&nbsp;s — a 3.2&times;&nbsp;difference
              that compounds at scale.
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
              ApiFlash Alternative: Response Times
            </Subhead>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: 'black70',
                lineHeight: 3
              })}
            >
              ApiFlash recorded the highest average cold duration in our test at{' '}
              <strong css={{ fontFamily: MONO_FONT }}>
                {formatMsDecimal(
                  BENCHMARK_DATA.results.apiflash.summary.avgColdDuration
                )}
                &thinsp;ms
              </strong>
              , driven by a 27.5-second response on framer.com. Microlink
              handled the same URL in under 5&nbsp;seconds — making it a
              reliable drop-in replacement for latency-sensitive&nbsp;workloads.
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
              ScreenshotAPI &amp; ScreenshotMachine Performance
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
              ) sit in the mid-range. Both delivered consistent but
              unexceptional times. Microlink outperformed each by 36–38%,
              finishing faster on every single&nbsp;URL tested.
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
              ScreenshotOne Comparison
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
              — more than double Microlink's latency. On its own domain
              (screenshotone.com), it took 12.9&nbsp;s while Microlink returned
              in 4.8&nbsp;s. For teams already paying for ScreenshotOne,
              Microlink delivers the same capabilities at half the
              response&nbsp;time.
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
        Why Latency Matters for Puppeteer Alternatives
      </Subhead>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        When you outsource browser infrastructure to a screenshot API, you are
        adding a network hop to your critical path. If that service is slow,
        every downstream feature — link previews, PDF generation, social cards,
        visual regression tests — inherits the latency. The whole point of
        moving off self-hosted Puppeteer is to remove operational overhead{' '}
        <em>without</em> creating a new&nbsp;bottleneck.
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, 2, 2],
          color: 'black70',
          lineHeight: 3
        })}
      >
        Fast cold-start times translate directly to better UX for your
        end-users. A 3.7-second P50 means your screenshots are ready before a
        user can perceive a delay. At 8–10&nbsp;seconds, you are forced to add
        loading spinners, queue architectures, and retry logic — engineering
        complexity that a faster API eliminates&nbsp;entirely.
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

const BottomCta = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      pt: 1,
      pb: [5, 5, 6, 6]
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
        <ArrowLink
          href='/docs/api/parameters/screenshot'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Get your API key
        </ArrowLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {['No login needed', '50 reqs/day free', 'No credit card'].map(
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
    description='Independent benchmark comparing Microlink, Urlbox, ApiFlash, ScreenshotAPI, ScreenshotMachine, and ScreenshotOne. Cold-start latency across 7 URLs. Microlink is 2x faster.'
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
  <Layout>
    <Hero />
    <Methodology />
    <CompetitorComparison />
    <WhyLatencyMatters />
    <BottomCta />
    <StickyFooterCta />
  </Layout>
)

export default ScreenshotApiBenchmarkPage
