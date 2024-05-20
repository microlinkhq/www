import styled from 'styled-components'
import { theme } from 'theme'
import Text from '../Text'
import React from 'react'

const Colored = styled(Text)(
  theme({
    border: 1,
    borderColor: 'gray7',
    borderRadius: '3px',
    display: 'inline-block',
    width: '13px',
    height: '13px',
    mb: '-1px',
    mr: '2px'
  })
)

const Color = ({ children, ...props }) => (
  <>
    <Colored as='span' style={{ background: children }} {...props} />
    {children}
  </>
)

export default Color
