import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'
import { withTitle } from 'helpers/hoc/with-title'
import { LogoBrand } from 'components/logos'

const Subhead = withTitle(SubheadBase)

const logos = Object.entries(LogoBrand)

const states = ['normal', 'hover']

function LogoStories () {
  const [ratio, setRatio] = useState(1)
  return (
    <Box>
      <input
        type='range'
        min='0'
        max='2'
        step='0.1'
        value={ratio}
        onChange={event => {
          setRatio(event.target.value)
        }}
      />
      <Flex>
        {states.map((state, index) => (
          <Flex
            mr={index + 1 === states.length ? 0 : 5}
            as='section'
            flexDirection='column'
            alignItems='baseline'
            key={state}
          >
            <Subhead>{state}</Subhead>
            {logos.map(([logoName, LogoComponent], index) => {
              const props = {}
              if (state === 'hover') {
                props['data-hover'] = true
              }
              return (
                <Flex py={3} alignItems='center' key={`${logoName}_${state}`}>
                  <LogoComponent ratio={ratio} {...props} />
                </Flex>
              )
            })}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

storiesOf('Logos', module).add('All', () => <LogoStories />)
