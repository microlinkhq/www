import styled from 'styled-components'

import Flex from 'components/elements/Flex'
import { space, theme } from 'theme'

export const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'secondary',
    bg: 'pinkest'
  })}
`
