import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function styledComponentsPlugin () {
  const projectRoot = path.resolve(__dirname, '..')
  const roots = [
    path.resolve(projectRoot, 'src'),
    path.resolve(projectRoot, '.storybook')
  ].map(r => r.replace(/\\/g, '/'))

  const require = createRequire(
    import.meta.resolve('babel-plugin-styled-components')
  )
  const babel = require('@babel/core')
  const presetReactPath = require.resolve('@babel/preset-react')
  const styledPluginPath = fileURLToPath(
    import.meta.resolve('babel-plugin-styled-components')
  )

  return {
    name: 'styled-components-css-prop',
    enforce: 'pre',
    transform (code, id) {
      const filepath = id.split('?')[0].split('#')[0].replace(/\\/g, '/')
      if (!roots.some(root => filepath.startsWith(root + '/'))) return
      if (!/\.jsx?$/.test(filepath)) return
      if (!code.includes('<')) return
      const result = babel.transformSync(code, {
        filename: filepath,
        configFile: false,
        babelrc: false,
        presets: [[presetReactPath, { runtime: 'automatic' }]],
        plugins: [
          [styledPluginPath, { css: true, displayName: false, ssr: false }]
        ],
        sourceMaps: true
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
      gatsby: path.resolve(__dirname, 'gatsby-mock.jsx'),
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
    config.plugins.push(styledComponentsPlugin())

    const jsxModuleTypes = { '.js': 'jsx' }

    config.build = config.build || {}
    config.build.rolldownOptions = config.build.rolldownOptions || {}
    config.build.rolldownOptions.moduleTypes = {
      ...config.build.rolldownOptions.moduleTypes,
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
