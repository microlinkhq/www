import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const SITE_URL = 'https://microlink.io'
const ROOT_DIR = path.join(import.meta.dirname, '..', '..')
const PACKAGE_NAME = '@microlink/mcp'
const PACKAGE_DIR = path.join(ROOT_DIR, 'node_modules', ...PACKAGE_NAME.split('/'))
const OUTPUT_PATH = path.join(
  ROOT_DIR,
  'static',
  '.well-known',
  'mcp',
  'server-card.json'
)

const PROTOCOL_VERSION = '2025-06-18'
const HANDSHAKE_TIMEOUT_MS = 60000

const CARD_SCHEMA =
  'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json'

const TITLE = 'Microlink'

const DESCRIPTION = [
  'Turn any URL into data from an agent: normalized metadata, screenshots, PDFs,',
  'markdown, plain text, media detection, technology and Lighthouse insights, and',
  'CSS-selector scraping, all backed by a real browser.'
].join(' ')

const packageBin = () => {
  const manifest = JSON.parse(
    readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf8')
  )
  const bin =
    typeof manifest.bin === 'string' ? manifest.bin : Object.values(manifest.bin)[0]
  return { version: manifest.version, bin: path.join(PACKAGE_DIR, bin) }
}

const readMcpServer = () =>
  new Promise((resolve, reject) => {
    const { bin } = packageBin()
    const child = spawn(process.execPath, [bin], { stdio: ['pipe', 'pipe', 'ignore'] })

    const timer = setTimeout(() => {
      child.kill()
      reject(new Error(`${PACKAGE_NAME} did not answer within ${HANDSHAKE_TIMEOUT_MS}ms`))
    }, HANDSHAKE_TIMEOUT_MS)

    const settle = (error, value) => {
      clearTimeout(timer)
      child.kill()
      return error ? reject(error) : resolve(value)
    }

    const send = message => child.stdin.write(`${JSON.stringify(message)}\n`)

    let serverInfo
    let buffer = ''

    child.on('error', error => settle(error))

    child.stdout.on('data', chunk => {
      buffer += chunk
      let index
      while ((index = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, index).trim()
        buffer = buffer.slice(index + 1)
        if (!line) continue

        const message = JSON.parse(line)

        if (message.error) {
          return settle(new Error(message.error.message))
        }

        if (message.id === 1) {
          serverInfo = message.result.serverInfo
          send({ jsonrpc: '2.0', method: 'notifications/initialized' })
          send({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} })
        }

        if (message.id === 2) {
          return settle(null, { serverInfo, tools: message.result.tools })
        }
      }
    })

    send({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: {},
        clientInfo: { name: 'microlink-www-build', version: '1.0.0' }
      }
    })
  })

export const buildServerCard = ({ serverInfo, tools }) => ({
  $schema: CARD_SCHEMA,
  name: 'io.github.microlinkhq/mcp',
  title: TITLE,
  description: DESCRIPTION,
  version: serverInfo.version,
  websiteUrl: `${SITE_URL}/integrations/mcp`,
  documentationUrl: `${SITE_URL}/docs/api/getting-started/mcp`,
  repository: {
    source: 'github',
    url: 'https://github.com/microlinkhq/mcp'
  },
  packages: [
    {
      registryType: 'npm',
      registryBaseUrl: 'https://registry.npmjs.org',
      identifier: PACKAGE_NAME,
      version: serverInfo.version,
      transport: { type: 'stdio' },
      environmentVariables: [
        {
          name: 'MICROLINK_API_KEY',
          description:
            'Optional. Without it requests go to the free endpoint, limited to 25 requests/day per IP.',
          isRequired: false,
          isSecret: true
        }
      ]
    }
  ],
  tools: tools.map(({ name, description }) => ({ name, description }))
})

const main = async () => {
  let card
  try {
    card = buildServerCard(await readMcpServer())
  } catch (error) {
    console.warn(
      `Keeping the committed MCP server card: ${PACKAGE_NAME} handshake failed (${error.message})`
    )
    return
  }
  mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(card, null, 2)}\n`)
  console.log(
    `Generated ${path.relative(ROOT_DIR, OUTPUT_PATH)} with ${card.tools.length} tools`
  )
}

if (process.argv[1] === import.meta.filename) main()
