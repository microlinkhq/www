'use strict'

const msgpack = require('notepack.io')
const { map } = require('lodash')
const path = require('path')
const fs = require('fs')

const DEMO_LINKS = [
  'http://www.imdb.com/title/tt5463162',
  'https://9gag.com/gag/a6OOZ4N',
  'https://en.wikipedia.org/wiki/Bob_Dylan',
  'https://github.com/substack/stream-handbook',
  'https://gizmodo.com/drone-video-of-border-wall-prototypes-accidentally-show-1819710328',
  'https://medium.com/@the_economist/apple-should-shrink-its-finance-arm-before-it-goes-bananas-f7fcdc754091',
  'https://soundcloud.com/theaipodcast/gtc-weather/',
  'https://techcrunch.com/2017/10/26/super-mario-odyssey-review-a-masterpiece-of-twists-and-turns/',
  'https://twitter.com/futurism/status/882987478541533189',
  'https://vimeo.com/186386161',
  'https://www.amazon.com/All-new-Echo-Plus-Bundle-Philips/dp/B07H1QBW2L',
  'https://www.apple.com/homepod',
  'https://www.bbc.com/news/technology-40762328',
  'https://www.eventbrite.es/e/entradas-theantievent18-49664776684#',
  'https://www.facebook.com/natgeo/videos/1959330137697840/',
  'https://www.instagram.com/p/BeV6tOhFUor/',
  'https://www.meetup.com/es-ES/London-React-User-Group/events/238055670/',
  'https://www.nytimes.com/2018/09/01/opinion/sunday/how-make-big-decision.html',
  'https://www.theverge.com/2017/10/27/16145498/insecure-broad-city-high-maintenance-web-series-hbo-comedy-central',
  'https://www.youtube.com/watch?v=9P6rdqiybaw'
]

const CACHE_PATH = path.resolve('node_modules/.cache/microlink.msgpack')
let data
try {
  data = msgpack.decode(fs.readFileSync(CACHE_PATH))
} catch (err) {
  data = []
}

module.exports = map(data.cache, item => JSON.parse(item.value).value)
module.exports.DEMO_LINKS = DEMO_LINKS
module.exports.CACHE_PATH = CACHE_PATH
