/* global IntersectionObserver, requestAnimationFrame, cancelAnimationFrame, performance */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  theme,
  transition,
  colors,
  space,
  radii,
  borders,
  fontSizes,
  breakpoints
} from 'theme'

import Flex from 'components/elements/Flex'

const BREAKPOINT_SMALL_MAX = breakpoints[0]

const formatMs = ms => ms.toLocaleString('en-US', { maximumFractionDigits: 0 })
const formatMsDecimal = ms =>
  ms.toLocaleString('en-US', { maximumFractionDigits: 2 })

const getDeviceType = width => {
  if (width <= 480) return 'Mobile'
  if (width <= 1024) return 'Tablet'
  return 'Desktop'
}

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

const barGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 ${colors.red0}; }
  50% { box-shadow: 0 0 12px 2px ${colors.red3}; }
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
    font-size: ${fontSizes[1]};
    opacity: 1;
    top: 30px;
    transform: translate(-50%, 0);
  }
`

const domainShrinkMobile = keyframes`
  0% {
    font-size: ${fontSizes[3]};
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  60% {
    font-size: ${fontSizes[3]};
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  100% {
    font-size: ${fontSizes[0]};
    opacity: 1;
    top: ${space[4]};
    transform: translate(-50%, 0);
  }
`

const RaceContainerWrapper = styled('div')`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  min-height: 360px;
  background: ${({ $flat }) => ($flat ? 'transparent' : colors.white95)};
  backdrop-filter: ${({ $flat }) => ($flat ? 'none' : `blur(${space[3]})`)};
  -webkit-backdrop-filter: ${({ $flat }) =>
    $flat ? 'none' : `blur(${space[3]})`};
  border: ${({ $flat }) => ($flat ? '0' : `${borders[1]} ${colors.black10}`)};
  border-radius: ${({ $flat }) => ($flat ? '0' : '14px')};
  padding: ${({ $flat }) => ($flat ? '0' : '32px 28px 40px')};
  box-shadow: ${({ $flat }) =>
    $flat
      ? 'none'
      : `0 8px 32px ${colors.black10}, inset 0 1px 0 ${colors.white80}`};
  overflow: hidden;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    min-height: 310px;
    padding: ${({ $flat }) => ($flat ? '0' : '24px 16px 32px')};
    border-radius: ${({ $flat }) => ($flat ? '0' : '10px')};
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
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    mb: 0,
    letterSpacing: 0,
    lineHeight: 0
  })};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

const UrlMeta = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'normal',
    color: 'black',
    letterSpacing: 0,
    lineHeight: 0
  })};
  text-transform: none;
  margin-top: 13px;
  margin-bottom: 12px;
  text-align: center;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    margin-top: ${radii[3]};
    margin-bottom: ${space[2]};
  }
`

const AnnounceMeta = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'normal',
    color: 'black',
    letterSpacing: 0,
    mt: 2,
    gap: 2
  })};
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    gap: ${radii[3]};
    margin-top: ${radii[3]};
  }
`

const DomainAnnounce = styled('div')`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  ${theme({
    fontFamily: 'mono',
    fontSize: '42px',
    fontWeight: 'bold',
    color: 'black',
    letterSpacing: 0
  })};
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

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 3 })};
    animation: ${domainShrinkMobile} 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    ${theme({ fontSize: 1 })};
    top: ${space[4]};
    transform: translate(-50%, 0);
  }
`

const AnnounceBackdrop = styled('div')`
  position: absolute;
  inset: 0;
  background: ${colors.white80};
  border-radius: ${({ $flat }) => ($flat ? '0' : '14px')};
  z-index: 5;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ $visible }) => ($visible ? '0.4s' : '0s')} ease;
  pointer-events: none;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    border-radius: ${({ $flat }) => ($flat ? '0' : '10px')};
  }
`

const IntroLabel = styled('div')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'regular',
    color: 'black',
    mb: '40px',
    letterSpacing: 0
  })};
  text-align: center;
  animation: ${fadeIn} 0.4s ease forwards;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0, mb: '34px' })};
  }
`

const IntroHighlightBar = styled('div')`
  position: absolute;
  inset: 0;
  ${theme({ borderRadius: 2 })};
  transform-origin: left center;
  animation: ${introSweep} 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
