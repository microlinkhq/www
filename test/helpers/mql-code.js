import { expect, test, describe } from 'vitest'
import { mqlCode } from '../../src/helpers/mql-code'

describe('mql-code', () => {
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
  screenshot: {
    type: "jpeg",
    quality: 100
  },
  fullPage: true
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

  test('should handle quotes in CLI parameter values', () => {
    const result = mqlCode('https://microlink.io', {
      function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
      scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
    })
    expect(result.CLI).toBe(
      'microlink https://microlink.io&function=\'({ page }) => page.evaluate("jQuery.fn.jquery")\'&scripts=https://code.jquery.com/jquery-3.5.0.min.js'
    )
  })

  test('should handle values with spaces in CLI', () => {
    const result = mqlCode(testUrl, {
      function: '({ page }) => page.title()',
      device: 'iPhone 12 Pro'
    })
    expect(result.CLI).toBe(
      "microlink https://github.com&function='({ page }) => page.title()'&device='iPhone 12 Pro'"
    )
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

  describe('quote handling in JavaScript', () => {
    test('should handle double quotes in string values by using single quotes', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
})`)
    })

    test('should handle single quotes in string values by using double quotes', () => {
      const result = mqlCode(testUrl, {
        function: "({ page }) => page.evaluate('jQuery.fn.jquery')"
      })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  function: "({ page }) => page.evaluate('jQuery.fn.jquery')"
})`)
    })

    test('should escape double quotes when string contains both quote types', () => {
      const result = mqlCode(testUrl, {
        function:
          '({ page }) => page.evaluate("jQuery.fn.jquery") && page.evaluate(\'version\')'
      })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  function: "({ page }) => page.evaluate(\\"jQuery.fn.jquery\\") && page.evaluate('version')"
})`)
    })

    test('should handle complex JavaScript function with embedded quotes', () => {
      const result = mqlCode('https://microlink.io', {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
        scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
      })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://microlink.io', {
  function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
  scripts: [
    "https://code.jquery.com/jquery-3.5.0.min.js"
  ]
})`)
    })
  })

  describe('URL encoding in curl commands', () => {
    test('should URL encode values with spaces in curl commands', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
        scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
      })

      expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -d "url=https://github.com" \\
  -d "function=(%7B%20page%20%7D)%20%3D%3E%20page.evaluate(%22jQuery.fn.jquery%22)" \\
  -d "scripts=https://code.jquery.com/jquery-3.5.0.min.js"`)
    })

    test('should not URL encode values without spaces in curl commands', () => {
      const result = mqlCode(testUrl, {
        screenshot: true,
        device: 'iPhone'
      })

      expect(result.cURL).toBe(`curl -G "https://api.microlink.io" \\
  -d "url=https://github.com" \\
  -d "screenshot=true" \\
  -d "device=iPhone"`)
    })

    test('should URL encode complex function parameters with spaces', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => { const title = page.title(); return title; }'
      })

      expect(result.cURL).toContain(
        'function=(%7B%20page%20%7D)%20%3D%3E%20%7B%20const%20title%20%3D%20page.title()%3B%20return%20title%3B%20%7D'
      )
    })

    test('should handle mixed parameters with and without spaces', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.title()',
        device: 'iPhone',
        fullPage: true
      })

      const curlCommand = result.cURL
      expect(curlCommand).toContain(
        'function=(%7B%20page%20%7D)%20%3D%3E%20page.title()'
      )
      expect(curlCommand).toContain('device=iPhone')
      expect(curlCommand).toContain('fullPage=true')
    })
  })

  describe('apiKey special handling', () => {
    const testApiKey = 'my-api-key-123'

    test('should handle apiKey in JavaScript as option', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.JavaScript).toBe(`import mql from '@microlink/mql'

const { data } = await mql('https://github.com', {
  apiKey: "${testApiKey}",
  screenshot: true
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

    test('should handle apiKey in Ruby with header', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey })

      // Ruby should include the x-api-key header
      expect(result.Ruby).toContain('x-api-key')
      expect(result.Ruby).toContain(testApiKey)
      expect(result.Ruby).toContain("request['x-api-key'] = ")
    })

    test('should handle apiKey in PHP with header', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey })

      // PHP should include the x-api-key header
      expect(result.PHP).toContain('x-api-key')
      expect(result.PHP).toContain(testApiKey)
      expect(result.PHP).toContain('CURLOPT_HTTPHEADER')
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

  describe('quote handling in other languages', () => {
    test('should properly handle quotes in Python code with triple quotes', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      // Python should have the function parameter with triple quotes for complex strings
      expect(result.Python).toContain('jQuery.fn.jquery')
      expect(result.Python).toContain('querystring = {')
      expect(result.Python).toContain('import requests')
      expect(result.Python).toContain(
        'response = requests.get(url, params=querystring)'
      )
      expect(result.Python).toContain('print(response.json())')
      // Check that triple quotes are used for strings with quotes
      expect(result.Python).toContain(
        "'''({ page }) => page.evaluate(\"jQuery.fn.jquery\")'''"
      )
    })

    test('should generate Ruby code with individual query parameters', () => {
      const result = mqlCode('https://microlink.io', {
        screenshot: true,
        device: 'iPhone',
        fullPage: true
      })

      // Ruby should have individual parameters in the params hash
      expect(result.Ruby).toContain('params = {')
      expect(result.Ruby).toContain('url: "https://microlink.io"')
      expect(result.Ruby).toContain('screenshot: "true"')
      expect(result.Ruby).toContain('device: "iPhone"')
      expect(result.Ruby).toContain('fullPage: "true"')
      expect(result.Ruby).toContain('uri.query = URI.encode_www_form(params)')
      expect(result.Ruby).toContain("require 'uri'")
      expect(result.Ruby).toContain("require 'net/http'")
      expect(result.Ruby).toContain('http.use_ssl = true')
      expect(result.Ruby).toContain('response = http.request(request)')
      expect(result.Ruby).toContain('puts response.body')
    })

    test('should generate PHP code with individual query parameters', () => {
      const result = mqlCode('https://microlink.io', {
        screenshot: true,
        device: 'iPhone',
        fullPage: true
      })

      // PHP should have individual parameters in the params array
      expect(result.PHP).toContain('$params = [')
      expect(result.PHP).toContain('"url" => "https://microlink.io"')
      expect(result.PHP).toContain('"screenshot" => "true"')
      expect(result.PHP).toContain('"device" => "iPhone"')
      expect(result.PHP).toContain('"fullPage" => "true"')
      expect(result.PHP).toContain('$query = http_build_query($params);')
      expect(result.PHP).toContain('$curl = curl_init();')
      expect(result.PHP).toContain('curl_setopt_array($curl, [')
      expect(result.PHP).toContain('CURLOPT_URL => $url')
      expect(result.PHP).toContain('$response = curl_exec($curl);')
      expect(result.PHP).toContain('echo $response;')
    })

    test('should handle quotes in Ruby code with individual parameters', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      // Ruby should have individual parameters with proper quote handling
      expect(result.Ruby).toContain(
        'function: \'({ page }) => page.evaluate("jQuery.fn.jquery")\''
      )
      expect(result.Ruby).toContain('params = {')
      expect(result.Ruby).toContain('uri.query = URI.encode_www_form(params)')
      expect(result.Ruby).toContain("require 'uri'")
      expect(result.Ruby).toContain("require 'net/http'")
      expect(result.Ruby).toContain('response = http.request(request)')
      expect(result.Ruby).toContain('puts response.body')
    })

    test('should handle quotes in Golang code with backticks', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      // Golang should use backticks for function parameter containing quotes
      expect(result.Golang).toContain(
        'fn := `({ page }) => page.evaluate("jQuery.fn.jquery")`'
      )
      expect(result.Golang).toContain('q.Set("function", fn)')
      expect(result.Golang).toContain('q.Set("url",')
      expect(result.Golang).toContain('baseURL := "https://api.microlink.io"')
    })

    test('should generate Golang code with individual query parameters instead of encoded URL', () => {
      const result = mqlCode('https://microlink.io', {
        screenshot: true,
        device: 'iPhone',
        fullPage: true
      })

      // Should use individual q.Set() calls
      expect(result.Golang).toContain('q.Set("url", "https://microlink.io")')
      expect(result.Golang).toContain('q.Set("screenshot", "true")')
      expect(result.Golang).toContain('q.Set("device", "iPhone")')
      expect(result.Golang).toContain('q.Set("fullPage", "true")')

      // Should use net/url package
      expect(result.Golang).toContain(
        'import (\n    "fmt"\n    "net/http"\n    "net/url"\n    "io"\n)'
      )
      expect(result.Golang).toContain('q := u.Query()')
      expect(result.Golang).toContain('u.RawQuery = q.Encode()')

      // Should NOT have long encoded URL string
      expect(result.Golang).not.toContain('url := "https://api.microlink.io/?')

      // Should NOT use backticks for simple parameters (no quotes)
      expect(result.Golang).not.toContain('`true`')
      expect(result.Golang).not.toContain('`iPhone`')
      expect(result.Golang).not.toContain('`https://microlink.io`')
    })

    test('should use backticks for complex parameters with quotes in Golang', () => {
      const result = mqlCode('https://microlink.io', {
        function: '({ page }) => page.evaluate("document.title")',
        selector: 'h1[title="main heading"]',
        device: 'iPhone'
      })

      // Should use backticks for parameters containing quotes
      expect(result.Golang).toContain(
        'fn := `({ page }) => page.evaluate("document.title")`'
      )
      expect(result.Golang).toContain(
        'selectorParam := `h1[title="main heading"]`'
      )

      // Should reference the variables in q.Set calls
      expect(result.Golang).toContain('q.Set("function", fn)')
      expect(result.Golang).toContain('q.Set("selector", selectorParam)')

      // Simple parameter should remain inline
      expect(result.Golang).toContain('q.Set("device", "iPhone")')
    })

    test('should handle quotes in PHP code with individual parameters', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      // PHP should have individual parameters with proper quote handling
      expect(result.PHP).toContain(
        '"function" => \'({ page }) => page.evaluate("jQuery.fn.jquery")\''
      )
      expect(result.PHP).toContain('$params = [')
      expect(result.PHP).toContain('$query = http_build_query($params);')
      expect(result.PHP).toContain('<?php')
      expect(result.PHP).toContain('$curl = curl_init();')
      expect(result.PHP).toContain('curl_setopt_array($curl, [')
      expect(result.PHP).toContain('$response = curl_exec($curl);')
      expect(result.PHP).toContain('echo $response;')
    })
  })
})
