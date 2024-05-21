import { colors, transition, lineHeights, theme } from 'theme'
import styled, { css } from 'styled-components'
import React from 'react'

import Text from '../Text'

const style = css`
  cursor: pointer;
  text-decoration: none;
  outline: 0;
  transition: color ${transition.medium};
  line-height: ${lineHeights[2]};
`

export const LinkBase = styled(Text)`
  ${style};
`

const StyledLink = styled(LinkBase)`
  ${theme({
    color: 'link',
    fontSize: 'inherit',
    _hover: {
      color: colors.hoverLink
    }
  })}
`

const Link = props => <StyledLink as='span' {...props} />

export default Link
