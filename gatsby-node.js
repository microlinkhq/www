'use strict'

const webpack = require('webpack')

exports.modifyWebpackConfig = ({ config, stage }) => {
  // See https://github.com/FormidableLabs/react-live/issues/5
  config.plugin('ignore', () => new webpack.IgnorePlugin(/^(xor|props)$/))

  return config
}
