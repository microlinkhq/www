import styled from 'styled-components'

import Flex from 'components/elements/Flex'
import { space, theme } from 'theme'

export const TILE_TITLE_FONT_SIZE = [2, 2, '18px', '18px']
export const TILE_DESCRIPTION_FONT_SIZE = [1, 1, '15px', '15px']

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
