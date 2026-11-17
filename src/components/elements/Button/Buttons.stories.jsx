import Caps from '../Caps'
import Flex from '../Flex'
import Text from '../Text'
import Button from './Button'
import React, { useState, createElement } from 'react'
import { theme } from 'theme'

import { Story } from 'story'

const states = [null, 'hover', 'disabled', 'loading']

const combinations = [
  { name: 'base' },
  { name: 'base + shimmer', shimmer: true },
  { name: 'outline', variant: 'outline' },
  { name: 'outline + shimmer', variant: 'outline', shimmer: true }
]

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

const VariantName = ({ children }) => (
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
    <VariantName>{name}</VariantName>
  </Flex>
)

export default { title: 'Elements/Button' }

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
        <VariantName>{name}</VariantName>
        <Flex css={theme({ pt: 2 })}>
          {states.map(state =>
            createElement(
              BuyButton,
              {
                key: state,
                ...props,
                state,
                [`data-${state}`]: true,
                disabled: state === 'disabled',
                loading: state === 'loading'
              },
              'BUY'
            )
          )}
        </Flex>
      </Flex>
    ))}
  </Story>
)
