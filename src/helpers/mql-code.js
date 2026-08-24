const MICROLINK_FREE_API_URL = 'https://api.microlink.io'
const MICROLINK_PRO_API_URL = 'https://pro.microlink.io'

const getApiUrl = apiKey =>
  apiKey ? MICROLINK_PRO_API_URL : MICROLINK_FREE_API_URL

/**
 * Generate code snippets for different languages and tools to call Microlink API
 * @param {string} url - The target URL to analyze
 * @param {Object} options - Additional query parameters for the API
 * @returns {Object} Object containing code snippets for different languages
 */
export const mqlCode = (url, options = {}) => {
  if (!url || typeof url !== 'string') {
    throw new Error('URL parameter is required and must be a string')
  }

  // Generate code snippets object
  const codeSnippets = {
    CLI: generateCliCommand(url, options),
    cURL: generateCurlCommand(url, options),
    JavaScript: generateJavaScriptCode(url, options), // Custom implementation
    Python: generatePythonCode(url, options), // Custom implementation
    Ruby: generateRubyCode(url, options), // Custom implementation
    PHP: generatePhpCode(url, options), // Custom implementation
    Golang: generateGolangCode(url, options) // Custom implementation
  }

  return codeSnippets
}

export const sdkPreamble = apiKey => `import createClient from 'microlink.io'

const microlink = createClient(${
  apiKey ? `{ apiKey: ${JSON.stringify(apiKey)} }` : ''
})`

const CONTENT_METHODS = ['markdown', 'html', 'text']

const isContentConversion = data => {
  const keys = Object.keys(data)
  if (keys.length !== 1 || !CONTENT_METHODS.includes(keys[0])) return false
  const rule = data[keys[0]]
  return (
    rule !== null &&
    typeof rule === 'object' &&
    rule.attr === keys[0] &&
    Object.keys(rule).every(key => key === 'attr' || key === 'selector')
  )
}

const toFieldNames = fields => [
  ...new Set(fields.map(field => field.split('.')[0]))
]

const toHeaderName = key =>
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()

const toForwardedHeaders = headers =>
  Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key.toLowerCase().startsWith('x-api-header-')
        ? key.toLowerCase()
        : `x-api-header-${toHeaderName(key)}`,
      value
    ])
  )

const getFieldList = (meta, filter) => {
  if (typeof filter === 'string') {
    const fields = filter
      .split(',')
      .map(field => field.trim())
      .filter(field => field && field !== 'insights')
    if (fields.length > 0) return toFieldNames(fields)
  }
  if (meta !== null && typeof meta === 'object') {
    const fields = Object.keys(meta).filter(key => meta[key])
    if (fields.length > 0) return toFieldNames(fields)
  }
}

const translateToSdkCalls = options => {
  const { apiKey, meta, filter, embed, ...rest } = options
  const fieldList = getFieldList(meta, filter)

  if (rest.headers !== null && typeof rest.headers === 'object') {
    rest.headers = toForwardedHeaders(rest.headers)
  }

  if (rest.screenshot && rest.pdf) {
    const { screenshot, pdf, ...shared } = rest
    const screenshotCall = {
      method: 'screenshot',
      binding: 'screenshot',
      opts: { ...(screenshot === true ? {} : screenshot), ...shared }
    }
    const pdfCall = {
      method: 'pdf',
      binding: 'pdf',
      opts: { ...(pdf === true ? {} : pdf), ...shared }
    }
    const keys = Object.keys(rest)
    return keys.indexOf('pdf') < keys.indexOf('screenshot')
      ? [pdfCall, screenshotCall]
      : [screenshotCall, pdfCall]
  }

  if (rest.screenshot) {
    const { screenshot, ...shared } = rest
    return [
      {
        method: 'screenshot',
        binding: 'data',
        opts: { ...(screenshot === true ? {} : screenshot), ...shared }
      }
    ]
  }

  if (rest.pdf) {
    const { pdf, ...shared } = rest
    return [
      {
        method: 'pdf',
        binding: 'data',
        opts: { ...(pdf === true ? {} : pdf), ...shared }
      }
    ]
  }

  if (rest.video) {
    const { video, ...shared } = rest
    return [
      {
        method: 'video',
        binding: 'data',
        opts: { ...(video === true ? {} : video), ...shared }
      }
    ]
  }

  if (rest.audio) {
    const { audio, ...shared } = rest
    return [
      {
        method: 'audio',
        binding: 'data',
        opts: { ...(audio === true ? {} : audio), ...shared }
      }
    ]
  }

  if (rest.insights) {
    const { insights, ...shared } = rest
    const calls = []
    if (insights === true || insights.technologies) {
      calls.push({
        method: 'technologies',
        binding: 'technologies',
        opts: shared
      })
    }
    if (insights === true || insights.lighthouse) {
      calls.push({ method: 'lighthouse', binding: 'report', opts: shared })
    }
    if (calls.length === 0) {
      calls.push(
        { method: 'technologies', binding: 'technologies', opts: shared },
        { method: 'lighthouse', binding: 'report', opts: shared }
      )
    }
    return calls
  }

  if (rest.iframe) {
    const { iframe, palette, ...shared } = rest
    const calls = [
      {
        method: 'embed',
        binding: '{ html }',
        opts: { ...(iframe === true ? {} : iframe), ...shared }
      }
    ]
    if (palette) {
      calls.push({
        method: 'metadata',
        binding: '{ image, logo }',
        opts: { palette }
      })
    }
    return calls
  }

  if (rest.data) {
    const { data, ...shared } = rest
    if (isContentConversion(data)) {
      const method = Object.keys(data)[0]
      const { selector } = data[method]
      return [
        {
          method,
          binding: method,
          opts: { ...(selector && { selector }), ...shared }
        }
      ]
    }
    const names =
      fieldList || (embed ? toFieldNames([embed]) : Object.keys(data))
    return [
      {
        method: 'extract',
        binding: `{ ${names.join(', ')} }`,
        rules: data,
        opts: shared
      }
    ]
  }

  if (typeof rest.function === 'string') {
    const { function: fn, ...shared } = rest
    return [{ method: 'run', binding: '{ value }', fn, opts: shared }]
  }

  return [{ method: 'metadata', binding: 'data', opts: rest }]
}

