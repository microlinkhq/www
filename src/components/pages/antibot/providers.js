import { SECTION_VERTICAL_SPACING, layout, shadows, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import {
  BodyText,
  Eyebrow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { PROVIDERS } from './shared'

const TableWrap = styled(Box)`
  overflow-x: auto;
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3
  })}
  box-shadow: ${shadows[1]};
`

const Table = styled('table')`
  border-collapse: collapse;
  width: 100%;
  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    color: 'black70',
    textAlign: 'left'
  })}

  th,
  td {
    ${theme({
      px: 3,
      py: 2,
      borderBottom: 1,
      borderBottomColor: 'black05',
      textAlign: 'left'
    })}
    white-space: nowrap;
  }

  th {
    ${theme({
      color: 'black',
      fontFamily: 'mono',
      fontSize: 0,
      fontWeight: 'bold',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    })}
  }

  td:first-child {
    ${theme({
      color: 'black',
      fontWeight: 'bold'
    })}
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`

const SignalCount = styled(Text).attrs({ as: 'span' })`
  font-variant-numeric: tabular-nums;
  ${theme({ fontFamily: 'mono' })}
`

const MethodChip = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    bg: 'gray0',
    color: 'black70',
    border: 1,
    borderColor: 'black05',
    borderRadius: 2,
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: 1
  })}
`

export const Providers = () => (
  <Section id='providers' css={theme({ py: SECTION_VERTICAL_SPACING })}>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow css={theme({ pb: 2, display: 'block' })}>Coverage</Eyebrow>
        <Subhead css={theme({ textAlign: 'left' })}>
          30+ providers detected out of the box
        </Subhead>
        <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
          Detection covers antibot systems, CAPTCHA vendors, and
          platform-specific protection flows. Use this table as a coverage map
          when building retry logic, escalation rules, or provider-specific
          analytics in your scraping pipeline.
        </BodyText>
      </Box>

      <TableWrap>
        <Table>
          <thead>
            <tr>
              <th scope='col'>Provider</th>
              <th scope='col'>Category</th>
              <th scope='col'>Signals</th>
              <th scope='col'>Detection methods</th>
            </tr>
          </thead>
          <tbody>
            {PROVIDERS.map(({ name, category, methods }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{category}</td>
                <td>
                  <SignalCount>{methods.length}</SignalCount>
                </td>
                <td>
                  <Flex css={theme({ gap: 2, flexWrap: 'wrap' })}>
                    {methods.map(method => (
                      <MethodChip key={method}>{method}</MethodChip>
                    ))}
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>

      <BodyText css={theme({ pt: [3, 3, 4, 4] })}>
        Missing a provider or a signal?{' '}
        <Link href='https://github.com/microlinkhq/is-antibot/issues/new?title=Request%20a%20provider'>
          Report it
        </Link>{' '}
        and coverage keeps evolving.
      </BodyText>
    </SectionInner>
  </Section>
)
