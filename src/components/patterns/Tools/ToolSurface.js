import styled from 'styled-components'
import { theme } from 'theme'
import Box from 'components/elements/Box'

export const ToolSurface = styled(Box)`
  ${theme({
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'black0125',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    boxShadow: 2
  })}
`

export const ToolSheet = styled(ToolSurface)`
  ${theme({ display: 'flex', flexDirection: 'column' })}
`
