import { describe, expect, it } from 'vitest'

import { mapPath } from '../../../scripts/build-feature-icons'

const NUMBER = /-?(?:\d+\.?\d*|\.\d+)/g
const POINTS_PER_SEGMENT = { m: 1, l: 1, c: 3 }

const toAbsolute = d => {
  let current = [0, 0]
  let subpathStart = current
  const commands = []
  for (const [, command, body] of d.matchAll(/([mlcz])([^mlcz]*)/g)) {
    if (command === 'z') {
      current = subpathStart
      commands.push(['Z'])
      continue
    }
    const numbers = (body.match(NUMBER) || []).map(Number)
    const perSegment = POINTS_PER_SEGMENT[command]
    for (let i = 0; i < numbers.length; i += perSegment * 2) {
      const points = []
      for (let j = 0; j < perSegment; j++) {
        points.push([
          current[0] + numbers[i + j * 2],
          current[1] + numbers[i + j * 2 + 1]
        ])
      }
      const end = points[points.length - 1]
      if (command === 'm' && i === 0) subpathStart = end
      commands.push([command.toUpperCase(), ...points])
      current = end
    }
  }
  return commands
}

const identity = point => point

const expectSamePath = (actual, expected) => {
  expect(actual).toHaveLength(expected.length)
  actual.forEach(([command, ...points], index) => {
    expect(command).toBe(expected[index][0])
    points.forEach(([x, y], p) => {
      expect(x).toBeCloseTo(expected[index][p + 1][0], 1)
      expect(y).toBeCloseTo(expected[index][p + 1][1], 1)
    })
  })
}

describe('mapPath', () => {
  it('keeps every subpath of a closed multi-part silhouette', () => {
    const d = mapPath('M10 10L20 10L20 20ZM40.5 40L50 40L50 52.25Z', identity)
    expect(d).not.toMatch(/NaN/)
    expectSamePath(toAbsolute(d), [
      ['M', [10, 10]],
      ['L', [20, 10]],
      ['L', [20, 20]],
      ['Z'],
      ['M', [40.5, 40]],
      ['L', [50, 40]],
      ['L', [50, 52.3]],
      ['Z']
    ])
  })

  it('round-trips curves and implicit segments without drift', () => {
    const d = mapPath(
      'M0 0C1.04 2 3 4.96 5 5C7 5 9 4 10 0L11.11 -3.33 12.5 -6',
      identity
    )
    expectSamePath(toAbsolute(d), [
      ['M', [0, 0]],
      ['C', [1, 2], [3, 5], [5, 5]],
      ['C', [7, 5], [9, 4], [10, 0]],
      ['L', [11.1, -3.3]],
      ['L', [12.5, -6]]
    ])
  })

  it('applies the coordinate map to every point', () => {
    const d = mapPath('M1 1L2 2Z', ([x, y]) => [x * 10, y + 100])
    expectSamePath(toAbsolute(d), [['M', [10, 101]], ['L', [20, 102]], ['Z']])
  })
})
