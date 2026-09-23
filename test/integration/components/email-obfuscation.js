import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = relpath =>
  fs.readFileSync(path.join(process.cwd(), relpath), 'utf8')

describe('email obfuscation', () => {
  test('the Email element wraps addresses in Cloudflare email_off comments', () => {
    const source = read('src/components/elements/Email.js')
    expect(source).toContain('<!--email_off-->')
    expect(source).toContain('<!--/email_off-->')
    expect(source).toContain('dangerouslySetInnerHTML')
  })

  test('no SSR page renders a bare email text node Cloudflare would rewrite', () => {
    const files = [
      'src/components/patterns/Footer/Footer.js',
      'src/components/pages/home/faqs.js',
      'src/components/patterns/NerdStats/NerdStats.js'
    ]
    for (const file of files) {
      const source = read(file)
      expect(source).toContain("from 'components/elements/Email'")
      const stripped = source.replace(/<Email[\s\S]*?<\/Email>/g, '')
      for (const line of stripped.split('\n')) {
        const jsxText = /^[^/]*>[^<]*hello@microlink\.io[^>]*</.test(line)
        const bareText = /^\s*(Say hi at )?hello@microlink\.io\s*$/.test(line)
        expect(jsxText || bareText, `${file}: ${line.trim()}`).toBe(false)
      }
    }
  })
})
