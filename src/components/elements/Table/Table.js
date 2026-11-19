import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef
} from 'react'
import styled, { css } from 'styled-components'
import { breakpoints, theme } from 'theme'
import { Check as CheckIcon } from 'react-feather'

import FeatherIcon from 'components/icons/Feather'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const TABLE_MIN_WIDTH = '640px'

const tableBase = css`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  :where(th, td) {
    ${theme({
      p: 2,
      textAlign: 'left',
      verticalAlign: 'top',
      fontFamily: 'sans',
      fontSize: [1, 1, 2, 2],
      lineHeight: 3,
      color: 'black80'
    })}
  }

  :where(th:first-child, td:first-child) {
    ${theme({ pl: 0 })}
  }

  :where(th:last-child, td:last-child) {
    ${theme({ pr: 0 })}
  }

  :where(th) {
    ${theme({ color: 'black', fontWeight: 'bold' })}
  }

  thead th {
    ${theme({ borderBottom: 1, borderBottomColor: 'black10' })}
  }

  tbody tr {
    ${theme({ borderBottom: 1, borderBottomColor: 'black05' })}
  }

  tbody tr:last-child {
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
      ${theme({ py: 2 })}
    }

    th,
    td {
      ${theme({ px: 0, py: 1, overflowWrap: 'anywhere' })}
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

const TableScrollBox = styled(Box)`
  ${theme({ width: '100%', overflowX: 'auto' })}
  -webkit-overflow-scrolling: touch;
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

export const TableScroll = ({ children, ...props }) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.querySelectorAll('table').forEach(labelCellsFromHeader)
  })

  return (
    <TableScrollBox ref={ref} {...props}>
      {labelTables(children)}
    </TableScrollBox>
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
