import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'
import { sdkCall, sdkPreamble } from '../../src/helpers/mql-code'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/patterns/NerdStats/NerdStats.js'),
  'utf8'
)

describe('nerd-stats query', () => {
  test('buildSdkQuery composes the preamble and call for both apiKey states', () => {
    expect(source).toContain(
      "import { sdkCall, sdkPreamble } from 'helpers/mql-code'"
    )
    expect(source).toContain(`export const buildSdkQuery = (url, opts) => {
  const { apiKey, ...rest } = opts
  return \`\${sdkPreamble(apiKey && 'MICROLINK_API_KEY')}

\${sdkCall(url, rest)}\`
}`)
  })

  test('the composition renders an executable query without apiKey', () => {
    const query = `${sdkPreamble(undefined && 'MICROLINK_API_KEY')}

${sdkCall('https://example.com', { screenshot: true })}`

    expect(query).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://example.com')`)
  })

  test('the composition renders an executable query with the apiKey masked', () => {
    const query = `${sdkPreamble('secret-key' && 'MICROLINK_API_KEY')}

${sdkCall('https://example.com', { screenshot: true })}`

    expect(query).toBe(`import createClient from 'microlink.io'

const microlink = createClient({ apiKey: 'MICROLINK_API_KEY' })

const { url } = await microlink.screenshot('https://example.com')`)
    expect(query).not.toContain('secret-key')
  })
})
