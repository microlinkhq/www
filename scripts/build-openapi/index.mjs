import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import {
  frontmatterField,
  parameterName,
  parseDefault,
  parseErrorCodes,
  parseTypes
} from './parse.mjs'

const SITE_URL = 'https://microlink.io'
const ROOT_DIR = path.join(import.meta.dirname, '..', '..')
const DOCS_DIR = path.join(ROOT_DIR, 'src', 'content', 'docs', 'api')
const PARAMETERS_DIR = path.join(DOCS_DIR, 'parameters')
const ERROR_CODES_FILE = path.join(DOCS_DIR, 'basics', 'error-codes.md')
const OUTPUT_PATH = path.join(ROOT_DIR, 'static', 'openapi.json')

const SCALAR_SCHEMAS = {
  boolean: { type: 'boolean' },
  string: { type: 'string' },
  number: { type: 'number' },
  object: { type: 'object' },
  'string[]': { type: 'array', items: { type: 'string' } }
}

const VERSION_POLICY = [
  'The API is unversioned and additive-only: new query parameters and new response',
  'fields ship continuously, and no change ever removes or repurposes an existing',
  'one. A change that cannot be made additively ships as a separate endpoint rather',
  'than as a new behaviour of this one, so an integration written today keeps',
  'working without pinning a version.',
  '',
  'Deprecation policy: a deprecated parameter or field is announced at',
  `${SITE_URL}/changelog at least 6 months before removal, and the affected`,
  'responses carry `Deprecation` and `Sunset` headers (RFC 9745, RFC 8594) for the',
  'whole notice period. Nothing is deprecated today.'
].join('\n')

const DESCRIPTION = [
  'Microlink turns any URL into data. A single GET request drives a real browser to',
  'extract normalized metadata, capture screenshots, generate PDFs, convert content',
  'to markdown or text, detect media and technologies, and run Lighthouse audits.',
  '',
  '## Endpoints',
  '',
  '`api.microlink.io` serves unauthenticated requests with a soft limit of 25',
  'requests/day per IP. `pro.microlink.io` serves authenticated requests, with the',
  'quota of the plan attached to the API key.',
  '',
  '## Rate limits',
  '',
  'Every response carries `x-rate-limit-limit`, `x-rate-limit-remaining` and',
  '`x-rate-limit-reset` (UTC epoch seconds). Exceeding the quota returns HTTP 429',
  'with the `ERATE` code; wait until the reset instant before retrying.',
  '',
  '## Errors',
  '',
  'Responses follow the JSend specification. A failed request keeps the same shape',
  'as a successful one and adds a machine-readable `code`, a human-readable',
  'explanation under `data`, and links to the documentation and to a prefilled',
  'report. Match on `code`, never on the message text.',
  '',
  '## Versioning',
  '',
  VERSION_POLICY
].join('\n')

const RATE_LIMIT_HEADERS = {
  'x-rate-limit-limit': {
    description: 'Maximum number of requests allowed in the current window.',
    schema: { type: 'integer' }
  },
  'x-rate-limit-remaining': {
    description: 'Requests left in the current window.',
    schema: { type: 'integer' }
  },
  'x-rate-limit-reset': {
    description: 'Instant the current window resets, in UTC epoch seconds.',
    schema: { type: 'integer', format: 'int64' }
  },
  'x-request-id': {
    description: 'Unique identifier of the request, quote it when reporting an error.',
    schema: { type: 'string' }
  }
}

const MEDIA_FIELDS = {
  size: { type: 'integer', description: 'File size in bytes.' },
  size_pretty: { type: 'string', description: 'File size in a human readable format.' },
  type: { type: 'string', description: 'File type extension.' },
  width: { type: 'integer', description: 'File width in pixels.' },
  height: { type: 'integer', description: 'File height in pixels.' },
  duration: { type: 'number', description: 'Source duration in seconds, for playable media.' },
  duration_pretty: { type: 'string', description: 'Source duration in a human readable format.' }
}

const METADATA_FIELDS = {
  author: { type: ['string', 'null'], description: "A human-readable representation of the author's name." },
  date: { type: ['string', 'null'], format: 'date-time', description: 'ISO 8601 date the content was published.' },
  description: { type: ['string', 'null'], description: "The publisher's chosen description of the content." },
  lang: { type: ['string', 'null'], description: 'ISO 639-1 language of the content.' },
  publisher: { type: ['string', 'null'], description: "A human-readable representation of the publisher's name." },
  title: { type: ['string', 'null'], description: "The publisher's chosen title of the content." },
  url: { type: ['string', 'null'], format: 'uri', description: 'The canonical URL of the content.' }
}

