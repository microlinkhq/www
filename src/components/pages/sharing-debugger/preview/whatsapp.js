import React from 'react'
import { theme, layout } from 'theme'
import Image from 'components/elements/Image/Image'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'

import {
  getHostname,
  getLogoUrl,
  getTitle,
  getDescription,
  getDisplayUrl,
  getImageUrl,
  PREVIEW_TIME
} from './utils'

export const WhatsAppPreview = ({ metadata }) => {
  const domain = getHostname(metadata)
  const logoUrl = getLogoUrl(metadata)
  const title = getTitle(metadata)
  const description = getDescription(metadata)
  const url = getDisplayUrl(metadata)

  return (
    <Box
      css={theme({
        bg: '#154D38',
        p: '8px',
        borderRadius: '8px',
        maxWidth: ['100%', `calc(${layout.small} * 0.6)`],
        mx: 'auto'
      })}
    >
      <Box
        css={theme({
          bg: '#113E2D',
          borderRadius: '6px',
          overflow: 'hidden',
          mb: 2
        })}
      >
        <Image
          src={getImageUrl(metadata)}
          alt={title}
          css={theme({ width: '100%', height: 'auto', display: 'block' })}
        />
        <Box css={theme({ p: '10px' })}>
          <Text
            css={theme({
              fontWeight: 'bold',
              lineHeight: '19px',
              fontSize: '13.6px',
              color: '#F7F7F7',
              mb: 1
            })}
          >
            {title}
          </Text>
          <Text
            css={theme({
              fontSize: '12px',
              color: '#F6F6F6',
              mb: 1
            })}
          >
            {description}
          </Text>
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between'
            })}
          >
            <Text
              css={theme({
                fontSize: '12px',
                color: '#9DADA6',
                textTransform: 'lowercase'
              })}
            >
              {domain}
            </Text>
            {logoUrl && (
              <Image src={logoUrl} alt={domain} width='18px' height='18px' />
            )}
          </Flex>
        </Box>
      </Box>

      <Flex
        css={theme({
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          px: 1,
          mt: 2,
          gap: 2
        })}
      >
        <Text
          css={theme({
            fontSize: '14px',
            color: '#55eb90',
            textDecoration: 'underline',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          {url}
        </Text>

        <Flex
          css={theme({
            alignItems: 'center',
            gap: 1,
            flexShrink: 0,
            pb: '2px'
          })}
        >
          <Text
            css={theme({
              fontSize: '11px',
              color: '#8696a0'
            })}
          >
            Edited {PREVIEW_TIME}
          </Text>
          <Text
            css={theme({
              fontSize: '11px',
              color: '#8696a0'
            })}
          >
            ✓
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
