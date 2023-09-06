'use strict'

const byFeature = Object.keys(require('@microlink/recipes/by-feature'))
const recipes = require('@microlink/recipes')
const path = require('path')

const fn = () => Object.keys(recipes)
  .sort()
  .reduce((acc, key) => {
    const { meta } = recipes[key]
    meta.type = byFeature.includes(key) ? 'feature' : 'provider'
    acc.push([key, meta])
    return acc
  }, [])

module.exports = () =>
  require('../create-provider').fromCode(fn, {
    dist: path.resolve(__dirname, '../../../data/recipes.json')
  })
