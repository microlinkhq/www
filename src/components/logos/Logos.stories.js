import React from 'react'
import { storiesOf } from '@storybook/react'
import { Flex, Subhead } from 'components/elements'
import * as Logos from 'components/logos'

const logos = Object.entries(Logos)

const states = ['normal', 'hover']

function LogoStories () {
  return (
    <Flex>
      {states.map((state, index) => (
        <Flex
          mr={index + 1 === states.length ? 0 : 5}
          as='article'
          flexDirection='column'
          alignItems='baseline'
          key={state}
        >
          <Subhead>{state}</Subhead>
          {logos.map(([logoName, LogoComponent], index) => (
            <Flex py={3} alignItems='center' key={`${logoName}_${state}`}>
              <LogoComponent state={state} />
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

storiesOf('Components', module).add('Logos', () => <LogoStories />)
