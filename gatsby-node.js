'use strict'

const webpack = require('webpack')

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  if (stage === 'build-html') {
    config.loader('null', {
      test: /@typeform\/embed/,
      loader: 'null-loader'
    })
  }

  return config
}
