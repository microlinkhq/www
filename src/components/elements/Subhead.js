import { createElement } from 'react'
import styled from 'styled-components'
import { title } from 'helpers'

import Heading from './Heading'

const Subhead = styled(Heading)``

Subhead.defaultProps = {
  as: 'h3',
  lineHeight: 1,
  fontWeight: 'regular',
  variant: null,
  fontSize: [4, 5],
  color: 'black'
}

export default ({ children, titleExclude, ...props }) =>
  createElement(Subhead, {
    children:
      typeof children === 'string' ? title(children, titleExclude) : children,
    ...props
  })
