import React from 'react'
import Box from 'components/elements/Box'
import ServerTimingBars from 'components/patterns/ServerTiming/ServerTiming'
import { Stat, StatRow } from 'components/patterns/Stats/Stats'
import { withContainer } from 'helpers/hoc/with-container'
import { parseServerTiming } from 'helpers/server-timing'
import { theme } from 'theme'

const Frame = withContainer(({ p, children }) => (
  <Box
    css={theme({
      border: 1,
      borderColor: 'black10',
      borderRadius: 3,
      ...(p != null && { p })
    })}
  >
    {children}
  </Box>
))

export const ServerTiming = ({ header }) => (
  <Frame>
    <ServerTimingBars bars={parseServerTiming(header).bars} />
  </Frame>
)

export const Stats = ({ items }) => (
  <Frame p={4}>
    <StatRow>
      {items.map(({ label, value }) => (
        <Stat key={label} label={label} value={value} />
      ))}
    </StatRow>
  </Frame>
)
