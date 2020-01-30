import React from 'react'
import { colors } from 'theme'

import { Radar } from '@nivo/radar'
import Nivo from '../Nivo'
import Text from '../Text'

const CustomText = props => (
  <Text as='text' fontSize='11px' color='black80' {...props} />
)

const LabelComponent = ({ data, url, baselineUrl }) => ({
  id,
  anchor,
  ...props
}) => {
  const translateLeft = () => {
    if (id === 'Time to Interactive') return -100
    if (id === 'First CPU Idle') return -120
  }

  const translateMiddle = () => {
    return -56
  }

  const translateRight = () => {
    if (id === 'Speed Index') return 30
    if (id === 'First Meaningful Paint') return 10
  }

  const value = data.find(({ id: dataId }) => dataId === id)
  const percentage = (1 - value[url] / value[baselineUrl]) * 100
  const sign = percentage > 0 ? '+' : ''

  const translateBottom = () => {
    if (id === 'First Contentful Paint') return -36
    return -12
  }

  return (
    <g
      transform={`translate(${
        anchor === 'end'
          ? translateLeft()
          : anchor === 'middle'
          ? translateMiddle()
          : translateRight()
      }, ${translateBottom()})`}
    >
      <CustomText>{id}</CustomText>

      {percentage !== 0 && (
        <CustomText
          fontWeight='bold'
          x={id === 'First Contentful Paint' ? 40 : 0}
          y={24}
        >
          {sign + percentage.toFixed(0) + '%'}
        </CustomText>
      )}
    </g>
  )
}

export default ({
  data,
  width = 800,
  height = 500,
  indexBy,
  keys,
  url,
  baselineUrl,
  ...props
}) => (
  <Nivo>
    {defaultProps => (
      <Radar
        {...defaultProps}
        data={data}
        width={width}
        height={height}
        keys={keys}
        indexBy={indexBy}
        maxValue='auto'
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve='linearClosed'
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape='linear'
        gridLabelOffset={0}
        enableDots
        dotSize={10}
        dotBorderColor={{ from: 'color' }}
        gridLabel={LabelComponent({ data, url, baselineUrl })}
        dotLabelYOffset={-18}
        fillOpacity={0.25}
        blendMode='multiply'
        motionStiffness={90}
        motionDamping={15}
        isInteractive
        legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: colors.black80,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: colors.black
                }
              }
            ]
          }
        ]}
        {...props}
      />
    )}
  </Nivo>
)
