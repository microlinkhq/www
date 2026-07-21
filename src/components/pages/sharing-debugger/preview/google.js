import React from 'react'
import { theme } from 'theme'
import { MoreVertical } from 'react-feather'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import {
  getHostname,
  getGoogleTitle,
  getDisplayUrl,
  getLogoUrl,
  getDescription
} from './utils'

export const GooglePreview = ({ metadata }) => {
  const domain = getHostname(metadata)
  const title = getGoogleTitle(metadata)
  const url = getDisplayUrl(metadata)
  const logoUrl = getLogoUrl(metadata)

  return (
    <Box>
      <Flex css={theme({ alignItems: 'center', mb: 2 })}>
        {logoUrl && (
          <Flex
            css={theme({
              bg: 'white',
              borderRadius: '50%',
              p: '2px',
              border: 1,
              borderColor: 'black10',
              mr: 3,
              width: '28px',
              height: '28px',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            })}
          >
            <Image
              src={logoUrl}
              alt={domain || 'Site logo'}
              width='18px'
              height='18px'
            />
          </Flex>
        )}
        <Box>
          <Text
            css={theme({
              color: 'rgb(32, 33, 36)',
              fontSize: '14px',
              fontFamily: 'sans',
              lineHeight: '20px'
            })}
          >
            {domain}
          </Text>
          <Flex css={theme({ alignItems: 'center' })}>
            <Text
              css={theme({
                color: 'rgb(95, 99, 104)',
                fontSize: '12px',
                fontFamily: 'sans',
                lineHeight: '18px'
              })}
            >
              {url}
            </Text>
            <Flex css={theme({ ml: 1, color: 'black40' })}>
              <MoreVertical size={14} />
            </Flex>
          </Flex>
        </Box>
      </Flex>
      <Text
        css={theme({
          color: '#1a0dab',
          fontSize: 2,
          mb: 1,
          '&:hover': { textDecoration: 'underline' },
          cursor: 'pointer',
          fontFamily: 'sans'
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          color: 'black60',
          fontSize: '14px',
          lineHeight: 1.5,
          fontFamily: 'sans'
        })}
      >
        {getDescription(metadata)}
      </Text>
    </Box>
  )
}
