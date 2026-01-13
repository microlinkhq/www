import { colors, transition, lineHeights, theme } from 'theme'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import { withLink } from 'helpers/hoc/with-link'
import styled, { css } from 'styled-components'
import Text from '../Text'

export const linkStyle = css`
  cursor: pointer;
  text-decoration: none;
  transition: color ${transition.medium};
  line-height: ${lineHeights[2]};
`

export const LinkBase = withAnalytics(
  withLink(styled(Text).attrs({ as: 'span' })`
    ${linkStyle};
    ${theme({
      color: 'link',
      fontSize: 'inherit',
      _hover: {
        color: colors.hoverLink
      }
    })}
  `)
)
