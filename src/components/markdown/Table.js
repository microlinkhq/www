import styled from 'styled-components'
import React, { useContext } from 'react'
import { colors, theme, fonts, fontWeights } from 'theme'
import { layout } from '../../theme'
import { MarkdownContext } from './Context'
import { withContainer } from 'helpers/hoc/with-container'
import Text from 'components/elements/Text'

const { CONTAINER_SPACE } = withContainer

const StyledTable = styled(Text)`
  max-width: ${layout.small};
  width: 100%;
  border-collapse: collapse;

  ${theme({
    ...CONTAINER_SPACE,
    my: 4
  })}
`

export const Table = props => {
  const { isBlogPage } = useContext(MarkdownContext)
  return (
    <StyledTable
      as='table'
      css={theme({ mx: isBlogPage ? 'auto' : undefined })}
      {...props}
    />
  )
}

const StyledThead = styled.thead``

export const Thead = props => <StyledThead {...props} />

const StyledTbody = styled.tbody``

export const Tbody = props => <StyledTbody {...props} />

const StyledTr = styled.tr`
  border-bottom: 1px solid ${colors.black05};

  tbody &:last-child {
    border-bottom: none;
  }
`

export const Tr = props => <StyledTr {...props} />

const StyledTh = styled(Text)`
  text-align: left;
  font-weight: ${fontWeights.bold};
  color: ${colors.black};
  border-bottom: 1px solid ${colors.black10};

  ${theme({ p: 2 })}

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`

export const Th = props => <StyledTh as='th' {...props} />

const StyledTd = styled(Text)`
  color: ${colors.black80};
  vertical-align: top;

  ${theme({ p: 2 })}

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  code {
    font-family: ${fonts.mono};
    font-weight: ${fontWeights.normal};
    font-size: 0.9em;
    color: ${colors.secondary};
    text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;

    &::before,
    &::after {
      content: '\`';
    }
  }
`

export const Td = props => <StyledTd as='td' {...props} />
