/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vite'

const SRC = path.resolve('src')
const FIXTURES = path.resolve('test/utils/fixtures')

const project = (name: string) => ({
  extends: true,
  test: { name, include: [`test/${name}/**/*.{js,mjs}`] }
})

const unit = {
  ...project('unit'),
  oxc: { lang: 'jsx' as const, include: /\.js$/, exclude: /node_modules/ },
  resolve: {
    alias: [
      { find: /^(theme|components|helpers)(\/|$)/, replacement: `${SRC}/$1$2` },
      {
        find: /^.*\/data\/analytics\.json$/,
        replacement: `${FIXTURES}/analytics.json`
      },
      {
        find: /^.*\/static\/user-agents\.json$/,
        replacement: `${FIXTURES}/user-agents.js`
      }
    ]
  }
}

export default defineConfig({
  test: {
    projects: [unit, project('integration'), project('e2e')]
  }
})
