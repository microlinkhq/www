import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { CodeStep } from './code-block'
import { ACCENT } from '../use-cases'

export const ParamsList = ({ params }) => (
  <Box css={theme({ pt: 2 })}>
    <CodeStep css={theme({ color: ACCENT.text, pb: 2, display: 'block' })}>
      Parameters used
    </CodeStep>
    <Box
      as='ul'
      css={theme({
        listStyle: 'none',
        p: 0,
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      })}
    >
      {params.map(({ name, href, note }) => (
        <Text
          as='li'
          key={name}
          css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}
        >
          <Link
            href={href}
            css={theme({ fontFamily: 'mono', fontWeight: 'bold' })}
          >
            {name}
          </Link>{' '}
          {note}
        </Text>
      ))}
    </Box>
  </Box>
)
