import React from 'react'

import { Bar } from '@nivo/bar'
import Nivo from '../Nivo'

export default ({
  data,
  indexBy,
  keys,
  label,
  width = 900,
  height = 500,
  groupMode = 'stacked', // grouped,
  layout = 'vertical', // horizontal
  ...props
}) => (
  <Nivo>
    {defaultProps => (
      <Bar
        {...defaultProps}
        groupMode={groupMode}
        layout={layout}
        label={label}
        data={data}
        width={width}
        height={height}
        keys={keys}
        minValue={0}
        indexBy={indexBy}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.5}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 6,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        motionStiffness={90}
        motionDamping={15}
        {...props}
      />
    )}
  </Nivo>
)
