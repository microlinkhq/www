'use strict'

const { writeFileSync, readFileSync } = require('node:fs')
const { createRequire } = require('node:module')
const { dirname, join } = require('node:path')

const microlinkSrc = dirname(require.resolve('microlink.io'))
const requireFromMicrolink = createRequire(require.resolve('microlink.io'))
const googleSrc = dirname(requireFromMicrolink.resolve('@microlink/google'))
const requireFromPuppeteer = createRequire(require.resolve('puppeteer'))
const puppeteerCorePkg = requireFromPuppeteer.resolve(
  'puppeteer-core/package.json'
)
const puppeteerCoreTypes = join(
  dirname(puppeteerCorePkg),
  requireFromPuppeteer(puppeteerCorePkg).types
)

writeFileSync(
  join(__dirname, '../src/components/pages/editor/monaco-dts.js'),
  [
    `export const MICROLINK_DTS = ${JSON.stringify(
      readFileSync(join(microlinkSrc, 'index.d.ts'), 'utf8')
    )}`,
    `export const GOOGLE_DTS = ${JSON.stringify(
      readFileSync(join(googleSrc, 'index.d.ts'), 'utf8')
    )}`,
    `export const PUPPETEER_DTS = ${JSON.stringify(
      readFileSync(puppeteerCoreTypes, 'utf8')
    )}`,
    ''
  ].join('\n')
)
