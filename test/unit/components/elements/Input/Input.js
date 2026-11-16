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
      'transform:translate(calc(-6px - var(--label-rest-inset)), calc(-50cqh - 0.5px)) scale(0.92)'
    )
    expect(css).not.toMatch(/transition:[^;}]*\b(top|left|all)\b/)
  })

  test('the label rests on the input text and rises to the field edge', () => {
    const { css } = render({ label: 'Email' })
    expect(css).toContain('--label-rest-inset:6px')
  })

  test('with an icon the label rests after the icon slot and still rises to the field edge', () => {
    const { markup, css } = render({
      label: 'Site URL',
      iconComponent: <svg data-icon />
    })
    expect(css).toContain('--label-rest-inset:30px')
    expect(markup.indexOf('data-icon')).toBeLessThan(markup.indexOf('<input'))
    expect(markup.match(/<svg data-icon/g)).toHaveLength(1)
  })

  test('without a label the icon keeps its natural width', () => {
    const { css } = render({ iconComponent: <svg data-icon /> })
    expect(css).not.toContain('flex:0 0 24px')
  })

  test('the input is named by the label text alone, even with a trailing control inside the field', () => {
    const { markup } = render({
      label: 'URL',
      children: <button type='submit'>Convert</button>
    })
    const labelId = attribute(markup.match(/<span[^>]*>URL<\/span>/)[0], 'id')
    expect(attribute(inputTag(markup), 'aria-labelledby')).toBe(labelId)
    expect(markup).toMatch(
      /<input\b[\s\S]*<button type="submit">Convert<\/button><\/label>$/
    )
  })

  test('raised keeps the label on the border and the placeholder visible at rest', () => {
    const resting = render({ label: 'URL', placeholder: 'https://' }).css
    const raised = render({
      label: 'URL',
      placeholder: 'https://',
      raised: true
    }).css
    expect(resting).not.toMatch(/\{[^}]*::placeholder\{opacity:1;?\}/)
    expect(raised).toMatch(/input::placeholder\{opacity:1;?\}/)
    expect(raised).toMatch(/\.[\w-]+ \.[\w-]+>\.[\w-]+\{[^}]*scale\(0\.92\)/)
  })

  test('without a label there is no aria-labelledby', () => {
    expect(inputTag(render({}).markup)).not.toContain('aria-labelledby')
  })

  test('outer styles cannot shift the label or center the typed text', () => {
    const { css } = render({ label: 'API key' })
    expect(css).toMatch(/(\.[\w-]+){3}\{padding-left:2px;padding-right:2px;?\}/)
    expect(css).toContain('text-align:left')
  })

  test('a raised label may grow into the room its shift and the field padding free', () => {
    const { css } = render({ label: 'Seconds' })
    expect(css).toContain(
      'max-width:calc((100% + var(--label-rest-inset) + 18px) / 0.92)'
    )
    expect(css).toMatch(/flex-shrink:0;max-width:calc\(/)
  })

  test('an explicit aria-label still names the input when a visible label is set', () => {
    const tag = inputTag(
      render({ label: 'Pixels', 'aria-label': 'Border width in pixels' }).markup
    )
    expect(attribute(tag, 'aria-label')).toBe('Border width in pixels')
    expect(tag).not.toContain('aria-labelledby')
  })
})
