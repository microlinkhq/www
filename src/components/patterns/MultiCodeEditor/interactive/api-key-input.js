import { Button } from 'components/elements/Button/Button'
import Input from 'components/elements/Input/Input'
import Choose from 'components/elements/Choose'
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
                label='API key'
                placeholder='Enter your API key…'
                css={theme({ width: '8rem', fontSize: '12px' })}
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
              />
              <Button
                css={theme({ ml: 2, fontSize: '12px' })}
                disabled={!tempApiKey.trim()}
                onClick={handleSubmit}
              >
                use it
              </Button>
            </>
          )}
        />
        <Choose.Otherwise
          render={() => (
            <Button
              css={theme({ ml: 2, fontSize: '12px' })}
              onClick={() => {
                setApiKey('')
                setTempApiKey('')
              }}
            >
              clear it
            </Button>
          )}
        />
      </Choose>
    </Flex>
  )
})

ApiKeyInput.displayName = 'ApiKeyInput'

export default ApiKeyInput
