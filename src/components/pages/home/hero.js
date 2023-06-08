import { Subhead, Box, Flex, Heading } from 'components/elements'
import FeatherIcon from 'components/icons/Feather'
import { Caption } from 'components/patterns'
import { useHover } from 'components/hook'
import { transition, layout } from 'theme'
import { setSaturation } from 'polished'
import React, { useState } from 'react'
import styled from 'styled-components'

const FlexLink = styled(Flex)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: box-shadow ${transition.medium}, transform ${transition.medium},
    border-color ${transition.medium};

  &:hover {
    border-color: ${props => setSaturation(0.8, props.$color)};
    transform: matrix(1.01, 0, 0, 1.01, 0, 0);
    box-shadow: 0 0 0 ${props => props.$color},
      0 0 24px -18px ${props => props.$color};
  }
`

const GridLink = ({ children, setColor, color, ...props }) => {
  const [ref, isHover] = useHover()
  const icon = isHover ? 'ArrowRight' : 'ArrowUpRight'

  return (
    <FlexLink
      ref={ref}
      as='a'
      bg='white'
      onMouseEnter={() => setColor(color)}
      onMouseLeave={() => setColor('')}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      m={2}
      p={4}
      border={1}
      borderColor='black10'
      borderRadius={3}
      width='300px'
      $color={color}
      {...props}
    >
      <FeatherIcon
        icon={icon}
        size='16px'
        color='black50'
        css={`
          position: absolute;
          top: 12px;
          right: 12px;
        `}
      />
      {children}
    </FlexLink>
  )
}

const Grid = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Hero = ({ children, ...props }) => {
  const [color, setColor] = useState('')

  return (
    <Flex
      as='section'
      id='hero'
      px={3}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      pt={[2, 2, 3, 3]}
      {...props}
    >
      {children({ color })}
      <Heading fontSize={['48px', 6, 7, 7]} titleize={false}>
        Browser as API
      </Heading>

      <Caption
        as='h2'
        pt={[2, 2, 3, 3]}
        pb={[4, 4, 5, 5]}
        px={[4, 4, 0, 0]}
        maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
      >
        Microlink is a fast, scalable, and reliable high-level API to control a
        headless browser built for businesses and developers. Proudly Open
        Source.
      </Caption>
      <Box>
        <Grid maxWidth={layout.large} pb={[4, 4, 5, 5]}>
          <GridLink
            setColor={setColor}
            color='#d306aa'
            href='/logo'
            className='grid-1'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>Logo</Subhead>
            <Caption pt={3} fontSize={2}>
              Get and embed Favicons from any web
            </Caption>
          </GridLink>

          <GridLink
            setColor={setColor}
            color='#fd494a'
            href='/screenshot'
            className='grid-2'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>Screenshot</Subhead>
            <Caption pt={3} fontSize={2}>
              Turn websites into screenshots
            </Caption>
          </GridLink>
          <GridLink
            setColor={setColor}
            color='#449bf8'
            href='/sdk'
            className='grid-3'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>SDK</Subhead>
            <Caption pt={3} fontSize={2}>
              Create beauty link previews
            </Caption>
          </GridLink>
          <GridLink
            setColor={setColor}
            color='rgb(181, 0, 237)'
            href='/insights'
            className='grid-4'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>Insights</Subhead>
            <Caption pt={3} fontSize={2}>
              Performance metrics powered by Lighthouse
            </Caption>
          </GridLink>
          <GridLink
            setColor={setColor}
            color='#3e55ff'
            href='/meta'
            className='grid-6'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>Meta</Subhead>
            <Caption pt={3} fontSize={2}>
              Get unified metadata
            </Caption>
          </GridLink>
          <GridLink
            setColor={setColor}
            color='#e000ac'
            href='/pdf'
            className='grid-5'
          >
            <Subhead fontSize={[2, 2, 3, 3]}>PDF</Subhead>
            <Caption pt={3} fontSize={2}>
              PDF made simple
            </Caption>
          </GridLink>
        </Grid>
      </Box>
    </Flex>
  )
}

export default Hero
