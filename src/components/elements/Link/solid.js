import React from 'react'
import styled from 'styled-components'
import Box from '../Box'
import Link from './base'

import { transition, lineHeights } from 'theme'

const LinkSolid = styled(Link)`
  text-decoration: none;
  outline: 0;
  opacity: 0.75;
  display: inline-block;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  line-height: ${lineHeights[2]};
  transition: border-color ${transition.short};

  &:hover {
    border-color: currentColor;
  }
`

LinkSolid.defaultProps = {
  ...Link.defaultProps,
  fontWeight: 'bold',
  color: 'black80',
  pb: '2px'
}

export default ({ fontWeight, href, children, color, ...props }) => (
  <Box {...props}>
    <LinkSolid
      color={color}
      href={href}
      children={children}
      fontWeight={fontWeight}
    />
  </Box>
)