const renderSdkCall = (url, { method, binding, fn, rules, opts }) => {
  const hasOpts = Object.keys(opts).length > 0

  if (method === 'run') {
    const inline = `const ${binding} = await microlink.run('${url}', ${fn})`
    if (!hasOpts && !fn.includes('\n') && inline.length <= 80) return inline
    const args = [`'${url}'`, fn.split('\n').join('\n  ')]
    if (hasOpts) args.push(formatJavaScriptObject(opts, 2))
    return `const ${binding} = await microlink.run(\n  ${args.join(',\n  ')}\n)`
  }

  if (method === 'extract') {
    const args = [`'${url}'`, formatJavaScriptObject(rules, 0)]
    if (hasOpts) args.push(formatJavaScriptObject(opts, 0))
    return `const ${binding} = await microlink.extract(${args.join(', ')})`
  }

  const call = hasOpts
    ? `await microlink.${method}('${url}', ${formatJavaScriptObject(opts, 0)})`
    : `await microlink.${method}('${url}')`
  const inline = `const ${binding} = ${call}`
  if (!hasOpts && inline.length > 80) return `const ${binding} =\n  ${call}`
  return inline
}

export const sdkCall = (url, options = {}) =>
  translateToSdkCalls(options)
    .map(call => renderSdkCall(url, call))
    .join('\n\n')

const generateJavaScriptCode = (url, options = {}) =>
  `${sdkPreamble(options.apiKey)}\n\n${sdkCall(url, options)}`

/**
 * Format JavaScript object literal with proper indentation and unquoted keys
 * @param {*} obj - Object to format
 * @param {number} indent - Current indentation level
 * @returns {string} Formatted JavaScript object string
 */
const formatJavaScriptObject = (obj, indent = 0) => {
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  if (typeof obj === 'string') {
    // Choose appropriate quote style to avoid conflicts
    if (obj.includes('"') && !obj.includes("'")) {
      // String contains double quotes but not single quotes - use single quotes
      return `'${obj}'`
    } else if (obj.includes('"')) {
      // String contains double quotes (and possibly single quotes) - escape double quotes
      return `"${obj.replace(/"/g, '\\"')}"`
    } else {
      // String doesn't contain double quotes - use double quotes
      return `"${obj}"`
    }
  }
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const items = obj.map(item => formatJavaScriptObject(item, indent + 2))
    return `[\n${' '.repeat(indent + 2)}${items.join(
      `,\n${' '.repeat(indent + 2)}`
    )}\n${' '.repeat(indent)}]`
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj)
    if (entries.length === 0) return '{}'

    const formattedEntries = entries.map(([key, value]) => {
      // Check if key needs quotes (contains special characters or starts with number)
      const needsQuotes = !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
      const formattedKey = needsQuotes ? `"${key}"` : key
      const formattedValue = formatJavaScriptObject(value, indent + 2)
      return `${' '.repeat(indent + 2)}${formattedKey}: ${formattedValue}`
    })

    return `{\n${formattedEntries.join(',\n')}\n${' '.repeat(indent)}}`
  }

  return String(obj)
}

