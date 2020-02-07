import React from 'react'
import styled from 'styled-components'
import { rgba } from 'polished'
import { fonts } from 'theme'

import { Text, Flex, Box } from 'components/elements'

import ProgressArc from 'progress-arc-component'

const getColor = value => {
  if (value >= 90) return '#0CCE6B'
  if (value >= 50) return '#FFA400'
  return '#FF4E42'
}

const CIRCLE_WIDTH = '60px'

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

export default ({ width = CIRCLE_WIDTH, data, ...props }) => {
  return (
    <Flex>
      {data.map(({ text, value }, index) => {
        const color = getColor(value)
        const backgroundColor = rgba(color, 0.1)

        return (
          <Flex
            key={`${text}_${value}`}
            flexDirection='column'
            alignItems='center'
            pr={index === data.length - 1 ? 0 : 5}
            {...props}
          >
            <Circle
              value={value}
              max={100}
              unit=''
              arcColor={color}
              bg={backgroundColor}
              arcBackgroundColor='transparent'
              radius={90}
              width={width}
              textColor={color}
              rounded
            />
            <Text mt={3} fontWeight='bold'>
              {text}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}
