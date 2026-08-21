import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  buildOpenApi,
  readErrorCodes,
  readParameters
} from '../scripts/build-openapi/index.mjs'
import {
  frontmatterField,
  parameterName,
  parseDefault,
  parseErrorCodes,
  parseTypes
} from '../scripts/build-openapi/parse.mjs'

const PUBLISHED = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'static/openapi.json'), 'utf8')
)

const DOCS_DIR = path.join(process.cwd(), 'src/content/docs')

const parameters = readParameters()
const operation = PUBLISHED.paths['/'].get

describe('parsing a parameter doc', () => {
  const doc = [
    '---',
    "title: 'screenshot › fullPage'",
    "description: 'Takes a full page screenshot.'",
    'isPro: true',
    '---',
    '',
    "Type: <Type children='<boolean>'/><br/>",
    "Default: <Type children='false'/>"
  ].join('\n')

  test('reads the frontmatter', () => {
    expect(frontmatterField(doc, 'title')).toBe('screenshot › fullPage')
    expect(frontmatterField(doc, 'description')).toBe(
      'Takes a full page screenshot.'
    )
    expect(frontmatterField(doc, 'missing')).toBe('')
  })

  test('turns a nested title into a dotted query parameter', () => {
    expect(parameterName('screenshot › fullPage')).toBe('screenshot.fullPage')
    expect(parameterName('adblock')).toBe('adblock')
  })

  test('reads the declared types', () => {
    expect(parseTypes(doc)).toEqual(['boolean'])
    expect(
      parseTypes(
        "Type: <TypeContainer><Type children='<boolean>'/> | <Type children='<object>'/></TypeContainer><br/>"
      )
    ).toEqual(['boolean', 'object'])
  })

  test('reads the default as a JSON value, not as its source text', () => {
    expect(parseDefault(doc)).toBe(false)
    expect(parseDefault("Default: <Type children='80'/>")).toBe(80)
    expect(parseDefault('Default: <Type children="\'auto\'"/><br/>')).toBe(
      'auto'
    )
    expect(
      parseDefault("Default: <Type children='undefined'/>")
    ).toBeUndefined()
    expect(parseDefault('no default here')).toBeUndefined()
  })

  test('reads the error codes as the headings of the reference', () => {
    expect(
      parseErrorCodes('## EAUTH\n\ntext\n\n## ERATE\n\n### Solution')
    ).toEqual(['EAUTH', 'ERATE'])
  })
})

describe('the published spec', () => {
  test('is regenerated from the docs, so it cannot drift from them', () => {
    expect(PUBLISHED).toEqual(
      buildOpenApi({ parameters, errorCodes: readErrorCodes() })
    )
  })

  test('declares OpenAPI 3.1', () => {
    expect(PUBLISHED.openapi).toBe('3.1.0')
  })

  test('names both endpoints', () => {
    expect(PUBLISHED.servers.map(({ url }) => url)).toEqual([
      'https://api.microlink.io',
      'https://pro.microlink.io'
    ])
  })

  test('allows the free endpoint and the API key alike', () => {
    expect(PUBLISHED.security).toEqual([{}, { apiKey: [] }])
    expect(PUBLISHED.components.securitySchemes.apiKey.name).toBe('x-api-key')
  })
})

describe('the operation', () => {
  test('carries an operationId and a description, for function calling', () => {
    expect(operation.operationId).toBe('getUrlData')
    expect(operation.summary.length).toBeGreaterThan(0)
    expect(operation.description.length).toBeGreaterThan(100)
  })

  test('types every parameter and says what it does', () => {
    for (const parameter of operation.parameters) {
      expect(parameter.description.length, parameter.name).toBeGreaterThan(20)
      expect(
        parameter.schema.type || parameter.schema.oneOf,
        parameter.name
      ).toBeDefined()
    }
  })

  test('names every parameter once', () => {
    const names = operation.parameters.map(({ name }) => name)
    expect(new Set(names).size).toBe(names.length)
  })

  test('requires only the target url', () => {
    const required = operation.parameters.filter(
      parameter => parameter.required
    )
    expect(required.map(({ name }) => name)).toEqual(['url'])
    expect(required[0].schema).toEqual({ type: 'string', format: 'uri' })
  })

  test('documents the nested options in the dot notation the API accepts', () => {
    const names = operation.parameters.map(({ name }) => name)
    expect(names).toContain('screenshot.fullPage')
    expect(names).toContain('pdf.format')
    expect(names).toContain('insights.lighthouse')
  })

  test('marks the parameters that need a Pro plan', () => {
    const pro = operation.parameters
      .filter(parameter => parameter['x-pro'])
      .map(({ name }) => name)
    expect(pro).toEqual([
      'cacheKey',
      'filename',
      'headers',
      'proxy',
      'staleTtl',
      'ttl'
    ])
  })

  test('points every parameter at the page that documents it', () => {
    for (const { name, 'x-docs': docs } of operation.parameters) {
      const file = docs.replace('https://microlink.io/docs/', '')
      const candidates = [`${file}.md`, `${file}/index.md`]
      expect(
        candidates.some(candidate =>
          fs.existsSync(path.join(DOCS_DIR, candidate))
        ),
        name
      ).toBe(true)
    }
  })
})

describe('the error model', () => {
  const { ErrorResponse, ErrorCode } = PUBLISHED.components.schemas

  test('enumerates every documented error code', () => {
    expect(ErrorCode.enum).toEqual(readErrorCodes())
    expect(ErrorCode.enum).toContain('ERATE')
    expect(ErrorCode.enum.length).toBeGreaterThan(20)
  })

  test('makes the machine-readable code the required part', () => {
    expect(ErrorResponse.required).toEqual(['status', 'code'])
  })

  test('is the response schema of every failure the API can return', () => {
    for (const status of [400, 403, 429, 500]) {
      expect(
        operation.responses[status].content['application/json'].schema.$ref,
        String(status)
      ).toBe('#/components/schemas/ErrorResponse')
    }
  })

  test('gives an example per code, so an agent sees the real shape', () => {
    const examples =
      operation.responses[429].content['application/json'].examples
    expect(Object.keys(examples)).toEqual(['ERATE'])
    expect(examples.ERATE.value.code).toBe('ERATE')
  })
})

describe('the rate limit contract', () => {
  const headersOf = status => Object.keys(operation.responses[status].headers)

  test('documents the headers the API actually returns', () => {
    for (const status of [200, 429]) {
      expect(headersOf(status), String(status)).toEqual([
        'x-rate-limit-limit',
        'x-rate-limit-remaining',
        'x-rate-limit-reset',
        'x-request-id'
      ])
    }
  })

  test('says a 429 is the quota running out', () => {
    expect(operation.responses[429].description).toContain('quota')
  })
})

describe('the versioning policy', () => {
  const versioning = PUBLISHED.info['x-versioning']

  test('is published as part of the spec', () => {
    expect(versioning.strategy).toBe('unversioned-additive')
    expect(versioning.deprecationNoticeMonths).toBe(6)
    expect(versioning.deprecationHeaders).toEqual(['Deprecation', 'Sunset'])
    expect(versioning.deprecationChannel).toBe('https://microlink.io/changelog')
  })

  test('is explained in prose too, where an agent reads the description', () => {
    expect(PUBLISHED.info.description).toContain(versioning.policy)
  })

  test('matches the page that documents it', () => {
    const doc = fs.readFileSync(
      path.join(DOCS_DIR, 'api/basics/versioning.md'),
      'utf8'
    )
    expect(doc).toContain('additive-only')
    expect(doc).toContain('6 months')
    expect(doc).toContain('Sunset')
  })
})
