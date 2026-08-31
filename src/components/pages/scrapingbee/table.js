import { borders, breakpoints, colors, radii, space, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const CELL_PAD_Y = `calc(${space[2]} + ${radii[1]})`
const CELL_PAD_X = `calc(${space[3]} - ${radii[1]})`

export const HIGHLIGHT_BG = 'rgba(6, 125, 247, 0.03)'

export const FeatureTable = styled('table')`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: auto;
  ${theme({ fontVariantNumeric: 'tabular-nums' })}

  th,
  td {
    padding: ${CELL_PAD_Y} ${CELL_PAD_X};
    ${theme({ textAlign: 'left', fontSize: 0, fontFamily: 'mono' })}
    border-bottom: ${borders[1]} ${colors.black05};
  }

  th {
    ${theme({ color: 'black', fontWeight: 'bold' })}
    text-transform: uppercase;
    white-space: nowrap;
    border-bottom: ${borders[1]} ${colors.black10};
  }

  td {
    ${theme({ color: 'black', verticalAlign: 'top' })}
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }

  tbody tr:hover {
    ${theme({ bg: 'black05' })}
  }

  @media (max-width: ${breakpoints[0]}) {
    th,
    td {
      padding: ${space[2]} ${CELL_PAD_Y};
      white-space: normal;
      word-break: break-word;
    }
  }
`

export const TableCard = ({ children }) => (
  <Box
    css={theme({
      width: '100%',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: 4,
      border: 1,
      borderColor: 'black10',
      boxShadow: 1,
      bg: 'white'
    })}
  >
    {children}
  </Box>
)

const NOTE_FONT_SIZE = '11px'

export const CellNote = ({ children }) => (
  <Text
    as='div'
    css={theme({
      pt: 1,
      fontSize: NOTE_FONT_SIZE,
      fontWeight: 'normal',
      color: 'black40',
      lineHeight: 1,
      whiteSpace: 'normal'
    })}
  >
    {children}
  </Text>
)

const Glyph = ({ color, label, opacity, children }) => (
  <Text
    as='span'
    role='img'
    aria-label={label}
    css={theme({
      display: 'block',
      textAlign: 'center',
      fontFamily: 'mono',
      fontSize: 1,
      color,
      ...(opacity ? { opacity } : null)
    })}
  >
    {children}
  </Text>
)

export const Check = () => (
  <Glyph color='green7' label='Yes'>
    ✓
  </Glyph>
)

export const Cross = () => (
  <Glyph color='red5' label='No' opacity={0.7}>
    ✕
  </Glyph>
)

export const CellValue = ({ value }) => {
  if (value === true) return <Check />
  if (value === false) return <Cross />
  return (
    <Text
      as='span'
      css={theme({
        display: 'block',
        textAlign: 'center',
        fontFamily: 'mono',
        fontSize: 0,
        color: 'black70',
        whiteSpace: 'normal'
      })}
    >
      {value}
    </Text>
  )
}
