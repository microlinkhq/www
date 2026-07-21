import React from 'react'
import { theme, layout } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

import { getTitle, getHostname, getImageUrl } from './utils'

export const XPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const hostname = getHostname(metadata)

  return (
    <Box css={theme({ maxWidth: ['100%', layout.small] })}>
      <Box
        css={theme({
          border: 1,
          borderRadius: '12px',
          overflow: 'hidden',
          bg: 'white',
          borderColor: 'black10',
          position: 'relative'
        })}
      >
        <Image
          src={getImageUrl(metadata)}
          alt={title}
          css={theme({
            width: '100%',
            height: ['200px', '325px'],
            display: 'block',
            objectFit: 'scale-down'
          })}
        />
        <Box
          css={theme({
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            px: '8px',
            bg: 'rgba(0, 0, 0, 0.77)',
            borderRadius: '4px',
            maxWidth: 'calc(100% - 24px)'
          })}
        >
          <Text
            css={theme({
              color: 'white',
              fontSize: '13px',
              fontFamily: 'sans',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 'regular'
            })}
          >
            {title}
          </Text>
        </Box>
      </Box>
      <Text
        css={theme({
          fontSize: '13px',
          color: 'black40',
          mt: 2,
          fontFamily: 'sans'
        })}
      >
        {hostname ? `From ${hostname}` : 'No URL found'}
      </Text>
    </Box>
  )
}
