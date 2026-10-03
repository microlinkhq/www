import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const gatsbyNode = read('gatsby-node.js')
const generateCall = gatsbyNode.slice(
  gatsbyNode.indexOf('generateOgCards({'),
  gatsbyNode.indexOf('onError:')
)

describe('og card generation', () => {
  test('queries post authors and the authors directory', () => {
    expect(gatsbyNode).toMatch(/frontmatter \{ authors \}/)
    expect(gatsbyNode).toMatch(
      /allAuthorsYaml \{ nodes \{ key name avatar \} \}/
    )
  })

  test('renders each card from the full card metadata', () => {
    expect(generateCall).toMatch(/metadata: ogCardMetadata/)
    expect(gatsbyNode).toMatch(/cardMetadata\(\{\s+html,\s+authors:/)
  })

  test('passes the site host so the card footer shows the page path', () => {
    expect(generateCall).toMatch(/host: OG_CARD_HOST/)
    expect(gatsbyNode).toMatch(/const OG_CARD_HOST = 'microlink\.io'/)
  })

  test('every blog author key resolves in data/authors.yaml', () => {
    const authorKeys = new Set(
      [...read('data/authors.yaml').matchAll(/^- key: (\S+)$/gm)].map(
        match => match[1]
      )
    )
    const blogDir = path.join(process.cwd(), 'src', 'content', 'blog')
    const unknown = fs
      .readdirSync(blogDir)
      .filter(file => file.endsWith('.md'))
      .flatMap(file => {
        const [, frontmatter = ''] = fs
          .readFileSync(path.join(blogDir, file), 'utf8')
          .split(/^---$/m)
        const [, block = ''] =
          frontmatter.match(/^authors:\n((?: +- .+\n?)+)/m) || []
        return [...block.matchAll(/- (\S+)/g)]
          .map(match => match[1])
          .filter(key => !authorKeys.has(key))
          .map(key => `${file}: ${key}`)
      })
    expect(unknown).toEqual([])
  })
})
