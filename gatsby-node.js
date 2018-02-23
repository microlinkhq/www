'use strict'

const webpack = require('webpack')

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  exports.modifyWebpackConfig = ({ config, stage }) => {
    if (stage === 'build-html') {
      config.loader('null', {
        test: /react-microlink/,
        loader: 'null-loader'
      })
    }
  }

  return config
}
