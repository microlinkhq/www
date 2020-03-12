import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { colors, fonts } from 'theme'

import { Link, Text, Flex } from 'components/elements'

import ProgressArc from 'progress-arc-component'

export const getColor = value => {
  if (value >= 90) return colors.close
  if (value >= 50) return colors.minimize
  return colors.fullscreen
}

const CIRCLE_WIDTH = '64px'

const Circle = styled(ProgressArc)`
  font-family: ${fonts.sans};
  height: ${props => props.width || CIRCLE_WIDTH} !important;
  margin: 0;
  .arc-background {
    fill: ${props => props.bg};
  }

  text {
    fill ${props => props.textColor}
  }
`

const LINKS = {
  'Time to Interactive': 'https://web.dev/interactive',
  'First CPU Idle': 'https://web.dev/first-cpu-idle',
  'Speed Index': 'https://web.dev/speed-index',
  'First Meaningful Paint': 'https://web.dev/first-meaningful-paint',
  'First Contentful Paint': 'https://web.dev/first-contentful-paint'
}

export default ({
  component: Component = Flex,
  circleRadius = 90,
  circleWidth = CIRCLE_WIDTH,
  data,
  ...props
}) => {
  return (
    <Component {...props}>
      {[
        'first-contentful-paint',
        'first-meaningful-paint',
        'speed-index',
        'first-cpu-idle',
        'interactive'
      ].map(key => {
        const { duration_pretty: duration, title, score, perception } = data[
          key
        ]
        const color = getColor(score)
        const backgroundColor = rgba(color, 0.1)

        return (
          <Flex
            key={`${title}_${score}`}
            flexDirection='column'
            alignItems='center'
            ml='-32px'
          >
            <Circle
              value={score}
              max={100}
              unit=''
              arcColor={color}
              bg={backgroundColor}
              arcBackgroundColor='transparent'
              radius={circleRadius}
              width={circleWidth}
              textColor={color}
              rounded
            />
            <Link
              icon
              lineHeight={2}
              textAlign='center'
              fontSize={1}
              mt={3}
              children={title}
              href={LINKS[title]}
            />
            <Text
              lineHeight={2}
              textAlign='center'
              fontSize={1}
              mt={1}
              color='gray7'
              children={duration}
            />
            <Text
              lineHeight={2}
              textAlign='center'
              fontSize={1}
              mt={1}
              color='gray7'
              children={`(${perception})`}
            />
          </Flex>
        )
      })}
    </Component>
  )
}
