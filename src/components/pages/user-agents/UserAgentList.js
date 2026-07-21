import React from 'react'

import { layout, space, theme } from 'theme'

import Box from 'components/elements/Box'
import Terminal from 'components/elements/Terminal/Terminal'

const UserAgentList = ({ terminalTitle, data }) => (
  <Terminal
    title={`${terminalTitle} (${data.length})`}
    blinkCursor={false}
    shellSymbol={false}
    text={JSON.stringify(data, null, 2)}
    css={theme({
      height: '350px',
      width: [`calc(100vw - ${space[4]})`, layout.small]
    })}
  >
    {data.map(userAgent => (
      <Box
        key={userAgent}
        as='span'
        css={theme({
          display: 'block',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        })}
      >
        {userAgent}
      </Box>
    ))}
  </Terminal>
)

export default UserAgentList
