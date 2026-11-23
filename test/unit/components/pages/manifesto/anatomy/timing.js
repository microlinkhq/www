import { describe, expect, test } from 'vitest'

import { writeText } from '../../../../../../src/components/pages/manifesto/anatomy/motion/timing'

const recording = initial => {
  let text = initial
  let writes = 0
  const node = {}
  Object.defineProperty(node, 'textContent', {
    get: () => text,
    set: value => {
      writes += 1
      text = value
    }
  })
  return {
    node,
    get text () {
      return text
    },
    get writes () {
      return writes
    }
  }
}

describe('writeText', () => {
  test('leaves a missing node alone', () => {
    expect(() => writeText(null, 'x')).not.toThrow()
    expect(() => writeText(undefined, 'x')).not.toThrow()
  })

  test('writes only when the text changes', () => {
    const readout = recording('kept')
    writeText(readout.node, 'kept')
    expect(readout.writes).toBe(0)
    writeText(readout.node, 'next')
    expect(readout.writes).toBe(1)
    expect(readout.text).toBe('next')
  })
})