`

const LaneRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '10px', height: '38px' })};
  opacity: ${({ $animate }) => ($animate ? 0 : 1)};
  animation: ${({ $animate, $delay }) =>
    $animate
      ? css`
        ${slideInFromRight} 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${$delay ||
        '0s'} forwards
      `
      : 'none'};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    height: 32px;
    ${theme({ gap: 2 })};
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`

const LaneRank = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black',
    width: '28px'
  })};
  flex-shrink: 0;
  text-align: center;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '22px', fontSize: 0 })};
  }
`

const LaneName = styled('div')`
  ${theme({ fontFamily: 'mono', fontSize: 0, width: '150px' })};
  font-weight: ${({ $isMicrolink }) => ($isMicrolink ? '700' : '500')};
  color: ${({ $isMicrolink }) => ($isMicrolink ? colors.red6 : colors.black)};
  flex-shrink: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '90px', fontSize: 0 })};
  }
`

const LaneTrack = styled('div')`
  flex: 1;
  height: 100%;
  position: relative;
  background: ${colors.black05};
  ${theme({ borderRadius: 2 })};
  overflow: hidden;
`

const LaneBar = styled('div')`
  height: 100%;
  ${theme({ borderRadius: 2 })};
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
        ${theme({ borderRadius: 2 })};
        animation: ${pulseGlow} 2s ease-in-out infinite;
      }
    `}
`

const LaneTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, width: '90px' })};
  font-weight: 600;
  color: ${({ $isMicrolink }) => ($isMicrolink ? colors.red6 : colors.black)};
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

const BarTimeLabel = styled('span')`
  position: absolute;
  right: ${space[2]};
  top: 50%;
  transform: translateY(-50%);
  ${theme({ fontFamily: 'mono', fontSize: 0 })};
  font-weight: 600;
  color: ${colors.white95};
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  white-space: nowrap;
  text-shadow: 0 1px 2px ${colors.black50};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.3s ease;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
    right: ${radii[2]};
  }
`

const CumulativeTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, width: '90px' })};
  font-weight: 600;
  color: ${colors.black};
  flex-shrink: 0;
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

const LaneHeaderRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '10px', mb: radii[3] })};

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ gap: 2 })};
  }
`

const LaneHeaderSpacer = styled('span')`
  flex-shrink: 0;

  &.rank {
    ${theme({ width: '28px' })};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      ${theme({ width: '22px' })};
    }
  }

  &.name {
    ${theme({ width: '150px' })};

    @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
      ${theme({ width: '90px' })};
    }
  }
`

const LaneHeaderLabel = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    letterSpacing: 0,
    width: '90px'
  })};
  font-weight: 600;
  text-transform: uppercase;
  color: ${colors.black};
  flex-shrink: 0;
  text-align: right;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ width: '68px', fontSize: 0 })};
  }
`

const StepIndicator = styled('div')`
  display: flex;
  ${theme({ gap: radii[3], py: 1 })};
  justify-content: center;
  position: relative;
  z-index: 15;
`

const StepDot = styled('button')`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: ${borders[1]} ${colors.black10};
  background: ${({ $active, $done }) =>
    $active ? colors.red6 : $done ? colors.black50 : 'transparent'};
  padding: 0;
  cursor: pointer;
  transition: background ${transition.medium}, transform ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: scale(1.3);
    background: ${({ $active }) => ($active ? colors.red6 : colors.black10)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`

const LeaderboardRow = styled('div')`
  display: flex;
  align-items: center;
  ${theme({ gap: '14px', py: '12px', px: '18px' })};
  border-radius: ${radii[4]};
  background: ${({ $rank }) => ($rank === 0 ? colors.green0 : colors.black05)};
  border: ${borders[1]}
    ${({ $rank }) => ($rank === 0 ? colors.green2 : colors.black10)};
  animation: ${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: ${({ $rank }) => $rank * 80}ms;
  opacity: 0;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ py: '10px', px: '14px', gap: '10px' })};
  }
`

const RankBadge = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0, fontWeight: 'bold' })};
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  ${theme({ width: fontSizes[3] })};
  text-align: center;
  font-variant-numeric: tabular-nums;
