import React from 'react'
import { theme } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import {
  getTitle,
  getPublisher,
  getLogoUrl,
  getImageUrl,
  getDescription
} from './utils'

export const SlackPreview = ({ metadata }) => {
  const title = getTitle(metadata)
  const publisher = getPublisher(metadata)
  const logoUrl = getLogoUrl(metadata)
  const imageUrl = getImageUrl(metadata)

  return (
    <Box
      css={theme({
        borderLeft: '4px solid',
        borderColor: '#e8e8e8',
        pl: [2, 3],
        py: 1
      })}
    >
      <Flex css={theme({ alignItems: 'center', mb: 1, gap: 2 })}>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={publisher}
            width='16px'
            height='16px'
            borderRadius='2px'
          />
        )}
        <Text
          css={theme({
            fontWeight: 900,
            color: 'rgb(29, 28, 29)',
            fontSize: '15px',
            fontFamily: 'sans'
          })}
        >
          {publisher}
        </Text>
      </Flex>
      <Text
        css={theme({
          fontWeight: 700,
          color: 'rgb(18, 100, 163)',
          fontSize: '15px',
          mb: '2px',
          fontFamily: 'sans'
        })}
      >
        {title}
      </Text>
      <Box css={theme({ mb: 2 })}>
        <Text
          css={theme({
            color: 'rgb(29, 28, 29)',
            fontSize: '15px',
            fontFamily: 'sans'
          })}
        >
          {getDescription(metadata)}{' '}
          {metadata.image &&
            metadata.image.size_pretty &&
            `(${metadata.image.size_pretty})`}
        </Text>
      </Box>
      <Image
        src={imageUrl}
        alt={title}
        css={theme({
          maxWidth: ['100%', '280px'],
          maxHeight: '150px',
          objectFit: 'cover',
          borderRadius: '8px',
          border: 1,
          borderColor: 'black10'
        })}
      />
    </Box>
  )
}
