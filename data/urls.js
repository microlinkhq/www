'use strict'

const msgpack = require('notepack.io')
const { map } = require('lodash')
const path = require('path')
const fs = require('fs')

const URLS = [
  'https://twitter.com/futurism/status/882987478541533189',
  'https://medium.com/@the_economist/apple-should-shrink-its-finance-arm-before-it-goes-bananas-f7fcdc754091',
  'https://www.theverge.com/2017/10/27/16145498/insecure-broad-city-high-maintenance-web-series-hbo-comedy-central',
  'https://techcrunch.com/2017/10/26/super-mario-odyssey-review-a-masterpiece-of-twists-and-turns/',
  'http://es.engadget.com/2017/10/23/meizu-m6-note-analisis-review-fotos/',
  'https://www.youtube.com/watch?v=9P6rdqiybaw',
  'https://gizmodo.com/drone-video-of-border-wall-prototypes-accidentally-show-1819710328',
  'https://vimeo.com/186386161',
  'https://www.apple.com/homepod',
  'https://www.instagram.com/p/BeV6tOhFUor/',
  'http://www.imdb.com/title/tt5463162',
  'https://www.amazon.com/All-new-Echo-Plus-Bundle-Philips/dp/B07H1QBW2L',
  'https://www.bbc.com/news/technology-40762328',
  'https://www.facebook.com/natgeo/videos/1959330137697840/',
  'https://soundcloud.com/theaipodcast/gtc-weather/',
  'https://en.wikipedia.org/wiki/Bob_Dylan',
  'https://www.nytimes.com/2018/09/01/opinion/sunday/how-make-big-decision.html'
]

const CACHE_PATH = path.resolve('node_modules/.cache/microlink.msgpack')
let data
try {
  data = msgpack.decode(fs.readFileSync(CACHE_PATH))
} catch (err) {
  data = []
}

module.exports = map(data.cache, item => JSON.parse(item.value).value)
module.exports.URLS = URLS
module.exports.CACHE_PATH = CACHE_PATH
