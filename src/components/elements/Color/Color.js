import React from 'react'
import styled from 'styled-components'
import Text from '../Text'

const Color = styled(Text)``

Color.defaultProps = {
  as: 'span',
  border: 1,
  borderColor: 'gray7',
  borderRadius: '3px',
  display: 'inline-block',
  width: '13px',
  height: '13px',
  mb: '-1px',
  mr: '2px'
}

export default ({ children, ...props }) => (
  <>
    <Color style={{ background: children }} {...props} />
    {children}
  </>
)
