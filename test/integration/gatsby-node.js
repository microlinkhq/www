import path from 'node:path'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { afterEach, describe, expect, test, vi } from 'vitest'

const require = createRequire(import.meta.url)

const gatsbyDir = path.dirname(require.resolve('gatsby/package.json'))
const { builtinPlugins } = require(path.join(
  gatsbyDir,
  'dist/utils/webpack-plugins'
))
const { onCreateWebpackConfig } = require(path.join(
  process.cwd(),
  'gatsby-node'
))

const BASE_CONFIG = {
  devtool: 'cheap-module-source-map',
  plugins: [],
  cache: { type: 'filesystem', name: 'stage' }
}

const runStage = stage => {
  const added = []
  let replaced = null
  onCreateWebpackConfig({
    stage,
    plugins: builtinPlugins,
    getConfig: () => structuredClone(BASE_CONFIG),
    actions: {
      setWebpackConfig: config => added.push(config),
      replaceWebpackConfig: config => {
        replaced = config
      }
    }
  })
  const plugins = added.flatMap(config => config.plugins || [])
  return { plugins, replaced }
}

const resolveRequest = (plugins, request) => {
  const resource = { request }
  for (const plugin of plugins) {
    if (!plugin.resourceRegExp.test(resource.request)) continue
    plugin.newResource(resource)
  }
  return resource.request
}

const PAGE_SOURCES = ['src/pages', 'src/templates'].flatMap(dir =>
  fs
    .readdirSync(path.join(process.cwd(), dir), { recursive: true })
    .filter(file => /\.(js|jsx|mdx?)$/.test(file))
    .map(file => path.join(dir, file))
)

const SERVER_RENDERED_APIS = ['getServerData', 'config']

const exportedSpecifier = specifier => {
  const parts = specifier.trim().split(/\s+as\s+/)
  return parts[parts.length - 1].trim()
}

const exportsServerRenderedApi = source => {
  const declaration =
    /export\s+(?:(?:const|let|var)\s+|async\s+function\*\s*|function\*\s*|async\s+function\s+|function\s+)([A-Za-z_$][\w$]*)/g
  for (const match of source.matchAll(declaration)) {
    if (SERVER_RENDERED_APIS.includes(match[1])) return true
  }
  const specifierExport = /export\s*\{([^}]*)\}/g
  for (const match of source.matchAll(specifierExport)) {
    for (const specifier of match[1].split(',')) {
      if (SERVER_RENDERED_APIS.includes(exportedSpecifier(specifier))) { return true }
    }
  }
  return false
}

const gatsbyServerApis = () => {
  const pageMode = fs.readFileSync(
    path.join(gatsbyDir, 'dist/utils/page-mode.js'),
    'utf8'
  )
  const parser = fs.readFileSync(
    path.join(gatsbyDir, 'dist/query/file-parser.js'),
    'utf8'
  )
  const fields = [
    ...new Set(
      [...pageMode.matchAll(/component\.(\w+)/g)].map(match => match[1])
    )
  ]
  return fields.flatMap(field => {
    const found = parser.match(
      new RegExp(`${field}: findApiExport\\(ast, \`([^\`]+)\`\\)`)
    )
    return found ? [found[1]] : []
  })
}

const serverRenderedSources = api => [
  `export const ${api} = () => {}`,
  `export let ${api} = () => {}`,
  `export var ${api} = () => {}`,
  `export function ${api}() {}`,
  `export async function ${api}() {}`,
  `export function* ${api}() {}`,
  `export function*${api}() {}`,
  `export async function* ${api}() {}`,
  `export async function*${api}() {}`,
  `export { ${api} }`,
  `export {${api}}`,
  `export { ${api} } from "./mod"`,
  `export { local as ${api} }`,
  `export { local as ${api} } from "./mod"`,
  `export {\n  other,\n  ${api}\n}`
]

afterEach(() => vi.unstubAllEnvs())

describe('dev HTML shell compiles without page components', () => {
  test('develop-html resolves the page registry to an empty module', async () => {
    const { plugins } = runStage('develop-html')
    const request = resolveRequest(plugins, '$virtual/async-requires')
    expect(request).not.toBe('$virtual/async-requires')
    const { default: registry } = await import(request)
    expect(registry).toEqual({ components: {}, head: {} })
  })

  test('no page needs server rendering in develop', () => {
    const serverRendered = PAGE_SOURCES.filter(file =>
      exportsServerRenderedApi(
        fs.readFileSync(path.join(process.cwd(), file), 'utf8')
      )
    )
    expect(PAGE_SOURCES.length).toBeGreaterThan(0)
    expect(serverRendered).toEqual([])
  })

  test('server-render scan matches every export Gatsby reads', () => {
    const apis = gatsbyServerApis()
    expect(apis.length).toBeGreaterThan(0)
    for (const api of apis) {
      for (const source of serverRenderedSources(api)) {
        expect(exportsServerRenderedApi(source), source).toBe(true)
      }
      for (const source of [
        `export { ${api} as helper }`,
        `export const ${api}Helper = 1`,
        `function ${api}() {}`,
        `export default function ${api}() {}`
      ]) {
        expect(exportsServerRenderedApi(source), source).toBe(false)
      }
    }
  })

  test('other requests in develop-html are left alone', () => {
    const { plugins } = runStage('develop-html')
    for (const request of ['./api-runner-ssr', '$virtual/async-requires-x']) {
      expect(resolveRequest(plugins, request)).toBe(request)
    }
  })

  test('DEV_SSR keeps real page components for server rendering', () => {
    vi.stubEnv('GATSBY_EXPERIMENTAL_DEV_SSR', 'true')
    const { plugins } = runStage('develop-html')
    expect(resolveRequest(plugins, '$virtual/async-requires')).toBe(
      '$virtual/async-requires'
    )
  })

  test('the browser bundle keeps real page components', () => {
    const { plugins } = runStage('develop')
    expect(resolveRequest(plugins, '$virtual/async-requires')).toBe(
      '$virtual/async-requires'
    )
  })

  test.each(['build-javascript', 'build-html'])(
    '%s keeps real page components',
    stage => {
      const { plugins } = runStage(stage)
      expect(resolveRequest(plugins, '$virtual/async-requires')).toBe(
        '$virtual/async-requires'
      )
    }
  )
})

describe('dev webpack cache stays in memory', () => {
  test.each(['develop', 'develop-html'])('%s never persists to disk', stage => {
    expect(runStage(stage).replaced.cache).toEqual({ type: 'memory' })
  })

  test.each(['build-javascript', 'build-html'])(
    '%s keeps the persistent cache',
    stage => {
      expect(runStage(stage).replaced.cache).toEqual(BASE_CONFIG.cache)
    }
  )
})
