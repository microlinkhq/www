import React from 'react'
import { theme, layout } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

import { getTitle, getHostname, getImageUrl } from './utils'

export const LinkedInPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const hostname = getHostname(metadata)

  return (
    <Box
      css={theme({
        border: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        borderColor: 'black10',
        maxWidth: ['100%', layout.small],
        mx: 'auto',
        px: [2, 0]
      })}
    >
      <Box css={theme({ height: ['200px', '310px'], bg: 'white' })}>
        <Image
          src={getImageUrl(metadata)}
          alt={title}
          css={theme({
            width: '100%',
            height: '100%',
            objectFit: 'scale-down',
            display: 'block'
          })}
        />
      </Box>
      <Box css={theme({ p: 3, bg: 'white' })}>
        <Text
          css={theme({
            fontWeight: 'bold',
            fontSize: '14px',
            color: 'black',
            mb: '4px',
            fontFamily: 'sans',
            overflow: 'hidden'
          })}
        >
          {title}
        </Text>
        <Text
          css={theme({
            color: 'black60',
            fontSize: '12px',
            fontFamily: 'sans'
          })}
        >
          {hostname || 'No domain found'}
        </Text>
      </Box>
    </Box>
  )
}
