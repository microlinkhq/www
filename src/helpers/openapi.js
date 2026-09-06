export const SITE_URL = 'https://microlink.io'

export const OPENAPI_PATH = '/openapi.json'

const TYPE_MAP = {
  string: { type: 'string' },
  boolean: { type: 'boolean' },
  number: { type: 'number' },
  object: { type: 'object', additionalProperties: true },
  'string[]': { type: 'array', items: { type: 'string' } }
}

const unwrapType = value => value.replace(/^<|>$/g, '')

export const errorCodesFrom = markdown =>
  markdown
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => line.slice(3).trim())

export const parameterNameFrom = file =>
  file
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/\//g, '.')

export const schemaFromTypes = types => {
  const schemas = types
    .map(unwrapType)
    .map(type => TYPE_MAP[type])
    .filter(Boolean)

  if (schemas.length === 0) return { type: 'string' }
  if (schemas.length === 1) return schemas[0]
  return { oneOf: schemas }
}

export const typesFromParameterDoc = content => {
  const body = content.split(/^---$/m).slice(2).join('---')
  const typeLine = body.split('\n').find(line => line.startsWith('Type:'))
  if (!typeLine) return ['string']
  const matches = [...typeLine.matchAll(/Type children=['"]([^'"]+)['"]/g)]
  return matches.length > 0 ? matches.map(match => match[1]) : ['string']
}

