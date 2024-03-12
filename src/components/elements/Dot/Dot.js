import styled from 'styled-components'
import { colors } from 'theme'
import React from 'react'

import Text from '../Text'

const Dot = styled(Text)`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
`

Dot.defaultProps = {
  as: 'span'
}

const createDot = color => {
  const ColoredDot = props => (
    <Dot
      css={{
        background: color,
        boxShadow: `0 0 12px 0 ${color}`
      }}
      {...props}
    />
  )

  return ColoredDot
}

const DotSuccess = createDot(colors.teal3)
const DotError = createDot(colors.red6)
const DotWarning = createDot(colors.yellow6)

Dot.Success = DotSuccess
Dot.Error = DotError
Dot.Warning = DotWarning

export default Dot
