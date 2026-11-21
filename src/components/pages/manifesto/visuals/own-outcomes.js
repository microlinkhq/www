import React from 'react'

import { Connector, Diagram, Nest, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

const STEPS = [
  { x: 28, name: 'Spot it' },
  { x: 140, name: 'Fix it' },
  { x: 252, name: 'Ship it' },
  { x: 364, name: 'Check it' }
]

const STEP_WIDTH = 88

export const OwnOutcomesVisual = () => (
  <Diagram
    id='manifesto-own-outcomes'
    viewBox='0 0 480 160'
    minWidth={MIN_WIDTH}
    title='Own outcomes'
    description='One person spots a problem, fixes it, ships it and checks the result, going back to the fix until it works.'
  >
    <Nest
      x={16}
      y={24}
      width={448}
      height={120}
      label='YOU OWN IT'
      tone='focal'
    />
    {STEPS.slice(1).map(({ x }) => (
      <Connector key={x} x1={x - 24} y1={72} x2={x} y2={72} />
    ))}
    <Connector
      d='M 408,96 V 104 Q 408,112 400,112 H 192 Q 184,112 184,104 V 96'
      dashed
      label='UNTIL IT WORKS'
      labelX={232}
      labelY={120}
    />
    {STEPS.map(({ x, name }) => (
      <Node
        key={name}
        x={x}
        y={48}
        width={STEP_WIDTH}
        height={48}
        tone='backend'
        name={name}
      />
    ))}
  </Diagram>
)
