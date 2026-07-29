import { colors, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'

const SLICES = [
  { key: 'recaptcha', dash: '44.7 55.3', offset: '0', stroke: '#43b9e2' },
  { key: 'cloudflare', dash: '12.6 87.4', offset: '-44.7', stroke: '#c48ad1' },
  { key: 'turnstile', dash: '8.5 91.5', offset: '-57.3', stroke: '#ffd629' },
  { key: 'aws', dash: '6.8 93.2', offset: '-65.8', stroke: '#59bfa2' },
  { key: 'akamai', dash: '5.6 94.4', offset: '-72.6', stroke: '#d46b78' },
  { key: 'hcaptcha', dash: '3.8 96.2', offset: '-78.2', stroke: '#48c9c7' },
  { key: 'secondary-a', dash: '3.4 96.6', offset: '-82', stroke: '#9884c7' },
  { key: 'secondary-b', dash: '3.1 96.9', offset: '-85.4', stroke: '#f2b444' },
  { key: 'secondary-c', dash: '2.8 97.2', offset: '-88.5', stroke: '#80c65b' },
  { key: 'secondary-d', dash: '2.4 97.6', offset: '-91.3', stroke: '#d76137' },
  { key: 'secondary-e', dash: '2.1 97.9', offset: '-93.7', stroke: '#8c7bd1' },
  { key: 'secondary-f', dash: '4.2 95.8', offset: '-95.8', stroke: '#252b2f' }
]

const LABELS = [
  {
    key: 'recaptcha',
    path: 'M366 176 L390 172 L440 172',
    x: 446,
    y: 178,
    text: 'recaptcha',
    stroke: '#43b9e2'
  },
  {
    key: 'cloudflare',
    path: 'M218 76 L208 52 L154 52',
    x: 154,
    y: 42,
    text: 'cloudflare',
    stroke: '#c48ad1',
    anchor: 'end'
  },
  {
    key: 'turnstile',
    path: 'M175 113 L150 98 L40 98',
    x: 40,
    y: 90,
    text: 'cloudflare-turnstile',
    stroke: '#ffd629'
  },
  {
    key: 'aws',
    path: 'M164 162 L112 160 L92 160',
    x: 92,
    y: 152,
    text: 'aws-waf',
    stroke: '#59bfa2',
    anchor: 'end'
  },
  {
    key: 'akamai',
    path: 'M176 220 L142 230 L108 230',
    x: 108,
    y: 252,
    text: 'akamai',
    stroke: '#d46b78',
    anchor: 'end'
  },
  {
    key: 'hcaptcha',
    path: 'M211 265 L192 286 L140 286',
    x: 140,
    y: 310,
    text: 'hcaptcha',
    stroke: '#48c9c7',
    anchor: 'end'
  }
]

const labelTextStyle = {
  fontWeight: 700,
  fontSize: 16,
  paintOrder: 'stroke',
  stroke: colors.white,
  strokeWidth: 5,
  strokeLinejoin: 'round'
}

const GraphSvg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
`

export const ProviderGraph = () => (
  <Box
    as='figure'
    aria-label='Illustrative antibot provider distribution'
    css={theme({
      m: 0,
      mx: 'auto',
      my: 4,
      maxWidth: '560px',
      width: '100%',
      overflow: 'visible'
    })}
  >
    <GraphSvg
      viewBox='0 0 540 340'
      role='img'
      aria-labelledby='antibot-provider-graph-title'
    >
      <title id='antibot-provider-graph-title'>
        Illustrative distribution of blocked antibot providers
      </title>
      <g transform='rotate(-90 260 170)'>
        {SLICES.map(slice => (
          <circle
            key={slice.key}
            cx='260'
            cy='170'
            r='96'
            pathLength='100'
            fill='none'
            stroke={slice.stroke}
            strokeWidth='48'
            strokeDasharray={slice.dash}
            strokeDashoffset={slice.offset}
          />
        ))}
      </g>
      <circle cx='260' cy='170' r='54' fill={colors.white} />
      <text
        x='260'
        y='165'
        textAnchor='middle'
        fill={colors.black}
        style={{ ...labelTextStyle, fontSize: 18 }}
      >
        blocked
      </text>
      <text
        x='260'
        y='190'
        textAnchor='middle'
        fill={colors.gray6}
        style={{
          ...labelTextStyle,
          fontSize: 12,
          textTransform: 'uppercase'
        }}
      >
        providers
      </text>
      {LABELS.map(label => (
        <g key={label.key}>
          <path
            d={label.path}
            fill='none'
            stroke={label.stroke}
            strokeWidth='3'
            strokeLinecap='square'
            strokeLinejoin='round'
          />
          <text
            x={label.x}
            y={label.y}
            textAnchor={label.anchor || 'start'}
            fill={colors.black}
            style={labelTextStyle}
          >
            {label.text}
          </text>
        </g>
      ))}
    </GraphSvg>
  </Box>
)
