import { Button } from 'components/elements/Button/Button'
import Select from 'components/elements/Select/Select'
import Spinner from 'components/elements/Spinner'
import Flex from 'components/elements/Flex'
import { colors } from 'theme'
import React from 'react'

const PlayIcon = () => (
  <svg
    style={{ width: '12px', height: '12px' }}
    fill='currentColor'
    viewBox='0 0 24 24'
    aria-hidden='true'
  >
    <path d='M8 5v14l11-7z' />
  </svg>
)

PlayIcon.displayName = 'PlayIcon'

const Toolbar = React.memo(
  ({
    currentLanguage,
    onLanguageChange,
    onExecute,
    isLoading,
    availableLanguages
  }) => (
    <Flex
      style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        alignItems: 'center',
        gap: '0.5rem'
      }}
      role='toolbar'
      aria-label='Code editor actions'
    >
      <Select
        value={currentLanguage}
        onChange={onLanguageChange}
        aria-label='Select programming language'
        style={{
          backgroundColor: 'white',
          width: '6rem',
          height: '2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {availableLanguages.map(lang => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </Select>

      <Button
        onClick={onExecute}
        disabled={isLoading}
        aria-label={isLoading ? 'Executing code...' : 'Execute code'}
        aria-describedby='execute-button-help'
        style={{
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.5 : 1,
          transition: 'opacity 0.2s',
          height: '2rem'
        }}
        variant='black'
        onMouseEnter={e => {
          if (!isLoading) e.target.style.opacity = '0.8'
        }}
        onMouseLeave={e => {
          if (!isLoading) e.target.style.opacity = '1'
        }}
      >
        {isLoading
          ? (
            <Spinner
              width='12px'
              height='16px'
              color={colors.white}
              style={{ padding: '0' }}
              aria-label='Loading'
            />
            )
          : (
            <PlayIcon />
            )}
      </Button>
      <span id='execute-button-help' style={{ display: 'none' }}>
        Click to run the code and see the API response
      </span>
    </Flex>
  )
)

Toolbar.displayName = 'Toolbar'

export default Toolbar
