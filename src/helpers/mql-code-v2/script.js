import { HTTPSnippet } from 'httpsnippet'

const MICROLINK_API_URL = 'https://api.microlink.io'

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

  // Extract apiKey for special handling
  const { apiKey, ...restOptions } = options

  // Flatten nested objects for consistent handling across most formats
  const flattenedOptions = flattenObject(restOptions)

  // Build query parameters for HTTPSnippet (other languages)
  const queryParams = {
    url,
    ...flattenedOptions
  }

  // Create HTTPSnippet request object with proper query string format
  const requestObject = {
    method: 'GET',
    url: MICROLINK_API_URL,
    queryString: Object.entries(queryParams).map(([key, value]) => ({
      name: key,
      value: String(value)
    })),
    // Add x-api-key header if apiKey is provided
    ...(apiKey && {
      headers: [
        {
          name: 'x-api-key',
          value: apiKey
        }
      ]
    })
  }

  const snippet = new HTTPSnippet(requestObject)

  // Generate code snippets object
  const codeSnippets = {
    CLI: generateCliCommand(url, options),
    cURL: generateCurlCommand(url, options),
    JavaScript: generateJavaScriptCode(url, options), // Custom implementation
    Python: snippet.convert('python', 'requests'),
    Ruby: snippet.convert('ruby'),
    PHP: snippet.convert('php', 'curl'),
    Golang: snippet.convert('go')
  }

  return codeSnippets
}

/**
 * Generate JavaScript code using @microlink/mql
 * @param {string} url - Target URL
 * @param {Object} options - Additional options (non-flattened)
 * @returns {string} JavaScript code string
 */
const generateJavaScriptCode = (url, options = {}) => {
  const hasOptions = Object.keys(options).length > 0

  if (hasOptions) {
    // Format options object with proper 2-space indentation and unquoted keys
    const optionsString = formatJavaScriptObject(options, 0)

    return `import mql from '@microlink/mql'

const { data } = await mql('${url}', ${optionsString})`
  } else {
    return `import mql from '@microlink/mql'

const { data } = await mql('${url}')`
  }
}

/**
 * Format JavaScript object literal with proper indentation and unquoted keys
 * @param {*} obj - Object to format
 * @param {number} indent - Current indentation level
 * @returns {string} Formatted JavaScript object string
 */
const formatJavaScriptObject = (obj, indent = 0) => {
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  if (typeof obj === 'string') return `"${obj}"`
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
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `&${key}` : ''
      }
      return `&${key}=${value}`
    })
    .filter(Boolean)
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
  const parts = [`curl -G "${MICROLINK_API_URL}"`]

  // Add API key header if present
  if (apiKey) {
    parts.push(`  -H "x-api-key: ${apiKey}"`)
  }

  // Add each parameter as separate -d option
  Object.entries(allParams).forEach(([key, value]) => {
    parts.push(`  -d "${key}=${value}"`)
  })

  // Join with line continuation if we have multiple parts
  if (parts.length > 1) {
    return parts.join(' \\\n')
  } else {
    // Simple case - just the URL with no params
    return `curl "${MICROLINK_API_URL}?url=${encodeURIComponent(url)}"`
  }
}

export default mqlCode
