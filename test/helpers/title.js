import test from 'ava'

import title from '../../src/helpers/title'

test('capitalize only the first world', t => {
  t.is(title('Master Plan for 2019'), 'Master plan for 2019')
})

test('respect special values', t => {
  t.is(title('url'), 'url')
  t.is(title('How to WordPress'), 'How to WordPress')
})

test('respect uppercase words intentionally', t => {
  t.is(title('Microlink API'), 'Microlink API')
  t.is(title('Turns any URL into data'), 'Turns any URL into data')
})

test('be possible omit words', t => {
  t.is(title('JSON+LD', ['JSON+LD']), 'JSON+LD')
  t.is(title('JSON+LD & oEmbed', ['JSON+LD', 'oEmbed']), 'JSON+LD & oEmbed')
  t.is(
    title('Open Graph, JSON+LD & oEmbed', ['JSON+LD', 'oEmbed', 'Open Graph']),
    'Open Graph, JSON+LD & oEmbed'
  )
})
