import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import Choose from 'components/elements/Choose'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import React, { useState, useCallback } from 'react'
import { theme } from 'theme'

const ApiKeyInput = React.memo(({ apiKey, onApiKeySubmit, setApiKey }) => {
  const [tempApiKey, setTempApiKey] = useState('')

  const handleSubmit = useCallback(() => {
    if (tempApiKey.trim()) {
      const newApiKey = tempApiKey.trim()
      onApiKeySubmit(newApiKey)
      setTempApiKey('')
    }
  }, [tempApiKey, onApiKeySubmit])

  return (
    <Flex css={theme({ justifyContent: 'center' })}>
      <Choose>
        <Choose.When
          condition={!apiKey}
          render={() => (
            <>
              <Input
                required
                type='text'
                placeholder='Enter your API key…'
                css={theme({ width: '8rem', fontSize: '12px' })}
                labelCss={{ py: '4px' }}
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
              />
              <Button
                css={theme({ ml: 2 })}
                disabled={!tempApiKey.trim()}
                onClick={handleSubmit}
                variant='black'
              >
                <Caps css={theme({ fontSize: '12px' })}>use it</Caps>
              </Button>
            </>
          )}
        />
        <Choose.Otherwise
          render={() => (
            <Button
              css={theme({ ml: 2 })}
              onClick={() => {
                setApiKey('')
                setTempApiKey('')
              }}
              variant='white'
            >
              <Caps css={theme({ fontSize: '12px' })}>clear it</Caps>
            </Button>
          )}
        />
      </Choose>
    </Flex>
  )
})

ApiKeyInput.displayName = 'ApiKeyInput'

export default ApiKeyInput
