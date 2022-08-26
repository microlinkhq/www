import test from 'ava'

import mqlCode from '../../src/helpers/mql-code'

test('JavaScript with inline code', t => {
  const output = mqlCode('https://microlink.io', {
    function: "({ page }) => page.evaluate('jQuery.fn.jquery')",
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
  })

  t.snapshot(output.JavaScript())
})

test('JavaScript', t => {
  const output = mqlCode('https://geolocation.microlink.io', {
    apiKey: 'MyApiToken',
    proxy: 'https://myproxy:603f60f5@superproxy.cool:8001'
  })

  t.snapshot(output.JavaScript())
})
