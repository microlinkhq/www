import { describe, expect, test } from 'vitest'
import React from 'react'

import { renderMarkup } from '../../../../utils/render-markup'
import ToolbarAccountAvatar from '../../../../../src/components/patterns/Toolbar/ToolbarAccountAvatar'

const CLERK_IMAGE = 'https://img.clerk.com/ada.png'

describe('toolbar account avatar', () => {
  test('shows the Clerk avatar and never asks unavatar', () => {
    const html = renderMarkup(
      <ToolbarAccountAvatar
        profile={{
          email: 'ada@example.com',
          name: 'Ada',
          imageUrl: CLERK_IMAGE
        }}
      />
    )

    expect(html).toContain(`src="${CLERK_IMAGE}"`)
    expect(html).not.toContain('unavatar')
  })

  test('shows the initial when Clerk has no avatar url', () => {
    const html = renderMarkup(
      <ToolbarAccountAvatar
        profile={{ email: 'ada@example.com', name: 'Ada', imageUrl: '' }}
      />
    )

    expect(html).not.toContain('<img')
    expect(html).toContain('>A<')
  })
})
