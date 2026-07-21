import { ChevronUp, ChevronDown } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { fontWeights, theme } from 'theme'
import React from 'react'

function ViewButton ({ view, activeView, onClick, isExpanded, disabled }) {
  const isActive = activeView === view
  const buttonId = `view-button-${view}`
  const ariaLabel = `View ${view} content${
    isActive ? ' (currently active)' : ''
  }`

  return (
    <button
      id={buttonId}
      type='button'
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      role='tab'
      aria-selected={isActive}
      aria-controls={`tabpanel-${view}`}
      css={theme({
        outline: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: isActive ? 'black' : 'black50',
        fontWeight: isActive ? fontWeights.bold : fontWeights.normal,
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        _hover: {
          textDecoration: 'underline'
        }
      })}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {view}
      {isActive && (
        <FeatherIcon
          icon={isExpanded ? ChevronUp : ChevronDown}
          color='black'
          size={[0, 0, 0, 0]}
          aria-hidden='true'
        />
      )}
    </button>
  )
}

const ViewNavigation = React.memo(
  ({ activeView, onViewClick, isExpanded, showApiKeyInput }) => (
    <Flex
      as='nav'
      role='tablist'
      aria-label='Response view options'
      css={theme({
        pt: 2,
        justifyContent: 'flex-end'
      })}
    >
      <Text
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        css={theme({
          fontSize: 0,
          color: 'black50'
        })}
      >
        <ViewButton
          disabled={showApiKeyInput}
          view='code'
          activeView={activeView}
          onClick={() => onViewClick('code')}
          isExpanded={isExpanded}
        />
        <span aria-hidden='true'>|</span>
        <ViewButton
          disabled={showApiKeyInput}
          view='body'
          activeView={activeView}
          onClick={() => onViewClick('body')}
          isExpanded={isExpanded}
        />
        <span aria-hidden='true'>|</span>
        <ViewButton
          disabled={showApiKeyInput}
          view='headers'
          activeView={activeView}
          onClick={() => onViewClick('headers')}
          isExpanded={isExpanded}
        />
      </Text>
    </Flex>
  )
)

ViewNavigation.displayName = 'ViewNavigation'

export default ViewNavigation
