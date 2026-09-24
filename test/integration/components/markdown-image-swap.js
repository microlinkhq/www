import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = filepath =>
  fs.readFileSync(path.join(process.cwd(), filepath), 'utf8')

const source = read('src/components/markdown/Image.js')
const styles = read('src/styles/main.scss')

describe('markdown Image hover swap', () => {
  test('stacks both frames so hovering never refetches', () => {
    expect(source).toContain("data-icon='a'")
    expect(source).toContain("data-icon='b'")
    expect(source).toContain('src={src}')
    expect(source).toContain('src={hoverSrc}')
    expect(source).not.toContain('isHovered && hoverSrc ? hoverSrc : src')
  })

  test('drives the icon swap through data-state', () => {
    expect(source).toContain("className='t-icon-swap'")
    expect(source).toContain("data-state={isHovered ? 'b' : 'a'}")
    expect(source).toContain('onMouseEnter')
    expect(source).toContain('onMouseLeave')
  })

  test('pins the frame because both photos are the same shot', () => {
    expect(source).toContain('--icon-swap-start-scale: 1')
  })

  test('keeps a plain image unwrapped when there is no hover frame', () => {
    expect(source).toContain(
      'if (props.hoverSrc) return <HoverSwapImageWithContainer'
    )
    expect(source).toContain('return <ImageWithContainer {...props} />')
  })

  test('installs the icon swap transition with its reduced motion guard', () => {
    expect(styles).toContain('--icon-swap-dur: 250ms')
    expect(styles).toContain('--icon-swap-blur: 2px')
    expect(styles).toContain('--icon-swap-ease: ease-in-out')
    expect(styles).toContain('grid-area: 1 / 1')
    expect(styles).toContain('will-change: opacity, filter, transform')

    const guard = styles.slice(
      styles.lastIndexOf('@media (prefers-reduced-motion: reduce)')
    )
    expect(guard).toContain(
      '.t-icon-swap .t-icon { transition: none !important; }'
    )
  })
})
