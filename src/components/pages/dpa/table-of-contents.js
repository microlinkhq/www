import { slug } from 'github-slugger'
import { theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { BLOCK_STYLE, LEGAL_SECTIONS } from './shared'

const TableOfContents = () => (
  <Box
    as='nav'
    aria-labelledby='dpa-contents-title'
    css={theme({ ...BLOCK_STYLE, mb: 4 })}
  >
    <Text
      as='h2'
      id='dpa-contents-title'
      css={theme({ fontWeight: 'bold', m: 0 })}
    >
      Contents
    </Text>
    <Box
      as='ol'
      css={theme({
        listStyle: 'none',
        m: 0,
        p: 0,
        pt: 2,
        columns: [1, 2, 2, 2],
        columnGap: 4
      })}
    >
      {LEGAL_SECTIONS.map(title => (
        <Text as='li' key={title} css={theme({ py: 1, breakInside: 'avoid' })}>
          <Link href={`#${slug(title)}`} externalIcon={false}>
            {title}
          </Link>
        </Text>
      ))}
    </Box>
  </Box>
)

export default TableOfContents
