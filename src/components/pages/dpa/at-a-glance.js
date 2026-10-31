import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { BLOCK_STYLE } from './shared'

const ROWS = [
  {
    term: 'Who signs',
    description: 'Microlink Labs, S.L. (Spain, EU).'
  },
  {
    term: 'Role',
    description:
      'Microlink is the processor. You, the customer, are the controller.'
  },
  {
    term: 'What we process',
    description: (
      <>
        The URLs and request parameters you send, the publicly accessible pages
        we fetch, and the outputs we return (screenshots, PDFs, metadata). We
        only fetch publicly accessible pages: we don’t log in or bypass access
        controls. For the dashboard, your account data (email).
      </>
    )
  },
  {
    term: 'Retention',
    description: (
      <>
        Cached responses: 24&nbsp;hours by default, configurable with{' '}
        <Link href='/docs/api/parameters/ttl'>ttl</Link> up to 31&nbsp;days.
        Operational logs: 15&nbsp;days. Deletion within 15&nbsp;days of
        termination.
      </>
    )
  },
  {
    term: 'International transfers',
    description:
      'EU Standard Contractual Clauses (Commission Decision 2021/914), the UK International Data Transfer Addendum and the Swiss FADP amendments are available.'
  },
  {
    term: 'Subprocessors',
    description: (
      <>
        The current list is at{' '}
        <Link href='/subprocessors'>microlink.io/subprocessors</Link>.
      </>
    )
  }
]

const AtAGlance = () => (
  <Box
    as='section'
    id='at-a-glance'
    aria-labelledby='at-a-glance-title'
    css={theme({
      ...BLOCK_STYLE,
      mt: 5,
      p: [3, 3, 4, 4],
      bg: 'gray0',
      border: 1,
      borderColor: 'black10',
      borderRadius: 4
    })}
  >
    <Text
      as='h2'
      id='at-a-glance-title'
      css={theme({ fontWeight: 'bold', m: 0 })}
    >
      At a glance
    </Text>
    <Box as='dl' css={theme({ m: 0, pt: 2 })}>
      {ROWS.map(({ term, description }) => (
        <Box
          key={term}
          css={theme({
            py: 3,
            borderBottom: 1,
            borderBottomColor: 'black05',
            '&:last-child': { borderBottom: 0, pb: 0 }
          })}
        >
          <Text as='dt' css={theme({ fontWeight: 'bold', color: 'black' })}>
            {term}
          </Text>
          <Text as='dd' css={theme({ m: 0, pt: 1, color: 'black80' })}>
            {description}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
)

export default AtAGlance