const unquote = value =>
  value
    .trim()
    .replace(/^['"]/, '')
    .replace(/['"]$/, '')
    .replace(/''/g, "'")
    .trim()

export const frontmatterField = (content, field) => {
  const frontmatter = content.split(/^---$/m)[1] || ''
  const line = frontmatter
    .split('\n')
    .find(entry => entry.startsWith(`${field}:`))
  return line ? unquote(line.slice(field.length + 1)) : ''
}

export const parameterFromDoc = (file, content) => {
  const name = parameterNameFrom(file)
  const description = frontmatterField(content, 'description')
  const isPro = /isPro:\s*true/.test(content.split(/^---$/m)[1] || '')
  const schema = schemaFromTypes(typesFromParameterDoc(content))

  return {
    name,
    in: 'query',
    required: name === 'url',
    description: isPro ? `${description} Requires a Pro plan.` : description,
    schema,
    externalDocs: {
      url: `${SITE_URL}/docs/api/parameters/${file
        .replace(/\.md$/, '')
        .replace(/\/index$/, '')}`
    }
  }
}

const errorResponse = description => ({
  description,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/Error' }
    }
  }
})

export const buildOpenApi = ({ parameters, errorCodes }) => ({
  openapi: '3.1.0',
  info: {
    title: 'Microlink API',
    summary: 'Turn any website into data.',
    description:
      'A single HTTP GET turns a URL into metadata, screenshots, PDFs, media, and structured extraction. Query parameters accept camelCase or snake_case. Authenticated requests use the Pro endpoint with an `x-api-key` header.',
    version: '1.0.0',
    contact: {
      name: 'Microlink HQ',
      email: 'hello@microlink.io',
      url: SITE_URL
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/microlinkhq/www/blob/master/LICENSE'
    }
  },
  externalDocs: {
    description: 'API documentation',
    url: `${SITE_URL}/docs/api/getting-started/overview`
  },
  servers: [
    {
      url: 'https://api.microlink.io',
      description: 'Free endpoint. Daily rate limit. No API key.'
    },
    {
      url: 'https://pro.microlink.io',
      description:
        'Pro endpoint. Send `x-api-key`. Higher limits and Pro parameters.'
    }
  ],
  security: [{}, { apiKey: [] }],
  tags: [
    {
      name: 'URL',
      description: 'Normalize any public URL into structured data.'
    }
  ],
  paths: {
    '/': {
      get: {
        tags: ['URL'],
        operationId: 'retrieveUrl',
        summary: 'Retrieve data from a URL',
        description:
          'Give a `url` and get structured metadata back. Add query parameters to take a screenshot, render a PDF, extract fields, or embed a single asset. Failures use a typed error object with `code` and `message`.',
        parameters,
        responses: {
          200: {
            description: 'The URL was resolved successfully.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Success' }
              }
            }
          },
          400: errorResponse(
            'The request failed. A parameter is missing, invalid, or not allowed on the current plan.'
          ),
          401: errorResponse(
            'Authentication failed. Send a valid `x-api-key` or use the free endpoint without one.'
          ),
          403: errorResponse(
            'The request is not allowed. Typical codes: EFORBIDDENURL, EPRO, EINTEGRATION.'
          ),
          408: errorResponse(
            'The request reached its timeout. Typical codes: ETIMEOUT, EBRWSRTIMEOUT.'
          ),
          429: errorResponse(
            'The daily or monthly rate limit has been reached. Code: ERATE.'
          ),
          500: errorResponse(
            'An unexpected error occurred. Typical codes: EFATAL, EFATALCLIENT.'
          )
        }
      }
    }
  },
  components: {
    securitySchemes: {
      apiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description:
          'Pro API key. Use the `https://pro.microlink.io` server. Do not send this header to the free endpoint (that returns EPRO).'
      }
    },
    schemas: {
      Media: {
        type: 'object',
        properties: {
          url: { type: 'string', format: 'uri' },
          type: { type: 'string' },
          size: { type: 'integer' },
          size_pretty: { type: 'string' },
          width: { type: 'integer' },
          height: { type: 'integer' },
          duration: { type: 'number' },
          duration_pretty: { type: 'string' }
        }
      },
      Data: {
        type: 'object',
        additionalProperties: true,
        properties: {
          author: { type: ['string', 'null'] },
          date: { type: ['string', 'null'], format: 'date-time' },
          description: { type: ['string', 'null'] },
          image: {
            oneOf: [{ $ref: '#/components/schemas/Media' }, { type: 'null' }]
          },
          video: {
            oneOf: [{ $ref: '#/components/schemas/Media' }, { type: 'null' }]
          },
          audio: {
            oneOf: [{ $ref: '#/components/schemas/Media' }, { type: 'null' }]
          },
          lang: { type: ['string', 'null'] },
          logo: {
            oneOf: [{ $ref: '#/components/schemas/Media' }, { type: 'null' }]
          },
          publisher: { type: ['string', 'null'] },
          title: { type: ['string', 'null'] },
          url: { type: 'string', format: 'uri' },
          screenshot: { $ref: '#/components/schemas/Media' },
          pdf: { $ref: '#/components/schemas/Media' },
          statusCode: { type: 'integer' },
          headers: {
            type: 'object',
            additionalProperties: { type: 'string' }
          },
          redirects: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                statusCode: { type: 'integer' },
                url: { type: 'string', format: 'uri' }
              }
            }
          }
        }
      },
      Success: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
          status: { type: 'string', const: 'success' },
          data: { $ref: '#/components/schemas/Data' }
        }
      },
      Error: {
        type: 'object',
        required: ['status', 'code', 'message'],
        description:
          'JSend fail/error payload. `code` is machine-readable; `message` is human-readable.',
        properties: {
          status: { type: 'string', enum: ['fail', 'error'] },
          code: {
            type: 'string',
            enum: errorCodes,
            description:
              'Stable error code. See https://microlink.io/docs/api/basics/error-codes'
          },
          message: {
            type: 'string',
            description: 'Human-readable explanation of why the request failed.'
          },
          more: {
            type: 'string',
            format: 'uri',
            description: 'Documentation URL for this error code.'
          },
          report: {
            type: 'string',
            format: 'uri',
            description: 'URL for reporting the request to Microlink.'
          },
          id: {
            type: 'string',
            description:
              'Request identifier. Include it when contacting support.'
          },
          data: {
            type: 'object',
            additionalProperties: true
          }
        }
      }
    }
  }
})
