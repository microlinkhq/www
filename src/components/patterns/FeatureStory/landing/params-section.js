import { theme, shadows } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Subhead from 'components/elements/Subhead'

import ArrowLink from 'components/patterns/ArrowLink'

import { ACCENT } from '../features'
import { Eyebrow } from '../primitives'
import { FeatureSection } from './shell'

const Table = styled('table')`
  width: 100%;
  border-collapse: collapse;
  ${theme({ fontSize: 1 })}

  th,
  td {
    ${theme({
      textAlign: 'left',
      py: 3,
      px: 3,
      borderBottom: 1,
      borderBottomColor: 'black10',
      verticalAlign: 'top'
    })}
  }

  th {
    ${theme({
      fontFamily: 'mono',
      fontSize: 0,
      fontWeight: 'bold',
      color: 'black60',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      bg: 'black025'
    })}
  }

  td {
    ${theme({ color: 'black80', lineHeight: 2 })}
  }

  code {
    ${theme({
      fontFamily: 'mono',
      fontSize: 0,
      color: 'secondary',
      bg: ACCENT.bgSoft,
      px: 2,
      py: 1,
      borderRadius: 2
    })}
  }
`

export const ParamsSection = ({ rows, docsHref }) => (
  <FeatureSection id='parameters'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>Parameters</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      What you can pass.
    </Subhead>
    <Box
      css={theme({
        overflowX: 'auto',
        border: 1,
        borderColor: 'black10',
        borderRadius: 3,
        bg: 'white'
      })}
      style={{ boxShadow: shadows[0] }}
    >
      <Table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
            <th>Required</th>
            <th>Plan</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.name}>
              <td>
                <code>{row.name}</code>
              </td>
              <td>{row.type}</td>
              <td>{row.description}</td>
              <td>{row.required ? 'Yes' : 'No'}</td>
              <td>{row.plan}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
    {docsHref && (
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href={docsHref}
          css={theme({ color: 'link', fontWeight: 'bold', fontSize: 1 })}
        >
          See all parameters in the API docs →
        </ArrowLink>
      </Box>
    )}
  </FeatureSection>
)
