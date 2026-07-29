import { theme } from 'theme'
import styled from 'styled-components'

import Text from 'components/elements/Text'

export const Eyebrow = styled(Text)`
  ${theme({
    color: 'secondary',
    fontFamily: 'mono',
    fontSize: 1,
    fontWeight: 'bold',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    display: 'block',
    pb: 2
  })}
`
