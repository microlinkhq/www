'use strict'

const path = require('path')

require('./fetch-data')({
  dist: path.resolve(__dirname, '../data/oss.json'),
  url: 'https://oss.microlink.io',
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
      .filter(data => !!data.description)
      .filter(data => !!data.language)
})
