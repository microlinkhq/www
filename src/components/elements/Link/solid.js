import React from 'react'
import styled from 'styled-components'
import system from 'system-components'
import { Link as LinkBase } from 'rebass'
import Box from '../Box'

import { transition, lineHeights } from 'theme'

const Link = system({ is: LinkBase }, 'fontWeight')

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

export default ({ fontWeight, href, children, ...props }) => (
  <Box {...props}>
    <LinkSolid href={href} children={children} fontWeight={fontWeight} />
  </Box>
)