const MEDIA_SCHEMA = {
  type: ['object', 'string', 'null'],
  description: 'A media asset: an absolute URL plus its contextual metadata.',
  properties: { url: { type: 'string', format: 'uri' }, ...MEDIA_FIELDS }
}

const toSchema = types => {
  const schemas = types.map(type => SCALAR_SCHEMAS[type]).filter(Boolean)
  if (schemas.length === 0) return { type: 'string' }
  if (schemas.length === 1) return { ...schemas[0] }
  if (schemas.every(schema => Object.keys(schema).length === 1)) {
    return { type: schemas.map(schema => schema.type) }
  }
  return { oneOf: schemas }
}

const markdownFiles = dir =>
  readdirSync(dir, { recursive: true })
    .filter(entry => entry.endsWith('.md'))
    .map(entry => entry.split(path.sep).join('/'))

const docPathname = file =>
  `/docs/api/parameters/${file.replace(/\.md$/, '').replace(/\/index$/, '')}`

const toParameter = file => {
  const source = readFileSync(path.join(PARAMETERS_DIR, file), 'utf8')
  const title = frontmatterField(source, 'title')
  const defaultValue = parseDefault(source)
  return {
    name: parameterName(title),
    in: 'query',
    description: frontmatterField(source, 'description'),
    required: title === 'url',
    schema: {
      ...toSchema(parseTypes(source)),
      ...(title === 'url' ? { format: 'uri' } : {}),
      ...(defaultValue === undefined ? {} : { default: defaultValue })
    },
    ...(frontmatterField(source, 'isPro') === 'true' ? { 'x-pro': true } : {}),
    'x-docs': `${SITE_URL}${docPathname(file)}`
  }
}

export const readParameters = () =>
  markdownFiles(PARAMETERS_DIR)
    .map(toParameter)
    .sort((a, b) => a.name.localeCompare(b.name))

export const readErrorCodes = () =>
  parseErrorCodes(readFileSync(ERROR_CODES_FILE, 'utf8'))

const errorResponse = (description, codes) => ({
  description,
  headers: RATE_LIMIT_HEADERS,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' },
      examples: Object.fromEntries(
        codes.map(code => [
          code,
          {
            summary: code,
            value: {
              status: 'fail',
              data: { url: 'The URL `notaurl` is not valid.' },
              code,
              more: `${SITE_URL}/${code.toLowerCase()}`
            }
          }
        ])
      )
    }
  }
})

