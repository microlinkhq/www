import Caps from '../Caps'
import Flex from '../Flex'
import Text from '../Text'
import { Button } from './Button'
import React, { useState } from 'react'
import { theme } from 'theme'

import { Story } from 'story'

const combinations = [
  { name: 'link', variant: 'link' },
  { name: 'link + shimmer', variant: 'link', shimmer: true },
  { name: 'secondary', variant: 'secondary' },
  { name: 'secondary + shimmer', variant: 'secondary', shimmer: true },
  { name: 'outline', variant: 'outline' },
  { name: 'outline + shimmer', variant: 'outline', shimmer: true }
]

const states = [
  { name: 'default' },
  { name: 'hover' },
  { name: 'focus' },
  { name: 'active' },
  { name: 'disabled', disabled: true },
  { name: 'loading', loading: true }
]

const forcedState = name => [`[data-state="${name}"]`]

const text = 'BUY'

const code = `
import { Button } from './Button'

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
      css={theme({ mx: 3 })}
      {...props}
    >
      <Caps css={theme({ fontSize: 1 })}>{children}</Caps>
    </Button>
  )
}

const Label = ({ children }) => (
  <Text
    css={theme({
      fontFamily: 'mono',
      fontSize: 0,
      color: 'black60',
      mx: 3,
      mt: 2
    })}
  >
    {children}
  </Text>
)

const Labeled = ({ name, children }) => (
  <Flex css={theme({ flexDirection: 'column', alignItems: 'flex-start' })}>
    {children}
    <Label>{name}</Label>
  </Flex>
)

export default {
  title: 'Elements/Button',
  parameters: {
    pseudo: {
      hover: forcedState('hover'),
      focusVisible: forcedState('focus'),
      active: forcedState('active')
    }
  }
}

export const Default = () => (
  <Story name='Button' code={code}>
    <Flex css={theme({ pb: 4 })}>
      {combinations.map(({ name, ...props }) => (
        <Labeled key={name} name={name}>
          <BuyButton {...props}>{text}</BuyButton>
        </Labeled>
      ))}
    </Flex>
    {combinations.map(({ name, ...props }, index) => (
      <Flex
        css={theme({ pt: index > 0 ? 4 : 0, flexDirection: 'column' })}
        key={name}
      >
        <Label>{name}</Label>
        <Flex css={theme({ pt: 2 })}>
          {states.map(({ name: state, ...stateProps }) => (
            <Labeled key={state} name={state}>
              <BuyButton data-state={state} {...props} {...stateProps}>
                {text}
              </BuyButton>
            </Labeled>
          ))}
        </Flex>
      </Flex>
    ))}
  </Story>
)
