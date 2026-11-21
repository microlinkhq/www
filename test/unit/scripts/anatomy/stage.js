import { describe, expect, test } from 'vitest'

import { stageOf } from '../../../../scripts/anatomy/stage.mjs'

describe('stage markup', () => {
  test('keeps a plain title and lowercases the hint', () => {
    expect(
      stageOf(
        { title: 'Launch pad', hint: 'Hover to run the countdown' },
        '<svg/>'
      )
    ).toBe(
      '<div class="iso-stage" tabindex="0" role="group" aria-label="Launch pad: hover to run the countdown"><svg/></div>'
    )
  })

  test('escapes title and hint characters that would break the attribute', () => {
    expect(stageOf({ title: 'Say "go" <now>', hint: 'A & B' }, '<svg/>')).toBe(
      '<div class="iso-stage" tabindex="0" role="group" aria-label="Say &quot;go&quot; &lt;now&gt;: a &amp; b"><svg/></div>'
    )
  })
})
