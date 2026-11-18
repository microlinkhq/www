import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import Footer from '../../../../../src/components/patterns/Footer/Footer'

describe('footer', () => {
  test('links Nodebox next to the other hosted tools', () => {
    const html = renderMarkup(<Footer />)

    expect(html).toContain('href="https://nodebox.microlink.io"')
    expect(html).toContain('href="https://geolocation.microlink.io"')
    expect(html).toContain('>Nodebox<')
  })
})
