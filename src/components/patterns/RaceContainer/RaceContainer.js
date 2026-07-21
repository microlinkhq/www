import React, { useState, useRef, useCallback, useMemo } from 'react'
import { theme } from 'theme'

import { IntroLanes } from './intro-lanes'
import { RaceLanes } from './race-lanes'
import { Leaderboard } from './leaderboard'
import { useRaceSchedule } from './use-race-schedule'
import { useAutoStart } from './use-auto-start'
import { useFinishedMode } from './use-finished-mode'
import { useHeightTransition } from './use-height-transition'
import { extractDomain } from './utils'
import {
  RaceContainerWrapper,
  RaceInner,
  StepIndicator,
  StepDot
} from './styles'

const RaceContainer = ({
  benchmarkData,
  serviceColors,
  highlightKey,
  flat = false,
  compact = false
}) => {
  const SERVICES = Object.keys(benchmarkData.results)
  const ALPHABETICAL_SERVICES = [...SERVICES].sort((a, b) =>
    benchmarkData.results[a].name.localeCompare(benchmarkData.results[b].name)
  )
  const coldDurationsByService = useMemo(() => {
    const index = {}
    Object.keys(benchmarkData.results).forEach(key => {
      index[key] = new Map(
        benchmarkData.results[key].perUrl.map(p => [p.url, p.coldDuration || 0])
      )
    })
    return index
  }, [benchmarkData])
  const getColdDuration = useCallback(
    (key, url) => coldDurationsByService[key].get(url) || 0,
    [coldDurationsByService]
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

  const getCumulativeAtStep = targetStep => {
    const cum = initCumulativeTimes()
    for (let s = 0; s <= targetStep; s++) {
      const url = benchmarkData.testUrls[s]?.url
      ALPHABETICAL_SERVICES.forEach(key => {
        cum[key] += getColdDuration(key, url)
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
  const cumulativeTimesRef = useRef(null)
  if (cumulativeTimesRef.current === null) {
    cumulativeTimesRef.current = initCumulativeTimes()
  }
  const [displayedCumulative, setDisplayedCumulative] =
    useState(initCumulativeTimes)
  const [rankedOrder, setRankedOrder] = useState(ALPHABETICAL_SERVICES)
  const rankedOrderRef = useRef(ALPHABETICAL_SERVICES)
  const [leaderboardEntered, setLeaderboardEntered] = useState(false)
  const [isReordering, setIsReordering] = useState(false)
  const [isSumming, setIsSumming] = useState(false)
  const [isAnnouncing, setIsAnnouncing] = useState(false)
  const [announcingUrl, setAnnouncingUrl] = useState(null)
  const modeTimerRef = useRef(null)
  const containerRef = useRef(null)
  const innerRef = useRef(null)
  const hasAutoStarted = useRef(false)
  const stepRef = useRef(0)

  const { jumpToStep, startIntro, replay } = useRaceSchedule({
    benchmarkData,
    ALPHABETICAL_SERVICES,
    getColdDuration,
    initCumulativeTimes,
    getRankedOrder,
    getCumulativeAtStep,
    phase,
    setPhase,
    setIntroHighlight,
    setStep,
    setActiveStep,
    setModeIndex,
    setDisplayedCumulative,
    setRankedOrder,
    setLeaderboardEntered,
    setIsReordering,
    setIsSumming,
    setIsAnnouncing,
    setAnnouncingUrl,
    cumulativeTimesRef,
    rankedOrderRef,
    stepRef,
    modeTimerRef,
    hasAutoStarted
  })

  useAutoStart({ containerRef, hasAutoStarted, startIntro })
  useFinishedMode({ phase, setLeaderboardEntered, setModeIndex, modeTimerRef })
  useHeightTransition({ innerRef, phase, modeIndex, step, isAnnouncing })

  const isRacing = phase === 'racing'
  const isFinished = phase === 'finished'
  const isIntro = phase === 'intro'

  const currentUrl = benchmarkData.testUrls[step]?.url
  const currentMaxForStep = Math.max(
    ...SERVICES.map(key => getColdDuration(key, currentUrl))
  )

  return (
    <RaceContainerWrapper ref={containerRef} $flat={flat}>
      <RaceInner ref={innerRef}>
        {(isIntro || phase === 'idle') && (
          <IntroLanes
            benchmarkData={benchmarkData}
            serviceColors={serviceColors}
            compact={compact}
            isIntro={isIntro}
            introHighlight={introHighlight}
            SERVICES={SERVICES}
            ALPHABETICAL_SERVICES={ALPHABETICAL_SERVICES}
          />
        )}

        {isRacing && (
          <RaceLanes
            benchmarkData={benchmarkData}
            serviceColors={serviceColors}
            highlightKey={highlightKey}
            flat={flat}
            compact={compact}
            isAnnouncing={isAnnouncing}
            announcingUrl={announcingUrl}
            currentUrl={currentUrl}
            currentMaxForStep={currentMaxForStep}
            rankedOrder={rankedOrder}
            isReordering={isReordering}
            isSumming={isSumming}
            displayedCumulative={displayedCumulative}
            getColdDuration={getColdDuration}
            getTestUrlConfig={getTestUrlConfig}
            ALPHABETICAL_SERVICES={ALPHABETICAL_SERVICES}
          />
        )}

        {isFinished && (
          <Leaderboard
            benchmarkData={benchmarkData}
            LEADERBOARD_MODES={LEADERBOARD_MODES}
            modeIndex={modeIndex}
            setModeIndex={setModeIndex}
            modeTimerRef={modeTimerRef}
            leaderboardEntered={leaderboardEntered}
            replay={replay}
          />
        )}
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
