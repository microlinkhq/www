import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'src')
const SOURCE_EXT = new Set(['.js', '.jsx', '.scss', '.css'])

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      return entry.name === 'node_modules' ? [] : walk(full)
    }
    return SOURCE_EXT.has(path.extname(entry.name)) ? [full] : []
  })

const bareSpecifiers = source =>
  [
    ...source.matchAll(
      /(?:from|import)\s+['"]([^'"]+)['"]|@import\s+['"]([^'"]+)['"]/g
    )
  ].map(match => match[1] || match[2])

const resolvesInSrc = specifier => {
  const base = path.join(SRC, specifier)
  return [base, `${base}.js`, `${base}.jsx`].some(candidate =>
    fs.existsSync(candidate)
  )
}

const requiredAliasesIn = sources => {
  const required = new Set()
  for (const source of sources) {
    for (const specifier of bareSpecifiers(source)) {
      if (specifier.startsWith('.')) continue
      if (specifier.startsWith('~')) required.add(specifier)
      else if (resolvesInSrc(specifier)) required.add(specifier.split('/')[0])
    }
  }
  return required
}

const aliasKeysIn = source => {
  const block = source.match(/config\.resolve\.alias = \{([\s\S]*?)\n {4}\}/)
  if (!block) throw new Error('storybook alias block not found')
  return new Set(
    [...block[1].matchAll(/^\s*(?:'([^']+)'|([A-Za-z0-9_]+))\s*:/gm)].map(
      match => match[1] || match[2]
    )
  )
}

const missingFrom = (required, aliases) =>
  [...required].filter(name => !aliases.has(name)).sort()

const read = file => fs.readFileSync(file, 'utf8')

describe('storybook aliases cover source imports', () => {
  test('every src root and tilde stylesheet the site imports is aliased', () => {
    const sources = [...walk(SRC), ...walk(path.join(ROOT, '.storybook'))].map(
      read
    )
    const required = requiredAliasesIn(sources)
    const aliases = aliasKeysIn(read(path.join(ROOT, '.storybook/main.js')))
    expect(missingFrom(required, aliases)).toEqual([])
  })

  test('an extensionless javascript module needs its root', () => {
    expect([
      ...requiredAliasesIn(["import { x } from 'helpers/dashboard-account'"])
    ]).toEqual(['helpers'])
  })

  test('a jsx module needs its root', () => {
    expect([...requiredAliasesIn(["import { Story } from 'story'"])]).toEqual([
      'story'
    ])
  })

  test('a stylesheet import needs its root', () => {
    expect([...requiredAliasesIn(["import 'styles/main.scss'"])]).toEqual([
      'styles'
    ])
  })

  test('a tilde stylesheet import is the alias key', () => {
    expect([...requiredAliasesIn(["@import '~normalize.css';"])]).toEqual([
      '~normalize.css'
    ])
  })

  test('a relative import of a real file is not a root', () => {
    expect([...requiredAliasesIn(["import './styles/main.scss'"])]).toEqual([])
  })

  test('a package import is not a root', () => {
    expect([...requiredAliasesIn(["import React from 'react'"])]).toEqual([])
  })

  test('a root the alias list drops is the gap', () => {
    expect(
      missingFrom(requiredAliasesIn(["import 'styles/main.scss'"]), new Set())
    ).toEqual(['styles'])
  })
})
