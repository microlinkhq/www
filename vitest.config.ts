/// <reference types="vitest" />
import { defineConfig } from 'vite'

const project = (name: string) => ({
  extends: true,
  test: { name, include: [`test/${name}/**/*.{js,mjs}`] }
})

export default defineConfig({
  test: {
    projects: [project('unit'), project('integration'), project('e2e')]
  }
})
