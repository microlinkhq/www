import React from 'react'
import { colors } from 'theme'

import { Radar } from '@nivo/radar'
import Nivo from '../Nivo'

export default ({
  data,
  width = 800,
  height = 500,
  indexBy,
  keys,
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
        gridLabelOffset={24}
        enableDots
        dotSize={6}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel
        dotLabel='value'
        dotLabelYOffset={-8}
        fillOpacity={0.5}
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
