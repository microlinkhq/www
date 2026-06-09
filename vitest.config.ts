import path from 'path'
import { defineConfig } from 'vitest/config'

// Mirror Gatsby's `modules: [src, node_modules]` resolution so tests can import
// project modules with bare specifiers (e.g. `helpers/link-card`).
const src = path.resolve(process.cwd(), 'src')

export default defineConfig({
  resolve: {
    alias: {
      helpers: path.join(src, 'helpers'),
      components: path.join(src, 'components'),
      theme: path.join(src, 'theme')
    }
  },
  test: {
    include: ['test/**/*.js']
  }
})
