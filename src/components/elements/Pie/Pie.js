import React from 'react'
import { colors } from 'theme'

import { Pie } from '@nivo/pie'

export default ({ data, width = 800, height = 500 }) => (
  <Pie
    isInteractive={false}
    data={data}
    width={width}
    height={height}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={2}
    cornerRadius={3}
    colors={{ scheme: 'nivo' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    radialLabel={({ label, size }) => `${label} (${size})`}
    radialLabelsSkipAngle={0}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor={colors.black80}
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    sliceLabel={false}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor={colors.black80}
    animate
    motionStiffness={90}
    motionDamping={15}
    legends={[
      {
        anchor: 'bottom',
        direction: 'row',
        translateY: 56,
        itemWidth: 100,
        itemHeight: 18,
        itemTextColor: colors.black80,
        symbolSize: 18,
        symbolShape: 'circle'
      }
    ]}
  />
)
