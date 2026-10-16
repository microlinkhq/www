import { expect, test } from 'vitest'

import {
  VALIDATOR_STATUS_OK,
  buildLlmRepairPrompt,
  validate
} from '../../../../../../../src/components/pages/sharing-debugger/metatags/validators'

const METADATA_WITHOUT_IMAGE = {
  publisher: 'example.com',
  title: 'Example Domain',
  lang: 'en',
  url: 'https://example.com/',
  image: null,
  date: null,
  author: null,
  description:
    'This domain is for use in documentation examples without needing permission. This is not a service; avoid relying on it for testing and monitoring purposes.',
  logo: null
}

test('uses one card type across every per-issue snippet', () => {
  const issues = validate(METADATA_WITHOUT_IMAGE).filter(
    ({ status }) => status !== VALIDATOR_STATUS_OK
  )

  const prompt = buildLlmRepairPrompt({
    issues,
    metadata: METADATA_WITHOUT_IMAGE
  })

  const cardValues = new Set(
    [...prompt.matchAll(/name="twitter:card" content="([^"]+)"/g)].map(
      ([, value]) => value
    )
  )

  expect([...cardValues]).toEqual(['summary_large_image'])
})
