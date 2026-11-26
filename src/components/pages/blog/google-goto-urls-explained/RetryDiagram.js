import React from 'react'
import { colors } from 'theme'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

const HEADER_Y = 20
const HEADER_WIDTH = 200
const HEADER_HEIGHT = 44
const LIFELINE_END = 450
const WAIT_WIDTH = 160
const WAIT_HEIGHT = 40

export const ACTORS = {
  you: { x: 160, name: 'You', tone: 'focal' },
  api: { x: 480, name: 'Microlink API', tone: 'backend' },
  google: { x: 800, name: 'Google', tone: 'input' }
}

export const MESSAGES = [
  { from: 'you', to: 'api', y: 104, label: 'REQUEST' },
  { from: 'api', to: 'google', y: 144, label: 'OPEN GOTO LINK' },
  { from: 'google', to: 'api', y: 184, label: 'HOLD: WAIT N + NEXT LINK' },
  { from: 'api', to: 'you', y: 224, label: '503 RETRY-AFTER: N' },
  { from: 'you', to: 'api', y: 320, label: 'SAME REQUEST' },
  { from: 'api', to: 'google', y: 360, label: 'OPEN STORED NEXT LINK' },
  { from: 'google', to: 'api', y: 400, label: '302 → DESTINATION' },
  { from: 'api', to: 'you', y: 440, label: '200 DESTINATION' }
]

export const WAIT = { y: 252, name: 'wait N seconds' }

export const RetryDiagram = () => (
  <Diagram
    id='google-goto-retry'
    viewBox='0 0 960 470'
    title='How a retry finishes a held Google link'
    description='You send a request with a Google goto link. Microlink opens it, and Google holds it: wait N seconds, then open a second link. Microlink stores that second link and answers 503 with Retry-After N. You wait N seconds and send the same request again. Microlink opens the stored second link, Google redirects to the destination, and Microlink answers 200 with the destination.'
  >
    {Object.values(ACTORS).map(actor => (
      <line
        key={`${actor.name}-lifeline`}
        x1={actor.x}
        y1={HEADER_Y + HEADER_HEIGHT}
        x2={actor.x}
        y2={LIFELINE_END}
        stroke={colors.black30}
        strokeDasharray='4,3'
      />
    ))}
    {MESSAGES.map(({ from, to, y, label }) => (
      <Connector
        key={label}
        x1={ACTORS[from].x}
        y1={y}
        x2={ACTORS[to].x}
        y2={y}
        label={label}
      />
    ))}
    {Object.values(ACTORS).map(actor => (
      <Node
        key={actor.name}
        x={actor.x - HEADER_WIDTH / 2}
        y={HEADER_Y}
        width={HEADER_WIDTH}
        height={HEADER_HEIGHT}
        name={actor.name}
        tone={actor.tone}
      />
    ))}
    <Node
      x={ACTORS.you.x - WAIT_WIDTH / 2}
      y={WAIT.y}
      width={WAIT_WIDTH}
      height={WAIT_HEIGHT}
      name={WAIT.name}
      tone='optional'
    />
  </Diagram>
)