/**
 * Generate Python code using requests library
 * @param {string} url - Target URL
 * @param {Object} options - Additional options (non-flattened)
 * @returns {string} Python code string
 */
const generatePythonCode = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  // Build querystring dictionary
  const queryParams = {
    url,
    ...flattenedOptions
  }

  // Format the querystring dictionary
  const formatPythonValue = value => {
    const stringValue = String(value)

    // Use triple quotes for strings containing quotes or complex content
    if (
      stringValue.includes('"') ||
      stringValue.includes("'") ||
      stringValue.includes('\\') ||
      stringValue.includes('\n')
    ) {
      return `'''${stringValue}'''`
    }

    // Use regular double quotes for simple strings
    return `"${stringValue}"`
  }

  const querystringEntries = Object.entries(queryParams)
    .map(([key, value]) => {
      const formattedValue = formatPythonValue(value)
      return `    "${key}": ${formattedValue}`
    })
    .join(',\n')

  // Build the Python code
  let pythonCode = `import requests

url = "${getApiUrl(apiKey)}/"

querystring = {
${querystringEntries}
}`

  // Add headers if apiKey is present
  if (apiKey) {
    pythonCode += `

headers = {
    "x-api-key": "${apiKey}"
}

response = requests.get(url, params=querystring, headers=headers)`
  } else {
    pythonCode += `

response = requests.get(url, params=querystring)`
  }

  pythonCode += `

print(response.json())`

  return pythonCode
}

/**
 * Generate Ruby code using net/http library
 * @param {string} url - Target URL
 * @param {Object} options - Additional options (non-flattened)
 * @returns {string} Ruby code string
 */
const generateRubyCode = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  // Build all query parameters
  const allParams = {
    url,
    ...flattenedOptions
  }

  // Format the params hash
  const formatRubyValue = value => {
    const stringValue = String(value)

    // Use single quotes for strings containing double quotes, double quotes otherwise
    if (stringValue.includes('"') && !stringValue.includes("'")) {
      return `'${stringValue}'`
    } else if (stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '\\"')}"`
    } else {
      return `"${stringValue}"`
    }
  }

  const paramsEntries = Object.entries(allParams)
    .map(([key, value]) => {
      const formattedValue = formatRubyValue(value)
      return `  ${key}: ${formattedValue}`
    })
    .join(',\n')

  // Build the Ruby code
  let rubyCode = `require 'uri'
require 'net/http'

base_url = "${getApiUrl(apiKey)}/"

params = {
${paramsEntries}
}

uri = URI(base_url)
uri.query = URI.encode_www_form(params)

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)`

  // Add API key header if present
  if (apiKey) {
    rubyCode += `
request['x-api-key'] = "${apiKey}"`
  }

  rubyCode += `
response = http.request(request)

puts response.body`

  return rubyCode
}

/**
 * Generate PHP code using cURL
 * @param {string} url - Target URL
 * @param {Object} options - Additional options (non-flattened)
 * @returns {string} PHP code string
 */
const generatePhpCode = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  // Build all query parameters
  const allParams = {
    url,
    ...flattenedOptions
  }

  // Format the params array
  const formatPhpValue = value => {
    const stringValue = String(value)

    // Use single quotes for strings containing double quotes, double quotes otherwise
    if (stringValue.includes('"') && !stringValue.includes("'")) {
      return `'${stringValue}'`
    } else if (stringValue.includes('"')) {
      return `"${stringValue.replace(/"/g, '\\"')}"`
    } else {
      return `"${stringValue}"`
    }
  }

  const paramsEntries = Object.entries(allParams)
    .map(([key, value]) => {
      const formattedValue = formatPhpValue(value)
      return `    "${key}" => ${formattedValue}`
    })
    .join(',\n')

  // Build the PHP code
  let phpCode = `<?php

$baseUrl = "${getApiUrl(apiKey)}/";

$params = [
${paramsEntries}
];

$query = http_build_query($params);
$url = $baseUrl . '?' . $query;

$curl = curl_init();

curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET"`

  // Add API key header if present
  if (apiKey) {
    phpCode += `,
    CURLOPT_HTTPHEADER => [
        "x-api-key: ${apiKey}"
    ]`
  }

  phpCode += `
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "cURL Error #: " . $err;
} else {
    echo $response;
}`

  return phpCode
}

