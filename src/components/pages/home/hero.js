import { Subhead, Box, Flex, Heading } from 'components/elements'
import FeatherIcon from 'components/icons/Feather'
import { Caption } from 'components/patterns'
import { transition, layout } from 'theme'
import React, { useState } from 'react'
import styled from 'styled-components'

const FlexLink = styled(Flex)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  transition: transform ${transition.medium}, border-color ${transition.medium};

  &:hover {
    border-color: ${props => props.$color};
    transform: matrix(1.01, 0, 0, 1.01, 0, 0);
  }
`

const GridLink = ({ children, color, ...props }) => {
  const [isHover, setIsHover] = useState(false)
  const icon = isHover ? 'ArrowRight' : 'ArrowUpRight'

  return (
    <FlexLink
      as='a'
      bg='white80'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
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

const Grid = styled(Box)`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  grid-template-areas:
    'grid-1 grid-2 grid-3'
    'grid-4 grid-5 grid-6';

  .grid-1 {
    grid-area: grid-1;
  }
  .grid-2 {
    grid-area: grid-2;
  }
  .grid-3 {
    grid-area: grid-3;
  }
  .grid-4 {
    grid-area: grid-4;
  }
  .grid-5 {
    grid-area: grid-5;
  }
  .grid-6 {
    grid-area: grid-6;
  }
`

const Hero = props => {
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
        <Grid pb={[4, 4, 5, 5]}>
          <GridLink color='#d306aa' href='/logo' className='grid-1'>
            <Subhead fontSize={3}>Logo</Subhead>
            <Caption pt={3} fontSize={2}>
              Get and embed Favicons from any web
            </Caption>
          </GridLink>

          <GridLink color='#fd494a' href='/screenshot' className='grid-2'>
            <Subhead fontSize={3}>Screenshot</Subhead>
            <Caption pt={3} fontSize={2}>
              Turn websites into screenshots
            </Caption>
          </GridLink>
          <GridLink color='#8c1bab' href='/sdk' className='grid-3'>
            <Subhead fontSize={3}>SDK</Subhead>
            <Caption pt={3} fontSize={2}>
              Create beauty link previews
            </Caption>
          </GridLink>
          <GridLink
            color='rgb(181, 0, 237)'
            href='/insights'
            className='grid-4'
          >
            <Subhead fontSize={3}>Insights</Subhead>
            <Caption pt={3} fontSize={2}>
              Performance metrics powered by Lighthouse
            </Caption>
          </GridLink>
          <GridLink color='#e000ac' href='/pdf' className='grid-5'>
            <Subhead fontSize={3}>PDF</Subhead>
            <Caption pt={3} fontSize={2}>
              Create beauty link previews
            </Caption>
          </GridLink>
          <GridLink color='#3e55ff' href='/meta' className='grid-6'>
            <Subhead fontSize={3}>Meta</Subhead>
            <Caption pt={3} fontSize={2}>
              Performance metrics powered by Lighthouse
            </Caption>
          </GridLink>
        </Grid>
      </Box>
    </Flex>
  )
}

export default Hero
