import React from 'react'
import Box from 'components/elements/Box'
import ServerTimingBars from 'components/patterns/ServerTiming/ServerTiming'
import { Stat, StatRow } from 'components/patterns/Stats/Stats'
import { withContainer } from 'helpers/hoc/with-container'
import { parseServerTiming } from 'helpers/server-timing'
import { theme } from 'theme'

const Panel = ({ padded, children }) => (
  <withContainer.Container>
    <Box
      css={theme({
        border: 1,
        borderColor: 'black10',
        borderRadius: 3,
        p: padded ? 4 : undefined
      })}
    >
      {children}
    </Box>
  </withContainer.Container>
)

export const ServerTiming = ({ header }) => (
  <Panel>
    <ServerTimingBars bars={parseServerTiming(header).bars} />
  </Panel>
)

export const Stats = ({ items }) => (
  <Panel padded>
    <StatRow>
      {items.map(({ label, value }) => (
        <Stat key={label} label={label} value={value} />
      ))}
    </StatRow>
  </Panel>
)
