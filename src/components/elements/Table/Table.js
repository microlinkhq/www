import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef
} from 'react'
import styled, { css } from 'styled-components'
import { breakpoints, colors, theme } from 'theme'
import { Check as CheckIcon } from 'react-feather'

import FeatherIcon from 'components/icons/Feather'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

export const HIGHLIGHT_BG = colors.gray0

const TABLE_MIN_WIDTH = '640px'

const tableBase = css`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;

  th,
  td {
    ${theme({
      px: [2, 3, 3, 3],
      py: 3,
      textAlign: 'left',
      verticalAlign: 'top',
      fontFamily: 'sans',
      fontSize: [0, 1, 1, 1],
      lineHeight: 2,
      color: 'black80',
      borderBottom: 1,
      borderBottomColor: 'black10'
    })}
  }

  thead th {
    ${theme({
      bg: 'black05',
      color: 'black',
      fontWeight: 'bold',
      verticalAlign: 'middle'
    })}
  }

  tbody th {
    ${theme({ color: 'black', fontWeight: 'bold' })}
  }

  tbody tr:last-child th,
  tbody tr:last-child td {
    ${theme({ borderBottom: 0 })}
  }

  min-width: ${TABLE_MIN_WIDTH};

  @media (max-width: ${breakpoints[0]}) {
    min-width: 0;

    thead {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }

    tbody,
    tr,
    th,
    td {
      display: block;
    }

    tr {
      ${theme({ py: 2, borderBottom: 1, borderBottomColor: 'black10' })}
    }

    tbody tr:last-child {
      ${theme({ borderBottom: 0 })}
    }

    th,
    td {
      ${theme({ py: 1, borderBottom: 0, overflowWrap: 'anywhere' })}
    }

    tr > :first-child {
      ${theme({ color: 'black', fontWeight: 'bold' })}
    }

    td:not(:first-child)::before {
      content: attr(data-label);
      display: block;
      ${theme({ fontSize: 0, fontWeight: 'bold', color: 'black60' })}
    }
  }
`

export const FeatureTable = styled('table')`
  ${tableBase}
`

export const ProseTable = styled('table')`
  ${tableBase}

  tbody td {
    ${theme({ color: 'black70' })}
  }
`

const SCROLL_SHADOW = 'rgba(16, 24, 40, 0.12)'
const SCROLL_SHADOW_WIDTH = '16px'
const SCROLL_COVER_WIDTH = '48px'

const TableCardBox = styled(Box)`
  ${theme({
    width: '100%',
    overflowX: 'auto',
    borderRadius: 3,
    border: 1,
    borderColor: 'black10',
    boxShadow: 1
  })}
  -webkit-overflow-scrolling: touch;
  background-color: ${colors.white};
  background-image: linear-gradient(to right, ${colors.white}, transparent),
    linear-gradient(to left, ${colors.white}, transparent),
    radial-gradient(farthest-side at 0 50%, ${SCROLL_SHADOW}, transparent),
    radial-gradient(farthest-side at 100% 50%, ${SCROLL_SHADOW}, transparent);
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-size: ${SCROLL_COVER_WIDTH} 100%, ${SCROLL_COVER_WIDTH} 100%,
    ${SCROLL_SHADOW_WIDTH} 100%, ${SCROLL_SHADOW_WIDTH} 100%;
  background-attachment: local, local, scroll, scroll;
`

export const labelCellsFromHeader = table => {
  const headers = [...table.querySelectorAll('thead th')].map(header =>
    header.textContent.trim()
  )
  table.querySelectorAll('tbody tr').forEach(row =>
    [...row.children].forEach((cell, index) => {
      if (cell.tagName === 'TD' && !cell.dataset.label && headers[index]) {
        cell.dataset.label = headers[index]
      }
    })
  )
}

const elementTag = element =>
  typeof element.type === 'string' ? element.type : element.props?.as

const textContent = node => {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textContent).join('')
  if (isValidElement(node)) return textContent(node.props?.children)
  return ''
}

const headersIn = element => {
  const headers = []
  const walk = (node, inHead) => {
    if (!isValidElement(node)) return
    const tag = elementTag(node)
    const head = inHead || tag === 'thead'
    if (head && tag === 'th') headers.push(textContent(node).trim())
    Children.forEach(node.props?.children, child => walk(child, head))
  }
  walk(element, false)
  return headers
}

const labelRows = (node, headers) => {
  if (!isValidElement(node)) return node
  if (elementTag(node) === 'thead') return node

  const cells = Children.toArray(node.props?.children).filter(isValidElement)
  const isRow = cells.some(cell => {
    const tag = elementTag(cell)
    return tag === 'td' || tag === 'th'
  })

  if (isRow) {
    let index = 0
    const children = Children.map(node.props.children, child => {
      if (!isValidElement(child)) return child
      const tag = elementTag(child)
      const column = index
      if (tag === 'td' || tag === 'th') index += 1
      if (tag === 'td' && !child.props['data-label'] && headers[column]) {
        return cloneElement(child, { 'data-label': headers[column] })
      }
      return child
    })
    return cloneElement(node, {}, children)
  }

  const children = Children.map(node.props?.children, child =>
    labelRows(child, headers)
  )
  return cloneElement(node, {}, children)
}

const labelTables = children =>
  Children.map(children, child => {
    if (!isValidElement(child)) return child
    const headers = headersIn(child)
    return headers.length === 0 ? child : labelRows(child, headers)
  })

export const TableCard = ({ children, ...props }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.querySelectorAll('table').forEach(labelCellsFromHeader)
  })

  return (
    <TableCardBox ref={ref} {...props}>
      {labelTables(children)}
    </TableCardBox>
  )
}

export const CellNote = ({ children }) => (
  <Text
    as='div'
    css={theme({
      pt: 1,
      fontSize: 0,
      fontWeight: 'normal',
      color: 'black60',
      lineHeight: 1,
      whiteSpace: 'normal',
      textTransform: 'none'
    })}
  >
    {children}
  </Text>
)

export const Check = () => (
  <FeatherIcon
    icon={CheckIcon}
    size='16px'
    role='img'
    aria-label='Yes'
    css={theme({ mx: 'auto', color: 'secondary' })}
  />
)

export const Cross = () => (
  <Text
    as='span'
    role='img'
    aria-label='No'
    css={theme({
      color: 'black30',
      fontWeight: 'bold',
      fontSize: 'inherit',
      lineHeight: 'inherit'
    })}
  >
    —
  </Text>
)

const renderValue = value => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  return value
}

const ValueBox = styled('span')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textWrap: 'balance'
  })}
  min-height: 1lh;
`

export const CellValue = ({ value }) => (
  <ValueBox>{renderValue(value)}</ValueBox>
)
