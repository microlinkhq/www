import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import Caps from 'components/elements/Caps'
import { theme } from 'theme'

const Chat = () => {
  return (
    <Flex css={theme({ justifyContent: 'center', alignItems: 'center' })}>
      <Button
        onClick={() =>
          window.open(
            'https://join.slack.com/t/microlinkhq/shared_invite/zt-3oe805om-HzexWW5yQNcF6cJs3dFM_A',
            '_blank',
            'noopener noreferrer'
          )}
      >
        <Caps css={theme({ fontSize: 0, px: 3, py: 2 })}>
          Join in the community
        </Caps>
      </Button>
    </Flex>
  )
}

export default Chat