`

const LeaderName = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: ${({ $rank }) => ($rank === 0 ? '700' : '500')};
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  flex: 1;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

const LeaderTime = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: 600;
  color: ${({ $rank }) => ($rank === 0 ? colors.green7 : colors.black)};
  font-variant-numeric: tabular-nums;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    ${theme({ fontSize: 0 })};
  }
`

const LeaderDelta = styled('span')`
  ${theme({ fontFamily: 'mono', fontSize: 0 })};
  color: ${colors.black};
  font-variant-numeric: tabular-nums;
  ${theme({ width: fontSizes[6] })};
  text-align: right;

  @media (max-width: ${BREAKPOINT_SMALL_MAX}) {
    display: none;
  }
`

const MetricTabs = styled('div')`
  display: flex;
  justify-content: center;
  ${theme({ gap: radii[3], marginBottom: fontSizes[3] })};
`

const MetricTab = styled('button')`
  ${theme({ fontFamily: 'mono', fontSize: 1 })};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background: ${({ $active }) => ($active ? colors.black05 : 'transparent')};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.black50 : colors.black10)};
  border-radius: ${radii[3]};
  ${theme({ py: radii[3], px: '18px' })};
  color: ${colors.black};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.medium}, border-color ${transition.medium},
    color ${transition.medium};

  &:hover {
    background: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`

const RaceButton = styled('button')`
  ${theme({ fontFamily: 'mono', fontSize: 1, fontWeight: 'regular' })};
  background: transparent;
  border: 0;
  border-radius: 0;
  padding: 0;
  color: ${colors.black};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.medium};

  &:hover {
    color: ${colors.black};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.red5};
    outline-offset: ${radii[1]};
  }
`

const INTRO_DELAY_PER_LANE = 800
const ROW_HEIGHT = 38
const ROW_GAP = 8
const ROW_SLOT = ROW_HEIGHT + ROW_GAP

const extractDomain = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

