'use strict'

const path = require('path')

module.exports = () =>
  require('../create-provider').fromUrl('https://oss.microlink.io', {
    dist: path.resolve(__dirname, '../../../data/oss.json'),
    mapper: data =>
      data
        .map(item => {
          return {
            description: item.description,
            issues: item.open_issues,
            language: item.language,
            license: item.license && item.license.spdx_id,
            name: item.name,
            size: item.size,
            slug: item.full_name,
            stars: item.stargazers_count,
            url: item.html_url
          }
        })
        .filter(item => !item.fork && !!item.language && !!item.description)
  })
