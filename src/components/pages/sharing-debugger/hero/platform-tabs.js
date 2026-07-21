import React, { createElement } from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import { PREVIEWS } from 'components/pages/sharing-debugger/preview'

export const PlatformTabs = ({ selectedPlatform, setSelectedPlatform }) => (
  <Flex id='providers' css={theme({ justifyContent: 'center', mb: 3 })}>
    <Flex
      as='div'
      role='tablist'
      aria-label='Preview platforms'
      css={theme({
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center'
      })}
    >
      {Object.entries(PREVIEWS).map(([key, { icon, name }]) => {
        const isActive = selectedPlatform === key
        return (
          <Tooltip
            key={key}
            type='pointer'
            tabIndex={-1}
            tooltipsOpts={{
              interactive: false,
              hideOnClick: true
            }}
            content={<Tooltip.Content>{name}</Tooltip.Content>}
            css={theme({
              display: 'flex',
              alignItems: 'center'
            })}
          >
            <Box
              as='button'
              id={`sharing-debugger-tab-${key}`}
              type='button'
              role='tab'
              aria-label={name}
              aria-selected={isActive}
              aria-controls={`sharing-debugger-panel-${key}`}
              onClick={() => setSelectedPlatform(key)}
              css={theme({
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                minHeight: '44px',
                minWidth: '44px',
                p: 2,
                border: 1,
                borderColor: isActive ? 'black' : 'black10',
                borderRadius: 2,
                bg: isActive ? 'black' : 'white',
                color: isActive ? 'white' : 'black70',
                cursor: 'pointer',
                _hover: {
                  color: isActive ? 'white' : 'black',
                  borderColor: isActive ? 'black' : 'black30'
                },
                _focusVisible: {
                  outline: '2px solid',
                  outlineColor: 'link',
                  outlineOffset: '2px'
                }
              })}
            >
              <Box
                as='span'
                aria-hidden='true'
                css={theme({
                  display: 'flex',
                  alignItems: 'center'
                })}
              >
                {createElement(icon, { size: '18px' })}
              </Box>
            </Box>
          </Tooltip>
        )
      })}
    </Flex>
  </Flex>
)
