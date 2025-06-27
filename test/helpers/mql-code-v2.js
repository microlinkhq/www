import { expect, test, describe } from 'vitest'
import { mqlCode } from '../../src/helpers/mql-code-v2.js'

describe('mql-code-v2', () => {
  const testUrl = 'https://github.com'

  test('should generate code snippets for a basic URL', () => {
    const result = mqlCode(testUrl)

    expect(result).toHaveProperty('CLI')
    expect(result).toHaveProperty('cURL')
    expect(result).toHaveProperty('JavaScript')
    expect(result).toHaveProperty('Python')
    expect(result).toHaveProperty('Ruby')
    expect(result).toHaveProperty('PHP')
    expect(result).toHaveProperty('Golang')
  })

  test('should generate correct CLI command', () => {
    const result = mqlCode(testUrl)
    expect(result.CLI).toBe('microlink https://github.com')
  })

  test('should generate correct curl command', () => {
    const result = mqlCode(testUrl)
    expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -d "url=https://github.com"`)
  })

  test('should generate correct JavaScript code', () => {
    const result = mqlCode(testUrl)
    expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com')`)
  })

  test('should generate JavaScript code with options', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

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
    expect(result.CLI).toBe('microlink https://github.com&screenshot&fullPage')
  })

  test('nested objects support in CLI', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.CLI).toBe(
      'microlink https://github.com&screenshot.type=jpeg&screenshot.quality=100&fullPage'
    )
  })

  test('nested objects support in curl', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -d "url=https://github.com" \\
  -d "screenshot.type=jpeg" \\
  -d "screenshot.quality=100" \\
  -d "fullPage=true"`)
  })

  test('should handle additional options in curl', () => {
    const result = mqlCode(testUrl, { screenshot: true, fullPage: true })
    expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -d "url=https://github.com" \\
  -d "screenshot=true" \\
  -d "fullPage=true"`)
  })

  test('should handle string options in CLI', () => {
    const result = mqlCode(testUrl, { viewport: '1920x1080' })
    expect(result.CLI).toBe('microlink https://github.com&viewport=1920x1080')
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
    expect(result.JavaScript).not.toBe(result.Python)
    expect(result.Python).not.toBe(result.Ruby)
    expect(result.CLI).not.toBe(result.cURL)
  })

  test('should generate valid code snippets for all languages', () => {
    const result = mqlCode(testUrl)

    // Each snippet should be a non-empty string and contain the URL (either encoded or not)
    Object.entries(result).forEach(([language, code]) => {
      expect(typeof code).toBe('string')
      expect(code.length).toBeGreaterThan(0)

      // For JavaScript, URL is passed as parameter to mql(), for others it's in query string
      if (language === 'JavaScript') {
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

  describe('apiKey special handling', () => {
    const testApiKey = 'my-api-key-123'

    test('should handle apiKey in JavaScript as option', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  "apiKey": "${testApiKey}",
  "screenshot": true
})`)
    })

    test('should handle apiKey in CLI as flag', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.CLI).toBe(
        `microlink https://github.com&screenshot --api-key ${testApiKey}`
      )
    })

    test('should handle apiKey in cURL as header', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -H "x-api-key: ${testApiKey}" \\
  -d "url=https://github.com" \\
  -d "screenshot=true"`)
    })

    test('should handle apiKey in Python with header', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey })

      // Python requests should include the x-api-key header
      expect(result.Python).toContain('x-api-key')
      expect(result.Python).toContain(testApiKey)
    })

    test('should not include apiKey in query parameters for non-JavaScript languages', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      // apiKey should not appear in the -d parameters for curl
      expect(result.cURL).not.toContain('-d "apiKey=')
      expect(result.cURL).not.toContain('-d "api-key=')

      // But should contain the header
      expect(result.cURL).toContain('-H "x-api-key:')
    })
  })
})
