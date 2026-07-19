import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Text from 'components/elements/Text'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { colors, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import analyticsData from '../../../../data/analytics.json'

const FAST_TITLE_FONT_SIZE = 'clamp(64px, 12vw, 180px)'

const [{ reqs_pretty: reqsPretty, bytes_pretty: bytesPretty }] = analyticsData

const bytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const stats = [
  { value: CDN_EDGES, name: 'CDN Edges' },
  { value: `+${reqsPretty}`, name: 'Requests per month' },
  { value: bytes, name: 'Data served' },
  { value: '99.9%', name: 'Uptime' }
]

const Stat = ({ value, name }) => (
  <Box css={theme({ minWidth: 0 })}>
    <Text
      forwardedAs='div'
      style={{ fontVariantNumeric: 'tabular-nums' }}
      css={theme({
        color: 'black',
        fontSize: [2, 2, 3, 3],
        fontWeight: 'bold',
        lineHeight: 0,
        whiteSpace: 'nowrap'
      })}
    >
      {value}
    </Text>
    <Caps
      css={theme({
        color: 'black60',
        fontWeight: 'normal',
        fontSize: [0, 0, 1, 1],
        pt: 1,
        whiteSpace: 'nowrap'
      })}
    >
      {name}
    </Caps>
  </Box>
)

const Analytics = () => (
  <Box
    as='section'
    id='analytics'
    aria-labelledby='fast-anywhere-title'
    css={theme({
      position: 'relative',
      isolation: 'isolate',
      overflow: 'hidden',
      height: ['320px', '400px', '500px', '500px'],
      py: SECTION_VERTICAL_SPACING,
      bg: 'white'
    })}
  >
    <Box
      aria-hidden='true'
      css={theme({
        position: 'absolute',
        zIndex: -3,
        top: ['96px', '96px', '128px', '128px'],
        left: '50%',
        width: '100%',
        height: ['200px', '280px', '400px', '400px'],
        bg: 'pinky',
        borderRadius: '100%',
        opacity: 0.8,
        transform: 'translateX(-50%)',
        filter: 'blur(60px)'
      })}
    />
    <Text
      id='fast-anywhere-title'
      as='h2'
      css={theme({
        position: 'absolute',
        zIndex: -2,
        top: 0,
        left: '50%',
        width: 'max-content',
        color: 'secondary',
        fontSize: FAST_TITLE_FONT_SIZE,
        fontWeight: 'bold',
        lineHeight: 0,
        whiteSpace: 'nowrap',
        transform: 'translateX(-50%)',
        backgroundImage: `linear-gradient(135deg, ${colors.black}, ${colors.secondary}, ${colors.yellow3})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      })}
    >
      Fast Anywhere
    </Text>
    <Box
      as='img'
      src='/images/fast-anywhere.png'
      alt='Microlink’s global edge network'
      loading='lazy'
      css={theme({
        position: 'absolute',
        zIndex: -1,
        top: ['-72px', '-72px', '-112px', '-112px'],
        left: '50%',
        width: '100%',
        maxWidth: '1536px',
        transform: 'translateX(-50%)'
      })}
    />
    <Box
      aria-hidden='true'
      css={theme({
        position: 'absolute',
        zIndex: 1,
        right: 0,
        bottom: 0,
        left: 0,
        height: ['180px', '220px', '260px', '260px'],
        backgroundImage: `linear-gradient(transparent, ${colors.white})`,
        pointerEvents: 'none'
      })}
    />
    <Box
      css={theme({
        position: 'absolute',
        zIndex: 2,
        right: 0,
        bottom: 0,
        left: 0,
        px: [3, 3, 4, 4],
        pb: [3, 3, 4, 4]
      })}
    >
      <Box
        css={theme({
          mx: 'auto',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: [
            'repeat(2, minmax(0, 1fr))',
            'repeat(2, minmax(0, 1fr))',
            'repeat(4, minmax(0, 1fr))'
          ],
          gap: [3, 4, 5, 5],
          p: [3, 4, 4, 4],
          bg: 'white95',
          border: 1,
          borderColor: 'white',
          borderRadius: 5,
          boxShadow: 3
        })}
      >
        {stats.map(stat => (
          <Stat key={stat.name} {...stat} />
        ))}
      </Box>
      <Text
        forwardedAs='p'
        css={theme({
          pt: 1,
          color: 'black50',
          fontSize: 0,
          fontStyle: 'italic',
          textAlign: 'center'
        })}
      >
        * monthly average
      </Text>
    </Box>
  </Box>
)

export default Analytics
