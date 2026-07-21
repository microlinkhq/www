import React from 'react'
import { theme, layout } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import { getTitle, getHostname, getImageUrl } from './utils'

export const FacebookPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const hostname = getHostname(metadata)

  return (
    <Flex
      css={theme({
        border: 1,
        overflow: 'hidden',
        bg: 'white',
        borderColor: 'black10',
        maxWidth: ['100%', layout.small],
        mx: 'auto',
        height: ['300px', '400px'],
        flexDirection: 'column'
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
      <Flex
        css={theme({
          px: 3,
          bg: '#F2F3F5',
          borderTop: 1,
          borderColor: 'black10',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        })}
      >
        <Text
          css={theme({
            color: '#606770',
            fontSize: '12px',
            textTransform: 'uppercase',
            maxWidth: '80%',
            mb: 1
          })}
        >
          {hostname || 'No domain found'}
        </Text>
        <Text
          css={theme({
            fontWeight: 'bold',
            color: '#1d2129',
            fontSize: '16px',
            maxWidth: '80%',
            lineHeight: '20px'
          })}
        >
          {title}
        </Text>
      </Flex>
    </Flex>
  )
}
