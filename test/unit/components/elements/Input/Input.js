import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { describe, expect, test } from 'vitest'
import themeSpec, { colors } from '../../../../../src/theme'
import Input from '../../../../../src/components/elements/Input/Input'

const render = props => {
  const sheet = new ServerStyleSheet()
  try {
    const markup = renderToStaticMarkup(
      sheet.collectStyles(
        <ThemeProvider theme={themeSpec}>
          <Input {...props} />
        </ThemeProvider>
      )
    )
    return { markup, css: sheet.getStyleTags() }
  } finally {
    sheet.seal()
  }
}

const inputTag = markup => markup.match(/<input\b[^>]*>/)[0]
const attribute = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1]

describe('Input', () => {
  test('without a label it renders the bare field and keeps the placeholder', () => {
    const { markup } = render({ placeholder: 'you@domain.com' })
    expect(attribute(inputTag(markup), 'placeholder')).toBe('you@domain.com')
    expect(markup.startsWith('<label')).toBe(true)
    expect(markup).not.toContain('<span')
  })

  test('the floating label text names the input through the wrapping label', () => {
    const { markup } = render({
      label: 'Website URL',
      placeholder: 'example.com'
    })
    expect(markup).toMatch(
      /^<label\b[\s\S]*<input\b[\s\S]*<span\b[^>]*>Website URL<\/span>[\s\S]*<\/label>$/
    )
    expect(attribute(inputTag(markup), 'placeholder')).toBe('example.com')
  })

  test('a label without a placeholder still gets one, so :placeholder-shown can detect an empty field', () => {
    const { markup } = render({ label: 'Email' })
    expect(attribute(inputTag(markup), 'placeholder')).toBe(' ')
  })

  test('the hint renders under the field and is announced through aria-describedby', () => {
    const { markup } = render({
      label: 'Extra recipients',
      hint: 'Comma-separated emails'
    })
    const hintId = attribute(
      markup.match(/<div[^>]*>Comma-separated emails<\/div>/)[0],
      'id'
    )
    expect(hintId).toBeTruthy()
    expect(attribute(inputTag(markup), 'aria-describedby')).toBe(hintId)
    expect(markup.indexOf('</label>')).toBeLessThan(
      markup.indexOf('Comma-separated emails')
    )
  })

  test('the hint id is appended to a caller aria-describedby instead of replacing it', () => {
    const { markup } = render({ hint: 'Help', 'aria-describedby': 'url-error' })
    expect(attribute(inputTag(markup), 'aria-describedby')).toMatch(
      /^url-error \S+-hint$/
    )
  })

  test('without a hint there is no describedby and no extra wrapper', () => {
    const { markup } = render({ label: 'Email' })
    expect(inputTag(markup)).not.toContain('aria-describedby')
    expect(markup.startsWith('<label')).toBe(true)
  })

  test('focus paints the dashboard ring: link border plus a 3px link-tinted ring', () => {
    const { css } = render({ label: 'Email' })
    expect(css).toContain(`border-color:${colors.link}`)
    expect(css).toContain(
      `box-shadow:0 0 0 3px color-mix(in oklch, ${colors.link} 20%, transparent)`
    )
  })

  test('the resting label is muted gray, not the contrast color bg injects', () => {
    const { css } = render({ label: 'Email' })
    const labelRule = css.match(/\{[^}]*text-overflow:ellipsis[^}]*\}/)[0]
    const colorsInRule = [
      ...labelRule.matchAll(/(?:^|[;{])color:([^;}]+)/g)
    ].map(m => m[1])
    expect(colorsInRule.at(-1)).toBe(colors.black60)
  })

  test('invalid and disabled states are driven by the input attributes', () => {
    const { css } = render({ label: 'Email' })
    expect(css).toContain(":has(input[aria-invalid='true'])")
    expect(css).toContain(`border-color:${colors.red8}`)
    expect(css).toContain(':has(input:disabled)')
  })

  test('the label raises on focus, on a value, and on autofill, using transforms only', () => {
    const { css } = render({ label: 'Email' })
    expect(css).toMatch(/input:focus~\.[\w-]+>\.[\w-]+/)
    expect(css).toMatch(/input:not\(:placeholder-shown\)~\.[\w-]+>\.[\w-]+/)
    expect(css).toMatch(/input:autofill~\.[\w-]+>\.[\w-]+/)
    expect(css).toContain(
      'transform:translate(-12px, calc(-50cqh - 0.5px)) scale(0.92)'
    )
    expect(css).not.toMatch(/transition:[^;}]*\b(top|left|all)\b/)
  })
})
