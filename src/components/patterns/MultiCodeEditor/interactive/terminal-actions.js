import CodeCopy from 'components/elements/Codecopy'
import FeatherIcon from 'components/icons/Feather'
import { Key, Globe } from 'react-feather'
import { colors } from 'theme'
import React from 'react'

const TerminalActions = React.memo(
  ({
    showApiKeyInput,
    setShowApiKeyInput,
    setActiveView,
    handleOpenInBrowser,
    getCurrentViewText
  }) => (
    <div
      role='group'
      aria-label='Terminal actions'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}
    >
      <button
        type='button'
        onClick={() => setShowApiKeyInput(!showApiKeyInput)}
        title={showApiKeyInput ? 'Hide API key input' : 'Show API key input'}
        aria-label={
          showApiKeyInput ? 'Hide API key input' : 'Show API key input'
        }
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          top: '-1px'
        }}
        onMouseEnter={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black
        }}
        onMouseLeave={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) {
            icon.style.stroke = showApiKeyInput ? colors.black : colors.black20
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            const newShowApiKeyInput = !showApiKeyInput
            setShowApiKeyInput(newShowApiKeyInput)
            if (newShowApiKeyInput) {
              setActiveView('body')
            } else {
              setActiveView('code')
            }
          }
        }}
      >
        <FeatherIcon
          icon={Key}
          color={showApiKeyInput ? colors.black : colors.black20}
          size={[1, 1, 1, 1]}
          animations={false}
          aria-hidden='true'
        />
      </button>
      <button
        type='button'
        onClick={handleOpenInBrowser}
        title='Open API request in browser'
        aria-label='Open API request in browser'
        style={{
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          top: '-1px'
        }}
        onMouseEnter={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black
        }}
        onMouseLeave={e => {
          const icon = e.currentTarget.querySelector('svg')
          if (icon) icon.style.stroke = colors.black20
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleOpenInBrowser()
          }
        }}
      >
        <FeatherIcon
          icon={Globe}
          color={colors.black20}
          size={[1, 1, 1, 1]}
          animations={false}
          aria-hidden='true'
        />
      </button>
      <CodeCopy text={getCurrentViewText()} />
    </div>
  )
)

TerminalActions.displayName = 'TerminalActions'

export default TerminalActions
