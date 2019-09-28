---
title: 'Overview'
redirect_from:
  - /docs/mql/
--- 

**Microlink Query Language** (*MQL*) make possible get structured data from any website.

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      type: 'image',
      selector: '#avatar'
    }
  }
})

console.log(`The avatar is ${data.avatar.url}`)
```

<Figcaption children='The only thing you need to do is declare the data you wish to obtain.' />

Under the hood, it interacts with the [Microlink API](/docs/api/getting-started/overview), meaning any API parameters are available here too.

```js
const mql = require('@microlink/mql')

const { status, data, response } = await mql('https://kikobeats.com', {
  screenshot: true,
  waitFor: 3000
})

console.log(`My screenshot at ${data.screenshot.url}`)
```

[MQL](https://www.npmjs.com/package/@microlink/mql) is a convenient way for defining rules to turns any website into a programmatic API.

```js
const mql = require('@microlink/mql')
 
const twitter = username =>
  mql(`https://twitter.com/${username}`, {
    data: {
      stats: {
        selector: ".ProfileNav-list",
        attr: {
          tweets: {
            selector: ".ProfileNav-item--tweets .ProfileNav-value",
            attr: "data-count"
          },
          followings: {
            selector: ".ProfileNav-item--following .ProfileNav-value",
            attr: "data-count"
          },
          favorites: {
            selector: ".ProfileNav-item--favorites .ProfileNav-value",
            attr: "data-count"
          }
        }
      }
    }
  })
```

In the above example we are defining a set of rules targeting Twitter profiles URLs.

```js
const { data } = await twitter('kikobeats')
console.log(data)
```

```json{25,29}
{
  "lang": "en",
  "author": "Kikobeats",
  "title": "#!/kiko/beats (@Kikobeats) | Twitter",
  "publisher": "Twitter",
  "image": {
    "url": "https://pbs.twimg.com/profile_banners/101198215/1497704640/1500x500",
    "width": 1500,
    "height": 500,
    "type": "jpg",
    "size": 126586,
    "size_pretty": "127 kB"
  },
  "description": "The latest Tweets from #!/kiko/beats (@Kikobeats). A millennial doing stuff on internet that ships software every day and builds digital products. Murcia p2p Madrid",
  "date": "2010-01-01T00:00:00.000Z",
  "logo": {
    "url": "https://abs.twimg.com/icons/apple-touch-icon-192x192.png",
    "width": 192,
    "height": 192,
    "type": "png",
    "size": 2113,
    "size_pretty": "2.11 kB"
  },
  "url": "https://twitter.com/kikobeats",
  "stats": {
    "favorites": "3312",
    "followings": "637",
    "tweets": "20239"
  }
}
```

The rules will be applied and the new data field `stats` will be added as part of the payload response with the rest of generic fields.

The following documentation tells you all the concepts you need to know in order to setup your custom rules for retrieveing specific URL content.
