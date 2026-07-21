import React from 'react'
import { theme, colors, radii } from 'theme'

import Flex from 'components/elements/Flex'

import {
  IntroLabel,
  IntroHighlightBar,
  LaneRow,
  LaneName,
  LaneTrack,
  LaneTime
} from './styles'

export const IntroLanes = ({
  benchmarkData,
  serviceColors,
  compact,
  isIntro,
  introHighlight,
  SERVICES,
  ALPHABETICAL_SERVICES
}) => (
  <>
    <IntroLabel $compact={compact}>
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
              $compact={compact}
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
                  key={key}
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
)
