import styled from 'styled-components'
import React, { useContext } from 'react'
import { colors, theme, fontWeights } from 'theme'
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
  const { isBlogPage, isGuidesPage } = useContext(MarkdownContext)
  return (
    <StyledTable
      as='table'
      css={theme({
        mx: isBlogPage ? 'auto' : undefined,
        fontSize: isGuidesPage ? '18px' : undefined
      })}
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

export const Th = props => {
  const { isGuidesPage } = useContext(MarkdownContext)
  return (
    <StyledTh
      as='th'
      css={isGuidesPage ? theme({ fontSize: [1, 1, '20px'] }) : undefined}
      {...props}
    />
  )
}

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
    white-space: nowrap;
  }
`

export const Td = props => {
  const { isGuidesPage } = useContext(MarkdownContext)
  return (
    <StyledTd
      as='td'
      css={isGuidesPage ? theme({ fontSize: [1, 1, '18px'] }) : undefined}
      {...props}
    />
  )
}
