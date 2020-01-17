import React from 'react'
import { fontSizes, fonts, colors } from 'theme'
import prettyBytes from 'pretty-bytes'

import { Bar } from '@nivo/bar'

export default ({
  scheme = 'orange_red',
  animate = true,
  data,
  indexBy,
  width = 900,
  height = 500,
  groupMode = 'stacked', // grouped,
  layout = 'vertical' // vertical
}) => (
  <Bar
    groupMode={groupMode}
    layout={layout}
    label={e => prettyBytes(e.data[`${e.id}Bytes`])}
    data={data}
    width={width}
    height={height}
    keys={[
      'image',
      'script',
      'stylesheet',
      'document',
      'font',
      'other',
      'media',
      'third party'
    ]}
    minValue={0}
    indexBy={indexBy}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.5}
    colors={{ scheme }}
    theme={{
      tooltip: {
        container: {
          fontFamily: fonts.sans,
          color: colors.black80,
          fontSize: fontSizes[1]
        }
      }
    }}
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
    animate={animate}
    motionStiffness={90}
    motionDamping={15}
  />
)
