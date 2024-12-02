import { test, expect } from 'vitest'

import mqlCode from '../../src/helpers/mql-code'

test('JavaScript with inline code', () => {
  const output = mqlCode('https://microlink.io', {
    function: "({ page }) => page.evaluate('jQuery.fn.jquery')",
    number: 3000,
    boolean: true,
    string: 'MyApiToken',
    url: 'https://myproxy:603f60f5@superproxy.cool:8001',
    scripts: ['https://code.jquery.com/jquery-3.5.0.min.js'],
    multipleScripts: [
      'https://code.jquery.com/jquery-3.5.0.min.js',
      'https://code.jquery.com/jquery-3.5.0.min.js'
    ]
  })

  expect(output.JavaScript()).toMatchSnapshot()
})
