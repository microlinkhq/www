import { theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Eyebrow, FeatureSection } from 'components/patterns/FeatureStory'

import { PROVIDERS, PROVIDERS_COVERED } from './providers-data'

const ProvidersTable = styled(Text)`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    ${theme({ p: 2, textAlign: 'left', verticalAlign: 'top' })}
  }

  th:first-child,
  td:first-child {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  thead th {
    ${theme({
      fontWeight: 'bold',
      color: 'black',
      borderBottom: 1,
      borderBottomColor: 'black10',
      fontFamily: 'sans',
      fontSize: 1,
      whiteSpace: 'nowrap'
    })}
  }

  tbody tr {
    ${theme({ borderBottom: 1, borderBottomColor: 'black05' })}
  }

  tbody tr:last-child {
    border-bottom: none;
  }
`

const METHOD_CHIP_STYLE = theme({
  display: 'inline-block',
  fontFamily: 'mono',
  fontSize: 0,
  color: 'secondary',
  bg: 'pinky',
  px: 2,
  py: 1,
  borderRadius: 2,
  whiteSpace: 'nowrap'
})

const METHOD_CHIPS_STYLE = theme({ gap: 2, flexWrap: 'wrap' })

const PROVIDER_META_STYLE = theme({
  fontFamily: 'sans',
  fontSize: 1,
  color: 'black80',
  lineHeight: 2,
  pb: 2
})

const SIGNAL_COUNT_STYLE = theme({
  fontFamily: 'mono',
  fontVariantNumeric: 'tabular-nums'
})

const MethodChips = ({ methods }) => (
  <Flex css={METHOD_CHIPS_STYLE}>
    {methods.map(method => (
      <Text as='span' key={method} css={METHOD_CHIP_STYLE}>
        {method}
      </Text>
    ))}
  </Flex>
)

const ProviderMeta = ({ category, methods }) => (
  <Text css={PROVIDER_META_STYLE}>
    {category}
    {' · '}
    <Text as='span' css={SIGNAL_COUNT_STYLE}>
      {methods.length} signal{methods.length === 1 ? '' : 's'}
    </Text>
  </Text>
)

const ProviderCard = ({ row }) => (
  <Box
    as='li'
    css={theme({
      borderBottom: 1,
      borderBottomColor: 'black05',
      py: 3
    })}
  >
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: 1,
        fontWeight: 'bold',
        color: 'black',
        pb: 1
      })}
    >
      {row.name}
    </Text>
    <ProviderMeta category={row.category} methods={row.methods} />
    <MethodChips methods={row.methods} />
  </Box>
)

export const Providers = () => (
  <FeatureSection id='providers'>
    <Eyebrow css={theme({ pb: 2, display: 'block' })}>Providers</Eyebrow>
    <Subhead css={theme({ textAlign: 'left', pb: [3, 3, 4, 4] })}>
      {PROVIDERS_COVERED} providers across antibot, CAPTCHA, and platforms.
    </Subhead>
    <Text
      css={theme({
        fontFamily: 'sans',
        fontSize: 2,
        lineHeight: 2,
        color: 'black',
        pb: [3, 3, 4, 4],
        maxWidth: '42rem'
      })}
    >
      Use this coverage map when building retry logic, escalation rules, or
      provider-specific analytics in your scraping pipeline.
    </Text>

    <Box
      as='ul'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: ['block', 'block', 'none', 'none']
      })}
    >
      {PROVIDERS.map(row => (
        <ProviderCard key={row.name} row={row} />
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
      <ProvidersTable as='table'>
        <thead>
          <tr>
            <Text as='th'>Provider</Text>
            <Text as='th'>Category</Text>
            <Text as='th'>Signals</Text>
            <Text as='th'>Detection methods</Text>
          </tr>
        </thead>
        <tbody>
          {PROVIDERS.map(row => (
            <tr key={row.name}>
              <Text
                as='td'
                css={theme({
                  fontFamily: 'sans',
                  fontSize: 1,
                  fontWeight: 'bold',
                  color: 'black',
                  whiteSpace: 'nowrap'
                })}
              >
                {row.name}
              </Text>
              <Text
                as='td'
                css={theme({
                  fontFamily: 'sans',
                  fontSize: 1,
                  color: 'black80',
                  whiteSpace: 'nowrap'
                })}
              >
                {row.category}
              </Text>
              <Text
                as='td'
                css={theme({
                  fontFamily: 'mono',
                  fontSize: 1,
                  color: 'black80',
                  fontVariantNumeric: 'tabular-nums'
                })}
              >
                {row.methods.length}
              </Text>
              <Box as='td' css={theme({ fontSize: 1 })}>
                <MethodChips methods={row.methods} />
              </Box>
            </tr>
          ))}
        </tbody>
      </ProvidersTable>
    </Box>
  </FeatureSection>
)
