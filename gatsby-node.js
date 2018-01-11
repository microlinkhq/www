'use strict'

const webpack = require('webpack')

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  if (stage === 'build-javascript') {
    const app = config._config.entry.app
    config._config.entry.app = [require.resolve('./polyfills'), app]
  }

  return config
}
