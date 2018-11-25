import React from 'react'
import styled from 'styled-components'
import { system } from 'helpers'
import Box from '../Box'
import LinkBase from './base'

import { transition, lineHeights } from 'theme'

export const Link = system({ extend: LinkBase })

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

Link.defaultProps = {
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
