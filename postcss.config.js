module.exports = {
  plugins: [
    require('postcss-focus'),
    require('cssnano')({
      preset: require('cssnano-preset-advanced')
    })
  ]
}
