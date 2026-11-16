import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'vitest'

const post = readFileSync(
  new URL(
    '../../../../src/content/blog/how-we-cut-our-kubernetes-image-pull-from-111s-to-25s.md',
    import.meta.url
  ),
  'utf8'
)

describe('how we cut our kubernetes image pull', () => {
  test('deletes the new pod only when a scale-down happens inside the short window', () => {
    expect(post).toContain(
      'When a scale-down happens inside a window shorter than a cold start, the pod a new node was bought for can be the one that goes.'
    )
  })

  test('reads the pull on a newly provisioned node whose layers are absent', () => {
    expect(post).toContain(
      "Read it on a newly provisioned node, after you check that this image's layers are absent."
    )
  })

  test('says a node can still hold layers from an earlier pull or another image', () => {
    expect(post).toContain(
      'A node can still hold those layers from an earlier pull, or from another image that shares them'
    )
  })

  test('does not call the gap between two pull durations decompression', () => {
    expect(post).toContain(
      'The two durations do not say how much of that gap is decompression.'
    )
    expect(post).not.toContain('most of that gap is decompression')
  })
})
