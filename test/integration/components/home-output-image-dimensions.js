import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/output.js'),
  'utf8'
)

describe('home output reserves media dimensions', () => {
  test('media boxes reserve a ratio-true box from intrinsic dimensions', () => {
    expect(source).toContain('const mediaBox = (width, height)')
    expect(source).toContain('min(100%, calc(')
    expect(source).toContain('MEDIA_MAX_HEIGHT')
    expect(source).toContain('aspectRatio: ')
    expect(source.match(/\.\.\.mediaBox\(width, height\)/g)).toHaveLength(2)
  })

  test('screenshot and animated outputs forward intrinsic dimensions', () => {
    expect(source).toContain(
      'const ImageOutput = ({ url, alt, width, height })'
    )
    expect(source).toContain('width={data.screenshot.width}')
    expect(source).toContain('height={data.screenshot.height}')
    expect(source).toContain('const AnimatedOutput = ({ url, width, height })')
    expect(source).toContain('width={data.screenshot.animated.width}')
    expect(source).toContain('height={data.screenshot.animated.height}')
  })

  const snapshotFile = path.join(
    process.cwd(),
    'static/data/hero-demo/screenshot.json'
  )

  test.skipIf(!fs.existsSync(snapshotFile))(
    'the bundled screenshot snapshot carries intrinsic dimensions',
    () => {
      const snapshot = JSON.parse(fs.readFileSync(snapshotFile))
      expect(snapshot.body.data.screenshot.width).toBeGreaterThan(0)
      expect(snapshot.body.data.screenshot.height).toBeGreaterThan(0)
    }
  )
})
