import { colors, transition, lineHeights, theme } from 'theme'
import styled, { css } from 'styled-components'
import React from 'react'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import { withLink } from 'helpers/hoc/with-link'

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

const LinkComponent = props => <StyledLink as='span' {...props} />

export const Link = withAnalytics(withLink(LinkComponent))
export default LinkComponent
