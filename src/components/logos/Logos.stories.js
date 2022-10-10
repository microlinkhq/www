import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Box, Flex, Subhead } from 'components/elements'
import { LogoBrand } from 'components/logos'

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
            {logos.map(([logoName, LogoComponent], index) => (
              <Flex py={3} alignItems='center' key={`${logoName}_${state}`}>
                <LogoComponent ratio={ratio} state={state} />
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

storiesOf('Logos', module).add('All', () => <LogoStories />)
