import { colors, transition, lineHeights, theme } from 'theme'
import styled, { css } from 'styled-components'

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

const Link = styled(LinkBase)`
  ${theme({
    color: 'link',
    _hover: {
      color: colors.hoverLink
    }
  })}
`

Link.defaultProps = {
  as: 'span'
}

export default Link
