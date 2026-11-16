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
      'When a scale-down happens inside a window shorter than a cold start, the pod a new node was bought for is the one that goes.'
    )
  })

  test('reads the pull on a node provisioned before any pull', () => {
    expect(post).toContain('Read it on a node provisioned before any pull.')
  })

  test('says a node can still hold layers shared with another image', () => {
    expect(post).toContain(
      'A node that has not pulled this image can still hold layers it shares with another image'
    )
  })

  test('does not call the gap between two pull durations decompression', () => {
    expect(post).toContain(
      'The two durations do not say how much of that gap is decompression.'
    )
    expect(post).not.toContain('most of that gap is decompression')
  })
})
