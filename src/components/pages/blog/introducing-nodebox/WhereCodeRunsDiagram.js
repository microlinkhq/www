import React from 'react'

import { Connector, Diagram, Nest, Node } from 'components/patterns/Diagram'

const ROW_HEIGHT = 96
const ROW_GAP = 48
const FIRST_ROW_Y = 40
const BROWSER = { x: 40, width: 340 }
const REMOTE = { x: 560, width: 360 }
const INSET = 24
const INNER_HEIGHT = 56

export const APPROACHES = [
  {
    approach: 'SELF-HOSTED',
    editor: { name: 'Code sample', note: 'your editor widget', tone: 'input' },
    remote: {
      label: 'YOUR SERVERS',
      note: 'YOU HOST AND SCALE IT',
      name: 'Node.js',
      note2: 'your containers, your isolation, your bill',
      tone: 'backend'
    }
  },
  {
    approach: 'IN-BROWSER',
    editor: {
      name: 'Emulated Node.js',
      note: 'runtime downloaded first, fs and net are stand-ins',
      tone: 'optional'
    }
  },
  {
    approach: 'NODEBOX',
    editor: { name: 'Nodebox embed', note: 'one iframe', tone: 'focal' },
    remote: {
      label: 'MICROLINK',
      note: 'FRESH PER RUN',
      name: 'Node.js',
      note2: 'isolated sandbox, thrown away after the run',
      tone: 'focal'
    }
  }
]

const rowY = index => FIRST_ROW_Y + index * (ROW_HEIGHT + ROW_GAP)

export const VIEWBOX_HEIGHT =
  rowY(APPROACHES.length - 1) + ROW_HEIGHT + FIRST_ROW_Y

const Row = ({ index, approach, editor, remote }) => {
  const y = rowY(index)
  const innerY = y + (ROW_HEIGHT - INNER_HEIGHT) / 2
  const lineY = y + ROW_HEIGHT / 2
  return (
    <g>
      <Nest
        x={BROWSER.x}
        y={y}
        width={BROWSER.width}
        height={ROW_HEIGHT}
        label="READER'S BROWSER"
        note={approach}
        tone='outer'
      />
      <Node
        x={BROWSER.x + INSET}
        y={innerY}
        width={BROWSER.width - INSET * 2}
        height={INNER_HEIGHT}
        tone={editor.tone}
        name={editor.name}
        note={editor.note}
      />
      {remote && (
        <>
          <Connector
            x1={BROWSER.x + BROWSER.width - INSET}
            y1={lineY}
            x2={REMOTE.x + INSET}
            y2={lineY}
            label='CODE'
          />
          <Nest
            x={REMOTE.x}
            y={y}
            width={REMOTE.width}
            height={ROW_HEIGHT}
            label={remote.label}
            note={remote.note}
            tone='mid'
          />
          <Node
            x={REMOTE.x + INSET}
            y={innerY}
            width={REMOTE.width - INSET * 2}
            height={INNER_HEIGHT}
            tone={remote.tone}
            name={remote.name}
            note={remote.note2}
          />
        </>
      )}
    </g>
  )
}

export const WhereCodeRunsDiagram = () => (
  <Diagram
    id='where-code-runs'
    viewBox={`0 0 960 ${VIEWBOX_HEIGHT}`}
    title='Three ways to make a code sample runnable'
    description='A self-hosted sandbox sends the code from the reader’s browser to Node.js on your own servers, which you host, isolate and scale. An in-browser runtime downloads an emulated Node.js into the reader’s browser, where fs and net are stand-ins. Nodebox sends the code from one iframe to Microlink, which runs it on real Node.js in a fresh sandbox and throws the sandbox away after the run.'
  >
    {APPROACHES.map((row, index) => (
      <Row key={row.approach} index={index} {...row} />
    ))}
  </Diagram>
)