const RaceContainer = ({
  benchmarkData,
  serviceColors,
  highlightKey,
  flat = false
}) => {
  const SERVICES = Object.keys(benchmarkData.results)
  const ALPHABETICAL_SERVICES = [...SERVICES].sort((a, b) =>
    benchmarkData.results[a].name.localeCompare(benchmarkData.results[b].name)
  )
  const SORTED_BY_AVG = [...SERVICES].sort(
    (a, b) =>
      benchmarkData.results[a].summary.avgColdDuration -
      benchmarkData.results[b].summary.avgColdDuration
  )
  const SORTED_BY_TOTAL = [...SERVICES].sort(
    (a, b) =>
      benchmarkData.results[a].summary.totalColdDuration -
      benchmarkData.results[b].summary.totalColdDuration
  )

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

  const initCumulativeTimes = () =>
    ALPHABETICAL_SERVICES.reduce((acc, key) => {
      acc[key] = 0
      return acc
    }, {})

  const getRankedOrder = cumulative =>
    [...ALPHABETICAL_SERVICES].sort((a, b) => cumulative[a] - cumulative[b])

  const getVisualIndex = (key, order) => order.indexOf(key)

  const getCumulativeAtStep = targetStep => {
    const cum = initCumulativeTimes()
    for (let s = 0; s <= targetStep; s++) {
      const url = benchmarkData.testUrls[s]?.url
      ALPHABETICAL_SERVICES.forEach(key => {
        const d =
          benchmarkData.results[key].perUrl.find(p => p.url === url)
            ?.coldDuration || 0
        cum[key] += d
      })
    }
    return cum
  }

  const getTestUrlConfig = url =>
    benchmarkData.testUrls.find(t => t.url === url)

  const [phase, setPhase] = useState('idle')
  const [introHighlight, setIntroHighlight] = useState(-1)
  const [step, setStep] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [modeIndex, setModeIndex] = useState(0)
  const [, setCumulativeTimes] = useState(initCumulativeTimes)
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
    const url = benchmarkData.testUrls[currentStep]?.url

    setCumulativeTimes(prev => {
      const next = { ...prev }
      ALPHABETICAL_SERVICES.forEach(key => {
        const d =
          benchmarkData.results[key].perUrl.find(p => p.url === url)
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
            if (nextStep >= benchmarkData.testUrls.length) {
              setPhase('finished')
            } else {
              stepRef.current = nextStep
              setActiveStep(nextStep)
              setAnnouncingUrl(benchmarkData.testUrls[nextStep]?.url)
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
    const url = benchmarkData.testUrls[stepRef.current]?.url
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
      setAnnouncingUrl(benchmarkData.testUrls[targetStep]?.url)
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
                if (nextStep >= benchmarkData.testUrls.length) {
                  setPhase('finished')
                } else {
                  stepRef.current = nextStep
                  setActiveStep(nextStep)
                  setAnnouncingUrl(benchmarkData.testUrls[nextStep]?.url)
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
      el.getBoundingClientRect() // force reflow
      el.style.height = `${nextHeight}px`
    } else {
      el.style.height = `${nextHeight}px`
    }
  }, [phase, modeIndex, step, isAnnouncing])

  const isRacing = phase === 'racing'
  const isFinished = phase === 'finished'
  const isIntro = phase === 'intro'

  const currentUrl = benchmarkData.testUrls[step]?.url
  const currentMaxForStep = Math.max(
    ...SERVICES.map(
      key =>
        benchmarkData.results[key].perUrl.find(p => p.url === currentUrl)
          ?.coldDuration || 0
    )
  )

  return (
    <RaceContainerWrapper ref={containerRef} $flat={flat}>
      <RaceInner ref={innerRef}>
        {(isIntro || phase === 'idle') && (
          <>
            <IntroLabel>
              Measuring cold-start speed across {SERVICES.length}
              &nbsp;screenshot APIs
            </IntroLabel>

            <Flex css={theme({ flexDirection: 'column', gap: 2 })}>
              {ALPHABETICAL_SERVICES.map((key, i) => {
                const svc = benchmarkData.results[key]
                const isLit = isIntro && i <= introHighlight
                const staggerDelay = `${i * 80}ms`

                return (
                  <LaneRow key={key} $animate $delay={staggerDelay}>
                    <LaneName
                      $isMicrolink={false}
                      style={{
                        color: isLit ? colors.black : colors.black10,
                        transition: 'color 0.4s ease'
                      }}
                    >
                      {svc.name}
                    </LaneName>
                    <LaneTrack>
                      {isIntro && i === introHighlight && (
                        <IntroHighlightBar
                          key={i}
                          style={{ background: serviceColors[key] }}
                        />
                      )}
                      {isLit && i !== introHighlight && (
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: radii[2],
                            background: serviceColors[key]
                          }}
                        />
                      )}
                    </LaneTrack>
                    <LaneTime
                      $isMicrolink={false}
                      style={{
                        color: isLit ? colors.black : colors.black10,
                        transition: 'color 0.4s ease'
                      }}
                    />
                  </LaneRow>
                )
              })}
            </Flex>
          </>
        )}

        {isRacing && (
          <>
            <AnnounceBackdrop $visible={isAnnouncing} $flat={flat} />
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
                const svc = benchmarkData.results[key]
                const urlData = svc.perUrl.find(p => p.url === currentUrl)
                const cold = urlData?.coldDuration || 0
                const pct = (cold / currentMaxForStep) * 100
                const isHighlighted = key === (highlightKey || 'microlink')
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
                        $isMicrolink={isHighlighted}
                        $noGrow={isAnnouncing}
                        style={{
                          width: isAnnouncing ? '0%' : `${pct}%`,
                          background: isHighlighted
                            ? `linear-gradient(90deg, ${colors.red6}, ${colors.red4})`
                            : serviceColors[key]
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
                      style={isSumming ? { color: colors.black } : undefined}
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
            const bestVal = benchmarkData.results[sorted[0]].summary[field]

            return (
              <>
                <UrlLabel
                  css={theme({
                    justifyContent: 'center',
                    mb: 4,
                    fontSize: 2,
                    color: 'black'
                  })}
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
                <Flex css={theme({ flexDirection: 'column', gap: 2 })}>
                  {sorted.map((key, rank) => {
                    const svc = benchmarkData.results[key]
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
                <Flex css={theme({ justifyContent: 'center', mt: 4 })}>
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
        <StepIndicator css={theme({ mt: 3 })}>
          {benchmarkData.testUrls.map((t, i) => (
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
    </RaceContainerWrapper>
  )
}

export default RaceContainer
