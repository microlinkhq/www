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

const Success = createDot({ bg: '#50E3C2' })
const Error = createDot({ bg: '#FF0000' })
const Warning = createDot({ bg: '#F5A623' })

const Dot = createDot()

Dot.Success = Success
Dot.Error = Error
Dot.Warning = Warning

export default Dot
