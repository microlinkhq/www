import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { CDN_EDGES } from 'helpers/cdn-edges'
import { theme, SECTION_VERTICAL_SPACING } from 'theme'
import { Database, Globe, Shield, TrendingUp } from 'react-feather'
import React from 'react'

import analyticsData from '../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty, bytes_pretty: bytesPretty }] = analyticsData

const bytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const stats = [
  { icon: Globe, value: CDN_EDGES, name: 'CDN Edges' },
  { icon: TrendingUp, value: `+${reqsPretty}`, name: 'Requests per month' },
  { icon: Database, value: bytes, name: 'Data served' },
  { icon: Shield, value: '99.9%', name: 'Uptime' }
]

const Stat = ({ icon, value, name, isFirst }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      px: [3, 3, 4, 4],
      py: [3, 3, 4, 4],
      borderLeft: isFirst ? 0 : [0, 0, 1, 1],
      borderLeftColor: 'black05'
    })}
  >
    <Flex
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        height: '56px',
        bg: 'pinky',
        color: 'secondary',
        borderRadius: 4,
        flexShrink: 0
      })}
    >
      <FeatherIcon icon={icon} size={2} color='secondary' />
    </Flex>
    <Flex css={theme({ flexDirection: 'column', alignItems: 'flex-start' })}>
      <Text
        forwardedAs='div'
        style={{ fontVariantNumeric: 'tabular-nums' }}
        css={theme({
          color: 'black',
          fontSize: [3, 3, 4, 4],
          fontWeight: 'bold',
          lineHeight: 0,
          whiteSpace: 'nowrap'
        })}
      >
        {value}
      </Text>
      <Caps
        css={theme({
          color: 'secondary',
          fontWeight: 'bold',
          fontSize: 0,
          pt: 1,
          whiteSpace: 'nowrap'
        })}
      >
        {name}
      </Caps>
    </Flex>
  </Flex>
)

const Analytics = () => (
  <Box
    as='section'
    id='analytics'
    css={theme({
      position: 'relative',
      overflow: 'hidden',
      py: SECTION_VERTICAL_SPACING,
      px: 3,
      backgroundImage: 'url(/images/fast-anywhere.png)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    })}
  >
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        mx: 'auto',
        maxWidth: '1280px'
      })}
    >
      <Subhead variant='gradient'>Fast Anywhere</Subhead>
      <Box
        css={theme({
          width: '100%',
          mt: [4, 4, 5, 5],
          bg: 'white95',
          border: 1,
          borderColor: 'white',
          borderRadius: 5,
          boxShadow: 3,
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', 'repeat(4, minmax(0, 1fr))']
        })}
      >
        {stats.map((stat, index) => (
          <Stat key={stat.name} isFirst={index === 0} {...stat} />
        ))}
      </Box>
    </Flex>
  </Box>
)

export default Analytics
