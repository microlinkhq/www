import { Box, Flex, Heading, Link } from 'components/elements'
import { Caption, MQLEditor } from 'components/patterns'
import { ChevronRight, ArrowRight } from 'react-feather'
import React, { useState } from 'react'
import { layout } from 'theme'

const ArrowLink = ({ children, ...props }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      css={`
        a {
          display: flex;
        }
      `}
    >
      <Link
        style={{ display: 'inherit' }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        fontSize={Caption.defaultProps.fontSize}
        {...props}
      >
        {children}{' '}
        <Flex alignItems='center' as='span'>
          {isHover ? <ArrowRight /> : <ChevronRight />}{' '}
        </Flex>
      </Link>
    </Flex>
  )
}

const Hero = () => {
  return (
    <Flex
      px={3}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Heading pt={4} titleize={false} children='Browser as API' />
      <Caption
        maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
        titleize={false}
      >
        Fast, scalable, and reliable browser automation built for businesses and
        developers. Proudly open source.
      </Caption>
      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={3}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='#' children='Check out the API' />
        <ArrowLink pt={[3, 0, 0, 0]} href='#' children='View on GitHub' />
      </Flex>

      <Box pt={4} pb={5}>
        <MQLEditor />
      </Box>
    </Flex>
  )
}

export default Hero
