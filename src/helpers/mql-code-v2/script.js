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

  // Flatten nested objects for consistent handling across most formats
  const flattenedOptions = flattenObject(options)

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
    }))
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
    // Format options object with proper 2-space indentation
    const optionsString = JSON.stringify(options, null, 2)

    return `import mql from '@microlink/mql'

const { data } = await mql('${url}', ${optionsString})`
  } else {
    return `import mql from '@microlink/mql'

const { data } = await mql('${url}')`
  }
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
  // Flatten nested objects
  const flattenedOptions = flattenObject(options)

  const optionsString = Object.entries(flattenedOptions)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `&${key}` : ''
      }
      return `&${key}=${value}`
    })
    .filter(Boolean)
    .join('')

  return `microlink ${url}${optionsString}`
}

/**
 * Generate curl command
 * @param {string} url - Target URL
 * @param {Object} options - Additional options
 * @returns {string} Curl command string
 */
const generateCurlCommand = (url, options = {}) => {
  // Flatten nested objects
  const flattenedOptions = flattenObject(options)

  const queryParams = new URLSearchParams({
    url,
    ...flattenedOptions
  })

  return `curl "${MICROLINK_API_URL}?${queryParams.toString()}"`
}

export default mqlCode
