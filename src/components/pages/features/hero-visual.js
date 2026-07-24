import { breakpoints, theme, shadows, colors } from 'theme'
import React from 'react'
import styled from 'styled-components'
import { Check, Zap } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { OUTPUTS, PARAMS } from './hero-icons'

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    minWidth: 0
  })}
  box-shadow: ${shadows[3]};
`

const StatusPill = styled(Text)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    px: '10px',
    py: '5px',
    borderRadius: 5,
    lineHeight: 1,
    letterSpacing: '0.02em'
  })}
`

const VisualRoot = styled(Box)`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: 3 })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: minmax(0, 1.35fr) 48px minmax(0, 1fr);
    gap: 0;
    align-items: stretch;
  }
`

const FanSvg = styled('svg')`
  display: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: visible;

  @media (min-width: ${breakpoints[1]}) {
    display: block;
  }
`

const FanConnector = () => {
  const left = 56.5
  const right = 60.5
  const midY = 50
  const ends = [9, 21, 33, 45, 57, 69, 81, 93]

  return (
    <FanSvg
      aria-hidden='true'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'
      fill='none'
    >
      {ends.map(y => (
        <path
          key={y}
          d={`M ${left} ${midY} C ${left + 2.5} ${midY}, ${
            right - 2.5
          } ${y}, ${right} ${y}`}
          stroke={colors.pink5}
          strokeWidth='0.45'
          strokeDasharray='1.2 1.1'
          vectorEffect='non-scaling-stroke'
        />
      ))}
    </FanSvg>
  )
}

const CheckBadge = () => (
  <Flex
    css={theme({
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      bg: 'close',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    })}
  >
    <Check size={11} strokeWidth={3} />
  </Flex>
)

const OutputIcon = ({ icon: Icon, color, bolt }) => (
  <Flex
    css={theme({
      width: '22px',
      height: '22px',
      alignItems: 'center',
      justifyContent: 'center',
      color,
      flexShrink: 0,
      position: 'relative'
    })}
  >
    <Icon size={14} />
    {bolt && (
      <Box
        css={theme({
          position: 'absolute',
          right: '-2px',
          bottom: '-1px',
          color,
          display: 'flex'
        })}
      >
        <Zap size={8} fill='currentColor' />
      </Box>
    )}
  </Flex>
)

export const CompositionVisual = () => (
  <VisualRoot aria-hidden='true'>
    <FanConnector />

    <Card
      css={theme({
        position: 'relative',
        zIndex: 2,
        p: [3, 3, '18px', '18px'],
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: 3 })}>
        <StatusPill css={theme({ bg: 'green2', color: 'green8' })}>
          GET
        </StatusPill>
        <Text
          css={theme({
            fontFamily: 'mono',
            fontSize: 0,
            color: 'black80',
            minWidth: 0
          })}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          https://api.microlink.io
        </Text>
      </Flex>

      <Box
        as='pre'
        css={theme({
          m: 0,
          p: 0,
          fontFamily: 'mono',
          fontSize: 0,
          lineHeight: 2,
          overflowX: 'auto',
          flex: '1 1 auto'
        })}
      >
        {PARAMS.map(({ key, value }) => (
          <Box key={key} as='div' css={theme({ whiteSpace: 'nowrap' })}>
            <Text
              as='span'
              css={theme({ color: 'secondary', fontWeight: 'bold' })}
            >
              {key}
            </Text>
            <Text as='span' css={theme({ color: 'black30' })}>
              =
            </Text>
            <Text as='span' css={theme({ color: 'blue7' })}>
              {value}
            </Text>
          </Box>
        ))}
      </Box>

      <Box css={theme({ pt: 3 })}>
        <StatusPill css={theme({ bg: 'green2', color: 'green8' })}>
          200 OK
        </StatusPill>
      </Box>
    </Card>

    <Box css={theme({ display: ['none', 'block', 'block', 'block'] })} />

    <Card
      css={theme({
        position: 'relative',
        zIndex: 2,
        py: 2,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      })}
    >
      {OUTPUTS.map(({ label, icon, color, bolt }) => (
        <Flex
          key={label}
          css={theme({
            alignItems: 'center',
            gap: 2,
            py: '6px'
          })}
        >
          <OutputIcon icon={icon} color={color} bolt={bolt} />
          <Text
            css={theme({
              flex: '1 1 auto',
              fontSize: 0,
              color: 'black80',
              minWidth: 0,
              lineHeight: 1
            })}
          >
            {label}
          </Text>
          <CheckBadge />
        </Flex>
      ))}
    </Card>
  </VisualRoot>
)