/**
 * Generate Golang code with individual query parameters
 * @param {string} url - Target URL
 * @param {Object} options - Additional options (non-flattened)
 * @returns {string} Golang code string
 */
const generateGolangCode = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  // Build all query parameters
  const allParams = {
    url,
    ...flattenedOptions
  }

  // Separate variables for complex strings (containing quotes or special chars)
  const variables = []
  const paramLines = []

  Object.entries(allParams).forEach(([key, value], index) => {
    const stringValue = String(value)

    // Use backticks for strings containing quotes or complex content
    if (
      stringValue.includes('"') ||
      stringValue.includes("'") ||
      stringValue.includes('\\') ||
      stringValue.includes('\n')
    ) {
      const varName = key === 'function' ? 'fn' : `${key}Param`
      variables.push(`    ${varName} := \`${stringValue}\``)
      paramLines.push(`    q.Set("${key}", ${varName})`)
    } else {
      paramLines.push(`    q.Set("${key}", "${stringValue}")`)
    }
  })

  const variableSection =
    variables.length > 0 ? '\n' + variables.join('\n') + '\n' : ''
  const apiKeyHeader = apiKey
    ? `\n\n    req.Header.Set("x-api-key", "${apiKey}")`
    : ''

  return `package main

import (
    "fmt"
    "net/http"
    "net/url"
    "io"
)

func main() {
    baseURL := "${getApiUrl(apiKey)}"

    u, err := url.Parse(baseURL)
    if err != nil {
        panic(err)
    }${variableSection}
    q := u.Query()
${paramLines.join('\n')}
    u.RawQuery = q.Encode()

    req, err := http.NewRequest("GET", u.String(), nil)
    if err != nil {
        panic(err)
    }${apiKeyHeader}

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(body))
}`
}

/**
 * Flatten nested object using dot notation
 * @param {Object} obj - Object to flatten
 * @param {string} prefix - Prefix for keys
 * @returns {Object} Flattened object
 */
const flattenObject = (obj, prefix = '') => {
  const flattened = {}

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      Object.assign(flattened, flattenObject(value, newKey))
    } else {
      flattened[newKey] = value
    }
  }

  return flattened
}

/**
 * Escape value for CLI usage
 * @param {string} value - Value to escape
 * @returns {string} Properly escaped value for CLI
 */
const escapeCliValue = value => {
  const stringValue = String(value)

  // If value contains spaces, quotes, or special characters, wrap in single quotes
  if (/[\s"'<>&|;()$`\\]/.test(stringValue)) {
    // If contains single quotes, escape them by ending the single-quoted string,
    // adding an escaped single quote, and starting a new single-quoted string
    return `'${stringValue.replace(/'/g, "'\"'\"'")}'`
  }

  // Simple value, no quotes needed
  return stringValue
}

/**
 * Generate Microlink CLI command
 * @param {string} url - Target URL
 * @param {Object} options - Additional options
 * @returns {string} CLI command string
 */
const generateCliCommand = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  const optionsString = Object.entries(flattenedOptions)
    .flatMap(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `&${key}` : []
      }
      const escapedValue = escapeCliValue(value)
      return `&${key}=${escapedValue}`
    })
    .join('')

  // Add apiKey as a flag if present
  const apiKeyFlag = apiKey ? ` --api-key ${apiKey}` : ''

  return `microlink ${url}${optionsString}${apiKeyFlag}`
}

/**
 * Generate curl command
 * @param {string} url - Target URL
 * @param {Object} options - Additional options
 * @returns {string} Curl command string
 */
const generateCurlCommand = (url, options = {}) => {
  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects
  const flattenedOptions = flattenObject(restOptions)

  // Build all query parameters
  const allParams = {
    url,
    ...flattenedOptions
  }

  // Build the curl command with proper formatting
  const parts = [`curl -G "${getApiUrl(apiKey)}"`]

  // Add API key header if present
  if (apiKey) {
    parts.push(`  -H "x-api-key: ${apiKey}"`)
  }

  // Add each parameter as separate -d option
  Object.entries(allParams).forEach(([key, value]) => {
    const stringValue = String(value)
    const encodedValue = stringValue.includes(' ')
      ? encodeURIComponent(stringValue)
      : stringValue
    parts.push(`  -d "${key}=${encodedValue}"`)
  })

  // Join with line continuation if we have multiple parts
  if (parts.length > 1) {
    return parts.join(' \\\n')
  } else {
    // Simple case - just the URL with no params
    return `curl "${getApiUrl(apiKey)}?url=${encodeURIComponent(url)}"`
  }
}

export default mqlCode
