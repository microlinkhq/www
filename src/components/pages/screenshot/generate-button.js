import styled from 'styled-components'
import { theme } from 'theme'

import { Button } from 'components/elements/Button/Button'

const GENERATE_BUTTON_MAX_WIDTH = '420px'

export const GenerateButton = styled(Button).attrs({ variant: 'secondary' })`
  ${theme({
    width: '100%',
    maxWidth: GENERATE_BUTTON_MAX_WIDTH,
    mx: 'auto'
  })}
`
