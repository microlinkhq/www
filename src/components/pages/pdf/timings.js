import React from 'react'
import { layout, colors, theme } from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Hide from 'components/elements/Hide'
import { LiveTiming } from 'components/patterns/LiveTiming/LiveTiming'
import TimingsBand from 'components/patterns/Timings'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { trimMs } from 'helpers/trim-ms'
import { ACCENT, Subhead, Caption } from './shared'

const STAT_VALUE_FONT_SIZE = ['20px', '26px', '32px', '32px']

export const Timings = ({ timingMs, timingUrl, timingHistory }) => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Subhead css={theme({ color: 'white' })}>
        Send the URL{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Get a PDF back
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        maxWidth: layout.large,
        gap: [1, 3, 4, 5],
        fontVariantNumeric: 'tabular-nums'
      })}
    >
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: STAT_VALUE_FONT_SIZE,
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          {trimMs(healthcheck.pdf.p95_pretty)}
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
          <Caps
            css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}
          >
            P95 cold response
          </Caps>
        </Caption>
      </Flex>
      <Hide breakpoints={[1, 2, 3]}>
        <Box css={theme({ px: 2 })} />
      </Hide>
      <LiveTiming
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: STAT_VALUE_FONT_SIZE,
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          99.9
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
          >
            %
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
          <Caps
            css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}
          >
            SLA Guaranteed
          </Caps>
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <TimingsBand
      accent={`radial-gradient(
          circle at center right,
          ${colors.grape9} 0%,
          ${colors.grape9} 48%,
          ${colors.grape8} 48%,
          ${colors.grape8} 52%,
          ${colors.pink8} 52%,
          ${colors.pink8} 65%,
          ${colors.pink7} 65%,
          ${colors.pink7} 79%,
          ${ACCENT} 79%,
          ${ACCENT} 100%
        )`}
      title={blockOne}
      stats={blockTwo}
    />
  )
}
