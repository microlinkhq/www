import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Caps, Flex, Button } from 'components/elements'
import { themeCss } from 'theme'

import { Story } from 'story'

const states = [null, 'hover', 'disabled', 'loading']

const variants = ['base', 'black', 'white']

const text = 'BUY'

const code = `
import { Button } from 'components/elements'

export default () => (
  <Button>${text}</Button>
)
`

const BuyButton = ({ children, loading: initialLoading, ...props }) => {
  const [isLoading, setIsLoading] = useState(initialLoading)

  const onClick = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Button
      loading={isLoading}
      onClick={onClick}
      css={themeCss({ mx: 3 })}
      {...props}
    >
      <Caps
        css={themeCss({
          fontSize: 1
        })}
      >
        {children}
      </Caps>
    </Button>
  )
}

storiesOf('Elements', module).add('Button', () => (
  <Story name='Button' code={code}>
    <Flex css={themeCss({ pb: 4 })}>
      <BuyButton>BUY</BuyButton>
      <BuyButton variant='black'>BUY NOW</BuyButton>
    </Flex>
    {variants.map((variant, index) => (
      <Flex css={themeCss({ pt: index > 0 ? 4 : 0 })} key={variant}>
        {states.map(state => (
          <BuyButton
            key={state}
            variant={variant}
            state={state}
            disabled={state === 'disabled'}
            loading={state === 'loading'}
          >
            BUY
          </BuyButton>
        ))}
      </Flex>
    ))}
  </Story>
))
