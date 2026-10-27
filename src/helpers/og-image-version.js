import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)

export const OG_IMAGE_VERSION = require(path.join(
  path.dirname(require.resolve('@microlink/og')),
  '..',
  'package.json'
)).version
