import React from 'react'
import { theme } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'

import {
  getTitle,
  getDescription,
  getPublisher,
  getDisplayUrl,
  getImageUrl
} from './utils'

export const DiscordPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const description = getDescription(metadata)
  const publisher = getPublisher(metadata)
  const url = getDisplayUrl(metadata)

  return (
    <Box
      css={theme({
        bg: '#313338',
        p: [2, 3],
        borderRadius: 4,
        maxWidth: ['100%', '432px'],
        fontFamily: 'sans'
      })}
    >
      <Text
        css={theme({
          color: '#00A8FC',
          fontSize: 1,
          mb: 2,
          '&:hover': { textDecoration: 'underline' },
          cursor: 'pointer'
        })}
      >
        {url}
      </Text>
      <Box
        css={theme({
          bg: '#2B2D31',
          p: 3,
          borderRadius: 1,
          maxWidth: 'fit-content'
        })}
      >
        {publisher && (
          <Text
            css={theme({
              color: '#B5BAC1',
              fontSize: '12px',
              fontWeight: 500,
              mb: 1
            })}
          >
            {publisher}
          </Text>
        )}
        <Text
          css={theme({
            color: '#00A8FC',
            fontSize: 1,
            fontWeight: 'bold',
            mb: 2,
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer'
          })}
        >
          {title}
        </Text>
        <Text
          css={theme({
            color: '#DBDEE1',
            fontSize: 0,
            lineHeight: '18px',
            mb: 3
          })}
        >
          {description}
        </Text>
        <Image
          src={getImageUrl(metadata)}
          alt={title}
          css={theme({
            borderRadius: 4,
            maxWidth: '100%',
            mt: 3
          })}
        />
      </Box>
    </Box>
  )
}
