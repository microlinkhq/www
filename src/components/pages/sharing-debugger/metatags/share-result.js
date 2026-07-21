import React from 'react'
import { theme, layout } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import truncateUrl from 'truncate-url'
import { Clipboard as ClipboardIcon } from 'components/icons/Clipboard'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

export const ShareResult = ({
  shareResultUrl,
  shareResultDisplayUrl,
  toClipboard,
  breakpoint
}) => (
  <Box css={theme({ mt: [3, 4], px: [2, 0] })}>
    <Flex
      css={theme({
        mx: 'auto',
        width: '100%',
        maxWidth: layout.small,
        flexDirection: 'column',
        gap: 1,
        bg: 'gray0',
        border: 1,
        borderColor: 'black10',
        borderRadius: 3,
        p: [2, 3]
      })}
    >
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2
        })}
      >
        <Text
          css={theme({
            fontSize: 1,
            fontWeight: 'bold',
            color: 'black'
          })}
        >
          Share this result
        </Text>

        <Tooltip
          type='copy'
          tabIndex={-1}
          tooltipsOpts={Tooltip.TEXT.OPTIONS}
          content={
            <Tooltip.Content>{Tooltip.TEXT.COPY('URL')}</Tooltip.Content>
          }
        >
          <Flex
            as='button'
            type='button'
            aria-label='Copy share URL'
            onClick={() => {
              toClipboard({
                copy: shareResultUrl,
                text: 'Share URL copied'
              })
            }}
            css={theme({
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              minWidth: '44px',
              p: 1,
              border: 0,
              bg: 'transparent',
              color: 'black50',
              cursor: 'pointer',
              flexShrink: 0,
              _hover: {
                color: 'black'
              },
              _focusVisible: {
                outline: '2px solid',
                outlineColor: 'link',
                outlineOffset: '2px',
                borderRadius: 2
              }
            })}
          >
            <ClipboardIcon css={theme({ color: 'currentColor' })} />
          </Flex>
        </Tooltip>
      </Flex>

      <Text
        css={theme({
          fontSize: 0,
          color: 'black80',
          fontFamily: 'mono',
          wordBreak: 'break-all'
        })}
      >
        {truncateUrl(
          shareResultDisplayUrl || shareResultUrl,
          breakpoint === 0 ? 60 : 90
        )}
      </Text>
    </Flex>
  </Box>
)
