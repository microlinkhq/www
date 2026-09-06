import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

import {
  OPENAPI_PATH,
  buildOpenApi,
  errorCodesFrom,
  parameterFromDoc,
  parameterNameFrom,
  schemaFromTypes,
  typesFromParameterDoc
} from '../src/helpers/openapi.js'
import { notFoundMarkdown } from '../src/helpers/page-markdown.js'

const ROOT = process.cwd()
const PARAMETERS_DIR = path.join(ROOT, 'src/content/docs/api/parameters')
const ERROR_CODES_PATH = path.join(
  ROOT,
  'src/content/docs/api/basics/error-codes.md'
)
const OPENAPI_FILE = path.join(ROOT, 'static/openapi.json')
const NOT_FOUND_FILE = path.join(ROOT, 'static/404.md')
const VERCEL_CONFIG = path.join(ROOT, 'vercel.json')
const PAGE_404 = path.join(ROOT, 'src/pages/404.js')

const parameterFiles = fs
  .readdirSync(PARAMETERS_DIR, { recursive: true })
  .filter(entry => entry.endsWith('.md'))
  .map(entry => entry.split(path.sep).join('/'))
  .sort()

const parameters = parameterFiles.map(file =>
  parameterFromDoc(
    file,
    fs.readFileSync(path.join(PARAMETERS_DIR, file), 'utf8')
  )
)

const errorCodes = errorCodesFrom(fs.readFileSync(ERROR_CODES_PATH, 'utf8'))
const spec = buildOpenApi({ parameters, errorCodes })
const published = JSON.parse(fs.readFileSync(OPENAPI_FILE, 'utf8'))
const { headers } = JSON.parse(fs.readFileSync(VERCEL_CONFIG, 'utf8'))

describe('parameter parsing', () => {
  test('names a nested file as a dotted query parameter', () => {
    expect(parameterNameFrom('screenshot/type.md')).toBe('screenshot.type')
    expect(parameterNameFrom('screenshot/index.md')).toBe('screenshot')
  })

  test('reads the Type line, not later examples', () => {
    expect(
      typesFromParameterDoc(`---
title: timeout
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<number>'/></TypeContainer>

Later <Type children="'10s'"/>
`)
    ).toEqual(['<string>', '<number>'])
  })

  test('maps union types to oneOf', () => {
    expect(schemaFromTypes(['<boolean>', '<object>'])).toEqual({
      oneOf: [
        { type: 'boolean' },
        { type: 'object', additionalProperties: true }
      ]
    })
  })
})

describe('OpenAPI document', () => {
  test('is OpenAPI 3.1 at the published path', () => {
    expect(spec.openapi).toBe('3.1.0')
    expect(OPENAPI_PATH).toBe('/openapi.json')
    expect(spec.paths['/'].get.operationId).toBe('retrieveUrl')
  })

  test('documents every API parameter page', () => {
    const names = spec.paths['/'].get.parameters.map(({ name }) => name)
    expect(parameterFiles.length).toBeGreaterThan(0)
    for (const file of parameterFiles) {
      expect(names).toContain(parameterNameFrom(file))
    }
    expect(names).toContain('url')
    expect(
      spec.paths['/'].get.parameters.find(({ name }) => name === 'url').required
    ).toBe(true)
  })

  test('gives 4xx and 5xx a typed error schema', () => {
    const responses = spec.paths['/'].get.responses
    for (const status of ['400', '401', '403', '408', '429', '500']) {
      expect(responses[status].content['application/json'].schema.$ref).toBe(
        '#/components/schemas/Error'
      )
    }

    const error = spec.components.schemas.Error
    expect(error.required).toEqual(['status', 'code', 'message'])
    expect(error.properties.code.enum).toEqual(errorCodes)
    expect(error.properties.message.type).toBe('string')
    expect(errorCodes).toContain('EAUTH')
    expect(errorCodes).toContain('ERATE')
  })

  test('matches the committed file so deploys stay in sync', () => {
    expect(published).toEqual(spec)
  })
})

describe('published files', () => {
  test('serves openapi.json with CORS so agents can fetch it', () => {
    const rule = headers.find(({ source }) => source === '/openapi.json')
    expect(rule).toBeDefined()
    expect(rule.headers.find(({ key }) => key === 'content-type').value).toBe(
      'application/json; charset=utf-8'
    )
    expect(
      rule.headers.find(({ key }) => key === 'access-control-allow-origin')
        .value
    ).toBe('*')
  })

  test('keeps static/404.md identical to the generated recovery page', () => {
    expect(fs.readFileSync(NOT_FOUND_FILE, 'utf8')).toBe(notFoundMarkdown)
  })

  test('the HTML 404 page renders the same recovery links', () => {
    const page = fs.readFileSync(PAGE_404, 'utf8')
    expect(page).toContain('notFoundLinks')
    expect(page).toContain("from 'helpers/page-markdown'")
  })
})
