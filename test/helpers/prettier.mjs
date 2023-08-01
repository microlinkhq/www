import test from 'ava'

import prettier, { serializeFmt } from '../../src/helpers/prettier.js'

test('js', async t => {
  const code = `const mql = require('@microlink/mql')
  const { status, data } = await mql('https://geolocation.microlink.io', { apiKey: MyApiToken, proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' })
  console.log(data)`

  const output = await prettier.js(code)

  t.snapshot(output)
})

test('json', async t => {
  const code =
    '{"title":"Wormholes Explained – Breaking Spacetime","description":"To support Kurzgesagt and learn more about Brilliant, go to https://www.brilliant.org/nutshell and sign up for free. The first 688 people that go to that lin...","lang":"en","author":"Kurzgesagt – In a Nutshell","publisher":"YouTube","image":{"url":"https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/img.youtube.com!vi!9P6rdqiybaw!maxresdefault.jpg.jpg","type":"jpg","size":120116,"height":720,"width":1280,"size_pretty":"120 kB","palette":["#C004F9","#EEEEA7","#25047C","#740296","#808018","#2C0494"],"background_color":"#EEEEA7","color":"#AC04DF","alternative_color":"#2C0494"},"audio":{"url":"https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/r3---sn-ab5sznly.googlevideo.com!videoplayback!c=WEB&clen=8935291&dur=552.054&ei=6gpAXv-3POHM8gTqtrm","type":"mp4","duration":552.054422,"size":8935291,"duration_pretty":"9m","size_pretty":"8.94 MB"},"url":"https://www.youtube.com/watch?v=9P6rdqiybaw","iframe":{"html":"<iframe width=\\"480\\" height=\\"270\\" src=\\"https://www.youtube.com/embed/9P6rdqiybaw?feature=oembed\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowfullscreen></iframe>","scripts":[]},"date":"2020-02-09T13:36:39.000Z","logo":{"url":"https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/logo.clearbit.com!youtube.com.png","type":"png","size":2421,"height":128,"width":128,"size_pretty":"2.42 kB","palette":["#FC0404","#FC8484","#830101","#970101","#950303","#970101"],"background_color":"#FC0404","color":"#320000","alternative_color":"#320101"},"video":{"url":"https://cdn.microlink.io/data/assets/youtube.com!watch!v=9P6rdqiybaw/r3---sn-ab5sznly.googlevideo.com!videoplayback!c=WEB&dur=552.054&ei=6gpAXv-3POHM8gTqtrmwBA&expire=15","type":"mp4","duration":552.007943,"size":54633895,"height":720,"width":1280,"duration_pretty":"9m","size_pretty":"54.6 MB"}}'

  const output = await prettier.json(code)

  t.snapshot(output)
})

test('serializeFmt', t => {
  const output = serializeFmt({
    type: 'email',
    id: 'input',
    placeholder: 'you@domain.com',
    suggestions: [{ value: 'you@gmail.com' }, { value: 'you@hotmail.com' }],
    width: '9rem',
    fontSize: 1,
    required: true
  })

  t.snapshot(output)
})
