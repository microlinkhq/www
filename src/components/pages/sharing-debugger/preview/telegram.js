import React from 'react'
import { theme, layout } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import {
  getTitle,
  getPublisher,
  getDescription,
  getDisplayUrl,
  getImageUrl,
  PREVIEW_TIME
} from './utils'

export const TelegramPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const publisher = getPublisher(metadata)
  const description = getDescription(metadata)
  const url = getDisplayUrl(metadata)

  return (
    <Box
      css={theme({
        bg: '#766BC8',
        p: 2,
        borderRadius: '12px',
        maxWidth: ['100%', `calc(${layout.small} * 0.75)`],
        color: 'white',
        fontFamily: 'sans'
      })}
    >
      <Text
        css={theme({
          fontSize: '14px',
          mb: 2,
          textDecoration: 'underline',
          cursor: 'pointer',
          display: 'block'
        })}
      >
        {url}
      </Text>

      <Box
        css={theme({
          borderRadius: '3px',
          borderLeft: '.1875rem solid white',
          bg: '#8775DA',
          color: 'white',
          p: 2
        })}
      >
        {publisher && (
          <Text
            css={theme({
              fontWeight: 'bold',
              fontSize: '14px',
              mb: '2px'
            })}
          >
            {publisher}
          </Text>
        )}
        <Text
          css={theme({
            fontWeight: 'bold',
            fontSize: '14px',
            mb: '2px'
          })}
        >
          {title}
        </Text>
        <Box css={theme({ mb: 2 })}>
          <Text
            css={theme({
              fontSize: '14px',
              lineHeight: 1.4
            })}
          >
            {description}
          </Text>
        </Box>
        <Image
          src={getImageUrl(metadata)}
          alt={title}
          css={theme({
            borderRadius: '4px',
            display: 'block'
          })}
        />
      </Box>

      <Flex
        css={theme({
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: 1,
          opacity: 0.8
        })}
      >
        <Text
          css={theme({
            fontSize: '11px',
            mr: 1
          })}
        >
          edited {PREVIEW_TIME}
        </Text>
        <Text
          css={theme({
            fontSize: '11px',
            fontWeight: 'bold'
          })}
        >
          ✓
        </Text>
      </Flex>
    </Box>
  )
}
