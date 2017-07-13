module.exports = () => ({
  plugins: [
    require('postcss-easy-import'),
    require('postcss-focus'),
    require('postcss-cssnext'),
    require('cssnano')({
      autoprefixer: false,
      discardComments: {removeAll: true}
    })
  ]
})
