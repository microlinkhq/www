import { expect, test, describe } from 'vitest'
import { mqlCode } from '../../src/helpers/mql-code-v2.js'

describe('mql-code-v2', () => {
  const testUrl = 'https://github.com'

  test('should generate code snippets for a basic URL', () => {
    const result = mqlCode(testUrl)

    expect(result).toHaveProperty('cli')
    expect(result).toHaveProperty('curl')
    expect(result).toHaveProperty('javascript')
    expect(result).toHaveProperty('python')
    expect(result).toHaveProperty('ruby')
    expect(result).toHaveProperty('php')
    expect(result).toHaveProperty('go')
  })

  test('should generate correct CLI command', () => {
    const result = mqlCode(testUrl)
    expect(result.cli).toBe('microlink https://github.com')
  })

  test('should generate correct curl command', () => {
    const result = mqlCode(testUrl)
    expect(result.curl).toBe(
      'curl "https://api.microlink.io?url=https%3A%2F%2Fgithub.com"'
    )
  })

  test('should generate correct JavaScript code', () => {
    const result = mqlCode(testUrl)
    expect(result.javascript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com')`)
  })

  test('should generate JavaScript code with options', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.javascript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  "screenshot": {
    "type": "jpeg",
    "quality": 100
  },
  "fullPage": true
})`)
  })

  test('should handle additional options in CLI', () => {
    const result = mqlCode(testUrl, { screenshot: true, fullPage: true })
    expect(result.cli).toBe('microlink https://github.com&screenshot&fullPage')
  })

  test('nested objects support in CLI', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.cli).toBe(
      'microlink https://github.com&screenshot.type=jpeg&screenshot.quality=100&fullPage'
    )
  })

  test('nested objects support in curl', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.curl).toBe(
      'curl "https://api.microlink.io?url=https%3A%2F%2Fgithub.com&screenshot.type=jpeg&screenshot.quality=100&fullPage=true"'
    )
  })

  test('should handle additional options in curl', () => {
    const result = mqlCode(testUrl, { screenshot: true, fullPage: true })
    expect(result.curl).toBe(
      'curl "https://api.microlink.io?url=https%3A%2F%2Fgithub.com&screenshot=true&fullPage=true"'
    )
  })

  test('should handle string options in CLI', () => {
    const result = mqlCode(testUrl, { viewport: '1920x1080' })
    expect(result.cli).toBe('microlink https://github.com&viewport=1920x1080')
  })

  test('should throw error for invalid URL', () => {
    expect(() => mqlCode()).toThrow(
      'URL parameter is required and must be a string'
    )
    expect(() => mqlCode(123)).toThrow(
      'URL parameter is required and must be a string'
    )
    expect(() => mqlCode('')).toThrow(
      'URL parameter is required and must be a string'
    )
  })

  test('should generate different code snippets', () => {
    const result = mqlCode(testUrl)

    // Verify that different language snippets are actually different
    expect(result.javascript).not.toBe(result.python)
    expect(result.python).not.toBe(result.ruby)
    expect(result.cli).not.toBe(result.curl)
  })

  test('should generate valid code snippets for all languages', () => {
    const result = mqlCode(testUrl)

    // Each snippet should be a non-empty string and contain the URL (either encoded or not)
    Object.entries(result).forEach(([language, code]) => {
      expect(typeof code).toBe('string')
      expect(code.length).toBeGreaterThan(0)

      // For JavaScript, URL is passed as parameter to mql(), for others it's in query string
      if (language === 'javascript') {
        expect(code).toContain("'https://github.com'")
      } else {
        // URL might be encoded in some formats (like curl)
        const containsUrl =
          code.includes('https://github.com') ||
          code.includes('https%3A%2F%2Fgithub.com')
        expect(containsUrl).toBe(true)
      }
    })
  })
})
