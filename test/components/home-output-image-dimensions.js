import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/output.js'),
  'utf8'
)

describe('home output reserves media dimensions', () => {
  test('screenshot image forwards intrinsic width and height', () => {
    expect(source).toContain(
      'const ImageOutput = ({ url, alt, contain, width, height })'
    )
    expect(source).toContain('width={data.screenshot.width}')
    expect(source).toContain('height={data.screenshot.height}')
  })

  test('animated video forwards intrinsic width and height', () => {
    expect(source).toContain('const AnimatedOutput = ({ url, width, height })')
    expect(source).toContain('width={data.screenshot.animated.width}')
    expect(source).toContain('height={data.screenshot.animated.height}')
  })

  test('the bundled screenshot snapshot carries intrinsic dimensions', () => {
    const snapshot = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'static/data/hero-demo/screenshot.json')
      )
    )
    expect(snapshot.body.data.screenshot.width).toBeGreaterThan(0)
    expect(snapshot.body.data.screenshot.height).toBeGreaterThan(0)
  })
})
