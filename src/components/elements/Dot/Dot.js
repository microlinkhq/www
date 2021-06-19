import { createElement } from 'react'
import styled from 'styled-components'

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

const DotSuccess = props => createElement(Dot, { bg: 'teal3', ...props })
const DotError = props => createElement(Dot, { bg: 'red6', ...props })
const DotWarning = props => createElement(Dot, { bg: 'yellow6', ...props })

Dot.Success = DotSuccess
Dot.Error = DotError
Dot.Warning = DotWarning

export default Dot
