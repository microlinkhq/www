import path from 'node:path'
import { fileURLToPath } from 'node:url'
import esbuild from 'esbuild'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function jsxInJsPlugin () {
  const srcRoot = path.resolve(__dirname, '../src')
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform (code, id) {
      if (!id.endsWith('.js') || !id.startsWith(srcRoot)) return
      if (!code.includes('<')) return
      const result = await esbuild.transform(code, {
        loader: 'jsx',
        jsx: 'automatic',
        sourcefile: id
      })
      return { code: result.code, map: result.map }
    }
  }
}

export default {
  stories: ['../src/**/*.stories.jsx'],
  addons: ['@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true
  },
  viteFinal: async config => {
    const src = path.resolve(__dirname, '../src')

    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@reach/router': path.resolve(
        __dirname,
        '../node_modules/@gatsbyjs/reach-router'
      ),
      story: path.resolve(src, 'story.jsx'),
      theme: path.resolve(src, 'theme'),
      components: path.resolve(src, 'components'),
      helpers: path.resolve(src, 'helpers')
    }

    config.plugins = config.plugins || []
    config.plugins.push(jsxInJsPlugin())

    const jsxModuleTypes = { '.js': 'jsx' }

    config.build = config.build || {}
    config.build.rollupOptions = config.build.rollupOptions || {}
    config.build.rollupOptions.moduleTypes = {
      ...config.build.rollupOptions.moduleTypes,
      ...jsxModuleTypes
    }

    config.optimizeDeps = config.optimizeDeps || {}
    config.optimizeDeps.rolldownOptions =
      config.optimizeDeps.rolldownOptions || {}
    config.optimizeDeps.rolldownOptions.moduleTypes = {
      ...config.optimizeDeps.rolldownOptions.moduleTypes,
      ...jsxModuleTypes
    }

    return config
  }
}
