import { storiesOf } from '@storybook/react'
import Box from 'components/elements/Box'
import { Story } from 'story'
import React from 'react'

import Microlink from './Microlink'

const code = `
import Microlink from 'components/patterns/Microlink/Microlink'
import { Fragment } from 'react'

const url = 'https://x.com/futurism/status/882987478541533189'

export default () => (
  <Fragment>
    <Microlink url={url} />
    <Box my={3} />
    <Microlink size='large' url={url} />
  </Fragment>
)
`

const DATA = {
  lang: 'en',
  author: 'futurism',
  title: 'Futurism on Twitter',
  publisher: 'Twitter',
  image: {
    url: 'https://pbs.twimg.com/amplify_video_thumb/882986340605939712/img/k-NlEfo7z0Xvo9ab.jpg',
    width: 720,
    height: 720,
    type: 'jpg',
    size: 65648,
    size_pretty: '65.6 kB'
  },
  description: '“These tires can even climb stairs https://t.co/ymr4KK15oI”',
  date: '2019-05-31T10:09:57.000Z',
  logo: {
    url: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png',
    width: 192,
    height: 192,
    type: 'png',
    size: 2113,
    size_pretty: '2.11 kB'
  },
  url: 'https://x.com/futurism/status/882987478541533189'
}

storiesOf('Patterns', module).add('Microlink', () => (
  <Story
    name='Microlink'
    code={code}
    style={{ display: 'flex', width: '100%' }}
  >
    <Microlink url={DATA.url} setData={DATA} media='image' />
    <Box my={3} />
    <Microlink url={DATA.url} size='large' setData={DATA} media='image' />
  </Story>
))
