import { colors, transition, lineHeights, theme } from 'theme'
import styled, { css } from 'styled-components'
import { createCssState } from 'helpers/style'

import Text from '../Text'

const style = css`
  cursor: pointer;
  text-decoration: none;
  outline: 0;
  transition: color ${transition.medium};
  line-height: ${lineHeights[2]};
`

const hoverStyle = createCssState({
  selector: '&:hover:not([disabled])',
  state: 'hover',
  css: css`
    color: ${colors.hoverLink};
  `
})

export const LinkBase = styled(Text)`
  ${style};
`

const Link = styled(LinkBase)`
  ${hoverStyle};
  ${theme({ color: 'link' })}
`

Link.defaultProps = {
  as: 'span'
}

export default Link
