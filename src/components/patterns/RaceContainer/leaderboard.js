import React from 'react'
import { theme } from 'theme'

import Flex from 'components/elements/Flex'

import { formatMs, formatMsDecimal } from './utils'
import {
  UrlLabel,
  MetricTabs,
  MetricTab,
  LeaderboardRow,
  RankBadge,
  LeaderName,
  LeaderDelta,
  LeaderTime,
  RaceButton
} from './styles'

export const Leaderboard = ({
  benchmarkData,
  LEADERBOARD_MODES,
  modeIndex,
  setModeIndex,
  modeTimerRef,
  leaderboardEntered,
  replay
}) => {
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
            <LeaderboardRow
              key={key}
              $rank={rank}
              $animate={!leaderboardEntered}
            >
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
        <RaceButton onClick={replay} aria-label='Replay benchmark race'>
          ▶ Replay
        </RaceButton>
      </Flex>
    </>
  )
}