export const buildOpenApi = ({ parameters, errorCodes }) => ({
  openapi: '3.1.0',
  info: {
    title: 'Microlink API',
    summary: 'Turn any website into data.',
    description: DESCRIPTION,
    version: '1.0.0',
    termsOfService: `${SITE_URL}/tos`,
    contact: {
      name: 'Microlink',
      email: 'hello@microlink.io',
      url: `${SITE_URL}/contact`
    },
    license: { name: 'Microlink Terms of Service', url: `${SITE_URL}/tos` },
    'x-logo': { url: 'https://cdn.microlink.io/logo/logo.png', altText: 'Microlink' },
    'x-versioning': {
      strategy: 'unversioned-additive',
      deprecationNoticeMonths: 6,
      deprecationChannel: `${SITE_URL}/changelog`,
      deprecationHeaders: ['Deprecation', 'Sunset'],
      policy: VERSION_POLICY
    }
  },
  externalDocs: {
    description: 'Microlink API documentation',
    url: `${SITE_URL}/docs/api/getting-started/overview`
  },
  servers: [
    {
      url: 'https://api.microlink.io',
      description: 'Free endpoint. Unauthenticated, soft limit of 25 requests/day per IP.'
    },
    {
      url: 'https://pro.microlink.io',
      description: 'Pro endpoint. Requires an API key, quota given by the plan.'
    }
  ],
  security: [{}, { apiKey: [] }],
  tags: [
    {
      name: 'extraction',
      description: 'Drive a browser over a URL and return the data it produces.'
    }
  ],
  paths: {
    '/': {
      get: {
        operationId: 'getUrlData',
        summary: 'Extract data from a URL',
        description: [
          'Runs the target URL through a real browser and returns the data selected by',
          'the query parameters: normalized metadata by default, plus screenshots,',
          'PDFs, markdown, plain text, media, technologies or Lighthouse audits when',
          'the matching parameter is enabled.',
          '',
          'Parameter names are accepted in camelCase and snake_case alike. Nested',
          'options use dot notation, for example `screenshot.fullPage=true`.'
        ].join('\n'),
        tags: ['extraction'],
        parameters,
        responses: {
          200: {
            description: 'The data extracted from the target URL.',
            headers: RATE_LIMIT_HEADERS,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SuccessResponse' }
              }
            }
          },
          400: errorResponse(
            'The request is malformed, most often an invalid or unreachable url.',
            ['EINVALURL', 'EFORBIDDENURL', 'EINVALQUERY']
          ),
          403: errorResponse(
            'The API key is missing or invalid, or the parameter needs a Pro plan.',
            ['EAUTH', 'EPRO']
          ),
          429: errorResponse('The API quota for the window is exhausted.', ['ERATE']),
          500: errorResponse(
            'The request could not be resolved against the target URL.',
            ['EFATAL', 'EBRWSRTIMEOUT', 'ETIMEOUT']
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
        description: `An API key issued at ${SITE_URL}/pricing. Required by the pro endpoint.`
      }
    },
    schemas: {
      Status: {
        type: 'string',
        enum: ['success', 'fail', 'error'],
        description: [
          'The outcome of the request, as defined by JSend. `success` pairs with a 2xx',
          'status code, `fail` with a 4xx and `error` with a 5xx.'
        ].join(' ')
      },
      ErrorCode: {
        type: 'string',
        enum: errorCodes,
        description: `The machine-readable reason the request failed. Each code is documented at ${SITE_URL}/docs/api/basics/error-codes.`
      },
      Metadata: {
        type: 'object',
        description: 'The data extracted from the target URL.',
        properties: {
          ...METADATA_FIELDS,
          image: MEDIA_SCHEMA,
          logo: MEDIA_SCHEMA,
          video: MEDIA_SCHEMA,
          audio: MEDIA_SCHEMA,
          screenshot: MEDIA_SCHEMA,
          pdf: MEDIA_SCHEMA,
          markdown: { type: 'string', description: 'The page content converted to markdown.' },
          text: { type: 'string', description: 'The page content converted to plain text.' },
          html: { type: 'string', description: 'The rendered HTML of the page.' }
        },
        additionalProperties: true
      },
      Redirect: {
        type: 'object',
        description: 'One hop of the redirect chain followed from the target URL.',
        properties: {
          statusCode: { type: 'integer' },
          url: { type: 'string', format: 'uri' }
        }
      },
      SuccessResponse: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
          status: { $ref: '#/components/schemas/Status' },
          data: { $ref: '#/components/schemas/Metadata' },
          statusCode: {
            type: ['integer', 'null'],
            description: 'The HTTP status code returned by the target URL.'
          },
          headers: {
            type: ['object', 'array'],
            description: 'The HTTP response headers returned by the target URL.'
          },
          redirects: {
            type: 'array',
            items: { $ref: '#/components/schemas/Redirect' }
          }
        }
      },
      ErrorResponse: {
        type: 'object',
        required: ['status', 'code'],
        description: [
          'The typed error model. `code` is the contract: it is stable, enumerable and',
          'safe to branch on. `data` maps the offending parameter to a human-readable',
          'explanation, and is written for people, not for parsers.'
        ].join(' '),
        properties: {
          status: { $ref: '#/components/schemas/Status' },
          code: { $ref: '#/components/schemas/ErrorCode' },
          data: {
            type: 'object',
            description: 'The offending parameter mapped to an explanation of what is wrong with it.',
            additionalProperties: { type: 'string' }
          },
          message: {
            type: 'string',
            description: 'A human-readable explanation of the failure.'
          },
          id: {
            type: 'string',
            description: 'The unique identifier of the request that failed.'
          },
          more: {
            type: 'string',
            format: 'uri',
            description: 'The documentation for this error code.'
          },
          report: {
            type: 'string',
            format: 'uri',
            description: 'A prefilled report for this exact request.'
          }
        }
      }
    }
  }
})

const main = () => {
  const document = buildOpenApi({
    parameters: readParameters(),
    errorCodes: readErrorCodes()
  })
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(document, null, 2)}\n`)
  console.log(
    `Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)} with ${document.paths['/'].get.parameters.length} parameters`
  )
}

if (process.argv[1] === import.meta.filename) main()
