import React from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const ROWS = [
  '/recipes/amazon',
  '/recipes/github',
  '/docs/api/parameters',
  '/blog/compress',
  '/tools/sharing-debugger'
]

const SitemapPreview = () => (
  <Flex
    css={theme({
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      px: 3
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: '260px',
        bg: 'white',
        border: 1,
        borderColor: 'black10',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 2
      })}
    >
      <Flex
        css={theme({
          px: 2,
          py: 1,
          borderBottom: 1,
          borderBottomColor: 'black05',
          justifyContent: 'space-between'
        })}
      >
        <Text
          css={theme({ fontSize: 0, fontWeight: 'bold', color: 'black70' })}
        >
          5 URLs
        </Text>
      </Flex>
      {ROWS.map(path => (
        <Text
          key={path}
          css={theme({
            fontSize: 0,
            fontFamily: 'mono',
            color: 'black60',
            px: 2,
            py: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          {path}
        </Text>
      ))}
    </Box>
  </Flex>
)

export default SitemapPreview
