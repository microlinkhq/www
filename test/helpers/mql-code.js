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
    expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { title, description, image } =
  await microlink.metadata('https://github.com')`)
  })

  test('should generate JavaScript code with options', () => {
    const result = mqlCode(testUrl, {
      screenshot: { type: 'jpeg', quality: 100 },
      fullPage: true
    })
    expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com', {
  type: "jpeg",
  quality: 100,
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

  describe('function emission in JavaScript', () => {
    test('should emit run with the function as a raw literal', () => {
      const result = mqlCode(testUrl, {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run(
  'https://github.com',
  ({ page }) => page.evaluate("jQuery.fn.jquery")
)`)
    })

    test('should keep single quotes inside the raw function literal', () => {
      const result = mqlCode(testUrl, {
        function: "({ page }) => page.evaluate('jQuery.fn.jquery')"
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run(
  'https://github.com',
  ({ page }) => page.evaluate('jQuery.fn.jquery')
)`)
    })

    test('should keep mixed quote types inside the raw function literal', () => {
      const result = mqlCode(testUrl, {
        function:
          '({ page }) => page.evaluate("jQuery.fn.jquery") && page.evaluate(\'version\')'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run(
  'https://github.com',
  ({ page }) => page.evaluate("jQuery.fn.jquery") && page.evaluate('version')
)`)
    })

    test('should keep a short function call on a single line', () => {
      const result = mqlCode(testUrl, { function: '() => 42' })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run('https://github.com', () => 42)`)
    })

    test('should pass remaining options as the third run argument', () => {
      const result = mqlCode('https://microlink.io', {
        function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
        scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run(
  'https://microlink.io',
  ({ page }) => page.evaluate("jQuery.fn.jquery"),
  {
    scripts: [
      "https://code.jquery.com/jquery-3.5.0.min.js"
    ]
  }
)`)
    })

    test('should keep a page-preparation function as a string option', () => {
      const result = mqlCode(testUrl, {
        screenshot: true,
        function: '({ page }) => page.click("#btn")'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com', {
  function: '({ page }) => page.click("#btn")'
})`)
    })
  })

  describe('SDK method translation in JavaScript', () => {
    test('meta object narrows the metadata destructuring', () => {
      const result = mqlCode(testUrl, {
        meta: { title: true, description: true }
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { title, description } = await microlink.metadata('https://github.com')`)
    })

    test('filter narrows the metadata destructuring', () => {
      const result = mqlCode(testUrl, { filter: 'title,description' })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { title, description } = await microlink.metadata('https://github.com')`)
    })

    test('embed field is dropped from the screenshot call', () => {
      const result = mqlCode(testUrl, {
        screenshot: true,
        embed: 'screenshot.url'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com')`)
    })

    test('screenshot passes shared options through', () => {
      const result = mqlCode(testUrl, {
        screenshot: true,
        waitForTimeout: 3000
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com', {
  waitForTimeout: 3000
})`)
    })

    test('pdf options are un-nested', () => {
      const result = mqlCode(testUrl, {
        pdf: { format: 'A4', margin: '0.35cm' }
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.pdf('https://github.com', {
  format: "A4",
  margin: "0.35cm"
})`)
    })

    test('content conversion rule becomes the content method', () => {
      const result = mqlCode('https://stripe.com/docs/api', {
        data: { markdown: { attr: 'markdown' } },
        embed: 'markdown'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const markdown = await microlink.markdown('https://stripe.com/docs/api')`)
    })

    test('content conversion keeps the selector option', () => {
      const result = mqlCode(testUrl, {
        data: { text: { selector: 'article', attr: 'text' } },
        meta: false
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const text = await microlink.text('https://github.com', {
  selector: "article"
})`)
    })

    test('data rules become extract with shared options as third argument', () => {
      const result = mqlCode(testUrl, {
        data: { title: { selector: 'main h1', attr: 'text' } },
        meta: false,
        waitUntil: 'domcontentloaded'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { title } = await microlink.extract('https://github.com', {
  title: {
    selector: "main h1",
    attr: "text"
  }
}, {
  waitUntil: "domcontentloaded"
})`)
    })

    test('embed field narrows the extract destructuring', () => {
      const result = mqlCode(testUrl, {
        data: { json: { attr: 'json' } },
        embed: 'json'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { json } = await microlink.extract('https://github.com', {
  json: {
    attr: "json"
  }
})`)
    })

    test('insights true emits technologies and lighthouse', () => {
      const result = mqlCode(testUrl, { insights: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const technologies = await microlink.technologies('https://github.com')

const report = await microlink.lighthouse('https://github.com')`)
    })

    test('insights subset emits only the selected method', () => {
      const result = mqlCode(testUrl, {
        insights: { technologies: true, lighthouse: false }
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const technologies = await microlink.technologies('https://github.com')`)
    })

    test('video becomes the video method', () => {
      const result = mqlCode('https://vimeo.com/571394002', { video: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.video('https://vimeo.com/571394002')`)
    })

    test('audio becomes the audio method', () => {
      const result = mqlCode('https://soundcloud.com/tycho/tycho-awake', {
        audio: true
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } =
  await microlink.audio('https://soundcloud.com/tycho/tycho-awake')`)
    })

    test('iframe becomes embed', () => {
      const result = mqlCode(testUrl, { iframe: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { html } = await microlink.embed('https://github.com')`)
    })

    test('iframe with palette emits embed and metadata', () => {
      const result = mqlCode(testUrl, { iframe: true, palette: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { html } = await microlink.embed('https://github.com')

const { image, logo } = await microlink.metadata('https://github.com', {
  palette: true
})`)
    })

    test('palette alone destructures image from metadata', () => {
      const result = mqlCode(testUrl, { palette: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { image } = await microlink.metadata('https://github.com', {
  palette: true
})`)
    })

    test('headers become forwarded x-api-header transport headers', () => {
      const result = mqlCode(testUrl, {
        screenshot: true,
        headers: { 'Accept-Language': 'es-ES', userAgent: 'googlebot' }
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com', {
  headers: {
    "x-api-header-accept-language": "es-ES",
    "x-api-header-user-agent": "googlebot"
  }
})`)
      expect(result.CLI).toBe(
        'microlink https://github.com&screenshot&headers.Accept-Language=es-ES&headers.userAgent=googlebot'
      )
    })

    test('run forwards extra named arguments as options', () => {
      const result = mqlCode(testUrl, {
        function: '({ page, greetings }) => page.evaluate(greetings)',
        greetings: 'hello world'
      })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { value } = await microlink.run(
  'https://github.com',
  ({ page, greetings }) => page.evaluate(greetings),
  {
    greetings: "hello world"
  }
)`)
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

    test('should not include apiKey in the JavaScript snippet', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.JavaScript).toBe(`import createClient from 'microlink.io'

const microlink = createClient()

const { url } = await microlink.screenshot('https://github.com')`)
      expect(result.JavaScript).not.toContain(testApiKey)
    })

    test('should handle apiKey in CLI as flag', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.CLI).toBe(
        `microlink https://github.com&screenshot --api-key ${testApiKey}`
      )
    })

    test('should handle apiKey in cURL as header', () => {
      const result = mqlCode(testUrl, { apiKey: testApiKey, screenshot: true })

      expect(result.cURL).toBe(`curl -G "https://pro.microlink.io" \\
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
