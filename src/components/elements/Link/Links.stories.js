import Box from '../Box'
import Flex from '../Flex'
import { Link } from '.'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'

const TEXT = 'Click my site'

const variants = [
  { name: 'Link', props: {} },
  { name: "Link variant='solid'", props: { variant: 'solid' } }
]

const propsList = [
  { logoIcon: false, externalIcon: false },
  { logoIcon: true, externalIcon: false },
  { logoIcon: false, externalIcon: true },
  { logoIcon: true, externalIcon: true }
]

const states = [null, 'hover']

const createCode = props => `
import { Link } from 'components/elements/Link'

export default () => (
  <Link${props.variant ? ` variant='${props.variant}'` : ''}${
  props.logoIcon ? ' logoIcon' : ''
}${props.externalIcon === false ? ' externalIcon={false}' : ''}${
  props.href ? ` href='${props.href}'` : ''
}>
    ${TEXT}
  </Link>
)
`

storiesOf('Elements', module).add('Link', () => (
  <>
    {variants.map(({ name, props }) => (
      <Story key={name} name={name} code={createCode(props)}>
        {propsList.map((propItem, index) => (
          <Flex key={`${name}:${index}`}>
            {states.map(state => (
              <Box
                key={`${name}:${index}:${state}`}
                css={theme({
                  display: ['block', 'inline'],
                  pr: 3,
                  pb: 3
                })}
              >
                <Link
                  href='https://microlink.io'
                  disabled={state === 'disabled'}
                  loading={state === 'loading'}
                  {...{ [`data-${state}`]: true }}
                  {...props}
                  {...propItem}
                >
                  {JSON.stringify(propItem)}
                </Link>
              </Box>
            ))}
          </Flex>
        ))}
      </Story>
    ))}
  </>
))
