import React from 'react'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import Text from 'components/elements/Text'

const codeStyle = css`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: 0.98rem;
  text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
  letter-spacing: ${({ theme }) => theme.letterSpacings[2]};
  color: ${({ theme }) => theme.colors.secondary};
`

const StyledCodeInline = styled(Text)`
  ${codeStyle};
  ${wordBreak};
  display: inline;
  padding: 0 4px;
`

export const CodeInline = props => <StyledCodeInline as='code' {...props} />
