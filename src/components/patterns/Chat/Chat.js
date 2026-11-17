import React from 'react'

import { Button } from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import { theme } from 'theme'

const Chat = ({ text = 'Join the community' }) => {
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
        {text}
      </Button>
    </Flex>
  )
}

export default Chat
