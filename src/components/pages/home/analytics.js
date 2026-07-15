import Hide from 'components/elements/Hide'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Block from 'components/patterns/Block/Block'
import { CDN_EDGES } from 'helpers/cdn-edges'
import Caption from 'components/patterns/Caption/Caption'
import { colors, borders, theme, SECTION_VERTICAL_SPACING } from 'theme'
import styled from 'styled-components'
import take from 'lodash/take'
import React from 'react'

import analyticsData from '../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty, bytes_pretty: bytesPretty }] = analyticsData

const Separator = styled(Box)`
  border-right: ${borders[1]};
  border-color: ${colors.white20};
  width: 1px;

  ${theme({ mt: [1, 1, 0, 0], mx: [3, 3, 4, 4] })}
`

const Stat = ({ value, name, isLast }) => (
  <Flex>
    <Flex css={theme({ alignItems: 'center', flexDirection: 'column' })}>
      <Subhead
        forwardedAs='div'
        css={theme({ fontSize: [3, 4, 6, 6], color: 'white80' })}
      >
        {value}
      </Subhead>
      <Caption css={theme({ pt: [2, 3, 3, 3], color: 'pink', opacity: 0.8 })}>
        <Caps css={theme({ fontWeight: 'bold' })}>{name}</Caps>
      </Caption>
    </Flex>
    {!isLast && <Separator />}
  </Flex>
)

const bytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  const fixedValue = Number(value).toFixed(0)
  return `${fixedValue}${unit}`
})()

const stats = [
  { value: CDN_EDGES, name: 'CDN Edges' },
  { value: `+${reqsPretty}`, name: 'requests per month' },
  { value: bytes, name: 'data served' },
  { value: '99.9%', name: 'uptime' }
]

const Analytics = () => {
  return (
    <Block
      forwardedAs='section'
      id='analytics'
      css={theme({
        flexDirection: 'column',
        py: SECTION_VERTICAL_SPACING,
        bg: 'black',
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
    >
      <Hide breakpoints={[0, 1]}>
        <Flex css={{ width: '100%', justifyContent: 'space-around' }}>
          {stats.map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 1}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Flex css={{ width: '100%', justifyContent: 'space-around' }}>
          {take(stats, stats.length - 1).map((stat, index) => (
            <Stat
              key={stat.name}
              isLast={index === stats.length - 2}
              {...stat}
            />
          ))}
        </Flex>
      </Hide>
    </Block>
  )
}

export default Analytics
