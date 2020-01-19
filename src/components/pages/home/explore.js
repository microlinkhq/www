import React from 'react'
import { Flex, Card } from 'components/elements'
import { Headline } from 'components/patterns'
import { slide } from 'components/keyframes'
import styled from 'styled-components'

const Dots = styled(Flex)`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 100%;
    z-index: -1;

    background-image: radial-gradient(#d7d7d7 1px, transparent 0),
      radial-gradient(#d7d7d7 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;

    animation: ${slide} 100s linear infinite;
    animation-direction: reverse;
  }
`

const Explore = props => {
  const ratio = [0.7, 0.7, 0.7, 0.7]
  return (
    <Dots as='article' id='explore' {...props}>
      <Flex
        px={4}
        pt={4}
        pb={4}
        width='100%'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Flex
          pt={4}
          pb={4}
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Headline
            pb={[0, 4]}
            title='Explore'
            caption='discover all the things you can do'
          />
          <Flex>
            <Card ratio={ratio} p={4}>
              PDF
            </Card>
            <Card ratio={ratio} p={4} mx={4}>
              Palette
            </Card>
            <Card ratio={ratio} p={4}>
              HTML
            </Card>
          </Flex>
          <Flex pt={4}>
            <Card ratio={ratio} p={4}>
              Metrics
            </Card>
            <Card ratio={ratio} p={4} mx={4}>
              Screenshot
            </Card>
            <Card ratio={ratio} p={4}>
              Meta
            </Card>
          </Flex>
          <Flex pt={4}>
            <Card ratio={ratio} p={4}>
              iframe
            </Card>
            <Card ratio={ratio} p={4} mx={4}>
              data
            </Card>
            <Card ratio={ratio} p={4}>
              embed
            </Card>
          </Flex>
        </Flex>
      </Flex>
    </Dots>
  )
}

export default Explore
