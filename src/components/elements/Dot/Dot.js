import React from 'react'
import styled from 'styled-components'

import Text from '../Text'

const DotIcon = styled(Text)`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
`

DotIcon.defaultProps = {
  as: 'span'
}

const createDot = dotProps => props => <DotIcon {...dotProps} {...props} />

const Success = createDot({ bg: 'teal3' })
const Error = createDot({ bg: 'red6' })
const Warning = createDot({ bg: 'yellow6' })

const Dot = createDot()

Dot.Success = Success
Dot.Error = Error
Dot.Warning = Warning

export default Dot
