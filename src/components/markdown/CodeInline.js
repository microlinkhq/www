import React from 'react'
import styled, { css } from 'styled-components'
import { wordBreak } from 'helpers/style'
import Text from 'components/elements/Text'

const codeStyle = css`
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  font-size: 0.9rem;
  text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
`

export const StyledCodeInline = styled(Text)`
  ${codeStyle};
  ${wordBreak};
  display: inline;
  padding: 0 4px;

  &::before,
  &::after {
    content: '\`';
  }
`

export const CodeInline = props => <StyledCodeInline as='code' {...props} />
