import { Container, Flex, Heading } from 'components/elements'
import { ArrowLink, Caption, MQLEditor } from 'components/patterns'
import { layout } from 'theme'
import React from 'react'

const Hero = () => {
  return (
    <Flex
      px={3}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Heading
        fontSize={['48px', 6, 7, 7]}
        pt={[4, 4, 5, 5]}
        titleize={false}
        children='Browser as API'
      />
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
      >
        Fast, scalable, and reliable browser automation built for businesses and
        developers.
      </Caption>
      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink
          pr={[0, 4, 4, 4]}
          href='/recipes'
          children='Start building'
        />
        <ArrowLink
          pt={[3, 0, 0, 0]}
          href='/docs/api/getting-started/overview'
          children='Check the API'
        />
      </Flex>
      <MQLEditor pt={4} pb={Container.defaultProps.pt} />
    </Flex>
  )
}

export default Hero
