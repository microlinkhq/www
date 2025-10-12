import Caps from '../Caps'
import Flex from '../Flex'
import Button from './Button'
import React, { useState, createElement } from 'react'
import { storiesOf } from '@storybook/react'
import { theme } from 'theme'

import { Story } from 'story'

const states = [null, 'hover', 'disabled', 'loading']

const variants = ['base', 'black', 'white']

const text = 'BUY'

const code = `
import { Button } from './Button'

export default () => (
  <Button>${text}</Button>
)
`

const BuyButton = ({
  children,
  loading: initialLoading,
  variant,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(initialLoading)

  const onClick = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Button
      loading={isLoading}
      variant={variant}
      onClick={onClick}
      css={theme({ mx: 3 })}
      {...props}
    >
      <Caps
        css={theme({
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
    <Flex css={theme({ pb: 4 })}>
      <Button variant='gradient' css={theme({ mx: 3 })}>
        <Caps
          css={theme({
            background: 'white',
            px: 3,
            py: 2,
            color: 'black'
          })}
        >
          Get in touch
        </Caps>
      </Button>
      <BuyButton>BUY</BuyButton>
      <BuyButton variant='black'>BUY NOW</BuyButton>
      <BuyButton variant='white'>BUY NOW</BuyButton>
    </Flex>
    {variants.map((variant, index) => (
      <Flex css={theme({ pt: index > 0 ? 4 : 0 })} key={variant}>
        {states.map(state =>
          createElement(
            BuyButton,
            {
              key: state,
              variant,
              state,
              [`data-${state}`]: true,
              disabled: state === 'disabled',
              loading: state === 'loading'
            },
            'BUY'
          )
        )}
      </Flex>
    ))}
  </Story>
))
