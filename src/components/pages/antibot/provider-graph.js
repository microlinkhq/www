import { colors, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'

const SLICES = [
  { id: 'recaptcha', color: colors.cyan5, dash: '44.7 55.3', offset: '0' },
  {
    id: 'cloudflare',
    color: colors.grape4,
    dash: '12.6 87.4',
    offset: '-44.7'
  },
  { id: 'turnstile', color: colors.yellow5, dash: '8.5 91.5', offset: '-57.3' },
  { id: 'aws-waf', color: colors.teal5, dash: '6.8 93.2', offset: '-65.8' },
  { id: 'akamai', color: colors.red5, dash: '5.6 94.4', offset: '-72.6' },
  { id: 'hcaptcha', color: colors.violet4, dash: '3.8 96.2', offset: '-78.2' },
  { id: 'other-a', color: colors.violet3, dash: '3.4 96.6', offset: '-82' },
  { id: 'other-b', color: colors.yellow6, dash: '3.1 96.9', offset: '-85.4' },
  { id: 'other-c', color: colors.lime5, dash: '2.8 97.2', offset: '-88.5' },
  { id: 'other-d', color: colors.orange6, dash: '2.4 97.6', offset: '-91.3' },
  { id: 'other-e', color: colors.violet5, dash: '2.1 97.9', offset: '-93.7' },
  { id: 'other-f', color: colors.gray8, dash: '4.2 95.8', offset: '-95.8' }
]

const LABELS = [
  {
    id: 'recaptcha',
    label: 'recaptcha',
    color: colors.cyan5,
    path: 'M366 176 L390 172 L450 172',
    x: 456,
    y: 178
  },
  {
    id: 'cloudflare',
    label: 'cloudflare',
    color: colors.grape4,
    path: 'M218 76 L208 52 L154 52',
    x: 154,
    y: 42
  },
  {
    id: 'turnstile',
    label: 'cloudflare-turnstile',
    color: colors.yellow5,
    path: 'M175 113 L150 98 L52 98',
    x: 52,
    y: 90
  },
  {
    id: 'aws-waf',
    label: 'aws-waf',
    color: colors.teal5,
    path: 'M164 162 L112 160 L92 160',
    x: 92,
    y: 152
  },
  {
    id: 'akamai',
    label: 'akamai',
    color: colors.red5,
    path: 'M176 220 L142 230 L108 230',
    x: 108,
    y: 252
  },
  {
    id: 'hcaptcha',
    label: 'hcaptcha',
    color: colors.violet4,
    path: 'M211 265 L192 286 L140 286',
    x: 140,
    y: 310
  }
]

const Figure = styled('figure')`
  display: grid;
  place-items: center;
  ${theme({
    m: 0,
    mx: 'auto',
    pt: [3, 3, 4, 4],
    maxWidth: '540px'
  })}
`

const Svg = styled('svg')`
  display: block;
  max-width: 100%;
  height: auto;
  overflow: visible;

  .slice {
    fill: none;
    stroke-width: 48;
  }

  .hole {
    fill: ${colors.white};
  }

  .center,
  .label {
    fill: ${colors.black80};
    ${theme({ fontFamily: 'sans' })}
    font-weight: 700;
    paint-order: stroke;
    stroke: ${colors.white};
    stroke-linejoin: round;
    stroke-width: 6px;
    text-anchor: middle;
  }

  .center {
    font-size: 18px;
  }

  .center--sub {
    fill: ${colors.black60};
    font-size: 12px;
    text-transform: uppercase;
  }

  .label {
    font-size: 16px;
    text-anchor: start;
  }

  .leader {
    fill: none;
    stroke-linecap: square;
    stroke-linejoin: round;
    stroke-width: 3;
  }
`

export const ProviderGraph = () => (
  <Figure>
    <Svg
      viewBox='0 0 520 340'
      role='img'
      aria-labelledby='provider-graph-title'
    >
      <title id='provider-graph-title'>
        Illustrative distribution of antibot providers detected across blocked
        requests
      </title>
      <g transform='rotate(-90 260 170)'>
        {SLICES.map(({ id, color, dash, offset }) => (
          <circle
            key={id}
            className='slice'
            cx='260'
            cy='170'
            r='96'
            pathLength='100'
            stroke={color}
            strokeDasharray={dash}
            strokeDashoffset={offset}
          />
        ))}
      </g>
      <circle className='hole' cx='260' cy='170' r='54' />
      <text className='center' x='260' y='165'>
        blocked
      </text>
      <text className='center center--sub' x='260' y='190'>
        providers
      </text>
      <g>
        {LABELS.map(({ id, label, color, path, x, y }) => (
          <React.Fragment key={id}>
            <path className='leader' d={path} stroke={color} />
            <text className='label' x={x} y={y}>
              {label}
            </text>
          </React.Fragment>
        ))}
      </g>
    </Svg>
    <Box as='figcaption' css={theme({ pt: 3 })}>
      <Text
        as='span'
        css={theme({
          fontSize: 0,
          color: 'black60',
          fontFamily: 'mono'
        })}
      >
        Illustrative provider distribution across blocked requests.
      </Text>
    </Box>
  </Figure>
)
