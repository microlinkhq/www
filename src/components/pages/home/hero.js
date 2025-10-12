import SubheadBase from 'components/elements/Subhead'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import FeatherIcon from 'components/icons/Feather'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import { useHover } from 'components/hook/use-hover'
import { transition, layout, theme } from 'theme'
import { setSaturation } from 'polished'
import React, { useState } from 'react'
import styled from 'styled-components'

const Subhead = withTitle(SubheadBase)
const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

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
      onMouseEnter={() => setColor(color)}
      onMouseLeave={() => setColor('')}
      css={theme({
        bg: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        m: 2,
        p: 4,
        border: 1,
        borderColor: 'black10',
        borderRadius: 3,
        width: '300px'
      })}
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

const GRID_ITEMS = [
  {
    title: 'Logo',
    subtitle: 'Get and embed Favicons from any web',
    color: '#d306aa',
    href: '/logo'
  },
  {
    title: 'Screenshot',
    subtitle: 'Turn websites into screenshots',
    color: '#fd494a',
    href: '/screenshot'
  },
  {
    title: 'SDK',
    subtitle: 'Create beautiful link previews',
    color: '#449bf8',
    href: '/sdk'
  },
  {
    title: 'Insights',
    subtitle: 'Performance metrics powered by Lighthouse',
    color: 'rgb(181, 0, 237)',
    href: '/insights'
  },
  {
    title: 'Meta',
    subtitle: 'Get unified metadata',
    color: '#3e55ff',
    href: '/meta'
  },
  {
    title: 'PDF',
    subtitle: 'PDF made simple',
    color: '#e000ac',
    href: '/pdf'
  }
]

const Hero = ({ children }) => {
  const [color, setColor] = useState('')

  return (
    <Flex
      as='section'
      id='hero'
      css={theme({
        px: 3,
        pt: [2, 2, 3, 3],
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      })}
    >
      {children({ color })}
      <Heading css={theme({ fontSize: ['48px', 6, 7, 7] })} titleize={false}>
        Browser as API
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [2, 2, 3, 3],
          pb: [4, 4, 5, 5],
          px: [4, 4, 0, 0],
          m: 0,
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Microlink is a fast, scalable, and reliable high-level API to control a
        headless browser built for businesses and developers. Proudly Open
        Source.
      </Caption>
      <Box>
        <Grid css={theme({ maxWidth: layout.large, pb: [4, 4, 5, 5] })}>
          {GRID_ITEMS.map(gridItem => (
            <GridLink
              setColor={setColor}
              color={gridItem.color}
              href={gridItem.href}
              key={gridItem.href}
            >
              <Subhead css={theme({ fontSize: [2, 2, 3, 3] })}>
                {gridItem.title}
              </Subhead>
              <Caption css={theme({ pt: 3, fontSize: 2 })}>
                {gridItem.subtitle}
              </Caption>
            </GridLink>
          ))}
        </Grid>
      </Box>
    </Flex>
  )
}

export default Hero
