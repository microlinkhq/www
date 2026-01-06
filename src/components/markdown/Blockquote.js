import styled from 'styled-components'
import { useContext } from 'react'
import { space, colors, theme } from 'theme'
import { layout } from '../../theme'
import { MarkdownContext } from './Context'

const StyledBlockquote = styled.blockquote`
  max-width: ${layout.small};
  border-left: 3px solid ${colors.black};
  padding-left: ${space[3]};
  font-style: italic;
  color: ${colors.gray8};
`

export const Blockquote = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledBlockquote
      css={theme({ margin: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}
