import test from 'ava'

import prettier from '../../src/helpers/prettier'

test('js', t => {
  const code = `const mql = require('@microlink/mql')

  const { status, data } = await mql('https://geolocation.microlink.io', { apiKey: MyApiToken, proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' })

  console.log(data)`

  const output = prettier.js(code)

  t.snapshot(output)
})
