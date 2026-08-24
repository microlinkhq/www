import React from 'react'
import styled from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Text from 'components/elements/Text'

import { Subhead, Caption } from 'components/patterns/ProductStory'

import { COMPARISON, ACCENT, TILE_BG } from './shared'

const ComparisonTable = styled(Text)`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    ${theme({ p: 3, textAlign: 'left', verticalAlign: 'top' })}
  }

  th:first-child,
  td:first-child {
    ${theme({ pl: 0 })}
  }

  thead th {
    ${theme({
      fontFamily: 'sans',
      fontSize: 2,
      fontWeight: 'bold',
      color: 'black',
      borderBottom: 1,
      borderBottomColor: 'black10',
      whiteSpace: 'nowrap'
    })}
  }

  tbody tr {
    ${theme({ borderBottom: 1, borderBottomColor: 'black05' })}
  }

  tbody tr:last-child {
    ${theme({ borderBottom: 0 })}
  }

  tbody th {
    ${theme({
      fontFamily: 'sans',
      fontSize: 1,
      fontWeight: 'bold',
      color: 'black'
    })}
  }
`

const DIMENSION_LABEL = {
  fontFamily: 'sans',
  fontSize: 0,
  fontWeight: 'bold',
  letterSpacing: 2,
  color: 'black50',
  pb: 2
}

const VALUE_LABEL = {
  fontFamily: 'sans',
  fontSize: 0,
  fontWeight: 'bold',
  color: 'black50',
  pb: 1
}

const VALUE_TEXT = {
  fontFamily: 'sans',
  fontSize: 1,
  lineHeight: 2,
  color: 'black80'
}

const VALUE_TEXT_STRONG = { ...VALUE_TEXT, color: 'black' }

const MicrolinkCell = styled(Box)`
  ${theme({ bg: TILE_BG, borderRadius: 2, p: 3 })}
`

const RowCard = ({ row }) => (
  <Box
    as='li'
    css={theme({ borderBottom: 1, borderBottomColor: 'black05', py: 3 })}
  >
    <Text as='div' css={theme(DIMENSION_LABEL)}>
      {row.dimension}
    </Text>
    <Box css={theme({ pb: 3 })}>
      <Text as='div' css={theme(VALUE_LABEL)}>
        {COMPARISON.columns.browserbase}
      </Text>
      <Text as='div' css={theme(VALUE_TEXT)}>
        {row.browserbase}
      </Text>
    </Box>
    <MicrolinkCell>
      <Text
        as='div'
        css={theme({
          fontFamily: 'sans',
          fontSize: 0,
          fontWeight: 'bold',
          color: ACCENT,
          pb: 1
        })}
      >
        {COMPARISON.columns.microlink}
      </Text>
      <Text as='div' css={theme(VALUE_TEXT_STRONG)}>
        {row.microlink}
      </Text>
    </MicrolinkCell>
  </Box>
)

export const Comparison = () => (
  <Container
    as='section'
    id='comparison'
    css={theme({
      width: '100%',
      maxWidth: '100%',
      px: 3,
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Box
      css={theme({ maxWidth: layout.large, mx: 'auto', textAlign: 'center' })}
    >
      <Subhead variant='gradient'>{COMPARISON.title}</Subhead>
      <Caption
        forwardedAs='p'
        css={theme({ mx: 'auto', pt: [3, 3, 4, 4], maxWidth: layout.normal })}
      >
        {COMPARISON.caption}
      </Caption>
    </Box>

    <Box
      css={theme({
        maxWidth: layout.large,
        mx: 'auto',
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      <Box
        as='ul'
        css={theme({
          listStyle: 'none',
          p: 0,
          m: 0,
          display: ['block', 'block', 'none', 'none']
        })}
      >
        {COMPARISON.rows.map(row => (
          <RowCard key={row.dimension} row={row} />
        ))}
      </Box>

      <Box
        css={theme({
          display: ['none', 'none', 'block', 'block'],
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        })}
      >
        <ComparisonTable as='table'>
          <thead>
            <tr>
              <Text as='th' scope='col'>
                Capability
              </Text>
              <Text as='th' scope='col'>
                {COMPARISON.columns.browserbase}
              </Text>
              <Text as='th' scope='col' css={theme({ color: ACCENT })}>
                {COMPARISON.columns.microlink}
              </Text>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.rows.map(row => (
              <tr key={row.dimension}>
                <Text as='th' scope='row' css={theme({ whiteSpace: 'nowrap' })}>
                  {row.dimension}
                </Text>
                <Text as='td' css={theme(VALUE_TEXT)}>
                  {row.browserbase}
                </Text>
                <Text as='td' css={theme(VALUE_TEXT_STRONG)}>
                  {row.microlink}
                </Text>
              </tr>
            ))}
          </tbody>
        </ComparisonTable>
      </Box>

      <Text
        as='p'
        css={theme({
          fontFamily: 'sans',
          fontSize: 0,
          lineHeight: 2,
          color: 'black50',
          pt: [3, 3, 4, 4],
          maxWidth: layout.normal
        })}
      >
        {COMPARISON.footnote}
      </Text>
    </Box>
  </Container>
)
