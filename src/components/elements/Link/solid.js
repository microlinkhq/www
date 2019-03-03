import React from 'react'
import styled, { css } from 'styled-components'
import { colors, transition } from 'theme'
import { createCssState } from 'helpers/style'

import Box from '../Box'
import Link from './base'

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    border-color: currentColor;
    color: ${colors.black80};
  `
})

const style = css`
  text-decoration: none;
  outline: 0;
  opacity: 0.75;
  display: inline-block;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  transition: border-color ${transition.short};
`

const LinkSolid = styled(Link)`
  ${style};
  ${hoverStyle}
`

LinkSolid.defaultProps = {
  ...Link.defaultProps,
  fontWeight: 'bold',
  color: 'black80',
  pb: '2px'
}

export default ({ fontWeight, href, children, color, ...props }) => (
  <Box display='inline'>
    <LinkSolid
      {...props}
      color={color}
      href={href}
      children={children}
      fontWeight={fontWeight}
    />
  </Box>
)
