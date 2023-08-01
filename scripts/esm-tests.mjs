import { $ } from 'zx'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pkgPath = resolve(__dirname, '../package.json')

const pkg = JSON.parse(await readFile(pkgPath))
pkg.type = 'module'

await writeFile(pkgPath, JSON.stringify(pkg, null, 2))

try {
  await $`pnpm install ava@latest`
  await $`./node_modules/.bin/ava test/**/*.mjs`
} finally {
  delete pkg.type
  await writeFile(pkgPath, JSON.stringify(pkg, null, 2))
}
