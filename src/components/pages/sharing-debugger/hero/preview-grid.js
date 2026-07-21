import React, { createElement } from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { PREVIEWS } from 'components/pages/sharing-debugger/preview'

export const PreviewGrid = ({ selectedPlatform, metadata }) => {
  const platforms =
    selectedPlatform === 'all'
      ? Object.entries(PREVIEWS).filter(([key, value]) => value.component)
      : [[selectedPlatform, PREVIEWS[selectedPlatform]]]

  const activeTabId = `sharing-debugger-tab-${selectedPlatform}`
  const isAll = selectedPlatform === 'all'

  return (
    <Box
      as='section'
      id='preview'
      role='tabpanel'
      aria-labelledby={activeTabId}
      tabIndex={0}
      css={theme({
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr',
        overflow: 'hidden',
        height: 'fit-content',
        ...(isAll && {
          borderTop: 1,
          borderLeft: 1,
          borderColor: 'black10'
        })
      })}
    >
      {platforms.map(([key, { name, component }]) => (
        <Box
          key={key}
          id={`sharing-debugger-panel-${key}`}
          css={theme({
            mx: 'auto',
            ...(isAll && {
              p: 3,
              borderRight: 1,
              borderBottom: 1,
              borderColor: 'black10',
              bg: 'white',
              position: 'relative'
            })
          })}
        >
          {isAll && (
            <Caps
              css={theme({
                fontSize: 0,
                color: 'black40',
                mb: 4,
                position: 'absolute',
                top: '16px',
                left: '16px'
              })}
            >
              {name}
            </Caps>
          )}
          <Box css={theme({ mt: isAll ? 4 : 0 })}>
            {createElement(component, { metadata })}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
